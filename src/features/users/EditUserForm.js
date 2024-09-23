import { useState, useEffect } from "react"
import { useUpdateUserMutation, useDeleteUserMutation } from "./usersApiSlice"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons"
import { ROLES } from "../../config/roles"

const USER_REGEX = /^[A-z]{3,20}$/
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/

const EditUserForm = ({ user }) => {
    // console.log(user,'hausihduoashduashdouashoudhasuodhasoudhasou')

    const [updateUser, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useUpdateUserMutation()

    const [deleteUser, {
        isSuccess: isDelSuccess,
        isError: isDelError,
        error: delerror
    }] = useDeleteUserMutation()

    const navigate = useNavigate()

    const [username, setUsername] = useState(user.username)
    const [validUsername, setValidUsername] = useState(false)
    const [password, setPassword] = useState('')
    const [validPassword, setValidPassword] = useState(false)
    const [roles, setRoles] = useState(user.roles)
    const [active, setActive] = useState(user.active)

    useEffect(() => {
        setValidUsername(USER_REGEX.test(username))
    }, [username])

    useEffect(() => {
        setValidPassword(PWD_REGEX.test(password))
    }, [password])

    useEffect(() => {
        console.log(isSuccess)
        if (isSuccess || isDelSuccess) {
            setUsername('')
            setPassword('')
            setRoles([])
            navigate('/dash/users')
        }

    }, [isSuccess, isDelSuccess, navigate])

    const onUsernameChanged = e => setUsername(e.target.value)
    const onPasswordChanged = e => setPassword(e.target.value)

    const onRolesChanged = e => {
        const values = Array.from(
            e.target.selectedOptions,
            (option) => option.value
        )
        setRoles(values)
    }

    const onActiveChanged = () => setActive(prev => !prev)

    const onSaveUserClicked = async (e) => {
        if (password) {
            console.log(user, 'ini user id nya')
            await updateUser({ id: user.id, username, password, roles, active })
        } else {
            await updateUser({ id: user.id, username, roles, active })
        }
    }

    const onDeleteUserClicked = async () => {
        await deleteUser({ id: user.id })
    }

    const options = Object.values(ROLES).map(role => {
        return (
            <option
                key={role}
                value={role}

            > {role}</option >
        )
    })

    let canSave
    if (password) {
        console.log('roles',roles)
        console.log('rolesLength',roles?.length)
        canSave = [roles?.length, validUsername, validPassword].every(Boolean) && !isLoading
    } else {
        canSave = [roles?.length, validUsername].every(Boolean) && !isLoading
    }

    const errClass = (isError || isDelError) ? "errmsg" : "offscreen"
    const validUserClass = !validUsername ? 'form__input--incomplete' : ''
    const validPwdClass = password && !validPassword ? 'form__input--incomplete' : ''
    const validRolesClass = !Boolean(roles?.length) ? 'form__input--incomplete' : ''

    const errContent = (error?.data?.message || delerror?.data?.message) ?? ''


    const content = (
        <>
            <p className={errClass}>{errContent}</p>

            <form className="form flex flex-col w-1/2 mx-auto" onSubmit={e => e.preventDefault()}>
                {/* <div className="form__title-row"> */}
                <p className='bg-primaryDarker px-6 text-primaryBlue font-bold text-4xl text-center w-64 py-1 mx-auto mb-10 mt-8 [text-shadow:_0_2px_5px_rgb(0_0_0_/_40%)] '>Edit User</p>
                    {/* <div className="form__action-buttons">
                        <button
                            className="icon-button"
                            title="Save"
                            onClick={onSaveUserClicked}
                            disabled={!canSave}
                        >
                            <FontAwesomeIcon icon={faSave} />
                        </button>
                        <button
                            className="icon-button"
                            title="Delete"
                            onClick={onDeleteUserClicked}
                        >
                            <FontAwesomeIcon icon={faTrashCan} />
                        </button>
                    </div> */}
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
                    placeholder="Input username..."
                />

                {/* <label className="form__label" htmlFor="password">
                    Password: <span className="nowrap">[empty = no change]</span> <span className="nowrap">[4-12 chars incl. !@#$%]</span></label> */}
                <input
                    className="mt-4 py-3 pl-4 outline-none rounded-md border-primaryBrown border-solid border-2 font-semibold text-primaryBlue"
                    id="password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={onPasswordChanged}
                    placeholder="Input password..."
                />

                <label className="form__label form__checkbox-container mt-3" htmlFor="user-active">
                    ACTIVE:
                    <input
                        className="form__checkbox ml-2"
                        id="user-active"
                        name="user-active"
                        type="checkbox"
                        checked={active}
                        onChange={onActiveChanged}
                    />
                </label>

                <label className="form__label font-semibold text-primaryBlue text-center" htmlFor="roles">
                    ASSIGNED ROLES:</label>
                <select
                    id="roles"
                    name="roles"
                    className={`h-auto text-center font-semibold`}
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
                            onClick={onSaveUserClicked}
                            disabled={!canSave}
                        >
                            {/* <FontAwesomeIcon icon={faSave} /> */}
                            Update
                        </button>
                        <button
                className={` w-full mt-4 py-1 font-bold text-xl rounded-md bg-red-400 text-white`}
                            title="Delete"
                            onClick={onDeleteUserClicked}
                        >
                            {/* <FontAwesomeIcon icon={faTrashCan} /> */}
                            Delete
                        </button>
                    </div>
            </form>
        </>
    )

    return content
}
export default EditUserForm