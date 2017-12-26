var app=angular.module('myApp',['ngRoute','ngCookies', 'ngStorage']);
app.config(function($routeProvider,$locationProvider){
  $locationProvider.hashPrefix('');
  $routeProvider.when('/',{
    templateUrl: 'views/home.html',
    controller: 'HomeController'
  }).when('/start',{
    templateUrl: 'views/start.html',
    controller: 'StartController'
  }).when('/login',{
    templateUrl: 'views/Login.html',
    controller: 'LoginController'
  }).when('/logout', {
      templateUrl: 'views/home.html',
      controller: 'logoutController'
    }).when('/book',{
    templateUrl: 'views/book.html',
    controller: 'BookController'
  }).when('/Password',{
    templateUrl: 'views/Password.html',
    controller: 'AdminController'
  }).when('/booking',{
    templateUrl: 'views/booking.html',
    controller: 'DriverController'
  }).when('/register',{
    templateUrl: 'views/register.html',
    controller: 'RegisterController'
}).when('/adddriver',{
   templateUrl: 'views/adddriver.html',
   controller: 'AdminController'
}).when('/addtarriff',{
   templateUrl: 'views/addtarriff.html',
   controller: 'AdminController'
}).when('/driver',{
  templateUrl: 'views/driver.html',
  controller: 'DriverController'
}).when('/rides',{
  templateUrl: 'views/Rides.html',
  controller: 'StartController'
}).when('/unauthorized',{
  templateUrl: 'views/unauth.html'
}).otherwise({
  redirectTo: '/',
});
});

app.run(function($rootScope, $http, $location, $sessionStorage, $cookies,AuthenticationService) {
    if ($sessionStorage.tokenDetails ) {
        $http.defaults.headers.common.Authorization = $sessionStorage.tokenDetails.token;
    }

    //trying to access a restricted page without login
    $rootScope.$on('$locationChangeStart', function(event, next, current) {
        var publicPages = ['/','/login','/register'];
        var adminPage = ['/','/addtarriff','/adddriver','/passenger', '/login', '/logout', '/Password', '/register', '/rides'];
        var passengerPage = ['/','/rides', '/passenger', '/login','/book', '/logout', '/Password', '/register','/start'];
        var driverPage = ['/','/driver', '/login', '/logout', '/Password', '/register', '/rides', '/booking'];

        var authUser = $cookies.getObject('authUser');
var restrictedPage = publicPages.indexOf($location.path()) === -1;

        if (authUser != undefined) {
            var loggedInUser = authUser.currentUser.userInfo;
        }

        if (restrictedPage && !$sessionStorage.tokenDetails && $location.path() != '') {
            $location.path('/login');
        }
        else {
                  if (authUser != undefined) {
                      if (loggedInUser.role == 'Admin') {
                          var IamnotAdmin = adminPage.indexOf($location.path()) === -1;
                          if (IamnotAdmin) {
                              $location.path('/unauthorized');
                          }
                      }
                      if (loggedInUser.role == 'Customer') {
                          var IamnotPassenger = passengerPage.indexOf($location.path()) === -1;
                          if (IamnotPassenger) {
                              $location.path('/unauthorized');
                          }
                      }
                      if (loggedInUser.role == 'Driver') {
                          var IamnotDriver = driverPage.indexOf($location.path()) === -1;
                          if (IamnotDriver) {
                          $location.path('/unauthorized');
                          }
                      }
                  }
              }

        console.log('RestrictedPage '+restrictedPage);
        console.log($sessionStorage.tokenDetails);
    });
});
