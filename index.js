import express from "express"
import 'dotenv/config'
import mongoose from "mongoose"
import router from "./routers/tasks.js"
import auth from "./routers/auth.js";


const app = express()
const port = 3000

mongoose.connect(process.env.MONGODBURI)
.then(()=>console.log('mongoDB connect'))
.catch((err)=>console.log('mongoDB is not connect' + err))

app.get('/', function (req, res) {
    res.send('Server is runing yop')
})

app.use(express.json())

app.use('/tasks', router)
app.use('/auth', auth)

app.listen(port)