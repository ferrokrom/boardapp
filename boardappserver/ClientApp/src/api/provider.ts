export const requestHeader = () => {
  var token = localStorage.getItem("boardapptoken");

  return {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-type": "application/json",
    },
  };
};
