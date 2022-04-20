import React, { useEffect, useState } from 'react'
import MuiModal from "@mui/material/Modal"
import { useRecoilState, useRecoilValue } from 'recoil'
import { modelstate, moviestate } from '../atoms/atom'
import { XIcon } from '@heroicons/react/outline'
import { Element, Genre } from '../typing'
function Model() {


  const [model,setmodel] = useRecoilState(modelstate)
  const movie = useRecoilValue (moviestate)
  const [trailer,setTrailer] = useState('')
  const [genres, setGenres] = useState<Genre[]>([])
  const handelclose = ()=>{
            setmodel(false)
  }

useEffect(()=>{
  if(!movie) return

  async function fetchMovie() {
    const data = await fetch(
      `https://api.themoviedb.org/3/${
        movie?.media_type === 'tv' ? 'tv' : 'movie'
      }/${movie?.id}?api_key=${
        process.env.NEXT_PUBLIC_API_KEY
      }&language=en-US&append_to_response=videos`
    ).then(response => response.json())
    if(data?.videos) {
      //const index = data.videos.results.findIndex((elemnt :Element) =>{elemnt.type == "Trailer"})
      setTrailer(data.videos?.results[0]?.key);
      console.log(trailer);
      
    }
    if (data?.genres) {
      setGenres(data.genres)
    }  
   
  }
   fetchMovie()
},[movie])

   
  return (
    <MuiModal open={model} onClose={handelclose}>
        <>
        <button onClick={handelclose} className="modalButton absolute right-5 top-5 !z-40 h-9 w-9 border-none bg-[#181818] hover:bg-[#181818]">
            <XIcon className='h-6 w-6'/>
            </button>
        </>
    </MuiModal>
  )
}

export default Model