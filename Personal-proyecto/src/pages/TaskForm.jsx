import { useForm } from "react-hook-form";
import { useTask } from "../context/Taskcontext";

function TaskR() {
    const {register, handleSubmit} = useForm();
    const {createTask} = useTask();


    const onSubmit = handleSubmit((date) => {
        createTask(data);
    });

    return (
    <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
        <form onSubmit={onSubmit}>
            <input className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md" type="text" placeholder="title" {...register("title")} autoFocus/>
            <textarea className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md" rows="3" placeholder="Description" {...register("description")}/>
            <butto>Save</butto>

        </form>
    </div>
    
    )
}

export default TaskForm