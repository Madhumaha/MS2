angular.module('myApp').controller('RegisterController',function($http,$scope,$location){
  $scope.registerCustomer=function(){
    $http.post('/userapi/addCustomer',$scope.cust).then(function(response){
      console.log('Customer registered successfully');
    });
      alert("Customer registered Successfully!");
      $scope.cust='';
      $location.path('/login');

  }
});
