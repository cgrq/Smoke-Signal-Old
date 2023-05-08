import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import OpenModalButton from "../OpenModalButton";
import CreateTeamModal from "../CreateTeamModal";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <ul>
      <li>
        <NavLink exact to="/">
          Home
        </NavLink>
      </li>

      <li>
        <OpenModalButton
          buttonText="Create a Team"
          modalComponent={<CreateTeamModal />}
        />
      </li>

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
