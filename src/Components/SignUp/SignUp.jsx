import React, { use } from "react";
import Logo from "../Logo/Logo";
import { NavLink, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import Context from "../Contexts/Context";
// import Logos from "../Logos/Logos";

const SignUp = () => {
  const navigate = useNavigate();
  const { user, createUserWithEmailPass } = use(Context);
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const email = data.email;
    const password = data.password;

    createUserWithEmailPass(email, password)
      .then((res) => {
        console.log(res.user);
        navigate("/");
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  return (
    <div className="w-9/12 mx-auto my-5">
      <Logo></Logo>
      <div className="lg:flex lg:items-center lg:justify-center lg:h-screen">
        <div className="hero">
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <div className="card-body">
              <h1 className="text-5xl font-bold">Sign Up!</h1>
              <form onSubmit={handleSubmit(onSubmit)}>
                <fieldset className="fieldset">
                  <label className="label">Name</label>
                  <input
                    {...register("name", { required: true })}
                    type="text"
                    className="input"
                    placeholder="name"
                  />
                  {errors.name?.type === "required" && (
                    <p className="text-red-500">Name is required</p>
                  )}
                  <label className="label">Email</label>
                  <input
                    {...register("email", { required: true })}
                    type="email"
                    className="input"
                    placeholder="Email"
                  />
                  {errors.email?.type === "required" && (
                    <p className="text-red-500">email is required</p>
                  )}
                  <label className="label">Password</label>
                  <input
                    {...register("password", { required: true, minLength: 6 })}
                    type="password"
                    className="input"
                    placeholder="Password"
                  />
                  {errors.password?.type === "required" && (
                    <p className="text-red-500">password is required</p>
                  )}
                  {errors.password?.type === "minLength" && (
                    <p>password must be 6 characters or long</p>
                  )}
                  <div>
                    <a className="link link-hover">Forgot password?</a>
                  </div>
                  <button className="btn btn-neutral mt-4">Sign Up</button>
                </fieldset>
              </form>
              <NavLink to="/login">
                Have An Account ? <span className="text-red-500">Log In</span>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
