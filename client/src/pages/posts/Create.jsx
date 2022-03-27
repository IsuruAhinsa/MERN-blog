import axios from "axios";
import { useContext, useState } from "react";
import { BsPlusCircle } from "react-icons/bs";
import { Context } from "../../context/Context";

const Create = () => {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [file, setFile] = useState(null);

	const { user } = useContext(Context);

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (file) {
			const data = new FormData();
			const filename = Date.now() + file.name;

			data.append("name", filename);
			data.append("file", file);

			try {
				await axios.post("/upload", data);
			} catch (error) {
				console.log(error.message);
			}

			await axios
				.post("/posts/store", {
					username: user.username,
					title,
					description,
					photo: filename,
				})
				.then((res) => {
					window.location.replace("/posts/" + res.data._id);
				})
				.catch((err) => console.log(err.message));
		}
	};

	return (
		<div className="pt-12">
			{file && (
				<img
					className="ml-36 w-[70vw] h-64 rounded-xl object-cover"
					src={URL.createObjectURL(file)}
					alt=""
				/>
			)}
			<form className="relative" onSubmit={handleSubmit}>
				<div className="ml-36 flex items-center">
					<label htmlFor="fileInput">
						<BsPlusCircle className="w-6 h-6 text-sm border rounded-[50%] text-[rgb(129, 125, 125)] flex items-center justify-center cursor-pointer" />
					</label>
					<input
						id="fileInput"
						type="file"
						style={{ display: "none" }}
						onChange={(e) => setFile(e.target.files[0])}
					/>
					<input
						className="text-2xl border-0 p-5 w-[70vw] outline-none ring-0 placeholder:text-[rgb(189, 185, 185)] font-normal"
						placeholder="Title"
						type="text"
						autoFocus={true}
						onChange={(e) => setTitle(e.target.value)}
					/>
				</div>
				<div className="ml-36 flex items-center">
					<textarea
						className="text-2xl border-0 p-5 w-[70vw] outline-none ring-0 placeholder:text-[rgb(189, 185, 185)] font-normal h-[100vh]"
						placeholder="Tell your story..."
						type="text"
						autoFocus={true}
						onChange={(e) => setDescription(e.target.value)}
					/>
				</div>
				<button
					className="absolute top-5 right-[300px] text-white bg-teal-500 p-[10px] border-0 rounded-[10px] text-base cursor-pointer flex items-center hover:bg-teal-600"
					type="submit"
				>
					Publish
				</button>
			</form>
		</div>
	);
};

export default Create;
