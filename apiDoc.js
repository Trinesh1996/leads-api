/**
 * @api {get} /leadsapi/getLeads Get all available leads
 * @apiName Leads REST API v1
 * @apiGroup getLeads
 * @apiDescription Retrieves all leads currecntly available
 * - Tips querying API
 *      - Ensure query string is in lowercase and has no spaces when querying for creditors.
 *
 * @apiSuccessExample {json} Success-Response:
 * {
    response_code: 200,
    error_code: null,
    STATUS: "SUCCESS",
    row_count: 290759,
    data: 
    [
        {
            lead_id: "dta015",
            name: "DANIEL BHUTANA",
            surname: "MOKWELE",
            id_number: "7907205418089",
            handover_balance: "3643.52",
            creditor: "edgars",
            phone_number: "727089792",
            disposition: null
        },
        {
            lead_id: "dta120684",
            name: "PAUL",
            surname: "MOKWELE",
            id_number: "8711245887082",
            handover_balance: "21520.415",
            creditor: "edgars",
            phone_number: "730661318",
            disposition: null
        },
        {
            lead_id: "dta154091",
            name: "CHOSHI VICTOR",
            surname: "MOKWELE",
            id_number: "7612106098085",
            handover_balance: "2381.64",
            creditor: "edgars",
            phone_number: "727196727",
            disposition: null
        }
        ...
    ]
}
*/


/**
 * @api {get} /leadsapi/getLeads/?creditor=edgars Filter leads by creditor
 * @apiName Leads REST API v1
 * @apiGroup getLeads/creditor
 * @apiDescription Retrieves leads by creditor
 * - Tips querying API
 *      - Ensure query string is in lowercase and has no spaces when querying for creditors
 *
 * @apiSuccessExample {json} Success-Response:
 * {
    response_code: 200,
    error_code: null,
    STATUS: "SUCCESS",
    row_count: 290759,
    data: 
    [
        {
            lead_id: "dta015",
            name: "DANIEL BHUTANA",
            surname: "MOKWELE",
            id_number: "7907205418089",
            handover_balance: "3643.52",
            creditor: "edgars",
            phone_number: "727089792",
            disposition: null
        },
        {
            lead_id: "dta120684",
            name: "PAUL",
            surname: "MOKWELE",
            id_number: "8711245887082",
            handover_balance: "21520.415",
            creditor: "edgars",
            phone_number: "730661318",
            disposition: null
        },
        {
            lead_id: "dta154091",
            name: "CHOSHI VICTOR",
            surname: "MOKWELE",
            id_number: "7612106098085",
            handover_balance: "2381.64",
            creditor: "edgars",
            phone_number: "727196727",
            disposition: null
        }
        ...
    ]
}
*/

/**
 * @api {get} /leadsapi/getLeads/?lead_id=dta015 Filter leads by lead ID
 * @apiName Leads REST API v1
 * @apiGroup getLeads/lead_id
 * @apiDescription Retrieves leads by lead id
 *
 * @apiSuccessExample {json} Success-Response:
 * {
    response_code: 200,
    error_code: null,
    STATUS: "SUCCESS",
    row_count: 290759,
    data: 
    [
        {
            lead_id: "dta015",
            name: "DANIEL BHUTANA",
            surname: "MOKWELE",
            id_number: "7907205418089",
            handover_balance: "3643.52",
            creditor: "edgars",
            phone_number: "727089792",
            disposition: null
        }
    ]
}
*/

/**
 * @api {get} /leadsapi/getLeads/disposition/sale Filter leads by disposition
 * @apiName Leads REST API v1
 * @apiGroup getLeads/disposition
 * @apiDescription Retrieves leads by dispostion
 *
 * @apiSuccessExample {json} Success-Response:
 * {
    response_code: 200,
    error_code: null,
    STATUS: "SUCCESS",
    row_count: 290759,
    data: 
    [
        {
            lead_id: "dta015",
            name: "DANIEL BHUTANA",
            surname: "MOKWELE",
            id_number: "7907205418089",
            handover_balance: "3643.52",
            creditor: "edgars",
            phone_number: "727089792",
            disposition: sale
        },
        {
            "lead_id":"dta009",
            "name":"DAISY","surname":"CHAUKE","id_number":"8609281074088","handover_balance":"2366.69","creditor":"homechoice","phone_number":"731800249","disposition":null},
        {"lead_id":"dta014","name":"ZOLEKE","surname":"SYOKWE","id_number":"7704141084087","handover_balance":"105.19","creditor":"homechoice","phone_number":"718210498","disposition":null}
    ]
}
*/







