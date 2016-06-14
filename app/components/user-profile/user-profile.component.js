angular.module('userProfile', []);

angular.module('userProfile').component('userProfile', {
  templateUrl: 'components/user-profile/user-profile.template.html',
  controller: function() {
    this.user = {
      firstName: 'John',
      lastName: 'Smith',
      nickname: 'johnsmith',
      avatar: 'assets/img/user-profile/avatar.png',
      getFullName: function() {
        return this.firstName + ' ' + this.lastName;
      }
    };
  }
});
