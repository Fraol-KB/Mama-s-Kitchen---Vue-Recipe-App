'use strict';
var fs = require('fs');
var formidable = require('formidable');


module.exports = function (Recipe) {
  Recipe.uploadImage = function (req, cb) {
    
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
      console.log("file paths : ", fields)
      // fs.writeFile('../../client/view/profilePic/'+files.file.name,'file');
      var oldpath = files.file.path;
      
      var newpath = './client/public/assets/' +fields.name;
      console.log("new Name : ",newpath)

      fs.rename(oldpath, newpath, function (err) {
        if (err){
          cb(null, 'file not uploaded');
        }else{
        cb(null, {
          'done':true,
        'name':fields.name
      });
        }
      });
    });
    
  }
  Recipe.remoteMethod(
    'uploadImage', {
      accepts: {
        arg: 'req',
        type: 'object',
        'http': {
          source: 'req'
        }
      },
      returns: {
        arg: "response",
        type: 'object'
      },
      http: {
        path: '/uploadImage',
        verb: 'post'
      }

    }
  );

};
