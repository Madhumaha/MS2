var express=require('express');
var mongoose=require('mongoose');
var router=express.Router();
var UserDetails=require('../models/users.js');
var jwt = require('jsonwebtoken');

router.post('/addCustomer', function (req, res) {
 var us = new UserDetails();
   us.FirstName=req.body.fname;
   us.LastName=req.body.lname;
   us.Address=req.body.add;
   us.UserEmail=req.body.emailuser;
   us.Password=us.generateHash(req.body.pswd);
   us.Phone=req.body.phone;
   us.Role='Customer';
   us.Status='active';
   us.save(function(err){
   if(err){
      res.json(err);
   }
   else{
     res.json({
        success: true
          });
    console.log('Customer added Successfully');
   }
 });
});

router.put('/updateDriverUser/:phone/:fname/:lname/:add/:email' , function(req,res)
{
  UserDetails.findOneAndUpdate({Phone:req.params.phone},
    {
     $set:{FirstName:req.params.fname,
       LastName:req.params.lname,
       Address:req.params.add,
       UserEmail:req.params.email
         }
   },function (err, docs) {
   res.json(docs);
   console.log('hi inside Userapi');
   console.log(docs);
  });
});

router.put('/updatePassword/:uname/:new' , function(req,res)
{
   var us = new UserDetails();
    UserDetails.findOneAndUpdate({UserEmail:req.params.uname},
    {
     $set:{Password:us.generateHash(req.params.new),
          }
   },function (err, docs) {
   res.json(docs);
   console.log('hi inside UserPasswordapi');
   console.log(docs);
  });
});



   router.get('/GetUserById',function(req,res){
     UserDetails.find({},function(err,data){
       res.json(data);
            console.log(data);
         });

      });

   router.delete('/deleteDriverUser/:phone',function(req, res){
     UserDetails.remove({Phone:req.params.phone},function(err, docs){
       console.log('Driver from UserDetails Removed Successfully');
     });
   });

router.post('/addDriverUser', function (req, res) {
 var us = new UserDetails();
   us.FirstName=req.body.fname;
   us.LastName=req.body.lname;
   us.Address=req.body.add;
   us.UserEmail=req.body.emailuser;
   us.Password=us.generateHash('Password');
   us.Phone=req.body.phone;
   us.Role='Driver';
   us.Status='active';
   us.save(function(err){
   if(err){
      res.json(err);
   }
   else{
     res.json({
                   success: true
               });
               console.log('Driver added Successfully');
   }
 });
});

router.post('/login', function(req, res) {
    UserDetails.findOne({
        UserEmail: req.body.Email
    }, function(err, user) {
        if (err) {
            res.json(err);
        } else if (!user) {
            res.json({
                success: false,
                message: 'Sorry wrong email id'
            });
            console.log('Wrong Email');
        } else if (!user.validPassword(req.body.Password)) {
            res.json({
                success: false,
                message: 'Sorry wrong password'
            });
            console.log('Wrong Password');
        } else if (user) {
            var token = jwt.sign(user, 'thisismysecret', {
                expiresIn: 1400
            });
            res.json({
                success: true,
                token: token,
                isLoggedIn: true,
                userDetail: user
            });
            console.log('token is '+token);
            console.log('Token Created');
        }
    });
});

   module.exports=router;
