var express=require('express');
var mongoose=require('mongoose');
var router=express.Router();

var TariffDetails=require('../models/tariff.js');

router.delete('/deleteTariff/:id',function(req, res){
  TariffDetails.remove({_id:req.params.id},function(err, docs){
    console.log('Tariff Removed Successfully');
  });
});

router.get('/getTariffById/:id',function(req,res){
    console.log(req.params.id);
  TariffDetails.findById(req.params.id, function (err, docs) {
  if (err) {
      res.send(err)
  }
  if (docs) {
    console.log(docs);
      res.send(docs)
  } else {
      res.send("No Tariff found with that ID")
  }
});
  });

  router.get('/GetSelectedPlan/:m',function (req, res) {

  TariffDetails.find({Category:req.params.m},function(err,Data){
  if(err)
  {
    return res.send(err);
  }
  res.send(Data);
  console.log(Data);
});
});

  router.put('/updateTariff/:id/:cat/:base/:dist/:start/:end/:peak' , function(req,res)
  {
    TariffDetails.findOneAndUpdate({_id:req.params.id},
      {
       $set:{Category:req.params.cat,
         BaseFare:req.params.base,
         DistanceFare:req.params.dist,

         StartPeakTime:req.params.start,
         EndPeakTime:req.params.end,
         PeakFare:req.params.peak
       }
     },function (err, docs) {
     res.json(docs);
     console.log('hi inside api');
     console.log(docs);
    });
  });

   router.post('/addTariff', function (req, res) {
    var tariff = new TariffDetails();
      tariff.Category=req.body.Category;
      tariff.BaseFare=req.body.Basefare;
      tariff.DistanceFare=req.body.Distancefare;

      tariff.StartPeakTime=req.body.Startpeak;
      tariff.EndPeakTime=req.body.Endpeak;
      tariff.PeakFare=req.body.Peakfare;
      tariff.save(function(err){
      if(err){
        console.log(err);
      }
      else{
        console.log('Tariff added Successfully');
      }
    });
});

router.get('/GetAllTariffPlans',function(req,res){
  TariffDetails.find({},function(err,data){
    res.json(data);
         console.log(data);
      });

   });

module.exports=router;
