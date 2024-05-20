const express = require('express');
const app = express();
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'upload/')
    },
    filename: function(req, file, cb){
        console.log(file)
        cb(null, file.originalname)
    }
})

// Simple upload
// const upload= multer({dest:'upload/'}) 
// will return file as buffer for s3

const upload= multer(storage)
app.get('./', (req, res) => { 
    res.send('Hello World');
})

app.post('/api/upload', upload.single('file'), (req, res) =>{
    res.json(req.file);
})
const port = process.env.PORT || 3000

app.listen(port, ()=>{
    console.log('Listening on port:', port)
})