/* eslint-disable */

// creates connection to database
const Sequelize = require('sequelize');
const _conn = new Sequelize(process.env.DATABASE_URL);

// creates table, module to export
const List = _conn.define('item', {
  name: Sequelize.STRING,
  price: Sequelize.STRING,
  quantity: Sequelize.STRING
});

// creates table, drops when re-ran
const sync = () => {
  return _conn.sync({force: true})
}

// adds data to table
const seed = () => {
  Promise.all([
    List.create({name: 'Bananas', price: '.75/lb', quantity: '5'}),
    List.create({ name: 'Rice', price: '3', quantity: '1' }),
    List.create({ name: 'Ground beef', price: '4/lb', quantity: '2' }),
  ])
}

module.exports = {
  sync,
  seed,
  models: {
    List
  }
}
