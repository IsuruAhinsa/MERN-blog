import Category from "../models/Category.js";

const index = async (req, res) => {
    await Category.find().then((categories) => {
        res.status(200).json(categories);
    }).catch((err) => {
        res.status(500).json(err.message);
    })
}

const store = async (req, res) => {
    const category = new Category(req.body);

    await category.save().then((category) => {
        res.status(200).json(category);
    }).catch((err) => {
        res.status(500).json(err.message);
    })
}

export {index, store};