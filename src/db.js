import mongoose, { mongo } from 'mongoose';


export const connectDB = async () =>{
    try{
        await mongoose.connect('mongodb+srv://aumo160675:narayana1l@cluster0.cmixnb3.mongodb.net/?retryWrites=true&w=majority');
        console.log('db connected')
    }catch(error){
        console.log(error);
    }
}