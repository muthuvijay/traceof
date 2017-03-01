//URL router whic routes the API request to the respective files
const Config = require('./config');
const Schema = require('./schema');

let Router = new (class {

    constructor(){
        this.app = null,
        this.accept = new Set(["post","get","delete","put"]);
        this.db = null;
        this.options = {
            method : Config.Method.POST,
            dbmode  : Config.DBMode.INSERT,
            controller : false
        }
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

    set(url, collection, options){
        console.log("Set route to url "+url);
        let opt = options || {};
        
        opt = Object.assign({}, this.options, opt);
        if(url && this.accept.has(opt.method)){
            this.app[opt.method](url,(req, res) => {

                if(opt.controller !== false && typeof opt.controller === 'object'){
                    opt.controller.exec(req.body).then((obj) => {

                        //Few controllers has DB queries inbuild which doesn't require to proceed with another DB operation,
                        //in those cases, just send the values as is to the client

                        if(obj.proceed){
                            //update model
                            req.body = obj.data || null;
                            this.invoke(url, req, res, opt, collection);
                        }else{
                            this.handleResponse(res, obj.data);
                        }
                        
                    },(e) => {
                        this.handleError(res, e);
                    });
                }else{
                    this.invoke(url, req, res, opt, collection);
                }
                
            });
        }
    }

    invoke(url, req, res, opt, collection){
        //check if the request body is as per our API schema
        Schema.check(Schema[url].payload, req.body).then((result)=>{
            this.callback.call(this, req, res, opt.dbmode, collection);
        },
        (err) => {
            console.error(err);
        });
    }

    callback(req, resp, dbmode, collection){
        
        switch(dbmode){
        
            default:
            case Config.DBMode.INSERT:
                this.db[dbmode](collection, req.body).then((result) => {
                    resp.send({"count" : result.insertedCount, "insertedIds": result.insertedIds, 'status' : 'success'});
                });
                break;  
            
            case Config.DBMode.QUERY:
                this.db[dbmode](collection, req.body).then((result) => {
                    resp.send({"result" : result, 'status' : 'success'});
                });
                break;  

        }
        
    }

    handleError(resp, errorMessage){
        resp.send({'status' : 'error', 'message' : errorMessage});
    }

    handleResponse(resp, result){
        resp.send({'status' : 'success', 'result' : result});
    }
})();

module.exports = Router;