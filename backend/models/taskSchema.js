const mongoose=require('mongoose');

const taskSchema=mongoose.Schema({
    text:{
        type:String,
        required:true
    },
    completed:{
        type:Boolean,
        default:false
    },
    description:{
        type:String,
        required:true
    },
    status:{
        type:String,
        default:'new'
    }
})

const Tasks=mongoose.model('task',taskSchema);

module.exports=Tasks;