var express=require('express');
var mongoose=require('mongoose');
var path=require('path');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io').listen(server);

var DriverRoute=require('./server/routes/DriverApi.js');
var TariffRoute=require('./server/routes/TariffApi.js');
var UserRoute=require('./server/routes/UserApi.js');
var BookingRoute=require('./server/routes/BookingApi.js');
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use('/', express.static(path.join(__dirname, './client')));

mongoose.connect('mongodb://localhost:27017/cabbook');
var db=mongoose.connection;

db.on('open', function() {
    console.log('database connected!!!!');
});

db.on('error', function(err) {
    console.log(err);
});
var drivers=[];
io.on('connection', function(socket) {

  socket.on('SendLocation', function(data) {
    console.log('cab location found with socket');
          console.log(data.position);
          socket.broadcast.emit('SendtoAll', {
              location: data.position
          });
      });
    socket.on('MyMessage', function(data) {
          var driverInfo = new Object();
          driverInfo.driverlocation=data.message;
          driverInfo.driverId=socket.id;
          drivers.push(socket.id);
          driverInfo.driverArray=drivers;
          socket.broadcast.emit('NewMessage', {
            message: driverInfo
        });
    });

    socket.on('BookDetail', function(data) {
            socket.broadcast.emit('MyBook', {
            msg: data.All
        });

    });
    socket.on('DriverDetail', function(data) {
            socket.broadcast.emit('MyDriver', {
            msg: data.All
        });

    });

    socket.on('disconnect', function() {
      var driverDet = new Object();
        console.log('Client disconnected.');
        deleteFromArray(drivers, socket.id);
        console.log(drivers);
        driverDet.driverId=socket.id;
        driverDet.Arr=drivers;
        socket.broadcast.emit('DriverArr', {
        description: driverDet
    });
    });
    function deleteFromArray(my_array, element) {
  position = my_array.indexOf(element);
  my_array.splice(position, 1);
}

    socket.on('error', function (err) {
   console.log("Socket.IO Error");
   console.log(err.stack);
});
});


app.use('/api', DriverRoute);
app.use('/tariffapi', TariffRoute);
app.use('/userapi', UserRoute);
app.use('/bookingapi', BookingRoute);


server.listen(4000, function(req, res) {
    console.log('running on port 4000...');
});
