import User from '../models/User.js';
import bcrypt from "bcrypt";

const register = async (req, res) => {

    const { username, email, password } = req.body;

    const salt = await bcrypt.genSalt();

    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({ username, email, password: hashedPassword });

    await user.save().then((user) => {
        res.status(200).json(user);
    }).catch((err) => {
        res.status(500).json(err.message);
    });
}

const login = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });

        if (!user) {
            return res.status(404).json({ message: "Invalid User!" });
        } 

        const checked = await bcrypt.compare(req.body.password, user.password);

        if (!checked) {
            return res.status(400).json({ message: "Invalid Credentials!" });
        }

        const { password, ...others } = user._doc;

        return res.status(200).json(others);
    } catch (err) {
        return res.status(500).json(err.message);
    }
}

export { register, login };