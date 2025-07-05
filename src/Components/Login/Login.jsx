import React, { use } from "react";
import Logo from "../Logo/Logo";
import { NavLink } from "react-router";
import { useForm } from "react-hook-form";
import Context from "../Contexts/Context";
// import { register } from "swiper/element";

const Login = () => {
  const { user, signInWithEmailAndPass } = use(Context);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    const email = data.email;
    const password = data.password;

    signInWithEmailAndPass(email, password)
      .then((res) => {
        console.log(res.user);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  return (
    <div className="w-9/12 mx-auto my-5">
      <Logo></Logo>

      <div className="hero">
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <h1 className="text-5xl font-bold">Login now!</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
              <fieldset className="fieldset">
                <label className="label">Email</label>
                <input
                  {...register("email", { required: true })}
                  type="email"
                  className="input"
                  placeholder="Email"
                />
                {errors.email?.type === "required" && (
                  <p role="alert" className="text-red-500">
                    Email Field is required
                  </p>
                )}
                <label className="label">Password</label>
                <input
                  {...register("password", {
                    required: true,
                    minLength: 6,
                  })}
                  type="password"
                  className="input"
                  placeholder="Password"
                />
                {errors.password?.type === "required" && (
                  <p className="text-red-500">Password is required</p>
                )}
                {errors.password?.type === "minLength" && (
                  <p className="text-red-500">
                    Password must be more than 6 characters
                  </p>
                )}
                <div>
                  <a className="link link-hover">Forgot password?</a>
                </div>
                <button className="btn btn-neutral mt-4">Login</button>
              </fieldset>
            </form>
            <NavLink to="/signup">
              Don't have any account yet ?{" "}
              <span className="text-red-500">Sign Up!</span>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
