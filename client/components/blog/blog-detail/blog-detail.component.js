angular.module('blogDetail', []);
angular.module('blogDetail').component('blogDetail', {
  templateUrl: 'components/blog/blog-detail/blog-detail.template.html',
  bindings: {
    blog: '<'
  },
  controller: ['currentUser', 'Restangular', function BlogDetailCtrl(currentUser, Restangular) {
    var ctrl = this;
    ctrl.currentUser = currentUser;
    ctrl.likesLength = ctrl.blog.blogLikes.length;
    if (ctrl.currentUser) {
      if (_.some(ctrl.blog.blogLikes, {author: ctrl.currentUser._id})) {
        angular.element('.likes').addClass('added');
      }
    }

    ctrl.likesToggle = function(id) {
      if (_.some(ctrl.blog.blogLikes, {author: ctrl.currentUser._id})) {
          Restangular.one('blogs/like', id).remove()
              .then(function() {
                ctrl.blog.blogLikes = _.without(ctrl.blog.blogLikes, _.find(ctrl.blog.blogLikes, {author: ctrl.currentUser._id}));
                angular.element('.like').css('background-color', '#fff');
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
  }]
});
