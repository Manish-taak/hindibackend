import { SubmitHandler, useForm } from "react-hook-form";

interface updatePassword {
    email: string,
    password: string
}
const UpdatePassword = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<updatePassword>();
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
                <input {...register("password", { required: true })} type="text" placeholder="Password" className={`p-3 border border-green-300 outline-none rounded ${errors.password && "input-error"}`} />
                <button type="submit" className="capitalize py-2 px-4 text-white bg-green-500 text-xl cursor-pointer w-auto hover:bg-green-600">Register</button>
            </form>
        </>
    )
}

export default UpdatePassword
