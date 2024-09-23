import { useRef, useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setCredentials } from './authSlice'
import { useLoginMutation } from './authApiSlice'
import usePersist from '../../hooks/usePersist'
import { PulseLoader } from 'react-spinners'
import useTitle from '../../hooks/useTitle'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'
const Login = () => {
    useTitle('Login')
    const userRef = useRef()
    const errRef = useRef()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errMsg, setErrMsg] = useState('')
    const [persist,setPersist] = usePersist()

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [login, { isLoading }] = useLoginMutation()

    useEffect(() => {
        userRef.current.focus()
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [username, password])


    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { accessToken } = await login({ username, password }).unwrap()
            dispatch(setCredentials({ accessToken }))
            setUsername('')
            setPassword('')
            navigate('/dash')
        } catch (err) {
            if (!err.status) {
                setErrMsg('No Server Response');
            } else if (err.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg(err.data?.message);
            }
            errRef.current.focus();
        }
    }

    const handleUserInput = (e) => setUsername(e.target.value)
    const handlePwdInput = (e) => setPassword(e.target.value)
    const handleToggle = ()=> setPersist(prev => !prev)

    const errClass = errMsg ? "bg-red-400 text-center font-bold py-1 text-white mt-6 rounded-md -mb-4" : "offscreen"

    if (isLoading) return <PulseLoader color={'#FFF'} />

    const content = (
        <section className="h-full flex flex-col items-center relative mt-20">
            <div className=' bg-primaryBrown rounded-full flex items-center justify-center w-16 h-16'>
                <Link to="/" className=''>
                <FontAwesomeIcon size='2x' color='white' icon={faHome}></FontAwesomeIcon>
                </Link>
            </div>
            <header>
                <h1 className='text-primaryBlue text-5xl font-bold [text-shadow:_0_4px_7px_rgb(0_0_0_/_40%)]'>Employee Login</h1>
            </header>
            <main className="login w-[500px]">
                <p ref={errRef} className={errClass} aria-live="assertive">{errMsg}
                </p>

                <form className="form flex flex-col mt-8 w-full " onSubmit={handleSubmit} >
                    {/* <label htmlFor="username">Username:</label> */}
                    <input
                        className="py-2 pl-4 outline-none rounded-md border-primaryBrown border-solid border-2 font-semibold text-primaryBlue"
                        type="text"
                        id="username"
                        ref={userRef}
                        value={username}
                        onChange={handleUserInput}
                        autoComplete="off"
                        required
                        placeholder='Input username...'
                    />

                    {/* <label htmlFor="password">Password:</label> */}
                    <input
                        className="py-2 pl-4 outline-none rounded-md border-primaryBrown border-solid border-2 mt-4 font-semibold text-primaryBlue"
                        type="password"
                        id="password"
                        onChange={handlePwdInput}
                        value={password}
                        required
                        placeholder='Input password...'
                    />
                    <label htmlFor="persist" className='mt-3'>
                        <input type="checkbox" className='form__checkbox' id="persist" onChange={handleToggle} checked={persist}/>
                        <span className='ml-2'>
                            Trust this Device
                            </span>
                    </label>
                    <button className="form__submit-button w-full bg-primaryBrown rounded-md font-bold text-white py-2 mt-4">Login</button>
                </form>
            </main>
        </section>
    )

    return content
}
export default Login