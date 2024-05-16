import axios from "axios";

const signup = (user) => {
  axios
    .post("http://localhost:8080/api/users", user, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then(({ data }) => {
      if (data.success) {
        alert("회원가입에 성공했습니다. 잠시후 메인 화면으로 이동합니다.");
      }
    })
    .catch((err) => alert("회원가입 실패"));
};

export { signup };
