const express=require('express')
const {Usermodel}=require('../model/user.model')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')


const userRouter=express.Router()

userRouter.post('/register',async(req,res)=>{
    const {name,email,password}=req.body
    let x=false
    let str=''
    for(let i=0;i<email.length;i++){
        if(email[i]==='@'){
            x=true
        }else if(x){
            str+=email[i]
        }
    }
    try{
        bcrypt.hash(password, 4, async(err, hash)=> {
            if(err){
                console.log(err)
                res.send({'msg':'Signup unsuccessful'})
            }else{
                if(str==='masaischool.com'){
                    const new_user=new Usermodel({name,email,password:hash,role:'admin'})
                    await new_user.save()
                    res.send({'msg':'Signup successful'})
                }else{
                    const new_user=new Usermodel({name,email,password:hash,role:'user'})
                    await new_user.save()
                    res.send({'msg':'Signup successful'})
                }
            }
        });
    }catch(err){
        console.log(err)
        res.send({'msg':'Signup unsuccessful'})
    }
})

userRouter.post('/login',async(req,res)=>{
    const {email,password}=req.body
    const check=await Usermodel.find({email})
    try{
        bcrypt.compare(password, check[0].password, function(err, result) {
            if(result){
                    var token = jwt.sign({ user_id: check[0]._id }, 'masaijob');
                    res.send({'msg':'Login successful',token,'role':check[0].role})
            }else{
                console.log(err)
                res.send({'msg':'Wrong credentials'})
            }
        });
    }catch(err){
        console.log(err)
        res.send({'msg':'Login error'})
    }
})


module.exports={userRouter}