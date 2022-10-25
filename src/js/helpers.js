import { TIMEOUT_SEC } from './config';

function timeout(s) {
  return new Promise((_, reject) => {
    setTimeout(
      () =>
        // eslint-disable-next-line implicit-arrow-linebreak
        reject(new Error(`Request took too long! Timeout after ${s} second`)),
      s * 1000
    );
  });
}

export default async function AJAX(url) {
  const fetchPro = fetch(url);

  const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
  const data = await res.json();

  if (!res.ok) throw new Error(`${data.message} (${res.status})`);
  return data;
}
