angular.module('blogList', []);
angular.module('blogList').component('blogList', {
  templateUrl: 'components/blog/blog-list/blog-list.template.html',
  bindings: {
    blogs: '<'
  },
  controller: ['currentUser', 'Blog', 'Restangular', function BlogListCtrl(currentUser, Blog, Restangular) {
    var ctrl = this;
    ctrl.currentUser = currentUser;
    ctrl.showCreateForm = true;
    ctrl.blogPost = {};

    Blog.one('category').get().then(function(response) {
      ctrl.categoryList = response;
    });

    ctrl.reset = function(form){
      ctrl.blogPost = angular.copy(ctrl.master);
      form.$setPristine();
      form.$setUntouched();
    };

    ctrl.toggleCreatePost = function(form) {
      ctrl.showCreateForm = ctrl.showCreateForm === false ? true:false;
      ctrl.master = {
        blogImg: '',
        categoryId: '',
        title: '',
        content: ''
      };
      ctrl.reset(form);
    };

    ctrl.createPost = function(form) {
      ctrl.blogPost.owner = ctrl.currentUser._id;
      Restangular.one('blogs/').customPOST(ctrl.blogPost).then(function(res) {
        res.record.category = _.find(ctrl.categoryList, { 'id': res.record.categoryId });
        res.record.blogComments = [];
        res.record.owner = currentUser;
          ctrl.blogs.push(res.record);
          ctrl.toggleCreatePost(form);
        }, function(err) {
           ctrl.showError = err.statusText;
        });
    };

    ctrl.deletePost = function(id){
      Restangular.one('blogs/', id).remove().then(function(res){
        ctrl.blogs = ctrl.blogs.filter(function(res) {
          return res.id !== id;
        });
      });
    };
  }]
});
