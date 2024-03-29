import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { Movie } from '../typing'
import { baseUrl } from '../consts/movie'
import { FaPlay } from 'react-icons/fa'
import { InformationCircleIcon } from '@heroicons/react/outline'
import { useRecoilState } from 'recoil'
import { modelstate, moviestate,magentlink } from '../atoms/atom'
import Router  from 'next/router'
interface Props {
  netflixOriginals :Movie[],
  searched :Boolean,
}

function Baner({netflixOriginals,searched}:Props) {
  

  const [movie,setMovie] = useState<Movie|null>(null)
  useEffect(() => {
    if(searched){
      setMovie(netflixOriginals[0])
    }else
    {setMovie(
      netflixOriginals[Math.floor(Math.random() * netflixOriginals.length)]
    )}
  }, [netflixOriginals])


const [model,setmodel] = useRecoilState(modelstate)
const [Cmovie,setmovie] = useRecoilState(moviestate)
const [magent,setmagent]= useRecoilState(magentlink)
async function play(){
    
  const title = movie?.original_title

    const response = await fetch('api/getvid',
    {
      method:'POST',
      body:JSON.stringify(title),
      headers:{'Content-type':'aplication/json','Accept': 'application/json'}
    })
    const data = await response.json()
    setmagent( data.found[0])
    Router.push('/playing')    
}


  return (
    <div className="flex flex-col space-y-2 py-16 md:space-y-4 lg:h-[65vh] lg:justify-end lg:pb-12">
    <div className="absolute top-0 left-0 -z-10 h-[95vh] w-full">
      <Image
        layout="fill"
        src={`${baseUrl}${movie?.backdrop_path || movie?.poster_path}`}
        objectFit="cover"
      />
    </div>

    <h1 className="text-2xl font-bold md:text-4xl lg:text-5xl">
      {movie?.title || movie?.name || movie?.original_name}
    </h1>
    <p className="max-w-xs text-xs text-shadow-md md:max-w-lg md:text-lg lg:max-w-2xl lg:text-1.5xl">
      {movie?.overview}
    </p>
    <div className="flex space-x-3">
      <button onClick={play} className="bannerButton bg-white text-black">
        <FaPlay className="h-4 w-4 text-black md:h-7 md:w-7" />
        Play
      </button>
      <button onClick={()=>{
        setmodel(true);
        setmovie(movie)
      }} className="bannerButton bg-[gray]/70" >
          <InformationCircleIcon className="h-5 w-5 md:h-8 md:w-8" /> More Info
        </button>
        </div>
    </div>
  )
}

export default Baner