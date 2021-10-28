const express=require('express');
const router=express.Router();
const Tasks=require('../models/taskSchema');

router.get('/',async (req,res)=>{
    try {
        const {status}=req.query;
        if(status!=='all'){
            const tasks=await Tasks.find({status});
            res.json(tasks);
        }
        const tasks=await Tasks.find({});
        res.json(tasks);
    } catch (e) {
        console.log(e.message);
        res.status(500).send('Internal server error')
    }
})
router.get('/:id',async (req,res)=>{
    try {
        const task=await Tasks.findById(req.params.id);
        console.log('sending Tasks')
        res.json(task);
        
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
        if(task.status=='completed'){
            task.completed=true;
        }
        await task.save();
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