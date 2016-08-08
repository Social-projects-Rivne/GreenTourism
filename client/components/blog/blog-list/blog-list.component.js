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

    Blog.one('category').get().then(function(response) {
      ctrl.categoryList = response;
    });

    ctrl.createPost = function() {
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
            console.log(res);
            //ctrl.content = '';
            res.record.owner = currentUser;
            ctrl.blogs.push(res.record);
          }, function(err) {
            ctrl.showError = err.statusText;
          });
    };

  }]
});
