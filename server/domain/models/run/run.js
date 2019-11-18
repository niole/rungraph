const Sequelize = require('sequelize');
const Model = Sequelize.Model;
const sequelize = require('../../database');

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
  routeId: {
    type: Sequelize.STRING,
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

Run.sync({ force: true }).then(() => {
  return Run.create({
    length: 4.2,
    duration: 38.5,
    routeId: 'routeId',
    userId: 'userId',
    datetime: new Date(),
  });
});

module.exports.findAll = () => Run.findAll();
