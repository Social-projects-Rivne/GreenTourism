angular.module('blog', []);
angular.module('blog').component('blogDetail', {
    templateUrl: 'components/blog/blog-detail/blog-detail.template.html',
    controller:
        function BlogDetailController($http, $filter, $routeParams) {
            var self = this;
            self.orderProp = 'date';
            $http.get('components/blog/blog.data.json').then(function (response) {
                self.blogs = $filter('filter')(response.data, {id: $routeParams.blogId})
            });
        }
});