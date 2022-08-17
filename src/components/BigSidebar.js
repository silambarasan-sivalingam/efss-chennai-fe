import { useAppContext } from '../context/appContext'
import NavLinks from './NavLinks'
import logo from '../assets/images/efsslogo.png'
import { Logo } from '../components'
import Wrapper from '../assets/wrappers/BigSidebar'

const BigSidebar = () => {
  const { showSidebar } = useAppContext()
  return (
    <Wrapper>
      <div
        className={
          showSidebar ? 'sidebar-container ' : 'sidebar-container show-sidebar'
        }
      >
        <div className='content'>
          <header>
          <Logo logo={logo}></Logo>
          </header>
          <NavLinks />
        </div>
      </div>
    </Wrapper>
  )
}

export default BigSidebar
