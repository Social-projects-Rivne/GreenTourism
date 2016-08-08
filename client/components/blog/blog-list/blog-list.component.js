angular.module('blogList', []);
angular.module('blogList').component('blogList', {
  templateUrl: 'components/blog/blog-list/blog-list.template.html',
  bindings: {
    blogs: '<',
  },
  controller: ['currentUser', 'Blog', 'Restangular', function BlogListCtrl(currentUser, Blog, Restangular) {
    var ctrl = this;
    ctrl.currentUser = currentUser;

    Blog.one('category').get().then(function(response) {
      ctrl.categoryList = response;
    });
    var addPlaceForm = angular.element('form[name="blogPost"]');
    ctrl.showCreateForm = true;
    ctrl.blogPost = {}
    ctrl.reset = function(form){
      ctrl.blogPost = angular.copy(ctrl.master);
      form.$setPristine();
      form.$setUntouched();
    };

    ctrl.toggleCreatePost = function(form){
      ctrl.showCreateForm = ctrl.showCreateForm === false ? true: false;
      ctrl.master = {
        blogImg: '',
        categoryId: '',
        title: '',
        content: ''
      };
      ctrl.reset(form);
    };



    ctrl.createPost = function(form) {
      Restangular.one('blogs/').customPOST(
          {
            title: title.value,
            blogImg: blogImg.value,
            content: content.value,
            owner: ctrl.currentUser._id,
            categoryId: categoryId.value
          }
      ).then(function(res) {
            res.record.owner = currentUser;
            ctrl.blogs.push(res.record);
            //ctrl.toggleCreatePost(form);
          }, function(err) {
            ctrl.showError = err.statusText;
          });
    };
    ctrl.deletePost = function(id){
      Restangular.one('blogs/', id).remove().then(function(res){
        console.log(res);
        ctrl.blogs = ctrl.blogs.filter(function(res) {
          return res.id !== id;
        });
      });
    }
  }]
});
