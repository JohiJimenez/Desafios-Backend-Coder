import FirebaseContainer from '../../container/FirebaseContainer.js'

class FirebaseProductDao extends FirebaseContainer {
    constructor() {
        super ('products')
    }
}


export default FirebaseProductDao