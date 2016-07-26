angular.module('blogList', []);
angular.module('blogList').component('blogList', {
  templateUrl: 'components/blog/blog-list/blog-list.template.html',
  bindings: {
    blogs: '<'
  },
  controller: [function BlogListCtrl() {
    var ctrl = this;
    console.log(this);
  }]
});
