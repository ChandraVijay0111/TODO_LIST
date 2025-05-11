const router=require("express").Router();
const user = require("../schema/user");
const list=require("../schema/list");
const bcrypt =require("bcryptjs");
//signin

router.post('/signup', async (req,res) => {
    try {
        const {email,username,password}=req.body;
        
        const pass=bcrypt.hashSync(password);
        const exist=await user.findOne({email:email});
        if(exist){
            res.status(200).json({message:"user exist"})
        }
        else{
        const User = new user({email,username,password:pass});
        await User.save().then(()=>
            res.status(200).json({message:"sign up successful"})
        )
    }
    } catch (error) {
        res.status(200).json({message: "fill up all the blocks"});
    }

});

//login
router.post('/login', async (req,res) => {
    try {
        const User= await user.findOne({email: req.body.email});
        if(!User){
            res.status(200).json({message:"signin first"});
        }
        else{
        const ispass=bcrypt.compareSync(req.body.password,User.password);
        if(!ispass){
            res.status(200).json({message:"not the correct password"});
        }
        else{
            const {password,...others}=User._doc;
            res.status(200).json({others,message:"welcome"});
            
        }
    }
        
    } catch (error) {
        res.status(200).json({message: "OOPs"});
    }
});

//find
router.get("/find",async (req,res) => {
    try {
        const {id}=req.body;
        const exist=await user.findOne({_id:id});
        if(exist){
            
            res.status(200).json({message:"got"});
            
        }
        else{
            res.status(200).json({message:"not"});
        }
    } catch (error) {
        res.status(400).json({message:"error in finding"});
    }
})

//adding task
router.post("/add",async (req,res) => {
    try {
        const {title,body,id}=req.body;
        const exist=await user.findOne({_id:id});
        if(exist){
            const List=new list({title,body,user:exist});
            await List.save();
            exist.list.push(List);
            await exist.save();
            res.status(200).json({List});
            
        }
        else{
            res.status(200).json({message:"sign in first"});
        }
    } catch (error) {
        res.status(400).json({message:"error in saving"});
    }
})
//updating task
router.put("/update",async (req,res) => {
    try {
        const {title,body,id}=req.body;
        // const exist=await user.findOne({_id:id});
        // if(!exist){
        //     res.status(200).json({message:"user doesnot exist"});
        // }
        // if(exist){
            const List=await list.findByIdAndUpdate(id,{title,body},{new:true});
            List.save().then(()=>
                res.status(200).json({List})
            )
            
        // }
    } catch (error) {
        res.status(400).json({message:"error in updating"});
    }
})

//deleting task
router.delete("/delete/:id",async (req,res) => {
    try {
        const {id}=req.body;
        const exist=await user.findOneAndUpdate({id:id},{$pull:{list:req.params.id}});
        if(!exist){
            res.status(200).json({message:"user doesnot exist"});
        }
        if(exist){
            await list.findByIdAndDelete(req.params.id).then(()=>
                res.status(200).json({message:"task deleted"})
            )  
        }
    } catch (error) {
        res.status(400).json({message:"error in deleting"});
    }
})

//gettask
router.get("/get/:id",async (req,res) => {
    try {
        const exist=await user.findOne({_id:req.params.id});
        if(exist){
            const List =await list.find({user:req.params.id});
            if(List.length!==0){
            res.status(200).json({List});
            }
            else{
                res.status(200).json({message:"NO TASKS TO SHOW"});
            }
        }
        else{
            res.status(200).json({message:"id is incorrect"})
        }
    } catch (error) {
        res.status(400).json({message:"error in getting"});
    }
})



module.exports = router;