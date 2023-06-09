import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import UserFormModal from "../UserFormModal";
import DeleteUserModal from "../DeleteUserModal";
import "./Navigation.css";


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

  const closeMenu = () => {setShowMenu(false)};

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    closeMenu();
  };

  return (
    <>
      <button className="profile-icon-button" onClick={openMenu}>
        <i className="fas fa-user-circle profile-icon" />
      </button>
      <div className={`${"profile-dropdown" + (showMenu ? "" : " hidden")} profile-list`} ref={ulRef}>
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
        <div className={`nav-lower-container nav-links ${!user ? `nav-lower-container-logged-out` : ""}`}>
          {
            user && (
              <div>
                <OpenModalButton
                  fillBackground={false}
                  buttonText="Edit"
                  onButtonClick={closeMenu}
                  modalComponent={<UserFormModal componentType={"update"} />}
                />
                <OpenModalButton
                  fillBackground={false}
                  buttonText="Delete"
                  onButtonClick={closeMenu}
                  modalComponent={<DeleteUserModal />}
                />
                <button onClick={handleLogout}>Log Out</button>
              </div>
            )
          }
        </div>
      </div>
    </>
  );
}

export default ProfileButton;


