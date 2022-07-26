import React, { useEffect, useState } from 'react'
import {SearchIcon , BellIcon } from '@heroicons/react/solid'
import useAuth from '../hooks/useAuth'
import { XIcon } from '@heroicons/react/outline'
import Router, { useRouter } from 'next/router'


function Header() {

const [isScrolled,setisScrolled] = useState(false)
const [search,setSearch]= useState(false)
const [query, setquery] = useState('');


const {logout} = useAuth()

useEffect (()=>{
    const handleScroll = ()=>{
        if(window.scrollY>0){
            setisScrolled(true)
        }else{
            setisScrolled(false)
        }
    }

    window.addEventListener("scroll",handleScroll)

    return ()=>{
        window.removeEventListener("scroll",handleScroll)
    }
},[])

const onChange = (e:any) =>{
  const { value } = e.target;
    setquery(value);
}

  
async function searchMovie (){

  if(query!=""){Router.push(`/search/${query}`)}}
  
  


  return (
    <header className={`${isScrolled && 'bg-[#141414]'}`}>
        <div className='flex items-center space-x-2 md:space-x-10 '>
        <img
          src="https://rb.gy/ulxxee"
          width={100}
          height={100}
          className="cursor-pointer object-contain"
        />
        <ul className='hidden space-x-4 md:flex'>
            <li className='headerLink'>Home</li>
            <li className='headerLink'>TV shows</li>
            <li className='headerLink'>Movies</li>
            <li className='headerLink'>new & populair</li>
            
        </ul>
        </div>

        <div className='flex items-center space-x-4 text-sm font-light'>
            <div className={`flex items-center justify-center h-10 pl-1 ${search? 'border border-white': ''}`}>
                  <SearchIcon onClick={()=>{!search?setSearch(true):searchMovie()}} className="w-6 h-6 cursor-pointer"/>
                              {search?
                              <div className='flex'>
                              <input className='w-36 bg-transparent text-white border-opacity-0 outline-none'
                              type="text"
                              placeholder={"Titles, people, genres"}
                              value ={query}
                              onChange={onChange}
                             
                               />
                              <XIcon className='h-6 w-6' onClick={()=>{setSearch(false)}}/></div>  : <></> }
               </div>
            

            <BellIcon className="h-6 w-6"/>
            <img onClick={logout}
            src="https://rb.gy/g1pwyx"
            alt=""
            className="cursor-pointer rounded"
          />
            
        </div>
    </header>
  )

  }
export default Header
