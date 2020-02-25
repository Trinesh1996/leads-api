var xls = require("xlsx")
var fs = require("fs")
var _ = require("lodash")

module.exports = function postgre (database) 
{
    var workbook = xls.readFile("./spool/1000Leads.xlsx")
    var sheet = workbook.SheetNames
    var data = xls.utils.sheet_to_json(workbook.Sheets[sheet[0]])
    var cols = Object.keys(data[0]).toString()

    
    var uniqueColumn = []
    var allColumns = []

    _.forEach(Object.keys(data[0]), function (cols) {
        if (cols.includes("IdentityNo"))
        {
            var unique = cols + " text" + " UNIQUE"
            uniqueColumn.push(unique)
        }
    })
    _.forEach(Object.keys(data[0]), function (cols) {
        if (!cols.includes("IdentityNo"))
        {
            allColumns.push(cols + " text")
        }
    })
    var tableColumns =  uniqueColumn.concat(allColumns)
   // Create Table
    database.query(`CREATE TABLE IF NOT EXISTS leads (id SERIAL, ref text NOT NULL, ${tableColumns}, disposition text)`, function (err, res) 
    {
        if (err) {
            console.log(err)
            return done (err)
        }
        else
        {
            console.log("created table")
            return (null, "created Table")
        }
    })
   
    function insertLeads (done) 
    {
        _.forEach(data, function (values) 
        {
            var rows =  "'" + Object.values(values).toString().split(",").join("','") + "'";
            
            database.query(`INSERT INTO leads (ref, ${cols}, disposition) values ('dtech', ${rows}, null)`, function (err, res) 
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
    // Insert data
    // insertLeads(function (err, res) {
    //     if (err)
    //     {
    //         console.log(err)
    //     }
    //     else
    //     {
    //         console.log(res)
    //     }
    // })

    function getLeads (done)
    {
        database.query("SELECT * from leads", function (err, data) {
            if (err)
            {
                
                return done (err)
            }
            else
            {
                return done (null, data.rows)
            }
        })
    }

    function getLeadsWithoutRef (done)
    {
        database.query(`SELECT ${cols} from leads`, function (err, data) {
            if (err)
            {
                
                return done (err)
            }
            else
            {
                return done (null, data.rows)
            }
        })
    }
    function getLeadsWithDisposition (done)
    {
        database.query(`SELECT ${cols}, disposition from leads`, function (err, data) {
            if (err)
            {
                
                return done (err)
            }
            else
            {
                return done (null, data.rows)
            }
        })
    }

    return Object.freeze({
        getLeads
        ,getLeadsWithoutRef
        ,getLeadsWithDisposition
    })
}