angular.module('user').component('userProfile', {
  templateUrl: 'components/user/user-profile/user-profile.template.html',
  controller: ['CurrentUser', function(CurrentUser) {
    this.user = CurrentUser;

    this.tab = 1;

    this.selectTab = function(setTab) {
      this.tab = setTab;
    };

    this.isSelected = function(checkTab) {
      return this.tab === checkTab;
    };
  }]
});
