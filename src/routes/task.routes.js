import { Router } from "express";
import { authRequire } from "../middlewares/validateToken.js";
import { getTask,getTasks,updateTask,DeleteTask,CreateTask } from "../controllers/task.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { TaskSchema } from "../schemas/task.schema.js";

const router = Router();

router.get('/task', authRequire,getTask )

router.get('/tasks/:id', authRequire,getTasks )

router.post('/tasks', authRequire, validateSchema(TaskSchema),CreateTask)

router.delete('/tasks/:id', authRequire, DeleteTask)

router.put('/tasks/:id', authRequire, updateTask)

export default router;