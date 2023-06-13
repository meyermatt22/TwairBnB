import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import { NavLink, useHistory } from "react-router-dom";


function ProfileButton({ user }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
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

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    closeMenu();
    history.push('/')
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <>
    <button  onClick={openMenu} id="rightSide" >
    <img className="hamburger" src="https://i.imgur.com/7a22DTd.png" alt=""/>
    </button>
      <div  className={ulClassName} ref={ulRef}>
        {user ? (
          <div className="LSmodalButtons2">
            <div>Hello, {user.firstName}</div>
            <div>{user.email}</div>
            <NavLink to={`/spots/current`} className='navLink'>
              Manage Spots
            </NavLink>
            <div>
              <button onClick={logout} className="logoutB">Log Out</button>
            </div>
          </div>
        ) : (
          <div className="LSmodalButtons">
            <div className="buttons2">
              <OpenModalButton
                id="loginB"
                buttonText="Log In"
                onButtonClick={closeMenu}
                modalComponent={<LoginFormModal />}
                />
            </div>
            <div className="buttons2">
              <OpenModalButton
                id="signupB"
                buttonText="Sign Up"
                onButtonClick={closeMenu}
                modalComponent={<SignupFormModal />}
              />
            </div>
          </div>
        )}
      </div>


    </>
  );
}

export default ProfileButton;
