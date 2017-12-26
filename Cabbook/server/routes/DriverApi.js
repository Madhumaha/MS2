var express=require('express');
var mongoose=require('mongoose');
var router=express.Router();
var Drivers=require('../models/drivers.js');

router.get('/GetAllDrivers',function(req,res){
  Drivers.aggregate([{
          $lookup: {
              from: "UserDetails",
              localField: "Phone",
              foreignField: "Phone",
              as: "Cab"
          }
      }, {
          $match: {
              "Cab": {
                  $ne: []
              }
          }
      }]).exec().then(function(data) {
          res.json(data);
      });
   });

   router.get('/getDriverById/:Phone',function(req,res){
       Drivers.aggregate([
       { $match: {
           Phone: req.params.Phone
       }},{
             $lookup: {
                 from: "UserDetails",
                 localField: "Phone",
                 foreignField: "Phone",
                 as: "User"
             }
         }, {
             $match: {
                 "User": {
                     $ne: []
                 }
             }
         }]).exec().then(function(data) {
           console.log(data);
             res.json(data);
         });
      });

   router.delete('/deleteDriver/:phone',function(req, res){
     Drivers.remove({Phone:req.params.phone},function(err, docs){
       console.log('Driver from DriverDetails Removed Successfully');
     });
   });

   router.put('/updateDriver/:phone/:license/:carcat/:carname/:carnum/:carmodel' , function(req,res)
   {
     Drivers.findOneAndUpdate({Phone:req.params.phone},
       {
        $set:{License:req.params.license,
          CarCategory:req.params.carcat,
          CarName:req.params.carname,
          CarNumber:req.params.carnum,
          CarModel:req.params.carmodel
        }
      },function (err, docs) {
      res.json(docs);
      console.log('hi inside Driverapi');
      console.log(docs);
     });
   });

   router.post('/addDriver', function (req, res) {
    var driver = new Drivers();
      driver.Image=req.body.image;
      driver.Name=req.body.name;
      driver.Phone=req.body.phone;
      driver.Address=req.body.address;
      driver.License=req.body.license;
      driver.CarName=req.body.carname;
      driver.CarCategory=req.body.Category;
      driver.CarModel=req.body.carmodel;
      driver.CarNumber=req.body.carnumber;
      driver.save(function(err){
      if(err){
        console.log(err);
      }
      else{
        console.log('Driver added Successfully');
        res.send('data saved');
      }
    });
});
   module.exports=router;
