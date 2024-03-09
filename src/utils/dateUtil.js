exports.changeStringToDate = (dateString) => {
  const dateParts = dateString.split("/");
  if (dateParts.length !== 3) {
    throw new Error("Invalid date format!");
  }

  const day = parseInt(dateParts[0], 10);
  const month = parseInt(dateParts[1], 10);
  const year = parseInt(dateParts[2], 10);

  if (isNaN(day) || isNaN(month) || isNaN(year)) {
    throw new Error("Invalid date format");
  }

  const date = new Date(year, month - 1, day);
  return date;
};
