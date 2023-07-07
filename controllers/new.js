const asyncHandler = require("../helpers/asyncHandler");
const { getParties, insertNewPartyResult, getPuResultsById, getPuResultsByLgaUniqueId, getPollingUnitById } = require("../helpers/pollingUnitQueries");

exports.newResultPageGet = asyncHandler(async (req, res, next) => {

    return res.render("general/page/new",{
        title: "New Polling Unit Result",
        parties: await getParties()
    })
})

exports.newResultPagePost = asyncHandler(async (req, res, next) => {

    //Check If Such PU Exist
    const puExist = await getPollingUnitById(req.body.uniqueId);
   
    if (!puExist) return res.json({ status: false, message: "Polling Unit Does Not Exist" });

    //Check If Results Already Added To Polling Unit Before
    const prevResults = await getPuResultsById(req.body.uniqueId);
    if (prevResults.length) return res.json({ status: false, message: "Results Already Added Before" });

    for(i = 0; i < req.body.results.length; i++){
        const partyResult = req.body.results[i];

        await insertNewPartyResult({
            polling_unit_uniqueid: req.body.uniqueId,
            party_abbreviation: partyResult.partyName,
            party_score: partyResult.score,
            entered_by_user: "Ayodele Segun Flexible",
            date_entered: new Date(),
            user_ip_address: req.headers['x-forwarded-for'] || req.socket.remoteAddress
        })
    }

    return res.json({status: true, message: "Results Uploaded"})
    
})
