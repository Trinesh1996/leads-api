var xls = require("xlsx")
var fs = require("fs")
var _ = require("lodash")

module.exports = function postgre ({database}) 
{

   
        const workbook = xls.readFile("../spool/1000Leads.xlsx")
        xls.writeFile(workbook, "test.csv", {bookType: "csv"})
    
        var leadsCsv = fs.readFileSync("./test.csv").toString().split(",")



        var test = _.filter(leadsCsv, function (headers) {
            if (headers.match(/\n/g)) {
                return headers
            }
        })
    
        var headers = leadsCsv.slice(0, leadsCsv.indexOf(test[0]))
    
        var tableColumns = []
    
    
        _.filter(headers, function (header) {
            if (header != "") {
                tableColumns.push(header)
            }
        })
    
        var lv = test[0].split("\n")[0]
        var columns = tableColumns.concat(lv)
    
    
        var filter = []
    
        _.forEach(columns, function (cols) {
            var tableSchema = cols + " text"
            filter.push(tableSchema)
    
        })
    
        filter.pop()
    
       
    
         database.query(`CREATE TABLE IF NOT EXISTS leads (id SERIAL, ${filter.toString()})`, function (err, res) {
            if (err) {
                console.log(err)
            }
            console.log("SUCCESSFULLY CREATED TABLE")
        })
        var rows = leadsCsv.slice(leadsCsv.indexOf(test[0]))
    
    
        var filterTest = rows.toString().split("\n")
    
        var rowsFormatted = []
         _.filter(filterTest, function (rows) {
             var removeDoubleQuotes = rows.replace(/['"]+/g, '')
             var removeComma = removeDoubleQuotes.replace(/,,,\s*$/, "");
             rowsFormatted.push(removeComma)
        })
    
    
        database.query("COPY leads FROM 'test.csv' DELIMITERS ',' CSV QUOTE '''';", function (err, res) {
            if (err)
            {
                console.log(err)
            }
            else
            {
                console.log(res)
                console.log("insertted")
            }
        })
        var columnFormat = `${columns.toString().replace(/,\s*$/, "")}`

        rowsFormatted.shift()

   

    

    








  
    // _.forEach(rowsFormatted, function (row) {
    //         var b = "'" + row.split(",").join("','") + "'";
    //         database.query(`INSERT INTO leads (${columnFormat}) values (${b})`, function (err, res) {
    //             if (err)
    //             {
    //                 console.log(er)
    //             }
    //             else
    //             {
    //                 console.log(res)
    //                 console.log("inserted")
    //             }
    //         })
    // })
}


