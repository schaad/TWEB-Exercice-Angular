// CLIENT
// Auteur : Valentin Schaad

// Dégueulasse de mettre le port en dur...
var socket = io.connect("127.0.0.1:3000");
// Encore plus crade d'utiliser des variables globales, mais pour le moment pas de temps à perdre sur les factory
var callbackDataReceived = null;

socket.on('initVote', function(data, label){

	if(callbackDataReceived !== null){
		callbackDataReceived(data, label);
	}
});

socket.on('updateVote', function(data){

	console.log("Recu updateVote");

	if(callbackDataReceived !== null){
		callbackDataReceived(data, null);
	}
});


var tweb = angular.module('tweb', ['ngRoute', 'chart.js']);

tweb.controller('mainController', ['$route', '$routeParams', '$location',
  function($route, $routeParams, $location) {
    this.$route = $route;
    this.$location = $location;
    this.$routeParams = $routeParams;
}]);

tweb.controller('headerController', ['$scope', '$location', 
	function($scope, $location) {
		$scope.isActive = function(route) {
        	return route === $location.path();
    	};

	}]);

tweb.controller('questionController', ['$scope', function($scope){
	$scope.vote = function(id){
  		socket.emit('voteFor', id);
  	};

  	$scope.reset = function(){
  		console.log("RESET");

  		socket.emit('reset');
  	};
}]);

tweb.controller('audienceController', ['$scope', function($scope){

  	$scope.question = "Comment trouvez-vous ce site ?";

}]);


tweb.config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
			when('/audience', {
				templateUrl: 'audience.html',
				controller: 'audienceController'
			}).
			when('/board', {
				templateUrl: 'board.html',
				controller: 'boardController'
			}).
			when('/debug', {
				templateUrl: 'debug.html',
				controller: 'debugController'
			}).
			otherwise({
				templateUrl: 'audience.html',
				controller: 'audienceController'
			});
	}]);

tweb.controller('boardController', function($scope){
	$scope.title = "Vos résultats";

	$scope.labels = [];
  	$scope.data = [];

  	callbackDataReceived = function(data, labels){

  		console.log("callback called");

  		$scope.data = data;

  		if(labels !== null){
  			$scope.labels = labels;
  		}

  		console.log($scope.labels);

  		// Permet de dire que la vue a changer et qu'il faut la reconsidérer
  		$scope.$apply();
  	};

  	// RequestInit est appelé car le serveur ne peut pas initialiser de lui-même dès la connexion du client car callbackDataReceived ne sera pas encore initialisé
  	socket.emit('requestInit');
});

tweb.controller('debugController', function($scope){
	$scope.title = "";

	$scope.labels = [];
  	$scope.data = [];
  	//$scope.series = [];

  	callbackDataReceived = function(data, labels){

  		console.log("callback called");

  		$scope.data = data;

  		if(labels !== null){
  			$scope.labels = labels;
  		}

  		console.log($scope.labels);

  		// Permet de dire que la vue a changer et qu'il faut la reconsidérer
  		$scope.$apply();
  	};

  	// RequestInit est appelé car le serveur ne peut pas initialiser de lui-même dès la connexion du client car callbackDataReceived ne sera pas encore initialisé
  	socket.emit('requestInit');

});