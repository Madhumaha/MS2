var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var UserSchema=mongoose.Schema({
  FirstName:String,
  LastName:String,
  Password:String,
  Address:String,
  Phone:String,
  UserEmail:String,
  Role:String,
  Status:String
});

//Encrypting Password
UserSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

//Decrypting Password
UserSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.Password);
}
module.exports=mongoose.model('UserDetails',UserSchema, 'UserDetails');// DriverDetails collection name
