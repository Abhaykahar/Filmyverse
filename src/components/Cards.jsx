import {  getDocs } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { ThreeDots } from 'react-loader-spinner'
import ReactStars2 from 'react-stars'
import { movieRef } from '../firebase/firebase'
import { Link } from 'react-router-dom'

const Cards = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getData = async () => {
            setLoading(true);
            try {
                const _data = await getDocs(movieRef);
                _data.forEach((doc) => {
                    setData((prv) => [...prv, {...(doc.data()),id:doc.id}]);
                })

            } catch (error) {
                console.log(error)
            }
            setLoading(false);

        }
        getData();
    },[])
  return (
      <div className='flex flex-wrap justify-between px-3 mt-2'>
          {loading ? <div className='w-full flex flex-warp justify-center items-center h-96'><ThreeDots height={40} color='white' /></div> :
              data.map((val, i) => {
                      return (
                          <Link key={++i} to={`/detail/${val.id}`}>
                              <div className='cards p-2 transition-all duration-500  font-medium shadow-lg hover:-translate-y-3 cursor-pointer mt-6'>
                                  <img className='h-60 md:h-72 mb-3 w-60 object-fill' src={val.image} />
                                  <h1 className='text-white'><span className='text-gray-500'>Name:</span> {val.title}</h1>
                                  <h1 className='text-white flex items-center'> <span className='text-gray-500 mr-1'> Rating: </span>
                                      <ReactStars2
                                          size={15}
                                          half={true}
                                          value={val.rating/val.rated}
                                          edit={false}
                                      />
                                  </h1>
                                  <h1 className='text-white'><span className='text-gray-500'>Year:</span>  {val.year} </h1>
                              </div>
                          </Link>
                      )
                  })

          }
    </div>
  )
}

export default Cards

