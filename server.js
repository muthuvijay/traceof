//Node server js file, uses express

const express = require('express');
const app = express();
const config = require('./api/utils/config');
const DB = require('./api/utils/database');
const API = require('./api/utils/ApiUrls');
const Router = require('./api/utils/router');

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let dbConn = null;
//Create a Node server and listen to a port
app.listen(config.PORT,()=>{
    console.log("server started");

    DB.connectDB().then((handler) => {
        dbConn = handler;
        console.log("Connected to Database");
    });

});

Router.setApp(app);
Router.setDatabase(DB);

//save location info

/*app.post(API.URLS.POST.STORE_LOCATION_INFO, (req, resp) => {
    console.log(req.body);
    dbConn.collection('location').save(req.body, (err, result) => {
        if(err) {
            return console.log(err);
        }

        console.log('Saved location to database');
        resp.send({
            'status' : 'success'
        });
    })
})*/

Router.set(API.URLS.POST.STORE_LOCATION_INFO, config.Method.POST, config.DBMode.INSERT, config.Collection.LOCATION);