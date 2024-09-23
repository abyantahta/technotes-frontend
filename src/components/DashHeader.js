import { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faRightFromBracket,
    faFilePen,
    faFileCirclePlus,
    faUserGear,
    faUserPlus

} from "@fortawesome/free-solid-svg-icons"
import { useNavigate, Link, useLocation } from 'react-router-dom'
import { useSendLogoutMutation } from '../features/auth/authApiSlice'
import useAuth from '../hooks/useAuth'
import { PulseLoader } from 'react-spinners'
// PulseLoader


const DASH_REGEX = /^\/dash(\/)?$/
const NOTES_REGEX = /^\/dash\/notes(\/)?$/
const USERS_REGEX = /^\/dash\/users(\/)?$/

const DashHeader = () => {

    const {isManager, isAdmin} = useAuth()
    const navigate = useNavigate()
    const { pathname } = useLocation()

    const [sendLogout, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useSendLogoutMutation()

    useEffect(() => {
        console.log(isSuccess)
        if (isSuccess){
            navigate('/')
        }
    }, [isSuccess, navigate])

    const onNewNoteClicked = ()=> navigate('/dash/notes/new')
    const onNotesClicked = ()=> navigate('/dash/notes')
    const onNewUserClicked = ()=> navigate('/dash/users/new')
    const onUsersClicked = ()=> navigate('/dash/users')

    if (isLoading) return <PulseLoader color={'#FFF'} />

    if (isError) return <p>Error: {error.data?.message}</p>

    let dashClass = null
    if (!DASH_REGEX.test(pathname) && !NOTES_REGEX.test(pathname) && !USERS_REGEX.test(pathname)) {
        dashClass = "dash-header__container--small"
    }

    let newNoteButton = null
    if(NOTES_REGEX.test(pathname)){
        newNoteButton = (
            <button
                className='icon-button'
                title='New Note'
                onClick={onNewNoteClicked}
            >
                <FontAwesomeIcon size='2x' color='#295F98' icon={faFileCirclePlus}/>
            </button>
        )
    }
    let newUserButton = null
    if(USERS_REGEX.test(pathname)){
        newUserButton = (
            <button
                className='icon-button'
                title='New User'
                onClick={onNewUserClicked}
            >
                <FontAwesomeIcon size='2x' color='#295F98' icon={faUserPlus}/>
            </button>
        )
    }

    let userButton = null
    if(isManager || isAdmin){
        if(!USERS_REGEX.test(pathname) && pathname.includes('/dash')){
            userButton = (
                <button
                    className='icon-button'
                    title='Users'
                    onClick={onUsersClicked}
                >
                    <FontAwesomeIcon size='2x' color='#295F98' icon={faUserGear}/>
                </button>
            )
        }
    }

    let noteButton = null
    if(!NOTES_REGEX.test(pathname) && pathname.includes('/dash')){
        noteButton = (
            <button
                className='icon-button'
                title='Notes'
                onClick={onNotesClicked}
            >
                <FontAwesomeIcon size='2x' color='#295F98' icon={faFilePen}/>
            </button>
        )
    }

    const logoutButton = (
        <button
            className="icon-button"
            title="Logout"
            onClick={sendLogout}
        >
            <FontAwesomeIcon size='2x' color='#295F98' icon={faRightFromBracket} />
        </button>
    )


    const errClass = isError ? "errmsg" : "offscreen"
    let buttonContent
    if(isLoading){
        buttonContent = <p>Logging Out...</p>
    }else {
        buttonContent = (
            <div className='flex gap-4'>
                {newNoteButton}
                {newUserButton}
                {noteButton}
                {userButton}
                {logoutButton}
            </div>
        )
    }

    const content = (
        <>
            <p className={errClass}>{error?.data?.message}</p>
            <header className="dash-header bg-primaryDarker absolute top-0 left-0 w-full h-16">
                <div className={` px-28 flex items-center justify-between h-full ${dashClass}`}>
                    <Link to="/dash">
                        <h1 className="dash-header__title font-bold text-3xl text-primaryBlue">Bengkel Laptop</h1>
                    </Link>
                    <nav className="dash-header__nav">
                        {/* add more buttons later */}
                        {buttonContent}
                    </nav>
                </div>
            </header>
        </>
    )

    return content
}
export default DashHeader