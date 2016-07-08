angular.module('userProfile', []);

angular.module('userProfile').component('userProfile', {
  templateUrl: 'components/user-profile/user-profile.template.html',
  controller: ['User', '$rootScope', function(User, $rootScope) {
    console.log($rootScope.globals.currentUser);
    this.user = $rootScope.globals.currentUser;
    var gravatar = '//s.gravatar.com/avatar/' +
                    md5(this.user.email.trim().toLowerCase()) +
                    '?s=480';

    this.user.avatar = this.user.avatar || gravatar;

    this.tab = 1;

    this.selectTab = function(setTab) {
      this.tab = setTab;
    };

    this.isSelected = function(checkTab) {
      return this.tab === checkTab;
    };
  }]
});
