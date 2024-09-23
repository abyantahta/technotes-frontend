import { Link } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import { 
    faRightFromBracket,
    faFilePen,
    faFileCirclePlus,
    faUserGear,
    faUserPlus

} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
const Welcome = () => {
    const {username,isManager,isAdmin} = useAuth()
    const date = new Date()
    const today = new Intl.DateTimeFormat('en-US', { dateStyle: 'full', timeStyle: 'long' }).format(date)

    const content = (
        <section className="welcome flex flex-col justify-center items-center pt-24">

            <p>{today}</p>

            {/* <h1>Welcome {username}!</h1> */}
            <p className='bg-primaryDarker px-6 text-primaryBlue font-bold text-2xl '>Hello !</p>
            <h1 className='text-primaryBlue text-8xl font-bold [text-shadow:_0_4px_7px_rgb(0_0_0_/_40%)]'>{username}</h1>

            <div className="flex gap-10 mt-10">
                <Link to="/dash/notes" className={'w-64 h-20 bg-white flex items-center justify-center font-bold rounded-md text-primaryBrown text-xl hover:bg-primaryDarker hover:duration-100 hover:text-white'}>
                <FontAwesomeIcon className='mr-2' size='2x' icon={faFilePen}></FontAwesomeIcon>
                View Notes
                </Link>
                <Link to="/dash/notes/new" className={'w-64 h-20 bg-white flex items-center justify-center font-bold rounded-md text-primaryBrown text-xl hover:bg-primaryDarker hover:duration-100 hover:text-white'}>
                <FontAwesomeIcon className='mr-2' size='2x' icon={faFileCirclePlus}></FontAwesomeIcon>
                Add New Note
                </Link>
            </div>
            <div className="">
                {
                    (isAdmin || isManager) && (
                        <div className='flex gap-10 mt-10'>
                            <Link to="/dash/users" className={'w-64 h-20 bg-white flex items-center justify-center font-bold rounded-md text-primaryBrown text-xl hover:bg-primaryDarker hover:duration-100 hover:text-white'}>
                            <FontAwesomeIcon className='mr-2' size='2x' icon={faUserGear}></FontAwesomeIcon>
                            View User Settings
                            </Link>
                            <Link to="/dash/users/new" className={'w-64 h-20 bg-white flex items-center justify-center font-bold rounded-md text-primaryBrown text-xl hover:bg-primaryDarker hover:duration-100 hover:text-white'}>
                            <FontAwesomeIcon className='mr-2' size='2x' icon={faUserPlus}></FontAwesomeIcon>
                            Add New User
                            </Link>
                        </div>
                    )
                }
            </div>


        </section>
    )

    return content
}
export default Welcome