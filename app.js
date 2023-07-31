require('dotenv').config(); //dotenv has differemt method to require other common method is as given below

const express = require('express');
const expressLayout = require('express-ejs-layouts');
const connectDB = require('./server/config/db');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');

const app = express();
const port = 5000 || process.env.PORT;  //5000 as our port or if we want to deploy on a real server then we sue process.env.PORT

//Connect to database
connectDB();

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(methodOverride('_method'));


//Static Files--
app.use(express.static('public'));


//Express Session
app.use(
    session({
        secret : 'secret',
        resave : false,
        saveUninitialized : true,
        cookie:{
            maxAge : 1000 * 60 * 60 * 24 * 7,  //1 week i.e. cookies expires after 1 week.
        }
    })
);


//Flash Messages.
app.use(flash({sessionKeyName : 'flashMessages'}))



//Templating Engine
app.use(expressLayout);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');



//Routes
app.use('/', require('./server/routes/customer'))


// Handle 404
app.get('*', (req,res)=>{          // * refers to any non existing page i.e. if req is made at any such page it renders 404.ejs
    res.status(404).render('404'); //renders 404.ejs
})


app.listen(port,()=>{
    console.log(`App listening on port ${port}`)
});