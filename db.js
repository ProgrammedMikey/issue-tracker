var mongoose = require( 'mongoose' );
var Schema   = mongoose.Schema;
 
var Ticket = new Schema({
    issue_title    : { type: String, required: true },
    issue_text    : { type: String, required: true },
    created_by    : { type: String, required: true },
    updated_on : { type: Date, default: new Date },
    created_on : Date,
    assigned_to    : String,
    open : Boolean,
    status_text    : String

});
 
mongoose.Promise = global.Promise;
mongoose.connect( process.env.DB );
module.exports = mongoose.model( 'Ticket', Ticket );