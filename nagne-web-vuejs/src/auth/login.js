import axios from "axios";

const login = async (username, password) => {
  return await axios
    .post("http://localhost:8080/api/users/login", {
      username: "test2@gmail.com",
      password: "1234",
    })
    .then(({ data }) => {
      const token = data.response.token;
      return token;
    })
    .catch((err) => {
      return "";
    });
};

export { login };
