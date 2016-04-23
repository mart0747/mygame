var mygame = angular.module('mygame', []);

function mainController($scope, $http) {
    $http.get('/api/players')
        .success(function (data) {
            $scope.players = data;
            console.log(players);
        })
        .error(function () {
            console.log('error : ' + data);
        });
}