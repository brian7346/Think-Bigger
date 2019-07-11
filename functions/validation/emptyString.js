const emptyString = string => {
  if (string.trim() === "") {
    return true;
  } else {
    return false;
  }
};

module.exports = emptyString;
