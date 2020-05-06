//crash it if you can idk
const color1="ffaa5f"; const color2="84f491";//color of pyratite and mender
const diagicon="commandRallySmall"; const diagstyle="clearPartiali";
const ts=50;//table size
//var logict=[1,1,1,0];//TT TF FT FF
//abuse tables, hmm
const yutplayerd=extendContent(MessageBlock,"yut-player-d",{
    placed(tile) {
        this.super$placed(tile);
        Call.setMessageBlockText(null,tile,color1);
    },
    drawSelect(tile){
      //kill the words
    },
    drawConfigure(tile){
      var offset=tile.ent().getPos();
      try{Draw.color(Color.valueOf(tile.ent().message));}
      catch(err){}
      Lines.square(tile.drawx()+offset.x*Vars.tilesize, tile.drawy()+offset.y*Vars.tilesize,1 * Vars.tilesize / 2 + 1);
      this.super$drawConfigure(tile);
    },
    updateTableAlign(tile,table){
      var pos = Core.input.mouseScreen(tile.drawx(), tile.drawy()  - tile.block().size * Vars.tilesize / 2 - 1);
      table.setPosition(pos.x, pos.y, Align.top);
    },
    buildConfiguration(tile, table){
      //this.super$buildConfiguration(tile,table);
      try{
        table.addImageButton(Icon[diagicon],Styles[diagstyle],ts, run(() => {
          tile.configure(6);
    		}));
        table.addImageButton(Icon.upOpen,Styles.clearTransi,ts, run(() => {
          tile.configure(2);
    		}));
        table.addImageButton(Icon[diagicon],Styles[diagstyle],ts, run(() => {
          tile.configure(5);
    		}));
        table.row();

        table.addImageButton(Icon.leftOpen,Styles.clearTransi,ts, run(() => {
        tile.configure(3);
        }));

        table.add().size(ts);
        table.addImageButton(Icon.rightOpen,Styles.clearTransi,ts, run(() => {
          tile.configure(1);
        }));
        table.row();

        table.addImageButton(Icon[diagicon],Styles[diagstyle],ts, run(() => {
          tile.configure(7);
    		}));
        table.addImageButton(Icon.downOpen,Styles.clearTransi,ts, run(() => {
          tile.configure(4);
    	  }));
        table.addImageButton(Icon[diagicon],Styles[diagstyle],ts, run(() => {
          tile.configure(8);
    		}));
        table.row();
        table.addImageButton(Icon.players,run(() => {
          tile.configure(-1);
        })).size(40);
        table.addImageButton(Icon.commandRally,run(() => {
          tile.configure(0);
        })).size(40);
        //table.row();
        //table.add().size(ts);
        this.super$buildConfiguration(tile,table);
      }
      catch(err){
        print(err);
      }
      /*
  		table.addImageButton(Icon.lineSmall, run(() => {

  		})).size(40);
      table.addImageButton(Icon.commandRallySmall, run(() => {

  		})).size(40);
      */
	 },
    configured(tile,player,value){
      //if(!value) return;
      if(value>=1&&value<=8) tile.ent().setLast(value);
      if(value==2) tile.ent().movePos(0,1);
      if(value==3) tile.ent().movePos(-1,0);
      if(value==1) tile.ent().movePos(1,0);
      if(value==4) tile.ent().movePos(0,-1);
      if(value==5) tile.ent().movePos(1,1);
      if(value==6) tile.ent().movePos(-1,1);
      if(value==7) tile.ent().movePos(-1,-1);
      if(value==8) tile.ent().movePos(1,-1);
      if(value==-1){
        if(tile.ent().message==color1) Call.setMessageBlockText(null,tile,color2);
        else Call.setMessageBlockText(null,tile,color1);
      }
      if(value==0) tile.ent().setPos(0,0);
    },
    load(){
      this.super$load();
      this.baseRegion=Core.atlas.find(this.name+"-base");
      this.topRegion=Core.atlas.find(this.name+"-top");
      this.playerRegion=Core.atlas.find(this.name+"-player");
    },
    /*drawConfigure(tile){
      var tx1=0; var ty1=0; var tx2=0; var ty2=0;
      if(tile.rotation()==0){
        tx1=-1; ty1=1;
        tx2=-1; ty2=-1;
      }
      else if(tile.rotation()==1){
        tx1=-1; ty1=-1;
        tx2=1; ty2=-1;
      }
      else if(tile.rotation()==2){
        tx1=1; ty1=-1;
        tx2=1; ty2=1;
      }
      else if(tile.rotation()==3){
        tx1=1; ty1=1;
        tx2=-1; ty2=1;
      }
      var in1=Vars.world.tile(tile.x+tx1,tile.y+ty1);
      var in2=Vars.world.tile(tile.x+tx2,tile.y+ty2);
      Draw.color(color1);
      Lines.square(in1.drawx(), in1.drawy(),1 * Vars.tilesize / 2 + 1);
      Draw.color(color2);
      Lines.square(in2.drawx(), in2.drawy(),1 * Vars.tilesize / 2 + 1);
      this.super$drawConfigure(tile);
    },*/
    draw(tile){
      //this.super$draw(tile);
      var offset=tile.ent().getPos();
      Draw.rect(this.baseRegion, tile.drawx(), tile.drawy());
      try{Draw.color(Color.valueOf(tile.ent().message));}
      catch(err){}
      Draw.rect(this.topRegion, tile.drawx(), tile.drawy());
      //Draw.rect(this.playerRegion, tile.drawx()+offset.x*Vars.tilesize, tile.drawy()+offset.y*Vars.tilesize);
      Draw.color();
      //Draw.rect(Core.atlas.find(this.name+"-"+tile.ent().message), tile.drawx(), tile.drawy(),90*tile.rotation());
    },
    drawLayer(tile){
      var offset=tile.ent().getPos();
      try{Draw.color(Color.valueOf(tile.ent().message));}
      catch(err){}
      //Draw.rect(this.topRegion, tile.drawx(), tile.drawy());
      Draw.rect(this.playerRegion, tile.drawx()+offset.x*Vars.tilesize, tile.drawy()+offset.y*Vars.tilesize);
      Draw.color();
    },
    update(tile){
      this.super$update(tile);
      var offset=tile.ent().getPos();
      var tileon=Vars.world.tile(tile.x+offset.x,tile.y+offset.y);
      if(tileon.block().name=="boardgames-buttonpad") tileon.block().unitOn(tileon,null);
      if(tileon.block().rotate) tile.ent().movePos(((tileon.rotation()-1)%2)*-1,((tileon.rotation()-2)%2)*-1);
      var floor=tileon.floor().name;
      if(floor=="ice"||floor=="snow"||floor=="ice-snow"||floor=="boardgames-yut-road") tile.configure(tile.ent().getLast());
    }
    //TODO:table, draw
});

yutplayerd.entityType=prov(() => extendContent(MessageBlock.MessageBlockEntity , yutplayerd , {
  getPos(){
    return Vec2(this._px,this._py);
  },
  setPos(x,y){
    this._px=x;
    this._py=y;
  },
  movePos(dx,dy){
    this._px+=dx;
    this._py+=dy;
  },
  setLast(a){
    this._plast=a;
  },
  getLast(){
    return this._plast;
  },
  _px:0,
  _py:0,
  _plast:0,
  write(stream){
    this.super$write(stream);
    stream.writeShort(this._px);
    stream.writeShort(this._py);
  },
  read(stream,revision){
    this.super$read(stream,revision);
    this._px=stream.readShort();
    this._py=stream.readShort();
  }
}));
