import React, { useEffect, useState } from "react";
import {
  addNewEmployee,
  deleteEmployeeData,
  getEmployeeList,
  updateEmployeeData,
} from "../api/employee";
import { Table, notification } from "antd";
import GlobalModal from "./Modal";
import Navbar from "./Navbar";
import Loader from "./Loader";
const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [modalData, setModalData] = useState();
  const [api, contextHolder] = notification.useNotification();
  const [data, setData] = useState();
  const [copyData, setCopyData] = useState();
  const [inputValue, setInputValue] = useState({
    name: "",
    department: "",
    mobileNo: "",
  });
  const [newInputValue, setNewInputValue] = useState({
    name: "",
    mobileNo: "",
    department: "",
  });
  const openNotification = (msg) => {
    api.info({
      message: msg,
    });
  };
  useEffect(() => {
    // Check if the user is logged in by inspecting localStorage

    // if (window.location.href !== "http://localhost:3000/") {
    const isLoggedIn = localStorage.getItem("userData");
    if (!isLoggedIn) {
      // If the user is logged in, redirect to the home page
      window.location.href = "/login";
    } else getEmployeeList({ dataFetched });
    // }
  }, []);

  const columns = [
    {
      title: "name",
      dataIndex: "name",
      width: "30%",
    },
    {
      title: "Contact Number",
      dataIndex: "mobileNo",
      width: "30%",
    },
    {
      title: "Department",
      dataIndex: "department",
      width: "30%",
    },

    {
      title: "Action",
      dataIndex: "y",
      key: "y",
      render: (_, record) => (
        <a
          onClick={() => {
            setIsModalOpen(true);
            setInputValue({
              name: record.name,
              department: record.department,
              mobileNo: record.mobileNo,
            });

            setModalData(record);
          }}
        >
          Edit
        </a>
      ),
    },
    {
      title: "Action",
      dataIndex: "x",
      key: "x",
      render: (_, record) => (
        <a
          onClick={() => {
            deleteRecord(record);
          }}
        >
          Delete
        </a>
      ),
    },
  ];

  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };
  //when employee is added
  const onSuccess = (e) => {
    setData((pre) => [...pre, e.data]);
    setCopyData((pre) => [...pre, e.data]);
    openNotification("Added data");
    setNewInputValue({ name: "", mobileNo: "", department: "" });
  };
  //call api to send data
  const sendItem = (item) => {
    console.log(newInputValue);
    if (newInputValue.name !== "" && newInputValue.department !== "") {
      addNewEmployee({
        onSuccess,
        name: newInputValue.name,
        department: newInputValue.department,
        mobileNo: newInputValue.mobileNo,
      });
    }
  };
  //fetch data
  const dataFetched = (e) => {
    console.log(e);
    setData(e.data);
    setCopyData(e.data);
    setIsLoading(false);
  };
  //when delete is called
  const deleteRecord = (record) => {
    deleteEmployeeData({ onDeleteSuccess, id: record._id });
  };
  //when delete is successful
  const onDeleteSuccess = (xx) => {
    const tempData = copyData.filter((e) => {
      return e._id !== xx;
    });
    const tempData1 = data.filter((e) => {
      return e._id !== xx;
    });
    setCopyData(tempData);
    setData(tempData1);
    openNotification("Deleted successfully");
  };
  const updateEmployee = () => {
    updateEmployeeData({
      id: modalData._id,
      name: inputValue.name,
      department: inputValue.department,
      mobileNo: inputValue.mobileNo,
    });
    const modifiedData = data.map((item, index) => {
      if (item._id === modalData._id) {
        //calling update appi
        const updatedItem = {
          ...item,
          name: inputValue.name,
          department: inputValue.department,
          mobileNo: inputValue.mobileNo,
        };
        return updatedItem;
      }
      return item;
    });
    setData(modifiedData);
    setCopyData(modifiedData);
    openNotification("Updated successfully");
  };
  return !isLoading ? (
    <div>
      {contextHolder}
      <Navbar />
      <div className="mx-5">
        <div className="w-full gap-5 justify-center mx-auto my-2 flex ">
          <input
            onChange={(e) => {
              const filteredResults = copyData.filter((item) =>
                item.name.toLowerCase().includes(e.target.value.toLowerCase())
              );
              setData(filteredResults);
            }}
            placeholder="search by name"
            className="border p-1"
          />
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-blue-500 px-3 py-1 rounded"
          >
            Add new employee
          </button>
        </div>
        <Table columns={columns} dataSource={data} onChange={onChange} />
        {/* for add modal */}
        {isAddModalOpen && (
          <GlobalModal
            type="add"
            setInputValue={setNewInputValue}
            inputValue={newInputValue}
            // modalData={modalData}
            onClick={sendItem}
            isModalOpen={isAddModalOpen}
            setIsModalOpen={setIsAddModalOpen}
          />
        )}
        {/* for update modal */}
        {isModalOpen && (
          <GlobalModal
            type="update"
            setInputValue={setInputValue}
            inputValue={inputValue}
            onClick={updateEmployee}
            modalData={modalData}
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
          />
        )}
      </div>
    </div>
  ) : (
    <Loader />
  );
};
export default Home;
