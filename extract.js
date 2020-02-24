var xls = require("xlsx")
var fs = require("fs")
var _ = require("lodash")

const workbook = xls.readFile("./spool/1000Leads.xlsx")
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
console.log(tableColumns.concat(lv))

