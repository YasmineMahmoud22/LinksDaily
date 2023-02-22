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
    const all = await Link.find()
      .populate("postedBy", "_id name")
      .sort({ createdAt: -1 })
      .limit(500);
    res.json(all);
  } catch (error) {
    console.log(error);
  }
};

exports.viewCount = async (req, res) => {
  try {
    const link = await Link.findByIdAndUpdate(
      req.params.linkId,
      { $inc: { views: 1 } },
      { new: true }
    );
    console.log("Link View", link);
    res.json({ ok: true });
  } catch (error) {
    console.log(error);
  }
  //
};

exports.like = async (req, res) => {
  try {
    const link = await Link.findByIdAndUpdate(
      req.body.linkId,
      { $addToSet: { likes: req.user._id } },
      { new: true }
    );
    console.log("link in like controller", link);
    res.json(link);
  } catch (error) {
    console.log(error);
  }
};

exports.unlike = async (req, res) => {
  try {
    const link = await Link.findByIdAndUpdate(
      req.body.linkId,
      { $pull: { likes: req.user._id } },
      { new: true }
    );
    res.json(link);
  } catch (error) {
    console.log(error);
  }
};
// exports.remove = async (req, res) => {
//   //
// };
