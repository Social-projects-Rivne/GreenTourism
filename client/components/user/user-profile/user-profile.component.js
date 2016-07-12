angular.module('user').component('userProfile', {
  templateUrl: 'components/user/user-profile/user-profile.template.html',
  bindings: {
    user: '<'
  },
  controller: ['$location', function($location) {
    var ctrl = this;

    // User editing
    ctrl.editMode = false;

    ctrl.changeAvatar = function() {
      // TODO: Replace prompt with something different
      ctrl.user.avatar = prompt('Enter new avatar url');
      ctrl.user.save();
    };

    ctrl.toggleEditMode = function() {
      ctrl.editMode = !ctrl.editMode;

      if (ctrl.editMode) {
        ctrl.editedUser = angular.copy(ctrl.user);
      } else {
        delete ctrl.editedUser;
      }
    };

    ctrl.editUser = function() {
      // TODO: Validate before saving
      ctrl.user = angular.copy(ctrl.editedUser);
      ctrl.user.save();
      delete ctrl.user.password;  // Password must not be stored in app

      ctrl.toggleEditMode();
    };

    // Tab switching
    ctrl.tab = 1;

    ctrl.selectTab = function(setTab) {
      this.tab = setTab;
    };

    ctrl.isSelected = function(checkTab) {
      return this.tab === checkTab;
    };
  }]
});
