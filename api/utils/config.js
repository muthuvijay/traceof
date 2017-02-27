// Main configurations

module.exports = {
    PORT : 2500,
    mongoDBurl : 'mongodb://traceof:Qwerty12#@ds161109.mlab.com:61109/traceof-app',
    Collection : {
        LOCATION : 'location'
    },
    DBMode : {
        INSERT : 'insert',
        UPDATE : 'update',
        SAVE    : 'save'
    },
    Method : {
        POST    : 'post',
        PUT     : 'put',
        GET     : 'get',
        DELETE  : 'delete'
    }

}