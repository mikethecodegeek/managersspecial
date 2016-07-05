'use strict';
var app = angular.module('angularApp');
app.controller('mainCtrl', function ($scope, $rootScope, userService, $state) {
    var currentUser = userService.getProfile()
        .then(user => {
            if(user) {
                $rootScope.loggedin=true;
                if (user.data.admin === true) {
                    $scope.admin = true;
                }
                else {
                    $scope.admin = false;
                }
            }
            else {$rootScope.loggedin = false; }

        });

    $scope.logout = function () {
        userService.logout()
            .then(user => {
                  $rootScope.loggedin = false;
                  $scope.admin = false;
              //  $state.go('landing');
            });
    };

    $scope.loginUser=function() {
        $('#myModal').modal('show');
    };
    $scope.login = function() {
        var thisuser = {
            email: $scope.email,
            password: $scope.password
        };
        userService.login(thisuser)
            .then( (user) => {
                userService.setProfile(user);
              //  $state.go('landing');
            })
            .then( function() {
                $rootScope.loggedin=true;
                $('#email').val('');
                $('#password').val('');
                $('#myModal').modal('hide');
                userService.getProfile()
                    .then( user =>{
                      if (user.data.admin) {
                          $scope.admin = true;
                      }

                    });
            }, function() {swal('Please be sure you are registered and use a valid email and password.')});
    };



});
app.controller('homeCtrl', function($scope, $state) {
console.log('homeCtrl works!');

});
app.controller('storeRegisterCtrl', function($scope, $state, userService, $rootScope) {
console.log('homeCtrl works!');
// if($scope.pwd1 != "" && $scope.pwd1 == $scope.pwd2) {
//     if($scope.pwd1.length < 6) {
//         swal("Error: Password must contain at least six characters!");
//         return false;
//     }
//     if($scope.pwd1 == $scope.username) {
//         swal("Error: Password must be different from Username!");
//         return false;
//     }
//     re = /[0-9]/;
//     if(!re.test($scope.pwd1)) {
//         swal("Error: password must contain at least one number (0-9)!");
//         return false;
//     }
//     re = /[a-z]/;
//     if(!re.test($scope.pwd1)) {
//         swal("Error: password must contain at least one lowercase letter (a-z)!");
//         return false;
//     }
//     re = /[A-Z]/;
//     if(!re.test($scope.pwd1)) {
//         swal("Error: password must contain at least one uppercase letter (A-Z)!");
//         return false;
//     }
// } else {
//     swal("Error: Please check that you've entered and confirmed your password!");
//     return false;
// }
$scope.registerStore = function(store){
  var thisuser = {
      name: $scope.newName,
      email: $scope.newEmail,
      username: $scope.newUsername,
      password: $scope.pwd1,
      phone: $scope.newPhone,
      address: {
          city: $scope.newCity,
          state: $scope.newState,
          zip: $scope.newZip,
          address: $scope.newAddress
      },
      pic: $scope.newPic,
      usertype: "store",
      authType: "user"
  };
  thisuser.joinDate = moment().format();
  thisuser.authType = 'user';
     console.log(thisuser);
  var user = {
      data: thisuser
  };
  userService.register(thisuser)
      //console.log(thisuser)
      .then((newuser) => {
              swal({
                      title: "Thank You for registering", text: `Lets Go`,
                      type: "success", closeOnConfirm: true
                  }
                );
          })
          var thisuser = {
              email: $scope.newEmail,
              password: $('#pwd1').val()
          };
          console.log(thisuser)
          userService.login(thisuser)
              .then( (user) => {
                  userService.setProfile(user);
                  //$state.go('landing');
              })
              .then( (stuff) => {
              $rootScope.loggedin=true;
          userService.getProfile()
              .then( user =>{
                console.log(user)
              //    $state.go('profile')
              });
          })
}

});
app.controller('viewStoresCtrl', function($scope, $state, stores) {
console.log('stores works!');
console.log('stores: ',stores)
$scope.stores = stores.data;
});
app.controller('listingCtrl', function($scope, $state, listings) {
console.log('listings works!');
console.log('listings: ',listings)
$scope.listings =listings.data;
});
app.controller('newListingCtrl', function($scope, $state, storeLoggedIn, listingService) {
console.log('listings works!');
console.log('listings2: ',storeLoggedIn)
$scope.listItem=function() {
  console.log("stydd",$scope.item)
  console.log(storeLoggedIn.data)
  $scope.item.store = storeLoggedIn.data;
  listingService.newItem($scope.item, storeLoggedIn)
}
});
app.controller('storeProfileCtlr', function($scope, $state, storeLoggedIn) {
console.log('listings works!');
console.log('store: ',storeLoggedIn)
$scope.store = storeLoggedIn.data;
});
app.controller('registerCtrl', function($scope, $state, userService) {
  $scope.register = function(form) {
     // // console.log(form)

      // if($scope.pwd1 != "" && $scope.pwd1 == $scope.pwd2) {
      //     if($scope.pwd1.length < 6) {
      //         swal("Error: Password must contain at least six characters!");
      //         return false;
      //     }
      //     if($scope.pwd1 == $scope.username) {
      //         swal("Error: Password must be different from Username!");
      //         return false;
      //     }
      //     re = /[0-9]/;
      //     if(!re.test($scope.pwd1)) {
      //         swal("Error: password must contain at least one number (0-9)!");
      //         return false;
      //     }
      //     re = /[a-z]/;
      //     if(!re.test($scope.pwd1)) {
      //         swal("Error: password must contain at least one lowercase letter (a-z)!");
      //         return false;
      //     }
      //     re = /[A-Z]/;
      //     if(!re.test($scope.pwd1)) {
      //         swal("Error: password must contain at least one uppercase letter (A-Z)!");
      //         return false;
      //     }
      // } else {
      //     swal("Error: Please check that you've entered and confirmed your password!");
      //     return false;
      // }


//       var thisuser = {
//           name: $scope.newName,
//           email: $scope.newEmail,
//           username: $scope.newUsername,
//           password: $scope.pwd1,
//           phone: $scope.newPhone,
//           address: {
//               city: $scope.newCity,
//               state: $scope.newState,
//               zip: $scope.newZip,
//               address: $scope.newAddress
//           },
//           usertype: "customer"
//       };
//       thisuser.joinDate = moment().format();
//       thisuser.authType = 'user';
//    //   console.log(thisuser);
//       var user = {
//           data: thisuser
//       };
//       userService.register(thisuser)
//           //console.log(thisuser)
//           .then((newuser) => {
//                   swal({
//                           title: "Thank You for registering", text: `Lets Go`,
//                           type: "success", closeOnConfirm: true
//                       }
//                     );
//               })
//               var thisuser = {
//                   email: $scope.newEmail,
//                   password: $('#pwd1').val()
//               };
//               console.log(thisuser)
//               userService.login(thisuser)
//                   .then( (user) => {
//                       userService.setProfile(user);
//                       //$state.go('landing');
//                   })
//                   .then( (stuff) => {
//                   $rootScope.loggedin=true;
//               userService.getProfile()
//                   .then( user =>{
//                     console.log(user)
//                   //    $state.go('profile')
//                   });
//               })
 }
});
