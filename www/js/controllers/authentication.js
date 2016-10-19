var app = angular.module('mealtrack.controllers.authentication', []);

/*********************************************************************
 * LoginCtrl
 *********************************************************************/
app.controller('LoginCtrl', function ($scope, $state, AuthService) {

	$scope.formData = {
		"email": "",
		"password": ""
	};

	$scope.login = function (form) {



	  if (form.$valid)
      {
        console.log("LoginCtrl::login");
        AuthService.login($scope.formData.email, $scope.formData.password)
          .then(function () {
            $state.go("tab.meals");
          });
      }
    else
      {
        console.log("Invalid Form");
      }
	};

});

/*********************************************************************
 * SignupCtrl
 *********************************************************************/
app.controller('SignupCtrl', function ($scope, $state, AuthService) {

	$scope.formData = {
		"name": "",
		"email": "",
		"password": ""
	};

	$scope.signup = function (form) {

    if (form.$valid)
    {
      console.log("SignupCtrl::signup");
      AuthService.signup($scope.formData.name,
        $scope.formData.email, $scope.formData.password)
        .then(function () {
          $state.go("tab.meals");
        });
    }
    else
    {
      console.log("Invalid Form");
    }

	};

});
