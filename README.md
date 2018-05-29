Demo link:

https://hknews.herokuapp.com

( 1. Render only component that changed)
( 2. Use Link to route. It will not request the page from server again.)
( 3. Number of comments added)

fast run:

npm install
npm run start


Notes:
1.	This is the first time I work with Hacker News and algolia.com
1.	In the documentation for HN in algolia.com "karma points for each post" are not specified. Only "karma points per user" is explained.
2.	I assumed that the "points" for the post itself will be the "karma points" ( maybe I am wrong ).
3.	I use “https://hn.algolia.com/api/v1/search” to retrieve the posts.
4.	It is not clear if this is a bug in the response but some post are having NULL titles. I decided to filter posts with NULL title.
5.	Design and css are only to show the functionally.

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



=========================================================================================
Specification:

BlueVoyant Engineering Exercise
=========

Create a web app in the provided file structure that shows the top ranked links on Hacker News. **The content should be kept up-to-date in real-time.** When an item in the list is clicked, the comments page should show all the comments for that thread.


```
-------------------------------------
| Hacker News - Front Page          |
-------------------------------------
| [999] [user] Link 1               |
| [999] [user] Link 2               |
| [999] [user] Link 3               |
| [999] [user] Link 4               |
| [999] [user] Link 5               |
| [999] [user] Link 6               |
| [999] [user] Link 7               |
| [999] [user] Link 8               |
| [999] [user] Link 9               |
| [999] [user] Link 10              |
| ...                               |
-------------------------------------
```

```
-------------------------------------
|_Hacker_News_-_Comments____________|
-------------------------------------
|_[-]_[user]_Comment_1______________|
|____Lorem_Ipsum                    |
| [-] [user] Comment 2              |
|    Lorem Ipsum                    |
|   [-] [user] SubComment 1         |
|      Lorem Ipsum                  |
| [+] [user] Comment 3              |
|                                   |
| ...                               |
-------------------------------------
```


Guidelines:
====

- Make use of the existing Algolia API (documentation can be found here: https://hn.algolia.com/api)
- Use any reactive framework you feel comfortable with (e.g. React, Vue, Angular, Ember)
- Real-time karma points for each post should be displayed where [999] is shown on the wireframe.
- [ + ] should expand the comments children, and [ - ] should collapse the section.
- **Do not** use iframes
- *Do* include a **README** with documentation for the installation of dependencies, and instructions on running your application.
- We're interested in how you would structure larger codebases, and design the corresponding architecture.
- Be considerate of the user experience and design of your interface(s).
- Have fun, show off your skills, and write loveable code.
- Estimated time to complete: **4-6 hours**
