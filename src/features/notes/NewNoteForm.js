import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAddNewNoteMutation } from "./notesApiSlice"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave } from "@fortawesome/free-solid-svg-icons"
import useAuth from "../../hooks/useAuth"

const NewNoteForm = ({ users }) => {
    const {username,isManager,isAdmin} = useAuth()
    const [addNewNote, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNewNoteMutation()

    const navigate = useNavigate()

    const [title, setTitle] = useState('')
    const [text, setText] = useState('')
    const [userId, setUserId] = useState(users[0].id)

    useEffect(() => {
        if (isSuccess) {
            setTitle('')
            setText('')
            setUserId('')
            navigate('/dash/notes')
        }
    }, [isSuccess, navigate])

    const onTitleChanged = e => setTitle(e.target.value)
    const onTextChanged = e => setText(e.target.value)
    const onUserIdChanged = e => setUserId(e.target.value)

    const canSave = [title, text, userId].every(Boolean) && !isLoading

    const onSaveNoteClicked = async (e) => {
        e.preventDefault()
        if (canSave && (isAdmin || isManager)) {
            await addNewNote({ user: userId, title, text })
        }else{
            await addNewNote({ user: currentUserID, title, text })
        }
    }
    let currentUserID = users.filter(user=>user.username===username)[0]
    // console.log(currentUserID._id)
    const options = users.map(user => {
        return (
            <option
                key={user.id}
                value={user.id}
            > {user.username}</option >
        )
    })

    const errClass = isError ? "errmsg" : "offscreen"
    const validTitleClass = !title ? "form__input--incomplete" : ''
    const validTextClass = !text ? "form__input--incomplete" : ''

    const content = (
        <>
            <p className={errClass}>{error?.data?.message}</p>

            <form className="form flex flex-col w-1/2 mx-auto" onSubmit={onSaveNoteClicked}>
                {/* <div className="form__title-row"> */}
                <p className='bg-primaryDarker px-6 text-primaryBlue font-bold text-4xl text-center w-64 py-1 mx-auto mb-10 mt-8 [text-shadow:_0_2px_5px_rgb(0_0_0_/_40%)] '>Create Note</p>
                {/* </div> */}
                {/* <label className="form__label" htmlFor="title">
                    Title:</label> */}
                <input
                    className="py-3 pl-4 outline-none rounded-md border-primaryBrown border-solid border-2 font-semibold text-primaryBlue"
                    name="title"
                    type="text"
                    autoComplete="off"
                    value={title}
                    onChange={onTitleChanged}
                    placeholder="Input Title Here..."
                />

                {/* <label className="form__label" htmlFor="text">
                    Text:</label> */}
                <textarea
                    className="mt-4 py-3 pl-4 outline-none rounded-md border-primaryBrown border-solid border-2 font-semibold text-primaryBlue max-h-64 h-48"
                    id="text"
                    name="text"
                    value={text}
                    onChange={onTextChanged}
                    placeholder="Input Text Here..."
                    
                />
                {
                    (isAdmin||isManager) && (
                        <>
                            <label className="text-center my-2 font-bold text-primaryBlue" htmlFor="username">
                                ASSIGNED TO:</label>
                            <select
                                id="username"
                                name="username"
                                className=" h-8 text-center font-semibold border-primaryBrown border-solid border-2 rounded-md"
                                value={userId}
                                onChange={onUserIdChanged}
                            >
                                {options}
                            </select>
                        </>
                    )
                }
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

export default NewNoteForm