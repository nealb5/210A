# Lab 1: Tools, HTML, and CSS

Neal Bartolomei
September 20, 2024
Lab 1

## Executive Summar

The Docker application and AWS lab tool have been used properly and successfully to present a webpage in a local and live environment. In that webpage, and HTML and CSS file have been created to present and style the webpage.

## Design Overview

A webpage with a task list was created with a proper title and tasks associated with that title. A checkbox, which, when checked, crosses out the task, indicating completion was also created. At the bottom of the body, a user can input a task description with a date. However, this section does not have full functionality. 

For customizations, a color blue and brown scheme was implimented to erase the original and bland black and white color scheme. A proper background image of a lake surrounded by mountains was also added to compliement the color scheme. A custom font was also added to the task title and a trash icon was added for the delete task button.

### Close up image of the task list
![Close up image of the task list](./src/sc1.PNG)

### Full page
![Full page](./src/sc2.PNG)

## File Descriptions

- index.html - main file for the webpage
- style.css - css file used to customize the webpage
- scrip.js - javascript file used to display a popup when inputting a task description and date

# Questions

## What is the purpose of using Docker containers?

Docker containers are used to quickly deploy applications into different enviornments and seeing the outcome of how the code will run.

## Why is it useful to have both a development environment and a live server environment?

A user can use both enviornments to find errors and reduce potential erros. One error could show up on one and not the other. A user could also make changes to their webpage without affecting any other users using the live server environment. 

## What is the purpose of using a code versioning tool (i.e. Git)?

With a code versioning tool, you can trace multiple versions of code and reload the old versions if something in the new code went wrong. A code versioning tool also allows multiple users to access code.

## What is the difference between a CSS rule with an element selector (i.e. h1,p,div etc.) and one with a class selector (i.e. .task, .task-done etc.)? When would you use each?

A CSS rule with an element selector is applying to an element, which is already in HTML, and one with a class selector is applying to a class selector, which the user creates. You would use a CSS rule when you want to modify a certain element, and you would use a CSS rule on a class selector when you want to modify mutiple elements all in the same way.

## What are the advantages of putting your styles in a separate .css stylesheet instead of in the `<style>` element of `<head>`?

With a CSS stylesheet, you can benifit from easier maitenance across multiple websites because one CSS stylesheet can be applied to multiple webpages. It can also make styling easier and faster by applying changes with class selectors. You can also benifit from more styling options in CSS.

## How do web browsers choose which CSS to use for an HTML element when the CSS rules contradict each other? What is the order of precedence for CSS rules?

Web browers will choose which selector is "more important." Web broswers will first look for which selector is more specific (ie. and ID selector will get priority over a class selector). Next, it will look for the !important tag on a selector. Lastly, the rule which appears later in the CSS will be applied.

## Why should you disable directory access for your server?

You should disable directory access to provide security to the website and to prevent unauthorized access to all of the files in the website.

# Problems

THe first issue which I ran into was hiding the directory of the webpage on the live server. The right configuration file was in mind, but the correct linux command was not being used. The previous linux command would not give access to edit the file. Once "sudoedit" was used to edit the file, the directory became hidden.

The next problem was adding a custom font and a custom background to the webpage. The code was analyzed over again and again, but it simply turned out that the font file and the image were not placed in the css file's directory. Before, the title and the background were defaulted to normal text and just a white background, but after adding the files into the css file's directory, the custom font and the background image was displayed.

# Conlusions

 - Used Docker to create a local environment
 - Used AWS to deploy a live environment
 - Used HTML to add content to a webpage
 - Used CSS to add customizations to the webpage

 # References

 - https://www.loggly.com/use-cases/how-to-monitor-your-apache-logs
 - https://tecadmin.net/disable-directory-listing-apache
 - https://awsacademy.instructure.com/