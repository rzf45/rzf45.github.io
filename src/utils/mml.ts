const API_HOST = 'https://rzf45.netlify.app/.netlify/functions';

export function getMMLList() {
  return new Promise(
    async (resolve, reject) => {
      const request = new Request(`${API_HOST}/mml-list`, { method: 'get' });
      await fetch(request)
        .then(response => {
          if (response.ok) {
            response.json()
              .then(data => resolve(data));
          }
          else {
            console.error(response);
            reject(new Error(`HTTP Error ${response.status}`));
          }
        });
    }
  );
}

export function getMMLData(id: string) {
  return new Promise(
    async (resolve, reject) => {
      const params = new URLSearchParams({ id }).toString();
      const request = new Request(`${API_HOST}/mml?${params}`, { method: 'get' });
      await fetch(request)
        .then(response => {
          if (response.ok) {
            response.json()
              .then(data => resolve(data));
          }
          else {
            console.error(response);
            reject(new Error(`HTTP Error ${response.status}`));
          }
        });
    }
  );
}
