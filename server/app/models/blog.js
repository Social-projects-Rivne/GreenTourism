var Sequelize = require('sequelize');

var sql = require('../../config/sequelize')();

var BlogList = sql.define('blogs', {
  title: {type: Sequelize.TEXT, allowNull: false},
  content: {type: Sequelize.TEXT, allowNull: false},
  owner: {type: Sequelize.TEXT, allowNull: false},
  status: {type: Sequelize.TEXT, allowNull: false}
});

var BlogPhotos = sql.define('blogPhotos', {
  url: {type: Sequelize.TEXT, allowNull: false}
});

var Categories = sql.define('categories', {
  name: {type: Sequelize.TEXT, allowNull: false},
  icon: {type: Sequelize.TEXT, allowNull: false}
});

var BlogLikes = sql.define('blogLikes', {
  author: {type: Sequelize.TEXT, allowNull: false}
});

var BlogComment = sql.define('blogComment', {
  text: {type: Sequelize.TEXT, allowNull: false},
  author: {type: Sequelize.TEXT, allowNull: false}
});

BlogList.hasOne(BlogPhotos);

BlogList.belongsTo(Categories);

BlogList.hasMany(BlogComment);

BlogComment.belongsTo(BlogList);

BlogList.hasMany(BlogLikes);

BlogLikes.belongsTo(BlogList);

//Categories.sync({force: true});
//BlogList.sync({force: true});
//BlogPhotos.sync({force: true});
//BlogLikes.sync({force: true});
//BlogComment.sync({force: true});

var Blog = {blog: BlogList, photos: BlogPhotos, categories: Categories, likes: BlogLikes, comment: BlogComment};

module.exports = Blog;
