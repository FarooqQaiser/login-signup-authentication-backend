import { FaRegUser } from "react-icons/fa";
import { RiLockPasswordLine } from "react-icons/ri";
import { MdOutlineMailOutline } from "react-icons/md";
import Button from "./Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPasswrod, setConfirmPasswrod] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === confirmPasswrod) {
      try {
        const response = await fetch("http://localhost:5000/auth/signUpAuth", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name,
            email: email,
            password: password,
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
    } else {
      alert("Passwords do not match!!");
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
          <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
            <div className="flex items-center gap-5 p-2 border border-gray-200 rounded-md shadow-sm">
              <FaRegUser className="text-[#778899]" />
              <input
                required
                type="text"
                value={name}
                name="name"
                className="text-[#778899] w-full h-8 outline-none focus:ring-0 focus:border-0"
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
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
            <div className="flex items-center gap-5 p-2 border border-gray-200 rounded-md shadow-sm">
              <RiLockPasswordLine className="text-[#778899]" />
              <input
                required
                type="password"
                value={confirmPasswrod}
                name="password"
                className="text-[#778899] w-full h-8 outline-none focus:ring-0 focus:border-0"
                placeholder="Confirm Passwrod"
                onChange={(e) => setConfirmPasswrod(e.target.value)}
              />
            </div>
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
              // buttonFunction={}
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
