import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { service } from "@/Service/service";

type FormData = {
  email: string;
  password: string;
};

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [apiError, setApiError] = useState("");

  const onSubmit = async (data: FormData) => {
    try {
      const result = await service.login(data);
      if (result) {
        navigate("/home");
      }
    } catch (error) {
      setApiError("Login failed" + error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border-[#334D66] border-[1px]  rounded-xl shadow-lg bg-[#1A2633]">
      <h2 className="text-2xl font-bold mb-6 text-center text-white">Login</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Email Field */}
        <div>
          <label className="block mb-1 font-medium text-white">Email</label>
          <Input
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                message: "Invalid email address",
              },
            })}
            className="w-full p-2 border-[1px] border-[#94ADC7] rounded-xl bg-[#334D66] text-white"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        {/* Password Field */}
        <div>
          <label className="block mb-1 font-medium text-white">Password</label>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              {...register("password", { required: "Password is required" })}
              className="w-full p-2 border-[1px] border-[#94ADC7] rounded-xl bg-[#334D66] pr-10 text-white "
            />
            <button
              type="button"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm text-white"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-[#1A80E5] hover:bg-blue-700 text-white py-2 px-4 rounded-xl"
        >
          Log in
        </button>

        {/* API Error Message */}
        {apiError && (
          <p className="text-red-600 text-center mt-2">{apiError}</p>
        )}
      </form>

      {/*  Sample Data */}

      <div className="text-gray-300 flex justify-center flex-col mt-2 ">
        <h1> email: manager1@example.com </h1>    
        <h1> Password : manager1password123 </h1>
      </div>
      <div className="text-gray-300 flex justify-center flex-col mt-2 ">
        <h1> email: Thor@example.com </h1>    
        <h1> Password : Thorpassword123 </h1>
      </div>
    </div>
  );
}

export default Login;
