import { useState, useEffect } from "react"
import { useAddNewUserMutation } from "./usersApiSlice"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from "@fortawesome/free-solid-svg-icons"
import { ROLES } from "../../config/roles"
import useTitle from "../../hooks/useTitle"

const USER_REGEX = /^[A-z]{3,20}$/
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/

const NewUserForm = () => {
    useTitle('Add New User')

    const [addNewUser, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNewUserMutation()

    const navigate = useNavigate()

    const [username, setUsername] = useState('')
    const [validUsername, setValidUsername] = useState(false)
    const [password, setPassword] = useState('')
    const [validPassword, setValidPassword] = useState(false)
    const [roles, setRoles] = useState(["Employee"])

    useEffect(() => {
        setValidUsername(USER_REGEX.test(username))
    }, [username])

    useEffect(() => {
        setValidPassword(PWD_REGEX.test(password))
    }, [password])

    useEffect(() => {
        if (isSuccess) {
            setUsername('')
            setPassword('')
            setRoles([])
            navigate('/dash/users')
        }
    }, [isSuccess, navigate])

    const onUsernameChanged = e => setUsername(e.target.value)
    const onPasswordChanged = e => setPassword(e.target.value)

    const onRolesChanged = e => {
        const values = Array.from(
            e.target.selectedOptions, //HTMLCollection 
            (option) => option.value
        )
        setRoles(values)
    }

    const canSave = [roles.length, validUsername, validPassword].every(Boolean) && !isLoading

    const onSaveUserClicked = async (e) => {
        e.preventDefault()
        if (canSave) {
            await addNewUser({ username, password, roles })
        }
    }

    const options = Object.values(ROLES).map(role => {
        return (
            <option
                key={role}
                value={role}

            > {role}</option >
        )
    })

    const errClass = isError ? "errmsg" : "offscreen"
    const validUserClass = !validUsername ? 'form__input--incomplete' : ''
    const validPwdClass = !validPassword ? 'form__input--incomplete' : ''
    const validRolesClass = !Boolean(roles.length) ? 'form__input--incomplete' : ''


    const content = (
        <>
            <p className={errClass}>{error?.data?.message}</p>

            <form className="form flex flex-col w-1/2 mx-auto" onSubmit={onSaveUserClicked}>
                {/* <div className="form__title-row"> */}
                <p className='bg-primaryDarker px-6 text-primaryBlue font-bold text-4xl text-center w-64 py-1 mx-auto mb-10 mt-8 [text-shadow:_0_2px_5px_rgb(0_0_0_/_40%)] '>Create User</p>

                {/* </div> */}
                {/* <label className="form__label" htmlFor="username">
                    Username: <span className="nowrap">[3-20 letters]</span></label> */}
                <input
                    className="py-3 pl-4 outline-none rounded-md border-primaryBrown border-solid border-2 font-semibold text-primaryBlue"
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="off"
                    value={username}
                    onChange={onUsernameChanged}
                    placeholder="Input Username..."
                />

                {/* <label className="form__label" htmlFor="password">
                    Password: <span className="nowrap">[4-12 chars incl. !@#$%]</span></label> */}
                <input
                    className="mt-4 py-3 pl-4 outline-none rounded-md border-primaryBrown border-solid border-2 font-semibold text-primaryBlue"
                    id="password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={onPasswordChanged}
                    placeholder="Input Password"
                />

                <label className="text-center my-2 font-bold text-primaryBlue" htmlFor="roles">
                    ASSIGNED ROLES:</label>
                <select
                    id="roles"
                    name="roles"
                    className=" h-auto text-center font-semibold border-primaryBrown border-solid border-2 rounded-md"
                    multiple={true}
                    size="3"
                    value={roles}
                    onChange={onRolesChanged}
                >
                    {options}
                </select>
                <div className="form__action-buttons">
                    <button
                        className={` w-full mt-4 py-1 font-bold text-xl rounded-md  ${canSave?'bg-primaryBrown text-white':'bg-gray-300 text-gray-100'}`}
                        title="Save"
                        disabled={!canSave}
                    >
                        Create
                        {/* <FontAwesomeIcon icon={faSave} /> */}
                    </button>
                </div>
            </form>
        </>
    )

    return content
}
export default NewUserForm