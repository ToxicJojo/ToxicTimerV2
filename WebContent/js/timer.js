define(['ui/timerUI', 'util', 'jquery', 'notification'], function(ui, util, $, notification) {
  return {
    currentSplit: 0,
    currentTime: 0,
    delay: 0,
    mode: 'Run',
    splits: [],
    startTime: 0,
    state: 'Ready',
    timerInterval: undefined,
    UI: ui,


    setupBindings: function() {
      var timer = this;

      $('#startButton').bind('click', function() {
        timer.start();
      });

      $('#stopButton').bind('click', function() {
        timer.stop();
      });

      $('#resumeButton').bind('click', function() {
        timer.resume();
      });

      $('#splitButton').bind('click', function() {
        timer.split();
      });

      $('#skipButton').bind('click', function() {
        timer.skip();
      });

      $('#undoButton').bind('click', function() {
        timer.undo();
      });

      $('#resetButton').bind('click', function() {
        timer.reset();
      });

      $('#editButton').bind('click', function() {
        timer.toogleEditor();
      });
    },

    getCurrentTime: function() {
      return util.now() - this.startTime;
    },

    start: function() {
      if (this.state === 'Ready' && this.mode === 'Run') {
        this.startTime = util.now() + this.delay;
        this.startTimerInterval();

        this.UI.switchStartSplit('Split');
        this.state = 'Running';
      }
    },

    stop: function() {
      if (this.state === 'Running' && this.mode === 'Run') {
        window.clearInterval(this.timerInterval);

        this.UI.switchStopResume('Resume');
        this.state = 'Stopped';
      }
    },

    resume: function() {
      if (this.state === 'Stopped' && this.mode === 'Run') {
        this.startTime = util.now() - this.currentTime;

        this.startTimerInterval();

        this.UI.switchStopResume('Stop');
        this.state = 'Running';
      }
    },

    split: function() {
      if (this.state === 'Running' && this.mode === 'Run') {
        this.splits[this.currentSplit].current = this.getCurrentTime();
        this.UI.updateSplit(this.splits[this.currentSplit]);

        this.currentSplit++;
        //Check if it was the last split
        if (this.currentSplit === this.splits.length) {
          window.clearInterval(this.timerInterval);

          var difference = this.splits[this.currentSplit - 1].getDifference();

          if (difference <= 0 || this.splits[this.currentSplit - 1].best === util.SPLIT_SKIPPED) {
            for (var i = 0; i < this.splits.length; i++) {
              this.splits[i].best = this.splits[i].current;
            }

            notification.showSuccess('You beat your old record by ' + util.getTimeStringFromMilliseconds(difference));
          }

          this.state = 'Finished';
        } else {
          this.UI.markActiveSplit(this.currentSplit);
        }
      }
    },

    skip: function() {
      if (this.state === 'Running' && this.mode === 'Run') {
        //Do not skip the last split
        if ((this.currentSplit + 1) < this.splits.length) {
          this.splits[this.currentSplit].current = util.SPLIT_SKIPPED;
          this.UI.updateSplit(this.splits[this.currentSplit]);

          this.currentSplit++;
          this.UI.markActiveSplit(this.currentSplit);
        }
      }
    },

    undo: function() {
      if (this.state === 'Running' && this.mode === 'Run') {
        //Do not undo the first split
        if (this.currentSplit > 0) {
          this.UI.updateSplit(this.splits[this.currentSplit]);
          this.currentSplit--;
          this.splits[this.currentSplit].current = util.SPLIT_NOT_REACHED;

          this.UI.updateSplit(this.splits[this.currentSplit]);
          this.UI.markActiveSplit(this.currentSplit);
        }
      }
    },

    reset: function() {
      if ((this.state === 'Running' || this.state === 'Finished' || this.state === 'Stopped') && this.mode === 'Run') {
        window.clearInterval(this.timerInterval);

        this.UI.switchStartSplit('Start');
        this.UI.switchStopResume('Stop');

        this.startTime = 0;
        this.currentTime = 0;
        this.currentSplit = 0;

        this.state = 'Ready';

        for (var i = 0; i < this.splits.length; i++) {
          this.splits[i].current = util.SPLIT_NOT_REACHED;
        }

        this.UI.showSplits(this.splits);
        this.UI.markActiveSplit(this.currentSplit);
        this.UI.showTime(0);
      }
    },

    startTimerInterval: function() {
      var timer = this;

      if (this.timerInterval) {
        window.clearInterval(this.timerInterval);
      }

      this.timerInterval = window.setInterval(function() {
        timer.currentTime = timer.getCurrentTime();
        timer.UI.showTime(timer.getCurrentTime());
      }, 21);
    },

    toogleEditor: function() {
      this.UI.editor.UI = this.UI;
      if (this.mode === 'Run') {
        this.reset();
        this.UI.editor.showSplits(this.splits);
        this.mode = 'Editor';
      } else if (this.mode === 'Editor') {
        this.splits = this.UI.editor.splits;
        this.UI.showSplits(this.splits);
        this.mode = 'Run';
      }
    }

  };
});
