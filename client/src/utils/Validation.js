export default {
  dateCheck: function(start_date, end_date) {
    if (start_date > end_date) {
      return false;
    } else return true;
  },

  checkForNull: function(state) {
    const numOfFields = Object.values(state).length;
    let count = 0;

    for (const key of Object.values(state)) {
      if (key !== "") {
        count++;
      }
    }
    console.log(numOfFields);
    console.log(count);
    if (count === numOfFields) {
      return true;
    } else return false;
  }
};
