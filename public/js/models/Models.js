'use strict';

var module = angular.module('models.module', []);

module.factory('Plate',
  function (Well, WellLocation, Sample) {
    function Plate() {
      var CHAR_CODE_A = 65;

      this.wells = [];
      this.wellRows = [];

      for (var row=0; row<8; row++) {
        var rowName = String.fromCharCode(CHAR_CODE_A+row);
        this.wellRows.push({ name: rowName, cells:[] });
        for (var col=0; col<12; col++) {
          var well = new Well(new WellLocation(rowName, col+1));

          this.wellRows[row].cells.push(well);
          this.wells.push(well);
        }
      }
    }

    return Plate;
  });

module.factory('Well',
  function (Sample, WellLocation) {
    function Well(location, sample, reactionTime) {
      this.location = location || { x: 0, y: 0 };
      this.sample = null;
      this.reactionTime = reactionTime || 0;
    }

    return Well;
  });

module.factory('Sample',
  function (UUID) {
    function Sample(id, name, color) {
      this._id = id || UUID.new();
      this.name = name || 'Sample %s'.sprintf(Math.abs(this._id.toString().hashCode()));
      this.color = color || '#%s'.sprintf(Number.d2h(Math.ceil(Math.random() * 16777215)));
    }

    Sample.prototype.toString = function() {
      return this.name;
    }

    return Sample;
  });

module.factory('WellLocation',
  function () {
    function WellLocation(x, y) {
      this.x = x || 'A';
      this.y = y || 1;
    }

    WellLocation.prototype.toString = function() {
      return '%s%d'.sprintf(this.x, this.y);
    }

    return WellLocation;
  });

module.factory('UUID',
  function () {
    function UUID(uuid) {
      this.value = uuid;
    }

    UUID.EMPTY = new UUID('00000000-0000-0000-0000-000000000000');

    UUID.new = function () {
      var d = new Date().getTime();
      var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
        .replace(/[xy]/g,
        function(c) {
          var r = (d + Math.random()*16)%16 | 0;
          d = Math.floor(d/16);

          return (c=='x' ? r : (r&0x3|0x8)).toString(16);
        });

      return new UUID(uuid);
    };

    UUID.prototype.toString = function() {
      return this.value;
    }

    return UUID;
  });

