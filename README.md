Sencha Touch 1.1 client for MOODLE 2.1
======================================

This is a proof of concept of a Javascript Moodle client with cross-domain web service call.
For this demonstration, we used the Javascript framework Sencha Touch.
The client sends a username/password to a moodle site by HTTP in order to retrieve a user token. 
Then the client does a first web service call to retrieve more information (site name, ...).
The code is based on the Sencha Form tutorial: https://github.com/senchalearn/Forms-demo

Installation:
-------------

1- In your Moodle folder, cherry-pick https://github.com/mouneyrac/moodle/commit/7d60d893f6417cb196d7c80377c2d0abfee6a209 with Git.

2- In your Moodle site, enable the mobile service (Admin settings > Plugins > Web services > Manage services )

3- Run the client. When you add or update a site, the client automatically requests a token and call a Moodle web service function. 
   Currently, if ever you enter the wrong url, wrong usernmae/password, the client crashes. 
   You will need to refresh the page. 
   Note: you need to be online to run the client as it downloads the Sencha touch library on the Sencha server.

Create an iOS app
-----------------
You can easily use PhoneGap (http://phonegap.com/) to embed this Javascript app into an iOS app. I tried, it worked.
