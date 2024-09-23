import { useGetUsersQuery } from "./usersApiSlice"
import User from './User'
import { PulseLoader } from "react-spinners"
import useTitle from "../../hooks/useTitle"

const UsersList = () => {
    useTitle('Users List')
    const {
        data: users,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetUsersQuery('usersList', {
        pollingInterval: 60000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })

    let content

    if (isLoading) content = <PulseLoader color={'#FFF'} />

    if (isError) {
        content = <p className="errmsg">{error?.data?.message}</p>
    }

    if (isSuccess) {

        const { ids } = users

        const tableContent = ids?.length
            ? ids.map(userId => <User key={userId} userId={userId} />)
            : null

        content = (
            <>
                <p className='bg-primaryDarker px-6 text-primaryBlue font-bold text-4xl text-center w-52 py-1 mx-auto mb-10 mt-8 [text-shadow:_0_2px_5px_rgb(0_0_0_/_40%)] '>User List</p>
                <table className="table table--users">
                    <thead className="table__thead">
                        <tr>
                            <th scope="col" className="table__th user__username">Username</th>
                            <th scope="col" className="table__th user__roles">Roles</th>
                            <th scope="col" className="table__th user__edit">Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableContent}
                    </tbody>
                </table>
            </>
        )
    }

    return content
}
export default UsersList