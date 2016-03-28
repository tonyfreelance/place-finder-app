/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    twitter: {
      type: 'string'
    },
    displayName: {
      type: 'string'
    },
    going: {
      type: 'array'
    }

    // Add a reference to Places
    // places: {
    //   collection: 'place',
    //   via: 'owner'
    // }
  }
};
