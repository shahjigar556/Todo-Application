const express=require('express');
const router=express.Router();
const Tasks=require('../models/taskSchema');

router.get('/',async (req,res)=>{
    try {
        const tasks=await Tasks.find({});
        console.log('sending Tasks')
        res.json(tasks);
        
    } catch (e) {
        console.log(e.message);
        res.status(500).send('Internal server error')
    }
})

router.post('/',async (req,res)=>{
    try {
        console.log(req.body)
        const {text,description,status}=req.body;
        let task=new Tasks({
            text,
            description,
            status:status==undefined?'new':status
        })
        await task.save();
        res.json(task);
    } catch (e) {
        console.log(e.message)
        res.status(500).send('Internal server error')
    }
})

router.put('/:id',async (req,res)=>{
    try {
        const id=req.params.id;
        const {text,description,status}=req.body;
        const task=await Tasks.findByIdAndUpdate(id,{text,description,status},{new:true})
        // add logic is status is completed
        res.json(task);
    } catch (e) {
        console.log(e.message)
        res.status(500).send('Internal server error')
    }
})

router.delete('/:id',async (req,res)=>{
    try {
        const id=req.params.id;
        console.log(id)
        const task=await Tasks.findByIdAndDelete(id)
        res.json(task)
        
    } catch (e) {
        console.log(e.message)
        res.status(500).send('Internal server error')
    }
})

module.exports=router;