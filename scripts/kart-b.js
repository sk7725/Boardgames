const presstick=20; const timerid=0; const blocksize=Vars.tilesize*1.5;
const animspeed=40;
const effectdur=140;
const boostcolor=Color.valueOf("ffbb77");
const bblock = newEffect(20, e => {
  Draw.color(boostcolor);
  Lines.stroke(e.fout() * 4);
  Lines.square(e.x, e.y, e.fin() * 11.5);
});

const bf = newEffect(50, e => {
  var len = e.finpow() * 10;
  var ang = e.rotation + 180 + Mathf.randomSeedRange(e.id, 30);
  Draw.color(boostcolor, Pal.lightOrange, e.fin());
  Fill.circle(e.x + Angles.trnsx(ang, len), e.y + Angles.trnsy(ang, len), 2 * e.fout());
});

const beff= extendContent(StatusEffect,"beff",{});
beff.speedMultiplier=1.55;
beff.color=boostcolor;
beff.effect=bf;

const kartb = extendContent(Block, "kart-b", {
  placed(tile) {
    this.super$placed(tile);
    tile.ent().timer.reset(timerid,presstick+1);
  },
  draw(tile) {
    Draw.rect(this.animRegion[Mathf.floorPositive((Time.time()%160)/animspeed)], tile.drawx(), tile.drawy());
    /*
    if(!tile.ent().timer.check(timerid,presstick)){
      Draw.blend(Blending.additive);
      Draw.alpha((presstick-tile.ent().timer.getTime(timerid))/presstick/1.5);
      Draw.rect(this.topRegion, tile.drawx(), tile.drawy());
      Draw.color();
      Draw.blend();
    }
    */
  },
  unitOn(tile,unit){
    if(tile.ent().timer.check(timerid,presstick)){
      Sounds.flame.at(tile.worldx(),tile.worldy(),0.3);
      Effects.effect(bblock, tile.drawx(), tile.drawy());
    }
    tile.ent().timer.reset(timerid,0);
    if(!(unit instanceof Player)) unit.velocity().add(unit.velocity().x*Time.delta()*1,unit.velocity().y*Time.delta()*1);
    unit.applyEffect(beff,effectdur);
  },
  update(tile){
    this.super$update(tile);
    Units.nearby(tile.worldx(),tile.worldy(),blocksize,blocksize,cons(e => {
      this.unitOn(tile,e);
    }));
  },
  load(){
    this.super$load();
    this.animRegion=[];
    for(var i=0;i<4;i++){
      this.animRegion.push(Core.atlas.find(this.name+"-"+i));
    }
  }
});
