Demo link:   https://hknews.herokuapp.com

npm install
npm run start


Application structure:
1.	Main source folder “HKNews”
2.	Source code folder “src”
3.	Production build folder “build”
4.	Static resources folder “public”
5.	Application configuration “src/config.js”
6.	Dependency configuration “package.json”
7.	Home page parameter  “package.json”  => "homepage": http://localhost:3000
8.	“web.config” included for deploying to Internet Information Server with MVC routing
Running the source:
1.	Unzip the file HKNews
2.	Open terminal in the root folder
3.	Run => “npm install”
4.	Run =>”npm run start”
5.	In the browser open => http://localhost:3000
Production deployment:
1.	Change "homepage": http://localhost:3000 => to the home page URL
2.	From a terminal in the root folder run => “npm run build”
3.	Copy the files from “build” folder to the production site
Application features:
1.	Home page display top stories
2.	It automatically updates every 60 seconds
3.	Uses setTimeOut ( it could be done with service worker or socket.io but they may not be supported in some user browsers.  With more time it can be coded to fall back to setTimeout if not supported but right now It just uses seTimeout ).
4.	After click on “comments” it navigates to the second page and shows all the comments for the selected post – collapsed.
5.	After click on plus sign – it will expand as set by the specification.
6.	It will update every 60 seconds.

Technologies:
1.	React JS with Redux JS
2.	Auto-Updating the page is done asynchronously
3.	I use “JQuery get” because the app already is using JQuery and I do not want to add other dependencies.
4.	The get request caches the response.  If JQuery receives http response 304 – it will not reload the response
5.	Auto-Updating uses React feature to update only the part of the DOM where there is a change in the data.  
