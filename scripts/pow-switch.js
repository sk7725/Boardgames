//credits to DeltaNedas
const presstick=90; const timerid=0; const blocksize=Vars.tilesize;
var alive = {};

const powswitch = extendContent(Block, "pow-switch", {
	draw(tile) {
		Draw.rect(this.halfRegion[tile.x%2], tile.drawx(), tile.drawy());
	},
  drawLayer(tile){
    if(tile.x%2==0){
      var t=tile.ent().timer.getTime(timerid);
      if(t>presstick) t=presstick;
      Draw.color(Color.valueOf("ff5555").shiftHue(Time.time() * 2.0).a((presstick-t)/presstick));
      Draw.rect(this.topRegion, tile.drawx(), tile.drawy());
      Draw.color();
    }
  },
  load(){
    this.super$load();
    this.halfRegion=[];
    this.halfRegion.push(Core.atlas.find(this.name+"-0"));
    this.halfRegion.push(Core.atlas.find(this.name+"-1"));
    this.topRegion=Core.atlas.find(this.name+"-top");
    //this.baseRegion=;
  },
  /*
	generateIcons() {
		return [Core.atlas.find(this.name)];
	},
  */
	calcOffset(tile) {
		var x = tile.x;
		if (x % 2 == 0) {
			x++;
		} else {
			x--;
		}
		return x;
	},

	canPlaceOn(tile){
		const x = this.calcOffset(tile);
		const other = Vars.world.tile(x, tile.y);
		return other.block() == "air"
	},
  unitOn(tile,unit){
    //if(tile.ent().timer.check(timerid,presstick)) Sounds.place.at(tile.worldx(),tile.worldy(),1.2);
    tile.ent().timer.reset(timerid,0);
  },
  update(tile){
    this.super$update(tile);
    if(tile.x%2==0){
      Units.nearby(tile.worldx()-blocksize*1.5,tile.worldy()-blocksize*1.5,blocksize*5,blocksize*4,cons(e => {
        this.unitOn(tile,e);
      }));
    }
  },
	placed(tile) {
		this.super$placed(tile);
		const x = this.calcOffset(tile);
		Call.setTile(Vars.world.tile(x, tile.y), this, tile.team, 0);
		alive[x + "," + tile.y] = true;
		alive[tile.x + "," + tile.y] = true;
	},

	removed(tile) {
		this.super$removed(tile);
		const x = this.calcOffset(tile);
		const key = tile.x + "," + tile.y;
		/* Prevent trying to delete the other half infinitely */
		if (alive[key]) {
			alive[key] = false;
			Call.setTile(Vars.world.tile(x, tile.y), Blocks.air, tile.team, 0);
		}
	}
});
