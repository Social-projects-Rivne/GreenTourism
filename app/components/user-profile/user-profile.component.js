angular.module('userProfile', []);

angular.module('userProfile').component('userProfile', {
  templateUrl: 'components/user-profile/user-profile.template.html',
  controller: function(User) {
    this.user = new User({
      firstName: 'John',
      lastName: 'Snow',
      nickname: 'johnsnow',
      avatar: 'assets/img/user-profile/avatar.png'
    });

    this.tab = 1;

    this.selectTab = function(setTab) {
      this.tab = setTab;
    };

    this.isSelected = function(checkTab) {
      return this.tab === checkTab;
    };
  }
});
