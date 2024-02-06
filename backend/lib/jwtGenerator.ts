import jwt from 'jsonwebtoken';

export function generateJWT(id: String, displayName: String, firstName: String) {
    const token = jwt.sign({id: id, displayName: displayName, firstName: firstName},
        process.env.JWT_SECRET_KEY as string,
        {expiresIn: '3 days'})
    return token
}