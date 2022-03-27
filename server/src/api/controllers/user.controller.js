import User from "../models/User.js";
import Post from "../models/Post.js";
import bcrypt from "bcrypt";

const update = async (req, res) => {
    let userId = req.params.id;

    if (req.body.id === userId) {
        if (req.body.password) {
            const salt = await bcrypt.genSalt();
            req.body.password = await bcrypt.hash(req.body.password, salt);
        }

        await User.findByIdAndUpdate(userId, {
            $set: req.body,
        }, { new: true }).then((user) => {
            res.status(200).json(user);
        }).catch((err) => {
            res.status(500).json(err.message);
        });
    } else {
        return res.status(401).json("You can update only your account.");
    }
}

const destroy = async (req, res) => {
    let userId = req.params.id;

    if (req.body.id === userId) {
        try {
            const user = await User.findById(req.params.id);

            await Post.deleteMany({
                username: user.username
            });

            await User.findByIdAndDelete(userId).then(() => {
                res.status(200).json("User has been deleted");
            }).catch((err) => {
                res.status(500).json(err.message);
            });
        } catch (error) {
            return res.status(404).json("User not found!");
        }
    } else {
        return res.status(401).json("You can delete only your account.");
    }
}

const getUser = async (req, res) => {
    await User.findById(req.params.id).then((user) => {
        const { password, ...others } = user._doc;
        res.status(200).json(others);
    }).catch((err) => {
        res.status(500).json(err.message);
    })
}

export { update, destroy, getUser }