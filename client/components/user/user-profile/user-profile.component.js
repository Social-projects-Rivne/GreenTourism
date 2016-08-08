angular.module('user').component('userProfile', {
  templateUrl: 'components/user/user-profile/user-profile.template.html',
  bindings: {
    user: '<'
  },
  controller: ['User', function(User) {
    var ctrl = this;

    ctrl.user.customGET('places', {limit: 10, sort: '-createdAt'})
      .then(function(places) {
        ctrl.places = places;
      });

    ctrl.user.customGET('tracks', {limit: 10, sort: '-createdAt'})
      .then(function(tracks) {
        ctrl.tracks = tracks;
      });

    // TODO: Sort favorites by date when user added like

    ctrl.user.customGET('places/favorite', {limit: 10, sort: 'rate'})
      .then(function(places) {
        ctrl.favPlaces = places;
      });

    ctrl.user.customGET('tracks/favorite', {limit: 10, sort: 'rate'})
      .then(function(tracks) {
        ctrl.favTracks = tracks;
      });

    ctrl.resetForm = function(form) {
      form.$setPristine();
      form.$setUntouched();
    };

    // ********************** Edit avatar

    ctrl.editAvatarMode = false;

    ctrl.toggleEditAvatarMode = function() {
      ctrl.newAvatar = '';
      ctrl.editAvatarMode = !ctrl.editAvatarMode;
    };

    ctrl.changeAvatar = function() {
      ctrl.user.avatar = ctrl.newAvatar;

      ctrl.user.save().then(function(response) {
        ctrl.user.avatar = response.avatar;
      });

      ctrl.toggleEditAvatarMode();
    };

    // ************************ Edit profile information

    ctrl.editMode = false;

    ctrl.toggleEditMode = function() {
      if (ctrl.editMode) {
        ctrl.editedUser = null;
      } else {
        ctrl.editedUser = angular.copy(ctrl.user);
      }

      if (ctrl.changePasswordMode) {
        ctrl.toggleChangePassword();
      }

      ctrl.editMode = !ctrl.editMode;
    };

    ctrl.editUser = function() {
      angular.merge(ctrl.user, ctrl.editedUser);

      ctrl.user.save().then(function(response) {
        ctrl.user = response;
      });

      ctrl.toggleEditMode();
    };

    // ********************** Change password

    ctrl.changePasswordMode = false;
    ctrl.toggleChangePassword = function() {
      if (ctrl.changePassword) {
        ctrl.newPassword = null;
        ctrl.confirmPassword = null;
      }

      if (ctrl.editMode) {
        ctrl.toggleEditMode();
      }

      ctrl.changePasswordMode = !ctrl.changePasswordMode;
    };

    ctrl.changePassword = function() {
      ctrl.user.password = ctrl.newPassword;

      ctrl.user.save();
      delete ctrl.user.password;

      ctrl.toggleChangePassword();
    };

    // ************************** Switch tabs

    ctrl.tab = 1;

    ctrl.selectTab = function(setTab) {
      this.tab = setTab;
    };

    ctrl.isSelected = function(checkTab) {
      return this.tab === checkTab;
    };
  }]
});
