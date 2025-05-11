const mongoose=require("mongoose");
const userschema=new mongoose.Schema({
    email:{
        type: String ,
        unique:true,
        required : true ,
    },
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    list:[
        {
            type:mongoose.Types.ObjectId,
            ref:"list"
        }
    ]
});
module.exports = mongoose.model("user",userschema);