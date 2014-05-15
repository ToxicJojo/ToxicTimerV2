define(['notification'], function(notification) {
  return {
    SPLIT_NOT_REACHED: -1,
    SPLIT_SKIPPED: -2,
    SPLIT_NOT_REACHED_STRING: '-',
    SPLIT_SKIPPED_STRING: '???',

    now: function() {
      var date = new Date();
      return date.getTime();
    },

    getMillisecondsFromString: function(pTimeString) {
      if (pTimeString === this.SPLIT_NOT_REACHED_STRING) {
        return this.SPLIT_NOT_REACHED;
      } else if (pTimeString === this.SPLIT_SKIPPED_STRING) {
        return this.SPLIT_SKIPPED;
      } else if (pTimeString === '') {
        return 0;
      }

      var timeArray = [0, 0, 0, 0];

      //Get the milliseconds
      timeArray[0] = parseInt(pTimeString.split('.')[1]);
      //If there are no milliseconds
      if (isNaN(timeArray[0])) {
        timeArray[0] = 0;
      }

      if (timeArray[0] < 100) {
        if (timeArray[0] < 10) {
          timeArray[0] *= 100;
        } else {
          timeArray[0] *= 10;
        }
      }

      var tempTimeArray = pTimeString.split('.')[0].split(':');

      for (var i = tempTimeArray.length; i > 0; i--) {
        timeArray[(tempTimeArray.length - i) + 1] = parseInt(tempTimeArray[i - 1]);
      }

      var milliseconds = (timeArray[0] + (timeArray[1] * 1000) + (timeArray[2] * 60000) + (timeArray[3] * 3600000));

      if (isNaN(milliseconds)) {
        notification.showError(pTimeString + ' is not a valid time. Please use the format hh:mm:ss.xxx');
        return this.SPLIT_SKIPPED;
      } else {
        return milliseconds;
      }
    },

    getTimeStringFromMilliseconds: function(pMilliseconds) {
      if (pMilliseconds === this.SPLIT_NOT_REACHED) {
        return this.SPLIT_NOT_REACHED_STRING;
      } else if (pMilliseconds === this.SPLIT_SKIPPED) {
        return this.SPLIT_SKIPPED_STRING;
      }

      //Append 0´s if needed.
      var FormatUnit =
        function(pUnit) {
          if (pUnit < 10) {
            return '0' + pUnit;
          } else {
            return pUnit;
          }
      };

      var timeString = '';

      if (pMilliseconds < 0) {
        pMilliseconds = -pMilliseconds;
        timeString += '-';
      }

      var hours = (Math.floor(pMilliseconds / 3600000)),
        minutes = (Math.floor(pMilliseconds / 60000) % 60),
        seconds = (Math.floor(pMilliseconds / 1000) % 60),
        milliSeconds = (pMilliseconds % 1000);

      if (hours > 0) {
        timeString += hours + ':';
      }

      timeString += FormatUnit(minutes) + ':';
      timeString += FormatUnit(seconds) + '.';

      if (milliSeconds < 100) {
        if (milliSeconds < 10) {
          timeString += '00' + milliSeconds;
        } else {
          timeString += '0' + milliSeconds;
        }
      } else {
        timeString += milliSeconds;
      }

      return timeString;
    }

  };
});
