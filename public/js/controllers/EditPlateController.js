'use strict';

app.controller('EditPlateController',
  function EditPlateController($scope, $location, sampleService, Sample, Plate, Well) {
    $scope.NOTCONFIGURED = 'Not Fully Configured';

    $scope.range = function(length) {
      return new Array(length);
    }

    $scope.samples = sampleService.getAll();

    $scope.plate = new Plate();
    $scope.plate.wells[0].sample = $scope.samples[0];
    $scope.plate.wells[0].reactionTime = 5;

    $scope.wellClick = function(well) {
      alert('%s%d'.sprintf(well.location.x, well.location.y));
    }
  });
