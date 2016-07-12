angular.module('user').component('userProfile', {
  templateUrl: 'components/user/user-profile/user-profile.template.html',
  bindings: {
    user: '<'
  },
  controller: ['$location', function($location) {
    var ctrl = this;

    ctrl.changeAvatar = function() {
      ctrl.user.avatar = prompt('Enter new avatar url');
      ctrl.user.save();
    };

    ctrl.tab = 1;

    ctrl.selectTab = function(setTab) {
      this.tab = setTab;
    };

    ctrl.isSelected = function(checkTab) {
      return this.tab === checkTab;
    };
  }]
});
