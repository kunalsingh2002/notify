import Head from "next/head";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { AiFillLock } from "react-icons/ai";
import { useRouter } from "next/router";
import Image from "next/image";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const router = useRouter();

    const [formValues, setFormValues] = useState({
        email: "",
        password: "",
    });


    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const data = formValues;

        let res = await fetch('api/login', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify(data)
        })

        let response = await res.json()
        console.log(response)
        setFormValues({
            email: "",
            password: "",
        })
        if (response.success) {
            localStorage.setItem("current_user_email", data.email);
            toast.success('Successfully Logged in', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            setTimeout(() => {
                router.push("/dashboard")
            }, 1000)
        }
        else {
            if(response.error) {
                toast.error(response.error, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
        }
    }


    //   useEffect(() => {
    //     if (user) {
    //       router.push("/");
    //       return;
    //     }
    //   }, [user]);
    return (
        <div>
            {/* <Head>
        <title>Login</title>
        <meta
          name="description"
          content="Codeswear-Engineered For Excellence"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head> */}
            <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />
                <div className="w-full max-w-md space-y-8">
                    <div>
                        {/* <Image
                            className="mx-auto h-12 w-auto"
                            src="/logo.png"
                            alt="Your Company"
                            width={50}
                            height={50}
                        /> */}
                        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                            Sign in to your account
                        </h2>
                        <p className="mt-2 text-center text-sm text-gray-600">
                            Or{" "}
                            <Link
                                href="/signup"
                                className="font-medium text-indigo-600 hover:text-indigo-500"
                            >
                                Signup
                            </Link>
                        </p>
                    </div>
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit} >
                        <div className="-space-y-px rounded-md shadow-sm">
                            <div>
                                <label htmlFor="email-address" className="sr-only">
                                    Email address
                                </label>
                                <input
                                    id="email-address"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    value={formValues.email}
                                    onChange={(e) =>
                                        setFormValues({
                                            ...formValues,
                                            [e.target.name]: e.target.value,
                                        })
                                    }
                                    className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-pink-500 focus:outline-none focus:ring-pink-500 sm:text-sm"
                                    placeholder="Email address"
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="sr-only">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    value={formValues.password}
                                    onChange={(e) =>
                                        setFormValues({
                                            ...formValues,
                                            [e.target.name]: e.target.value,
                                        })
                                    }
                                    autoComplete="current-password"
                                    required
                                    className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-pink-500 focus:outline-none focus:ring-pink-500 sm:text-sm"
                                    placeholder="Password"
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-center">
                            <div className="text-sm">
                                <Link
                                    href="/forgot"
                                    className="font-medium text-indigo-600 hover:text-indigo-500"
                                >
                                    Forgot your password?
                                </Link>
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                    <AiFillLock
                                        className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                                        aria-hidden="true"
                                    />
                                </span>
                                Sign In
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login