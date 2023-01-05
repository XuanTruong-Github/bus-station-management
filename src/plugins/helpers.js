export default {
  formatMoney(money) {
    const result = new Intl.NumberFormat("vi-VN", {
      notation: "compact",
      compactDisplay: "short",
    }).format(money);
    return result;
  },
  formatDate(date) {
    if (date) {
      let temp = new Date(date);
      let day = temp.getDate();
      let month = temp.getMonth() + 1;
      let year = temp.getFullYear();
      day < 10 ? (day = "0" + day) : day;
      month < 10 ? (month = "0" + month) : month;
      return day + "/" + month + "/" + year;
    } else {
      return "";
    }
  },
  getToday() {
    let date = new Date();
    let utc = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), 0);
    return new Date(utc);
  },
  getEndMonth(date) {
    let tmpDate = date ? new Date(date) : new Date();
    return new Date(
      tmpDate.getFullYear(),
      tmpDate.getMonth() + 1,
      0,
      23,
      59,
      59
    );
  },
  getStartMonth(date) {
    let tmpDate = date ? new Date(date) : new Date();
    return new Date(tmpDate.getFullYear(), tmpDate.getMonth(), 1, 0);
  },
  getStartDateString(date) {
    let tmpDate = date ? new Date(date) : new Date();
    let utc = new Date(
      tmpDate.getFullYear(),
      tmpDate.getMonth(),
      tmpDate.getDate(),
      0
    );
    return `${new Date(utc).toISOString()}`;
  },

  getEndDateString(date) {
    let tmpDate = date ? new Date(date) : new Date();
    let utc = Date.UTC(
      tmpDate.getFullYear(),
      tmpDate.getMonth(),
      tmpDate.getDate(),
      16,
      59,
      59
    );
    return `${new Date(utc).toISOString()}`;
  },

  getTimeString(date) {
    let tmpDate = date ? new Date(date) : new Date();
    let HH = tmpDate.getHours();
    let mm = tmpDate.getMinutes();
    HH = HH < 10 ? "0" + HH : HH;
    mm = mm < 10 ? "0" + mm : mm;
    return `${HH}:${mm}`;
  },

  getUTCDateFromTimeString(timeString) {
    let time = timeString ? timeString.split(":") : ["0", "0"];
    let tmpDate = new Date();
    let date = new Date(
      tmpDate.getFullYear(),
      tmpDate.getMonth(),
      tmpDate.getDate(),
      time[0],
      time[1],
      0
    );
    return date.toISOString();
  },
};
