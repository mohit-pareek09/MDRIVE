const mongoose = require( 'mongoose')

const fileSchema = new mongoose.Schema({    

url: {
    type: String,
    required: true, // Cloudinary secure_url
  },
  public_id: {
    type: String,
    required: true,
    },
    
originalname : {
    type: String,
    required:[true,'originalname is required'],
},

resource_type: { 
    type: String, 
    required: true },
    
user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: [true,'user is required']

}
                        
                    })
                        
const fileModel = mongoose.model("file", fileSchema); //user model
module.exports = fileModel; //exporting user model
