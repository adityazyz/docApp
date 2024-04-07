import DocReviews from "../../../models/DocReviews";
import connectDb from "../../../middleware/mongoose";

const handler = async (req, res) => {
  if (req.method === "PUT") {
    try {
      await DocReviews.updateOne(
        { _id: req.body.reviewId },
        { $push: { Replies: req.body.newItem } }
      );

      res.status(200).json({ success: true });
    } catch (error) {
      res.status(400).json({ Error: "Internal Server error." });
    }
  } else {
    res.status(400).json({ Error: "This method is not allowed." });
  }
};
export default connectDb(handler);
