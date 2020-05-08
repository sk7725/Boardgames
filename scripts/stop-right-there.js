const stoprightthere = extendContent(Block, "stop-right-there", {
  placed(tile) {
    this.super$placed(tile);
    try{
      Vars.unitGroup.all().each(cons(ent => {
        ent.kill();
      }));
    }
    catch(err){
      print(err);
    }
  }
});
