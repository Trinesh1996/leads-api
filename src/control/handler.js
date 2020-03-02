var _ = require("lodash")

module.exports = function (service)
{
    // process schedules
    /**
     * 
     * @param {*} req 
     * @param {*} res
     * @method schedules Get Eskom loadshedding schedules - sends it via http as a json response object
     */

    async function getLeads (req, res)
    {
        service.getLeads(function (err, data) {
            if (err)
            {
                res.send(err)
            }
            else
            {
                var leads = _.filter(data, _.matches(req.query))
                var headers =
                {
                    response_code: res.statusCode == 200 ? res.statusCode : null,
                    error_code: res.statusCode != 200 ? res.statusCode : null,
                    status_message: res.statusMessage,
                    STATUS: res.statusCode === 200 ? "SUCCESS" : "ERROR",
                    row_count: leads.length,
                    data: leads
                }
                res.json(headers)
            }
        })
    }
    async function getLeadsWithoutRef (req, res)
    {
        service.getLeadsWithoutRef(function (err, data) {
            if (err)
            {
                res.send(err)
            }
            else
            {
                var headers =
                {
                    response_code: res.statusCode == 200 ? res.statusCode : null,
                    error_code: res.statusCode != 200 ? res.statusCode : null,
                    status_message: res.statusMessage,
                    STATUS: res.statusCode === 200 ? "SUCCESS" : "ERROR",
                    row_count: data.length,
                    data: data
                }
                res.json(headers)
            }
        })
    }
    async function getLeadsWithDisposition (req, res)
    {
        service.getLeadsWithDisposition(function (err, data) {
            if (err)
            {
                res.send(err)
            }
            else
            {
                var headers =
                {
                    response_code: res.statusCode == 200 ? res.statusCode : null,
                    error_code: res.statusCode != 200 ? res.statusCode : null,
                    status_message: res.statusMessage,
                    STATUS: res.statusCode === 200 ? "SUCCESS" : "ERROR",
                    row_count: data.length,
                    data: data
                }
                res.json(headers)
            }
        })
    }

    async function getLeadsById (req, res) {
        
        var params = req.params.id

        service.getLeadsById(params, function (err, data) {
            if (err)
            {
                res.send(err)
            }
            else{
                var headers =
                {
                    response_code: res.statusCode == 200 ? res.statusCode : null,
                    error_code: res.statusCode != 200 ? res.statusCode : null,
                    status_message: res.statusMessage,
                    STATUS: res.statusCode === 200 ? "SUCCESS" : "ERROR",
                    row_count: data.length,
                    data: data
                }
                res.json(headers)
            }
        
        })
    }

    async function dispositionUpdate (req, res) {
        var id = req.params.id
        var disposition = req.params.disposition

        service.updateDisposition(id, disposition, function (err, resp) 
        {
            if (err)
            {
                res.send(err)
            }
            else
            {
                res.send(resp)
            }
        })
    }
  
   
    return Object.freeze({
        getLeads
        ,getLeadsWithoutRef
        ,getLeadsWithDisposition
        ,dispositionUpdate
        ,getLeadsById
    })
}