export default function(err, req, res, next) {
  switch (err.name) {
    case "Unauthorized":
      return res.status(401).json({ message: err.message });
    case "AlreadySignedIn":
      return res.status(400).json({ message: err.message });
    case "ValidationError":
      return res
        .status(400)
        .json({ type: "validation", validationError: err.message });
    default:
      console.error(err.stack);
      return res.status(500).send("An error occurred");
  }
}
