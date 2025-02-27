import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup"
interface updatePassword {
    email: string,
    password: string,
    newpassword: string
}
const UpdatePassword = () => {
    const schema = yup.object().shape({
        email: yup.string().required("email is required").email("please check your email"),
        password: yup.string().required("password is required"),
        newpassword: yup.string().required("password is required").matches(
            /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
            "Password must be at least 6 characters, include 1 uppercase letter, 1 number, and 1 special character"
        ),
    })
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<updatePassword>({
        resolver: yupResolver(schema)
    });
    const onSubmit: SubmitHandler<updatePassword> = async (data) => {
        try {
            const response = await fetch("http://localhost:5000/api/updatepassword", {
                method: "PUT",
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
        <>
            <h1 className="text-4xl italic text-green-500 capitalize text-center my-5">
                Change Password
            </h1>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
                <input {...register("email", { required: true })} type="text" placeholder="Email" className={`p-3 border border-green-300 outline-none rounded ${errors.email && "input-error"}`} />
                {errors.email && <span className="text-red-500">{errors.email.message}</span>}
                <input {...register("password", { required: true })} type="text" placeholder="Password" className={`p-3 border border-green-300 outline-none rounded ${errors.password && "input-error"}`} />
                {errors.password && <span className="text-red-500">{errors.password?.message}</span>}
                <input {...register("newpassword", { required: true })} type="text" placeholder="new password" className={`p-3 border border-green-300 outline-none rounded ${errors.newpassword && "input-error"}`} />
                {errors.password && <span className="text-red-500">{errors.newpassword?.message}</span>}
                <button type="submit" className="capitalize py-2 px-4 text-white bg-green-500 text-xl cursor-pointer w-auto hover:bg-green-600">Register</button>
            </form>
        </>
    )
}

export default UpdatePassword;
