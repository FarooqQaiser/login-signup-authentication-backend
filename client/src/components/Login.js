import { useContext, useState } from "react";
import Button from "../components/Button";
import { RiLockPasswordLine } from "react-icons/ri";
import { MdOutlineMailOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import { toast } from "react-toastify";

export default function Login() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/auth/loginAuth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result);
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
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <div className="flex items-center gap-5 p-2 border border-gray-200 rounded-md shadow-sm">
            <MdOutlineMailOutline className="text-[#778899]" />
            <input
              required
              type="email"
              value={email}
              name="email"
              className="text-[#778899] w-full h-8 outline-none focus:ring-0 focus:border-0"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-5 p-2 border border-gray-200 rounded-md shadow-sm">
            <RiLockPasswordLine className="text-[#778899]" />
            <input
              required
              type="password"
              value={password}
              name="password"
              className="text-[#778899] w-full h-8 outline-none focus:ring-0 focus:border-0"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
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
