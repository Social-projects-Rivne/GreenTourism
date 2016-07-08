angular.module('userProfile', []);

angular.module('userProfile').component('userProfile', {
  templateUrl: 'components/user-profile/user-profile.template.html',
  controller: ['User', '$rootScope', function(User, $rootScope) {
    console.log($rootScope.globals.currentUser);
    this.user = $rootScope.globals.currentUser;

    this.tab = 1;

    this.selectTab = function(setTab) {
      this.tab = setTab;
    };

    this.isSelected = function(checkTab) {
      return this.tab === checkTab;
    };
  }]
});
