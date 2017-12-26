var mongoose=require('mongoose');
var DriverSchema=mongoose.Schema({
  Phone:String,
  License:String,
  CarName:String,
  CarModel:String,
  CarCategory:String,
  CarNumber:String,
});

module.exports=mongoose.model('DriverDetails',DriverSchema, 'DriverDetails');// DriverDetails collection name
