import { TIMEOUT_SEC } from './config';

const timeout = function (s) {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const AJAX = async function (url, uploadData = false) {
  const options = uploadData
    ? {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(uploadData),
      }
    : null;
  try {
    const res = await Promise.race([fetch(url, options), timeout(TIMEOUT_SEC)]);
    const data = await res.json();

    if (!res.ok) throw new Error(`${data.message} (${res.status})`);

    return data;
  } catch (err) {
    throw err;
  }
};
