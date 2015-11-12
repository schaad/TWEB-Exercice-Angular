angular.module('scopeExample', [])

.controller('firstController', ['$scope', function($scope){
	$scope.name = "Valentin";
}])