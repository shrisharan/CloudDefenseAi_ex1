const getAccessToken = async function (code) {
  const serviceUrl = `http://localhost:3000/accesstoken?code=${code}`;
  await fetch(serviceUrl, { method: "GET", credentials: "include" });
};

export default getAccessToken;
