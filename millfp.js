/* Book One, chapter 10, first person: a mill hall in fog. The wheel barely turns until you stop the four things that drain it. */
(function(){
'use strict';
var X=window.ASCENT;if(!X)return;
var MECH=X.MECH,keys=X.keys,reduce=X.reduce;
MECH.millfp=function(D,sp){
  var T=D.T,q=D.q,M=q.M,st=D.stage,i,TAU2=Math.PI*2;
  D.setUsed=true;
  D.floor.visible=false;D.sc.fog=new T.FogExp2(0x3a2e26,.04);D.sc.background=new T.Color(0x3a2e26);
  var room=q.G();st.add(room);

  /* ── the hall: tiled floor, side walls with blind arcades, barrel vault, round window in the far wall ── */
  var fl=new T.Mesh(new T.PlaneGeometry(16,36),D.floor.material);fl.rotation.x=-Math.PI/2;fl.position.z=-5;room.add(fl);
  var wallM=M.s.clone();wallM.side=T.DoubleSide;
  function shell(geo,x,y,z,rx,ry){var m=new T.Mesh(geo,wallM);m.position.set(x,y,z);m.rotation.set(rx||0,ry||0,0);m.userData.ns=1;room.add(m);return m}
  shell(new T.PlaneGeometry(36,5),-7,2.5,-5,0,Math.PI/2);shell(new T.PlaneGeometry(36,5),7,2.5,-5,0,-Math.PI/2);
  shell(new T.CylinderGeometry(7,7,36,36,1,true,Math.PI/2,Math.PI),0,5,-5,Math.PI/2);
  shell(new T.PlaneGeometry(14,12),0,6,-23);shell(new T.PlaneGeometry(14,12),0,6,13);
  var win=new T.Mesh(new T.CircleGeometry(2.6,40),M.l);win.position.set(0,5.6,-22.9);room.add(win);
  q.t(room,2.6,.18,0,5.6,-22.85,'s');
  for(i=0;i<6;i++)q.b(room,.1,5.2,.1,0,5.6,-22.85,'d',0,i*.5236);
  [2.5,-3,-8.5,-14,-19.5].forEach(function(z,n){
    [-1,1].forEach(function(sd){
      var x=sd*6.2;
      q.c(room,.36,.42,.2,x,.1,z,'s');q.c(room,.19,.24,3.3,x,1.95,z,'s');q.c(room,.44,.21,.5,x,3.85,z,'s');q.b(room,.95,.14,.95,x,4.17,z,'s');
      if(n<4)q.t(room,2.75,.13,sd*6.9,4.24,z-2.75,'s',0,Math.PI/2,Math.PI);
    });
  });

  /* ── the millrace and the wheel ── */
  q.b(room,.3,.5,30,-.8,.25,-7,'s');q.b(room,.3,.5,30,.8,.25,-7,'s');
  var water=new T.Mesh(new T.BoxGeometry(1.3,.08,30),M.a);water.position.set(0,.12,-7);room.add(water);
  var wg=q.G();wg.position.set(1,0,-13.5);wg.rotation.y=-.85;st.add(wg);
  var wheel=q.G();wheel.position.set(0,3.15,0);wg.add(wheel);
  [-.6,.6].forEach(function(x){q.t(wheel,3,.14,x,0,0,'w',0,Math.PI/2);for(var k=0;k<4;k++)q.b(wheel,.14,5.9,.14,x,0,0,'w',0,0,k*.7854)});
  for(i=0;i<12;i++){var a=i*TAU2/12;q.b(wheel,1.4,.1,.8,0,Math.sin(a)*3,Math.cos(a)*3,'p',0,0,-a)}
  q.c(wheel,.2,.2,2.4,0,0,0,'w',1.5708);
  [-1.25,1.25].forEach(function(x){q.b(wg,.3,3.3,.3,x,1.65,0,'w');q.b(wg,.3,.3,1.6,x,.15,0,'w')});

  /* ── targets: anything you can strike ── */
  var targets=[],lastHit=-9,v0=new T.Vector3(),asp=1;
  function target(obj,r,nr,fn,parent,x,y,z){
    var t={obj:obj,nr:nr,live:true,cool:0};
    t.fn=function(){if(!t.live||fin||t.cool>0)return;t.cool=.14;lastHit=D.time;swing=1;fn(t)};
    t.hit=D.hit(parent||obj,x||0,y||0,z||0,r,t.fn);targets.push(t);return t;
  }
  function kill(t){t.live=false;D.off(t.hit)}

  /* ── 1. the side sluice ── */
  q.b(room,5,.5,.25,-3.5,.25,1,'s');q.b(room,5,.5,.25,-3.5,.25,2,'s');
  var sideW=new T.Mesh(new T.BoxGeometry(5.4,.08,.75),M.a);sideW.position.set(-3.6,.3,1.5);room.add(sideW);
  q.b(room,.18,2.4,.18,-1.15,1.2,.95,'w');q.b(room,.18,2.4,.18,-1.15,1.2,2.05,'w');q.b(room,.2,.2,1.5,-1.15,2.45,1.5,'w');
  var gate=q.b(st,.12,1.1,.95,-1.15,1.6,1.5,'w'),gateY=1,doneA=false;
  target(gate,.75,.12,function(t){
    gateY-=.24;D.tone(210,.1);D.burst(D.wpos(gate),0xffffff,true);shake=.22;
    if(gateY<=0){gateY=0;doneA=true;kill(t);D.tone(120,.3);shake=.5;D.tween(.8,function(e){sideW.scale.x=1-e;sideW.position.x=-3.6+2.7*e},function(){sideW.visible=false});complete(0)}
  });

  /* ── 2. the uncovered cauldron ── */
  var pot=q.G();pot.position.set(3,0,1.2);room.add(pot);
  for(i=0;i<3;i++){var la=i*2.094;q.c(pot,.05,.05,1.3,Math.sin(la)*.6,.6,Math.cos(la)*.6,'d',Math.sin(la)*.25,-Math.cos(la)*.25)}
  q.s(pot,.8,0,1.15,0,'d',.8);q.t(pot,.72,.07,0,1.5,0,'d',1.5708);q.fl(pot,0,.1,0,1.3);
  var lid=q.G();q.c(lid,.78,.82,.1,0,0,0,'d');q.s(lid,.12,0,.14,0,'d');st.add(lid);
  var lidP=0,doneB=false,steam=[];
  for(i=0;i<7;i++){var sg=D.glow(1.2);st.add(sg);steam.push(sg)}
  target(lid,.8,.12,function(t){
    lidP+=.36;D.tone(300,.08);shake=.18;
    if(lidP>=1){lidP=1;doneB=true;kill(t);D.tone(150,.25);shake=.4;steam.forEach(function(s){s.visible=false});complete(1)}
  });

  /* ── 3. the tree and its shoots ── */
  var tree=q.G();tree.position.set(-3.4,0,-3.8);room.add(tree);
  q.c(tree,1.3,1.45,.45,0,.22,0,'s');q.c(tree,.2,.3,2.8,0,1.8,0,'w');
  q.s(tree,1,0,3.7,0,'d',.85);q.s(tree,.7,-.75,3.3,.2,'d',.8);q.s(tree,.7,.75,3.35,-.2,'d',.8);
  var shoots=5,fruit=[];
  for(i=0;i<5;i++)(function(n){
    var sa=n*1.257+.4,g=q.G();g.position.set(-3.4+Math.sin(sa)*.75,.45,-3.8+Math.cos(sa)*.75);g.rotation.set(Math.cos(sa)*.35,0,-Math.sin(sa)*.35);st.add(g);
    q.k(g,.09,1.5,0,.75,0,'p');q.s(g,.14,.1,1.1,0,'p',.5,1.6);q.s(g,.12,-.1,.8,0,'p',.5,1.6);
    target(g,.5,.1,function(t){
      kill(t);shoots--;D.tone(480+n*40,.1);D.burst(D.wpos(g),0xffffff,true);
      var sx=g.position.x,sy=g.position.y,sz=g.position.z;D.tween(.6,function(e){g.position.set(sx+Math.sin(sa)*e*2,sy+Math.sin(e*Math.PI)*1.5,sz+Math.cos(sa)*e*2);g.rotation.x+=.2},function(){st.remove(g)});
      if(!shoots){for(var f=0;f<6;f++)fruit.push(q.s(tree,.13,Math.sin(f*1.05)*.8,3.4+Math.cos(f*2.1)*.5,.75,'l'));complete(2)}
    },g,0,.7,0);
  })(i);

  /* ── 4. the waterskin and its leeches ── */
  var skin=q.G();skin.position.set(3.3,0,-3.6);room.add(skin);
  q.b(skin,.22,3.2,.22,0,1.6,0,'w');q.b(skin,1.1,.16,.16,-.45,3,0,'w');q.c(skin,.02,.02,.7,-.85,2.6,0,'d');
  var bag=q.s(skin,.5,-.85,1.75,0,'c',1.35,1,.8),leeches=5;
  [[-.2,.35,.36],[.2,.1,.38],[0,-.25,.4],[-.3,-.1,.3],[.28,-.4,.3]].forEach(function(p,n){
    var le=q.s(skin,.07,-.85+p[0],1.75+p[1],p[2],'n',2.2,.6,.7);le.rotation.z=n*.9;
    target(le,.3,.09,function(t){
      kill(t);leeches--;D.tone(620+n*30,.08);D.burst(D.wpos(le),0xffffff,true);
      D.tween(.5,function(e){le.position.y=1.75+p[1]-e*1.6;le.scale.setScalar(1-e*.8)},function(){skin.remove(le)});
      if(!leeches){bag.scale.set(1.15,1.5,.95);complete(3)}
    });
    D.onUpdate(function(t){if(le.parent&&targets.length)le.scale.y=2.2*(1+.18*Math.sin(t*5+n))});
  });

  /* ── a label over each of the four ── */
  var tags=[];for(i=0;i<4;i++){var tg=D.tag(sp.items[i][0]);st.add(tg);tags.push(tg)}
  tags[2].position.set(-3.4,2.2,-3);tags[3].position.set(2.45,2.95,-3.5);

  /* ── progress ── */
  var doneN=0,fin=0,finished=false,shake=0,swing=0,spin=0;
  function complete(k){tags[k].visible=false;doneN++;D.say(sp.items[k][0],sp.items[k][1]);D.light(.2+.8*doneN/4);if(doneN>=4){fin=.001;D.tone(392,.7,.2);D.tone(587,.9,.5)}}
  D.light(.2);
  D.onUpdate(function(t,dt){
    var k;for(k=0;k<targets.length;k++)targets[k].cool-=dt;
    if(!doneA){gateY=Math.min(1,gateY+dt*.15)}
    gate.position.y=.55+gateY*1.05;tags[0].position.set(-1.15,gate.position.y+.75,1.5);
    if(!doneB){lidP=Math.max(0,lidP-dt*.13)}
    lid.position.set(4.3-1.3*lidP,.5+1.05*lidP+Math.sin(lidP*Math.PI)*.5+(doneB?0:Math.sin(t*30)*.02*lidP),1.6-.4*lidP);lid.rotation.z=(1-lidP)*-.9;tags[1].position.set(lid.position.x,lid.position.y+.45,lid.position.z);
    for(k=0;k<steam.length;k++){var ph=(t*.35+k/steam.length)%1;steam[k].position.set(3+Math.sin(k*2+t)*.25*ph,1.6+ph*3,1.2+Math.cos(k*3)*.2*ph);steam[k].material.opacity=(1-ph)*.5*(1-lidP*.8);steam[k].scale.setScalar(.8+ph*1.6)}
    var prog=doneN/4;
    spin+=((fin?7:.25+prog*3.2)-spin)*Math.min(1,dt*2);wheel.rotation.x-=spin*dt;
    water.position.y+=((.12+.26*prog)-water.position.y)*Math.min(1,dt*2);
    if(fin){fin+=dt;shake=Math.max(shake,.18);if(fin>1.5&&!finished){finished=true;D.done()}}
  });

  /* ── swipe across a target to strike it; drag elsewhere to look around ── */
  var yaw=0,pitch=0;
  D.gesture=function(a2,b2,d){
    if(fin)return;
    if(d>=3)for(var k=0;k<targets.length;k++){
      var t=targets[k];if(!t.live)continue;
      t.obj.getWorldPosition(v0);var p=D.project(v0),ax=a2.x*asp,bx=b2.x*asp,px=p.x*asp,dx=bx-ax,dy=b2.y-a2.y,l2=dx*dx+dy*dy||1e-6,
        u=Math.max(0,Math.min(1,((px-ax)*dx+(p.y-a2.y)*dy)/l2)),ex=ax+dx*u-px,ey=a2.y+dy*u-p.y;
      if(ex*ex+ey*ey<t.nr*t.nr){t.fn();return}
    }
    if(D.time-lastHit>.3){yaw=Math.max(-1.15,Math.min(1.15,yaw+(b2.x-a2.x)*1.1));pitch=Math.max(-.5,Math.min(.3,pitch-(b2.y-a2.y)*.45))}
  };

  /* ── first-person camera ── */
  var touch=!!(window.matchMedia&&window.matchMedia('(pointer:coarse)').matches),lastPtr=null,ptrAge=9,lx=0,ly=0;
  D.camFn=function(cam,dt){
    asp=cam.aspect;var port=asp<.85,ptr=D.ptr||{x:0,y:0},t=D.time,kk=Math.min(1,dt*5);
    if(ptr!==lastPtr){lastPtr=ptr;ptrAge=0}else ptrAge+=dt;
    yaw=Math.max(-1.15,Math.min(1.15,yaw+((keys.left?1:0)-(keys.right?1:0))*dt*1.2));
    shake*=Math.exp(-dt*6);swing*=Math.exp(-dt*9);
    var sk=reduce?0:shake,bob=reduce?0:Math.sin(t*1.3)*.025;
    cam.fov=port?70:60;cam.updateProjectionMatrix();
    cam.position.set((Math.random()-.5)*sk*.25,2.35+bob+(Math.random()-.5)*sk*.25,port?9.2:8);
    lx+=((touch?0:ptr.x*-.22)-lx)*kk;ly+=((touch?0:ptr.y*.14)-ly)*kk;
    var yy=yaw+lx,pp=pitch+ly+(port?.12:.02);
    cam.lookAt(cam.position.x-Math.sin(yy)*10,cam.position.y+Math.sin(pp)*10-.9,cam.position.z-Math.cos(yy)*10);
  };
  D.fpCleanup=function(){
    D.sc.fog=null;D.sc.background=D.sky;D.floor.visible=true;D.camFn=null;D.cam.fov=45;D.gesture=null;
  };
};
})();
