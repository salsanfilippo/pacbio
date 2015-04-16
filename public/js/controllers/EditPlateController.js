'use strict';

app.controller('EditPlateController',
  function EditPlateController($scope, $location, $modal, $filter, plateService, sampleService, Sample, Plate, Well) {
    $scope.NOTCONFIGURED = 'Not Fully Configured';

    $scope.range = function(length) {
      return new Array(length);
    }

    $scope.samples = sampleService.getAll();

    // Attempt to use existing plate
    $scope.plate = plateService.getAll()[0];
    if (angular.isUndefined($scope.plate)) {
      // No existing plate, create a new one
      $scope.plate = plateService.add();

      $scope.plate.name = "Plate One";
      //$scope.plate.wells[0].sample = $scope.samples[0];
      //$scope.plate.wells[0].reactionTime = 5;
    } else {
      plateService.setActivePlate($scope.plate);
    }

    $scope.selectedWell = $scope.plate.wells[0];

    $scope.manageSamples = function() {
      $location.url('/managesamples', true);
    };

    $scope.wellClick = function(well) {
                         var modalInstance = $modal.open({ templateUrl: 'editWell.html',
                                                           controller: 'EditWellController',
                                                           resolve: {
                                                             well: function() {
                                                               return well;
                                                             },
                                                             samples: function scopes() {
                                                               return $scope.samples
                                                             }
                                                           }
                                                         });

                         modalInstance.result
                                      .then(function (well) {
                                              $scope.selectedWell = well;
                                            },
                                            function () {
                                              $log.info('Modal dismissed at: ' + new Date());
                                            });
                       };
  });

app.controller('EditWellController',
  function ($scope, $log, $modalInstance, samples, well) {
    $scope.samples = samples;

    $scope.well = well;
    $scope.working = angular.copy(well);
    $scope.selectedSample = $scope.working.sample;

    $scope.reset = function(form) {
      if (!confirm("Are you sure you want to reset this well?")) {
        return;
      }

      $scope.well.sample = null;
      $scope.well.reactionTime = 0;

      $modalInstance.close($scope.well);
    };

    $scope.apply = function(form) {
      if (form.$valid) {
        $scope.well.sample = $scope.working.sample;
        $scope.well.reactionTime = $scope.working.reactionTime;
      } else {
        alert('Changes cannot be applied when validation errors exist.');
        return;
      }

      $modalInstance.close($scope.well);
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };

    $scope.$watch("working.sample", function() {
      if ($scope.wellForm.sample.$dirty) {
        $scope.wellForm
              .sample
              .$setValidity("required", !(angular.isUndefined($scope.working.sample) ||
                                          angular.isString($scope.working.sample)));
      }
    });
  });
