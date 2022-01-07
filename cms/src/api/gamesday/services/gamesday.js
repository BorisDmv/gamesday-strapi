'use strict';

/**
 * gamesday service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::gamesday.gamesday');
