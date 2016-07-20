angular.module('blogSidebar', []);

angular.module('blogSidebar').component('blogSidebar', {
  templateUrl: 'components/blog/blog-sidebar/blog-sidebar.template.html',
  controller: ['Blog', function BlogSidebarController(Blog) {
    var ctrl = this;
    Blog.getList().then(function(responce) {
      ctrl.blogs = responce;
    });
  }]
});
