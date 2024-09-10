import { useParams } from 'react-router-dom'
import { useGetNotesQuery } from './notesApiSlice'
import { useGetUsersQuery } from '../users/usersApiSlice'
import EditNoteForm from './EditNoteForm'
import useAuth from '../../hooks/useAuth'
import { PulseLoader } from 'react-spinners'
import useTitle from '../../hooks/useTitle'

const EditNote = () => {
    useTitle('Edit Note')
    const { id } = useParams()
    const {username, isManager,isAdmin} = useAuth()

    const {note} = useGetNotesQuery('notesList', {
        selectFromResult : ({data}) =>({
            note : data?.entities[id]
        })
    })
    const {users} = useGetUsersQuery('usersList', {
        selectFromResult : ({data}) =>({
            users : data?.ids.map(id => data?.entities[id])
        })
    })
    console.log(note)
    console.log(users)
    if(!note || !users?.length) return <PulseLoader color={'#FFF'}/>
    if(!isManager || !isAdmin) {
        if(note.username !== username){
            return <p className="errmsg">No Access</p>
        }
    }

    // const note = useSelector(state => selectNoteById(state, id))
    // const users = useSelector(selectAllUsers)

    const content = <EditNoteForm note={note} users={users} />

    return content
}
export default EditNote