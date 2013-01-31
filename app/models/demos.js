
var mongoose = require('mongoose')
  , Schema = mongoose.Schema;

var DemoSchema = new Schema({
	  title: {type: String, default:'', trim: true}
	, questions: {type: Number, default: 0}
	, createdAt: {type: Date, default: Date.now}
});

mongoose.model('Demo', DemoSchema);