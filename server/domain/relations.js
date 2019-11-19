const { Route } = require('./models/route/route');
const { Run } = require('./models/run/run');

Run.belongsTo(Route, {foreignKey: 'routeId', targetKey: 'id'});
