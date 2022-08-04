const fs = require('fs')

function readJSON (filePath, callback) {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      return callback(err)
    }

    console.log('fliepath:- ' + filePath);
    try {
    //   callback(null, JSON.parse(data))
    callback(null, JSON.parse(data))
    } catch (ex) {
      callback(ex)
    }
  })
}

readJSON('./package.json', (err, pkg) => { console.log(err, pkg) })
