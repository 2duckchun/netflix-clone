'use client'

import axios from 'axios'
import { signIn } from 'next-auth/react'
import { useCallback, useState } from 'react'
import { FaGithub } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'
import { Button } from '@/shared/ui'
import { Input } from '@/shared/ui'

export function LoginAndSignContainer() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [variant, setVariant] = useState('login')

  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) =>
      currentVariant === 'login' ? 'register' : 'login',
    )
  }, [])

  const registerAndSignIn = useCallback(async () => {
    try {
      await axios.post('/api/register', {
        email,
        name,
        password,
      })
      signIn('credentials', {
        email,
        password,
        callbackUrl: '/profiles',
      })
    } catch (error) {
      console.error(error)
    }
  }, [email, name, password])

  return (
    <div className="flex justify-center">
      <div className="mt-2 w-full self-center rounded-md bg-black/70 p-14 lg:w-2/5 lg:max-w-md">
        <h2 className="mb-8 text-4xl font-semibold text-white">
          {variant === 'login' ? 'Login' : 'Create an account'}
        </h2>
        <div className="flex flex-col gap-4">
          {variant === 'register' && (
            <Input
              id="name"
              label="Username"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setName(event.target.value)
              }
              value={name}
              type="text"
            />
          )}

          <Input
            id="email"
            label="Email"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(event.target.value)
            }
            value={email}
            type="email"
          />
          <Input
            id="password"
            label="Password"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(event.target.value)
            }
            value={password}
            type="password"
          />
        </div>
        <Button
          onClick={
            variant === 'login'
              ? () =>
                  signIn('credentials', {
                    email,
                    password,
                    callbackUrl: '/profiles',
                  })
              : () => {
                  registerAndSignIn()
                }
          }
          className="mt-10 w-full rounded-md bg-red-600 py-3 text-white transition hover:bg-red-700"
        >
          {variant === 'login' ? 'Login' : 'Sign up'}
        </Button>
        <div
          onClick={() => signIn('google', { callbackUrl: '/profiles' })}
          className="mt-8 flex flex-row items-center justify-center gap-4"
        >
          <div className="flex size-10 cursor-pointer items-center justify-center rounded-full bg-white transition hover:opacity-80">
            <FcGoogle size={24} />
          </div>
          <div
            onClick={() => signIn('github', { callbackUrl: '/profiles' })}
            className="flex size-10 cursor-pointer items-center justify-center rounded-full bg-white transition hover:opacity-80"
          >
            <FaGithub size={24} />
          </div>
        </div>
        <p className="mt-12 text-neutral-500">
          {variant === 'login'
            ? 'First time using Netflex?'
            : 'Already have an account?'}
          <span
            onClick={toggleVariant}
            className="ml-1 cursor-pointer text-white hover:underline"
          >
            {variant === 'login' ? 'Create and account' : 'Login'}
          </span>
        </p>
      </div>
    </div>
  )
}

export default LoginAndSignContainer
