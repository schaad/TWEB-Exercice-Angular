var tweb = angular.module('tweb', ['ngRoute', 'chart.js']);

tweb.controller('mainController', ['$route', '$routeParams', '$location',
  function($route, $routeParams, $location) {
    this.$route = $route;
    this.$location = $location;
    this.$routeParams = $routeParams;
}])

tweb.controller('firstController', ['$scope', function($scope){

	$scope.labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];
  	$scope.data = [300, 500, 100];

  	$scope.home = "active";
  	$scope.admin = "";

  	$scope.title = "Vos résultats";
}]);


tweb.config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
			when('/home', {
				templateUrl: 'home.html',
				controller: 'firstController'
			}).
			when('/admin', {
				templateUrl: 'admin.html',
				controller: 'secondController'
			}).
			otherwise({
				templateUrl: 'home.html',
				controller: 'firstController'
			});
	}]);

tweb.controller('secondController', function($scope){
	$scope.home = "";
  	$scope.admin = "active";
});