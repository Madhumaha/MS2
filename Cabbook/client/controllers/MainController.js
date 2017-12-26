angular.module('myApp').controller('MainController', function($scope, $http,$rootScope,$location, $cookies) {

  var nav = this;
      nav.userName = '';
      nav.userType = '';
      $rootScope.isLoggedIn = false;
      initController();

      function initController() {
          var authUser = $cookies.getObject('authUser');
          console.log(authUser);
          if (authUser != undefined) {
              var loggedInUser = authUser.currentUser.userInfo;
              var isLoggedIn = authUser.currentUser.isLoggedIn;
              console.log(isLoggedIn);
              if (isLoggedIn) {
                console.log('ok');
                  $rootScope.isLoggedIn = isLoggedIn;
                    console.log($rootScope.isLoggedIn);
                  nav.userName = loggedInUser.fname;
                  $rootScope.name=nav.userName;
                  nav.userType = loggedInUser.role;
                  console.log(nav.userName);
                          console.log(nav.userType);
              }
          } else {
              nav.isLoggedIn = false;
          }
}
});
