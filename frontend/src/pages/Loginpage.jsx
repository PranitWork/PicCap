import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { asyncloginuser } from "../store/actions/userAction";
const LoginPage = () => {
    const disaptch = useDispatch();
    const navigate = useNavigate();
 
    const {register, handleSubmit, reset} = useForm();
    const loginHandler = async (data)=>{
        const success = await disaptch(asyncloginuser(data));
        if(success){
            navigate("/")
        }
        reset(); 
    }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-gray-800 rounded-xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-white text-center mb-6">
          Login to PicCap
        </h1>

        <form className="space-y-4" onSubmit={handleSubmit(loginHandler)}>
          <input
            type="email"
            name="email"
            {...register("email", { required: true })}
            placeholder="Email"
            required
            className="w-full px-4 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-white"
          />
          <input
            type="password"
            {...register("password", { required: true })}
            name="password"
            placeholder="Password"
            required
            className="w-full px-4 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-white"
          />
          <button
            type="submit"
            className="w-full bg-white text-gray-900 font-semibold py-2 rounded hover:bg-gray-300 transition duration-200"
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm text-white mt-4">
          Don’t have an account?{" "}
          <Link to="/register" className="underline text-blue-400">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
