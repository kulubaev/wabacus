const LAST_DAY = 6;

Date.prototype.addDays = function(days){

  const date = new Date(this.toLocaleDateString());
  date.setDate(date.getDate() + days);
  date.setUTCHours(0,0,0,0);

  return date;
}

Date.prototype.shorten = function(){

  return this.toJSON().slice(0,10);
}

Date.prototype.subtractDays = function(days){

  const date = new Date(this.toLocaleDateString());
  date.setDate(date.getDate() - days);
  date.setUTCHours(0,0,0,0);

  return date;
}


Date.prototype.getFirstDayOfWeek = function(){
  return this.subtractDays(this.getDay());

}

Date.prototype.getLastDayOfWeek = function(){
  return this.addDays(LAST_DAY - this.getDay());
}
