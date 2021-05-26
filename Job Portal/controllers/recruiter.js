const Recruiter = require("../models/recruiter");
const Job = require("../models/job");
const Candidate = require("../models/candidate");
const { check, validationResult } = require("express-validator");

exports.signUp = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }
  const recruiter = new Recruiter(req.body);
  recruiter.save((err, recruiter) => {
    if (err) {
      return res.status(400).json({
        err: "NOT able to save user in DB",
        msg: err,
      });
    } else {
      return res.json({
        name: recruiter.name,
        email: recruiter.email,
        id: recruiter.id,
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

  Recruiter.findOne({ email }, (err, recruiter) => {
    if (err || !recruiter) {
      return res.status(400).json({
        error: "Email does not exist",
      });
    } else {
      if (recruiter.password === password) {
        return res.status(200).json({
          Message: "Successfully logged in",
          name: recruiter.name,
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

exports.postJob = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }
  const job = new Job(req.body);
  const vacancy = req.body.vacancy;
  const jobID = req.body.jobID;
  const recruiterID = job.recruiterID;
  await job.save((err, job) => {
    if (err) {
      return res.status(400).json({
        err: "NOT able to save job in DB",
        msg: err,
      });
    }
  });

  try {
    const isupdated = await Recruiter.updateOne(
      { recruiterID: recruiterID },
      {
        $push: {
          jobs: { jobID: jobID, status: "OPEN", vacancy: vacancy },
        },
      }
    );

    if (!isupdated) {
      return res.status(400).json({
        Message: "Could not add job into recruiters details",
      });
    }
    return res.status(200).json({
      Message: "Job added successfully",
      Details: job,
    });
  } catch (err) {
    return res.status(400).json({
      Message: "Could not add the job",
      err: err,
    });
  }
};

exports.listApplicants = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        error: errors.array()[0].msg,
      });
    }
    const jobID = req.body.jobID;
    const isFound = await Job.findOne({ jobID: jobID });

    if (!isFound) {
      return res.status(400).json({ error: "Invalid jobID" });
    }
    return res.status(200).json({
      "List of applicants": isFound.applicants,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.acceptApplication = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        error: errors.array()[0].msg,
      });
    }
    const recruiterID = req.body.recruiterID;
    const jobID = req.body.jobID;
    const candidateID = req.body.candidateID;

    const isFound = await Recruiter.findOne({ recruiterID: recruiterID });

    if (!isFound) {
      return res.status(400).json({ error: "Recruiter doesn't exist" });
    }

    const isUpdatedR = await Recruiter.updateOne(
      {
        recruiterID: recruiterID,
      },
      {
        $push: {
          acceptedCandidates: {
            jobID: jobID,
            candidateID: candidateID,
            status: "ACCEPTED",
          },
        },
      }
    );

    if (!isUpdatedR) {
      return res.status(400).json({
        error: "Failed to Accept Application",
      });
    }
    return res.status(200).json({
      Message: "Application successfully accepted",
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.rejectApplication = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        error: errors.array()[0].msg,
      });
    }
    const recruiterID = req.body.recruiterID;
    const jobID = req.body.jobID;
    const candidateID = req.body.candidateID;

    const isFound = await Recruiter.findOne({ recruiterID: recruiterID });

    if (!isFound) {
      return res.status(400).json({ error: "Recruiter doesn't exist" });
    }

    const isUpdatedR = await Recruiter.updateOne(
      {
        recruiterID: recruiterID,
      },
      {
        $push: {
          acceptedCandidates: {
            jobID: jobID,
            candidateID: candidateID,
            status: "REJECTED",
          },
        },
      }
    );

    if (!isUpdatedR) {
      return res.status(400).json({
        error: "Failed to Reject Application",
      });
    }
    return res.status(200).json({
      Message: "Application successfully rejected",
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
