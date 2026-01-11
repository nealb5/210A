// Import mongoose package
const mongoose = require('mongoose');

// Use mongoose's connect method to create a connection to the database
mongoose.connect(process.env.ATLAS_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connection successful'))
.catch((err) => console.error('MongoDB connection error: ', err));


// Error handling
var db = mongoose.connection; // this is written assuming you imported the mongoose package as mongoose
db.on('error', error => console.error(error.message));
// Callback function
db.once('open', function() {
  // We're connected!
  console.log("MongoDB connected!")
});
