export default {
  dateCheck: function(start_date, end_date) {
    console.log(start_date, end_date);
    if (start_date > end_date) {
      return "your end date is before your start date!";
    }
  }
};
