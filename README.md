# pen.js

Project Event Notification: A set of tools to use Github to enable teams to notify each other of their immediate working activity from the command line. Pen.js uses bash scripts to update a log file in the notification branch of your github project, which also updates a page (the Heroku app) on which people can glance and see the files that everyone is working on.

### Run It

Pen.js works from the notify branch - so clone the repo, `$npm install` and `$git checkout -b notify` to enable the local branch. In order to install the bash scripts, make sure you are in the root folder of the project and `$bash scripts/install` to get them to work. The bash scripts point to the remote version of the app, so although you can run it on your local machine, it is better to check out [penjs](http://penjs.herokuapp.com)

### Tools?

The primary tool in the project is a command line function: `$git pen {filename} {Optional message}`  
Type the path and filename of the file that you wish to work on after `$git pen` (remember the space!) and an optional message in quotes (Don't use exclamation marks) and watch pen.js tell your team about your progress. Checkout the Heroku page and you can see other team mates give you their updates. Remember - if someone's working on a file - talk to them before working on it yourself!
You can also use `$git chat` to see the most recent updates in the command line, but this doesn't look too good at the moment. `$git ping` will cause the site to update the heroku page from Github, so you can leave the page in a corner of your screen and update without needing to switch pages. If you'd like to see what command line scripts are capable of, type `$git tempo` to see other people have managed to get working...

### Under the hood

Pen.js works with Node, express and socket.io. It's not too pretty at the moment, but our stretch goal is to enable command line chat (that also appears on the page) so that you can quickly chat to team members if you both want to work on the same file. The idea behind the project is that it serves to deconflict teams (as team members can notify each other of changes), creates a log of activity on the git repo (which can aid in time keeping) and also enable people to integrate simple forms of communication into their workflow. We also log and transfer information about the last commits and master files that people are working from in order to help teams to track when individuals are falling behind the project itself.