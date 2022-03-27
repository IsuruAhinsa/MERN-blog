import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { BsPencil, BsTrash } from "react-icons/bs";
import { Link, useLocation } from "react-router-dom";
import { Context } from "../context/Context";

const SinglePost = () => {
	const location = useLocation();

	const postId = location.pathname.split("/")[2];

	const [post, setPost] = useState({});

	const PF = "http://localhost:8001/public/img/";

	const { user } = useContext(Context);

	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [updateMode, setUpdateMode] = useState(false);

	useEffect(() => {
		const getPost = async () => {
			await axios.get("/posts/" + postId).then((post) => {
				setPost(post.data);
				setTitle(post.data.title);
				setDescription(post.data.description);
			});
		};

		getPost();
	}, [postId]);

	const handleDelete = async () => {
		await axios
			.delete("/posts/destroy/" + postId, {
				data: { username: user.username },
			})
			.then((res) => {
				window.location.replace("/");
			})
			.catch((err) => console.log(err.message));
	};

	const handleUpdate = async () => {
		await axios
			.put("/posts/update/" + postId, {
				username: user.username,
				title,
				description
			})
			.then((res) => {
				setUpdateMode(false);
			})
			.catch((err) => console.log(err.message));
	};

	return (
		<div className="flex-[9]">
			<div className="p-5 pr-0">
				{post.photo && (
					<img
						className="w-full h-[300px] rounded-md object-cover"
						src={PF + post.photo}
						alt=""
					/>
				)}

				{updateMode ? (
					<input
						type="text"
						className="border my-3 w-full p-3 bg-gray-50"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						autoFocus
					/>
				) : (
					<h1 className="text-center m-[10px] text-[28px] font-['Lora']">
						{title}
						{post.username === user?.username && (
							<div className="flex float-right space-x-3">
								<div
									onClick={() => setUpdateMode(true)}
									className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 cursor-pointer hover:text-green-500"
								>
									<BsPencil className="text-base" />
								</div>
								<div
									onClick={handleDelete}
									className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 cursor-pointer hover:text-red-500"
								>
									<BsTrash className="text-base" />
								</div>
								<i className="singlePostIcon far fa-trash-alt"></i>
							</div>
						)}
					</h1>
				)}

				<div className="mb-5 flex justify-between text-base text-[#be9656] font-['Varela_Round']">
					<span>
						Author:
						<Link to={`/?username=${post.username}`} className="ml-1">
							{post.username}
						</Link>
					</span>
					<span>{new Date(post.createdAt).toDateString()}</span>
				</div>

				{updateMode ? (
					<textarea
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						className="my-3 bg-gray-50 w-full h-fit resize-none p-3 border"
					/>
				) : (
					<p className="text-[#666] text-lg leading-6 first-letter:ml-5 first-letter:text-3xl first-letter:font-semibold">
						{description}
					</p>
				)}

				{updateMode && (
					<button className="bg-indigo-500 text-white p-2 text-sm font-semibold rounded-lg" onClick={handleUpdate}>
						Update
					</button>
				)}
			</div>
		</div>
	);
};

export default SinglePost;
