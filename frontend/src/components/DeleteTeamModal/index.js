import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteTeamThunk, getUserTeamsThunk } from "../../store/teams";
import "./DeleteTeamModal.css";

function DeleteTeamModal({ type, title }) {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState([]);
  const currentTeam = useSelector(state => state.teams.currentTeam);
  const sessionUser = useSelector((state) => state.session.user);
  const { closeModal } = useModal();


  const handleDelete = async () => {
    const data = await dispatch(deleteTeamThunk(currentTeam.id));


    if (data) {
      setErrors(data);
    } else {
      await dispatch(getUserTeamsThunk(sessionUser.id))
      closeModal();
    }

  };

  return (
    <>
      <h1>Delete this team?</h1>


        <button onClick={handleDelete}>Delete</button>
        <button onClick={closeModal}>Cancel</button>

    </>
  );
}

export default DeleteTeamModal;
