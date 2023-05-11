import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import "./Navigation.css";

import { Link } from "react-router-dom";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    // console.log("profile button push -----------> ", showMenu)
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    closeMenu();

  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");


  return (
    <>
      <button className="profile-icon-button" onClick={openMenu}>
        <i className="fas fa-user-circle profile-icon" />
      </button>
      <div className={`${ulClassName} profile-list`} ref={ulRef}>
        <div className={user ? "nav-upper-container" : "hidden"}>
          {
            user
            && (
              <>
                <div>Hello, {user.firstName}</div>
                <div className="nav-user-email">{user.email}</div>
              </>
            )
          }
        </div>
        <div className={`nav-lower-container nav-links ${!user ? `nav-lower-container-logged-out` :""}`}>
          {
            user
              ? (
                <button onClick={handleLogout}>Log Out</button>
              )
              : (
                <>
                  <OpenModalButton
                    buttonText="Log In"
                    onButtonClick={closeMenu}
                    modalComponent={<LoginFormModal />}
                  />
                  <OpenModalButton
                    buttonText="Sign Up"
                    onButtonClick={closeMenu}
                    modalComponent={<SignupFormModal />}
                  />
                </>
              )
          }

        </div>
      </div>
    </>
  );
}

export default ProfileButton;
