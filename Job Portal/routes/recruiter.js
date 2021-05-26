var express = require("express");
var router = express.Router();
const { check, validationResult } = require("express-validator");

const {
  signUp,
  signIn,
  postJob,
  listApplicants,
  acceptApplication,
  rejectApplication,
} = require("../controllers/recruiter");

router.post(
  "/signUp",
  [
    check("name")
      .isLength({ min: 3 })
      .withMessage("Name should be atleast 3 characters"),
    check("email").isEmail().withMessage("Email is invalid"),
    check("password")
      .isLength({
        min: 5,
      })
      .withMessage("Password should be atleast 5 characters"),
    check("company").isLength({ min: 1 }).withMessage("Company is mandatory"),
    check("recruiterID")
      .isLength({ min: 1 })
      .withMessage("Recruiter ID is compulsary"),
  ],
  signUp
);

router.post(
  "/signIn",
  [
    check("email").isEmail().withMessage("Email is invalid"),
    check("password")
      .isLength({
        min: 1,
      })
      .withMessage("Password is mandatory"),
  ],
  signIn
);

router.post(
  "/postJob",
  [
    check("title")
      .isLength({ min: 4 })
      .withMessage("Title should be atleast 4 characters long"),
    check("description")
      .isLength({ min: 10 })
      .withMessage("description should be atleast 100 characters long"),
    check("company")
      .isLength({ min: 4 })
      .withMessage("company should be atleast 4 characters long"),
    check("jobID").isLength({ min: 1 }).withMessage("jobID is mandatory"),
    check("vacancy")
      .isLength({ min: 1 })
      .withMessage("vacancy number is mandatory"),
    check("recruiterID")
      .isLength({ min: 1 })
      .withMessage("Recruiter ID is mandatory"),
  ],
  postJob
);

router.get(
  "/listApplicants",
  [check("jobID").isLength({ min: 1 }).withMessage("JobID is mandatory")],
  listApplicants
);

router.post(
  "/acceptApplication",
  [
    check("candidateID")
      .isLength({ min: 1 })
      .withMessage("CandidateID is mandatory"),
    check("recruiterID")
      .isLength({ min: 1 })
      .withMessage("RecruiterID is mandatory"),
    check("jobID").isLength({ min: 1 }).withMessage("JobID is mandatory"),
  ],
  acceptApplication
);

router.post(
  "/rejectApplication",
  [
    check("candidateID")
      .isLength({ min: 1 })
      .withMessage("CandidateID is mandatory"),
    check("recruiterID")
      .isLength({ min: 1 })
      .withMessage("RecruiterID is mandatory"),
    check("jobID").isLength({ min: 1 }).withMessage("JobID is mandatory"),
  ],
  rejectApplication
);

module.exports = router;
