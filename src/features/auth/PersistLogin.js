import React, { useEffect, useRef, useState } from 'react'
import usePersist from '../../hooks/usePersist'
import { useSelector } from 'react-redux'
import { selectCurrentToken } from './authSlice'
import { useRefreshMutation } from './authApiSlice'
import { Link, Outlet } from 'react-router-dom'
import { PulseLoader } from 'react-spinners'

const PersistLogin = () => {
    const [persist] = usePersist()
    const token = useSelector(selectCurrentToken)
    const effectRan = useRef(false)

    const [trueSuccess,setTrueSuccess] = useState(false)

    const [refresh,{
        isUninitialized,
        isLoading,
        isSuccess,
        isError,
        error
    }] = useRefreshMutation()

    useEffect(()=>{
        //emang akan dimount 2x, nanti value yg kedua jadi true
        if(effectRan.current === true || process.env.NODE_ENV !== 'development'){ //REACT 18 STRICT MODE
            const verifyRefreshToken = async () => {
                console.log('verifying refresh token')
                try {
                    // const response = 
                    await refresh()
                    // const {accessToken} = response.data
                    setTrueSuccess(true)
                } catch (error) {
                    console.log(error)
                }
            }
            if(!token && persist) verifyRefreshToken()
        }
        return ()=> effectRan.current = true
        // eslint-disable-next-line
    },[])
    let content

    if(!persist){ //persist : no
        console.log('no persist') 
        content = <Outlet/>
    } 
    else if(isLoading){ //persist : yes //token not yet
        content = <PulseLoader color={'#FFF'} />
    } 
    else if(isError) { //persist : yes, token : no
        console.log('error')
        content = (
            <p className="errorMsg">
                {error?.data?.message}
                <Link to='/login'> - Please Login Again</Link>
            </p>
        )
    } else if(isSuccess && trueSuccess){ //persist : yes, token : yes
        console.log('success')
        content = <Outlet/>
    } else if(token && isUninitialized){ //persist : yes, token : yes
        console.log('token and uninit')
        console.log(isUninitialized)
        content = <Outlet/>
    }

    return content
}

export default PersistLogin