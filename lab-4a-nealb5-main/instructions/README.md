# Lab 4A—JavaScript and Unit Testing

## Overview

We'll soon be building a web API (**A**pplication **U**ser **I**nterface) for our task list. As we build it, and if we need to make changes to it, it will be important to know when it is working properly. Humans are prone to errors, so only thorough rote tests or a great deal of luck would ensure that our API will work the way we need it to.

Enter Unit Testing.

### Functionality

- JavaScript program built with Node.js which tests all endpoints of an API

### Concepts

- Node.js
- JavaScript
- Unit Testing
    - Test cases
    - Test-driven development

### Resources

- [JavaScript MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [Node.js official website](https://nodejs.org/en)
- [Jest official website](https://jestjs.io/)
- [Jest documentation](https://jestjs.io/docs/getting-started)
- [Absolute Beginner's Guide to Using npm](https://nodesource.com/blog/an-absolute-beginners-guide-to-using-npm/)

## Instructions

Unit testing, when done right, gives an excellent benchmark as to how close you are to a finished product. Each test that fails tells you exactly what needs to be fixed, and each test that passes gives a terrific sense of accomplishment and is a tangible step toward the end. As you build and modify your API, you will know exactly when you break something, as you inevitably will.

For now, we will scaffold many unit tests, and write them such that they pass when testing our fully-functional APIs, and fail at the right times on our faulty APIs. Both kinds will be provided for you.

### Step 1: Install

#### Open CallAPI
[CallAPI](https://restspace.dicax.org/c/callapi) is a great, free tool that helps with developing and testing APIs. Due to the nature of an API not having a UI, it's difficult to test endpoints. You can use a web browser for `GET` requests, but not for `POST`, `PUT`, or `DELETE` requests.

> Note: Another helpful tool that is used in the industry is an application called `Postman`. Postman is used to develop and test APIs. For this lab we will be using CallAPI, but feel free to test out postman!

#### Install Node.js

Go to the [Node.js downloads page](https://nodejs.org/en/download/) and install Node.js on your development machine. At that URL, you will see two options, LTS or Current. LTS stands for "Long Term Support", meaning that the LTS version of Node is the most recent **stable** version being supported. Choose the LTS version to download.

* Once you think it's installed, you can type `node --version` into a command prompt
* If it's installed, it will return the version, otherwise it will say it doesn't recognize the command
* If you still can't run the command, make sure that you have the Environment Variable set up
    * You can look at [this guide](https://helpdeskgeek.com/windows-10/add-windows-path-environment-variable/) for help

> Note: For Windows users, you'll need to run `node` from a PowerShell terminal, *not* through WSL.

#### Use the Template

Clone the Lab-4A repo that you accepted from Learning Suite onto your computer and open it in VSCode.

> Note: Before moving on, double check that you have a `.gitignore` file in the lab folder. Make sure there's a line in it that says `node_modules`. This file will tell Git that you don't want to commit anything in the `node_modules` folder, which gets [very](https://i.redd.it/j1ulcud873b31.png), [very](https://img.devrant.com/devrant/rant/r_1546733_HyZ3h.jpg), [very](https://img.devrant.com/devrant/rant/r_1030841_w7Mq9.jpg), [very large](https://i.redd.it/tfugj4n3l6ez.png).

#### Initialize your project and install Jest

1. Open a shell/command prompt to your project directory and run the following command:
    ```sh
    npm init
    ```

This will prompt you for input to fill out some basic information for your project. You can leave everything as the default value (just press ENTER), except for two things: `entry point`, which should be set as `api.js`, and `test command`, which should be set as `jest --verbose`. After you've completed all the prompts, you should see a file named `package.json` appear in your directory.

Next, we'll need to install [Jest](https://jestjs.io/). Jest is a JavaScript testing framework that provides an easy way to write unit tests.

2. Run this command in the same shell as before:
    ```sh
    npm i jest --save
    ```
    > Note: the `--save` flag adds the jest package to the list of dependencies in your `package.json` file. That way, if someone else wants to use your project, they can just run `npm i` to install all the required packages.

### Step 2: Write the Methods

1. Know the endpoints you are testing: 

    | HTTP Method | Endpoint                 | Expected Response   | Headers             | Body      |
    |-------------|--------------------------|---------------------|---------------------|-----------|
    | GET         | `api/v1/auth/google`     | Google Login page   | none                | none      |
    | POST        | `api/v1/tasks`           | New created task    | Content-Type, Cookie | Text, Date |
    | GET         | `api/v1/tasks`           | List of tasks       | Cookie              | none      |
    | GET         | `api/v1/tasks/[task_id]` | Single task         | Cookie              | none      |
    | PUT         | `api/v1/tasks/[task_id]` | Updated task        | Content-Type, Cookie | Done      |
    | DELETE      | `api/v1/tasks/[task_id]` | Confirm delete task | Cookie              | none      |
    | GET         | `api/v1/user`            | Logged in user info | Cookie              | none      |

1. Open the file called `api.js`

    > Note: This file is [provided for you](../api.js). Follow along with it and make sure everything is added properly.

1.  A class called `API` has been made for you with the following methods: `constructor`, `createTask`, `readAllTasks`, `readTask`, `updateTask`, `deleteTask`, and `readCurrentUser`. The `constructor` and `createTask` methods have been fully implemented for your reference.

1. Read over the `createTask` method and make sure you understand what each line of code does.

1. For each of the other unimplemented methods, do the following:

    1. Define the URL for that particular CRUD operation
    
    1. Define any data payloads and headers you need

    1. Make a request, and return its response

1. At the bottom of the file (outside the `API` class definition), write some code to test the methods you just implemented with some test data.
    > Note: You can run your code by running the command `node api.js` in a shell in your project directory.

1. Explore the contents of each response when you provide good data as well as bad data to get a feel for the expected responses.

    > Note: The cookie you pass in must be an actual cookie, verified on an API through the browser, at the `/api/v1/auth/google` endpoint. Otherwise, you will (or should) get a 401 every time. This method is called session hijacking because the unit tests don't ever verify with the endpoint. The cookie is the only thing our APIs check to see if the user is verified, which is why this works. You can get a valid cookie by authenticating at that endpoint. Once you've logged in, you should be able to find a cookie called `it210_session`. Copy its value (a long string of random characters) and paste it into your code in the necessary places.

### Step 3: Document your methods

JavaScript documentation takes the form of a comment right before the definition of a function or method.

```JS
/**
 * Calculate the average of three numbers.
 *
 * @param {number} x - The first number.
 * @param {number} y - The second number.
 * @param {number} z - The third number.
 * @returns {number} The average of the three numbers.
 */
function avgThree(x, y, z) {
  return (x + y + z) / 3;
}
```

Document all your methods this way with the following:

1. A short, one-line imperative description of the method (i.e. `Return the sum of x and y`, not `Returns the sum of x and y`)

1. A list of arguments, with a short description of each

1. A description of the return value

Armed with these descriptions, Visual Studio Code can now help you when you use these later. It will display arguments with the documentation you have written, which can be very useful, especially when another person comes along who hasn't written your methods. This helps them use your code properly.

### Step 4: Write the Unit Tests

> Note: Some of these steps may be done for you in the [file we included](../api.test.js). Follow along with this file, and fill in what's missing.

1. Open the file named `api.test.js`.

1. In this file, the `API` class from the other file you wrote in step 1 should already be imported using `require`.
    > Note: This works because `module.exports = API` was included at the end of the `api.js` file.

1. A block to group together your tests has already been defined for you using the `describe` method.

1. Write these twelve tests, such that they properly test the APIs. Each test should be defined inside the `describe` block.

    > Note: A unit test case in Jest uses the `expect` method to define what the expected result should be. In order to test for certain values, you will need to use something called a "matcher" method with it. There are [many different matcher functions](https://jestjs.io/docs/expect#matchers). You do not need to use all of them; in fact, you shouldn't need to use any others besides what was already used in the example given to you.

    1. Proper tasks that "work"
        * Create— The response has the `Text` and `Date` which you gave; the `Done` is `false`; status is `201`; Check that the task has `UserId` property 
        * Read One— After creating; the response has the `Text` and `Date` which you gave; the `Done` is `false`; Check that the task has `UserId` property 
        * Read All— After creating; all tasks have the same `UserId`
        * Update— After creating; the response has the expected `Done` value
        * Delete— After creating; the response is ok; read one is not ok
        * Read User— The response has the following fields: `Id`, `UserName`, `Email`
        
    1. Tasks that "fail"

        > Note: To be clear, these tests should pass, but the API should return an error status code. What determines whether a unit test passes is whether it returns what we *expect*.

        * Read One, doesn't exist— Generate 24-hex-char fake id; try and read; status is `404`
        * Delete, doesn't exist— Generate 24-hex-char fake id; try and delete; status is `404`
        * Update, doesn't exist— Generate 24-hex-char fake id; try and update; status is `404`
        * Delete, invalid id— Generate 23-char fake id; try and delete; status is `500`

            > Note: There's a difference between an id that doesn't exist and one that is invalid. A valid [MongoDB ObjectId](https://docs.mongodb.com/manual/reference/method/ObjectId/#ObjectId) has 12 hex bytes, or 24 hex chars (0-9, a-f). You can test out an "invalid id" by using a shorter hex string or by using non-hex chars with the proper length.

        * Read All, no cookie (i.e. not logged in)— Status is `401`
        * Create, not enough data provided— Status is `500`

## Step 5: Put Your Unit Tests to the Test
1. There are 4 different APIs set up for passing off this lab. They are found at the following URLs:
    * s1: https://s1.cf-itc210.net
    * s2: https://s2.cf-itc210.net
    * s3: https://s3.cf-itc210.net
    * s4: https://s4.cf-itc210.net
2. To test these APIs, you will need to get a valid cookie. You do this by accessing the endpoint `/api/v1/auth/google`. For example, for s1 you would go to https://s1.cf-itc210.net/api/v1/auth/google and sign in with a valid Google account. 

    > Note: You might have to clear your cookies before doing this step to ensure you are getting the correct value. 

3. Use your browser inspector to find the value for the cookie `it210_session` and paste it into your JavaScript code in the correct spot.
4. Run your tests via the `npm run test` command and try to figure out which APIs are functioning correctly and which are faulty.

    > Note: `npm run test` runs the test script we defined when initializing our project. In our case, it should be `jest --verbose`, which is defined under "scripts" then "test" in our `package.json` file. The `--verbose` flag just signals we want to see extra output when we run our tests (to make debugging easier).

5. Check your results against the [API Test Results](results.md)

    > Note: While testing the APIs, you may receive an error stating that you are `Unauthorized`, and give you a `401` or possibly `403` error code. This simply means you are not logged in, so double check that you are logged in and that you have a valid cookie.

## Step 6: Provide a README
Some of these procedures are very nuanced. If another developer came along and had to maintain our API using your unit tests, they might not understand all of the intricate workings of your tests. Create a `README.md` in your repository containing detailed instructions of how to get the cookie, how to run the code, and which file to change if you have new functionality you need to test. (The `api.js` file should be sufficient unless you add a new endpoint. In that case, the `api.test.js` should be the one changing.)

## Step 7: Setup For Lab 4B

> Note: Lab 4B has more coding involved so we want to make sure that we have everything we need set up for us to hit the ground running for this next lab. 

### Part 1: Set up Google Authentication

Before moving on, we need to set up our Google Authentication API. To work with outside services, you usually need to register with them so that they know who's using their servers. In return, you'll get a key (a string of numbers and letters) which will allow your application to receive information from their servers. We'll get the key and set up our authentication.

1. Log in to Google's [Developer Console](https://console.developers.google.com). Create a new project, and call it something appropriate (like `ITC 210 Google Auth`). It will generate a project ID for you.

2. Go to the [Credentials](https://console.developers.google.com/apis/credentials) page for your project. This page can also be found by clicking on `APIs & Services` in the side menu, then `Credentials`.

    - Make sure you have selected the project you created in the last step (`ITC 210 Google Auth`)
    - Click `Create credentials` then `OAuth client ID`
        - If it forces you to set up your consent screen at this point, select `External` as the User type, enter your email where it asks for it, and leave the rest of the settings alone. Click `Save and Continue` until the Consent Screen setup is finished. Then click `Back to Dashboard`, click on `Credentials` again, and click `Create Credentials` then `OAuth client ID`.
    - Select `Web application` as the application type
    - Specify a name for your client
        - e.g. `ITC 210 Todo App`
    - Under the `Authorized redirect URIs` heading, add your callback URL to the list of authorized callback URLs at the bottom. It will have the form of `https://<API_ORIGIN>/api/v1/auth/google/callback` (don't include the `< >` brackets)
        > Note: You can add more redirect URIs later on in your project settings.
    - Click `Create`
        > Note: This created a unique client ID that we will use later to integrate Google Sign-in into our Visual Studio web application

We'll come back to this page later when we need to use our credentials in our code.

### Part 2: Setting up Node.js

Make sure you have Node.js installed on your coputer by typng `node --version` into command prompot.

#### Use the Template

Clone the Lab-4B repo onto your computer and open it in VSCode.

> Note: Before moving on, double check that you have a `.gitignore` file in the lab folder. Make sure there's a line in it that says `node_modules`. This file will tell Git that you don't want to commit anything in the `node_modules` folder, which gets [very](https://i.redd.it/j1ulcud873b31.png), [very](https://img.devrant.com/devrant/rant/r_1546733_HyZ3h.jpg), [very](https://img.devrant.com/devrant/rant/r_1030841_w7Mq9.jpg), [very large](https://i.redd.it/tfugj4n3l6ez.png).

#### Add Dependencies

We've provided a project `package.json` for you, which contains much of the setup and scripts that you'll need for this project.

1. Open a shell/command prompt to your project directory and run the following command:

    ```sh
    npm i
    ```

    > Note: This command installs all the packages and dependencies that are listed in the `package.json` file so that your project is up to date. `i` is shorthand for `install`. You can also run `npm install` if you like wasting your precious time typing instead of coding. ;)

2. Install the dependencies in the table below using the command:
   ```sh
    npm i <name of dependency from table>
    ```

    > **Dependencies** are other JavaScript files, or **Libraries**, that we can use for our API. As you'll learn, there are lots of different ways of saying the same thing in programming.

| Dependency | Usage |
| ---------- | ----- |
| [`mongoose`](https://www.npmjs.com/package/mongoose) | Mongoose is a MongoDB object modeling tool designed to work in an asynchronous environment. |
| [`passport`](https://www.npmjs.com/package/passport) | Passport is Express-compatible authentication middleware for Node.js. |
| [`passport-google-oauth`](https://www.npmjs.com/package/passport-google-oauth) | Passport strategies for authenticating with Google using OAuth 1.0a and OAuth 2.0. |
| [`connect-mongodb-session`](https://www.npmjs.com/package/connect-mongodb-session) | This module exports a single function that takes an instance of connect (or Express) and returns a MongoDBStore class that can be used to store sessions in MongoDB. |
| [`cors`](https://www.npmjs.com/package/cors) | CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options. |
| [`express-session`](https://www.npmjs.com/package/express-session) | Create a session middleware. |

> Note: The rest of the dependencies, like `express`, were installed when you ran `npm i` since they were defined inside of the `package.json` file.

#### Environment Variables

When developing an application, sometimes you need to change variables depending on the environment you're developing in. Perhaps when you're developing, you're developing on your laptop, and you are serving the API through port `3001`, but when it goes to production, you want to serve it through port `8080` (the default port). For this project, we will use port `1337` for development and production. 

There should already be a file named `.env.example` in your repo. Rename it or make a copy of it called `.env` in the same directory as `app` (outside the `app` folder, but inside the `src` folder).

> Note: You should not be pushing `.env` files to GitHub. They often contain sensitive information like passwords which you don't want to make public. Check the `.gitignore` to make sure that `.env` is in there before you push anything to GitHub.

> Hint: If you run `npm start` without all your `.env` variables defined you will run into errors. The temporary values of the `.env.example` will stop any errors for now so we can test that our setup is working. 

> Now when you run your server by executing the command `npm start`, it will run it on `http://localhost:1337`!

We'll need to set up our cloud database first before we can set up the other environment values.

### Part 3: Setup a NoSQL Database in the Cloud
To get our website ready to develop, we need to connect it to a database. We'll use MongoDB so that we have practice using a NoSQL database. Fortunately, they have a free cloud-hosted service called [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) that we can use to set it all up.

In Atlas, we will set up a new database, create a new collection, add some data, and finally create a user that has access to it to be able to read and write data to the database.

1. Create an account, and it will take you to a page called `Deploy a cloud database`
2. Select "Shared"

    - If you don't see the option for shared then at the bottom select `Go to Advanced Configuration` and it will show you the shared option. 
    - Make sure you choose a server in the "Shared" tab unless you want to pay for this database
    - For example, choose `Google Cloud Platform`, and select the `Iowa (us-central1)` server
    

3. Name your cluster if you want, then click the `Create Cluster` button on the bottom of the screen

4. Once you are logged in, you'll see that Atlas will be setting up your database for you. It may take several minutes.

5. Once the setup has been completed, click on the `Database` tab on the left menu, then `Browse Collections`, then `Create Database` or `Add my Own Data`.

    - Call the database `Todo`, and call the collection `Tasks`
      - __The casing is super important. It's called Pascal Case, and you should use it.__
    - __Don't__ check the box marked `Capped Collection`

6. Select `Database Access` from the `Security` sub-section in the left side menu

    - Click the `Add New Database User` button
    - Enter a username and a password
      - Username can be something like `todo-user`
      - Make the password something easy for testing
    - __Remember the username and password for later__
    - Under `Built-in Role`, make sure the "Database User Privileges" has "Read and write to any database" selected.
    - Click `Add User`

7. Select `Network Access` from the `Security` sub-section in the left side menu

    - Click the `Add IP Address` button
    - Click `ADD CURRENT IP ADDRESS` and add a comment to say which network your computer is on currently (If you're in the lab, you can say "IT Lab" or something like that)
    - Click `Confirm`
    > Note: You'll have to do this every time you move your computer to a new network unless you allow access from anywhere, which is NOT a good idea.

### Part 4: Connect to Cloud DB
Now we need to get our Atlas Database hooked up. We will use Mongoose, an **Object Data Manager** (ODM), which makes communicating with our database much easier, and makes sure we use the proper data structures.

#### Connection

1. Go to your [Atlas Dashboard](https://cloud.mongodb.com) in the browser

    - Click the `Database` link on the left-side menu
    - Click `Connect > Drivers`
    - Choose `Node.js` for the `Driver`
    - Choose the latest version for the `Version`
    - Ignore the part about installing the driver and click `Copy` next to the connection string (make sure the toggle for `View full code sample` is disabled).

2. In Visual Studio Code, open the `.env` file in the `app` folder and add the following variable:

    ```shell
    ATLAS_CONNECTION_STRING="<the connection string to your Atlas mongodb database>"
    ```

    > Note: Don't forget to replace `<username>` and `<password>` with the info for the Database User you created.

    - After `.mongodb.net/`, add in your database name. Since our database name is `Todo`, it should look something like this: 
    ```shell 
    ATLAS_CONNECTION_STRING="mongodb+srv://todo-user:1234@clusterxxx.mongodb.net/Todo?retryWrites=true&w=majority"`
    ```

3. Open the empty `mongoose.js` file and do the following:
    - Import the `mongoose` package
    - Use mongoose's `connect` method to create a connection to the database
        - Check the docs by Googling "mongoose js"; the Getting Started page should have what you need
        - HINT: Use `process.env` to access the environment variables you created (that's how you get the Atlas connection string). (e.g. `process.env.ATLAS_CONNECTION_STRING`)
        - __DO NOT LEAVE THE ACTUAL CONNECTION STRING AS PLAIN TEXT IN THIS FILE. IF A TA CAN FIND YOUR CONNECTION STRINGS IN GITHUB BY SEARCHING THROUGH THE REVISION HISTORY, YOU'LL LOSE POINTS. IT'S IN THE `.env` FILE FOR A REASON.__
    - If you set up everything correctly, you can test the connection by making sure you `require()` the mongoose file in `app/index.js` and then running `npm start`. You should see your MongoDB connection message in the console that you set up in your callback function. 

After these setup steps you should have an `.env` file with the following variables. Make sure that any values surrounded by `< >` appropriately (for example, `API_ORIGIN` should be `http://localhost:1337` for your development environment).

```shell
ATLAS_CONNECTION_STRING="<the connection string to your Atlas mongodb database>"
SESSION_SECRET="<literally anything you want it to be>"

GOOGLE_CLIENT_ID="<client ID from https://console.developers.google.com/apis/credentials>"
GOOGLE_CLIENT_SECRET="<client secret from https://console.developers.google.com/apis/credentials>"
GOOGLE_CALLBACK_PATH="/api/v1/auth/google/callback"

API_ORIGIN="<the domain of your node API (during testing it will be http://localhost:1337)>"
```

## Lab 4A—JavaScript and Unit Testing

#### Pass Off Requirements
- [ ] 0 Points - Show the TAs your .env file
- [ ] 5 Points - First commit is on or before Friday
- [ ] 4 Points - Source code is pushed to GitHub
- [ ] 36 Points - **Twelve unit tests**: Total of twelve unit tests, all passing on the working API and failing at the right time on faulty APIs.
- [ ] 12 Points - **Documentation**: Each of the six API methods has appropriate documentation in the form of a JavaScript documentation comment.
- [ ] 8 Points - **README.md**: Your README.md contains instructions sufficient for another developer to use your tests

## Writeup Questions

* Name and discuss at least two of the benefits of writing unit tests before writing code.
* What would be some of the benefits of automating your test scripts (i.e. so they run at each commit)?
* How long did this lab take you?
