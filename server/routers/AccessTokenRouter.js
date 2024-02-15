const express = require("express");
const { getAccessToken } = require("../controllers/AccessTokenController");

const accessTokenRouter = express.Router();
accessTokenRouter.route("/").get(getAccessToken);
accessTokenRouter.route("/test").get(function(req,res){

    

});

module.exports = accessTokenRouter;
