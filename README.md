# pen.js

Project Event Notification: A set of tools to use Github to enable teams to notify each other of their immediate working activity from the command line. Pen.js uses bash scripts to update a log file in the notification branch of your github project, which also updates a page (the Heroku app) on which people can glance and see the files that everyone is working on.

### Run It

Pen.js works from the notify branch - so clone the repo, `$npm install` and `$git branch notify` to enable the local notify branch. After that you work from your master/working branches and need not to go to the notify branch. In order to install the bash scripts, make sure you are in the root folder of the project and `$bash scripts/install` to get them to work. The bash scripts point to the remote version of the app, so although you can run it on your local machine, it is better to check out [penjs](http://penjs.herokuapp.com). Currently the bash scripts are only working from the root directory, but we're working on improving that.

### Tools?

Once the scripts are installed (`$bash scripts/install` while in the root of the project) the follwing commands are enabled:  
  
`$git pen (dir/filename) (optional message in quotes)`  
This is the primary tool in the project: PEN. Use this to tell your team mates the file that you are working on. This will log your name, email, the SHA of the file that you're working on, your last commit and the master commit that you are working from. A lot of info, but the kind of thing that your team will value!  
`$git chat "Message in quotes"`  
Log your messages to a chat log! Working on hooking this up with page chat.  
`$git team`  
See the last ten chat messages!  
`$git lastm`  
See the last ten logs of your team - looks crap at the moment but we're working on REGEX to get it to look nice.
`$git teamup`  
Get an update on the status of your team - really useful for project management.

### Under the hood

Pen.js works with Node, express and socket.io. It's not too pretty at the moment, but our stretch goal is to enable command line chat (that also appears on the page) so that you can quickly chat to team members if you both want to work on the same file. The idea behind the project is that it serves to deconflict teams (as team members can notify each other of changes), creates a log of activity on the git repo (which can aid in time keeping) and also enable people to integrate simple forms of communication into their workflow. We also log and transfer information about the last commits and master files that people are working from in order to help teams to track when individuals are falling behind the project itself.