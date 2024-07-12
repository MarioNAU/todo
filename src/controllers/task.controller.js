import Task from "../models/task.model.js";


export const getTask = async (req,res) => {
    const tasks = await Task.find({
        user: req.user.id
    }).populate('user')
    res.json(tasks);
}

export const CreateTask = async (req,res) => {
    const {title, description, date} = req.body
    const newTask = new Task({
      title,
      description,
      date,
      user: req.user.id  
    });
    const savedTask = await newTask.save();
    res.json(savedTask)
}

export const getTasks = async (req,res) => {
    const taskfound = await Task.findById(req.params.id).populate('user')
    if(!taskfound) return res.status(400).json({message: "Not found"});
    res.json(taskfound);
}

export const DeleteTask = async (req,res) => {
    const taskfound = await Task.findByIdAndDelete(req.params.id)
    if(!taskfound) return res.status(400).json({message: "Not found"});
    res.json(taskfound)

}

export const updateTask = async (req,res) => {
    const taskfound = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true});
    if(!taskfound) return res.status(400).json({message: "Not found"});
    res.json(taskfound)
}