requirejs.config({
  baseUrl: 'js/',

  paths: {
    jquery: 'libs/jquery/dist/jquery',
    bootstrap: 'libs/bootstrap/dist/js/bootstrap'
  },
  shim: {
    'bootstrap': {
      deps: ['jquery']
    }
  }
});

requirejs(['run', 'split', 'timer', 'jquery'], function(run, split, timer, $) {
  var defaultRun = new run('New Run', 'New Game');
  defaultRun.splits[0] = new split(0, 'New Split');

  timer.setupBindings();

  timer.splits = defaultRun.splits;
  timer.UI.showRun(defaultRun);
});
