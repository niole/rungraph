const Sequelize = require('sequelize');
const Model = Sequelize.Model;
const sequelize = require('../../database');

class Route extends Model {}
Route.init({
  id: {
    type: Sequelize.STRING,
    primaryKey: true,
    allowNull: false
  },
  points: {
    type: Sequelize.STRING,
    allowNull: false
  },
}, {
  sequelize,
  modelName: 'route'
});

module.exports.sync = () => Route.sync({ force: true }).then(() => {
  return Route.create({
    id: 'routeId',
    points: JSON.stringify([[1, 2]]), // TODO not great
  });
});

module.exports.findAll = (routeId) => Route.findAll({
  where: {
    id: routeId
  }
});

module.exports.Route = Route;
