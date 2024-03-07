import React from "react";
import { Modal, Select } from "antd";
const GlobalModal = (props) => {
  console.log(props.type);
  const handleOk = () => {
    props.onClick();
    props.setIsModalOpen(false);
  };
  const handleCancel = () => {
    props.setIsModalOpen(false);
  };
  return (
    <>
      <Modal
        className="!w-[650px]"
        destroyOnClose
        open={props.isModalOpen}
        footer={null}
        onCancel={handleCancel}
      >
        <form onSubmit={handleOk}>
          <div>
            <input
              required
              onChange={(e) =>
                props.setInputValue((prevInputValue) => ({
                  ...prevInputValue,
                  name: e.target.value,
                }))
              }
              value={props.inputValue.name}
              className="h-8 border-2 px-1 rounded mt-2"
              placeholder="Enter Name"
            />{" "}
            <input
              required
              onChange={(e) =>
                props.setInputValue((prevInputValue) => ({
                  ...prevInputValue,
                  mobileNo: e.target.value,
                }))
              }
              type="number"
              value={props.inputValue.mobileNo}
              className="h-8 border-2 px-1 rounded mt-2"
              placeholder="Enter Mobile Number"
            />{" "}
            <Select
              defaultValue={props.inputValue.department}
              placeholder="Select department"
              style={{
                width: 200,
              }}
              onChange={(value) =>
                props.setInputValue((prevInputValue) => ({
                  ...prevInputValue,
                  department: value,
                }))
              }
              options={[
                {
                  value: "Engineering",
                  label: "Engineering",
                },
                {
                  value: "Account",
                  label: "Account",
                },
                {
                  value: "Sales",
                  label: "Sales",
                },
              ]}
            />
          </div>
          <div className="flex justify-end w-full">
            <button
              type="submit"
              className="bg-blue-500 mr-14 rounded mt-5 px-3 py-1"
            >
              Ok
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};
export default GlobalModal;
