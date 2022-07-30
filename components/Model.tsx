import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { modelstate, moviestate,magentlink } from '../atoms/atom'
import ReactPlayer from 'react-player/lazy'
import { FaPlay } from 'react-icons/fa'
import {
  CheckIcon,
  PlusIcon,
  ThumbUpIcon,
  VolumeOffIcon,
  VolumeUpIcon,
  XIcon,
} from '@heroicons/react/outline'
import { Element, Genre, Movie ,Episode} from '../typing'
import MuiModal from '@mui/material/Modal'
import Router  from 'next/router'

interface Props {
  searched:Boolean
}

function Modal({searched}:Props) {
  const [movie, setMovie] = useRecoilState(moviestate)
  const [trailer, setTrailer] = useState('')
  const [showModal, setShowModal] = useRecoilState(modelstate)
  const [magent, setmagent] = useRecoilState(magentlink)
  const [muted, setMuted] = useState(false)
  const [genres, setGenres] = useState<Genre[]>([])
  const [addedToList, setAddedToList] = useState(false)
  const [season,setseason]=useState('1')
  const [Nseason,setNseason]=useState(1)
  const [episodes,setepisodes]=useState<Episode[]>([])
  const [episode,setepisode]=useState('')


  useEffect(() => {
    if (!movie) return
    async function fetchMovie() {
      const data = await fetch(
        `https://api.themoviedb.org/3/${
          movie?.media_type === 'tv' ? 'tv' : 'movie'
        }/${movie?.id}?api_key=${
          process.env.NEXT_PUBLIC_API_KEY
        }&language=en-US&append_to_response=videos`
      ).then((response) => response.json())
      if (data?.videos) {
        const index = data.videos.results.findIndex(
          (element: Element) => element.type === 'Trailer'
        )
        setTrailer(data.videos?.results[index]?.key)
      }
      if (data?.genres) {
        setGenres(data.genres)
      }
      if (movie?.media_type == 'tv') {
        const res = await fetch(`https://api.themoviedb.org/3/tv/${movie.id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`)
       const data = await res.json()
        setNseason( data.number_of_seasons)
        const rese = await fetch(`https://api.themoviedb.org/3/tv/${movie?.id}/season/1?api_key=${process.env.NEXT_PUBLIC_API_KEY}`)
        const datas = await rese.json()
        setepisodes(datas.episodes);setepisode("1")}
    }

    fetchMovie()
  }, [movie])

  const handleClose = () => {
    setShowModal(false)
    setMovie(null)
  }
  async function play(){
    let title = ''
    if (movie?.media_type == 'tv') {  
      title = `${movie.original_title || movie.original_name} S${("0" + season).slice(-2)}E${("0" + episode).slice(-2)}`
      console.log(episode);
    } else {
      title = movie?.original_title
    }
    console.log(title);
    
      const response = await fetch(`${searched?'../api/getvid':'api/getvid'}`,
      {
        method:'POST',
        body:JSON.stringify(title),
        headers:{'Content-type':'aplication/json','Accept': 'application/json'}
      })
      const data = await response.json()
      setmagent( data.found[0])
      Router.push('/playing')
  }
  const changeSeason = async (e:any) => {
    console.log(season);
    const res = await fetch(`https://api.themoviedb.org/3/tv/${movie?.id}/season/${season}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`)
    const data = await res.json()
    setepisodes(data.episodes)
    
  }
  


  return (
    <MuiModal
      open={showModal}
      onClose={handleClose}
      className="fixed !top-7 left-0 right-0 z-50 mx-auto w-full max-w-5xl overflow-hidden overflow-y-scroll rounded-md scrollbar-hide"
    >
      <>
        <button
          className="modalButton absolute right-5 top-5 !z-40 h-9 w-9 border-none bg-[#181818] hover:bg-[#181818]"
          onClick={handleClose}
        >
          <XIcon className="h-6 w-6" />
        </button>

        <div className="relative pt-[56.25%]">
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${trailer}`}
            width="100%"
            height="100%"
            style={{ position: 'absolute', top: '0', left: '0' }}
            playing
            muted={muted}
          />
          <div className="absolute bottom-10 flex w-full items-center justify-between px-10">
            <div className="flex space-x-2">
              <button onClick={()=>{                
                  play()
              }} 
              className="flex items-center gap-x-2 rounded bg-white w-32 px-8 text-xl font-bold text-black transition hover:bg-[#e6e6e6]">
                <FaPlay className="h-7 w-7 text-black" />
                Play
              </button>
              {movie?.media_type=='tv'?
              <div className='flex gap-x-2'>
                  <select className='rounded bg-white w-32 px-8 text-xl font-bold text-black transition hover:bg-[#e6e6e6]' onChange={(e) => {setseason(e.target.value);changeSeason(e)}}>
           {
           Array.from({length: Nseason}, (_, index) => {  
           return <option className='w-32 px-8 text-xl font-bold text-black transition hover:bg-[#e6e6e6]' value={index+1}>{index+1}</option>})
           }
         </select>
         <select className='rounded bg-white w-32 px-8 text-xl font-bold text-black transition hover:bg-[#e6e6e6]' onChange={(e) => {setepisode(e.target.value)}}>
         {
           episodes.map((episode:Episode)=>{
           return <option className='w-32 px-8 text-xl font-bold text-black transition hover:bg-[#e6e6e6]' value={episode.episode_number}>{episode.name}</option>
           })
           }
         </select>
              </div>
         
         :<></>}
              <button className="modalButton">
                {addedToList ? (
                  <CheckIcon className="h-7 w-7" />
                ) : (
                  <PlusIcon className="h-7 w-7" />
                )}
              </button>
              <button className="modalButton">
                <ThumbUpIcon className="h-6 w-6" />
              </button>
            </div>
            <button className="modalButton" onClick={() => setMuted(!muted)}>
              {muted ? (
                <VolumeOffIcon className="h-6 w-6" />
              ) : (
                <VolumeUpIcon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
        <div className="flex space-x-16 rounded-b-md bg-[#181818] px-10 py-8">
          <div className="space-y-6 text-lg">
            <div className="flex items-center space-x-2 text-sm">
              <p className="font-semibold text-green-400">
                {movie!.vote_average * 10}% Match
              </p>
              <p className="font-light">
                {movie?.release_date || movie?.first_air_date}
              </p>
              <div className="flex h-4 items-center justify-center rounded border border-white/40 px-1.5 text-xs">
                HD
              </div>
            </div>
            <div className="flex flex-col gap-x-10 gap-y-4 font-light md:flex-row">
              <p className="w-5/6">{movie?.overview}</p>
              <div className="flex flex-col space-y-3 text-sm">
                <div>
                  <span className="text-[gray]">Genres:</span>{' '}
                  {genres.map((genre) => genre.name).join(', ')}
                </div>

                <div>
                  <span className="text-[gray]">Original language:</span>{' '}
                  {movie?.original_language}
                </div>

                <div>
                  <span className="text-[gray]">Total votes:</span>{' '}
                  {movie?.vote_count}
                </div>
              </div>
            </div>
          </div>
        </div>  
      </>
    </MuiModal>
  )
}

export default Modal