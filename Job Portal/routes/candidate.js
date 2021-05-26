var express = require("express");
var router = express.Router();
const { check, validationResult } = require("express-validator");
const {
  signUp,
  signIn,
  logout,
  applyJob,
  deleteApplication,
  listApplications,
} = require("../controllers/candidate");

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
    check("skills")
      .isLength({ min: 1 })
      .withMessage("Skills field is mandatory"),
    check("candidateID")
      .isLength({ min: 1 })
      .withMessage("Candidate ID is compulsary"),
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
  "/applyJob",
  [
    check("candidateID")
      .isLength({ min: 1 })
      .withMessage("CandidateID is mandatory"),
    check("jobID").isLength({ min: 1 }).withMessage("JobID is mandatory"),
  ],
  applyJob
);

router.post(
  "/deleteApplication",
  [
    check("candidateID")
      .isLength({ min: 1 })
      .withMessage("CandidateID is mandatory"),
    check("jobID").isLength({ min: 1 }).withMessage("JobID is mandatory"),
  ],
  deleteApplication
);

router.get(
  "/listApplications",
  [
    check("candidateID")
      .isLength({ min: 1 })
      .withMessage("CandidateID is mandatory"),
  ],
  listApplications
);

router.post("/logout", logout);

module.exports = router;
