angular.module('blogComments', []);
angular.module('blogComments').component('blogComments', {
  templateUrl: 'components/blog/blog-comments/blog-comments.template.html',
  bindings: {
    blog: '<'
  },
  controller: ['currentUser', 'Restangular' , function BlogCommentsCtrl() {
    var ctrl = this;
    ctrl.currentUser = currentUser;
    console.log(currentUser);
  }]
});
