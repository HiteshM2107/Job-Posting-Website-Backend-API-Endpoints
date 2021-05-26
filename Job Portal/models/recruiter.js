const mongoose = require("mongoose");
var schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema;
var recuiterSchema = new schema({
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
  company: {
    type: String,
    required: true,
    maxLength: 20,
    trim: true,
  },
  recruiterID: {
    type: String,
    required: true,
    unique: true,
  },
  // to post jobs
  jobs: [
    {
      jobID: "",
      vacancy: "",
      status: "",
    },
  ],
  acceptedCandidates: [
    {
      jobID: "",
      candidateID: "",
      status: "", //accepted or rejected by recruiter
    },
  ],
});

module.exports = mongoose.model("Recruiter", recuiterSchema);
