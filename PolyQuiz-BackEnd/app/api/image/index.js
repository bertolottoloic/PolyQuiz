const { Router } = require('express')
const fs = require('fs') 
const formData = require('express-form-data');
const { addExtension } = require('./Manage')
const { deleteAttachedImg } = require("../Manage")
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, `${__dirname}/../../../assets/`)
    },
    filename: function (req, file, callback) {
      callback(null, file.fieldname+Date.now()+addExtension(file))
    }
  });

const upload = multer({storage: storage})

const manageAllErrors = require('../../utils/routes/error-management')

const router = new Router()

router.post('/', upload.single('photo'), (req, res) => {
    try{
      let date = Date.now();
      while( date == Date.now());
      res.status(200).json(req.file.filename);
    } catch(err) {
        manageAllErrors(err)
    }
})

router.delete('/:imageName', (req,res)=>{
  try {
    deleteAttachedImg(req.params.imageName)
    res.status(200).json(req.params.imageName+' has been deleted')
  } catch (error) {
    manageAllErrors(error)
  }
})

module.exports = router
