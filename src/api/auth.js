import axios from "axios";

const apiUrl = process.env.REACT_APP_API_KEY;
export function SignupApi(onSignUpSuccess, onSignUpFailure, values) {
  console.log(values);
  axios
    .post(`${apiUrl}/user/signup`, { ...values })
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
    .post(`${apiUrl}/user/login`, { ...values })
    .then((response) => {
      onLoginSuccess(response);
    })
    .catch((error) => {
      onLoginFailure(error);
    });
}
