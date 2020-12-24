let express = require('express')
let app = express()
let bodyparser = require('body-parser')
let session = require('express-session')

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
app.use(require('./middlewares/flash'))


//routes
app.get('/', (request, response) => {
    console.log(request.session)
    response.render('page/index')
})

app.post('/', (request, response) => {
    if (request.body.message === undefined || request.body.message === '') {
        request.flash('error', "Vous n'avez pas entré de message")
        response.redirect('/')
    } else {
        let message = require('./models/message')
        message.create(request.body.message, () => {
            request.flash('success', "Merci!")
        })
    }

    response.redirect('/')
})


app.listen((3001))
