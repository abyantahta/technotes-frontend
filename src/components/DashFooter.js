import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse } from '@fortawesome/free-solid-svg-icons'
import { useNavigate, useLocation } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const DashFooter = () => {

    const navigate = useNavigate()
    const {pathname} = useLocation()
    const {username,status} = useAuth()
    const onGoHomeClicked = ()=> navigate('/dash')
    let goHomeButton = null
    if(pathname !== '/dash'){
        goHomeButton = (
            <button
             className='dash-footer__button icon-button'
             title='Home'
             onClick={onGoHomeClicked}
             >
            <FontAwesomeIcon icon={faHouse}/>        

            </button>
        )
    }
    const content = (
        <footer className=' bg-primaryDarker absolute bottom-0 left-0 w-full h-16 px-24 flex items-center gap-8'>
            {goHomeButton}
            <p>Current User :   <b>{username}</b></p>
            <p>Status : <b> {status}</b></p>
        </footer>
    )

    return content
}
export default DashFooter
