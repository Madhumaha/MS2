angular.module('myApp').controller('logoutController', function($http, $scope, $rootScope, AuthenticationService, $location)
{
$scope.LogoutUser = function()
{
 AuthenticationService.Logout();
 console.log('logout happened');
 $rootScope.currentUser = {};
 delete $rootScope.currentUser;
 sessionStorage.clear();
 $location.path('/');
}
$scope.LogoutUser();
});
