const User = require('./User');
const Todo = require('./Todo');

User.hasMany(Todo, { foreignKey: 'userId' });
Todo.belongsTo(User, { foreignKey: 'userId' });
