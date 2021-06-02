import moment from "moment";

export const getNow = () => {
  return moment().local().format("YYYY-MM-DD HH:mm:ss");
};

export const timeDifference = (date) => {
  const initialDate = moment(date);
  const now = moment();

  // get the difference between the moments
  const diff = now.diff(initialDate);

  //express as a duration
  const diffDuration = moment.duration(diff);

  if (diffDuration.years() !== 0 || diffDuration.months() !== 0) {
    return moment(initialDate).format("DD-MM-YYYY");
  } else if (diffDuration.weeks() !== 0) {
    return diffDuration.weeks() + " week ago";
  } else if (diffDuration.days() !== 0) {
    return diffDuration.days() + " day ago";
  } else if (diffDuration.hours() !== 0) {
    return diffDuration.hours() + " hour ago";
  } else if (diffDuration.minutes() !== 0) {
    return diffDuration.minutes() + " minute ago";
  } else {
    return diffDuration.seconds() + " second ago";
  }
};