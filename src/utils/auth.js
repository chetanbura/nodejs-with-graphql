import jwt from 'jsonwebtoken';

const SECRET_KEY = 'First-Node-App';

export const generateJWT = (data) => {
  const token = jwt.sign(data, SECRET_KEY, { expiresIn: '1h' });
  return token;
};

export const verifyJWT = (token) => {
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    return decoded ?? null;
  } catch (err) {
    return null;
  }
};

export const isUserAuthorizeCheck = (id) => {
  if (id) {
    return true;
  } else {
    const error = new Error('Unauthorized access!');
    throw error;
  }
};
