'use strict';

/**
 *  gamesday controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

//module.exports = createCoreController('api::gamesday.gamesday');

module.exports = createCoreController('api::gamesday.gamesday', ({ strapi }) => ({
    async findOne(ctx) {
      const { id } = ctx.params;
      const { query } = ctx;
  
      const entries = await strapi.entityService.findMany('api::gamesday.gamesday', {
        filters: { slug: id },
      });
  
      const sanitizedEntity = await this.sanitizeOutput(entries[0], ctx);
  
      return this.transformResponse(sanitizedEntity);
    }
  }));