const mongoose = require("mongoose");
var schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema;
var candidateSchema = new schema({
  name: {
    type: String,
    required: true,
    maxLength: 50,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  skills: {
    type: String,
    required: true,
    maxLength: 300,
    trim: true,
  },
  candidateID: {
    type: String,
    required: true,
    unique: true,
  },

  // to view his applications
  application: [
    {
      jobID: "",
      status: "",
    },
  ],
});

module.exports = mongoose.model("Candidate", candidateSchema);
