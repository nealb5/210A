# Lab 6A - Web Penetration Testing

### Overview

In this lab, we will explore web penetration testing by utilizing an intentionally vulnerable website. You will be exposed to various web application vulnerabilities and will learn how to identify, exploit, and mitigate them.

### Functionality

- **Identify vulnerabilities**: Use tools to uncover common vulnerabilities such as SQL Injection, XSS, CSRF, and more.
- **Exploit vulnerabilities**: Execute attacks on the vulnerabilities to understand how they can be exploited.
- **Report and Mitigate**: Develop mitigation strategies and document the findings.

### Concepts

- Web Application Security
- SQL Injection
- Cross-Site Scripting (XSS)
- Cross-Site Request Forgery (CSRF)
- Secure coding practices

### Technologies

- Intentionally vulnerable website
- Penetration testing tools (e.g., Burp Suite, OWASP ZAP)
- Web browsers with developer tools

## Step 1: Setup and Configuration

1. Create `.env` file in your Docker directory using the following:
    ```
    # For Docker:
    MYSQL_SERVERNAME='mariadb'
    # For Live Server:
    # MYSQL_SERVERNAME='localhost'

    MYSQL_USER='developer'
    MYSQL_PASSWORD='password'
    MYSQL_ROOT_PASSWORD='password'
    MYSQL_DATABASE='lab_6'

    SESSION_SECRET='secret'

    JWT_SECRET='secret'

    PORT=3001

    ```
2. Navigate to your Docker directory and run
   ```sh
   
   docker-compose up -d
   ```
3. Go to `http://localhost:8080` to check out the front end!

### For Mac Users
If you are on Mac there is a high chance that another process is running on port 8080.
If `docker-compose up -d` has a conflict on port 8080 because it is already occupied, use a lab machine or do the following:

1. Check what process is running on port 8080 open a terminal and enter `lsof -i :8080`

1. Check to make sure that the process is not important. It likely is not. If something breaks after killing the process restart your computer. 

1. Kill the process using `sudo kill -9 <PID>`. 

1. Now check that there is nothing on the port `lsof -i :8080`. Now you should be able to use `docker-compose up -d`



## Step 2: Vulnerability Identification

### Overview

In this lab you will be finding, identifying, and analyzing vulnerabilities within the vulnerable website. Looking at the OWASP Top 10, you will be finding at least 3 different vulnerabilities. Some vulnerabilities will include the following:
  1. SQL Injection
  2. Cross-Site Scripting (XSS)
  3. Cross-Site Request Forgery (CSRF)
  4. Insecure Direct Object References
  5. Security Misconfiguration
  6. Broken Authentication
  7. Sensitive Data Exposure
  8. Insufficient Attack Protection
  9. Using Components with Known Vulnerabilities
  10. Invalidated Redirects and Forwards
  11. and more!

You may need to use tools such as Burp Suite, the browser inspect tool, hydra, and any other web penetration tool available to help you find these vulnerabilities. ***HOWEVER***, we have made this website so vulnerable that you may find vulnerabilities without much effort. But the tools will help you show and prove how they can be exploited. You will need to document your findings in the [pentest-report.md](./pentest-report.md) file.

> Note: This following is optional and not part of the pass-off but could be very helpful

### Burpsuite

An essential tool for web pen testing is BurpSuite. BurpSuite is a graphical tool that can be used for web application security testing. It can be used to intercept, modify, and replay web traffic. It can also be used to discover and exploit vulnerabilities. BurpSuite is available for download [here](https://portswigger.net/burp/communitydownload). There is also a free version available. 

There are many tutorials available online for BurpSuite. One of them is available on TryHackMe [here](https://tryhackme.com/room/burpsuitebasics).
> Note: If you choose to use Burpsuite, you will need to change the default port it runs on. We have a guide [here](./burpsuite-change-default-port.md).

### OWASP Juice Shop

A great way to get your feet wet and learn about web development is by using the OWASP Juice Shop, which the website was made after. [OWASP Juice Shop](https://github.com/juice-shop) is an intentionally vulnerable web application that can be used to learn about web application security. It is a Node.js application that can be run locally or deployed on a server. It is also available as a Docker image. In this lab, we will be using the Docker image.

Click [here](https://tryhackme.com/room/owaspjuiceshop) for the TryHackMe walkthrough of the OWASP Juice Shop tutorial.

Or you can download it from their [GitHub](https://github.com/juice-shop) and run it locally.

## Steps 3: Documentation

For the documentation, you will follow the following [example report](./pentest-report-example.md). The only thing missing from the example report that you will fill in are the images of you exploiting the vulnerability that you found. We give you a file named `pentest-report.md` that you will use to document your findings. You will need to document the following:

-  Overview of the lab
-  Executive summary
-  Test details
-  Findings:
     -  Description
     -  Exploitation
     -  Impact
     -  Mitigation
     -  Images
-  Recommendation
-  Conclusion

We give you an outline but it's your job to fill in the rest. All titles in the findings should be OWASP Top 10 related. You must show at least one snap-shot to show the vulnerability and one snap-shot showing one exploitation.

# Tips
- OWASP Juice Shop is an excellent way to learn

# Resources
  - [OWASP Top 10](https://owasp.org/www-project-top-ten/)
  - [OWASP Juice Shop Github](https://github.com/juice-shop/juice-shop)
  - [TryHackMe OWASP Juiceshop](https://tryhackme.com/room/owaspjuiceshop)
  - [TryHackMe Burp Suite Basics](https://tryhackme.com/room/burpsuitebasics)
  - [SQL Injection Payloads](https://github.com/payloadbox/sql-injection-payload-list)
  - [API Security Courses](https://www.apisecuniversity.com/)
  - [XSS Payloads](https://github.com/payloadbox/xss-payload-list?tab=readme-ov-file)

# Passoff

- [ ] 5 points - First commit is on or before Friday
- [ ] `README.md` provides proper documentation with each of the following
  - [ ] 5 points - Overview of the lab
  - [ ] 5 points - A simple executive summary
  - [ ] 10 points - Findings
    - [ ] Description
        - What is the vulnerability and where was it found? etc... Be sure to include at least one snap-shot of the vulnerability
    - [ ] Exploitation
        - How could an attacker exploit this vulnerability? One vulnerability could have multiple exploitations. For this exercise have at least one per vulnerability.
    - [ ] Impact
        - If an attacker were to exploit this vulnerability how badly would this affect the website, users, business, etc...
    - [ ] Mitigation
        - What could be done about this?! (Quick explanation. No need to actually fix the vulnerability yet)
    - [ ] Images (Include at least one in the description)
  - [ ] 5 points - Recommendation
  - [ ] 5 points - Conclusion
- [ ] 30 points - Find and document at least 3 different vulnerabilities.

****
