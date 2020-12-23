const express = require('express')
const app = express()
const bodyparser = require('body-parser')
const session = require('express-session')

//template
app.set('view engine', 'ejs')

//middleware
app.use(express.static('public'))
app.use(bodyparser.urlencoded({extended: false}))
app.use(bodyparser.json())
app.use(session({
    secret: 'code',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))


//routes
app.get('/', (request, response) => {
    response.render('page/index', {test: 'Salut'})
})

app.post('/', (request, response) => {
    if (request.body.message === undefined || request.body.message === '') {
        request.session.error = "Il y a une erreur"
    }
    console.log(request)
})


app.listen((3001))
