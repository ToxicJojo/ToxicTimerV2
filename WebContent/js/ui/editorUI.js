define(['util', 'jquery', 'split'], function(util, $, Split) {
  return {
    splits: [],
    UI: {},

    showSplits: function(pSplits) {
      this.splits = pSplits;
      for (var i = 0; i < pSplits.length; i++) {
        this.showSplit(pSplits[i]);
      }
    },

    showSplit: function(pSplit) {
      var formStart = '<form class="form-inline">';
      var formEnd = '</form>';

      var nameCell = formStart + '<span class="glyphicon glyphicon-plus-sign insertSplit" id="insertSplit' + pSplit.id + '" ></span> ';

      if (pSplit.id !== 0) {
        nameCell += '<span class="glyphicon glyphicon-remove-sign deleteSplit"id="deleteSplit' + pSplit.id + '" ></span> ';
      }

      $("#name" + pSplit.id).html(nameCell + '<input type="text" class="form-control input-sm" value="' + pSplit.name + '" id="editName' + pSplit.id + '">' + formEnd);
      $("#best" + pSplit.id).html(formStart + '<input type="text" class="form-control input-sm" value="' + util.getTimeStringFromMilliseconds(pSplit.best) + '" id="editBest' + pSplit.id + '">' + formEnd);


      var editor = this;

      $("#deleteSplit" + pSplit.id).bind("click", function() {
        editor.splits.splice(pSplit.id, 1);
        editor.refreshTable();
      });

      $("#insertSplit" + pSplit.id).bind("click", function() {
        editor.splits.splice(pSplit.id + 1, 0, new Split(pSplit.id, "New Split"));
        editor.refreshTable();
      });

      $("#editName" + pSplit.id).bind("blur", function() {
        editor.splits[pSplit.id].name = $("#editName" + pSplit.id).val();
      });

      $("#editBest" + pSplit.id).bind("blur", function() {
        editor.splits[pSplit.id].best = util.getMillisecondsFromString($("#editBest" + pSplit.id).val());
      });
    },

    refreshTable: function() {
      for (var i = 0; i < this.splits.length; i++) {
        this.splits[i].id = i;
      }

      this.UI.showSplits(this.splits);
      this.showSplits(this.splits);
    }

  };
});
