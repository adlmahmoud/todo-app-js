module.exports.setPost = async (req, res) => {
 if (!req.body.message) {
     res.status(400).json({message:"Error Desoler le sang" });
 }
}