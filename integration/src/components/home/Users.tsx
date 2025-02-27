
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";

interface UserForm {
  name: string;
  email: string;
  images: FileList | null; // Ensure images can be null
}

const schema: yup.ObjectSchema<UserForm> = yup.object({
  name: yup.string().required("Please fill your name"),
  email: yup.string().email("Please enter a valid email").required("Email is required"),
  images: yup
    .mixed<FileList>()
    .nullable() // Ensures compatibility with FileList | null
    .required("Please upload at least one image")
    .test("fileRequired", "Please upload at least one image", (value) => {
      return value instanceof FileList && value.length > 0;
    })
    .test("fileSize", "Each file must be less than 2MB", (value) => {
      return (
        value instanceof FileList &&
        Array.from(value).every((file) => file.size <= 2 * 1024 * 1024)
      );
    })
    .test("fileType", "Only JPG, PNG, and JPEG formats are allowed", (value) => {
      return (
        value instanceof FileList &&
        Array.from(value).every((file) =>
          ["image/jpeg", "image/png", "image/jpg"].includes(file.type)
        )
      );
    }),
});

const Users = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserForm>({
    resolver: yupResolver(schema),
    defaultValues: { images: null }, // Fix: Ensure default is null, not undefined
  });

  const onSubmit: SubmitHandler<UserForm> = async (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);

      if (data.images && data.images.length > 0) {
        Array.from(data.images).forEach((file) => {
          formData.append("images", file);
        });
      }

      const response = await fetch("http://localhost:5000/api/users", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Upload failed");
      }

      alert(result.message);
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div>
      <h1 className="text-4xl italic text-green-500 capitalize text-center my-5">
        User
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <input
          {...register("name")}
          className={`p-3 border border-green-300 outline-none rounded cursor-pointer ${
            errors.name && "input-error"
          }`}
          type="text"
          placeholder="Name"
        />
        {errors.name && <span className="text-red-500">{errors.name.message}</span>}

        <input
          {...register("email")}
          className={`p-3 border border-green-300 outline-none rounded cursor-pointer ${
            errors.email && "input-error"
          }`}
          type="text"
          placeholder="Email"
        />
        {errors.email && <span className="text-red-500">{errors.email.message}</span>}

        <input
          {...register("images")}
          className={`p-3 border border-green-300 outline-none rounded cursor-pointer ${
            errors.images && "input-error"
          }`}
          type="file"
          multiple
        />
        {errors.images && <span className="text-red-500">{errors.images.message}</span>}

        <button
          type="submit"
          className="capitalize py-2 px-4 text-white bg-green-500 text-xl cursor-pointer w-auto hover:bg-green-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Users;
