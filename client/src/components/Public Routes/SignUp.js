import { FaRegUser } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";
import { MdOutlineMailOutline } from "react-icons/md";
import Button from "../Button";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const signUpSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid Email"),
    password: z.string().min(6, "Password must be at 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default function SignUp() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await fetch("http://localhost:5000/auth/signUpAuth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result);
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleClickHere = () => {
    navigate("/login");
  };

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="w-full mt-20 flex flex-col items-center justify-center gap-8">
        <h1 className="text-4xl font-semibold shadow-sm">Register</h1>
        <div className="w-1/3 border border-gray-200 p-5 rounded-lg shadow-lg">
          <form
            className="flex flex-col gap-3"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex items-center gap-5 p-2 border border-gray-200 rounded-md shadow-sm">
              <FaRegUser className="text-[#778899]" />
              <input
                required
                {...register("name")}
                type="text"
                placeholder="Name"
                className="text-[#778899] w-full h-8 outline-none focus:ring-0 focus:border-0"
              />
            </div>
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
            <div className="flex items-center gap-5 p-2 border border-gray-200 rounded-md shadow-sm">
              <MdOutlineMailOutline className="text-[#778899]" />
              <input
                required
                {...register("email")}
                type="email"
                placeholder="Email"
                className="text-[#778899] w-full h-8 outline-none focus:ring-0 focus:border-0"
              />
            </div>
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
            <div className="flex items-center gap-5 p-2 border border-gray-200 rounded-md shadow-sm">
              <RiLockPasswordLine className="text-[#778899]" />
              <input
                required
                {...register("password")}
                type="password"
                placeholder="Password"
                className="text-[#778899] w-full h-8 outline-none focus:ring-0 focus:border-0"
              />
            </div>
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
            <div className="flex items-center gap-5 p-2 border border-gray-200 rounded-md shadow-sm">
              <RiLockPasswordLine className="text-[#778899]" />
              <input
                required
                {...register("confirmPassword")}
                type="password"
                placeholder="Confirm Passwrod"
                className="text-[#778899] w-full h-8 outline-none focus:ring-0 focus:border-0"
              />
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500">{errors.confirmPassword.message}</p>
            )}
            <Button
              name={"Register"}
              bgColor={"bg-[#0078F8]"}
              txtColor={"text-white"}
              border={"border"}
              borderValue={"border-1"}
              borderColor={"border-[#0078F8]"}
              hoverBgColor={"hover:bg-white"}
              hoverTextColor={"hover:text-[#0078F8]"}
              hoverBorderColor={"hover:border-[#0078F8]"}
            />
          </form>
          <div className="">
            <p className="">
              Already have an account?
              <span
                className="text-[#0078F8] cursor-pointer"
                onClick={handleClickHere}
              >
                {" "}
                Click here!
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
