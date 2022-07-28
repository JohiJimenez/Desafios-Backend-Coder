const admin = true;

const isAdmin = (req,res,next) => {
    if (!admin){
        return res.status(403).json({error: 403, description: `Not authorized method ${req.method} in this route ${req.originalUrl}`});
    }
    return next();
}

export default {isAdmin, admin};