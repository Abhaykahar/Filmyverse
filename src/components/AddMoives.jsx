
import { addDoc } from 'firebase/firestore';
import React, { useContext, useState } from 'react'
import { TailSpin } from 'react-loader-spinner';
import { movieRef } from '../firebase/firebase';
import swal from 'sweetalert'
import { AppState } from '../App';
import { useNavigate } from 'react-router-dom';



const AddMoives = () => {
    const useAppState = useContext(AppState);
    const navigate = useNavigate()
    const [form, setForm] = useState({
        title: '',
        year: '',
        description: '',
        image: '',
        rated: 0,
        rating:0,
    });
    const [loading,setLoading] = useState(false)


    const addMovie = async () => {
        setLoading(true);

        try {
            if (useAppState.login) {
                await addDoc(movieRef, form);
                swal({
                    title: "SuccessFully Added",
                    icon: "success",
                    buttons: false,
                    timer: 3000
                })
            } else {
                navigate('/login')
            }
        } catch (error) {
            swal({
                title: error,
                icon: "error",
                buttons: false,
                timer: 3000
            })
        }
        setLoading(false);
        setForm({
            title: '',
            year: '',
            description: '',
            image: ''
        });

    }
  return (
    <div>
          <section className="text-gray-600 body-font relative">
              <div className="container px-5 py-24 mx-auto">
                  <div className="flex flex-col text-center w-full mb-12">
                      <h1 className="sm:text-3xl text-xl font-medium title-font mb-4 text-white">Add  Movie</h1>
                  </div>
                  <div className="lg:w-1/2 md:w-2/3 mx-auto">
                      <div className="flex flex-wrap -m-2">
                          <div className="p-2 w-1/2">
                              <div className="relative">
                                  <label for="name" className="leading-7 text-sm text-gray-600">Title</label>
                                  <input value={form.title} onChange={(e)=>setForm({...form,title:e.target.value})} type="text" id="name" name="name" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
                              </div>
                          </div>
                          <div className="p-2 w-1/2">
                              <div className="relative">
                                  <label for="number" className="leading-7 text-sm text-gray-600">Year</label>
                                  <input value={form.year} onChange={(e) => setForm({ ...form, year: e.target.value })} type="number" id="email" name="email" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
                              </div>
                          </div>
                          <div className="p-2 w-full">
                              <div className="relative">
                                  <label for="message" className="leading-7 text-sm text-gray-600">Image Link</label>
                                  <input value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} id="message" name="message" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"></input>
                              </div>
                          </div>
                          <div className="p-2 w-full">
                              <div className="relative">
                                  <label for="message" className="leading-7 text-sm text-gray-600">Desciption</label>
                                  <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} id="message" name="message" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"></textarea>
                              </div>
                          </div>
                          <div className="p-2 w-full">
                              <button onClick={addMovie} className="flex mx-auto text-white bg-green-600 border-0 py-2 px-8 focus:outline-none hover:bg-green-700 rounded text-lg">
                                  {loading ? <TailSpin height={25} color='white'/> : "Submit"}
                              </button>
                          </div>

                      </div>
                  </div>
              </div>
          </section>
    </div>
  )
}

export default AddMoives

