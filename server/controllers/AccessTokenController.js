const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const getAccessToken = async function (req, res, next) {
  const queryParams = `client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&code=${req.query.code}`;

  const gitHubAccessTokenLink = `https://github.com/login/oauth/access_token?${queryParams}`;
  const response = await fetch(gitHubAccessTokenLink, {
    method: "POST",
    headers: { Accept: "application/json" },
  });

  const token = await response.json();
  console.log(token);

  res.cookie("auth-token", token, {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  });
  res.status(200).json({ status: "success", token });

  next();
};

exports.getAccessToken = getAccessToken;
