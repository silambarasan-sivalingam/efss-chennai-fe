import React from "react";
import Wrapper from "../assets/wrappers/SmallSidebar";
import { FaTimes } from "react-icons/fa";
import { useAppContext } from "../context/appContext";
import logo from '../assets/images/efsslogo.png'
import { Logo } from '../components'
import NavLinks from "./NavLinks";

export default function SmallSidebar() {
  const { showSidebar, toggleSidebar } = useAppContext();
  return (
    <Wrapper>
      <div
        className={
          showSidebar ? "sidebar-container show-sidebar" : "sidebar-container"
        }
      >
        <div className='content'>
          <button type='button' className='close-btn' onClick={toggleSidebar}>
            <FaTimes />
          </button>
          <header>
            <Logo logo={logo} />
          </header>
              <NavLinks toggleSidebar={toggleSidebar}></NavLinks>
        </div>
      </div>
    </Wrapper>
  );
}
