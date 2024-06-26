import { useState } from 'react'
import { supabase } from 'lib/Store'
import { useRouter } from 'next/router'

const Home = () => {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async () => {
    try {
      const {
        error,
        data: { user },
      } = await supabase.auth.signInWithPassword({
        email: username,
        password,
      })

      // If the user doesn't exist here and an error hasn't been raised yet,
      // that must mean that a confirmation email has been sent.
      // NOTE: Confirming your email address is required by default.
      if (error) {
        console.log('error: ', error)
        alert('Error with auth: ' + error.message)
      } else {
        router.push('/channels')
      }
    } catch (error) {
      console.log('error', error)
      alert(error.error_description || error)
    }
  }
  const handleSignUp = async () => {
    try {
      const res = await supabase.auth.signUp({ email: username, password })
      console.log('res: ', res)

      // If the user doesn't exist here and an error hasn't been raised yet,
      // that must mean that a confirmation email has been sent.
      // NOTE: Confirming your email address is required by default.
      if (res?.error) {
        console.log('error: ', error)
      } else if (!res?.user)
        alert(
          'Signup successful, confirmation mail should be sent soon! Go check and login'
        )
    } catch (error) {
      console.log('error: ', error)
    }
  }
  return (
    <div className='w-full h-full flex justify-center items-center p-4 bg-gray-300'>
      <div className='w-full sm:w-1/2 xl:w-1/3'>
        <div className='border-teal p-8 border-t-12 bg-white mb-6 rounded-lg shadow-lg bg-white'>
          <div className='mb-4'>
            <label className='font-bold text-grey-darker block mb-2'>
              Email
            </label>
            <input
              type='text'
              className='block appearance-none w-full bg-white border border-grey-light hover:border-grey px-2 py-2 rounded shadow'
              placeholder='Your Username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className='mb-4'>
            <label className='font-bold text-grey-darker block mb-2'>
              Password
            </label>
            <input
              type='password'
              className='block appearance-none w-full bg-white border border-grey-light hover:border-grey px-2 py-2 rounded shadow'
              placeholder='Your password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className='flex flex-col gap-2'>
            <button
              onClick={handleSignUp}
              // href={'/channels'}
              className='bg-indigo-700 hover:bg-teal text-white py-2 px-4 rounded text-center transition duration-150 hover:bg-indigo-600 hover:text-white'
            >
              Sign up
            </button>
            <button
              onClick={handleLogin}
              className='border border-indigo-700 text-indigo-700 py-2 px-4 rounded w-full text-center transition duration-150 hover:bg-indigo-700 hover:text-white'
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
