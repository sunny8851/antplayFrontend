import React from "react";
import { Modal } from "antd";
import { updateItem } from "../api/getItemList";
const GlobalModal = (props) => {
  const handleOk = () => {
    //when it is for update
    if (
      (props.type === "update" && props.inputValue.name !== "",
      props.inputValue.description !== "")
    ) {
      updateItem({
        id: props.modalData._id,
        name: props.inputValue.name,
        description: props.inputValue.description,
      });
    } else {
      //for adding item
      props.onClick();
    }
    props.setIsModalOpen(false);
  };
  const handleCancel = () => {
    props.setIsModalOpen(false);
  };
  return (
    <>
      <Modal open={props.isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <input
          onChange={(e) =>
            props.setInputValue((prevInputValue) => ({
              ...prevInputValue,
              name: e.target.value,
            }))
          }
          value={props.inputValue.name}
          className="border-2 px-1 rounded mt-2"
          placeholder="Enter Name"
        />{" "}
        <input
          onChange={(e) =>
            props.setInputValue((prevInputValue) => ({
              ...prevInputValue,
              description: e.target.value,
            }))
          }
          value={props.inputValue.description}
          className="border-2 px-1 rounded mt-2"
          placeholder="Enter description"
        />
      </Modal>
    </>
  );
};
export default GlobalModal;
