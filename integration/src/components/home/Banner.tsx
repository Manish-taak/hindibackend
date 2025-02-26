import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form"
import * as yup from "yup";
interface login {
  email: string,
  password: string
}
const Banner = () => {
  const schema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().required("password required").min(6, "Password must be at least 6 characters")
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<login>({
    resolver: yupResolver(schema)
  });
  const onSubmit: SubmitHandler<login> = async (data) => {
    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Login failed");
      }
      localStorage.setItem("token", result.token); // Save token
      alert(result.message)
    } catch (err) {
      alert(err)
    }
  }
  return (
    <div>
      <h1 className="text-4xl italic text-green-500 capitalize text-center my-5">
        login
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <input placeholder="Email" className={`p-3 border border-green-300 outline-none rounded ${errors.email && "input-error"}`} {...register("email", { required: true })} type="text" />
        {errors.email && <span className="text-red-500">{errors.email.message}</span>}

        <input placeholder="Password" className={`p-3 border border-green-300 outline-none rounded ${errors.password && "input-error"}`} {...register("password", { required: true })} type="text" />
        {errors.password && <span className="text-red-500">{errors.password.message}</span>}
        <button className="capitalize py-2 px-4 text-white bg-green-500 text-xl cursor-pointer w-auto hover:bg-green-600" type="submit">submit</button>
      </form>
    </div>
  )
}

export default Banner
