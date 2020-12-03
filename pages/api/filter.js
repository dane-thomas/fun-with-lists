import library from "../../library";

export default (req, res) => {
  if (req.method !== "POST") {
    return res.status(405);
  }
  const { list, arg, fnBody } = req.body;
  const result = library.filter(list, new Function(arg, fnBody));
  res.status(200).json({ result });
};
