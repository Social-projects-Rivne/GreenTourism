angular.module('blogList', []);
angular.module('blogList').component('blogList', {
  templateUrl: 'components/blog/blog-list/blog-list.template.html',
  bindings: {
    blogs: '<'
  },
  controller: ['currentUser', 'Blog', 'Restangular', function BlogListCtrl(currentUser, Blog, Restangular) {
    var ctrl = this;
    console.log(this);
    ctrl.currentUser = currentUser;
    ctrl.createPost = function() {
      //angular.element('textarea').css('height', '50px');
      ////console.log(createPost);
      Restangular.one('blogs/').customPOST(
          {
            title: title.value,
            blogImg: photo.value,
            content: content.value,
            owner: ctrl.currentUser._id,
            categoryId: category.value
          }).then(function(res) {
            //ctrl.content = '';
            //res.record.author = currentUser;
            //ctrl.blogcomment.push(res.record);
          }, function(err) {
            ctrl.showError = err.statusText;
          });
    };

  }]
});
