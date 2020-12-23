const express = require('express')
const app = express()
const bodyparser = require('body-parser')

//template
app.set('view engine', 'ejs')

//middleware
app.use(express.static('public'))
app.use(bodyparser.urlencoded({extended: false}))
app.use(bodyparser.json())


//routes
app.get('/', (request, response) => {
    response.render('page/index', {test: 'Salut'})
})

app.post('/', (request, response) => {
    if (request.body.message === undefined || request.body.message === '') {
        response.render("page/index", {erro: "Entrez un message."})
    }
    console.log(request)
})


app.listen((3001))
