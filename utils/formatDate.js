const addSuffix = (date) => {
  let dateString = date.toString();

  const characterEnd = dateString.charAt(dateString.length - 1);

  if (characterEnd === "1" && dateString !== "11") {
    dateString = `${dateString}st`;
  } else if (characterEnd === "2" && dateString !== "12") {
    dateString = `${dateString}nd`;
  } else if (characterEnd === "3" && dateString !== "13") {
    dateString = `${dateString}rd`;
  } else {
    dateString = `${dateString}th`;
  }

  return dateString;
};

module.exports = (
  timestamp,
  { monthLength = "short", dateSuffix = true } = {}
) => {
  const months = {
    0: monthLength === "short" ? "Jan" : "January",
    1: monthLength === "short" ? "Feb" : "February",
    2: monthLength === "short" ? "Mar" : "March",
    3: monthLength === "short" ? "Apr" : "April",
    4: monthLength === "short" ? "May" : "May",
    5: monthLength === "short" ? "Jun" : "June",
    6: monthLength === "short" ? "Jul" : "July",
    7: monthLength === "short" ? "Aug" : "August",
    8: monthLength === "short" ? "Sep" : "September",
    9: monthLength === "short" ? "Oct" : "October",
    10: monthLength === "short" ? "Nov" : "November",
    11: monthLength === "short" ? "Dec" : "December",
  };

  // Get date timestamp for - this month, day, hour, minutes and year
  const date = new Date(timestamp);
  const formattedMonth = months[date.getMonth()];
  const day = dateSuffix ? addSuffix(date.getDate()) : date.getDate();
  const year = date.getFullYear();
  let hour =
    date.getHours() > 12 ? Math.floor(date.getHours() - 12) : date.getHours();

  // If hour is listed 0 then it is actually 12
  if (hour === 0) {
    hour = 12;
  }

  const minutes = (date.getMinutes() < 10 ? "0" : "") + date.getMinutes();
  const amOrPm = date.getHours() >= 12 ? "pm" : "am";

  const newTimeStamp = `${formattedMonth} ${day}, ${year} at ${hour}:${minutes} ${amOrPm}`;

  return newTimeStamp;
};
