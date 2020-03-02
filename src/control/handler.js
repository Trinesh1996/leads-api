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
                var transformedArray = []
                _.forEach(data, function (processed)
                    {
                        var transform = {
                            lead_id: processed.lead_id.toLowerCase(),
                            name: processed.name,
                            surname: processed.surname,
                            id_number: processed.id_number,
                            handover_balance: processed.handover_balance,
                            creditor: processed.creditor.replace(/\s/g, '').toLowerCase(),
                            phone_number: processed.phone_number,
                            disposition: processed.disposition
                        }
                        transformedArray.push(transform)
                    })

                    var leads = _.filter(transformedArray, _.matches(req.query))
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
        var lead_id = req.params.lead_id
        var disposition = req.params.disposition

        service.updateDisposition(disposition, lead_id,  function (err, resp) 
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