angular.module('greenTourism')
  .factory('Blog', function($resource) {
    var Blog = $resource('/api/blogs/:id');

    // Custom methods goes here

    return Blog;
  });
