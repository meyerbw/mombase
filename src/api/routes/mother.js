var motherService = require('../services/motherService');


/**
 * Create route
 */
exports.create = function( req, res ){
  var body = req.body;

  motherService.save( body, function( err, mother ) {
    if ( err ) return res.send( 500, 'failure');

    res.send(mother);
  });
};

exports.get = function( req, res ) {
  var body = req.params;
  motherService.get( body.id, function( err, mother ) {
    if ( err ) { return res.set( 500 ).send( ); }
    res.send(mother);
  });
};

/**
 * Delete route
 */
exports.del = function(req, res){
  var body = req.body;
  motherService.delete(body.id, function(err, result) {
    if ( err ) return res.set( 500 ).send( );
    res.send('success');
  });
};

/**
 * Search route
 */
exports.search = function(req, res) {
  var body = req.body;
  var i;

  var filter = { };
  var filterKeys = [ 'firstName', 'lastName' ];
  for ( i = filterKeys.length; i--; ) {
    if ( body[ 'filter.' + filterKeys[ i ] ] ) {
      filter [ filterKeys[ i ] ] = body[ 'filter.' + filterKeys[ i ] ];
    }
  }

  var sort = { };
  var sortKeys = [ 'firstName', 'lastName' ];
  for ( i = sortKeys.length; i--; ) {
    if ( body[ 'sort.' + sortKeys[ i ] ] ) {
      sort [ sortKeys[ i ] ] = body[ 'sort.' + sortKeys[ i ] ];
    }
  }

  motherService.all(filter, sort, body.offset, body.take, function(err, result) {
    if ( err ) return res.set( 500 ).send( );
    res.send(result);
  });
}

/**
 * Update route
 */
exports.update = function(req, res){
  var body = req.body;
  motherService.update(body, function(err, result) {
    if ( err ) { return res.send( 500, 'failure'); }
    res.send(result);
  });
};

/**
 * Assign Volunteer
 */
exports.assignVolunteer = function(req, res){
  var routeParams = req.params;
  var queryParams = req.query;
  motherService.assignVolunteer(routeParams.id, queryParams.volunteerEmail, function(err, result) {
    if ( err ) { return res.send( 500, 'failure'); }
    res.send(result);
  });
};

/**
 * Assign Volunteer
 */
exports.unassignVolunteer = function(req, res){
  var routeParams = req.params;
  var queryParams = req.query;
  motherService.unassignVolunteer(routeParams.id, queryParams.volunteerEmail, function(err, result) {
    if ( err ) { return res.send( 500, 'failure'); }
    res.send(result);
  });
}
