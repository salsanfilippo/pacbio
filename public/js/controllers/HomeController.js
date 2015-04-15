'use strict';

app.controller('HomeController',
    function HomeController($scope, $location) {
      $scope.editPlate = function () {
        $location.url('/editplate', true);
      }
    });
