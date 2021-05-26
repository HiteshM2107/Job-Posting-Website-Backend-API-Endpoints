# Job-Posting-Website-Backend-API-Endpoints
This repository contains several endpoints for a Job Posting Website. 

All the routes have been validated for input from the request body using express-validator

Dependencies used: 
{body-parser, cors, dotenv, express, express-validator, mongoose, nodemon}

To run this project, clone the repository, run npm i in the terminal, then npm start.

The description of the end points are as follows- 
<ul>

<li> 
<b>Candidate:</b>
<ul>
<li> Signup- <br /> <img src="https://github.com/HiteshM2107/Job-Posting-Website-Backend-API-Endpoints/blob/main/Job%20Portal/Postman%20Screenshots/Candidate%20signUp.PNG?raw=true" /></li>
<li> SingIn- <br /> <img src="https://github.com/HiteshM2107/Job-Posting-Website-Backend-API-Endpoints/blob/main/Job%20Portal/Postman%20Screenshots/Candidate%20SignIn.PNG" /></li>
<li> List all applied jobs and their status- <br/> <img src="https://github.com/HiteshM2107/Job-Posting-Website-Backend-API-Endpoints/blob/main/Job%20Portal/Postman%20Screenshots/Candidate%20listApplications.PNG" /></li>
<li> Apply to one or more jobs- <br /> <img src="https://github.com/HiteshM2107/Job-Posting-Website-Backend-API-Endpoints/blob/main/Job%20Portal/Postman%20Screenshots/Candidate%20applyJob.PNG" /></li>
<li> Delete a job application- <br /> <img src="https://github.com/HiteshM2107/Job-Posting-Website-Backend-API-Endpoints/blob/main/Job%20Portal/Postman%20Screenshots/Candidate%20deleteApplication.PNG" /></li>
<li> Logout- <br />  <img src="https://github.com/HiteshM2107/Job-Posting-Website-Backend-API-Endpoints/blob/main/Job%20Portal/Postman%20Screenshots/Candidate%20logout.PNG" /></li>
</ul>
</li>

<li> 
<b>Recruiter:</b>
<ul>
<li> Signup- <img src="https://github.com/HiteshM2107/Job-Posting-Website-Backend-API-Endpoints/blob/main/Job%20Portal/Postman%20Screenshots/Recruiter%20signUp.PNG" /></li>
<li> SingIn- <img src="https://github.com/HiteshM2107/Job-Posting-Website-Backend-API-Endpoints/blob/main/Job%20Portal/Postman%20Screenshots/Recruiter%20SignIn.PNG" /></li>
<li> Post a job- <img src="https://github.com/HiteshM2107/Job-Posting-Website-Backend-API-Endpoints/blob/main/Job%20Portal/Postman%20Screenshots/Recruiter%20postJob.PNG" /></li>
<li> List all candidates who applied to a job- <img src="https://github.com/HiteshM2107/Job-Posting-Website-Backend-API-Endpoints/blob/main/Job%20Portal/Postman%20Screenshots/Recruiter%20listApplicants.PNG" /></li>
<li> Accept a candidate's application for a job- <img src="https://github.com/HiteshM2107/Job-Posting-Website-Backend-API-Endpoints/blob/main/Job%20Portal/Postman%20Screenshots/Recruiter%20acceptApplication.PNG" /></li>
<li> Reject a candidate's application for a job- <img src="https://github.com/HiteshM2107/Job-Posting-Website-Backend-API-Endpoints/blob/main/Job%20Portal/Postman%20Screenshots/Recruiter%20rejectApplication.PNG" /></li>
</ul>
</li>

</ul>

The screenshots of the database have been attached and one of each- candidate, job and candidate have been shown for a clearer picture about the schema of the entities.
