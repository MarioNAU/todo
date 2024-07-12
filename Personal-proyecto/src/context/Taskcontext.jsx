import {createContext, useContext, useState} from 'react'
import { createTasksRequest, getTasksRequest } from "../api/task";

const TaskContext = createContext();

export const useTask = () => {
    const context = useContext(TaskContext);
    if(!context) {
        throw new Error("UseTasks must be used within a TaskProvider");
    }
    return context;
}


export function taskProvider({ children }) {
    const [task, setTask] = useState([]);
    
    const getTasks = async () => {
        try{
            const res = await getTasksRequest()
            setTask(res.data)
        } catch (error){
            console.log(error)
        }
        
    }


    const createTask = async(task) =>{
        console.log("task")
        const res = await createTasksRequest(task)
    }

    return (
        <TaskContext.Provider value={{ tasks, createTask, getTasks}}>
            {children}
        </TaskContext.Provider>
    );
}