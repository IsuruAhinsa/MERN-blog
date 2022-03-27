import { useContext } from "react";
import { Context } from "../context/Context";
import { Link } from "react-router-dom";
import {
	IoLogoFacebook,
	IoLogoTwitter,
	IoLogoPinterest,
	IoLogoInstagram,
	IoSearch,
} from "react-icons/io5";

const Navbar = () => {
	const { user, dispatch } = useContext(Context);

	const PF = "http://localhost:8001/public/img/";

	const handleLogout = async () => {
		await dispatch({ type: "LOGOUT" });
	};

	return (
		<div className="w-full h-[50px] sticky top-0 flex items-center font-['Josefin_Sans'] px-2">
			<div className="flex flex-[3]">
				<IoLogoFacebook className="text-xl mr-2 text-gray-500 cursor-pointer" />
				<IoLogoTwitter className="text-xl mr-2 text-gray-500 cursor-pointer" />
				<IoLogoPinterest className="text-xl mr-2 text-gray-500 cursor-pointer" />
				<IoLogoInstagram className="text-xl mr-2 text-gray-500 cursor-pointer" />
			</div>
			<div className="flex-[6]">
				<div className="flex justify-center space-x-4 m-0 p-0 text-lg cursor-pointer font-semibold">
					<Link to="/">Home</Link>
					<Link to="/posts/create">Create</Link>
					<div onClick={handleLogout}>{user ? "Logout" : ""}</div>
				</div>
			</div>
			<div className="flex flex-[3] justify-end items-center object-cover space-x-2">
				{user ? (
					<Link to="/settings">
						<img
							className="w-10 h-10 rounded-full"
							src={PF + user.image}
							alt="user"
						/>
					</Link>
				) : (
					<div className="flex space-x-2 mr-4">
						<Link
							className="uppercase hover:text-blue-500 hover:underline"
							to="/login"
						>
							Login
						</Link>
						<Link
							className="uppercase hover:text-blue-500 hover:underline"
							to="/register"
						>
							Register
						</Link>
					</div>
				)}

				<IoSearch className="cursor-pointer text-gray-700 text-lg" />
			</div>
		</div>
	);
};

export default Navbar;
