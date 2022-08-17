import logo from '../assets/images/efsslogo.png'
import { Logo } from '../components'
import main from '../assets/images/main.svg'
import Wrapper from '../assets/wrappers/LandingPage'

import { Link } from 'react-router-dom'



export const Landing = () => {
  return (
    <Wrapper>
        <main>
        <nav>
            <Logo logo={logo}></Logo>
        </nav>
        <div className='container page'>
            <div className='info'>
                <h1>Client <span>Tracking</span> app</h1> 
                <p>
                EFSS Secure Private Limited provides you the best range of cctv, fire extinguisher & fire safety dealers with effective & timely delivery.
                </p>
                <Link to='/register' className='btn btn-hero'> Login </Link>
            </div>
            <img src={main} alt='job hunt' className='img main-img'></img>
        </div>
    </main>
    </Wrapper>
  )
}





