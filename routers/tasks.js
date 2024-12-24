import express from "express"
import Task from "../models/task.js"

const router = express.Router()


router.post('/', async function (req, res) {
  const {task} = req.body;
let newTask = new Task({task})
newTask = await newTask.save
res.status(201).json({ message: 'Task created successfully', task: newTask });

})

router.get('/', async function (req, res) {

let tasks = await Task.find()
console.log('task',tasks);


res.status(202).json({ message: 'Task get successfully', task: tasks });

})
router.get('/:id', async function (req, res) {

let task = await Task.findById(req.params.id)
if (!task) {
return  res.status(404).json({ message: 'Task not found', task: task });
}

res.status(203).json({ message: 'Task fetch successfully', task: task });

})
router.delete('/:id', async function (req, res) {

let taskDel = await Task.findById(req.params.id)
if (!taskDel) {
return  res.status(404).json({ message: 'Task not found', task: taskDel });

}
await Task.deleteOne({_id: req.params.id})

res.status(204).json({ message: 'Task delete successfully' });

})



export default router