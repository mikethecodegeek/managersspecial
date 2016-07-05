'use strict';

var app = angular.module('angularApp');

app.factory("authService", function(){
    return {
        getUser: function(){
            return $http.get('./api/users/profile');
        }
    };
});


app.service('userService', function($q,$http) {
    var profile = {loggedin: false};
    this.setProfile = function(myprofile) {
        profile = myprofile
    };
    this.getProfile = () => {
        return $http.get('./api/users/profile');
    };
    this.getAll = () => {
        return $http.get('./api/users');
    };

    this.getStores = () => $http.get('./api/users/stores/all')

    this.getById = (id) => {
        return $http.get(`./api/users/id/${id}`);
    };

    this.getByUsername = (username) => {
        return $http.get(`./api/users/${username}`);
    }

    this.register = (newPost) => {
       return $http.post('./api/users/register', {user: newPost});
    };

    this.deleteById = id => {
        return $http.delete(`./api/users/${id}`);
    };

    this.editById = (id, newUser) => {
        return $http.put(`./api/users/${id}`, {user: newUser});
    };

    this.login = (user) => {
        return $http.post('./api/users/login/', {email: user.email, password: user.password});
    };
    this.logout = () => {
        return $http.delete('./api/users/logout/');
    };

    this.admin = () => {
        return $http.get('./api/users/admin/');
    };
    this.adminPassword = (user,newpass) => {
        return $http.post('./api/users/admin/password',{user:user, password: newpass});
    };
    this.changeAdminEmail = (user, newemail) => {
        return $http.post('./api/users/admin/changeemail',{user:user, email:newemail});
    };

});

app.service('listingService', function($q,$http) {
    this.getAll = () => $http.get('./api/listings');
    this.newItem = (item,store) => $http.post('./api/listings/newlisting', {item:item,store:store})
    this.deleteById = id => $http.delete(`./api/users/${id}`);

});

app.service('storeService', function($q,$http) {
    this.getAll = () => $http.get('./api/stores/all');
    this.deleteById = id => {
        return $http.delete(`./api/users/${id}`);
    };
});
