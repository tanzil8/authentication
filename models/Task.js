import mongoose from "mongoose";

const { Schema } = mongoose;

const taskSchema = new Schema({
    task : String
},{timestamps: true})

// Create a model from the schema
const Task = mongoose.model('Tasks', taskSchema);

// Export the model
export default Task;