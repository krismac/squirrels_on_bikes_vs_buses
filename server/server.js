const express = require('express');
const app = express();


app.listen(3000, function() {
  console.log(`Listening on port ${ this.address().port }`);
});
