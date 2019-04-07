const path = require('path')
const express = require('express');
const hbs = require('hbs');

const app = express();

// paths for express config
app.use(express.static(path.join(__dirname, '../public')));
const viewspath = path.join(__dirname, './templates/views');
const partialspath = path.join(__dirname, './templates/partials');

// setting handlebar engines & views engine
app.set('view engine', 'hbs');
app.set('views', viewspath);
hbs.registerPartials(partialspath);

// routes
app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Faisal'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        name: 'faisal',
        title: 'About Page'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        help: 'Save me Save me',
        title: 'Help Page',
        name: 'mark'
    });
});
app.get('/product', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: "You must provide a search term"
        })
    }

    console.log(req.query.search);
    res.send({
        product: []
    });
});


app.get('/weather', (req, res) => {
    if(!req.query.address){
        res.send({
            error: 'address must be provided'
        });
    } else {

        res.send({
            address: req.query.address,
            forecast: 'It is snowing',
        locaton: 'Philadelphia'
        });
    }
});
app.get('/help/*', (req, res) => {
    res.render('404.hbs', {
        title: '404',
        name: 'Faisal',
        errorMessage: 'not help article'
    });
})

app.get('*', (req, res) => {
    res.render('404.hbs', {
        title: '404',
        name: 'Faisal',
        errorMessage: 'Page nor found'
    });
});


app.listen(3000, () => {
    console.log('Server has started');
});