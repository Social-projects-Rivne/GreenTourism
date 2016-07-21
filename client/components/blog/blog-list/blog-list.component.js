angular.module('blogList', []);

angular.module('blogList').component('blogList', {
  templateUrl: 'components/blog/blog-list/blog-list.template.html',
  controller: ['Blog', function BlogListController(Blog) {
    var ctrl = this;
    Blog.getList().then(function(responce) {
      ctrl.blogs = responce;
    });
  }]
});
