import logger from '../utils/logger.js'

export default function loggerMiddleware(req, _res, next) {
    logger.info(`[${req.method}] ${req.originalUrl}`)
    next();
}
