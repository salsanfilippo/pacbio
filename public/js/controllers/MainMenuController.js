'use strict';

app.controller('MainMenuController',
  function MainMenuController($scope, $location, $log, authService) {
    $scope.searchTerms = '';
    $scope.user = {};

    $scope.$watch(authService.getAuthUser, function () {
      $scope.user = authService.getAuthUser();
    });

    $scope.isAuthenticated = function () {
      return authService.isAuthenticated();
    };

    $scope.logout = function () {
      authService.signOut();
      $location.url('/home', true);
    };

    $scope.search = function() {
      if (this.searchTerms == String.EMPTY)
        return;

      alert('Sorry, search is not yet implemented. However, your search term was "%s."'.sprintf(this.searchTerms));

      this.searchTerms = String.EMPTY;
    };
  });
