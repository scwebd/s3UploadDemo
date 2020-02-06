const express = require("express");
const fileUpload = require("express-fileupload");
const AWS = require("aws-sdk");

const app = express();
const PORT = process.env.PORT || 3000;
const keys = require("./keys.js");

// creating s3 instance (to allow uploads)
const s3 = new AWS.S3({
    accessKeyId: keys.s3key,
    secretAccessKey: keys.s3secret
});


// middleware to parse/access files we uploaded from our HTML page; also gives us 'req.body'
app.use(fileUpload());
// middleware to serve up static assets
app.use(express.static("public"));


// post route to handle file upload
app.post("/upload", async (req, res) => {
    // Sending error back if no file was uploaded
    if (!req.files) {
        return res.status(400).send("No file was uploaded.");
    }

    // references the file uploaded from the input field with the 'name' attribute specified following 'req.files.'
    const uploadFile = req.files.upload;

    // setting up S3 upload parameters
    const params = {
        Body: uploadFile.data, // data from uploaded file
        Bucket: keys.s3bucket, // bucket name
        Key: `${Date.now()}-${uploadFile.name}` // file name to use for S3 bucket
    };

    // uploading file to the bucket
    s3.upload(params, (err, response) => {
        if (err) throw err;
    
        console.log(`File uploaded successfully at ${response.Location}`);
        // terminating the req/res cycle by sending a JSON object with the uploaded
        // file path AND any date sent along with the upload... this is where you 
        // could write to your db if needed, now that you have the url path for the
        // newly uploaded file!
        res.json({ url: response.Location, data: req.body });
    });
});


app.listen(PORT, () => {
    console.log(`App listening on http://localhost:${PORT}!`);
});
