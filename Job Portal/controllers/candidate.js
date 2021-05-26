const Candidate = require("../models/candidate");
const { check, validationResult } = require("express-validator");
const Job = require("../models/job");

exports.signUp = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }
  const candidate = new Candidate(req.body);
  candidate.save((err, candidate) => {
    if (err) {
      return res.status(400).json({
        err: "NOT able to save user in DB",
        msg: err,
      });
    } else {
      return res.json({
        name: candidate.name,
        email: candidate.email,
        id: candidate.id,
      });
    }
  });
};

exports.signIn = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }

  const { email, password } = req.body;

  Candidate.findOne({ email }, (err, candidate) => {
    if (err || !candidate) {
      return res.status(400).json({
        error: "Email does not exist",
      });
    } else {
      if (candidate.password === password) {
        return res.status(200).json({
          Message: "Successfully logged in",
          name: candidate.name,
          email: email,
        });
      } else {
        return res.status(400).json({
          err: "Incorrect Password",
        });
      }
    }
  });
};

exports.logout = (req, res) => {
  // we destroy the session here, i.e. remove the token from the storage of browser.
  return res.status(200).json({
    Message: "You have been logged out successfully.",
  });
};

exports.applyJob = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        error: errors.array()[0].msg,
      });
    }
    const candidateID = req.body.candidateID;
    const jobID = req.body.jobID;

    const isjobFound = await Job.findOne({ jobID: jobID });

    if (!isjobFound) {
      return res.status(400).json({ error: "Job doesn't exist" });
    }

    // to push the jobID into the application array of the candidate, for his use
    const isupdated = await Candidate.updateOne(
      {
        candidateID: candidateID,
      },
      { $push: { application: { jobID: jobID, status: "PENDING" } } }
    );

    //to push the candidateID into the applicants array of the job, for the use of recruiter
    const isApplied = await Job.updateOne(
      {
        jobID: jobID,
      },
      {
        $push: { applicants: { candidateID: candidateID, status: "PENDING" } },
      }
    );

    if (!isupdated || !isApplied) {
      return res.status(400).json({ error: "Couldn't apply" });
    }

    return res.status(200).json({ Message: "Applied sucessfully for the job" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.deleteApplication = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        error: errors.array()[0].msg,
      });
    }
    const candidateID = req.body.candidateID;
    const jobID = req.body.jobID;

    const isjobFound = await Job.findOne({ jobID: jobID });

    if (!isjobFound) {
      return res.status(400).json({ error: "Invalid jobID" });
    }

    const isupdated = await Candidate.updateOne(
      {
        candidateID: candidateID,
      },
      { $pull: { application: { jobID: jobID, status: "PENDING" } } }
    );

    if (!isupdated) {
      return res.status(400).json({ error: "Couldn't delete job application" });
    }

    return res
      .status(200)
      .json({ Message: "Application for the job deleted successfully." });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.listApplications = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }
  const candidateID = req.body.candidateID;
  const isCandFound = await Candidate.findOne({ candidateID: candidateID });
  if (!isCandFound) {
    return res
      .status(400)
      .json({ error: "Could not find candidate with the given candidateID" });
  }

  return res.json({
    "All applied jobs and their status": isCandFound.application,
  });
};
