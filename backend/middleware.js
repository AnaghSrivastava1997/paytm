import { jWT_SECRET_KEY } from './config.js'
import jwt from 'jsonwebtoken';


var authMiddleware = (req, res, next) => {

    var header_token = req.headers['authorization'];
    console.log(header_token);
    if (!header_token || !header_token.startsWith("Bearer")) {
        return res.status(403).json({});
    } else {
        const token = header_token.split(' ')[1];
        console.log(token);
        var decoded = jwt.verify(token, jWT_SECRET_KEY);
        console.log(decoded);
        if (decoded.Email) {
            next();
        } else {
            return res.status(403).json({});
        }
    }
    
}
export {authMiddleware};