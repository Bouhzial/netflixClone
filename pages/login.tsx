import Head from 'next/head'
import Image from 'next/image'
import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import useAuth from '../hooks/useAuth';

interface Inputs {
    email:string,
    password:string,
}



  function login() {
    const [login, setlogin] = useState(false)
    const { signIn, signUp } = useAuth()
  
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<Inputs>()
  
    const onSubmit: SubmitHandler<Inputs> = async (data) => {
      console.log(data)
      if (login) {
        await signIn(data.email, data.password)
      } else {
        await signUp(data.email, data.password)
      }
    }


  return (
    <div className='relative flex h-screen w-screen flex-col  md:items-center md:justify-center md:bg-transparent'>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head> 
      <Image
        src="https://rb.gy/p2hphi"
        layout="fill"
        className="-z-10  opacity-60 "
        objectFit="cover"
      /> 
        <img
        src="https://rb.gy/ulxxee"
        className="absolute left-4 top-4 cursor-pointer object-contain md:left-10 md:top-6"
        width={150}
        height={150}
      />  
        <form 
        onSubmit={handleSubmit(onSubmit)}
        className='relative mt-24 space-y-8 bg-black/75 py-10 px-6 rounded md:mt-0 md:py-14 md:max-w-md'>
            <h1 className='text-4xl font-semibold'>
                Sign In
            </h1>
            <div className='w-full'>
                <label className='inline-block w-full m-1'>
                    <input type="email" placeholder='email' className='input' {...register("email" ,{required:true})} />
                    {errors.email && <p className='p-1 text-[13px] text-orange-500 font-light'>email can't be blank</p>}
                </label>
                <label className='inline-block w-full m-1'>
                    <input type="password" placeholder='password' className='input' {...register("password" ,{required:true})} />
                    {errors.password && <p className='p-1 text-[13px] text-orange-500 font-light'>password can't be blank</p>}
                </label>
            </div>

            <button className='w-full rounded bg-[#e50414] py-3 ' onClick={()=>{setlogin(true)}}>
                Sign In
            </button>

            <div className='text-[gray]/95'>
                New To Netflix?{" "}
                <button onClick={()=>{setlogin(false)}} type='submit' className='text-white hover:underline'>Sign Up Now</button>
            </div>
        </form>
        
    </div>
  )
}

export default login