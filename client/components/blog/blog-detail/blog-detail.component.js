angular.module('blogDetail', []);
angular.module('blogDetail').component('blogDetail', {
  templateUrl: 'components/blog/blog-detail/blog-detail.template.html',
  bindings: {
    blog: '<'
  },
  controller: ['Blog', 'currentUser', 'Restangular', function BlogDetailCtrl(Blog, currentUser, Restangular) {
    var ctrl = this;
    ctrl.currentUser = currentUser;
    ctrl.master = ctrl.blog;
    if (ctrl.currentUser) {
      if (_.some(ctrl.blog.blogLikes, {author: ctrl.currentUser._id})) {
        angular.element('.likes').addClass('added');
      }
      angular.element('.likes').removeClass('disabled');
    }
    ctrl.likesToggle = function() {
      if (_.some(ctrl.blog.blogLikes, {author: ctrl.currentUser._id})) {
          Restangular.one('blogs/like', currentUser._id).remove()
              .then(function() {
                ctrl.blog.blogLikes = _.without(ctrl.blog.blogLikes, _.find(ctrl.blog.blogLikes, {author: ctrl.currentUser._id}));
                angular.element('.likes').removeClass('added');
              });
      } else {
        Restangular.one('blogs/like').customPOST({
          author: ctrl.currentUser._id,
          blogId: ctrl.blog.id
        })
          .then(function(res) {
            ctrl.blog.blogLikes.push(res.record);
            ctrl.likesLength += 1;
            angular.element('.likes').addClass('added');
          });
      }
    };
    Blog.getList({categoryId: ctrl.blog.categoryId, limit: 4}).then(function(res) {
      ctrl.relatedPost = _.without(res, _.find(res, {id: ctrl.blog.id}));
    });
    Blog.one('category').get().then(function(response) {
      ctrl.categoryList = response;
    });

    ctrl.showEditForm = true;

    ctrl.toggleEditPost = function(form){
      ctrl.showEditForm = ctrl.showEditForm === false ? true: false;
      //ctrl.reset(form);
    };

    ctrl.editPost = function(blogPost){
      console.log(blogPost);

      Blog.one(blogPost.id).customPUT({blogPost}).then(function(res){
        console.log(res);
      })
    }

  }]
});
