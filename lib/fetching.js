export const fetchApi = async (url, method, body) => {
  const myHeaders = new Headers();
  myHeaders.append('x-api-key', process.env.API_KEY);
  myHeaders.append('content-type', 'application/json');

  const bodyJson = JSON.stringify(body);

  const options = {
    method: method ?? 'GET',
    headers: myHeaders,
    body: bodyJson,
  };

  const result = await fetch(url, options);
  const resultJson = await result.json();

  return resultJson;
};
