var mongoose = require('mongoose')
  , registrySchema = new mongoose.Schema({
    name:String,
    desc:String,
    price:Number,
    img:{
        src:String,
        location:String,
        title:String
    }
  })
	, Registry = mongoose.model('Registry',registrySchema)
	, mediaSchema = new mongoose.Schema({
        src:String,
        location:String,
        title:String
  })
	, Media = mongoose.model('Media',mediaSchema)
	, photoSchema = new mongoose.Schema({
				src:String,
				location:String,
				title:String,
				subtitle:String
	})
	, Photo = mongoose.model('Photo',photoSchema);

mongoose.createConnection('mongodb://localhost/test');
module.exports = { //ALL_CAPS represent static values, lowercase_stuff are dynamically required resources
	mongoose: mongoose,
	Registry: Registry,
	Media: Media,
	Photo: Photo
};