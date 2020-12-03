import library from "../../library";

export default (req, res) => {
  if (req.method !== "POST") {
    return res.status(405);
  }
  const { list } = req.body;
  const result = library.flatten(list);
  res.status(200).json({ result });
};
