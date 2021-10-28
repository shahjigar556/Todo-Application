const mongoose=require('mongoose');

const connectDB=async ()=>{
    try {
        //console.log(process.env.MONGO_URI)
        const conn=await mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true});
        console.log('connected to Database')
    } catch (error) {
        console.log(error.message)
    }
}

module.exports=connectDB;