import React, { useContext, useState } from 'react'
import { TailSpin } from 'react-loader-spinner';
import { Link, useNavigate } from 'react-router-dom';
import {  where, getDoc, query, getDocs } from 'firebase/firestore';
import swal from 'sweetalert';
import { usersRef } from '../firebase/firebase';
import bcrypt from 'bcryptjs';
import { AppState } from '../App';


const Login = () => {
    const navigate = useNavigate();
    const useAppState = useContext(AppState)
    const [form, setForm] = useState({
        moblie: "",
        password: ""
    });
    const [loading, setLoading] = useState(false);

    const login = async () => {
        setLoading(true);
        try {
            const quer = query(usersRef, where('moblie', '==', form.moblie))
            const querySnapshot = await getDocs(quer);

            querySnapshot.forEach((doc) => {
                const _data = doc.data();
                const isUser = bcrypt.compareSync(form.password, _data.password);
                if (isUser) {
                    useAppState.setLogin(true);
                    useAppState.setUserName(_data.name);
                    swal({
                        title: "Logged In",
                        icon: "success",
                        buttons: false,
                        timer: 3000
                    })
                    navigate('/')
                } else {
                    swal({
                        title: "Invalid Credentials",
                        icon: "error",
                        buttons: false,
                        timer: 3000
                    })
                }
            })
        } catch (error) {
            swal({
                title: error.message,
                icon: "error",
                buttons: false,
                timer: 3000
            })
        }
        setLoading(false);
    }
    return (
        <div className='w-full flex flex-col mt-20 items-center  p-6'>
            <h1 className='text-3xl font-bold text-white mb-6'>Login</h1>
            <div className="py-5 px-4 w-full max-w-md border  shadow-2xl border-gray-500 rounded-lg">
                <div className="relative mb-4">
                    <label htmlFor="mobile" className="leading-7 text-sm text-gray-400">Mobile No.</label>
                    <input type='number' value={form.moblie} onChange={(e) => setForm({ ...form, moblie: e.target.value })} id="mobile" name="mobile" className="w-full bg-white bg-opacity-50 rounded border border-gray-600 focus:border-indigo-400  focus:ring-2 focus:ring-indigo-300 text-base outline-none text-black py-2 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                </div>
                <div className="relative mb-4">
                    <label htmlFor="password" className="leading-7 text-sm text-gray-400">Password</label>
                    <input type='password' value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} id="password" name="password" className="w-full bg-white bg-opacity-50 rounded border border-gray-600 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-300 text-base outline-none text-black py-2 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                </div>
                <button onClick={login} className="w-full text-white bg-green-600 border-0 py-2 px-6 focus:outline-none hover:bg-green-700 rounded text-lg flex justify-center items-center">
                    {loading ? <TailSpin height={25} color='white' /> : "Login"}
                </button>
            </div>
            <div className='text-white mt-4'>
                <p>Don't have an account? <Link to={`/signup`} className='text-blue-400 hover:text-blue-500'>Sign up</Link></p>
            </div>
        </div>
    )
}

export default Login
