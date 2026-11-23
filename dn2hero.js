/* Hand-built set pieces for The Dark Night, made to the same standard as the bird level.
   Each one replaces the simpler scene registered for that chapter in dn1fp.js / dn2fp.js. */
(function(){
'use strict';
var X=window.ASCENT;if(!X||!X.MECH)return;
var MECH=X.MECH,keys=X.keys,reduce=X.reduce;

/* ── Book Two, chapter 10: the log in the fire ──
   A stone hearth at night. A green, wet log lies on the irons. You work the bellows to keep the fire alive while it does
   everything that looks like failure: the log hisses and weeps, blackens, spits, splits and smokes the room, and only then
   turns wholly to fire. If you stop, the fire sinks; it never goes out, but the work stalls. */
MECH.sdn25fp=function(D,sp){
  var T=D.T,q=D.q,M=q.M,st=D.stage,i,PI=Math.PI,TAU=PI*2;
  D.setUsed=true;
  D.floor.visible=false;var fogC=0x2a1f19;D.sc.fog=new T.FogExp2(fogC,.05);D.sc.background=new T.Color(fogC);

  /* ── the room: plank floor, round stone walls, a deep arched hearth, a window with the moon ── */
  var room=q.G();st.add(room);
  var floor=new T.Mesh(new T.CircleGeometry(9,48),M.w.clone());floor.rotation.x=-PI/2;room.add(floor);
  for(i=-8;i<=8;i++)q.b(room,.04,.02,18,i*1.05,.012,0,'d');
  var wallM=M.s.clone();wallM.side=T.DoubleSide;var wall=new T.Mesh(new T.CylinderGeometry(9,9,7,40,1,true),wallM);wall.position.y=3.5;room.add(wall);
  var ceil=new T.Mesh(new T.CircleGeometry(9,40),M.d.clone());ceil.material.side=T.DoubleSide;ceil.rotation.x=PI/2;ceil.position.y=7;room.add(ceil);
  for(i=0;i<9;i++){var a=-PI*.9+i*PI*.225;q.b(room,.35,7,.3,Math.sin(a)*8.8,3.5,-Math.cos(a)*8.8,'w',-a)}
  /* window and moon behind you to the left */
  var win=q.G();win.position.set(-6.4,3.4,4.8);win.rotation.y=PI*.72;room.add(win);q.b(win,1.6,2.2,.1,0,0,0,'n');q.b(win,1.8,.12,.2,0,1.1,0,'w');q.b(win,1.8,.12,.2,0,-1.1,0,'w');q.b(win,.08,2.2,.12,0,0,.04,'w');q.b(win,1.6,.08,.12,0,0,.04,'w');
  var moon=D.glow(1.2);moon.position.set(.3,.4,-.2);moon.material.opacity=.7;win.add(moon);
  /* the hearth */
  var H=q.G();H.position.set(0,0,-5.2);room.add(H);
  q.b(H,6.4,.5,2.6,0,.25,.4,'s');                                   /* hearthstone */
  q.b(H,1.3,3.4,1.6,-2.5,1.95,0,'s');q.b(H,1.3,3.4,1.6,2.5,1.95,0,'s');/* jambs */
  q.b(H,6.4,1,1.8,0,4.1,0,'s');q.b(H,7,.25,2.2,0,3.55,.2,'w');     /* lintel and mantel */
  q.b(H,3.8,3.2,.3,0,1.9,-.75,'d');                                  /* sooty back */
  var chim=new T.Mesh(new T.CylinderGeometry(1.2,1.9,3.2,20,1,true),M.d.clone());chim.material.side=T.DoubleSide;chim.position.set(0,5.6,-.2);H.add(chim);
  [-1,1].forEach(function(sd){q.c(H,.06,.06,1.6,sd*.9,.75,.15,'d',0,PI/2);q.c(H,.06,.06,.5,sd*.9,.75-.25,.95,'d');q.c(H,.06,.06,.5,sd*.9,.75-.25,-.65,'d')});
  /* candlesticks and a crucifix on the mantel */
  [-2.6,2.6].forEach(function(x){q.c(H,.12,.18,.12,x,3.74,.2,'g');q.c(H,.05,.05,.5,x,4.05,.2,'p')});
  var cr=q.G();cr.position.set(0,4.2,-.5);H.add(cr);q.b(cr,.08,.9,.06,0,.45,0,'w');q.b(cr,.5,.08,.06,0,.65,0,'w');

  /* ── the log: green and wet to start, its colour, glow and shape driven by the burn ── */
  var logM=new T.MeshStandardMaterial({color:0xb8a27a,roughness:.9,emissive:0x000000});
  var log=new T.Mesh(new T.CylinderGeometry(.42,.46,2.6,24,6),logM);log.rotation.z=PI/2;log.position.set(0,1.18,.15);H.add(log);
  var ends=[-1,1].map(function(sd){var e=new T.Mesh(new T.CircleGeometry(.44,24),new T.MeshStandardMaterial({color:0xd8c39a,roughness:1,emissive:0x000000}));e.position.set(sd*1.31,1.18,.15);e.rotation.y=sd*PI/2;H.add(e);
    for(var r=1;r<4;r++){var ring=new T.Mesh(new T.TorusGeometry(r*.11,.008,4,24),M.d);ring.position.copy(e.position);ring.position.x+=sd*.005;ring.rotation.y=sd*PI/2;H.add(ring)}return e});
  /* bark ridges, beads of sap and water, cracks that open later */
  var ridges=[];for(i=0;i<14;i++){var ra=i/14*TAU,rr=q.b(H,2.4,.05,.06,0,1.18+Math.sin(ra)*.44,.15+Math.cos(ra)*.44,'w',0,0,-ra);ridges.push(rr)}
  var beads=[];for(i=0;i<16;i++){var ba=-.6+Math.random()*1.2+PI*(i%2?0:1)*.15,bx=(Math.random()-.5)*2.2,b=q.s(H,.05,bx,1.18+Math.cos(ba)*.46,.15+Math.sin(ba)*.46+.02,'p');b.userData.base=b.position.y;beads.push(b)}
  var cracks=[];for(i=0;i<6;i++){var cx=(i-2.5)*.42,c=q.b(H,.03,.02,.5,cx,1.62,.15,'n',0,(Math.random()-.5)*.6);c.scale.z=.01;c.userData.glow=0;cracks.push(c)}
  var crackM=new T.MeshBasicMaterial({color:0x000000});cracks.forEach(function(c){c.material=crackM});

  /* ── fire: layered flame cones, embers, sparks up the chimney, a light that throws the room around ── */
  var fire=q.G();fire.position.set(0,.95,.15);H.add(fire);
  var flames=[];for(i=0;i<9;i++){var fm=new T.MeshBasicMaterial({color:0xffffff,transparent:true,opacity:.0,depthWrite:false,blending:T.AdditiveBlending});
    var f=new T.Mesh(new T.ConeGeometry(.22+Math.random()*.14,1,10,1,true),fm);f.position.set((i-4)*.28,.4,(i%2?.18:-.12));f.userData={ph:Math.random()*6,s:.7+Math.random()*.6};fire.add(f);flames.push(f)}
  var core=D.glow(4);core.position.set(0,1.4,.6);core.material.opacity=.2;H.add(core);
  var fl=new T.PointLight(0xffffff,1.2,22,1.6);fl.position.set(0,1.9,1.4);H.add(fl);
  var embers=[];for(i=0;i<22;i++){var em=q.s(H,.04+Math.random()*.04,(Math.random()-.5)*2.4,.62,.15+(Math.random()-.5)*.8,'l');embers.push(em)}
  var sparks=[];for(i=0;i<40;i++){var sk=D.glow(.25);sk.material.opacity=0;H.add(sk);sparks.push({s:sk,t:9,v:new T.Vector3()})}
  function spark(n,force){for(var k=0;k<sparks.length&&n>0;k++){var s=sparks[k];if(s.t<1.4)continue;s.t=0;s.s.position.set((Math.random()-.5)*1.8,1.4,.15+(Math.random()-.5)*.5);s.v.set((Math.random()-.5)*(force||1),2+Math.random()*2.5*(force||1),(Math.random()-.2)*(force||1)*1.4);n--}}
  /* steam and smoke puffs */
  var puffs=[];for(i=0;i<26;i++){var pm=new T.MeshBasicMaterial({color:0xffffff,transparent:true,opacity:0,depthWrite:false});var pf=new T.Mesh(new T.SphereGeometry(.3,8,6),pm);H.add(pf);puffs.push({m:pf,t:9,v:new T.Vector3(),dark:false})}
  function puff(dark,n,x){for(var k=0;k<puffs.length&&n>0;k++){var p=puffs[k];if(p.t<2)continue;p.t=0;p.dark=dark;p.m.material.color.set(dark?0x1b130e:0xffffff);
    p.m.position.set(x!=null?x:(Math.random()-.5)*2,1.5,.2);p.v.set((Math.random()-.5)*.6,dark?.9:1.4,dark?.7+Math.random()*.6:.2);n--}}

  /* ── the bellows on the hearthstone: tap it, click it, or press Space, to blow ── */
  var bel=q.G();bel.position.set(.9,.55,1.5);bel.rotation.y=-.35;H.add(bel);
  var top=q.G(),bot=q.G();bel.add(bot);bel.add(top);
  q.b(bot,.9,.06,1.1,0,0,0,'w');q.b(bot,.12,.06,.4,0,0,.7,'w');
  q.b(top,.9,.06,1.1,0,.35,0,'w');q.c(top,.05,.05,.5,0,.35,-.75,'w',PI/2);
  var leather=new T.Mesh(new T.CylinderGeometry(.5,.5,.35,16,1,true),M.c);leather.scale.z=1.25;leather.position.y=.17;bel.add(leather);
  var nozzle=q.c(bel,.04,.07,.5,0,.05,-.78,'g',PI/2);
  var belTag=D.tag('Work the bellows');st.add(belTag);
  var knotTag=D.tag('Burn out the knots');knotTag.position.set(0,2.3,-4.6);knotTag.visible=false;st.add(knotTag);
  var pumpT=0,heat=.35,stage=0,prog=0,doneSt=[0,0,0,0],finished=false,fin=0;D.hit(H,.9,.75,1.5,.75,pump);
  function pump(){if(finished)return;pumpT=1;heat=Math.min(1.25,heat+(stage===2?.15:.17));D.tone(70+Math.random()*20,.18,0,.05);
    spark(4,.6);puffAir()}
  var airs=[];for(i=0;i<6;i++){var ag=D.glow(.5);ag.material.opacity=0;H.add(ag);airs.push({g:ag,t:9})}
  function puffAir(){for(var k=0;k<airs.length;k++){if(airs[k].t<.5)continue;airs[k].t=0;break}}
  function unKey(){try{window.removeEventListener('keydown',onKey)}catch(_){}}
  try{window.addEventListener('keydown',onKey)}catch(_){}function onKey(e){if(e.code==='Space'&&!e.repeat&&D.cam&&MECH.sdn25fp.active){e.preventDefault();pump()}}
  MECH.sdn25fp.active=true;

  /* ── stage 1's knots: hard knots in the wood the fire must eat; tap each to let it burn through ── */
  var knots=[],knotHits=[];
  function makeKnots(){[-.8,.1,.85].forEach(function(x,k){var kn=q.s(H,.13,x,1.5,.48,'d',1,1,.5);knots.push(kn);
    var gl=D.glow(.7);gl.material.opacity=.0;kn.add(gl);kn.userData.gl=gl;
    knotHits.push(D.hit(H,x,1.5,.55,.3,function(){burnKnot(k)}))})}
  var knotsLeft=3;
  function burnKnot(k){var kn=knots[k];if(!kn||kn.userData.gone)return;if(heat<.45){D.tone(120,.1);return}
    kn.userData.gone=1;D.off(knotHits[k]);knotsLeft--;D.burst(D.wpos(kn),0xffffff,true);D.tone(640,.1);D.tone(320,.25,.05);spark(10,1.6);
    D.tween(.6,function(e){kn.scale.setScalar(1-e);kn.userData.gl.material.opacity=1-e},function(){H.remove(kn)})}
  /* the final touch: once the log is all fire, tap it to let it go up */
  var logHit=null;

  /* ── stage text: John's four steps, said as they happen ── */
  var tags=[];
  function enter(n){stage=n;prog=0;if(n===1)makeKnots();if(n===3){logHit=D.hit(H,0,1.3,.4,.8,function(){if(prog>=1&&!fin){fin=.001;D.off(logHit);D.tone(392,.8);D.tone(587,1,.3);D.tone(784,1.2,.6)}})}}
  function finishStage(n){if(doneSt[n])return;doneSt[n]=1;D.say(sp.items[n][0],sp.items[n][1]);D.light(.25+.25*(n+1))}
  D.light(.2);
  var label=D.tag('Let it become fire');label.position.set(0,2.6,-4.6);label.visible=false;st.add(label);

  D.onUpdate(function(t,dt){
    var k;
    /* the fire always cools; it never quite goes out */
    heat=Math.max(.12,heat-dt*(stage===2?.16:.11));pumpT=Math.max(0,pumpT-dt*3);
    top.position.y=-.25*Math.sin(pumpT*PI);top.rotation.x=-.12*Math.sin(pumpT*PI);leather.scale.y=1-.6*Math.sin(pumpT*PI);
    airs.forEach(function(a2){if(a2.t<.5){a2.t+=dt;var e=a2.t/.5;a2.g.position.set(.9-.9*e,.65+e*.5,.9-1.2*e);a2.g.material.opacity=.5*(1-e)}else a2.g.material.opacity=0});
    var hot=Math.min(1,heat),burn=stage/3+prog/3;
    /* flames */
    flames.forEach(function(f,n){var u=f.userData,h=(.5+hot*1.6+burn*.6)*u.s*(1+.18*Math.sin(t*9+u.ph)+.1*Math.sin(t*23+u.ph*2));
      f.scale.set(1+hot*.3,Math.max(.05,h),1+hot*.3);f.position.y=h*.5;f.material.opacity=.18+hot*.55;f.rotation.y=t*.6+u.ph});
    core.material.opacity=.15+hot*.6+burn*.2;core.scale.setScalar(3+hot*3+burn*3);
    fl.intensity=.5+hot*1.6+burn*.8+Math.sin(t*17)*.08*hot;
    embers.forEach(function(e,n){e.scale.setScalar(.6+.5*Math.sin(t*3+n)*hot+hot*.4)});
    if(Math.random()<dt*(1+hot*6))spark(1,.8+hot);
    sparks.forEach(function(s){if(s.t<1.4){s.t+=dt;s.s.position.addScaledVector(s.v,dt);s.v.y-=dt*.8;s.v.x+=Math.sin(t*4+s.t*9)*dt*.6;s.s.material.opacity=Math.max(0,.9*(1-s.t/1.4))}else s.s.material.opacity=0});
    puffs.forEach(function(p){if(p.t<2){p.t+=dt;p.m.position.addScaledVector(p.v,dt);var e=p.t/2;p.m.scale.setScalar(.6+e*(p.dark?3.2:1.6));p.m.material.opacity=(p.dark?.5:.35)*Math.sin(e*PI)}else p.m.material.opacity=0});

    /* ── the four stages ── */
    var working=heat>.55;
    if(stage===0){ /* hisses and weeps: the beads boil off, steam jets */
      if(working)prog+=dt*.16;
      beads.forEach(function(b,n){var vis=prog<(n+1)/beads.length+.02;b.visible=vis;if(vis){b.position.y=b.userData.base-((t*.3+n*.13)%1)*.08}});
      if(Math.random()<dt*(1.5+hot*4)){puff(false,1,(Math.random()-.5)*2);if(Math.random()<.4)D.tone(1800+Math.random()*900,.05,0,.015)}
      if(prog>=1){finishStage(0);enter(1)}
    }else if(stage===1){ /* it blackens: the green goes to char; the knots must burn through */
      if(working)prog=Math.min(1,prog+dt*.12);
      var ch=Math.min(1,prog*1.4);logM.color.setRGB(.72-.6*ch,.64-.56*ch,.48-.42*ch);ends.forEach(function(e){e.material.color.setRGB(.85-.7*ch,.76-.64*ch,.6-.5*ch)});
      ridges.forEach(function(r){r.material=ch>.5?M.d:M.w});
      knots.forEach(function(kn){if(!kn.userData.gone)kn.userData.gl.material.opacity=heat>.45?.6+.3*Math.sin(t*8):.15});
      if(Math.random()<dt*hot*3){spark(2,1.4);D.tone(900+Math.random()*600,.03,0,.02)}
      knotTag.visible=prog>.25&&knotsLeft>0&&heat>.45;
      if(prog>=1&&knotsLeft===0){knotTag.visible=false;finishStage(1);enter(2)}
    }else if(stage===2){ /* it cracks and smokes: it looks worse than ever; keep going */
      if(working)prog+=dt*.11;
      cracks.forEach(function(c,n){var o=Math.max(0,Math.min(1,prog*1.6-n*.12));c.scale.z=.01+o;c.userData.glow=o});
      crackM.color.setRGB(.2+.8*Math.min(1,prog),.1+.6*Math.min(1,prog),0);
      if(Math.random()<dt*(2+(1-hot)*3))puff(true,1);
      D.sc.fog.density=.05+.05*Math.sin(Math.min(1,prog)*PI)*(1.3-hot*.6);
      if(Math.random()<dt*2){D.tone(140+Math.random()*80,.06,0,.025)}
      log.scale.y=1+Math.sin(t*30)*.002*hot;
      if(prog>=1){finishStage(2);enter(3);D.tone(196,.6)}
    }else if(stage===3){ /* it becomes fire */
      if(working||fin)prog=Math.min(1,prog+dt*.2);
      D.sc.fog.density+=(.035-D.sc.fog.density)*Math.min(1,dt*1.5);
      var g2=Math.min(1,prog);logM.color.setRGB(.12+.88*g2,.08+.82*g2,.06+.7*g2);logM.emissive.setRGB(g2*.9,g2*.75,g2*.45);
      ends.forEach(function(e){e.material.emissive.setRGB(g2,g2*.8,g2*.5)});crackM.color.setRGB(1,1,.9);
      label.visible=prog>=1&&!fin;
      if(fin){fin+=dt;
        log.scale.set(1+fin*.15,1+fin*.15,1+fin*.15);logM.opacity=1;fire.scale.setScalar(1+fin*1.2);spark(3,2);
        fl.intensity=3+fin*2;core.scale.setScalar(8+fin*6);core.material.opacity=Math.min(1,.6+fin*.3);
        if(fin>2.6&&!finished){finished=true;finishStage(3);D.light(1);MECH.sdn25fp.active=false;unKey();D.done()}}
    }
    /* the bellows label follows the bellows; it nags when the fire sinks */
    var bp=D.wpos(bel);belTag.position.set(bp.x,bp.y+1,bp.z);belTag.visible=!finished&&(heat<.6||stage===0&&prog<.15);
  });

  /* ── camera: seated on the floor before the hearth; A and D lean you left and right, the pointer looks around ── */
  var th=0,thv=0,lx=0,ly=0,touch=!!(window.matchMedia&&window.matchMedia('(pointer:coarse)').matches);
  D.camFn=function(cam,dt){
    var port=cam.aspect<.85,ptr=D.ptr||{x:0,y:0},t=D.time,kk=Math.min(1,dt*5);
    thv+=(((keys.right?1:0)-(keys.left?1:0))*.9-thv)*Math.min(1,dt*7);th=Math.max(-.6,Math.min(.6,th+thv*dt));
    var R=port?6.4:5.2,ex=Math.sin(th)*R,ez=-5.2+Math.cos(th)*R+1.4;
    cam.fov=port?66:58;cam.updateProjectionMatrix();
    var shake=reduce?0:(stage===2?.02:0)+(fin?Math.min(.06,fin*.03):0);
    cam.position.set(ex+(Math.random()-.5)*shake,1.9+Math.sin(t*1.1)*.03+(Math.random()-.5)*shake,ez);
    lx+=((touch?0:ptr.x*1.4)-lx)*kk;ly+=((touch?0:ptr.y*.9)-ly)*kk;
    cam.lookAt(lx,1.5+ly+(fin?Math.min(2.5,fin*.9):0),-5.2);
  };
  D.fpCleanup=function(){
    MECH.sdn25fp.active=false;unKey();
    D.sc.fog=null;D.sc.background=D.sky;D.floor.visible=true;D.camFn=null;D.cam.fov=45;D.gesture=null;
  };
};
})();
