const stoprightthere = extendContent(Block, "stop-right-there", {
  placed(tile) {
    this.super$placed(tile);
    Vars.unitGroup.all().copy().each(cons(ent => {
      ent.kill();
    }));
  }
});
