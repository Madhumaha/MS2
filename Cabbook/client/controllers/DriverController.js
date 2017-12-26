angular.module('myApp').controller('DriverController',function($scope, $http,$rootScope,$location,$cookies){
  var num,n,car,carn,carnum,CarCategory,cart,DriverDetails;
  var socket = io();
  $(document).ready(function(){
  var name=$cookies.getObject('authUser');
  var drivername=name.currentUser.userInfo.fname;
  var drivermob=name.currentUser.userInfo.mobile;
  var email=name.currentUser.userInfo.email;
  $http.get('/api/getDriverById/'+drivermob).then(function (response) {
    if(response){
      console.log(response.data);
      $scope.getDriverCab=response.data;
      carnum=$scope.getDriverCab[0].CarNumber;
      car=$scope.getDriverCab[0].CarName;
      CarCategory=$scope.getDriverCab[0].CarCategory;
      DriverDetails={
      driverName : drivername,
      mobi:drivermob,
      cart:car,
      carn:carnum,
      carcat:CarCategory
      };
      socket.emit('DriverDetail', {
           All: DriverDetails
          });
    }
    else {
        console.log('sorry no response');
    }
  });

  $http.get('/bookingapi/GetAllBookings/'+drivermob).then(function (response) {
    if(response){
      console.log('inside GetAllBookings')
      $scope.GetAllBookings=response.data;
      console.log($scope.GetAllBookings);
        }
    else {
        console.log('sorry no response');
    }
  });
});
  socket = io.connect('http://localhost:4000', {reconnect: false});
    socket.on('MyBook', function(data) {
    console.log('connected');
    $scope.startLoc=data.msg.startP;
    $scope.EndLoc=data.msg.endP;
    $scope.mob=data.msg.mobi;
    $scope.customer=data.msg.cust;
    $scope.bookFare=data.msg.Fare;
    num=  $scope.bookFare;
    n = num.toFixed(2);
    $("#myDriverModal").modal();
    document.getElementById('fp').innerHTML=$scope.startLoc;
    document.getElementById('ep').innerHTML=$scope.EndLoc;
    document.getElementById('mo').innerHTML=$scope.mob;
    document.getElementById('cu').innerHTML=$scope.customer;
    document.getElementById('fa').innerHTML=n;
    console.log($scope.startLoc);
    console.log(n);
    });
    $(document).ready(function(){

        $("#myBtn").click(function(){
          if($scope.startLoc!=undefined&&$scope.EndLoc!=undefined)
          {
          $("#myDriverModal").modal();
          document.getElementById('fp').innerHTML=$scope.startLoc;
          document.getElementById('ep').innerHTML=$scope.EndLoc;
          document.getElementById('mo').innerHTML=$scope.mob;
          document.getElementById('cu').innerHTML=$scope.customer;
          document.getElementById('fa').innerHTML=n;
            }
            else {
            alert('No current bookings for you');
        }
        });


    });
  function initialize() {
    if (navigator.geolocation)
            {
              navigator.geolocation.getCurrentPosition(success);
            }
      else {
          alert("Geo Location is not supported on your current browser!");
           }
        }initialize();

      function success(position) {
        var lat = position.coords.latitude;
        var long = position.coords.longitude;
        var myLatlng = new google.maps.LatLng(lat, long);
        geocoder = new google.maps.Geocoder();
        directionsService = new google.maps.DirectionsService();
        directionsDisplay = new google.maps.DirectionsRenderer({
        suppressMarkers: true
        });
        var myOptions = {
            zoom: 15,
            center: myLatlng,
            mapTypeId: google.maps.MapTypeId.ROADMAP
           }
        map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
        directionsDisplay.setMap(map);
        marker=  new google.maps.Marker({
        position: myLatlng,
        map: map,
        icon: '../public/Img/car_ic.png',
        draggable: true,
        animation:  google.maps.Animation.DROP,
        });


        var infoWindow = new google.maps.InfoWindow({map: map});
          infoWindow.setPosition(myLatlng);
          infoWindow.setContent('Location Found');
          map.setCenter(myLatlng);



          function init()
          {
            geocoder.geocode({ 'latLng': myLatlng }, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                      if (results[0]) {

                    dloc=results[0].formatted_address;
                    console.log(dloc);
                    socket.emit('MyMessage', {
                        message: dloc
                    });
                    socket.emit('SendLocation',{
                      position: myLatlng
                    });

                      }
                  }
            });
          }
          init();

};
});
