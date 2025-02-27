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



export{registerSchema,updatePasswordSchema}










