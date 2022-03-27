import Sidebar from "../components/Sidebar";
import { BsPerson } from "react-icons/bs";
import { useContext, useState } from "react";
import { Context } from "../context/Context";
import axios from "axios";

const Settings = () => {
	const { user, dispatch } = useContext(Context);

	const [file, setFile] = useState(null);
	const [username, setUsername] = useState(user.username);
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");
	const [success, setSuccess] = useState(false);

	const PF = "http://localhost:8001/public/img/";

	const handleSubmit = async (e) => {
		e.preventDefault();

		dispatch({type: "UPDATE_START"});

		const updatedUser = {
			id: user._id,
			username: username ? username : user.username,
			email: email ? email : user.email,
			password: password ? password : user.password,
		};

		if (file) {
			const data = new FormData();
			const filename = Date.now() + file.name;

			data.append("name", filename);
			data.append("file", file);

			updatedUser.image = filename;

			try {
				await axios.post("/upload", data);
			} catch (error) {
				console.log(error.message);
			}
		}

		await axios
			.put("/users/update/" + user._id, updatedUser)
			.then((res) => {
				setSuccess(true);
				dispatch({type: "UPDATE_SUCCESS", payload: res.data});
			})
			.catch((err) => dispatch({type: "UPDATE_FAILURE"}));
	};

	return (
		<div className="flex">
			<div className="flex-[9] p-5">
				<div className="flex items-center justify-between">
					<span className="text-3xl mb-5 text-[lightcoral]">
						Update Your Account
					</span>
					<span className="text-red-500 text-sm cursor-pointer hover:underline uppercase font-semibold">
						Delete Account
					</span>
				</div>
				<form className="flex flex-col" onSubmit={handleSubmit}>
					<label className="text-[20px] mt-5">Profile Picture</label>
					<div className="flex items-center my-3">
						<img
							className="h-[70px] w-[70px] rounded-full object-cover"
							src={file ? URL.createObjectURL(file) : PF + user.image}
							alt=""
						/>
						<label htmlFor="fileInput">
							<BsPerson className="w-6 h-6 p-[5px] flex justify-center items-center border-0 rounded-[50%] ml-[10px] text-white bg-[lightcoral] cursor-pointer focus:outline-none" />{" "}
						</label>
						<input
							id="fileInput"
							type="file"
							style={{ display: "none" }}
							className="w-1/3"
							onChange={(e) => setFile(e.target.files[0])}
						/>
					</div>
					<label className="text-[20px] mt-5">Username</label>
					<input
						className="text-gray-500 my-[10px] h-[30px] border-b outline-none ring-0"
						type="text"
						placeholder={user.username}
						onChange={(e) => setUsername(e.target.value)}
					/>
					<label className="text-[20px] mt-5">Email</label>
					<input
						className="text-gray-500 my-[10px] h-[30px] border-b outline-none ring-0"
						type="email"
						placeholder={user.email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<label className="text-[20px] mt-5">Password</label>
					<input
						className="text-gray-500 my-[10px] h-[30px] border-b outline-none ring-0"
						type="password"
						placeholder="Password"
						onChange={(e) => setPassword(e.target.value)}
					/>
					<button
						className="self-center w-[150px] border-0 rounded-[10px] text-white bg-teal-500 p-[10px] mt-5 cursor-pointer flex items-center justify-center hover:bg-teal-600"
						type="submit"
					>
						Update
					</button>
				</form>
				{success && (
					<span className="text-sm text-green-400 text-center mt-5">
						Profile has been updated...
					</span>
				)}
			</div>
			<Sidebar />
		</div>
	);
};

export default Settings;
