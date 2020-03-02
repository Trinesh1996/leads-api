require('dotenv').config();
var fs = require("fs")
var path = require("path")


var _ = require ("lodash")

// // Environmental Variables
var PORT = process.env.PORT || 3000

var database = require("./src/database/pg")
var queries = require("./src/database/queries")
var handler = require("./src/control/handler")

var Queries = queries(database)
var service = handler(Queries)



var express = require("express")
var passport = require('passport')
var bodyParser = require("body-parser")
var cors = require("cors")
var app = express()

require("./src/lib/passport")(passport)
app.use(passport.initialize())
app.use(passport.session())



app.use(cors())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())



var login = path.join(__dirname,'./public/home');

app.use("/leadsapi/login", express.static(login))

// login endpoint

app.get("*", function (req, res, next) {
    res.locals.user = req.user || null
    next()
})


app.get("/", function (req, res, next)
{
    res.redirect("leadsapi/login")
})

// main endpoints
app.get("/leadsapi/getLeads", service.getLeads)
app.get("/leadsapi/getLeadsWithoutRef", service.getLeadsWithoutRef)
app.get("/leadsapi/getLeadsDisposition", service.getLeadsWithDisposition)



app.put("/leadsapi/dispositionUpdate/:lead_id/:disposition", service.dispositionUpdate)
app.get("/leadsapi/getLeads/:id", service.getLeadsById)


// Error handling

process.on('uncaughtException', function(err, promise) {
    if(err.errno !== 'EADDRINUSE') {
        console.log(err)
       
    }
    else
    {
        console.log(`unhandled promise rejection`)
    }
});


process.on('SIGINT', function() 
{
    var err = "error"
    process.exit(err ? 1 : 0);

})

// app.use(function (error, req, res, next)
// {
//     logger.error(error.message)
 
// })

app.listen(PORT, function  () 
{
    console.log("listening on port: ", PORT)
    process.send("ready")
});