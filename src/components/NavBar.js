import React, {useState} from 'react'
import Wrapper from '../assets/wrappers/Navbar'
import logo from '../assets/images/efsslogo.png'
import { Logo } from '../components'
import { FaAlignLeft, FaUserCircle, FaCaretDown } from 'react-icons/fa'
import { useAppContext } from '../context/appContext'


export default function NavBar() {

  const [showLogout, setShowLogout] = useState(false)

  const { toggleSidebar, logoutUser, user } = useAppContext()

  return (
    <Wrapper>
      <div className='nav-center'>

        <button className='toggle-btn'  onClick={toggleSidebar}>
        <FaAlignLeft/>
        </button>
        <div>
          <Logo logo={logo}/>
          <h3 className='logo-text'>dashboard</h3>
        </div>
        <div className='btn-container'>
          <button 
            type='button' 
            className='btn'
            onClick={()=>  setShowLogout(!showLogout) }
            >
              <FaUserCircle/>
              {user?.name}
              <FaCaretDown/>
            </button>
            <div className= {showLogout? 'dropdown show-dropdown' : 'dropdown' }>
              <button 
                  type='button'
                  className='dropdown-btn'
                  onClick={logoutUser}
              > logout</button>
            </div>
        </div>
      </div>
   
    </Wrapper>
  )
}
