const getUrlParams = function () {
  const urlQuery = window.location.search;
  const params = new URLSearchParams(urlQuery);
  return params;
};
export default getUrlParams;
