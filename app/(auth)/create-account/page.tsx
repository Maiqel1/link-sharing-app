"use client";

import { useRouter } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { auth } from "../../../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import styles from './create-account.module.css';
import { Envelope, Lock } from "phosphor-react";
import Navbar from "@/app/components/Navbar";

const signupSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string().min(8, "Password must be at least 8 characters"),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type SignupFormValues = z.infer<typeof signupSchema>;

const CreateAccount = () => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { register, handleSubmit, formState: { errors } } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupFormValues) => {
    try {
      await createUserWithEmailAndPassword(auth, data.email, data.password);
      router.push("/dashboard");
    } catch (error) {
      setErrorMessage("Failed to create account. Please try again.");
    }
  };

  return (
    <div>
      <div className="d-block d-md-none">
        <Image src="/images/logo.png" alt="" width={184} height={40} />
      </div>
      <div className="d-flex flex-column justify-content-center align-items-center p-2 p-md-5">
        <Image src="/images/logo.png" className="my-4 d-none d-md-block" alt="" width={184} height={40} />
        <div className="p-1 p-md-5 mt-5 mt-md-0 d-block d-md-none">
          <h2>Create account</h2>
          <p>Let’s get you started sharing your links!</p>
          <form onSubmit={handleSubmit(onSubmit)} className="d-flex flex-column justify-content-center">
          <div className=" d-flex flex-column mb-3">
              <div className=""><label htmlFor="">Email address</label></div>
             <div className="d-flex input-group">
              <span className={`input-group-text ${styles.icon}`}><Envelope height={16} width={16} /></span>
              <input type="text" placeholder="e.g. alex@email.com" style={{borderLeft :"0" }} className="form-control" {...register("email")} />
            </div>
            </div>
            {errors.email && <p className="text-danger">{errors.email.message}</p>}
            
            <div className=" d-flex flex-column mb-3">
              <div className=""><label htmlFor="">Password</label></div>
             <div className="d-flex input-group">
              <span className={`input-group-text ${styles.icon}`}><Lock height={16} width={16} /></span>
              <input type="password" placeholder="At least 8 characters" style={{borderLeft :"0" }} className="form-control" {...register("password")} />
            </div>
            </div>
            {errors.password && <p className="text-danger">{errors.password.message}</p>}
            
            <div className=" d-flex flex-column mt-3">
              <div className=""><label htmlFor="">Confirm password</label></div>
             <div className="d-flex input-group">
              <span className={`input-group-text ${styles.icon}`}><Lock height={16} width={16} /></span>
              <input type="password" placeholder="At least 8 characters" style={{borderLeft :"0" }} className="form-control" {...register("confirmPassword")} />
            </div>
            </div>

            {errors.confirmPassword && <p className="text-danger">{errors.confirmPassword.message}</p>}
            
            <button className="p-2 text-white form-control mt-3" style={{ backgroundColor: "#633CFF" }}>
              Create account
            </button>
            {errorMessage && <p className="text-danger mt-3">{errorMessage}</p>}
          </form>
          <p className="text-center mt-3">Don’t have an account? <Link href="/" style={{ textDecoration: "none" }}><span style={{ color: "#633CFF" }}>Log in</span></Link></p>
        </div>
      
        <div className={`${styles.createAccountBox} d-none d-md-block p-5 mt-5 mt-md-0 bg-white`}>  
          <h2>Create account</h2>
          <p>Let’s get you started sharing your links!</p>
          <form onSubmit={handleSubmit(onSubmit)} className="d-flex flex-column justify-content-center">
          <div className=" d-flex flex-column ">
              <div className=""><label htmlFor="">Email address</label></div>
             <div className="d-flex input-group">
              <span className={`input-group-text ${styles.icon}`}><Envelope height={16} width={16} /></span>
              <input type="text" placeholder="e.g. alex@email.com" style={{borderLeft :"0" }} className="form-control" {...register("email")} />
            </div>
            </div>
            
            {errors.email && <p className="text-danger">{errors.email.message}</p>}
            
            <div className=" d-flex flex-column mt-3">
              <div className=""><label htmlFor="">Password</label></div>
             <div className="d-flex input-group">
              <span className={`input-group-text ${styles.icon}`}><Lock height={16} width={16} /></span>
              <input type="password" placeholder="At least 8 characters" style={{borderLeft :"0" }} className="form-control" {...register("password")} />
            </div>
            </div>
            {errors.password && <p className="text-danger">{errors.password.message}</p>}
            
            <div className=" d-flex flex-column mt-3">
              <div className=""><label htmlFor="">Confirm password</label></div>
             <div className="d-flex input-group">
              <span className={`input-group-text ${styles.icon}`}><Lock height={16} width={16} /></span>
              <input type="password" placeholder="At least 8 characters" style={{borderLeft :"0" }} className="form-control" {...register("confirmPassword")} />
            </div>
            </div>

            {errors.confirmPassword && <p className="text-danger">{errors.confirmPassword.message}</p>}
            
            <button className="p-2 text-white form-control mt-3" style={{ backgroundColor: "#633CFF" }}>
              Create account
            </button>
            {errorMessage && <p className="text-danger mt-3">{errorMessage}</p>}
          </form>
          <p className="text-center mt-3">Already have an account? <Link href="/" style={{ textDecoration: "none" }}><span style={{ color: "#633CFF" }}>Log in</span></Link></p>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;
