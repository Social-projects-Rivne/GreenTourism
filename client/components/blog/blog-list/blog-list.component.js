angular.module('blogList', []);

angular.module('blogList').component('blogList', {
  templateUrl: 'components/blog/blog-list/blog-list.template.html',
  controller: ['Blog', function BlogListController(Blog) {
    var ctrl = this;
    Blog.getList().then(function(responce) {
      ctrl.blogs = responce;
    });
    //ctrl.tab = 1;
    //ctrl.selectTab = function(setTab) {
    //  ctrl.tab = setTab;
    //};
    //ctrl.isSelected = function(checkTab) {
    //  return ctrl.tab === checkTab;
    //};
  }]
});
