"use strict";
// CORS & Headers control system
//
// Common code to be used for all services in order to enable the access
// from the correct Origins + credentials
//
//
// Castellon.CH - 2019 (c)
// Author: Antonio Castellon
//
// whitelist : txt file, each line contains an address to trust in UTF-8
//
const cors = require('cors');
const fs = require('fs');

module.exports = function(path2whiteListFile) {

  const model = {};

  //
  // CONFIGURATION
  //
  //const whitelist = fs.readFileSync(config.CERTIFICATION_PATH + '/whitelist', "utf8").split(/\r?\n/);
  const whitelist = fs.readFileSync(path2whiteListFile, "utf8").split(/\r?\n/);

  //
  // ASSIGNATIONS
  //

  model.enableCORS = enableCORS;

  //
  //  FUNCTION BODY
  //

  function enableCORS(app) {

    app.use(function (req, res, next) {

      //res.header("Access-Control-Allow-Origin", "*"); // not allowed between angularjs on chrome
      res.header("Access-Control-Expose-Headers", "WWW-Authenticate, access-control-*,origin,x-requested-with,content-type,accept,authorization,x-auth");
      res.header("Access-Control-Allow-Headers", "WWW-Authenticate, access-control-*,origin,x-requested-with,content-type,accept,authorization,x-auth");
      res.header("Access-Control-Allow-Methods", "HEAD, GET, POST, OPTIONS, PUT, PATCH, DELETE");
      res.header('User-Agent', 'request');
      res.header('Access-Control-Allow-Credentials', true);

      next();
    });

    var corsOptions = {
      origin: function (origin, callback) {

        // note: from server wwww the origin appears as undefined, to be checked later
        // console.log(origin);
        if (whitelist.indexOf(origin) !== -1 || !origin || typeof origin == 'undefined') {
          callback(null, true)
        } else {
          callback(new Error('Not allowed by CORS'))
        }
      }
      ,optionsSuccessStatus: 200  // some legacy browsers (IE11, various SmartTVs) choke on 204
      ,credentials: true
    }

    app.use(cors(corsOptions));
  }

  return model;

}
