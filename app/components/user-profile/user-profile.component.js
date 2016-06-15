angular.module('userProfile', []);

angular.module('userProfile').component('userProfile', {
  templateUrl: 'components/user-profile/user-profile.template.html',
  controller: function() {
    this.user = new User('John', 'Smith', 'johnsmith',
                         'assets/img/user-profile/avatar.png');

    this.tab = 1;

    this.selectTab = function(setTab) {
      this.tab = setTab;
    };

    this.isSelected = function(checkTab) {
      return this.tab == checkTab;
    };
  }
});

function User(firstName, lastName, nickname, avatar) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.nickname = nickname;
  this.avatar = avatar;
  this.getFullName = function() {
    return this.firstName + ' ' + this.lastName;
  };
}
