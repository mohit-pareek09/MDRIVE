const express = require("express");
const router = express.Router();
const multer = require('multer');
const cloudinary = require('../config/cloudinary.config');
const fileModel = require("../models/file.model");
const { utils } = require('cloudinary'); // Import Cloudinary utils for signed URL generation

const authmiddleware = require("../middlewares/authe"); // Import the auth middleware

const upload = multer({ storage: multer.memoryStorage() });
router.get("/", (req, res) => {
    res.render("about");
})  

router.get("/home",authmiddleware,async (req, res) => {

  const userFiles = await fileModel.find({ user: req.user.id }) // Find files associated with the logged-in user
  console.log(userFiles);

  
    res.render("home",{
      files: userFiles, // Pass the files to the view
      user: {
        name: req.user.username || 'User', // Adjust based on your user model
        email: req.user.email || 'No email'
      }
    })
})

// console.log(req.user);


// Download route
router.get('/download/:public_id', authmiddleware, async (req, res) => {

  try {
    const { public_id } = req.params;
    const file = await fileModel.findOne({ public_id, user: req.user.id });

    if (!file) {
      return res.status(404).json({ error: 'File not found or access denied' });
    }

   // Generate a signed URL for the file
   const expires = Math.floor((Date.now() + 60 * 60 * 1000) / 1000); // Expire in 1 hour (Unix timestamp in seconds)
   const signature = utils.api_sign_request(
     { public_id, expires },
     cloudinary.config().api_secret
   );


// Determine resource type based on file extension
let resourceType;
const extension = file.originalname.split('.').pop().toLowerCase();
if (['png', 'jpg', 'jpeg', 'gif', 'bmp'].includes(extension)) {
  resourceType = 'image';
} else if (['pdf', 'doc', 'docx', 'txt'].includes(extension)) {
  resourceType = 'raw';
} else {
  resourceType = 'raw'; // Default to raw for unknown types
}

const signedUrl = `https://res.cloudinary.com/${cloudinary.config().cloud_name}/${resourceType}/upload/v1/${public_id}?expires=${expires}&signature=${signature}`;
   
   console.log('Generated signed URL:', signedUrl); // Log signed URL for debugging
   // Redirect to the signed URL for download
   res.redirect(signedUrl);
 } catch (error) {
   console.error('Error generating signed URL or downloading file:', error);
   res.status(500).json({ error: 'Failed to download file' });

 }
});


router.post('/upload',authmiddleware, upload.single('file'), async (req, res) => {
    try {
      // Check if a file was uploaded
      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }
  
      // Determine resource type based on file extension
      const extension = req.file.originalname.split('.').pop().toLowerCase();
      const resourceType = ['pdf', 'doc', 'docx', 'txt'].includes(extension) ? 'raw' : 'auto';

      // Upload the file buffer to Cloudinary
      const result = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: 'my_app', // Optional: specify a folder in Cloudinary
            resource_type: resourceType // Detect file type (image, video, etc.)
          },
          (error, result) => {
            if (error) {
              return reject(error);
            }
            resolve(result);
          }
        );
        uploadStream.end(req.file.buffer); // Pass the file buffer to Cloudinary
      });
  
      // Return the secure URL and other details
      const newFile = await fileModel.create({      // Enter data into user model.

        url: result.secure_url, // Store Cloudinary URL instead of req.file.path
        public_id: result.public_id,
        originalname: req.file.originalname,
        resource_type: result.resource_type,
        user: req.user.id, // Assuming you have the user ID from the auth middleware

    })

      //  res.json(newFile);
      res.redirect("/home") // Redirect to home after successful upload


    } catch (error) {
      console.error('Error uploading file to Cloudinary:', error);
      res.status(500).json({ error: 'Failed to upload file' });
    }
  });

module.exports = router;