import Head from 'next/head';
import React from 'react'
import { modelstate } from '../../atoms/atom';
import { useRecoilValue } from 'recoil';
import Baner from '../../components/Baner';
import Header from '../../components/Header';
import Model from '../../components/Model';
import Thumbnail from '../../components/Thumbnail';

export async function getServerSideProps(context:any) {
  const slug = context.params.id;
  

  if (!slug) {
    return {
      notFound: true,
    };
  }
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY
  const response = await(fetch(`https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&query=${slug}`))
  const movies = await response.json()

  if (!movies) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
        movies:movies,
    },
  };
}

export default function id({movies}:any) {
  const model = useRecoilValue(modelstate)
  return (


<div className="relative h-screen bg-gradient-to-b from-gray-900/10 to-[#010511] lg:h-[140vh]">
<Head>
  <title>Create Next App</title>
  <link rel="icon" href="/favicon.ico" />
</Head>
<Header/>
 
      <main className='relative pl-4 pb-24 lg:space-y-24 lg:pl-16'>
 <Baner netflixOriginals={movies.results} searched={false}/>
        <section className='grid grid-rows-10 lg:grid-rows-4 md:grid-rows-5 grid-flow-col gap-5 pr-4 lg:pr-16  '>
         {movies.results.map((movie:any) => (
              <Thumbnail key={movie.id} movie={movie} />
            ))}
 </section>
</main>
{model && <Model searched/>}
</div>
  )
}
