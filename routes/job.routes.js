const express=require('express')
const {Jobmodel}=require('../model/job.model')




const jobRouter=express.Router()


jobRouter.post('/addjob',async(req,res)=>{
    try{
        const new_job=new Jobmodel(req.body)
        await new_job.save()
        res.send({'msg':'Job posted successfully'})
    }catch(err){
        console.log(err)
        res.send({'msg':'Job posting error'})
    }
})

jobRouter.get('/all',async(req,res)=>{
    const query=req.query
    console.log(query)
    try{
        if(query.location&&query.contract){
            const all_jobs=await Jobmodel.find({location:query.location,contract:query.contract})
            res.send({'msg':'All jobs',all_jobs})
        }else if(query.name){
            const all_jobs=await Jobmodel.find({company:{$regex:`${query.name}`}})
            res.send({'msg':'All jobs',all_jobs})
        }if(query.location){
            const all_jobs=await Jobmodel.find({location:query.location})
            res.send({'msg':'All jobs',all_jobs})
        }else if(query.contract){
            const all_jobs=await Jobmodel.find({contract:query.contract})
            res.send({'msg':'All jobs',all_jobs})
        }else{
            const all_jobs=await Jobmodel.find()
            res.send({'msg':'All jobs',all_jobs})
        }
    }catch(err){
        console.log(err)
        res.send({'msg':'Job getting error'})
    }
})

jobRouter.patch('/update/:id',async(req,res)=>{
    const id=req.params.id
    try{
        await Jobmodel.findByIdAndUpdate({_id:id},req.body)
        res.send({'msg':'Job updated'})
    }catch(err){
        console.log(err)
        res.send({'msg':'Job update error'})
    }
})

jobRouter.delete('/delete/:id',async(req,res)=>{
    const id=req.params.id
    try{
        await Jobmodel.findByIdAndDelete({_id:id})
        res.send({'msg':'Job deleted'})
    }catch(err){
        console.log(err)
        res.send({'msg':'Job delete error'})
    }
})





module.exports={jobRouter}