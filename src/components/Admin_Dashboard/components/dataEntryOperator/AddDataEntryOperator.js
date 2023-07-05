import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddDataEntryOperator = ({ alert }) => {
  const [addFormData, setAddFormData] = useState({
    Name: "",
    Phone: "",
    Address: "",
    Aadhar: "",
    Password: "",
    rePassword: "",
  });

  const navigate = useNavigate();
  const addUser = async (newUser) => {
    const res = await fetch("http://localhost:5000/api/admin/adduser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },

      body: JSON.stringify(newUser),
    });

    const jsonData = await res.json();
    console.log(jsonData);
    return jsonData;
  };

  const addDataEntryOperator = async (newDataEntryOperator) => {
    const res = await fetch(
      "http://localhost:5000/api/admin/adddataentryoperator",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },

        body: JSON.stringify(newDataEntryOperator),
      }
    );

    const jsonData = await res.json();

    return jsonData;
  };

  const handleAddFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
  };

  const handleAddFormSubmit = async(event) => {
    event.preventDefault();
    const regexp = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    if (addFormData.Password !== addFormData.rePassword) {
      alert("Password mismatch", "danger");
      return;
    } else if (!regexp.test(addFormData.Password)) {
      alert(
        "Password must contain a letter, a number, a special character and, should be between 6-16 characters",
        "danger"
      );
      return;
    }
    const newUser = {
      Aadhar: addFormData.Aadhar,
      Password: addFormData.Password,
      Type: 1,
      Status: 1,
    };
    var jsonData = await addUser(newUser);
    if (jsonData.error) {
      console.log(jsonData.error);
      alert("Error adding data entry operator", "danger");
      return;
    }
    const newDataEntryOperator = {
      DataEntryOpID: jsonData.ID,
      Name: addFormData.Name,
      Phone: addFormData.Phone,
      Address: addFormData.Address,
    };
    console.log(newDataEntryOperator);
    jsonData = await addDataEntryOperator(newDataEntryOperator);
    if (jsonData.error) {
      console.log(jsonData.error);
      alert("Error adding data entry operator", "danger");
      return;
    }
    alert(
      "Added " +
        newDataEntryOperator.Name +
        " with Employee ID: " +
        newDataEntryOperator.DataEntryOpID,
      "success"
    );
    navigate("/admin/dataentry");
  };

  return (
    <div style={{ padding: "2rem 37rem" }}>
      <h1 style={{ textAlign: "center" }} className="mt-3">
        Add a Data Entry Operator
      </h1>
      <form
        className="container-sm form-control shadow bg-body p-3 mb-5"
        onSubmit={handleAddFormSubmit}
      >
        <div className="form-outline mb-4">
          <input
            className="form-control"
            type="text"
            name="Name"
            required="required"
            placeholder="Enter a name..."
            onChange={handleAddFormChange}
          />
        </div>
        <div className="form-outline mb-4">
          <input
            className="form-control"
            type="text"
            name="Aadhar"
            pattern="[0-9]{12}"
            required="required"
            placeholder="Enter aadhar number (12-digit)..."
            onChange={handleAddFormChange}
          />
        </div>
        <div className="form-outline mb-4">
          <input
            className="form-control"
            type="tel"
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
            name="Phone"
            required="required"
            placeholder="Enter a phone number (XXX-XXX-XXXX)..."
            onChange={handleAddFormChange}
          />
        </div>
        <div className="form-outline mb-4">
          <input
            className="form-control"
            type="text"
            name="Address"
            required="required"
            placeholder="Enter an address..."
            onChange={handleAddFormChange}
          />
        </div>
        <div className="form-outline mb-4">
          <input
            className="form-control"
            type="password"
            name="Password"
            required="required"
            placeholder="Enter a password..."
            onChange={handleAddFormChange}
          />
        </div>
        <div className="form-outline mb-4">
          <input
            className="form-control"
            type="password"
            name="rePassword"
            required="required"
            placeholder="Confirm password..."
            onChange={handleAddFormChange}
          />
        </div>
        <button className="btn btn-primary row col-sm-12 m-1" type="submit">
          Add
        </button>
        <button
          className="btn btn-danger row col-sm-12 m-1"
          onClick={() => {
            navigate("/admin/dataentry");
          }}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};
export default AddDataEntryOperator;
