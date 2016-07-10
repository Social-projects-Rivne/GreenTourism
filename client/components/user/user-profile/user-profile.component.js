angular.module('user').component('userProfile', {
  templateUrl: 'components/user/user-profile/user-profile.template.html',
  controller: ['currentUser', '$location',
    function(currentUser, $location) {
      if (currentUser) {
        this.user = currentUser;
      } else {
        $location.path('/login');
      }

      this.tab = 1;

      this.selectTab = function(setTab) {
        this.tab = setTab;
      };

      this.isSelected = function(checkTab) {
        return this.tab === checkTab;
      };
    }
  ]
});
