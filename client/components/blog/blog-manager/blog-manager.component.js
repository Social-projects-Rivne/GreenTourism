angular.module('blogManager', []);
angular.module('blogManager').component('blogList', {
  templateUrl: 'components/blog/blog-manager/blog-manager.template.html',
  bindings: {
    blogs: '<'
  },
  controller: [function BlogListCtrl() {
    var ctrl = this;
  }]
});
