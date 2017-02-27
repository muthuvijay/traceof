//URL router whic routes the API request to the respective files
const Schema = require('./schema');

let Router = new (class {

    constructor(){
        this.app = null,
        this.accept = new Set(["post","get","delete","put"]);
        this.db = null;
    }

    setApp(app){
        this.app = app;
    }

    getApp(){
        return this.app;
    }

    setDatabase(db){
        this.db = db;
    }

    getDatabase(){
        return this.db;
    }

    set(url,method,dbmode, collection){
        console.log("Set route to url "+url);
        if(url && this.accept.has(method)){
            this.app[method](url,(req, res) => {
                //check if the request body is as per our API schema
                Schema.check(Schema[url].payload, req.body).then((result)=>{
                    this.callback.call(this, req, res, dbmode, collection);
                },
                (err) => {
                    console.error(err);
                });
                
            });
        }
    }

    callback(req, resp, dbmode, collection){
        
        this.db[dbmode](collection, req.body).then((result) => {
           /* resp.send(Object.assign(result.ops,{
                'status' : 'success'
            }));*/
            resp.send({"count" : result.insertedCount, "insertedIds": result.insertedIds, 'status' : 'success'});
        });
        
    }
})();

module.exports = Router;