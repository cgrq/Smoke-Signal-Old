import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import InputField from "../InputField";
import SelectField from "../SelectField/Index";
import "./CreateTeamModal.css";

function CreateTeamModal() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      const data = await dispatch(signUp(username, email, password, firstName, lastName, profileImageUrl));
      if (data) {
        setErrors(data);
      } else {
        closeModal();
      }
    } else {
      setErrors([
        "Confirm Password field must be the same as the Password field",
      ]);
    }
  };

  return (
    <>
      <h1>Create a new team!</h1>
      <form onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>

        <InputField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Team name"
          required={true}
        />

        <SelectField
          label="Type"
          value={type}
          onChange={(e) => setType(e.target.value)}
          placeholder="Team name"
          required={true}
        />



        <button type="submit">Create Team</button>
      </form>
    </>
  );
}

export default CreateTeamModal;
