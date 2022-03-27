import Post from "./Post";

const Posts = ({posts}) => {
	return (
		<div className="flex flex-[9] flex-wrap m-5">
			{posts.map((p) => (
				<Post key={p._id} post={p} />
			))}
		</div>
	);
};

export default Posts;
