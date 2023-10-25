export const authHeaderTokenKey = 'authorization';

export const tenant = 'doom';

export const parsedJWT = (token) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (error) {
    return undefined;
  }
};