import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Register = () => {

	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError(false);

		await axios.post("/auth/register", {username, email, password}).then((res) => {
			res.data && window.location.replace("/login");
		}).catch((err) => {
			setError(true);
		})
	}

	return (
		<div className="h-[calc(100vh-50px)] flex flex-col items-center justify-center bg-gradient-to-r from-cyan-500 to-blue-500">
			<span className="text-[50px]">Register</span>
			<form className="mt-5 flex flex-col" onSubmit={handleSubmit}>
				<label className="mt-[10px]">Username</label>
				<input
					className="p-[10px] bg-white border-0 rounded focus:ring-0 focus:outline-none"
					type="text"
					placeholder="Enter your username..."
					onChange={(e) => setUsername(e.target.value)}
				/>
				<label className="mt-[10px]">Email</label>
				<input
					className="p-[10px] bg-white border-0 rounded focus:ring-0 focus:outline-none"
					type="email"
					placeholder="Enter your email..."
					onChange={(e) => setEmail(e.target.value)}
				/>
				<label className="mt-[10px]">Password</label>
				<input
					className="p-[10px] bg-white border-0 rounded focus:ring-0 focus:outline-none"
					type="password"
					placeholder="Enter your password..."
					onChange={(e) => setPassword(e.target.value)}
				/>
				<button type="submit" className="mt-5 cursor-pointer bg-[lightcoral] text-white p-3 border-0 rounded-lg text-center">Register</button>
			</form>

			{error && (
				<span className="text-xs text-red-500 mt-2 p-2 bg-black">Error: Something went wrong!</span>
			)}

			<Link to="/login" className="absolute top-14 right-5 bg-teal-500 cursor-pointer p-3 border-0 text-white rounded-lg">Login</Link>
		</div>
	);
};

export default Register;
