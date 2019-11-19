const Sequelize = require('sequelize');
const Model = Sequelize.Model;
const { Route } = require('../route/route');
const sequelize = require('../../database');

// TODO make backend typesafe too
// maybe have hot reloading too

class Run extends Model {}
Run.init({
  length: {
    type: Sequelize.NUMBER,
    allowNull: false
  },
  duration: {
    type: Sequelize.NUMBER,
    allowNull: false
  },
  userId: {
    type: Sequelize.STRING,
    allowNull: false
  },
  datetime: {
    type: Sequelize.DATE,
    allowNull: false
  },
}, {
  sequelize,
  modelName: 'run'
});

module.exports.sync = () => Run.sync({ force: true }).then(() => {
  return Run.create({
    length: 4.2,
    duration: 38.5,
    routeId: 'routeId',
    userId: 'userId',
    datetime: new Date(),
  }, {
  include: [{
    model: Route,
    required: true,
  }]
  });
});

module.exports.findAll = (userId) => Run.findAll({
  where: {
    userId,
  },
  include: [{
    model: Route,
    required: false,
  }]
});

module.exports.Run = Run;
