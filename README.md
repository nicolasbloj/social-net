# social-net
Social network example at Udemy => nodejs, express, angular, jwt, mongodb.

Previously install:
  nodejs
  npm
  angular
  angular cli

----------BACKEND----------
 
Download mongodb:
https://www.mongodb.com/download-center#community

Extract and copy the files into /usr/local/mongodb (or another folder)

Edit PATH Environment

      $ cd /Users/username
      ~$ nano .bash_profile
    
    
      export MONGO_PATH=/usr/local/mongodb
      export PATH=$PATH:...:$MONGO_PATH/bin


      $ source .bash_profile


Create folder for data

      ~$ mkdir -p /data/db


Exec mongodb:

       $ mongod


Download and install robomongo:
https://robomongo.org/download


Install robo 3t 


create direct connection

----------APP----------

Install dependencies:

      social-net/api $ npm install

Init app:
      social-net $ cd api
      social-net/api $ npm start

----------Robo 3t----------

Create database 
      
      social-net 
     
Create collections

      users
      follows
      ...
