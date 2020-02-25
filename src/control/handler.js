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
                res.json(data)
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
  
   
    return Object.freeze({
        getLeads
        ,getLeadsWithoutRef
        ,getLeadsWithDisposition
    })
}