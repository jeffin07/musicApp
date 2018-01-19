const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const Video=require('../models/video');
const db="mongodb://127.0.0.1:27017/videoplayer";
//mongoose.Promise=global.Pormise;
mongoose.connect(db,function(err){
  if(err){
    console.log("error: "+err);
  }
});

router.get('/videos',function(req,res){
  console.log("Getting request for all videos");
  Video.find({})
  .exec(function(err,videos){
    if(err){
      console.log(err);
    }
    else{
      res.json(videos);
    }
  });
});
router.get('/videos/:titlename',function(req,res){
  console.log("Getting request for title");
  Video.find({title:req.params.titlename})
  .exec(function(err,videos){
    if(err){
      console.log(err);
    }
    else{
      res.json(videos);
    }
  });
});
router.post('/video', function(req,res){

  console.log("new Video entry");
  var newVideo=new Video();
  newVideo.title=req.body.title;
  newVideo.url=req.body.url;
  newVideo.discription=req.body.discription;
  newVideo.save(function(err,insertedVideo){
    if(err){
      console.log("Not inserted!!!!");
    }
    else{
      res.json(insertedVideo);
    }
  });


});
router.put('/video/:id',function(req,res){
  console.log("Updating a video");
  Video.findByIdAndUpdate(req.params.id,
    {
      $set:{title:req.body.title,url:req.body.url,discription:req.body.discription}
    },
  {
    new:true
  },function(err,updatedVideo){
    if(err){
      console.log("error in updated video");
    }else{
      res.json(updatedVideo);
    }
  });
})
router.delete('/video/:id',function(req,res){
  console.log("Deleting a video");
  Video.findByIdAndRemove(req.params.id,function(err,deletedVideo){
    if(err){
      res.send("Errpr deleting video");
    }else{
      res.json(deletedVideo);
    }
  })
})
module.exports=router;
