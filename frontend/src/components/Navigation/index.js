import React, { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getCurrentTeamThunk } from "../../store/teams";
import OpenModalButton from "../OpenModalButton";
import TeamFormModal from "../TeamFormModal";
import ProfileButton from "./ProfileButton";
import SelectTeamField from "../SelectTeamField/Index";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const dispatch = useDispatch();
  const [currentTeamId, setCurrentTeamId] = useState(0);
  const [errors, setErrors] = useState({});

  const sessionUser = useSelector((state) => state.session.user);
  const sessionUserTeams = useSelector(
    (state) => state.session.user && state.session.user.teams
  );

  useEffect(() => {
    if (sessionUser && sessionUser.teams) {
      const teamId = sessionUser.teams[sessionUser.teams.length - 1].id;
      setCurrentTeamId(() => teamId);
      dispatch(getCurrentTeamThunk(teamId));
    }
  }, [sessionUser, sessionUserTeams]);

  const handleTeamSelect = async (e) => {
    setCurrentTeamId(e.target.value);
    const data = await dispatch(getCurrentTeamThunk(e.target.value));

    if (data) {
      setErrors(data);
    }
  };

  return (
    <ul>
      <li>
        <NavLink exact to="/">
          Home
        </NavLink>
      </li>
      {sessionUser ? (
        <>
          <li>
            <SelectTeamField
              label="Select team"
              value={currentTeamId}
              onChange={handleTeamSelect}
              choices={sessionUser.teams}
              placeholder="Choose team"
            />
          </li>
          <li>
            <OpenModalButton
              buttonText="Update current team"
              modalComponent={
                <TeamFormModal type="update" title="Update team" />
              }
            />
          </li>
          <li>
            <OpenModalButton
              buttonText="Create a Team"
              modalComponent={
                <TeamFormModal type="create" title="Create a new team!" />
              }
            />
          </li>
        </>
      ) : null}

      <li>
        <Link to={`/channels/new`}>Create New Channel</Link>
      </li>

      {isLoaded && (
        <li>
          <ProfileButton user={sessionUser} />
        </li>
      )}
    </ul>
  );
}

export default Navigation;
