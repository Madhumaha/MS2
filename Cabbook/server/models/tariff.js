var mongoose=require('mongoose');
var TariffSchema=mongoose.Schema({
  Category:String,
  BaseFare:Number,
  DistanceFare:Number,

  StartPeakTime:String,
  EndPeakTime:String,
  PeakFare:Number
});

module.exports=mongoose.model('TariffDetails',TariffSchema, 'TariffDetails');// DriverDetails collection name
