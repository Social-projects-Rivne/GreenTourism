angular.module('user').component('userProfile', {
  templateUrl: 'components/user/user-profile/user-profile.template.html',
  bindings: {
    user: '<'
  },
  controller: ['$location', 'User', function($location, User) {
    var ctrl = this;

    ctrl.user.customGET('places', {limit: 10}).then(function(places) {
      ctrl.places = places;
    });

    ctrl.user.customGET('tracks', {limit: 10}).then(function(tracks) {
      ctrl.places = tracks;
    });

    // User editing
    ctrl.editMode = false;
    ctrl.editAvatarMode = false;

    ctrl.toggleEditAvatarMode = function() {
      ctrl.editAvatarMode = !ctrl.editAvatarMode;
      ctrl.newAvatar = null;
    };

    ctrl.changeAvatar = function() {
      ctrl.user.avatar = ctrl.newAvatar;
      ctrl.user.save();

      ctrl.toggleEditAvatarMode();
    };

    ctrl.toggleEditMode = function() {
      ctrl.editMode = !ctrl.editMode;

      if (ctrl.editMode) {
        ctrl.editedUser = angular.copy(ctrl.user);
      } else {
        ctrl.editedUser = null;
      }
    };

    ctrl.editUser = function() {
      angular.merge(ctrl.user, ctrl.editedUser);
      ctrl.user.save();

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
