export const isAuth = (req, res, next) => {
  const hostname = req.headers.host;
  const url1 = "https://" + hostname + "/api/login";
  const url2 = "http://" + hostname + "/api/login";
  if (req.headers.referer === url1 || req.headers.referer === url2) {
    return next();
  } else {
    res.redirect("/");
  }
};
