"use client"
import {use, useState} from "react"
import {useRouter} from "next/navigation"
import {signIn} from "next-auth/react"
import toast from "react-hot-toast"
import { FcGoogle } from "react-icons/fc"
import { FaGithub } from "react-icons/fa"
export default function Login() {
  const router = useRouter()
          const [data, setData] = useState({
                    email: "",
                    password:""
                    
          })
          const handleSubmit = async (e:any)=>{
                    e.preventDefault()
                   toast.loading("Please wait a minute!", {id: "loading"})
                   signIn("credentials",{...data, redirect: false}).then((callback:any)=>{
                    toast.dismiss("loading")
                    if(callback?.error){
                      toast.error(callback.error)
                    }
                    if(!callback?.error && callback?.ok){
                              toast.success("Logged in successfully!")
                              router.push("/dashboard")
                              
                    }

                   })
          }
          const handleChange =  (e:any)=>{
                    const {name, value} = e.target
                    setData((prev:any)=>({...prev, [name]:value}))
          }



          //login with auth
          const handleOath = (accountType:string)=>{
            toast.loading("Please wait a second!")
            signIn(accountType, {callbackUrl: "/dashboard",  redirect:false })
          }

          return (
            <>
           
              <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                  <img
                    className="mx-auto h-10 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                    alt="Your Company"
                  />
                  <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Sign in to your account
                  </h2>
                </div>
        
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                  <form className="space-y-6">
                 

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                        Email address
                      </label>
                      <div className="mt-2">
                        <input
                          value={data.email}
                          onChange={handleChange}
                          id="email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          required
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
        
                    <div>
                      <div className="flex items-center justify-between">
                        <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                          Password
                        </label>
                        <div className="text-sm">
                          <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                            Forgot password?
                          </a>
                        </div>
                      </div>
                      <div className="mt-2">
                        <input
                          value={data.password}
                          onChange={handleChange}
                          id="password"
                          name="password"
                          type="password"
                          autoComplete="current-password"
                          required
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
        
                    <div>
                      <button
                        type="submit"
                        onClick={handleSubmit}
                        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                      Login
                      </button>
                    </div>
                  </form>
        
                  <p className="mt-10 text-center text-sm text-gray-500">
                    Not a member?{' '}
                    <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                      Start a 14 day free trial
                    </a>
                  </p>
                  <p className="text-center w-full text-blue-600">sign in with:</p>
                  <div className="flex justify-center w-ful mt-4 gap-6">
                 <button onClick={()=>handleOath("google")} className="text-[40px] hover:scale-110 duration-150 ease-linear"><FcGoogle /></button>
                 <button onClick={()=>handleOath("github")} className="text-[40px] hover:scale-110 duration-150 ease-linear"><FaGithub /></button>

                  </div>
                </div>
              </div>
            </>
          )
        }
