angular.module('myApp').controller('NavbarController', function ($http, $rootScope, $scope, $location, $cookies, AuthenticationService)
  {
    $rootScope.myUsername = '';
    $rootScope.myUserrole = '';
    $rootScope.isLoggedIn = false;

     function navUser()
     {
       var authUser = $cookies.getObject('authUser');

        if (authUser != undefined)
        {
        var loggedInUser = authUser.currentUser.userInfo;
        var isLoggedIn = authUser.currentUser.isLoggedIn;
            if (isLoggedIn)
            {
            $rootScope.isLoggedIn = isLoggedIn;
            $rootScope.myUsername = loggedInUser.fname;
            $rootScope.myUserrole = loggedInUser.role;
            $rootScope.myEmail = loggedInUser.email;
            $rootScope.myMobile = loggedInUser.mobile;
            }
        }
        else
        {
        $rootScope.isLoggedIn = false;
        }
    }

      navUser();
});
