import axios from "axios";

const signup = (user) => {
  axios
    .post(import.meta.env.VITE_EC2_ADDR+"/api/users", user, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then(({ data }) => {
      if (data.success) {
        alert("회원가입에 성공했습니다. 로그인 후 이용하실 수 있습니다.");
      }
    })
    .catch((err) => alert("회원가입 실패"));
};

export { signup };
