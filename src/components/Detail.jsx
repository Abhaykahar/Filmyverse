import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import ReactStars2 from 'react-stars';
import { db } from '../firebase/firebase';
import { ThreeCircles } from 'react-loader-spinner';
import Reviews from './Reviews';

const Detail = () => {
    const { id } = useParams();
    const [data, setData] = useState({
        title: "",
        year: "",
        image: "",
        description: "",
        rating: 0,
        rated:0
    })
    const [loading,setLoading] = useState(false)

    useEffect(() => {
        const getData = async () => {
            setLoading(true);
            const _doc = doc(db, "movies",id);
            const _data = await getDoc(_doc);
            setData(_data.data());
            setLoading(false);

        }
        getData()
    },[])
  return (
    <div className='p-4 mt-4 flex flex-col md:flex-row items-center md:items-start w-full justify-center text-white'>
          {loading ? <div className='h-96 flex w-full justify-center items-center'><ThreeCircles height={30} color="white" /></div> :

              <>
                  <img className='h-96 lg:sticky top-24' src={data.image} />
                  <div className='md:ml-4 mt-3 ml-0 w-full md:w-1/2'>

                      <h1 className='text-3xl font-bold text-gray-400'>{data.title} <span className='text-xl'>({data.year})</span></h1>
                      <ReactStars2
                          size={15}
                          half={true}
                          value={data.rating/data.rated}
                          edit={false}
                      />
                      <p className='mt-3'>{data.description}</p>
                      <Reviews id={id} preRating={data.rating} userRated={data.rated} />
                  </div>
              </>

      }


    </div>
  )
}

export default Detail;

