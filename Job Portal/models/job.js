const mongoose = require("mongoose");
var schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema;

var jobSchema = new schema({
  title: {
    type: String,
    maxLength: 20,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    maxLength: 500,
    required: true,
    trim: true,
  },
  company: {
    type: String,
    maxLength: 50,
    required: true,
    trim: true,
  },
  jobID: {
    type: Number,
    unique: true,
    required: true,
  },
  status: {
    type: String,
    default: "OPEN",
  },
  vacancy: {
    type: Number,
    required: true,
  },
  recruiterID: {
    type: String,
    required: true,
    trim: true,
  },

  //to view who all have applied for the job
  applicants: [
    {
      candidateID: "",
      status: "",
    },
  ],
});

module.exports = mongoose.model("Job", jobSchema);
