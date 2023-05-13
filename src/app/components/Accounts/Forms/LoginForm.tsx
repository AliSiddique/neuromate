import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import {Auth, GoogleAuthProvider, OAuthProvider, User, UserCredential, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth } from '../../../../../firebase.config';
import Image from 'next/image'
import Link from "next/link";
import toast from "react-hot-toast";
import { CheckCircleIcon, XMarkIcon } from "@heroicons/react/20/solid";

// Custom Auth type
interface CustomAuth extends Auth {}
// Schema for yup
const schema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(8).max(20).required(),
}).required();
// Type for form data
type FormData = yup.InferType<typeof schema>;

export default function LoginForm() {
  // React hook form
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(schema)
  });
  // On submit
  const onSubmit = async (data: FormData): Promise<void>  => {
    console.log(data);
    const { email, password } = data;
    try {
      const userCredential:UserCredential = await signInWithEmailAndPassword(auth as CustomAuth, email, password);
      // Signed in
      const user:User = userCredential.user;
      console.log(user);
      // ...
    } catch (error:any) {
      // Handle error
      console.log(error);
    }
  };

  const SignupWithGoogle = async (): Promise<void> => {
    const provider = new GoogleAuthProvider();
    try {
      const userCredential:UserCredential = await signInWithPopup(auth as CustomAuth, provider);
      // Signed in
      const user:User = userCredential.user;

    } catch (error:any) {
      // Handle error
      console.log(error);
    }
  }

  const signInWithApple = async() => {
    // Create an instance of the Apple provider
    const provider = new OAuthProvider('apple.com');
  
    // Sign in with the Apple provider
    try {
      const userCredential:UserCredential = await signInWithPopup(auth as CustomAuth, provider);
      // Signed in
      const user:User = userCredential.user;
      console.log(user);

    } catch (error:any) {
      // Handle error
      console.log(error);
    }

 
  };
  

    const handleToast = () => {
      return toast.custom((t) => (
        <div
          className={`${
            t.visible ? 'animate-enter' : 'animate-leave'
          } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
        >
         <div className="pointer-events-auto w-full  max-w-md overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
    <div className="p-4">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <CheckCircleIcon className="h-6 w-6 text-green-400" aria-hidden="true" />
        </div>
        <div className="ml-3 w-0 flex-1 pt-0.5">
          <p className="text-sm font-medium text-gray-900">Successfully saved!</p>
          <p className="mt-1 text-sm text-gray-500">Anyone with a link can now view this file.</p>
        </div>
        <div className="ml-4 flex flex-shrink-0">
          <button
            type="button"
            className="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            onClick={() => toast.dismiss(t.id)}
          >
            <span className="sr-only">Close</span>
            <XMarkIcon className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  </div>
        </div>
      ))
      }

    return (
      <>
        <div className="flex min-h-full h-screen flex-1">
          <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
            <div className="mx-auto w-full max-w-sm lg:w-96">
              <div>
                <Image
                  className="h-10 w-auto"
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                  alt="Your Company"
                  width={40}
                  height={40}
                />
                <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">
                  Sign in to your account
                </h2>
                <button onClick={handleToast}>click </button>
                <p className="mt-2 text-sm leading-6 text-gray-500">
                  Not a member?{' '}
                  <Link href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Start a 14 day free trial
                  </Link>
                </p>
              </div>
  
              <div className="mt-10">
                <div>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                        Email address
                      </label>
                      <div className="mt-2">

                        <input
                          id="email"
                          {...register("email")}
                          name="email"
                          type="email"
                          autoComplete="email"
                          required
                          className={errors.email?.message ? "block w-full rounded-md border-0 py-1.5 shadow-sm ring-2 ring-inset ring-red-700 placeholder:text-gray-400 focus:ring-2   sm:text-sm sm:leading-6" : "block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"}
                        />
                      </div>
                      <p>{errors.email?.message}</p>

                    </div>
  
                    <div>
                      <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                        Password
                      </label>
                      <div className="mt-2">
                        <input
                          id="password"
                          type="password"
                          {...register("password")}
                          autoComplete="current-password"
                          required
                          className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
  
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <input
                          id="remember-me"
                          name="remember-me"
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                        <label htmlFor="remember-me" className="ml-3 block text-sm leading-6 text-gray-700">
                          Remember me
                        </label>
                      </div>
  
                      <div className="text-sm leading-6">
                        <Link href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                          Forgot password?
                        </Link>
                      </div>
                    </div>
  
                    <div>
                      <button
                        type="submit"
                        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        Sign in
                      </button>
                    </div>
                  </form>
                </div>
  
                <div className="mt-10">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center" aria-hidden="true">
                      <div className="w-full border-t border-gray-200" />
                    </div>
                    <div className="relative flex justify-center text-sm font-medium leading-6">
                      <span className="bg-white px-6 text-gray-900">Or continue with</span>
                    </div>
                  </div>
  
                  <div className="mt-6 grid grid-cols-2 gap-4">
                    <button
                      onClick={signInWithApple}
                      className="flex w-full items-center justify-center gap-3 rounded-md bg-[#1D9BF0] px-3 py-1.5 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D9BF0]"
                    >
                      <svg className="h-5 w-5" viewBox="0 0 256 315" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid">
                              <g>
                                  <path d="M213.803394,167.030943 C214.2452,214.609646 255.542482,230.442639 256,230.644727 C255.650812,231.761357 249.401383,253.208293 234.24263,275.361446 C221.138555,294.513969 207.538253,313.596333 186.113759,313.991545 C165.062051,314.379442 158.292752,301.507828 134.22469,301.507828 C110.163898,301.507828 102.642899,313.596301 82.7151126,314.379442 C62.0350407,315.16201 46.2873831,293.668525 33.0744079,274.586162 C6.07529317,235.552544 -14.5576169,164.286328 13.147166,116.18047 C26.9103111,92.2909053 51.5060917,77.1630356 78.2026125,76.7751096 C98.5099145,76.3877456 117.677594,90.4371851 130.091705,90.4371851 C142.497945,90.4371851 165.790755,73.5415029 190.277627,76.0228474 C200.528668,76.4495055 229.303509,80.1636878 247.780625,107.209389 C246.291825,108.132333 213.44635,127.253405 213.803394,167.030988 M174.239142,50.1987033 C185.218331,36.9088319 192.607958,18.4081019 190.591988,0 C174.766312,0.636050225 155.629514,10.5457909 144.278109,23.8283506 C134.10507,35.5906758 125.195775,54.4170275 127.599657,72.4607932 C145.239231,73.8255433 163.259413,63.4970262 174.239142,50.1987249" fill="#000000"></path>
                              </g>
                          </svg>
                      <span className="text-sm font-semibold leading-6">Apple</span>
                    </button>
  
                    <button
                      onClick={SignupWithGoogle}
                      className="flex w-full items-center justify-center gap-3 rounded-md bg-[#24292F] px-3 py-1.5 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#24292F]"
                    >
                      <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48" width="48px" height="48px"><path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/></svg>
                      <span className="text-sm font-semibold leading-6">Google</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="relative hidden w-0 flex-1 lg:block">
            <Image
              className="absolute inset-0 h-full w-full object-cover"
              src="https://images.unsplash.com/photo-1617791160536-598cf32026fb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1664&q=80"
              alt=""
              width={500}
              height={500}
            />
          </div>
        </div>
      </>
    )
  }
  