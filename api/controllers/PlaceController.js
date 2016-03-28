/**
 * PlaceController
 *
 * @description :: Server-side logic for managing places
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    _config: {
        actions: false,
        shortcuts: false,
        rest: false
    },

    countGoing: function(req, res) {
        var fourSquareId = req.query.fourSquareId;

        Place
            .findOne({
                fourSquareId: fourSquareId
            })
            .exec(function(err, result) {
                if (err) return res.negotiate(err);
                if (!result) {
                    sails.log('No attender');
                    return res.send({attenderNo: 0});
                }
                else {
                    sails.log('Found attender: ' + result.userId.length);
                    return res.send({attenderNo: result.userId.length});
                }
            });
    },

    myGoing: function(req, res) {
        var fourSquareId = req.query.fourSquareId;
        var userId = req.query.userId;
        // var userId = '56f38bc18ee7018c04fcbf1b';
        var userIdArray = [];

        Place
            .findOne({
                fourSquareId: fourSquareId
            })
            .exec(function(err, result) {
                if (err)
                    return res.negotiate(err);
                // If not found then create a new place document
                if (!result) {
                    // push user to user array
                    userIdArray.push(userId);

                    var newPlace = {
                        fourSquareId: fourSquareId,
                        userId: userIdArray
                    };

                    Place
                        .create(newPlace)
                        .exec(function(err, result) {
                            if (err)
                                return res.negotiate(err);
                            sails.log('New place:')
                            sails.log(result.userId.length);
                            return res.send({attenderNo: result.userId.length});
                        });
                }
                // If found then continue processing
                else {
                    userIdArray = result.userId;
                    var index = userIdArray.indexOf(userId);

                    // Case 1: If user hasn't attended the place yet, then...
                    if (index === -1) {
                        // ... push userId to array
                        userIdArray.push(userId);

                        Place
                            .update({
                                fourSquareId: fourSquareId
                            }, {
                                userId: userIdArray
                            })
                            .exec(function(err, result) {
                                if (err)
                                    return res.negotiate(err);
                                sails.log('Attending:');
                                sails.log(result[0].userId.length);
                                return res.send({attenderNo: result[0].userId.length});
                            });
                    }
                    // Case 2: If user did attend the place, then...
                    else {
                        // .... Remove the userId from aray
                        userIdArray.splice(index, 1);

                        Place
                            .update({
                                fourSquareId: fourSquareId
                            }, {
                                userId: userIdArray
                            })
                            .exec(function(err, result) {
                                if (err)
                                    return res.negotiate(err);
                                sails.log('Not attend anymore:');
                                sails.log(result[0].userId.length);
                                return res.send({attenderNo: result[0].userId.length});
                            });
                    }
                }
            });
    }
};
