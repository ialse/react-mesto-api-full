function httpValid(link) {
  // eslint-disable-next-line no-useless-escape
  const http = /^https?:\/\/(www\.)?[a-z0-9\-\.]+\.[a-z]{2,9}(:[0-9]{1,5})?\/?[a-z0-9\-\/\._~:\?#\[\]@!\$\&'\(\)\*\+\,\;\=\%]{0,}$/i;
  return http.test(link);
}

module.exports = httpValid;
