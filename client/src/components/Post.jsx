import { Link } from "react-router-dom";

const Post = ({ post }) => {
	return (
		<div className="flex flex-col w-96 mx-6 mb-10">
			{post.photo && (
				<img
					className="w-96 h-[280px] object-cover rounded-lg"
					src={post.photo}
					alt="post"
				/>
			)}
			<div className="flex flex-col items-center">
				<div>
					{post.categories.map((c) => (
						<span key={c._id} className="font-['Varela_Round'] font-normal text-[11px] text-[#be9656] leading-5 mt-4 mr-3 cursor-pointer">
							{c.name}
						</span>
					))}
				</div>
				<Link to={`/posts/${post._id}`} className="font-['Josefin_Sans'] text-[24px] font-extrabold mt-4 cursor-pointer">
					{post.title}
				</Link>
				<hr />
				<span className="font-['Lora'] italic text-[13px] font-normal text-[#999999] mt-4">
					{new Date(post.createdAt).toDateString()}
				</span>
			</div>
			<p className="font-['Varela_Round'] font-normal text-xs leading-6 text-gray-700 mt-4 overflow-hidden text-ellipsis">
				{post.description}
			</p>
		</div>
	);
};

export default Post;
