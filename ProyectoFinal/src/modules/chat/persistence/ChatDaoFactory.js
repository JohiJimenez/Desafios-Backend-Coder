const { ChatDaoMongoAtlas } = require('./daos/ChatDaoMongoAtlas')

class ChatDaoFactory {
    getDao(type) {
        if (type === 'production') { return ChatDaoMongoAtlas.getInstance() }
        else if (type === 'development') { return ChatDaoMongoDB.getInstance() }
        else { console.error('error connecting to Dao') }
    }
}

module.exports = {
    ChatDaoFactory
}