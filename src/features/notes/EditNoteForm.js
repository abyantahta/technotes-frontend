import { useState, useEffect } from "react"
import { useUpdateNoteMutation, useDeleteNoteMutation } from "./notesApiSlice"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons"
import useAuth from "../../hooks/useAuth"

const EditNoteForm = ({ note, users }) => {
    const {isAdmin,isManager} = useAuth()
    // console.log('users',users)
    const [updateNote, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useUpdateNoteMutation()

    const [deleteNote, {
        isSuccess: isDelSuccess,
        isError: isDelError,
        error: delerror
    }] = useDeleteNoteMutation()

    const navigate = useNavigate()

    const [title, setTitle] = useState(note.title)
    const [text, setText] = useState(note.text)
    const [completed, setCompleted] = useState(note.completed)
    const [userId, setUserId] = useState(note.user)

    useEffect(() => {

        if (isSuccess || isDelSuccess) {
            setTitle('')
            setText('')
            setUserId('')
            navigate('/dash/notes')
        }

    }, [isSuccess, isDelSuccess, navigate])

    const onTitleChanged = e => setTitle(e.target.value)
    const onTextChanged = e => setText(e.target.value)
    const onCompletedChanged = e => setCompleted(prev => !prev)
    const onUserIdChanged = e => setUserId(e.target.value)

    const canSave = [title, text, userId].every(Boolean) && !isLoading

    const onSaveNoteClicked = async (e) => {
        if (canSave) {
            await updateNote({ id: note.id, user: userId, title, text, completed })
        }
    }

    const onDeleteNoteClicked = async () => {
        await deleteNote({ id: note.id })
    }

    const created = new Date(note.createdAt).toLocaleString('en-US', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })
    const updated = new Date(note.updatedAt).toLocaleString('en-US', { day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })

    const options = users.map(user => {
        return (
            <option
                key={user.id}
                value={user.id}

            > {user.username}</option >
        )
    })

    const errClass = (isError || isDelError) ? "errmsg" : "offscreen"
    const validTitleClass = !title ? "form__input--incomplete" : ''
    const validTextClass = !text ? "form__input--incomplete" : ''

    const errContent = (error?.data?.message || delerror?.data?.message) ?? ''

    let deleteButton = null
    if(isManager || isAdmin){
        deleteButton = (
            <button
                className={` w-full mt-4 py-1 font-bold text-xl rounded-md bg-red-400 text-white`}
                title="Delete"
                onClick={onDeleteNoteClicked}
            >
                {/* <FontAwesomeIcon icon={faTrashCan}/> */}
                Delete
            </button>
        )
    }

    const content = (
        <>
            <p className={errClass}>{errContent}</p>

            <form className="form flex flex-col w-1/2 mx-auto" onSubmit={e => e.preventDefault()}>
                <div className="form__title-row">
                <p className='bg-primaryDarker px-6 text-primaryBlue font-bold text-4xl text-center w-64 py-1 mx-auto mb-10 mt-8 [text-shadow:_0_2px_5px_rgb(0_0_0_/_40%)] '>Edit Note</p>
                    {/* <div className="form__action-buttons">
                        <button
                            className="icon-button"
                            title="Save"
                            onClick={onSaveNoteClicked}
                            disabled={!canSave}
                        >
                            <FontAwesomeIcon icon={faSave} />
                        </button>
                        {deleteButton}
                    </div> */}
                </div>
                {/* <label className="form__label" htmlFor="note-title">
                    Title:</label> */}
                <input
                    className="py-3 pl-4 outline-none rounded-md border-primaryBrown border-solid border-2 font-semibold text-primaryBlue"
                    id="note-title"
                    name="title"
                    type="text"
                    autoComplete="off"
                    value={title}
                    onChange={onTitleChanged}
                    placeholder="Input Title Here..."
                />

                {/* <label className="form__label" htmlFor="note-text">
                    Text:</label> */}
                <textarea
                    className="mt-4 py-3 pl-4 outline-none rounded-md border-primaryBrown border-solid border-2 font-semibold text-primaryBlue max-h-48"
                    id="note-text"
                    name="text"
                    value={text}
                    onChange={onTextChanged}
                />
                <div className="flex justify-between mt-4">
                    <div className="form__divider">
                        <label className="form__label form__checkbox-container flex items-center font-semibold" htmlFor="note-completed">
                            WORK COMPLETE:
                            <input
                                className="form__checkbox ml-2 w-4 h-4"
                                id="note-completed"
                                name="completed"
                                type="checkbox"
                                checked={completed}
                                onChange={onCompletedChanged}
                            />
                        </label>

                        <label className="text-center my-2 font-bold text-primaryBlue" htmlFor="note-username">
                            ASSIGNED TO:</label>
                        <select
                            id="note-username"
                            name="username"
                            className="form__select ml-2 mt-2 w-32 text-center font-semibold"
                            value={userId}
                            onChange={onUserIdChanged}
                        >
                            {options}
                        </select>
                    </div>
                    <div className="form__divider">
                        <p className="form__created">Created:<br />{created}</p>
                        <p className="form__updated">Updated:<br />{updated}</p>
                    </div>
                </div>
                <div className="form__action-buttons">
                        <button
                        className={` w-full mt-4 py-1 font-bold text-xl rounded-md  ${canSave?'bg-primaryBrown text-white':'bg-gray-300 text-gray-100'}`}
                            title="Save"
                            onClick={onSaveNoteClicked}
                            disabled={!canSave}
                        >
                            Update
                            {/* <FontAwesomeIcon icon={faSave} /> */}
                        </button>
                        {deleteButton}
                    </div>
            </form>
        </>
    )

    return content
}

export default EditNoteForm