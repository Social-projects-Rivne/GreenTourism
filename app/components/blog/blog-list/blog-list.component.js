angular.module('blogList', []);

angular.module('blogList').component('blogList', {
    templateUrl: 'components/blog/blog-list/blog-list.template.html',
    controller: function BlogListController($http) {
        var self = this;
        self.dateProp = 'date';
        self.categoryProp = 'category';
        $http.get('components/blog/blog.data.json').then(function (response) {
            self.blogs = response.data;
        });
    }
});
