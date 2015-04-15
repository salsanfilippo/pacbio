'use strict';

var app = angular.module('pacbio',
                         [
                           'ui.bootstrap',
                           'ui.bootstrap.popover',
                           'ui.bootstrap.tpls',
                           'ui.keypress',
                           'colorpicker.module',
                           'models.module',
                           'ngRoute',
                           'ngResource',
                           'ngMessages',
                           'angularFileUpload',
                           'autofields',
                           'reCAPTCHA'
                         ]);

app.config(function ($routeProvider, $locationProvider){
             $routeProvider.when( '/', {
                                   redirectTo: '/home' })
             $routeProvider.when('/home',
                                 { templateUrl: '/templates/home.html', controller: 'HomeController' });
             $routeProvider.when('/editplate',
                                 { templateUrl: '/templates/editplate.html', controller: 'EditPlateController' });
             $routeProvider.when('/managesamples',
                                 { templateUrl: '/templates/managesamples.html', controller: 'ManageSamplesController' });
             $routeProvider.when('/login',
                                 { templateUrl: '/templates/login.html', controller: 'LoginController' });
             $routeProvider.when('/register',
                                 { templateUrl: '/templates/register.html', controller: 'ProfileController' });
             $routeProvider.when('/editprofile',
                                 { templateUrl: '/templates/editprofile.html', controller: 'EditProfileController' });
             $routeProvider.when('/viewprofile/:email',
                                 { templateUrl: '/templates/viewprofile.html', controller: 'ViewProfileController' });
             $routeProvider.when('/resetpassword',
                                 { templateUrl: '/templates/resetpassword.html', controller: 'ResetPasswordController' });

             $routeProvider.otherwise({redirectTo: '/home'});
             $locationProvider.html5Mode(true);
           });

app.config(function(datepickerConfig, datepickerPopupConfig, $autofieldsProvider) {
             datepickerPopupConfig.datepickerPopup = 'MM/dd/yyyy';
             datepickerPopupConfig.showButtonBar = false;

             //Time
             $autofieldsProvider.registerHandler('time', function (directive, field, index) {
               var fieldElements = $autofieldsProvider.field(directive, field, '<timepicker/>');
               fieldElements.input.attr('class', 'timepicker');

               return fieldElements.fieldContainer;
             });
           });

app.config(function(reCAPTCHAProvider) {
    // required: please use your own key :)
    reCAPTCHAProvider.setPublicKey('6LdvPQUTAAAAAMG-LyRIfMJnDnwwXVMAUXQZ6DNe');

    // optional: gets passed into the Recaptcha.create call
    reCAPTCHAProvider.setOptions({
        theme: 'red',
        custom_theme_widget: 'recaptcha_widget'
    });
});
