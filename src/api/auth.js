import axios from "axios";

export function SignupApi(onSignUpSuccess, onSignUpFailure, values) {
  console.log(values);
  axios
    .post("http://localhost:5000/user/signup", { ...values })
    .then((response) => {
      onSignUpSuccess(response);
    })
    .catch((error) => {
      onSignUpFailure(error);
    });
}
export function LoginApi(onLoginSuccess, onLoginFailure, values) {
  console.log(values);
  axios
    .post("http://localhost:5000/user/login", { ...values })
    .then((response) => {
      onLoginSuccess(response);
    })
    .catch((error) => {
      onLoginFailure(error);
    });
}
