var xls = require("xlsx")
var _ = require("lodash")
var database = require("./pg")
var fs = require("fs")
var path = require("path")


var workbook = xls.readFile("../../spool/CreditRescueSet1.xlsx")


var sheet = workbook.SheetNames
var data = xls.utils.sheet_to_json(workbook.Sheets[sheet[0]])
var cols = Object.keys(data[0]).toString()

var uniqueColumn = []
var allColumns = []

_.forEach(Object.keys(data[0]), function (cols) {
    if (cols.includes("ID_Number"))
    {
        var unique = cols + " text" + " UNIQUE"
        uniqueColumn.push(unique)
    }
})
_.forEach(Object.keys(data[0]), function (cols) {
    if (!cols.includes("ID_Number"))
    {
        allColumns.push(cols + " text")
    }
})
var tableColumns =  uniqueColumn.concat(allColumns)



function main (done)
{

    createUserTable (function (err, res) {
        if (err) {
            if (done && done.constructor == Function) return done (err)
        }
        else
        {
            if (done && done.constructor == Function) return done (null, res)
        }
    })

    // createLeadsTable(function (err, res) {
    //     if (err)
    //     {
    //         if (done && done.constructor == Function) return done (err)
    //     }
    //     else
    //     {
    //         if (done && done.constructor == Function) return done (null, res)
    //         // insertLeads(function (err, res) {
    //         //     if (err)
    //         //     {
    //         //         if (done && done.constructor == Function) return done (err)
    //         //     }
    //         //     else
    //         //     {
    //         //         if (done && done.constructor == Function) return done (null, "inserted leads")
    //         //     }
    //         // })
    //     }
    // })
}

function createUserTable (done)
{
    database.query(`CREATE TABLE IF NOT EXISTS users (id SERIAL, username text not null, password text not null)`, function (err, res) 
    {
        if (err) {
            console.log(err)
            return done (err)
        }
        else
        {
            
            // Insert data
            console.log(res)
            return done (null, "created user table")
            
        }
    })
}

function createLeadsTable (done)
{
    // // Create Table
    database.query(`CREATE TABLE IF NOT EXISTS leads (id SERIAL, ${tableColumns}, disposition text)`, function (err, res) 
    {
        if (err) {
            console.log(err)
            return done (err)
        }
        else
        {
            
            // Insert data
            console.log(res)
            return done (null, "created leads table")
            
        }
    })
}


function insertLeads (done) 
{
    _.forEach(data, function (values) 
    {
        var rows =  "'" + Object.values(values).toString().split(",").join("','") + "'";
        
        database.query(`INSERT INTO leads (${cols}, disposition) values (${rows}, null)`, function (err, res) 
        {
            if (err)
            {
                console.log(err)
                return done (err)
            }
            else
            {
                console.log("inserted all data")
                return done (null, "finished insert data")
            }
        })
    })
}


main()



