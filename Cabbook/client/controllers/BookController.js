angular.module('myApp').controller('BookController',function($scope,$filter, $http,$rootScope,$location,$cookies){

$scope.Booking='';

$scope.confirmBooking=function(){
var ub=$cookies.getObject('authUser');
$scope.Booking={
  User:ub.currentUser.userInfo,
  StartPoint:$rootScope.startPoint,
  EndPoint:$rootScope.endPoint,
  BookingDate:$rootScope.bookDate,
  BookingTime:$rootScope.bookTime,
  Distance:$rootScope.di,
  Time:$rootScope.tym,
  Amount:$rootScope.Tot,
  BookingType:'Later',
  CabCategory:$rootScope.SelCar
}

var today = new Date();
             var date = today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear();
        var h = today.getHours(),
            m = today.getMinutes();
        a = m < 10 ? ("0" + m) : (m);
        var mytime=((h > 12) ? (h - 12 + ':' + a + ' PM') : (h + ':' + a + ' AM'));

       //var cust = $cookies.getObject('userdet');
        var ldate = $filter('date')($scope.Booking.BookingDate, 'dd/MM/yyyy');
       var l = $filter('date')($scope.Booking.BookingDate, 'yyyy-MM-dd');
      var ltime = $filter('date')($scope.Booking.BookingTime, 'h:mm a');
                  //var ltime = $filter('date')($scope.latertime, 'h:mm a');
            var ha=ldate+" "+ltime;
            console.log(ha);
            var choosendate=new Date(l+" "+ltime );

                console.log($scope.Booking.BookingTime+(60 * 60 * 12 * 1000));
               var start=today.getTime()+(60 * 60 * 12 * 1000);
                var end=today.getTime()+(60 * 60 * 48 * 1000);
                 var advancetimestart=Date.parse($filter('date')(start, 'dd/MM/yyyy h:mm a'));
                 var advancetimeend=Date.parse($filter('date')(end, 'dd/MM/yyyy h:mm a'));
                 console.log(start);
                 console.log(end);
                 console.log(advancetimeend);
                 var deadLineStart=Date.parse(ldate+" "+ltime);
                 if(start<choosendate&&end>choosendate){
                    //    $scope.ridelaterdetails={
                    //     custmob:cust.mobileNum,
                    //      pickup:$scope.pickupLocation,
                    //      drop:$scope.dropLocation,
                    //   ridedate:ldate,
                    //     ridingtime:ltime,
                    //    distance:$scope.mydist,
                    //      status:'Ride Later',
                    //      totalfare:$scope.myrate,
                    // }
                    console.log($scope.Booking);
                 $http.post('/bookingapi/AddBooking/',$scope.Booking).then(function(response){
                        console.log('Data Saved Successfully');
                         alert('Data for ride later  Saved Successfully');
                    });

                 }else {
                    alert("Your booking is cacncelled. \n Your ride time should be greater than 12 hours from now and less than 48 hours");
                 }

 alert('Booking Done!');
  $location.path('/');
}
});
