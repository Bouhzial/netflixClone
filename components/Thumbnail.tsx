import React from 'react'
import { Movie } from '../typing'
import Image from 'next/image'
import { useRecoilState } from 'recoil'
import { modelstate, moviestate } from '../atoms/atom'

interface Props {
    movie:Movie
}

function Thumbnail({movie}:Props) {
  const [model,setmodel] = useRecoilState(modelstate)
const [Cmovie,setmovie] = useRecoilState(moviestate)
  return (
    <div className='relative h-28 min-w-[180px] cursor-pointer transition duration-200 
    ease-out mdh:h-36 md:min-w-[260px] md:hover:scale-105'>
         <Image onClick={()=>{
        setmodel(true);
        setmovie(movie)
      }}
        src={`https://image.tmdb.org/t/p/w500${
          movie.backdrop_path || movie.poster_path
        }`}
        className="rounded-sm object-cover md:rounded"
        layout="fill"
      />
    </div>
  )
}

export default Thumbnail