angular.module('blogList', []);

angular.module('blogList').component('blogList', {
  templateUrl: 'components/blog/blog-list/blog-list.template.html',
  controller: ['$http', function BlogListController($http) {
    var self = this;
    self.dateProp = 'date';
    self.categoryProp = 'category';
    $http.get('components/blog/blog.data.json').then(function(response) {
      self.blogs = response.data;
    });

    self.tab = 1;
    self.selectTab = function(setTab) {
      self.tab = setTab;
    };
    self.isSelected = function(checkTab) {
      return self.tab == checkTab;
    };
  }]
});
angular.module('blogCategory', [])
  .filter('unique', function() {
    return function(data, propertyName) {
      if (angular.isArray(data) && angular.isString(propertyName)) {
        var results = [];
        var keys = {};
        for (var i = 0; i < data.length; i++) {
          var val = data[i][propertyName];
          if (angular.isUndefined(keys[val])) {
            keys[val] = true;
            results.push(val);
          }
        }
        return results;
      } else {
        return data;
      }
    };
  });
