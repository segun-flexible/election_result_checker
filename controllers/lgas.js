const asyncHandler = require("../helpers/asyncHandler");
const { getAllLgas, getPuResultsByLgaUniqueId } = require("../helpers/pollingUnitQueries");

//LGA (GET)
exports.lgasPageGet = asyncHandler(async (req, res, next) => {

    return res.render("general/page/lgas",{
        title: "Local Government Result",
        lgas: await getAllLgas()
    })
})

//LGA RESULT (POST)
exports.lgasPagePost = asyncHandler(async (req, res, next) => {

    const results = await getPuResultsByLgaUniqueId(req.body.id);

    res.json({ status: true, results })
})