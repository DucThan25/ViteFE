import moment from "moment";
export default {
  toDateDisplay: function(dateObject){
    return this.toDateDisplayWithFormat(dateObject, "DD/MM/YYYY");
  },
  toDateDisplayWithFormat: function(dateObject, format){
    return moment(dateObject).format(format);
  },
  toDateDisplayStandar: function(currentStringDate, currentFormat){
    return this.toDateDisplay(this.toDateObjectWithFormat(currentStringDate, currentFormat));
  },
  toDateTimeDisplay: function(dateTimeObject){
    return this.toDateTimeDisplayWithFormat(dateTimeObject, "DD/MM/YYYY HH:mm");
  },
  toDateTimeDisplayWithFormat: function(dateTimeObject, format){
    return moment(dateTimeObject).format(format);
  },
  toDateTimeDisplayStandar: function(currentStringDate, currentFormat){
    return this.toDateTimeDisplay(this.toDateObjectWithFormat(currentStringDate, currentFormat));
  },
  toDateObject: function(stringDate){
    return this.toDateObjectWithFormat(stringDate, "DD/MM/YYYY");
  },
  toDateObjectWithFormat: function(stringDate, format){
    return moment(stringDate, format).toDate();
  },
  toDateTimeObject: function(stringDateTime){
    return this.toDateTimeObjectWithFormat(stringDateTime, "DD/MM/YYYY HH:mm");
  },
  toDateTimeObjectWithFormat: function(stringDateTime, format){
    return moment(stringDateTime, format).toDate();
  },
}
