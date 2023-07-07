const asyncHandler = require("../helpers/asyncHandler");
const { displayNumberWithPrefix } = require("../helpers/manipulateData");
const { getPuResultsById } = require("../helpers/pollingUnitQueries");

exports.puResultPageGet = asyncHandler(async (req, res, next) => {

    return res.render("general/page/pu",{
        title: "Polling Unit Result"
    })
})

exports.puResultPagePost = asyncHandler(async (req, res, next) => {

    const results = await getPuResultsById(req.body.id);

    const puNo = results.length ? displayNumberWithPrefix(results[0].uniqueid) : '';

    res.json({ status: true, puNo: puNo, results})
})
