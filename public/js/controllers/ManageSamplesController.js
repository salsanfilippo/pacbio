'use strict';

app.controller('ManageSamplesController',
  function ManageSamplesController($scope, $location, $filter, plateService, sampleService, Sample, Plate, Well) {
    $scope.samples = sampleService.getAll();

    $scope.add = function() {
      var newSample = sampleService.add();

      if (!Object.extensions.isNullOrUndefined(newSample))
        $scope.selectedSample = newSample;
    };

    $scope.remove = function() {
      if (!sampleService.remove($scope.selectedSample, plateService.canRemove)) {
        alert("Cannot delete sample because it is assigned to at least one well.");
      }
    };

    $scope.apply = function(form) {
      if (form.$valid) {
        $scope.selectedSample.name = $scope.working.name;
        $scope.selectedSample.color = $scope.working.color;
      } else {
        alert('Changes cannot be applied when validation errors exist.');
      }
    };

    $scope.findSample = function(id) {
      return $filter('filter')($scope.samples, { _id: { value: id } })[0];
    }

    $scope.setValue = function (ev) {
      var element = angular.element(ev.target);
      var id;

      if (element[0].tagName.toUpperCase() === 'SELECT')
        element = angular.element(element[0].selectedOptions[0]);

      id = element.attr('sample-id');
      if ($scope.selectedSample === null ||
        $scope.selectedSample._id != id)
        $scope.selectedSample = $scope.findSample(id);
    };

    $scope.$watch("working.name", function() {
      if ($scope.sampleForm.sampleName.$dirty) {
        if (!angular.isUndefined($scope.working.name)) {
          $scope.sampleForm
                .sampleName
                .$setValidity("unique",
                              !sampleService.nameExists($scope.working.name,
                                                        $scope.working._id));
        }
        console.log('Name: "%s", "%s, Length: %d"'.sprintf($scope.working.name,
                                                           $scope.sampleForm.sampleName.$viewValue,
                                                           $scope.sampleForm.sampleName.$viewValue.length));
      }
    });

    $scope.$watch("working.color", function() {
      if ($scope.sampleForm.sampleColor.$dirty) {
        if (!angular.isUndefined($scope.working.color)) {
          $scope.sampleForm
                .sampleColor
                .$setValidity("reserved",
                              !'#ffffff'.equals($scope.working.color));

          $scope.sampleForm
                .sampleColor
                .$setValidity("unique",
                              !sampleService.colorExists($scope.working.color,
                                                         $scope.working._id));
        }
        console.log('Color: %s'.sprintf($scope.working.color));
      }
    });

    $scope.$watch("selectedSample", function() {
      $scope.working = angular.copy($scope.selectedSample);
      if (!Object.extensions.isNullOrUndefined($scope.working)) {
        console.log('Sample Selected: %s'.sprintf($scope.working));
      }
    });

    $scope.selectedSample = $scope.samples[0];
  });
