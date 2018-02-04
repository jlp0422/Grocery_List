/* eslint-disable */

const app = require('express').Router();
const db = require('../db');
const List = db.models.List;

module.exports = app;

app.get('/', (req, res, next) => {
  List.findAll()
    .then( items => res.render('items', {title: 'Grocery List', items}))
    .catch( err => next(err))
});

app.get('/:id', (req, res, next) => {
  List.findById(req.params.id)
    .then( item => res.render('item', {title: `${item.name}`, item}))
    .catch( err => next(err))
})

app.post('/', (req, res, next) => {
  List.create({
    name: req.body.name,
    price: req.body.price,
    quantity: req.body.quantity
  })
  .then( () => res.redirect('/items'))
  .catch(err => next(err))
});

app.delete('/:id', (req, res, next) => {
  List.findById(req.params.id)
    .then(item => item.destroy())
    .then( () => res.redirect('/items'))
    .catch( err => next(err))
})

app.patch('/:id', (req, res, next) => {
  List.findById(req.params.id)
    .then(item => {
      item.name = req.body.name,
      item.price = req.body.price,
      item.quantity = req.body.quantity
      return item.save()
    })
    .then( () => res.redirect(`/items/${req.params.id}`))
    .catch( err => next(err));
})
