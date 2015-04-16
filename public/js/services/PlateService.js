'use strict';

app.service('plateService',
  function($rootScope, $filter, UUID, Sample, Plate) {
    $rootScope.plates = [ ];
    $rootScope.activePlate = null;

    this.getAll = function() {
      return $rootScope.plates;
    };

    this.getById = function(id) {
      return $filter('filter')($rootScope.plates, { _id: { value: ''+id } });
    };

    this.nameExists = function(name, id) {
      return $filter('filter')($rootScope.plates, { name: name,
                                                    _id: { value: '!'+id } }, true).length>0;
    };

    this.add = function(plate) {
      var newPlate = plate || new Plate();

      if (!this.nameExists(newPlate.name, newPlate._id)) {
        $rootScope.plates.push(newPlate);
      }

      return this.setActivePlate(newPlate);
    };

    this.setActivePlate = function(plate) {
      $rootScope.activePlate = plate;

      return plate;
    };

    this.canRemove = function(sample) {
      if (Object.extensions.isNullOrUndefined($rootScope.activePlate))
        return false;

      return $filter("filter")($rootScope.activePlate.wells, { sample: sample }).length==0;
    };
  });
