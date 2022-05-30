const express = require('express')
const rout = express.Router()
const Report = require('../models/reporters')
const auth = require('../modelware/auth')
// const multer =require('multer')


// =============================================
rout.post('/signup',async(req,res)=>{
const reporters = new Report (req.body)
const token = await reporters.tokenCode()
reporters.save().then(()=>{
    res.status(200).send({reporters,token})
}).catch((e)=>{
    res.status(400).send(e.message)
})
})

                //   ==============================

rout.post('/login',async(req,res)=>{
 try{
   const reporters = await Report.findData(req.body.email)
   const token =  await reporters.tokenCode()
   res.status(200).send({reporters,token}) 

}catch(e){
    res.status(400).send(e.message)
}
})  


// ============================================================ 


rout.delete('/logout',auth,async(req,res)=>{
    try{
        req.reporters.tokens = req.reporters.tokens.filter((el)=>{
 
            return el !== req.token
        })
        await req.user.save()
        res.send()
    }
    catch(e){
        res.status(500).send(e.message)
    }
})


// ============================================================

rout.patch('/profile/:id',auth,async(req,res)=>{
    try{
    const reporters = await Report.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
      runValidators:true 
       })
if(!reporters){
        res.status(400).send('user not found')
}
res.status(500).send(reporters)
    }
    catch(e){
        res.status(400).send(e.message)
    }
})
 
// // ==================================================================
rout.delete('/logout/:id',auth,async(req,res)=>{
    try{
const reporters = await Report.findByIdAndDelete(req.params.id)
if(!reporters){
    res.status(400).send('Not found to delete')
}
res.status(200).send(reporters)
    }
    catch(e){
        res.status(400).send(e.message)
    }
})

// // =================================================================
rout.get('/users/:id',auth,(req,res)=>{
 
        const _id = req.params.id
        Report.findById(_id).then((reporters)=>{
            if(!reporters){
            return res.status(404).send('Not Found')
            }
            res.status(200).send(reporters)
        }).catch((e)=>{
            res.status(500).send(e.message)
        })
    })
// // ==================================================================================

rout.get('/users',auth,(req,res)=>{
    Report.find({}).then((reporters)=>{
        res.status(200).send(reporters)
    }).catch((e)=>{
        res.status(500).send(e)
    })
})
 // =================================================

//  
// =========================================


module.exports = rout