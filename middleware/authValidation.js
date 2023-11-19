import jwt from 'jsonwebtoken';
import createError from 'http-errors';

// Middleware to handle authetication
export const authValidation = (request, response, next) => {
  try {
    const authHeader =
      request.headers.Authorization || request.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer')) {
      throw createError.Unauthorized();
    }
    const accessToken = authHeader.split(' ')[1];

    const verify = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    console.log(verify);
    next();
  } catch (error) {
    console.log(error);
    next(error);
    throw createError.Unauthorized();
  }
};
