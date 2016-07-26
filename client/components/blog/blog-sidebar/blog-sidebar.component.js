angular.module('blogSidebar', []);

angular.module('blogSidebar').component('blogSidebar', {
  templateUrl: 'components/blog/blog-sidebar/blog-sidebar.template.html',
  controller: ['Blog', function BlogSidebarController(Blog) {
    var ctrl = this;
    ctrl.tab = 1;
    ctrl.selectTab = function(setTab) {
      ctrl.tab = setTab;
    };
    ctrl.isSelected = function(checkTab) {
      return ctrl.tab === checkTab;
    };

    Blog.one('category').get().then(function(response) {
      ctrl.categoryList = response;
    });

    Blog.one('popular').get().then(function(response) {
      ctrl.popularList = response;
    });
  }]
});

