
---

### example-writeup.md

---

**Vulnerability Remediation Write-Up**

**Author**: John Doe  
**Date**: August 16, 2023  

---

## Vulnerability Details

---

### 1. Insecure Direct Object References (IDOR)

**Initial Vulnerability**:
Upon inspecting the app's API endpoints, there was a clear misuse of direct references to internal objects. By changing a user's ID in the URL, it was possible to access and modify other users' data.

**Code Comparison**:
- **Old Code**:
  ```javascript
  app.get('/user/:id', function(req, res) {
    let id = req.params.id;
    database.getUser(id);
  });
  ```

- **New Code**:
  ```javascript
  app.get('/user/:id', function(req, res) {
    let id = req.params.id;
    let sessionUserId = req.session.userId;

    if(id !== sessionUserId) {
      res.status(403).send('Unauthorized access');
    } else {
      database.getUser(id);
    }
  });
  ```

**Remediation**:
By checking if the ID in the URL matches the session's user ID, unauthorized access to other user data is now prevented.

---

### 2. Plain Text Passwords

**Initial Vulnerability**:
Passwords were stored in the database as plain text, making them susceptible to theft if the database is ever compromised.

**Code Comparison**:
- **Old Code**:
  ```javascript
  const password = req.body.password;
  database.storePassword(password);
  ```

- **New Code**:
  ```javascript
  const bcrypt = require('bcrypt');
  const saltRounds = 10;

  bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
    database.storePassword(hash);
  });
  ```

**Remediation**:
Passwords are now being hashed using bcrypt before they're stored in the database, ensuring their confidentiality even if the database is compromised.

---

### 3. Open Redirects

**Initial Vulnerability**:
The application didn't validate or sanitize the URL before redirecting users, leading to potential phishing attacks.

**Code Comparison**:
- **Old Code**:
  ```javascript
  app.get('/redirect', function(req, res) {
    const redirectTo = req.query.url;
    res.redirect(redirectTo);
  });
  ```

- **New Code**:
  ```javascript
  app.get('/redirect', function(req, res) {
    const redirectTo = req.query.url;
    if(validURLs.includes(redirectTo)) {
      res.redirect(redirectTo);
    } else {
      res.status(400).send('Invalid URL');
    }
  });
  ```

**Remediation**:
The application now checks if the provided URL is in a list of valid URLs before redirecting. If it isn't, it sends an error response.

---

## Testing Evidence

For each vulnerability, a series of tests were executed to ensure that the flaws were properly addressed:

- **IDOR (Insecure Direct Ojbect References)**: Tried accessing different user data by altering the URL's ID. Received a '403 Unauthorized access' response.

[Screenshot](./ScreenShot.png)

- **Plain Text Passwords**: Upon registration of a new user, verified in the database that the passwords were hashed and not in plain text.

[Screenshot](./ScreenShot.png)


- **Open Redirects**: Tested redirection with both valid and invalid URLs. Invalid URLs resulted in a '400 Bad Request' response.

[Screenshot](./ScreenShot.png)

---

## Conclusion & Reflection

These vulnerabilities showcased the importance of thoroughly vetting applications for potential security flaws. The initial oversights were significant, but through methodical testing and remediation, the application's security was greatly enhanced. This exercise emphasized the need to be proactive rather than reactive when it comes to security.

During the remediation process, I faced challenges, especially when addressing the IDOR vulnerability. Initially, I considered using a token-based approach but realized checking against the session was more straightforward and equally effective. This exercise was an invaluable learning experience.

--- 
