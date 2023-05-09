import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { createNewTeamThunk, updateTeamThunk, getAllTeamsThunk } from "../../store/teams";
import InputField from "../InputField";
import Button from "../Button";
import "./TeamFormModal.css";

function TeamFormModal({ type, title }) {
  const dispatch = useDispatch();
  const currentTeam = useSelector(state => state.teams.currentTeam);
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  useEffect(() => {
    if (type === "update" && currentTeam) {
      setName(currentTeam.name);
      setImageUrl(currentTeam.image_url);
    }
  }, [currentTeam]);

  useEffect(() => {
    dispatch(getAllTeamsThunk())
  }, [currentTeam]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let data;
    if (type === 'create') {
      data = await dispatch(createNewTeamThunk({ name, imageUrl }));
    } else {
      data = await dispatch(updateTeamThunk({ id: currentTeam.id, name, imageUrl }));
    }

    if (data) {
      setErrors(data);
    } else {
      closeModal();
    }

  };

  return (
    <>
      <h1>{title}</h1>
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

        <button type="submit">{type === 'create' ? 'Create ' : 'Update '}Team</button>

      </form>
    </>
  );
}

export default TeamFormModal;
