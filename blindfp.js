/* Book One, chapter 8, first person: a cloister court choked with fog. Clear the four things that blind, and the air clears with them. */
(function(){
'use strict';
var X=window.ASCENT;if(!X)return;
var MECH=X.MECH,keys=X.keys,reduce=X.reduce;
MECH.blindfp=function(D,sp){
  var T=D.T,q=D.q,M=q.M,st=D.stage,i;
  D.setUsed=true;
  var fog=new T.FogExp2(0x3a2e26,.085);D.floor.visible=false;D.sc.fog=fog;D.sc.background=new T.Color(0x3a2e26);
  var room=q.G();st.add(room);

  /* ── the court: tiled floor, arcades on three sides, open to the night sky ── */
  var fl=new T.Mesh(new T.PlaneGeometry(26,30),D.floor.material);fl.rotation.x=-Math.PI/2;fl.position.z=-2;room.add(fl);
  var wallM=M.s.clone();wallM.side=T.DoubleSide;
  function shell(geo,x,y,z,ry){var m=new T.Mesh(geo,wallM);m.position.set(x,y,z);m.rotation.y=ry||0;m.userData.ns=1;room.add(m);return m}
  shell(new T.PlaneGeometry(30,5.4),-7.2,2.7,-2,Math.PI/2);shell(new T.PlaneGeometry(30,5.4),7.2,2.7,-2,-Math.PI/2);shell(new T.PlaneGeometry(15,5.4),0,2.7,-12.6);
  function column(x,z){q.c(room,.34,.4,.2,x,.1,z,'s');q.c(room,.18,.22,3.1,x,1.75,z,'s');q.c(room,.42,.2,.46,x,3.53,z,'s');q.b(room,.9,.13,.9,x,3.83,z,'s')}
  for(i=0;i<5;i++){var z=4-i*3.4;[-1,1].forEach(function(sd){column(sd*5.4,z);if(i<4)q.t(room,1.7,.12,sd*5.4,3.9,z-1.7,'s',0,Math.PI/2,Math.PI)})}
  [-3.4,0,3.4].forEach(function(x){q.t(room,1.7,.12,x,3.9,-9.6,'s',0,0,Math.PI)});column(-1.7,-9.6);column(1.7,-9.6);
  q.b(room,2,.3,30,-6.3,5.5,-2,'d',0,-.25);q.b(room,2,.3,30,6.3,5.5,-2,'d',0,.25);q.b(room,13,.3,3,0,5.5,-11.2,'d',0,0,.25);
  var moon=new T.Mesh(new T.CircleGeometry(1.5,36),M.l);moon.position.set(3.5,11,-24);room.add(moon);

  /* ── targets ── */
  var targets=[],lastHit=-9,v0=new T.Vector3(),asp=1,fin=0,shake=0;
  function target(obj,r,nr,fn){
    var t={obj:obj,nr:nr,live:true,cool:0};
    t.fn=function(amt){if(!t.live||fin)return;if(amt==null){if(t.cool>0)return;t.cool=.14}lastHit=D.time;fn(t,amt)};
    t.hit=D.hit(obj,0,0,0,r,function(){t.fn(null)});targets.push(t);return t;
  }
  function kill(t){t.live=false;D.off(t.hit)}

  /* ── 1. the fogged mirror: rub it clear ── */
  var mir=q.G();mir.position.set(-2.9,0,-1.4);mir.rotation.y=.45;st.add(mir);
  q.b(mir,2.1,3.3,.16,0,1.95,0,'w');q.b(mir,2.5,.25,.9,0,.12,0,'w');q.t(mir,1.05,.1,0,3.6,0,'w',0,0,Math.PI);
  var glass=q.b(mir,1.8,3,.05,0,1.95,.1,'n'),mist=4,mglow=D.glow(6);mglow.position.set(0,2,.3);mglow.visible=false;mir.add(mglow);
  [[-.4,2.8,.6],[.4,2.1,.62],[-.35,1.4,.58],[.4,.85,.55]].forEach(function(p){
    var g=q.G();g.position.set(p[0],p[1],.16);mir.add(g);q.s(g,p[2],0,0,0,'p',.85,1.1,.12);q.s(g,p[2]*.6,.3,.25,0,'p',.8,1,.12);
    var dirt=1;
    target(g,.75,.11,function(t,amt){
      dirt-=amt==null?.5:amt/150;if(amt==null)D.tone(480,.07);
      if(dirt<=0){kill(t);mir.remove(g);D.tone(640,.14);mist--;if(!mist){glass.material=M.l;mglow.visible=true;complete(0)}}
      else g.scale.setScalar(.4+.6*dirt);
    });
    D.onUpdate(function(tm,dt){if(g.parent&&dirt<1){dirt=Math.min(1,dirt+dt*.04);g.scale.setScalar(.4+.6*dirt)}});
  });

  /* ── 2. the stirred pool: stop the paddle and the mud settles ── */
  var pool=q.G();pool.position.set(2.9,0,-1.2);st.add(pool);
  q.c(pool,1.5,1.6,.6,0,.3,0,'s');
  var wat=q.c(pool,1.32,1.32,.04,0,.61,0,'d'),swirl=q.G();swirl.position.y=.64;pool.add(swirl);
  q.t(swirl,.9,.04,.15,0,0,'p',1.5708,0,4.2);q.t(swirl,.5,.035,-.1,0,.1,'p',1.5708,0,3.6);
  var pad=q.G();pool.add(pad);q.c(pad,.05,.06,2,0,1.1,0,'w',.25);q.b(pad,.34,.5,.06,-.24,.3,0,'w');
  var pa=0,pspd=3.2,doneB=false,pglow=D.glow(3);pglow.position.set(0,.7,0);pglow.visible=false;pool.add(pglow);
  target(pad,.6,.12,function(t){
    pspd-=.85;D.tone(240,.1);shake=.18;D.burst(D.wpos(pad),0xffffff,true);
    if(pspd<=.2){pspd=0;doneB=true;kill(t);D.tween(.7,function(e){pad.rotation.z=e*1.3;pad.position.y=-e*.5},function(){pad.visible=false});swirl.visible=false;wat.material=M.a;pglow.visible=true;complete(1)}
  }).hit.position.y=1.2;

  /* ── 3. moths dazzled by the flame ── */
  var lamp=q.G();lamp.position.set(-1.4,0,-5.6);st.add(lamp);
  q.c(lamp,.4,.5,.2,0,.1,0,'d');q.c(lamp,.06,.08,1.7,0,1,0,'d');q.c(lamp,.3,.12,.16,0,1.9,0,'d');q.fl(lamp,0,1.95,0,1.8);
  var moths=5;
  for(i=0;i<5;i++)(function(n){
    var g=q.G(),wl=q.b(g,.34,.02,.3,-.17,0,0,'p'),wr=q.b(g,.34,.02,.3,.17,0,0,'p');q.s(g,.07,0,0,0,'d',.6,1,2.2);st.add(g);
    var rr=.8+n*.14,ph=n*1.3,sp2=1.6+n*.25,away=0;
    var t=target(g,.4,.1,function(tt){kill(tt);moths--;away=.001;D.tone(760+n*30,.07);if(!moths)complete(2)});
    D.onUpdate(function(tm,dt){
      var a=tm*sp2+ph,fz=Math.sin(tm*26+n)*.9;wl.rotation.z=fz;wr.rotation.z=-fz;
      if(away){away+=dt;g.position.x+=dt*(n%2?2.5:-2.5);g.position.y+=dt*2.2;if(away>2.5)g.visible=false;return}
      g.position.set(-1.4+Math.cos(a)*rr,2.3+Math.sin(tm*2.3+ph)*.4,-5.6+Math.sin(a)*rr);g.rotation.y=-a;
    });
  })(i);

  /* ── 4. the blind leading the blind toward the pit ── */
  q.t(room,1.1,.2,3.7,.1,-8,'s',1.5708);q.c(room,1.05,1.05,.02,3.7,.03,-8,'n');
  var pair=q.G();st.add(pair);
  var lead=q.f(pair,0,0,1.4,0),foll=q.f(pair,0,-1.1,1.3,0),bf=q.b(lead,.5,.12,.5,0,1.3,0,'p');q.b(foll,.5,.12,.5,0,1.3,0,'p');q.b(pair,.08,.08,.9,.3,1.55,-.55,'k');
  var u=0,pulls=0,doneD=false,sx=.4,sz=-4.4,ex=3.1,ez=-7.2;
  var leadT=target(lead,.9,.11,function(t){
    pulls++;u=Math.max(0,u-.3);D.tone(300,.12);shake=.2;bf.rotation.z=pulls*.35;bf.position.y=1.3+pulls*.05;
    if(pulls>=3){doneD=true;kill(t);var by=bf.position.y;D.tween(.6,function(e){bf.position.y=by+e*1.5;bf.position.x=e*1.2;bf.rotation.z=e*4},function(){lead.remove(bf)});
      var r0=pair.rotation.y;D.tween(.9,function(e){pair.rotation.y=r0+e*2.6});complete(3)}
  });
  leadT.hit.position.y=.8;

  /* ── a label over each of the four ── */
  var tags=[];for(i=0;i<4;i++){var tg=D.tag(sp.items[i][0]);st.add(tg);tags.push(tg)}
  tags[0].position.set(-2.9,4.05,-1.4);tags[2].position.set(-1.4,3.3,-5.6);

  /* ── progress: each thing cleared thins the fog ── */
  var doneN=0,finished=false;
  function complete(k){tags[k].visible=false;doneN++;D.say(sp.items[k][0],sp.items[k][1]);D.light(.15+.85*doneN/4);shake=.35;if(doneN>=4){fin=.001;D.tone(392,.7,.2);D.tone(587,.9,.5)}}
  D.light(.15);
  D.onUpdate(function(t,dt){
    var k;for(k=0;k<targets.length;k++)targets[k].cool-=dt;
    if(!doneB){pspd=Math.min(3.2,pspd+dt*.16);pa+=pspd*dt;pad.position.set(Math.cos(pa)*.75,0,Math.sin(pa)*.75);pad.rotation.y=-pa;swirl.rotation.y=-pa*.7;
      pad.getWorldPosition(v0);tags[1].position.set(v0.x,2.75,v0.z)}
    if(!doneD){u+=dt*.07;if(u>=1){u=0;D.tone(140,.25,0,.04)}
      pair.position.set(sx+(ex-sx)*u,0,sz+(ez-sz)*u);pair.rotation.y=Math.atan2(ex-sx,ez-sz);lead.position.y=Math.abs(Math.sin(t*4))*.05;foll.position.y=Math.abs(Math.sin(t*4+1))*.05;
      lead.getWorldPosition(v0);tags[3].position.set(v0.x,2.4,v0.z)}
    fog.density+=((fin?.012:.085-.016*doneN)-fog.density)*Math.min(1,dt*1.2);
    if(fin){fin+=dt;if(fin>1.6&&!finished){finished=true;D.done()}}
  });

  /* ── rub or swipe across a target; drag elsewhere to look around ── */
  var yaw=0,pitchA=0;
  D.gesture=function(a2,b2,d){
    if(fin)return;
    if(d>=2)for(var k=0;k<targets.length;k++){
      var t=targets[k];if(!t.live)continue;
      t.obj.getWorldPosition(v0);var p=D.project(v0),ax=a2.x*asp,bx=b2.x*asp,px=p.x*asp,dx=bx-ax,dy=b2.y-a2.y,l2=dx*dx+dy*dy||1e-6,
        w=Math.max(0,Math.min(1,((px-ax)*dx+(p.y-a2.y)*dy)/l2)),qx=ax+dx*w-px,qy=a2.y+dy*w-p.y;
      if(qx*qx+qy*qy<t.nr*t.nr){t.fn(d);return}
    }
    if(D.time-lastHit>.3){yaw=Math.max(-1.2,Math.min(1.2,yaw+(b2.x-a2.x)*1.1));pitchA=Math.max(-.4,Math.min(.5,pitchA-(b2.y-a2.y)*.45))}
  };

  /* ── first-person camera ── */
  var touch=!!(window.matchMedia&&window.matchMedia('(pointer:coarse)').matches),lx=0,ly=0;
  D.camFn=function(cam,dt){
    asp=cam.aspect;var port=asp<.85,ptr=D.ptr||{x:0,y:0},t=D.time,kk=Math.min(1,dt*5);
    yaw=Math.max(-1.2,Math.min(1.2,yaw+((keys.left?1:0)-(keys.right?1:0))*dt*1.2));
    shake*=Math.exp(-dt*6);
    var sk=reduce?0:shake,bob=reduce?0:Math.sin(t*1.3)*.025;
    cam.fov=port?72:60;cam.updateProjectionMatrix();
    cam.position.set((Math.random()-.5)*sk*.25,2.35+bob+(Math.random()-.5)*sk*.25,port?7.4:6.2);
    lx+=((touch?0:ptr.x*-.22)-lx)*kk;ly+=((touch?0:ptr.y*.14)-ly)*kk;
    var yy=yaw+lx,pp=pitchA+ly+(port?.1:.03);
    cam.lookAt(cam.position.x-Math.sin(yy)*10,cam.position.y+Math.sin(pp)*10-.9,cam.position.z-Math.cos(yy)*10);
  };
  D.fpCleanup=function(){D.sc.fog=null;D.sc.background=D.sky;D.floor.visible=true;D.camFn=null;D.cam.fov=45;D.gesture=null};
};
})();
