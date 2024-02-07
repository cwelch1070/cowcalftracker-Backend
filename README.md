# [cowcalftracker.com](https://www.cowcalftracker.com) REST API
Welcome to [cowcalftracker.com](https://www.cowcalftracker.com) a single page web application intended to make the everyday task of managing cattle more effecient and organized.

## Overview
This repo contains the backend API routes and logic that power the [cowcalftracker.com](https://www.cowcalftracker.com) web application. Currently, it is being developed as a monolith and all logic is contained within this single repo. The UI is however kept in its own repo
[here](https://github.com/cwelch1070/cowcalftracker-UI).

## Technology Used
- Node.js
- Express.js for routing
- Mongodb for database
- Mongoose for schema and db access
- npm for package mangement
  
## Project Goals
The current goal for this repo is to continue development of additional feaures to improve the functionality of [cowcalftracker.com](https://www.cowcalftracker.com). As the application grows I plan to eventually break it out into microservices and implement CI/CD piplines to stream line and automate the deployment process.

## Setup guide
1. To run this project on your local machine first clone the repo into a directory on your machine using `git clone https://thisreposlink`.
2. Once you have the the repo cloned on your local machine, open the project in the editor of your choice.
3. Open a command prompt and navigate to the directory the repo is stored in. In the `server` directory run `npm install` to install all needed dependencies.
4. When this has finished you will then need to configure the connection to mongodb atlas. 
```
const mongoose = require('mongoose')

mongoose.set('strictQuery', true)

const url = `mongodb+srv://username:password@atlasprojectname.rl0m3ev.mongodb.net/cowcalftracker-api?retryWrites=true&w=majority`;

mongoose.connect(url, {})
    .then( () => {
        console.log('Connected to the database ')
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. n${err}`);    
    })
```

You can also setup mongodb locally rather than using the cloud solution
```
const mongoose = require('mongoose')

mongoose.set('strictQuery', true)
mongoose.connect('mongodb://yourIP:port/cow-calf-tracker-api', {})
```
When you have complete the db configuration you can now run `npm run dev` command inside the `server` directory. If everyiting is working as expected you shoud see the current status logged in the console.

![image](https://github.com/cwelch1070/cowcalftracker-Backend/assets/90748206/cde5489d-c878-4d5e-b63c-2869648f2b4e)

## License Information
