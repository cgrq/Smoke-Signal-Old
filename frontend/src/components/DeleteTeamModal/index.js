import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteTeamThunk } from "../../store/teams";
import "./DeleteTeamModal.css";

function DeleteTeamModal({ type, title }) {
  const dispatch = useDispatch();
  const currentTeam = useSelector(state => state.teams.currentTeam);
  const { closeModal } = useModal();


  const handleDelete = async () => {
    const data = await dispatch(deleteTeamThunk({ id: currentTeam.id }));

    if (data) {
      setErrors(data);
    } else {
      closeModal();
    }

  };

  return (
    <>
      <h1>Delete this team?</h1>


        <button>Delete</button>
        <button onClick={closeModal}>Cancel</button>

    </>
  );
}

export default DeleteTeamModal;
