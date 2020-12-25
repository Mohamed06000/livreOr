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
    let Message = require('./models/message')
    Message.all((messages) => {
        response.render('page/index', {messages: messages})
    })

})

app.post('/', (request, response) => {
    if (request.body.message === undefined || request.body.message === '') {
        request.flash('error', "Vous n'avez pas entré de message")
        response.redirect('/')
    } else {
        let Message = require('./models/message')
        Message.create(request.body.message, () => {
            request.flash('success', "Merci!")
            response.redirect('/')
        })
    }


})


app.listen(3000)
