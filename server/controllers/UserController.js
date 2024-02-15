const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const fs = require("fs");
const xml2js = require("xml2js");

const getUserData = async function (req, res, next) {
  const accessToken = req.cookies["auth-token"];
  console.log(accessToken.access_token);
  if (!accessToken) {
    throw new Error("NO Token");
  }

  const gitHubUserDataLink = `https://api.github.com/user`;
  const response = await fetch(gitHubUserDataLink, {
    method: "GET",
    credentials: "include",
    headers: {
      Accept: "application/json",
      Authorization: `bearer ${accessToken.access_token}`,
    },
  });
  const userData = await response.json();

  const usersReposEndpoint = `${userData.repos_url}`;
  const repoResponse = await fetch(usersReposEndpoint, {
    method: "GET",
    credentials: "include",
    headers: {
      Accept: "application/json",
      Authorization: `bearer ${accessToken.access_token}`,
    },
  });
  const userRepos = await repoResponse.json();
  console.log(userRepos);

  res.status(200).send({
    status: "success",
    data: userRepos,
  });
};

const getUserRepoData = async function (req, res) {
  const accessToken = req.cookies["auth-token"];
  if (!accessToken) {
    throw new Error();
  }
  console.log(accessToken);
  const gitHubUserDataLink = `https://api.github.com/user`;
  const response = await fetch(gitHubUserDataLink, {
    method: "GET",
    credentials: "include",
    headers: {
      Accept: "application/json",
      Authorization: `bearer ${accessToken.access_token}`,
    },
  });
  const userData = await response.json();
  console.log(userData);
  const usersReposEndpoint = `${userData.repos_url}`;
  const repoResponse = await fetch(usersReposEndpoint, {
    method: "GET",
    credentials: "include",
    headers: {
      Accept: "application/json",
      Authorization: `bearer ${accessToken.access_token}`,
    },
  });
  const userRepos = await repoResponse.json();
  console.log(userRepos);
  const userRepoContentMap = new Map();
  userRepos.forEach((item) => {
    userRepoContentMap.set(item.name, item.contents_url);
  });
  const { name } = req.params;
  const contentUrl = userRepoContentMap.get(name);
  const refinedEndPoint = contentUrl.split("{")[0];
  const contentRepsonse = await fetch(refinedEndPoint, {
    method: "GET",
    credentials: "include",
    headers: {
      Accept: "application/json",
      Authorization: `bearer ${accessToken.access_token}`,
    },
  });
  const contents = await contentRepsonse.json();

  const result = await Promise.all(
    contents.map(async (item) => {
      if (item.name === "pom.xml" || item.name === "POM.xml") {
        const dependencyRepsonse = await fetch(item.download_url, {
          method: "GET",
          credentials: "include",
          headers: {
            Accept: "text/plain",
            Authorization: `bearer ${accessToken.access_token}`,
          },
        });
        const xmlContent = await dependencyRepsonse.text();
        const parser = new xml2js.Parser();
        const parsedXML = await parser.parseStringPromise(xmlContent);
        return parsedXML.project.dependencies[0].dependency;
      }
    })
  );
  const dependencies = result.filter((item) => item?.length > 0);

  res.status(200).send({
    status: "success",
    data: dependencies[0],
  });
};

exports.getUserData = getUserData;
exports.getUserRepoData = getUserRepoData;
