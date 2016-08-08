angular.module('user').component('tabList', {
  templateUrl: 'components/user/user-profile//tab-list/tab-list.template.html',
  bindings: {
    items: '<',
    route: '<'
  }
});
