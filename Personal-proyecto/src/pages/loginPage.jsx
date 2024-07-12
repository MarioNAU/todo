import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { Link } from 'react-router-dom';
function LoginPage() {
    const { register, handleSubmit, formState: {errors} } = useForm();
    const {signin, errors: authErrors} = useAuth();
    const onSubmit = handleSubmit((data) => {
        signin(data);
    })


    return(
        <div className="flex h-screen items-center justify-center" >
            {
                authErrors.map((error, i) => {
                    <div className='bg-red-500 p-2 text-white' key={i}>
                        {error}
                    </div>
                })
            }
            
            <form onSubmit={onSubmit}>
                <input type="email" placeholder='email' className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"  
                {...register('email', {required:true})} />
                {errors.email && <p>email malo</p>}

                <input type="password" placeholder="password" className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"  
                {...register('password', {required:true})}/>
                {errors.password && <p>contra malo</p>}
                
                <button type="submit"> Login </button>
            </form>
            <p>
                Don't have an account? <link to="/register">Sign Up</link>

            </p>
        </div>

    )
}

export default LoginPage;