const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');

app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
  const now = new Date().toString();
  var log = `${now}: ${res.method} ${req.url}`;

  console.log(log);
  fs.appendFile('server.log', log+ '\n', (err) => {
    if (err)
    {
      console.log(err);
    }
  });
  next();
});

app.use((req, res) => {
  res.render('sorry.hbs');
})

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear()
})

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
})

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'About Page',
    
    welcomeText: 'hi , welcome to my home'
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page'
   
  });
})


app.get('/bad', (req, res)=> {
  res.send({
    error: 'noooooooo!'
  })
})
app.listen(3000, () => {
  console.log('server is running on port 3000...')
});