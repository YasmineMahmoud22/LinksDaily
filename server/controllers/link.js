import Link from "../models/link";

exports.postLink = async (req, res) => {
  //
  try {
    const link = await new Link({ ...req.body, postedBy: req.user._id }).save();
    console.log("saved Linke => ", link);
    res.json(link);
  } catch (error) {
    console.log(error);
  }
};

exports.links = async (req, res) => {
  //
  try {
    const all = await Link.find().sort({ createdAt: -1 }).limit(500);
    res.json(all);
  } catch (error) {
    console.log(error);
  }
};

// exports.update = async (req, res) => {
//   //
// };

// exports.remove = async (req, res) => {
//   //
// };
