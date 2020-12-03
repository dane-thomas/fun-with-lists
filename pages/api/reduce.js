import library from "../../library";

export default (req, res) => {
  if (req.method !== "POST") {
    return res.status(405);
  }
  const { list, arg1, arg2, fnBody } = req.body;
  const result = library.reduce(list, new Function(arg1, arg2, fnBody), 0);
  res.status(200).json({ result });
};
