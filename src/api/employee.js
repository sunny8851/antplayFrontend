import axios from "axios";
const apiUrl = process.env.REACT_APP_API_KEY;

const getEmployeeList = ({ dataFetched }) => {
  const x = localStorage.getItem("userData");
  const userData = JSON.parse(x);
  console.log(userData);
  axios
    .get(`${apiUrl}/employee/getalllist`, {
      headers: {
        email: userData ? userData.email : "",
        token: userData ? userData.token : "",
      },
    })
    .then((res) => dataFetched(res))
    .catch((e) => {
      console.log(e);
    });
};
const updateEmployeeData = ({ id, name, department, mobileNo }) => {
  const x = localStorage.getItem("userData");
  const userData = JSON.parse(x);
  axios
    .post(
      `${apiUrl}/employee/update`,
      {
        id: id,
        name: name,
        department: department,
        mobileNo: mobileNo,
      },
      {
        headers: {
          token: userData ? userData.token : "",
        },
      }
    )
    .then((res) => console.log(res))
    .catch((e) => {
      console.log(e);
    });
};
const addNewEmployee = ({ onSuccess, name, department, mobileNo }) => {
  const x = localStorage.getItem("userData");
  const userData = JSON.parse(x);
  axios
    .post(
      `${apiUrl}/employee/add`,
      {
        name: name,
        department: department,
        mobileNo: mobileNo,
      },
      {
        headers: {
          email: userData ? userData.email : "",
          token: userData ? userData.token : "",
        },
      }
    )
    .then((res) => onSuccess(res))
    .catch((e) => {
      console.log(e);
    });
};
const deleteEmployeeData = ({ onDeleteSuccess, id }) => {
  const x = localStorage.getItem("userData");
  const userData = JSON.parse(x);
  axios
    .post(
      `${apiUrl}/employee/delete`,
      {
        id: id,
      },
      {
        headers: {
          email: userData ? userData.email : "",
          token: userData ? userData.token : "",
        },
      }
    )
    .then((res) => onDeleteSuccess(id))
    .catch((e) => {
      console.log(e);
    });
};

export {
  getEmployeeList,
  updateEmployeeData,
  deleteEmployeeData,
  addNewEmployee,
};
