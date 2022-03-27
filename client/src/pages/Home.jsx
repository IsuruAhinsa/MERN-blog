import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/Header";
import Posts from "../components/Posts";
import Sidebar from "../components/Sidebar";

const Home = () => {
	const [posts, setPosts] = useState([]);
	const { search } = useLocation();

	useEffect(() => {
		const fetchPosts = async () => {
			await axios.get("/posts" + search).then((posts) => {
				setPosts(posts.data);
			});
		};

		fetchPosts();
	}, [search]);

	return (
		<div>
			<Header />
			<div className="flex">
				<Posts posts={posts} />
				<Sidebar />
			</div>
		</div>
	);
};

export default Home;
