'use strict';

app.service('sampleService',
  function($rootScope, $filter, UUID, Sample, Plate) {
    $rootScope.samples = [ new Sample(UUID.new(), 'Sample One', '#FF0000'),
                           new Sample(UUID.new(), 'Sample Two', '#00FF00'),
                           new Sample(UUID.new(), 'Sample Three', '#0000FF'),
                           new Sample(UUID.new(), 'Sample Four', '#FF00FF'),
                           new Sample(UUID.new(), 'Sample Five', '#00FFFF') ];


    this.getAll = function() {
      return $rootScope.samples;
    };

    this.getById = function(id) {
      return $filter('filter')($rootScope.samples, { _id: { value: ''+id } });
    };

    this.colorExists = function(color, id) {
      return $filter('filter')($rootScope.samples, { color: color,
                                                     _id: { value: '!'+id } }).length>0;
    };

    this.nameExists = function(name, id) {
      return $filter('filter')($rootScope.samples, { name: name,
                                                     _id: { value: '!'+id } }).length>0;
    };

    this.add = function(sample) {
      var newSample = sample || new Sample();

      if ((!this.nameExists(newSample.name, newSample._id)) &&
          (!this.colorExists(newSample.color, newSample._id))) {
        $rootScope.samples.push(newSample);
      }

      return newSample;
    };

    this.remove = function(sample, canRemoveFn) {
      var index = this.samples.indexOf(sample);
      if (index==-1)
        return

      if (canRemoveFn(sample))
        return this.samples.splice(index, 1);

      return;
    };
  });
            