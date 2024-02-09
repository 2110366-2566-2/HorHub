import jwt from 'jsonwebtoken';

export function generateJWT(id: string, displayName: string, firstName: string) {
    const token = jwt.sign({id: id, displayName: displayName, firstName: firstName},
        process.env.JWT_SECRET_KEY as string,
        {expiresIn: '3 days'})
    return token
}

export function decodeJWT(token: string) {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string)
    console.log(decoded)
    return decoded
}
