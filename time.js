(function() {
  var root = (typeof exports == 'undefined' ? window : exports);
  root.Time = Time;

  Time.re = /^(10|11|12|[1-9])(?::|\.)?([0-5][0-9])?$/;

  function Time(time) {
    if (!(this instanceof Time)) return new Time(time);

    if (time) {
      time.replace(' ', '');
      var result = Time.re.exec(time);
      if (result) {
        this.hours = parseInt(result[1]);
        this.minutes = result[2] ? parseInt(result[2]) : 0;
      }
    } else {
      // set to current time
      var d = new Date()
        , hours = d.getHours();
      this.hours = hours > 11 ? hours - 12 : hours;
      this.minutes = d.getMinutes();
    }
  }

  Time.prototype.nextDate = function () {
    if (!this.isValid()) return null;

    var hours = this.hours === 12 ? 0 : this.hours; // uniformly handle am/pm adjustments
    var d = new Date();
    d.setMinutes(this.minutes);
    d.setHours(hours);

    // if it has already passed, add 12 hours at a time until it's in the future
    while (new Date() > d) d.setHours(d.getHours() + 12);
    return d;
  }

  Time.isValid = function(time) {
    return Time.re.test(time);
  }

  Time.prototype.isValid = function() {
    return Time.isValid(this.toString());
  }

  Time.prototype.toString = function() {
    var minutes = this.minutes < 10 ? '0' + this.minutes : this.minutes;
    return this.hours + ':' + minutes;
  }
})();