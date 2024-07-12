import { useEffect } from "react";
import { useTask } from "../context/Taskcontext";

export function TaskR() {
   const {getTasks, tasks} = useTask();
    useEffect(() => {
        getTasks()
    }, [])

    return <div>
        {
            tasks.map(task => (
            <div key={task._id}>
                <h1>{task.title}</h1>
                <p>{task.description}</p>
            </div>
        ))
    }
    </div>

}

export default taskR;