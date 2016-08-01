angular.module('blogDetail', []);
angular.module('blogDetail').component('blogDetail', {
  templateUrl: 'components/blog/blog-detail/blog-detail.template.html',
  bindings: {
    blog: '<'
  },
  controller: [function BlogDetailCtrl() {
    var ctrl = this;
  }]
});
