import axios from "axios";
import { useContext, useRef } from "react";
import { Link } from "react-router-dom";
import { Context } from "../context/Context";

const Login = () => {
	const userRef = useRef();
	const passwordRef = useRef();

	const { dispatch, isFetching } = useContext(Context);

	const handleSubmit = async (e) => {
		e.preventDefault();

		dispatch({ type: "LOGIN_START" });

		await axios
			.post("/auth/login", {
				username: userRef.current.value,
				password: passwordRef.current.value,
			})
			.then((res) => {
				dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
			})
			.catch((err) => {
				dispatch({ type: "LOGIN_FAILURE" });
			});
	};

	return (
		<div className="h-[calc(100vh-50px)] flex flex-col items-center justify-center bg-gradient-to-r from-cyan-500 to-blue-500">
			<span className="text-[50px]">Login</span>
			<form className="mt-5 flex flex-col" onSubmit={handleSubmit}>
				<label className="mt-[10px]">Username</label>
				<input
					className="p-[10px] bg-white border-0 rounded focus:ring-0 focus:outline-none"
					type="text"
					placeholder="Enter your username..."
					ref={userRef}
				/>
				<label className="mt-[10px]">Password</label>
				<input
					className="p-[10px] bg-white border-0 rounded focus:ring-0 focus:outline-none"
					type="password"
					placeholder="Enter your password..."
					ref={passwordRef}
				/>
				<button
					type="submit"
					className="mt-5 cursor-pointer bg-[lightcoral] text-white p-3 border-0 rounded-lg text-center disabled:bg-gray-500 disabled:cursor-not-allowed"
					disabled={isFetching}
				>
					Login
				</button>
			</form>
			<Link
				to="/register"
				className="absolute top-14 right-5 bg-teal-500 cursor-pointer p-3 border-0 text-white rounded-lg"
			>
				Register
			</Link>
		</div>
	);
};

export default Login;
