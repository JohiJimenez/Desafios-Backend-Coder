const { UserDaoMongoAtlas } = require("./daos/UserDaoMongoAtlas")


class UserDaoFactory {
    getDao(type) {
        if (type === 'production') { return UserDaoMongoAtlas.getInstance() }
        else if (type === 'development') { return UserDaoMongoDB.getInstance() }
        else { console.error('error connecting to Dao') }
    }
}

module.exports = {
    UserDaoFactory
}