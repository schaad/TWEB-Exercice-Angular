angular.module('scopeExample', ['chart.js'])

.controller('firstController', ['$scope', function($scope){
	$scope.name = "Valentin";

	$scope.labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];
  	$scope.data = [300, 500, 100];
}]);