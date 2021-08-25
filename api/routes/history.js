const router=require('express').Router();
const History=require('../models/history');
router.post('/',async (req,res)=>{
    const history=new History(req.body);
    console.log(req.body);
        try{
    const newpost=await history.save();
console.log(newpost);
    return res.status(200).json(newpost);
    }catch(err){
        return res.status(400).json("chal hatt");
    }
    })
//
router.get('/',async (req,res)=>{
    const user=req.query.user;
   
    try{
        let post;
if(user){
    post=await History.find({username:user});

}
else{
    post=await History.find();
}
res.status(200).json(post);
    }catch(err){
        res.status(400).json(err);  
    }
})
router.get('/:id',async(req,res)=>{
   console.log(req.params.id);
    try{
        const post=await History.findById(req.params.id);
        console.log(req.params.id);
       

        return res.status(200).json(post);
    }catch(err){
        res.status(400).json(err);  
    }

})
module.exports=router;