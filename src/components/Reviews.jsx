import { addDoc,doc,updateDoc,query,where,getDocs} from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react'
import { TailSpin, ThreeDots } from 'react-loader-spinner';
import ReactStars2 from 'react-stars'
import { reviewsRef,db } from '../firebase/firebase';
import swal from 'sweetalert';
import { AppState } from '../App';
import { useNavigate } from 'react-router-dom';


const Reviews = ({ id, preRating, userRated }) => {
    const useAppState = useContext(AppState);
    const navigate = useNavigate()
    const [rating, setRating] = useState(0);
    const [loading, setLoading] = useState(false);
    const [reviewsLoading,setReviewLoading] = useState(false)
    const [form, setForm] = useState();
    const [data, setData] = useState([]);
    const [newAdd, setNewAdd] = useState(0);

    const sendReview = async() => {
        setLoading(true);
        try {
            if (useAppState.login) {
                await addDoc(reviewsRef, {
                    movieid: id,
                    name: useAppState.userName,
                    rating: rating,
                    thought: form,
                    timestamp: new Date().getTime(),
                })
                const ref = doc(db, "movies", id);
                await updateDoc(ref, {
                    rating: preRating + rating,
                    rated: userRated + 1

                })
                setRating(0);
                setForm("");
                setNewAdd(newAdd + 1);
                swal({
                    title: 'Review sent',
                    icon: "success",
                    buttons: false,
                    timer: 3000
                })
            } else {
                navigate('/login')
            }


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


    useEffect(() => {
        const getData = async() => {
            setReviewLoading(true);
            setData([])
            let quer = query(reviewsRef, where('movieid', '==', id));
            const querySnapshot = await getDocs(quer);

            querySnapshot.forEach((doc) => {
                    setData((prev)=>[...prev,doc.data()])
            })
            setReviewLoading(false)
        }
        getData()
    },[newAdd])
  return (
      <div className='mt-4 border-t-2 border-gray-700 w-full'>
          <ReactStars2
              size={30}
              half={true}
              value={rating}
            onChange={(rate)=>setRating(rate)}

          />
          <input type="text"
              value={form}
              onChange={(e)=>setForm(e.target.value)}
              placeholder='Share Your thoughts...'
              className='w-full p-2 outline-none  header'
          />
          <button onClick={sendReview} className='bg-green-600 justify-center flex w-full p-2'>{loading ? <TailSpin height={20} color='white' /> : 'Share'}</button>
          {
              reviewsLoading ?
                  <div className='mt-6 flex justify-center'><ThreeDots height={10} color='white' /></div>
                  :
                  <div className='mt-4 '>
                      {
                          data.map((val,i) => {
                              return (
                                  <div className=' p-2 w-full border-b header bg-opacity-50 border-gray-500 mt-2' key={++i}>
                                      <div className='flex items-center'>
                                          <p className='text-blue-500'>{val.name}</p>
                                          <p className='ml-3 text-xs'>({new Date(val.timestamp).toLocaleString()})</p>
                                      </div>
                                      <ReactStars2
                                          size={15}
                                          half={true}
                                          edit={false}
                                          value={val.rating}

                                      />
                                      <p>{val.thought}</p>
                                  </div>
                            )
                          })
                      }
                  </div>
          }
    </div>
  )
}

export default Reviews

