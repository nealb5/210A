
---

# Lab 6B - Fixing a Vulnerable App

## Overview

After identifying vulnerabilities in Lab 6A, it's time to roll up your sleeves and fix them! This lab focuses on applying secure coding practices to mend the vulnerabilities found in the intentionally vulnerable web application. We'll be giving you the source code to fix a few of the websites vulnerabilities.

### Functionality

- **Vulnerability Assessment**: Revisit the vulnerabilities found in Lab 6A or new ones that you find within the code.
- **Code Review**: Analyze the codebase to pinpoint the sources of the vulnerabilities.
- **Remediation Implementation**: Modify the application code to fix the vulnerabilities.
- **Testing**: Ensure that the vulnerabilities have been addressed without introducing new issues.

### Concepts

- Secure Coding Principles
- Web Application Architecture
- Vulnerability Remediation Strategies
- Regression Testing

### Resources

- Secure Coding Guidelines
- Web browsers with developer tools

### Assignments

Students are required to fix at least three vulnerabilities discovered during Lab 6A or newly found while analyzing the source code.

## Instructions

### Step 1: Setup the backend

Run the following: 

```bash
npm i

docker-compose up -d
```

#### **Note:** You may need to run this in powershell

> Make sure that your Docker-desktop is up if the command above doesn't work

### Step 2: Import the database if not done already:

go to `http://localhost:8081`

login with `developer` and `password`

go to import database

You will find the database within `Backend/model/lab_6.sql`

go to the very bottom and click `go`

### Step 3: Set up the frontend

Run the following

```
npm i 
npm run serve
```

#### **Note:** You may need to run this in powershell

Frontend should be running on `http://localhost:8080`

### Step 4: Remediation

You have found at least three vulnerabilities from the web application. It is now your choice to either fix those vulnerabilities or find new ones within the code. But remember you must show how the vulnerability was fixed and prove that the patch that you implemented works.

In the [example write-up](instructions/example-writeup.md) we show how to fix three fictitious vulnerabilities. You can use this as a template for your write-up.

> You will have to research how to fix your own vulnerabilities that you have found.

---

### Step 5: Documentation

In this step, you'll be documenting your findings and fixes in a report format. Follow the guidelines below to structure your write-up according to the example provided.

1. **Report Header**:
   - Begin with a title, such as "Vulnerability Remediation Write-Up."
   - Include your name and the current date.

2. **For Each Vulnerability Addressed**:
   - **Vulnerability Title**: Clearly label each vulnerability at the beginning of its section.
   
   - **Initial Vulnerability**:
     - Write a brief description explaining the nature of the vulnerability and where it was located in the application.
   
   - **Code Comparison**:
     - **Old Code**: Present the code segment that contained the vulnerability. This gives context to what was insecure.
     - **New Code**: Provide the modified code that has the vulnerability patched or remediated.
     
   - **Remediation**:
     - Explain the changes made in detail. This is where you describe why the old code was vulnerable and how the changes you made have secured it.
     - Discuss the secure coding principles or techniques applied to fix the vulnerability.

3. **Testing Evidence**:
   - Describe how you tested each fix to validate that the vulnerability was addressed correctly. This could include:
     - Specific actions you took.
     - Results you expected vs. what you observed.
     - Screenshots or logs.

4. **Conclusion**:
   - Sum up your findings and reflect on the overall experience.
   - Mention any challenges faced and insights gained from the exercise.

5. **Formatting**:
   - Ensure the report is clearly structured and free of grammatical errors.
   - Use headers, bullet points, and code blocks for clarity and readability.

---

## Lab 6B Passoff

Go to the [rubric](./instructions/rubric.md) for passoff (Read in preview mode)

## Extra Credit

> Note: TAs cannot help you with extra credit!

- [ ] **15 Points** - Implement a Content Security Policy (CSP) header to mitigate potential future XSS attacks.

---

