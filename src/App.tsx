import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

const createUserFormSchema = z.object({
  username: z.string()
    .nonempty("Username is required")
    .regex(/^[A-Za-z]+$/i, "Only letters are allowed"),
  password: z.string()
    .nonempty("Password is required"),
  confirm_password: z.string()
    .nonempty("Confirm password is required")
})
.refine(({ password, confirm_password}) => password === confirm_password, {
  message: "Password doesn't match",
  path: ["confirm_password"]
})

type createUserFormData = z.infer<typeof createUserFormSchema>

function App() {

  const { register, handleSubmit, formState: { errors } } = useForm<createUserFormData>({
    resolver: zodResolver(createUserFormSchema)
  })

  const onSubmit = (data:any) => {
    console.log(data)
  }

  return (
    <>
      <h1>Create User Form</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="username">Username</label>
          <input {...register("username")} />
          {errors.username && <span>{errors.username.message}</span>}
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input {...register("password")} />
          {errors.password && <span>{errors.password.message}</span>}
        </div>
        <div>
          <label htmlFor="confirm_password">Confirm password</label>
          <input {...register("confirm_password")} />
          {errors.confirm_password && <span>{errors.confirm_password.message}</span>}
        </div>
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default App;
