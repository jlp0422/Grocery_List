/* eslint-disable */

const express = require('express');
const app = express();
const path = require('path');
const nunjucks = require('nunjucks');
const db = require('./db');
const List = db.models.List;

app.use(require('body-parser').urlencoded());
app.use(require('method-override')('_method'));

nunjucks.configure({ noCache: true });

app.use((req, res, next) => {
  res.locals.path = req.url
  next();
})

app.use('/vendor', express.static(path.join(__dirname, 'stylesheets')));
app.use('/vendor', express.static(path.join(__dirname, 'node_modules')));
app.use('/items', require('./routes/items.js'))


app.set('view engine', 'html');
app.engine('html', nunjucks.render)

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`listening on port ${port}`))

db.sync()
  .then(() => db.seed())

app.get('/', (req, res, next) => {
  res.render('index', {title: 'Grocery List Application'})
})

app.get('/:slash', (req, res, next) => {
  if (req.params.slash !== 'users') {
    res.render('error', { title: 'Uh oh' });
  }
})

app.use((err, req, res, next) => {
  res.render('error', {error: err, title: 'Uh oh'})
});
