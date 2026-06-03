"use strict";
// CORS & Headers control system
//
// Common code to be used for all services in order to enable the access
// from the correct Origins + credentials
//
// Castellon.CH - 2019-2026 (c)
// Author: Antonio Castellon
//
// whitelist : txt file, each line contains an address to trust in UTF-8

const cors = require('cors');
const fs = require('fs');

/**
 * Creates a CORS enabler.
 * @param {string} path2whiteListFile - Path to newline-separated whitelist of origins.
 * @returns {{enableCORS: function(app: object): void}}
 */
module.exports = function(path2whiteListFile) {

  const model = {};

  const whitelist = fs.readFileSync(path2whiteListFile, 'utf8').split(/\r?\n/);

  model.enableCORS = enableCORS;

  /**
   * Applies CORS + custom header middleware to an Express app.
   * Sets expose/allow headers and uses the cors package with origin validation.
   * @param {object} app - Express application instance
   */
  function enableCORS(app) {
    app.use(function (req, res, next) {
      res.header('Access-Control-Expose-Headers', 'WWW-Authenticate, access-control-*,origin,x-requested-with,content-type,accept,authorization,x-auth');
      res.header('Access-Control-Allow-Headers', 'WWW-Authenticate, access-control-*,origin,x-requested-with,content-type,accept,authorization,x-auth');
      res.header('Access-Control-Allow-Methods', 'HEAD, GET, POST, OPTIONS, PUT, PATCH, DELETE');
      res.header('User-Agent', 'request');
      res.header('Access-Control-Allow-Credentials', true);
      next();
    });

    const corsOptions = {
      origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1 || !origin || typeof origin == 'undefined') {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'));
        }
      },
      optionsSuccessStatus: 200,
      credentials: true
    };

    app.use(cors(corsOptions));
  }

  return model;
};
