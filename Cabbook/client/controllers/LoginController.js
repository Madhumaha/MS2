angular.module('myApp').controller('LoginController', function($cookieStore,$scope, $http, AuthenticationService, $location,$rootScope,$cookies) {

    $scope.LoginUser = function() {
        $rootScope.isLoggedIn = false;
        AuthenticationService.Login($scope.User, function(response) {
            if (response.data.success === true && response.data.userDetail.Role=='Admin') {
                  console.log($rootScope.userBook);
                  $location.path('/');

                  $rootScope.LoginName=$cookies.getObject('authUser');
                  console.log($rootScope.LoginName);
                  $rootScope.checkedAdmin=false;
                  }
                  if (response.data.success === true && response.data.userDetail.Role=='Driver') {
                    $location.path('/driver');
                    $rootScope.LoginName=$cookies.getObject('authUser');
                    $rootScope.checked=false;
                    $rootScope.checkedBook=false;

                  }
                  if (response.data.success === true && response.data.userDetail.Role=='Customer') {
                    $location.path('/');
                    $rootScope.LoginName=$cookies.getObject('authUser');
                    $rootScope.checked=false;
                    $rootScope.checkedRide=false;
                  }
                  else {
                    console.log('Not authorized');
                  }
        });
    };

function init(){
    AuthenticationService.Logout();
    $rootScope.checked=true;
    };
    init();
})
