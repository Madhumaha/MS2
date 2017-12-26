angular.module('myApp').controller('AdminController',function($scope, $http,$rootScope,$location,AuthenticationService,$cookies){
var array1=[];
var arr;
var authUser = $cookies.getObject('authUser');
  $scope.mymail = authUser.currentUser.userInfo.email;

$scope.CabData=[];
  $(document).ready(function(){
  $(".hr-time-picker").hrTimePicker();
  $('#timepicker1').timepicki();
  $('#timepicker2').timepicki();
  $('#timepicker3').timepicki();
  $('#timepicker4').timepicki();
  });

  var init= function(){

  $http.get('/api/GetAllDrivers').then(function (response){
    $scope.CabData=response.data;
    console.log($scope.CabData);
  });

    $http.get('/tariffapi/GetAllTariffPlans').then(function (response) {
      $scope.TariffList=response.data;
    });

    $http.get('/userapi/GetAllUsers').then(function (response) {
     $scope.UserList=response.data;

    });
        console.log($scope.CabData);
  };

  init();

  var tabsFn = (function() {

  function init() {
    setHeight();
  }

  function setHeight() {
    var $tabPane = $('.tab-pane'),
        tabsHeight = $('.nav-tabs').height();

    $tabPane.css({
      height: tabsHeight
    });
  }

  $(init);
})();

$(function () {
    $(":file").change(function () {
        if (this.files && this.files[0]) {
            var reader = new FileReader();
            reader.onload = imageIsLoaded;
            reader.readAsDataURL(this.files[0]);
             var filePath = $('#file').val();
             $scope.imagePath=filePath.split("\\").pop();

            }
    });
});

function imageIsLoaded(e) {
    $('#myImg').attr('src', e.target.result);
};

$scope.addTariff=function(){
  $scope.tariff.Startpeak=$('#timepicker1').val();
  $scope.tariff.Endpeak=$('#timepicker2').val();
  $http.get('/tariffapi/GetAllTariffPlans').then(function (response) {
      $scope.TariffList=response.data;
    });
    //reapeated tarriff
    if($scope.TariffList.Category==$scope.tariff.Category)
    alert('Tarriff is already there');
    else
    {
  $http.post('/tariffapi/addTariff',$scope.tariff).then(function(response){
  console.log('Data of Tariff submitted successfully');
  });
  $scope.tariff='';
}


}

$scope.addDriver=function(){
  $http.post('/api/addDriver',$scope.driver).then(function(response){
    console.log('Data of Driver submitted successfully');
  });

  $http.post('/userapi/addDriverUser',$scope.driver).then(function(response){
    console.log('Data of Driver submitted to User successfully');
  });

  $scope.driver='';
  $http.get('/api/GetAllDrivers').then(function (response){
    $scope.CabData=response.data;
  });
  }

$scope.deleteDriver = function(driver){
  var x=confirm("Are you sure you want to delete ?");
  if(x){
    $http.delete('/api/deleteDriver/'+driver.Phone).then(function (response) {
  });

  $http.delete('/userapi/deleteDriverUser/'+driver.Phone).then(function (response) {
});

  }
  $http.get('/api/GetAllDrivers').then(function (response){
    $scope.CabData=response.data;
  });
};

$scope.deleteTariff = function(tariff){
  var x=confirm("Are you sure you want to delete?");
  if(x){
    $http.delete('/tariffapi/deleteTariff/'+tariff._id).then(function (response) {
  });
  }
  $http.get('/tariffapi/GetAllTariffPlans').then(function (response) {
      $scope.TariffList=response.data;
    });
};

$scope.getDriverById=function(driver){
 $('#editDriver').modal('show');
  $http.get('/api/getDriverById/'+driver.Phone).then(function (response) {
    if(response){
      $scope.getDriver=response.data;
      console.log($scope.getDriver);
    }
    else {
      {
        console.log('sorry');
      }
    }
      });
};

$scope.getTariffById=function(tariff){
  console.log(tariff._id);
 $('#editTariff').modal('show');
  $http.get('/tariffapi/getTariffById/'+tariff._id).then(function (response) {
      $scope.getTariff=response.data;
        console.log($scope.getTariff);
  });
};

$scope.editDriver= function(driver){
    var x=confirm("Are you sure you want to update?");
  if(x){
    $http.put('/api/updateDriver/'+driver.Phone+'/'+driver.License+'/'+driver.CarCategory+'/'+driver.CarName+'/'+driver.CarNumber+'/'+driver.CarModel).then(function (response) {
  });

  $http.put('/userapi/updateDriverUser/'+driver.Phone+'/'+driver.User[0].FirstName+'/'+driver.User[0].LastName+'/'+driver.User[0].Address+'/'+driver.User[0].UserEmail).then(function (response) {
});

  }
  $('#editDriver').modal('hide');
  $http.get('/api/GetAllDrivers').then(function (response){
    $scope.CabData=response.data;
  });
};

$scope.editTariff= function(tariff){
  tariff.StartPeakTime=$('#timepicker3').val();
  tariff.EndPeakTime=$('#timepicker4').val();
  
  var x=confirm("Are you sure you want to update?");
  if(x){
    $http.put('/tariffapi/updateTariff/'+tariff._id+'/'+tariff.Category+'/'+tariff.BaseFare+'/'+tariff.DistanceFare+'/'+tariff.StartPeakTime+'/'+tariff.EndPeakTime+'/'+tariff.PeakFare).then(function (response) {
  });
  }
  $('#editTariff').modal('hide');
  $http.get('/tariffapi/GetAllTariffPlans').then(function (response) {
      $scope.TariffList=response.data;
    });
};




$scope.editPassword= function(usr){

  var x = document.getElementById("myText").placeholder;



if(document.getElementById('oo').value!=document.getElementById('tt').value)
{  alert('Password do not match Successfully!');}
else{

    $http.put('/userapi/updatePassword/'+x+'/'+usr.new).then(function (response) {
      if(response)
      {
        alert('Password changed Successfully!!'+'\n'+'Please Login Again');


        $scope.usr='';
            $location.path('/login');

      }
    });
  }

};

});
