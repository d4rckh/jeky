var express = require('express')
var app = express();

var jeky = require('./utils/markdown.js')({
    layoutsFolder: __dirname + '/examples/_layouts',
    markdownFolder: __dirname + '/examples/_pages',
    globalData: {
        sidebar: require('fs').readFileSync(__dirname + '/partials/sidebar.html').toString()
    }
})

app.use(jeky)

app.get('/', (req, res, next) => {
    res.render('index.md', {
        layout: 'index.html',
        title: 'Home'
    })
})

app.listen(3030) 