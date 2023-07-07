
const { homePageGet } = require("../../controllers/home");
const { lgasPageGet, lgasPagePost } = require("../../controllers/lgas");
const { newResultPageGet, newResultPagePost } = require("../../controllers/new");
const { puResultPageGet, puResultPagePost } = require("../../controllers/pu");


const generalRoute = require("express").Router();

//HOMEPAGE
generalRoute.route("/").get(homePageGet)

//PU RESULT
generalRoute.route("/pu-result").get(puResultPageGet).post(puResultPagePost)

//LGAS
generalRoute.route("/lgas").get(lgasPageGet).post(lgasPagePost)

//NEW RESULT
generalRoute.route("/new").get(newResultPageGet).post(newResultPagePost)


module.exports = generalRoute