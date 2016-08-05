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

    // User editing
    ctrl.editMode = false;
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

    ctrl.toggleEditMode = function() {
      if (ctrl.editMode) {
        ctrl.editedUser = null;
      } else {
        ctrl.editedUser = angular.copy(ctrl.user);
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
