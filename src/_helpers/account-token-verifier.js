import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.REACT_APP_JWT_SECRET;

export function getUserFromToken(token) {
    try {
        const decodedToken = jwt.verify(token, JWT_SECRET);
        const user = {
            username: decodedToken.username,
            name: decodedToken.name,
            userID: decodedToken.userID,
            unit: decodedToken.unit,
            subunit: decodedToken.subunit,
            type: decodedToken.type
        };
        return user;
    } catch (err) {
        console.log(err);
        return null;
    }
}