define(['jquery', 'util', 'ui/editorUI'], function($, util, editor) {


  var showSplit = function(pSplit) {
    var nameCell = '<td id="name' + pSplit.id + '">' + pSplit.name + '</td>';
    var bestCell = '<td id="best' + pSplit.id + '">' + util.getTimeStringFromMilliseconds(pSplit.best) + '</td>';
    var liveCell = '<td id="live' + pSplit.id + '">' + util.SPLIT_NOT_REACHED_STRING + '</td>';
    var differenceCell = '<td id="difference' + pSplit.id + '">' + util.SPLIT_NOT_REACHED_STRING + '</td>';

    var row = '<tr id="split' + pSplit.id + '">';
    row += nameCell + bestCell + liveCell + differenceCell + "</tr>";

    $("#splits").append(row);
  };

  return {
    editor: editor,

    showTime: function(pTime) {
      $('#timeDisplay').html(util.getTimeStringFromMilliseconds(pTime));
    },

    showRun: function(pRun) {
      $('#runName').html('<h5>' + pRun.game + '<small> ' + pRun.name + '</small></h5>');
      $('#splits').html('');

      this.showSplits(pRun.splits);
      this.markActiveSplit(0);
    },

    showSplits: function(pSplits) {
      $('#splits').html('');
      for (var i = 0; i < pSplits.length; i++) {
        showSplit(pSplits[i]);
      }
    },

    updateSplit: function(pSplit) {
      $('#live' + pSplit.id).html(util.getTimeStringFromMilliseconds(pSplit.current));

      var difference = pSplit.getDifference();

      $('#difference' + pSplit.id).html(util.getTimeStringFromMilliseconds(difference));
      $('#split' + pSplit.id).removeClass();

      if (difference === util.SPLIT_SKIPPED) {
        $('#split' + pSplit.id).addClass('info');
      } else if (difference > 0) {
        $('#split' + pSplit.id).addClass('danger');
      } else if (difference <= 0 && (difference !== util.SPLIT_NOT_REACHED)) {
        $('#split' + pSplit.id).addClass('success');
      }
    },

    markActiveSplit: function(pSplitIndex) {
      $('#split' + pSplitIndex).removeClass();
      $('#split' + pSplitIndex).addClass('warning');
    },

    switchStartSplit: function(pSwitchTo) {
      if (pSwitchTo === 'Split') {
        $('#splitButton').removeClass('hidden');
        $('#startButton').addClass('hidden');
      } else {
        $('#startButton').removeClass('hidden');
        $('#splitButton').addClass('hidden');
      }
    },

    switchStopResume: function(pSwitchTo) {
      if (pSwitchTo === 'Stop') {
        $('#stopButton').removeClass('hidden');
        $('#resumeButton').addClass('hidden');
      } else {
        $('#resumeButton').removeClass('hidden');
        $('#stopButton').addClass('hidden');
      }
    }

  };
});
