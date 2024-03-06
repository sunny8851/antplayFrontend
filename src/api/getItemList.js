import axios from "axios";
const apiUrl = process.env.REACT_APP_API_KEY;
const getItems = ({ setData }) => {
  axios
    .get(`${apiUrl}/item/getallitems`)
    .then((res) => setData(res.data))
    .catch((e) => {
      console.log(e);
    });
};
const updateItem = ({ id, name, description }) => {
  axios
    .post(`${apiUrl}/item/update`, {
      id: id,
      name: name,
      description: description,
    })
    .then((res) => console.log(res))
    .catch((e) => {
      console.log(e);
    });
};
const addItem = ({ onSuccess, name, description }) => {
  axios
    .post(`${apiUrl}/item/add`, {
      name: name,
      description: description,
    })
    .then((res) => onSuccess(res))
    .catch((e) => {
      console.log(e);
    });
};

export { getItems, updateItem, addItem };
