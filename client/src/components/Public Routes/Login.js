import { useContext } from "react";
import Button from "../Button";
import { RiLockPasswordLine } from "react-icons/ri";
import { MdOutlineMailOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().password(6, "Password must be at 6 characters"),
});

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await fetch("http://localhost:5000/auth/loginAuth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        const user = result.user;
        const token = result.token;
        login(user, token);
        toast.success("Login Successful!");
        navigate("/home");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickHere = () => {
    navigate("/");
  };

  return (
    <div className="w-full mt-20 flex flex-col items-center justify-center gap-8">
      <h1 className="text-4xl font-semibold">Login</h1>
      <div className="w-1/3 border border-gray-200 p-5 rounded-lg shadow-sm">
        <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
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
          <Button
            name={"Login"}
            bgColor={"bg-[#0078F8]"}
            txtColor={"text-white"}
            border={"border"}
            borderValue={"border-1"}
            borderColor={"border-[#0078F8]"}
            hoverBgColor={"hover:bg-white"}
            hoverTextColor={"hover:text-[#0078F8]"}
            hoverBorderColor={"hover:border-[#0078F8]"}
            // buttonFunction={}
          />
        </form>
        <div className="">
          <p className="">
            Don't have an account?
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
  );
}
