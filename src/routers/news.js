const express = require('express')
const rout = express.Router()
// const Report = require('../models/reporters')
// const multer =require('multer')
const auth = require('../modelware/auth')
const News = require('../models/news')

// ============================================================
rout.post('/news',auth,async(req,res)=>{
    try{
        
         const news = new News(req.body)
         await news.save()
         res.status(200).send(news)
    }
    catch(e){
        res.status(400).send(e.message)
        console.log(e.message);
    }
})

// =============================================
rout.get('/news',auth,(req,res)=>{
    News.find({}).then((news)=>{
        res.status(200).send(news)
    }).catch((e)=>{
        res.status(500).send(e)
    })
})

rout.get('/news/:id',auth,(req,res)=>{    
    News.findById(req.params.id).then((news)=>{
        if(!news){
        return res.status(404).send('Unable to find user')
        }
        res.status(200).send(news)
    }).catch((e)=>{
        res.status(500).send(e)
    })
})

rout.delete('/news',auth,async(req,res)=>{
    try{
        req.news.tokens = req.news.tokens.filter((el)=>{
            return el !== req.token
        })
        await req.user.save()
        res.send()
    }
    catch(e){
        res.status(500).send(e.message)
    }
})



rout.patch('/news/:id',async(req,res)=>{
    try{
        const news = await News.findByIdAndUpdate(req.params.id,req.body,{
            new:true,
            runValidators:true
        })
        if(!news){
            return res.status(404).send('Not found')
        }
        res.status(200).send(news)
    }
    catch(e){
        res.status(400).send(e.message)
    }
})

// ====================================================================

rout.delete('/news/:id',auth,async(req,res)=>{
    try{
        const news = await News.findByIdAndDelete(req.params.id)
        if(!news){
            return res.status(404).send('Not found')
        }
        res.status(200).send(news)
    }
    catch(e){
        res.status(500).send(e.message)
    }
     
})

// =======================================================

// const upload = multer({dest:'images',
//  fileFilter(req,file,cb){
//             if(!file.originalname.endsWith('jpg')){
//                 cb(new Error('Please upload pdf file'))
//             }
//             cb(null,true)
//         }
//     })
    
//     rout.post('/profile/avatar',auth,upload.single('avatar'),async(req,res)=>{
//         res.send('Uploaded Successfully')
//     })
    
// ===========================================        

module.exports = rout
