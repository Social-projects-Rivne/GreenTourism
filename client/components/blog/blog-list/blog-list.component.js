angular.module('blogList', []);
angular.module('blogList').component('blogList', {
  templateUrl: 'components/blog/blog-list/blog-list.template.html',
  bindings: {
    blogs: '<',
  },
  controller: ['currentUser', 'Blog', 'Restangular', function BlogListCtrl(currentUser, Blog, Restangular) {
    var ctrl = this;
    console.log(this);
    ctrl.currentUser = currentUser;

    ctrl.searchBlog = function(query){
      Blog.getList({title: query}).then(function(blogs) {
        console.log(blogs);
        ctrl.blogs = blogs;
      });
    };

    Blog.one('category').get().then(function(response) {
      ctrl.categoryList = response;
    });
    var addPlaceForm = angular.element('form[name="blogPost"]');

    ctrl.showCreateForm = true;
    ctrl.toggleCreatePost = function(form){
      ctrl.showCreateForm = ctrl.showCreateForm === false ? true: false;
      form.$setPristine();
    };

    ctrl.clearPostForm = function(form){
      form.$setPristine();
      form.$setUntouched();
      //toggleCreatePost();
    };
    ctrl.createPost = function(form) {
      //angular.element('textarea').css('height', '50px');
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
          }, function(err) {
            ctrl.showError = err.statusText;
          });
    };


  }]
});
