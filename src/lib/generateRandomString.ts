import crypto from 'crypto';

function generateRandomString(length) {
  const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const bytes = crypto.randomBytes(length);
  const result = [];

  for (let i = 0; i < length; i++) {
    const index = Math.floor((bytes[i] / 256) * charset.length);
    result.push(charset[index]);
  }

  return result.join('');
}

export default generateRandomString;