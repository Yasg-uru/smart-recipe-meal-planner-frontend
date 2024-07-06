import { useState } from "react";
import { useDispatch } from "react-redux";
import { Logincomponent } from "../../Redux-toolkit/Slices/authSlice";

export interface Login {
  Email: string;
  password: string;
}
const Login: React.FC = () => {
  const dispatch=useDispatch();

  const [formData, setFormData] = useState<Login>({
    Email: "",
    password: "",
  });
  const handlechange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleFormSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(Logincomponent(formData));

    
  };
  return (
    <div className="min-h-screen flex flex-col bg-black items-center justify-center">
      <form onSubmit={handleFormSubmit} className="flex flex-col gap-2 p-2  border-[0.1px] border-green-500 rounded-xl">
        <h1 className="text-center font-bold text-green-500 text-2xl">
          Login Form
        </h1>
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="text-green-500">
            Email
          </label>
          <input
            type="email"
            value={formData.Email}
            onChange={handlechange}
            name="Email"
            className="input input-bordered text-green-500 font-bold border-[0.5px] bg-black focus:border-red-500 border-green-500  rounded-lg"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="password" className="text-green-500">
            Password
          </label>
          <input
            type="password"
            value={formData.password}
            onChange={handlechange}
            name="password"
            className="input input-bordered text-green-500 font-bold border-[0.5px] bg-black focus:border-red-500 border-green-500  rounded-lg"
          />
        </div>
        <button
          type="submit"
          className="btn bg-black border-[0.5px] font-bold border-green-500 hover:bg-black hover:border-red-500 text-green-500 hover:text-red-500"
        >
          Login
        </button>
      </form>
    </div>
  );
};
export default Login;
