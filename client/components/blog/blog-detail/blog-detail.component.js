angular.module('blogDetail', []);
angular.module('blogDetail').component('blogDetail', {
  templateUrl: 'components/blog/blog-detail/blog-detail.template.html',
  controller: ['$route', 'Blog', function BlogDetailController($route, Blog) {
    var ctrl = this;
    Blog.one($route.current.params.blogId).get().then(function(response) {
      ctrl.blog = response;
    });
    ctrl.tab = 1;
  }]
});
