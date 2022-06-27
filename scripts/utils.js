const API_HOST = 'https://rzf45.netlify.app/.netlify/functions';

const utils = {
  group: (array, key) => {
    return array.reduce((r, v, i, a, k = v[key]) => ((r[k] || (r[k] = [])).push(v), r), {});
  },
  formatDate: (date) => {
    return new Intl.DateTimeFormat('en', { dateStyle: 'short', timeStyle: 'short' }).format(date);
  },
  getKiloByte: (size) => {
    return Math.round(((size / 1000) + Number.EPSILON) * 100) / 100;
  },
  substring: (str, limit) => {
    if(str.length > limit)
      return `${str.substring(0, limit)}...`;
    else
      return str;
  },
  sortByFilename: (array) => {
    return array.sort((a, b) => a.filename.localeCompare(b.filename))
  },
  parseQuery: (query) => {
    if (typeof (query) != 'string') return '';

    const obj = {};
    const q = query.slice(1).split('&');
    q.forEach(a => {
      const b = a.split('=');
      obj[b[0]] = decodeURIComponent(b[1]);
    })
    return obj;
  },
  getMMLList: () => {
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
  },
  getMMLData: (id) => {
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
}
