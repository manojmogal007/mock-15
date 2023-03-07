const express=require('express')
require('dotenv').config()
const cors=require('cors')
const {connection}=require('./config/db')
const {userRouter}=require('./routes/user.routes')
const {jobRouter}=require('./routes/job.routes')


const app=express()
app.use(express.json())
app.use(cors())
app.use('/user',userRouter)
app.use('/job',jobRouter)


app.listen(process.env.port,async()=>{
    try{
        await connection
        console.log('Connected to database')
    }catch(err){
        console.log(err)
        console.log('Database connection error')
    }
    console.log(`Server running on port ${process.env.port}`)
})