import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { createNewTeamThunk } from "../../store/teams";
import InputField from "../InputField";
import Button from "../Button";
import "./CreateTeamModal.css";

function CreateTeamModal() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  useEffect(()=>{
    console.table({name,imageUrl})

  }, [name,imageUrl])

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log("ON CLICK SUCCESSFUL ~~~~~~~~~~~~~")
    const data = await dispatch(createNewTeamThunk({name, imageUrl}));
    console.log(`🖥 ~ file: index.js:19 ~ handleSubmit ~ data:`, data)
    if (data) {
      setErrors(data);
    } else {
      closeModal();
    }

  };



  return (
    <>
      <h1>Create a new team!</h1>
      <form onSubmit={(e)=>handleSubmit(e)}>
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

        <InputField
          label="Team Image"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="Image to represent the team"
          required={false}
        />

        <button type="submit">Create Team</button>

      </form>
    </>
  );
}

export default CreateTeamModal;
