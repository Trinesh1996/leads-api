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
                res.json(leads)
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
                res.json(data)
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
                res.json(data)
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
                res.json(data)
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