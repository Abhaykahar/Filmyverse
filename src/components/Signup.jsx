import React, { useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { Link } from "react-router-dom";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth'
import app from '../firebase/firebase'
import swal from "sweetalert";
import { addDoc } from "firebase/firestore";
import { usersRef } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";
import bcrypt from 'bcryptjs';

const auth = getAuth(app);
const Signup = () => {
    const navigate = useNavigate()
    const [form, setForm] = useState({
        name:"",
        moblie: "",
        password: ""
    });
    const [loading, setLoading] = useState(false);
    const [otpSent, setOptSet] = useState(false);
    const [OTP, setOTP] = useState("");


    const generateRecaptha = () => {
        if (typeof window.recaptchaVerifier !== "undefined") {
            window.recaptchaVerifier.clear();
        }

        window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
            size: "invisible",
            callback: (response) => {
                console.log("reCAPTCHA verified");
            }
        });
    };



    const requestOtp = () => {
        setLoading(true);
        generateRecaptha();
        let appVerifier = window.recaptchaVerifier;
        signInWithPhoneNumber(auth, `+91${form.moblie}`, appVerifier)
            .then(confirmationResult => {
                window.confirmationResult = confirmationResult;
                swal({
                    text: "OTP Sent",
                    icon: "success",
                    buttons: false,
                    timer: 3000,
                });
                setOptSet(true);
                setLoading(false);
            }).catch((error) => {
                console.log(error)
            })
    }

    const verifyOTP = () => {
        try {
            setLoading(true);
            window.confirmationResult.confirm(OTP).then((result) => {
                uploadData();
                swal({
                    text: "Sucessfully Registered",
                    icon: "success",
                    buttons: false,
                    timer: 3000,
                });
                navigate('/login')
                setLoading(false);
            })
        } catch (error) {
            console.log(error);
        }
    }

    const uploadData = async () => {
        try {
            const salt = bcrypt.genSaltSync(10);
            var hash = bcrypt.hashSync(form.password, salt);
            await addDoc(usersRef, {
                name: form.name,
                password: hash,
                moblie: form.moblie
            });
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className='w-full flex flex-col mt-20 items-center p-6'>
            <h1 className='text-3xl font-bold text-white mb-6'>Sign up</h1>
            {otpSent ?
                <>
                    <div className="relative mb-4 w-1/4">
                        <label htmlFor="mobile" className="leading-7 text-sm text-gray-400">OTP</label>
                        <input type="text" value={OTP} onChange={(e) => setOTP(e.target.value )} id="mobile" name="mobile" className="w-full bg-white bg-opacity-50 rounded border border-gray-600 focus:border-indigo-400  focus:ring-2 focus:ring-indigo-300 text-base outline-none text-black py-2 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    </div>
                    <div>
                        <button onClick={verifyOTP} className="w-full text-white bg-green-600 border-0 py-2 px-6 focus:outline-none hover:bg-green-700 rounded text-lg flex justify-center items-center">
                            {loading ? <TailSpin height={25} color='white' /> : "Confirm OTP"}
                        </button>
                  </div>
                </>
                :
                <>

                    <div className="py-5 px-4 w-full max-w-md border  shadow-2xl border-gray-500 rounded-lg">
                        <div className="relative mb-4">
                            <label htmlFor="mobile" className="leading-7 text-sm text-gray-400">Name</label>
                            <input  type='text' value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} id="name" name="name" className="w-full  bg-white bg-opacity-50 rounded border border-gray-600 focus:border-indigo-400  focus:ring-2 focus:ring-indigo-300 text-base outline-none text-black py-2 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                        </div>
                        <div className="relative mb-4">
                            <label htmlFor="mobile" className="leading-7 text-sm text-gray-400">Mobile No.</label>
                            <input type='number' value={form.moblie} onChange={(e) => setForm({ ...form, moblie: e.target.value })} id="mobile" name="mobile" className="w-full bg-white bg-opacity-50 rounded border border-gray-600 focus:border-indigo-400  focus:ring-2 focus:ring-indigo-300 text-base outline-none text-black py-2 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                        </div>
                        <div className="relative mb-4">
                            <label htmlFor="password" className="leading-7 text-sm text-gray-400">Password</label>
                            <input  type={'password'} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} id="password" name="password" className="w-full bg-white bg-opacity-50 rounded border border-gray-600 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-300 text-base outline-none text-back py-2 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                        </div>
                        <button onClick={requestOtp} className="w-full text-white bg-green-600 border-0 py-2 px-6 focus:outline-none hover:bg-green-700 rounded text-lg flex justify-center items-center">
                            {loading ? <TailSpin height={25} color='white' /> : "Request OTP"}
                        </button>
                    </div></>
            }
            <div className='text-white mt-4'>
                <p>Already have an account<Link to={`/login`} className='text-blue-400 hover:text-blue-500'> Login</Link></p>
            </div>
            <div id="recaptcha-container"></div>
        </div>
    )
}

export default Signup
