import axios from "axios";
import { useEffect, useState } from "react";
import {
	IoLogoFacebook,
	IoLogoInstagram,
	IoLogoTwitter,
	IoLogoPinterest,
} from "react-icons/io5";
import { Link } from "react-router-dom";

const Sidebar = () => {

	const [categories, setCategories] = useState([]);

	useEffect(() => {
		const fetchCategories = async () => {
			await axios.get("/categories/").then((categories) => {
				setCategories(categories.data);
			});
		}
	
		fetchCategories();
	}, [])

	return (
		<div className="flex-[3] m-5 rounded-2xl h-fit p-4 bg-stone-100 space-y-10">
			<div>
				<h3 className="text-lg font-['Varela_Round'] font-normal uppercase">About</h3>
				<img className="w-full h-60 bg-origin-border border-4 border-white" src="https://images.unsplash.com/photo-1647759750934-a7ad629c63c9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMTF8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60" alt="about" />
				<p className="font-sans text-sm mx-3">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Delectus quos nostrum nemo id excepturi perspiciatis harum ipsa eligendi eius qui vitae laboriosam ipsum, molestiae fugit cupiditate dolorem error soluta vel.</p>
			</div>

			<div>
				<h3 className="text-lg font-['Varela_Round'] font-normal uppercase">Categories</h3>
				<ul className="font-light text-gray-500">
					{categories.map((c) => (
						<Link to={`?/cat=${c.name}`} key={c._id} className="inline-block w-1/2 cursor-pointer hover:text-blue-600">{c.name}</Link>
					))}
				</ul>
			</div>

			<div>
				<h3 className="text-lg font-['Varela_Round'] font-normal uppercase">Follow Us</h3>
				<ul className="font-light flex space-x-4 text-2xl">
					<IoLogoFacebook className="cursor-pointer hover:text-blue-500" />
					<IoLogoInstagram className="cursor-pointer hover:text-blue-500" />
					<IoLogoPinterest className="cursor-pointer hover:text-blue-500" />
					<IoLogoTwitter className="cursor-pointer hover:text-blue-500" />
				</ul>
			</div>
		</div>
	);
};

export default Sidebar;
