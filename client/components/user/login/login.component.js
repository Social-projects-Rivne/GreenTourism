angular.module('user').component('login', {
  templateUrl: 'components/user/login/login.template.html',
  controller: ['currentUser', '$location',
    function loginCtrl(currentUser, $location) {
      if (currentUser) {
        $location.path('/profile');
      }
		$('.dropdown-menu').on({  // changed selector from '#dropdownFilterCategory .dropdown-menu' to '.dropdown-menu'
		'click': function(e) {
		  e.stopPropagation();
		}

      });

    }
  ]
});
