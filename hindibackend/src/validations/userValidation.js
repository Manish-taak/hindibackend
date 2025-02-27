import * as yup from "yup"

 const registerSchema = yup.object().shape({
    name: yup.string().required("name is required"),
    email: yup.string().required("email is required").email("enter a valid email"),
    password: yup.string().required("enter your password").matches(
        /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
        "Password must be at least 6 characters, include 1 uppercase letter, 1 number, and 1 special character"
    )

})
 const updatePasswordSchema = yup.object().shape({
    email: yup.string().required("email is required").email("enter a valid email"),
    newpassword: yup.string().required("enter your password").matches(
        /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
        "Password must be at least 6 characters, include 1 uppercase letter, 1 number, and 1 special character"
    )

})

const createUserSchema = yup.object({
    name: yup.string().required("Name is required"),
    email: yup.string().email("Please enter a valid email").required("Email is required"),
    images: yup
      .array()
      .of(
        yup.string().matches(/\.(jpg|jpeg|png)$/, "Only JPG, JPEG, and PNG formats are allowed")
      )
      .min(1, "Please upload at least one image")
      .required("Images are required"),
  });


export{registerSchema,updatePasswordSchema,createUserSchema}










