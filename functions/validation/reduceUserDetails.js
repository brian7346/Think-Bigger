const emptyString = require("./emptyString");

module.exports = data => {
  let userDetails = {};

  if (!emptyString(data.bio.trim())) {
    userDetails.bio = data.bio;
  }
  if (!emptyString(data.website.trim())) {
    if (data.website.trim().substring(0, 4) !== "http") {
      userDetails.website = `http://${data.website.trim()}`;
    } else {
      userDetails.website = data.website;
    }
  }
  if (!emptyString(data.location.trim())) {
    userDetails.location = data.location;
  }
  return userDetails;
};
