/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';
var Ticket = require( '../db' );

var expect = require('chai').expect;
var MongoClient = require('mongodb');
var ObjectId = require('mongodb').ObjectID;
var util = require('util');
var _ = require('lodash');

// const CONNECTION_STRING = process.env.DB; //MongoClient.connect(CONNECTION_STRING, function(err, db) {});

module.exports = function (app) {

  app.route('/api/issues/:project')
  
    .get(function (req, res){
      var project = req.params.project;
    
    // console.log(project);
    
    
//     var query = {
//     query: req.query
// };
//     if (obj.action) {
//     query.action = obj.action;
// }
    
    Ticket.find(req.query)
    .exec(function(err, ticket) {
      if (err) {
        console.log(err);
        res.send("error")
      } else {
        console.log(ticket);
        res.send(ticket)
      }
    })
      
    })
    
  
    .post(function (req, res){
      var project = req.params.project;
    
    
    var newTicket = new Ticket();
    
    newTicket.issue_title = req.body.issue_title;  
    newTicket.issue_text = req.body.issue_text;  
    newTicket.created_by = req.body.created_by;  
    newTicket.created_on = new Date;
    newTicket.assigned_to = req.body.assigned_to || "";  
    newTicket.open = true;  
    newTicket.status_text = req.body.status_text || "";
    
    newTicket.save(function(err, ticket) {
      if (err) {
        // console.log(err);
        res.send("missing inputs")
      } else {
        // console.log(ticket);
        res.send(ticket)
      }
    });
    
    
      
    })
    
  
    .put(function (req, res){
      var project = req.params.project;

        const out = {};
    _(req.body).forEach((value,key) => {
      
        if (!_.isEmpty(value)){
            out[key] = value;
        }
    });
    delete out._id
    
    if (_.isEmpty(out)){
            res.send('no updated field sent');
        }
    
    

    //     console.log(out);
    // console.log(req.body._id);
    
    req.bodyNotEmpty = out;

    Ticket.findOneAndUpdate({
      _id: req.body._id
    }, 
       {$set: req.bodyNotEmpty}, 
                           {upsert: true, 'new': true, 'setDefaultsOnInsert': true}, 
                           function(err, newTicket) {
      if (err) {
        console.log(err);
        res.send('could not update ' +req.body._id)
      } else {
        console.log(newTicket);
        res.send('successfully updated');
      }
    })
      
    })
    
  
    .delete(function (req, res){
      var project = req.params.project;
    
    console.log(req.body._id);
    
    if (_.isEmpty(req.body._id)){
            res.send('_id error')
        }
    
    Ticket.findOneAndRemove({
      _id: req.body._id
    }, function(err, ticket){
      if(err) {
        console.log(err);
        res.send('could not delete '+req.body._id)
      } else {
        console.log(ticket);
        res.send('deleted '+ req.body._id);
      }
    })
      
    });
    
};
