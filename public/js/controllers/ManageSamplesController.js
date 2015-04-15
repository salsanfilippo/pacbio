'use strict';

app.controller('ManageSamplesController',
  function ManageSamplesController($scope, $location, $filter, sampleService, Sample, Plate, Well) {
    $scope.samples = sampleService.getAll();

    $scope.add = function() {
      var newSample = sampleService.add();

      if (!Object.extensions.isNullOrUndefined(newSample))
        $scope.selectedSample = newSample;
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

    $scope.sampleOnChange = function(item) {
      if (item == null)
        return;

      if (item.id === 0) {
        var id = $scope.samples.length;
        var color = Math.ceil(Math.random() * 16777215);

        $scope.samples.push({ id: id, name: 'New Sample ' + id, color: '#'+Number.d2h(color) });
        $scope.sample = $scope.samples[$scope.samples.length - 1];

        $scope.open();
      } else {
        $scope.well.name = item.name;
        $scope.selected.item = item;
      }
    };

    $scope.$watch("working.color", function() {
      if ($scope.sampleForm.sampleColor.$dirty) {
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
    $scope.working = angular.copy($scope.selectedSample);
  });
