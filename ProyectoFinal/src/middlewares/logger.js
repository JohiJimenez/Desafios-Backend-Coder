const { logger } = require('../utils/logger');

const info = (req, res, next) => {
    logger.info(`ruta ${req.url}, método ${req.method}`)
    next()
}


const errorRoute = (req, res, next) => {
    const error = `404 ruta ${req.url}, method ${req.method} not implemented`
    logger.warn(error);
    res.status(404).render('error',{error:error});
}

const catchError = (error, req, res, next) => {
    logger.error(error.message)
    res.status(500).send(error.message);
}

module.exports = {
    info,errorRoute,catchError
}