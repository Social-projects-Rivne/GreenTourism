angular.module('blogList', []);
angular.module('blogList').component('blogList', {
  templateUrl: 'components/blog/blog-list/blog-list.template.html',
  bindings: {
    blogs: '<'
  },
  controller: [function BlogListCtrl() {
    var ctrl = this;
    console.log(ctrl);
    for (var key in ctrl.blogs[0]){
      console.log(key + ':'  + ctrl.blogs[0][key]);
    }
  }]
});
