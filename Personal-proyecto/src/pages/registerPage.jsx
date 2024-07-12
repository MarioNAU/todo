import {useForm} from 'react-hook-form';
import { useAuth } from "../context/AuthContext";
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";

function RegisterPage() {
    const {register, handleSubmit, formState: {
        errors
    }} = useForm();
    const {signup, isAuth, errors: authErrors} = useAuth();
    const navigation = useNavigate();
    
    useEffect(()=>{
        if(isAuth) navigation('/tasks');
    }, [isAuth])

    const onSubmit = handleSubmit(async (values) =>{
        signup(values); 
    })

    return(
        <div className='bg-zinc-800 max-w-md p-10 rounded-md'>
            {
                authErrors.map((error, i) => {
                    <div className='bg-red-500 p-2 text-white' key={i}>
                        {error}
                    </div>
                })
            }
            <form onSubmit={onSubmit}>
                <input placeholder="username" className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2" type="text" {...register('username',{required:true})} /> 
                {errors.username && <p>username malo</p>}
                <input placeholder='email' className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2" type="email" {...register('email', {required:true})} />
                {errors.email && <p>email malo</p>}
                <input placeholder="password" className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2" type="password" {...register('password', {required:true})}/>
                {errors.password && <p>contra malo</p>}
                <button type="submit"> Register </button>
            </form>
        </div>
    )
}

export default RegisterPage;