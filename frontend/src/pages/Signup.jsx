import React from 'react'

const Signup = () => {
  return (
    <>
        <div class="mx-auto flex h-screen max-w-lg flex-col md:max-w-none md:flex-row md:pr-10 items-center justify-center">
            <div class="px-4 py-20">
                <h2 class="mb-2 text-3xl font-bold">Sign Up</h2>
                <a href="#" class="mb-10 block font-bold text-gray-600">Have an account</a>
                <p class="mb-1 font-medium text-gray-500">Looking for?</p>
                <div class="mb-6 flex flex-col gap-y-2 gap-x-4 lg:flex-row">
                <div class="relative flex w-56 items-center justify-center rounded-xl bg-gray-50 px-4 py-3 font-medium text-gray-700">
                    <input class="peer hidden" type="radio" name="radio" id="radio1" checked />
                    <label class="peer-checked:border-blue-600 peer-checked:bg-blue-200 absolute top-0 h-full w-full cursor-pointer rounded-xl border" for="radio1"> </label>
                    <div class="peer-checked:border-transparent peer-checked:bg-blue-600 peer-checked:ring-2 absolute left-4 h-5 w-5 rounded-full border-2 border-gray-300 bg-gray-200 ring-blue-600 ring-offset-2"></div>
                    <span class="pointer-events-none z-10">Projects</span>
                </div>
                <div class="relative flex w-56 items-center justify-center rounded-xl bg-gray-50 px-4 py-3 font-medium text-gray-700">
                    <input class="peer hidden" type="radio" name="radio" id="radio3" checked />
                    <label class="peer-checked:border-blue-600 peer-checked:bg-blue-200 absolute top-0 h-full w-full cursor-pointer rounded-xl border" for="radio3"> </label>
                    <div class="peer-checked:border-transparent peer-checked:bg-blue-600 peer-checked:ring-2 absolute left-4 h-5 w-5 rounded-full border-2 border-gray-300 bg-gray-200 ring-blue-600 ring-offset-2"></div>
                    <span class="pointer-events-none z-10">Job</span>
                </div>
                </div>
                <p class="mb-1 font-medium text-gray-500">Email</p>
                <div class="mb-4 flex flex-col">
                <div class="focus-within:border-blue-600 relativeflex overflow-hidden rounded-md border-2 transition sm:w-80 lg:w-full">
                    <input type="email" id="signup-email" class="w-full border-gray-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none" placeholder="Enter your email" />
                </div>
                </div>
                <p class="mb-1 font-medium text-gray-500">Password</p>
                <div class="mb-4 flex flex-col">
                <div class="focus-within:border-blue-600 relative flex overflow-hidden rounded-md border-2 transition sm:w-80 lg:w-full">
                    <input type="password" id="signup-password" class="w-full border-gray-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none" placeholder="Choose a password (minimum 8 characters)" />
                </div>
                </div>
                <button class="hover:shadow-blue-600/40 rounded-xl bg-linear-to-r from-blue-700 to-blue-600 px-8 py-3 font-bold text-white transition-all hover:opacity-90 hover:shadow-lg">Sign Up</button>
            </div>
        </div>
    </>
  )
}

export default Signup