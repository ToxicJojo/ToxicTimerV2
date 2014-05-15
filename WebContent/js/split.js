define(['util'], function(util) {
  return function(pId, pName) {
    this.id = pId;
    this.name = pName;
    this.best = util.SPLIT_SKIPPED;
    this.current = util.SPLIT_NOT_REACHED;
    this.getDifference = function() {
      if (this.current === util.SPLIT_NOT_REACHED) {
        return util.SPLIT_NOT_REACHED;
      } else if (this.best === util.SPLIT_SKIPPED || this.current === util.SPLIT_SKIPPED) {
        return util.SPLIT_SKIPPED;
      } else {
        return this.current - this.best;
      }
    };
  };
});
