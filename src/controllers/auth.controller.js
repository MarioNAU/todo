import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import {createAccessToken} from '../libs/jwt.js';
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";


export const register = async (req,res) => {
    const {email, password, username} = req.body;
   try{
        const userFound = await User.findOne({email});
        if(userFound)
            return res.status(400).json("The email already exists");

        const passwordhash = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: passwordhash
        });
        
        const userSaved = await newUser.save(); //regreso el uservade como res.json(userSaved) en vez de res.send
        const token = await createAccessToken({id: userSaved._id});
        res.cookie('token', token)
        res.json({"message":"Usuario creado"})
        /*const userSaved = await newUser.save() //regreso el uservade como res.json(userSaved) en vez de res.send
        //res.json({id: userSave._id}) para mandar lo que quiero regresar
        res.send(userSaved)*/
    }catch(error){
        console.log(error)
    }
}

export const login = async (req,res) => {
    const {email, password} = req.body;
   try{
    const userFound = await User.findOne({email});
    if (!userFound) return res.status(400).json({message: "Not found"})
       
        const isMatch = await bcrypt.compare(password, userFound.password);

        if(!isMatch) return res.status(400).json({message:"incorrect passdowerd"})

        const token = await createAccessToken({id: userFound._id});
        res.cookie('token', token)
        res.json({"message":"encontrado"})
        /*const userSaved = await newUser.save() //regreso el uservade como res.json(userSaved) en vez de res.send
        //res.json({id: userSave._id}) para mandar lo que quiero regresar
        res.send(userSaved)*/
    }catch(error){
        console.log(error)
    }
}

export const logout = (req,res) => {
    res.cookie('token', '', {
        expires: new Date(0),
    });
    return res.send('otu').status(200)
}

export const profile = async (req,res) => {
    const userFound = await User.findById(req.user.id);
    
    if(!userFound) return res.status(400);

    return res.json({message: "autorizado; encontrado"})
}


export const verifyToken = async (req,res) => {
    const {token} = req.cookies;

    if(!token) return res.status(401).json({message: "UnAuthorized"})

    jwt.verify(token, TOKEN_SECRET, async (err,user) =>{
        if(err) return res.status(401).json({message:"Unauthorized"});
        
        const userFound = await User.findById(user.id)
        if(!userFound) return res.status(401).json({message: "unauthorized"});

        return res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email
        })

    })
}