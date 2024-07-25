"use client";

import { useRouter } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { auth } from "../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useAuth } from "./context/AuthContext";
import { useEffect, useState } from "react";
import { Envelope, Lock } from "phosphor-react";
import styles from './(auth)/create-account/create-account.module.css';


const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function Home() {
  const router = useRouter();
  const { user } = useAuth();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      router.push("/dashboard");
    } catch (error) {
      setErrorMessage("Failed to login. Please check your credentials.");
    }
  };

  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [user, router]);

  return (
    <div>
      <div className="d-block d-md-none">
        <Image src="/images/logo.png" alt="" width={184} height={40} />
      </div>
      <div className="d-flex flex-column justify-content-center align-items-center p-2 p-md-5">
        <Image src="/images/logo.png" className="my-4 d-none d-md-block" alt="" width={184} height={40} />
        
        <div className={`${styles.loginBox} p-1 p-md-5 mt-2 mt-md-0`}>
          <h2>Login</h2>
          <p>Add your details below to get back into the app</p>
          <form onSubmit={handleSubmit(onSubmit)} className="d-flex flex-column justify-content-center">
          <div className=" d-flex flex-column my-2">
              <div className=""><label htmlFor="">Email address</label></div>
             <div className="d-flex input-group">
              <span className={`input-group-text ${styles.icon}`}><Envelope /></span>
              <input type="text" placeholder="e.g. alex@email.com" style={{borderLeft :"0" }} className="form-control" {...register("email")} />
              </div>
              </div>
            {errors.email && <p className="text-danger">{errors.email.message}</p>}
            
            <div className=" d-flex flex-column my-3">
              <div className=""><label htmlFor="">Password</label></div>
             <div className="d-flex input-group">
               <span className={`input-group-text ${styles.icon}`}><Lock /></span>
              <input type="password" placeholder="Enter your password" style={{borderLeft :"0" }} className="form-control" {...register("password")} />
            </div>
             </div>
            {errors.password && <p className="text-danger">{errors.password.message}</p>}
            
            <button className="p-2 text-white form-control mt-3" style={{ backgroundColor: "#633CFF" }}>
              Log in
            </button>
            {errorMessage && <p className="text-danger mt-3">{errorMessage}</p>}
          </form>
          <p className="text-center mt-3">Don’t have an account? <Link href="/create-account" style={{ textDecoration: "none" }}><span style={{ color: "#633CFF" }}>Sign up</span></Link></p>
        </div>
      </div>
    </div>
  );
}
