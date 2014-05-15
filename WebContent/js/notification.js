define(['jquery', 'bootstrap'], function($) {
  var writeDiv = function(pMessage) {
    $('#notificationDiv').html(
      '<div class="alert alert-dismissable" id="notification">' +
      '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' +
      pMessage +
      '</button></div>'
    );
  };

  return {
    showError: function(pErrorMessage) {
      writeDiv(pErrorMessage);
      $('#notification').addClass('alert-danger');
    },
    showWarning: function(pWarningMessage) {
      writeDiv(pWarningMessage);
      $('#notification').addClass('alert-warning');
    },
    showInfo: function(pInfoMessage) {
      writeDiv(pInfoMessage);
      $('#notification').addClass('alert-info');
    },
    showSuccess: function(pSuccessMessage) {
      writeDiv(pSuccessMessage);
      $('#notification').addClass('alert-success');
    }
  };
});
