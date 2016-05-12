var mygame = angular.module('mygame', []);

function mainController($scope, $http) {
    $http.get('/api/players')
        .success(function (data) {
            $scope.players = data;
            console.log(data);
        })
        .error(function () {
            console.log('error : ' + data);
        });

    $scope.AddNewPlayer = function () {
        console.log($scope.formData);
        
        var player = {
            name: $scope.formData.text,
            username: Math.random().toString(36).substr(2, 9)
        };
        
        $http.post('/api/player', player)
            .success(function (data) {
                $scope.players = $scope.players + $scope.formData;
            })
            .error(function (data) {
                console.log('error' + data);
            });
    }
}