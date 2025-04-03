import React, { useContext } from 'react'
import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material'
import { Link } from 'react-router-dom';
import { AppState } from '../App';

const Header = () => {
    const useAppstate = useContext(AppState)
    return (
        <div className='sticky top-0 z-10 header text-2xl flex justify-between items-center text-red-500 font-bold p-3 border-b-2 border-gray-500'>
            <Link to={`/`}>  <span >Filmy<span className='text-white'>verse</span></span></Link>
            {useAppstate.login ?
                <Link to={'/addMovie'}>
                    <h1 className='text-lg flex  cursor-pointer items-center'>
                        <Button> <AddIcon className="mr-1" color="secondary" /> <span className='text-white'>Add New</span></Button>
                    </h1>
                </Link> :
                <Link to={'/login'}>
                    <h1 className='text-lg flex bg-green-500  cursor-pointer items-center'>
                        <Button> <span className='text-white font-medium capitalize'>Login</span></Button>
                    </h1>
                </Link>
            }
        </div>
    )
}

export default Header

