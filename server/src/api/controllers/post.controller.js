import Post from '../models/Post.js'

const index = async (req, res) => {
    const username = req.query.username;
    const catName = req.query.cat;

    try {
        let posts;

        if (username) {
            posts = await Post.find({ username });
        } else if (catName) {
            posts = await Post.find({
                categories: {
                    $in: [catName],
                },
            });
        } else {
            posts = await Post.find();
        }

        return res.status(200).json(posts);

    } catch (error) {
        return res.status(500).json(error.message);
    }
}

const getById = async (req, res) => {
    await Post.findById(req.params.id).then((post) => {
        if (!post) {
            return res.status(404).json("Not Found!");
        }
        res.status(200).json(post);
    }).catch((err) => {
        res.status(500).json(err.message);
    });
}

const store = async (req, res) => {
    const post = new Post(req.body);

    await post.save().then((post) => {
        res.status(200).json(post);
    }).catch((err) => {
        res.status(500).json(err.message);
    })
}

const update = async (req, res) => {
    const postId = req.params.id;

    try {
        const post = await Post.findById(postId);

        if (post.username === req.body.username) {
            await Post.findByIdAndUpdate(postId, {
                $set: req.body,
            }, { new: true }).then((post) => {
                res.status(200).json(post);
            }).catch((err) => {
                res.status(500).json(err.message);
            })
        } else {
            return res.status(401).json("You can update only your post!");
        }
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

const destroy = async (req, res) => {
    const postId = req.params.id;

    try {
        const post = await Post.findById(postId);

        if (req.body.username === post.username) {
            await post.delete().then(() => {
                res.status(200).json("Post has been deleted successfully!");
            }).catch((err) => {
                res.status(500).json(err.message);
            });
        } else {
            return res.status(401).json("You can delete only your post.");
        }
    } catch (error) {
        return res.status(500).json(error.message);
    }
}

export { index, getById, store, update, destroy }