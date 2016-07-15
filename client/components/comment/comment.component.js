angular.module('comment', [])
  .component('comment', {
    templateUrl: 'components/comment/comment.template.html',
    controller: function commentCtrl(currentUser, Restangular, $rootScope) {
      var self = this;

      this.currentUser = currentUser;
      this.object = $rootScope.obj;
      var type = $rootScope.objType;

      this.addComment = function(content) {
        if (content.length <= 1000) {
          Restangular.one(type, this.object._id).get().then(function(obj) {
            obj.comments.push({content: content, author: currentUser._id});
            obj.put();
            self.object.comments.push({
              content: content,
              updatedAt: 'just added',
              author: {
                avatar: currentUser.avatar,
                firstName: currentUser.firstName,
                lastName: currentUser.lastName
              }
            });
          });
        }
        this.content = "";
      };
    }
  });

