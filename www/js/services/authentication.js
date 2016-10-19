var app = angular.module('mealtrack.services.authentication', []);

app.service('AuthService', function ($q, $ionicPopup) {
	var self = {
		user: Parse.User.current(),
		login: function (email, password) {
			var d = $q.defer();

			Parse.User.logIn(email, password, {

        success: function (user) {
          console.log("Logged in");
          self.user = user;
          d.resolve(self.user);
        },
        error: function (error, user) {
          $ionicPopup.alert({
            title: 'Login error',
            subtitle: error.message
          });
          d.reject(error);
        }

      });

			return d.promise;
		},
		signup: function (name, email, password) {
			var d = $q.defer();

			var user = new Parse.User();
      user.set('username', email);
      user.set('name', name);
      user.set('password', password);
      user.set('email', email);

      user.signUp(null,
        {
          success: function (user) {
            console.log("Account created");
            self.user = user;
            d.resolve(self.user);
          },
          error: function (error, user) {
            $ionicPopup.alert({
              title: 'Signup error',
              subtitle: error.message
            });
            d.reject(error);
          }
        });

			return d.promise;
		},
		'update': function (data)  {
			var d = $q.defer();

			var user = self.user;
      user.set("username", data.email);
      user.set("name", data.name);
      user.set("email", data.email);

      user.save(null,
        {
          success: function (user) {
            self.user = user;
            d.resolve(self.user);
          },
          error: function (error, user) {
            $ionicPopup.alert({
              title: "Save error",
              subtitle: error.message
            });
            d.reject(error);
          }
        });

      return d.promise;
		}

	};

	return self;
})
;

