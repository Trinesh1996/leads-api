var _ = require("lodash")
var xls = require("xlsx")
var workbook = xls.readFile("./spool/CreditRescueSet1.xlsx")


var sheet = workbook.SheetNames
var data = xls.utils.sheet_to_json(workbook.Sheets[sheet[0]])
var cols = Object.keys(data[0]).toString()


module.exports = function postgre (database) 
{
    
    function getLeads (done)
    {
        database.query("SELECT * from leads ORDER BY id ASC", function (err, data) {
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

    function updateDisposition (disposition, id, done)
    {
        database.query("UPDATE leads SET disposition = $1 where id = $2", [disposition, id], function (err, res) {
            if (err)
            {
                return done (err)
            }
            else
            {
                return done (null, res)
            }
        })
    }

    function getLeadsById(id, done)
    {
        database.query("SELECT * from leads where id = $1", [id], function (err, res) {
            if (err)
            {
                return done (err)
            }
            else
            {
                return done (null, res.rows)
            }
        })
    }

    return Object.freeze({
        getLeads
        ,getLeadsWithoutRef
        ,getLeadsWithDisposition
        ,updateDisposition
        ,getLeadsById
    })
}