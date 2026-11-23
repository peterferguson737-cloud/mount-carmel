/* Book One, chapter 2 — why the road is called night — as The Three Nights of Tobias.
   John reads the angel's counsel to Tobias as the whole journey in three nights, the three things philosophers find in any
   change: the point it starts FROM, the MEAN it travels by, and the end it goes TO.
   First night, from which: at sunset Tobias burns the fish's heart on the coals, and the smoke drives the demon away. The heart
   is tied to everything he loves, and will not burn clean until each thing has gone into the fire; as each goes, the sunset
   that lit the world goes with it.
   Second night, the mean: midnight in the marshes. You cannot see the road. Hold Raphael's hand and you walk it; let go, and
   you stand alone among pretty lights that lead nowhere. On the way the fathers of faith fall in beside you.
   Third night, to which: the hour before dawn under the mountain. Lift your eyes to the dark sun: the longer you look, the
   brighter its fire and the darker your sight, until, by blinding, it illumines. Morning: Tobias and Sarah. */
(function(){
'use strict';
var X=window.ASCENT;if(!X||!X.MECH)return;
var MECH=X.MECH;

MECH.nightfp=function(D,sp){
  var T=D.T,q=D.q,M=q.M,st=D.stage,PI=Math.PI,TAU=PI*2,i,k;
  D.setUsed=true;D.floor.visible=false;
  D.sc.fog=new T.FogExp2(0x6a3a22,.01);D.sc.background=new T.Color(0x7a4428);
  var items=sp.items||[];function say(n){var it=items[n];if(it)D.say(it[0],it[1])}
  var touch=!!(window.matchMedia&&window.matchMedia('(pointer:coarse)').matches);
  function rand(a,b){return a+Math.random()*(b-a)}

  /* ── one button, held or tapped: Space, a mouse button, a finger ── */
  var live=true,keyDown=false,ptrDown=false,lastPtr=-9,tapHold=0;
  /* the lanterns' standard: Space (or press and hold) is the one thing you hold */
  function kd(e){if(!live||e.repeat||e.code!=='Space')return;wake();e.preventDefault();e.stopPropagation();keyDown=true}
  function ku(e){if(!live||e.code!=='Space')return;e.preventDefault();e.stopPropagation();keyDown=false}
  function pd(){if(!live)return;wake();ptrDown=true;lastPtr=D.time}
  function pu(){ptrDown=false}
  try{window.addEventListener('keydown',kd,true);window.addEventListener('keyup',ku,true);window.addEventListener('pointerdown',pd,true);window.addEventListener('pointerup',pu,true);window.addEventListener('pointercancel',pu,true)}catch(_){}
  function holding(){return keyDown||ptrDown||D.time<tapHold}
  function tapHolds(){if(D.time-lastPtr<.5)return;tapHold=D.time+1.6}   /* for anything that taps without pointer events */

  /* ── sound ── */
  var actx=null,nb=null;
  function soundOn(){try{var b=document.querySelector('.snd');return !b||!b.getAttribute||b.getAttribute('aria-pressed')!=='false'}catch(_){return true}}
  function wake(){if(!soundOn())return;try{actx=actx||new (window.AudioContext||window.webkitAudioContext)();if(actx.state==='suspended')actx.resume()}catch(_){}}
  function ac(){wake();return soundOn()?actx:null}
  function note(f,when,dur,type,vol,drop){var a=ac();if(!a){D.tone(f,dur,when||0);return}try{var t=a.currentTime+(when||0),o=a.createOscillator(),g=a.createGain();o.type=type||'sine';o.frequency.setValueAtTime(f,t);if(drop)o.frequency.exponentialRampToValueAtTime(f*drop,t+dur);
    g.gain.setValueAtTime(.0001,t);g.gain.linearRampToValueAtTime(vol||.05,t+.02);g.gain.exponentialRampToValueAtTime(.0001,t+dur);o.connect(g);g.connect(a.destination);o.start(t);o.stop(t+dur+.05)}catch(_){}}
  function hiss(dur,freq,vol,type){var a=ac();if(!a)return;try{if(!nb){nb=a.createBuffer(1,a.sampleRate,a.sampleRate);var d=nb.getChannelData(0);for(var j=0;j<d.length;j++)d[j]=Math.random()*2-1}
    var t=a.currentTime,s=a.createBufferSource(),f=a.createBiquadFilter(),g=a.createGain();s.buffer=nb;f.type=type||'bandpass';f.frequency.value=freq;g.gain.setValueAtTime(vol,t);g.gain.exponentialRampToValueAtTime(.0001,t+dur);
    s.connect(f);f.connect(g);g.connect(a.destination);s.start(t);s.stop(t+dur+.05)}catch(_){}}

  /* ── soft textures: a dark smoke puff (for smoke and the demon) and a soft wisp of cloud ── */
  function softTex(dark){var c=document.createElement('canvas');c.width=c.height=64;var g=c.getContext('2d'),gr=g.createRadialGradient(32,32,0,32,32,32);
    gr.addColorStop(0,dark?'rgba(0,0,0,.85)':'rgba(255,255,255,.9)');gr.addColorStop(1,'rgba(0,0,0,0)');g.fillStyle=gr;g.fillRect(0,0,64,64);return new T.CanvasTexture(c)}
  var DARK=softTex(true),SOFT=softTex(false);
  function puffSprite(dark,col){var m=new T.SpriteMaterial({map:dark?DARK:SOFT,color:col==null?(dark?0x000000:0xffffff):col,transparent:true,depthWrite:false,opacity:0});return new T.Sprite(m)}

  /* ── the people: Tobias, Raphael, Sarah, the fathers of faith ── */
  function person(o){var g=q.G(),b=q.G();g.add(b);var cm=new T.MeshStandardMaterial({color:o.robe,roughness:1});
    var body=new T.Mesh(new T.ConeGeometry(o.w||.5,o.h||1.5,18),cm);body.position.y=(o.h||1.5)/2;b.add(body);
    var head=new T.Mesh(new T.SphereGeometry(.22,16,12),M.k);head.position.y=(o.h||1.5)+.18;b.add(head);
    if(o.hair){var h=new T.Mesh(new T.SphereGeometry(.235,14,10,0,TAU,0,PI*.55),new T.MeshStandardMaterial({color:o.hair,roughness:1}));h.position.copy(head.position);h.position.y+=.02;h.rotation.x=-.3;b.add(h)}
    if(o.veil){var v=new T.Mesh(new T.ConeGeometry(.36,1.3,16,1,true),new T.MeshStandardMaterial({color:o.veil,roughness:1,side:T.DoubleSide}));v.position.set(0,(o.h||1.5)-.35,-.06);b.add(v);var vh=new T.Mesh(new T.SphereGeometry(.25,14,10,0,TAU,0,PI*.6),v.material);vh.position.copy(head.position);vh.position.z-=.03;b.add(vh)}
    if(o.beard){var bd=new T.Mesh(new T.ConeGeometry(.15,.4,10),new T.MeshStandardMaterial({color:0xe8e0d0,roughness:1}));bd.position.set(0,(o.h||1.5)+.02,.15);bd.rotation.x=PI;b.add(bd)}
    if(o.staff)q.c(b,.035,.035,(o.h||1.5)+.9,.42,((o.h||1.5)+.9)/2,.1,'w');
    var arm=q.G();arm.position.set(.32,(o.h||1.5)*.72,.05);b.add(arm);q.c(arm,.07,.07,.6,0,-.28,0,'k');
    st.add(g);return {g:g,b:b,arm:arm,pos:g.position}}
  function raphael(){var g=q.G();st.add(g);var robe=new T.MeshStandardMaterial({color:0xf3ece0,roughness:.9});
    var b=new T.Mesh(new T.ConeGeometry(.6,2.1,20),robe);b.position.y=1.05;g.add(b);q.s(g,.26,0,2.28,0,'k');
    var wm=new T.MeshStandardMaterial({color:0xe8dfcf,roughness:.8,side:T.DoubleSide});[-1,1].forEach(function(sd){var w=new T.Mesh(new T.SphereGeometry(.6,12,10),wm);w.scale.set(.22,1.35,.7);w.position.set(sd*.4,1.7,-.32);w.rotation.z=-sd*.35;g.add(w)});
    q.c(g,.035,.035,2.6,.52,1.3,.15,'w');var arm=q.G();arm.position.set(-.34,1.5,.1);g.add(arm);q.c(arm,.07,.07,.6,0,-.28,0,'k');
    return {g:g,pos:g.position,arm:arm}}
  var tob=person({robe:0xa8865f,hair:0x3a2618,staff:true}),raf=raphael();
  tob.g.visible=false;raf.g.visible=false;

  var room=null,hits=[],night=0,stageT=0,next=0,title=null;
  function clearRoom(){hits.forEach(function(h){D.off(h)});hits=[];if(room){st.remove(room);room=null}}
  function addHit(par,x,y,z,r,fn){var h=D.hit(par,x,y,z,r,fn);hits.push(h);return h}
  function showTitle(a,b){if(title)st.remove(title);title=D.tag(a);title.position.set(0,0,0);st.add(title);title.userData.t=0;title.userData.sub=b}
  var bg=new T.Color(),bgT=new T.Color(0x7a4428),fogT=.01;
  var smoke=[];for(i=0;i<40;i++){var s=puffSprite(false,0x6a6a6a);st.add(s);smoke.push({s:s,t:9,life:3,v:new T.Vector3(),sz:1})}
  function puffSmoke(p,n,vy,dark){for(var j=0,c=0;j<smoke.length&&c<n;j++){var u=smoke[j];if(u.t<u.life)continue;u.t=0;u.life=rand(2.4,3.6);u.sz=rand(.6,1.2);u.s.material.color.set(dark?0x1a1a1a:0x6a6a6a);
    u.s.position.set(p.x+rand(-.2,.2),p.y,p.z+rand(-.2,.2));u.v.set(rand(-.3,.3),vy||1.6,rand(-.3,.3));c++}}

  /* ════ FIRST NIGHT · FROM WHICH: sunset, the brazier, the fish's heart, the demon ════ */
  var things=[],demon=null,dem=0,heart=null,brazier=null,fireL=null,flames=[],streaks=[],sun=null,burnt=0,freed=0;
  var THINGS=[['a gold cup',function(g){q.c(g,.2,.1,.35,0,.25,0,'g');q.c(g,.04,.04,.2,0,.05,0,'g');q.c(g,.14,.14,.03,0,-.05,0,'g')}],
    ['a crown',function(g){q.t(g,.24,.05,0,.1,0,'g',PI/2);for(var j=0;j<6;j++){var a=j/6*TAU;q.k(g,.05,.16,Math.cos(a)*.24,.22,Math.sin(a)*.24,'g')}}],
    ['a purse of coins',function(g){q.s(g,.24,0,.2,0,'c',.9);for(var j=0;j<4;j++)q.c(g,.09,.09,.02,rand(-.3,.3),.02,rand(-.3,.3),'g')}],
    ['a silver mirror',function(g){q.c(g,.24,.24,.04,0,.4,0,'a',0,PI/2);q.c(g,.04,.04,.4,0,.05,0,'g')}],
    ['a lyre',function(g){q.t(g,.22,.04,0,.36,0,'w',0,0,PI);q.b(g,.36,.04,.06,0,.14,0,'w');for(var j=0;j<4;j++)q.c(g,.008,.008,.3,-.12+j*.08,.3,0,'p')}],
    ['a honey cake',function(g){q.c(g,.26,.3,.16,0,.08,0,'c');q.c(g,.2,.24,.12,0,.22,0,'c');q.s(g,.06,0,.32,0,'g')}]];
  function buildFirst(){
    clearRoom();room=q.G();st.add(room);night=1;stageT=0;burnt=0;freed=0;dem=0;things=[];flames=[];streaks=[];
    /* a hilltop above a lake, trees in silhouette against a red sky */
    var hill=new T.Mesh(new T.CircleGeometry(16,40),M.c);hill.rotation.x=-PI/2;hill.position.set(0,0,2);room.add(hill);
    var lake=new T.Mesh(new T.PlaneGeometry(120,60),new T.MeshStandardMaterial({color:0x6a5040,roughness:.2,metalness:.5}));lake.rotation.x=-PI/2;lake.position.set(0,-3,-30);room.add(lake);room.userData.lake=lake;
    for(i=0;i<9;i++){var x=rand(-30,30),z=rand(-48,-34);q.b(room,rand(14,26),rand(3,7),4,x,-1.5,z,'d')}
    [[-9,-2],[-10.5,1],[-7.5,-5],[9,-3],[10.5,0],[8,3]].forEach(function(p){q.c(room,.15,.2,2.4,p[0],1.2,p[1],'d');q.k(room,1.1,4.2,p[0],4,p[1],'d');q.k(room,.8,3,p[0],5.6,p[1],'d')});
    sun=D.glow(20);sun.position.set(-4,2,-52);sun.material.opacity=.9;room.add(sun);
    for(i=0;i<26;i++){var sk=puffSprite(false,0xffffff);sk.position.set(rand(-40,40),rand(6,26),rand(-50,-30));sk.scale.set(rand(14,30),rand(1.2,2.6),1);sk.material.opacity=rand(.25,.55);room.add(sk);streaks.push({s:sk,o:sk.material.opacity})}
    var sunL=new T.DirectionalLight(0xffffff,.8);sunL.position.set(-4,4,-20);room.add(sunL);room.userData.sunL=sunL;
    /* the brazier, the coals, the fish's heart and liver on them */
    brazier=q.G();brazier.position.set(1.2,0,1);room.add(brazier);q.c(brazier,.7,.45,.4,0,.85,0,'d');for(i=0;i<3;i++){var a=i/3*TAU;q.c(brazier,.05,.05,.8,Math.cos(a)*.45,.4,Math.sin(a)*.45,'d',Math.cos(a)*.15,Math.sin(a)*.15)}
    for(i=0;i<9;i++)q.s(brazier,.12,rand(-.4,.4),1.05,rand(-.4,.4),'d',.6);
    heart=q.G();heart.position.set(0,1.18,0);brazier.add(heart);q.s(heart,.16,-.08,0,0,'c',.8);q.s(heart,.16,.08,0,0,'c',.8);q.k(heart,.2,.28,0,-.12,0,'c',PI);q.s(heart,.13,.3,-.02,.1,'c',.5,1.3);
    var hg=D.glow(1.2);hg.material.opacity=.3;heart.add(hg);heart.userData.g=hg;
    fireL=new T.PointLight(0xffffff,.6,9,1.6);fireL.position.set(0,1.8,0);brazier.add(fireL);
    for(i=0;i<5;i++){var fl=q.fl(brazier,rand(-.25,.25),1.1,rand(-.25,.25),.3);flames.push(fl)}
    /* Tobias kneels at the brazier */
    tob.g.visible=true;tob.pos.set(2.3,0,1.6);tob.g.rotation.y=-PI/2-.3;tob.b.scale.y=.7;tob.b.rotation.x=.25;tob.arm.rotation.x=-1;
    raf.g.visible=false;
    /* the demon in the smoke above */
    demon=q.G();demon.position.set(-3,6,-2);room.add(demon);demon.userData.p=[];
    for(i=0;i<18;i++){var dp=puffSprite(true,0x000000);var f=i/18;dp.position.set(Math.sin(f*7)*.6,f*3-1.5,Math.cos(f*5)*.3);dp.scale.setScalar(.9+Math.sin(f*PI)*1.2);dp.material.opacity=.75;demon.add(dp);demon.userData.p.push({s:dp,f:f})}
    var wm=new T.MeshBasicMaterial({color:0x0c0907,side:T.DoubleSide,transparent:true,opacity:.85});demon.userData.wm=wm;
    [-1,1].forEach(function(sd){var sh=new T.Shape();sh.moveTo(0,0);sh.quadraticCurveTo(sd*1.4,1.6,sd*3,1.2);sh.lineTo(sd*2.2,.6);sh.lineTo(sd*2.6,.1);sh.lineTo(sd*1.6,-.1);sh.lineTo(sd*1.8,-.6);sh.quadraticCurveTo(sd*.8,-.3,0,0);
      var w=new T.Mesh(new T.ShapeGeometry(sh),wm);w.position.set(0,.8,0);demon.add(w);demon.userData['w'+sd]=w});
    /* the things the heart is tied to, each with a golden thread to it */
    THINGS.forEach(function(th,j){var a=PI*(.15+.7*j/(THINGS.length-1)),g=q.G();g.position.set(1.2-Math.cos(a)*3.4,0,1+Math.sin(a)*2.6);room.add(g);th[1](g);
      var gl=D.glow(1.6);gl.position.y=.5;gl.material.opacity=.45;g.add(gl);
      var thr=new T.Mesh(new T.CylinderGeometry(.012,.012,1,4),new T.MeshBasicMaterial({color:0xffffff,transparent:true,opacity:.6}));room.add(thr);
      var it={g:g,gl:gl,thr:thr,name:th[0],state:'tied',t:0,from:null};things.push(it);
      addHit(g,0,.35,0,.6,function(){give(it)})});
    showTitle('First night · from which');
    D.hint(touch?'Sunset. Tobias burns the fish’s heart, and the smoke will drive the demon off. But the heart is tied to everything he loves. Tap each thing to give it to the fire.':'Sunset. Tobias burns the fish’s heart, and the smoke will drive the demon off. But the heart is tied to everything he loves. Click each thing (or press 1–6) to give it to the fire.');
    bgT.set(0x7a4428);fogT=.01;D.light(.7);
  }
  function give(it){if(night!==1||it.state!=='tied')return;it.state='fly';it.t=0;it.from=it.g.position.clone();note(330,0,.15,'triangle',.04);note(220,.08,.25,'triangle',.03)}
  function setCord(m,a,b){var d=b.clone().sub(a),l=d.length();m.position.copy(a).addScaledVector(d,.5);m.scale.set(1,Math.max(.01,l),1);m.quaternion.setFromUnitVectors(new T.Vector3(0,1,0),d.normalize())}
  function firstUpdate(dt,t){
    var hp=new T.Vector3();heart.getWorldPosition(hp);
    things.forEach(function(it){
      if(it.state==='tied'){it.g.position.y=Math.abs(Math.sin(t*1.4+it.g.position.x))*.06;it.gl.material.opacity=.4+.12*Math.sin(t*3+it.g.position.z);setCord(it.thr,it.g.position.clone().setY(.45),hp);it.thr.visible=true}
      else if(it.state==='fly'){it.t+=dt;var f=Math.min(1,it.t/.8),to=brazier.position.clone().setY(1.3);it.g.position.lerpVectors(it.from,to,f);it.g.position.y+=Math.sin(f*PI)*1.6;it.g.rotation.y+=dt*6;it.thr.visible=false;
        if(f>=1){it.state='gone';it.g.visible=false;burnt++;D.burst(to,0xffffff,true);hiss(.8,900,.12);note(160,0,.6,'sawtooth',.02,.5);puffSmoke(to,6,1.8,false);
          flames.forEach(function(fl){fl.scale.setScalar(.45)});dem=Math.min(1,dem+.16);
          if(burnt===THINGS.length){freed=.001;D.tween(.6,function(){},function(){note(523,0,.4);note(784,.15,.6)})}}}});
    /* the sunset goes out with each thing given up */
    var lit=1-burnt/THINGS.length;streaks.forEach(function(s,j){s.s.material.opacity+=(s.o*(.25+.75*lit)-s.s.material.opacity)*Math.min(1,dt*1.5)});
    sun.material.opacity+=((.25+.65*lit)-sun.material.opacity)*Math.min(1,dt*1.5);sun.position.y+=((-1+3*lit)-sun.position.y)*Math.min(1,dt*.8);
    room.userData.sunL.intensity=.15+.65*lit;bgT.setRGB(.24+.24*lit,.13+.14*lit,.1+.06*lit);
    /* fire and smoke */
    flames.forEach(function(fl,j){var s2=fl.scale.x;fl.scale.setScalar(s2+((.3+(freed?.45:0))-s2)*Math.min(1,dt*2))});fireL.intensity=.6+(freed?1.2:0)+Math.sin(t*17)*.08;
    if(Math.random()<dt*(2+burnt*1.5))puffSmoke(brazier.position.clone().setY(1.5),1,1.4,false);
    heart.userData.g.material.opacity=freed?.9:.25+.08*Math.sin(t*5);
    /* the demon writhes, and is pushed back by the smoke; when the heart burns clean he flees */
    var dp=demon.userData;dp.p.forEach(function(p){p.s.position.x=Math.sin(p.f*7+t*1.6)*.6*(1+p.f);p.s.material.opacity=.75*(1-dem*.6)*(freed?Math.max(0,1-freed):1)});
    dp['w-1'].rotation.z=Math.sin(t*3)*.25;dp.w1.rotation.z=-Math.sin(t*3)*.25;dp.wm.opacity=.85*(1-dem*.5)*(freed?Math.max(0,1-freed):1);
    demon.position.x+=((-3-dem*5)-demon.position.x)*Math.min(1,dt*1.2);demon.position.y+=((6+dem*3)-demon.position.y)*Math.min(1,dt*1.2);
    if(freed>0){freed+=dt*.6;demon.position.x-=dt*14*freed;demon.position.y+=dt*4;if(freed<.05)note(700,0,1.2,'sawtooth',.03,.25);puffSmoke(brazier.position.clone().setY(1.6),1,2.4,true)}
    if(freed>1.4&&next<=0){next=2.2;say(0)}
    if(next>0){next-=dt;if(next<=0){next=0;buildSecond()}}
  }

  /* ════ SECOND NIGHT · THE MEAN: midnight in the marshes, your hand in Raphael's ════ */
  var path=[],prog=0,fathers=[],wisps=[],moon=null,reeds=null;
  function buildSecond(){
    clearRoom();room=q.G();st.add(room);night=2;stageT=0;prog=0;fathers=[];wisps=[];
    var g0=new T.Mesh(new T.PlaneGeometry(80,140),new T.MeshStandardMaterial({color:0x2a2620,roughness:1}));g0.rotation.x=-PI/2;g0.position.set(0,0,-50);room.add(g0);
    for(i=0;i<22;i++){var pool=new T.Mesh(new T.CircleGeometry(rand(1.5,4),20),new T.MeshStandardMaterial({color:0x101418,roughness:.15,metalness:.6}));pool.rotation.x=-PI/2;pool.position.set(rand(-18,18),.02,rand(-110,8));room.add(pool)}
    for(i=0;i<160;i++){var rx=rand(-20,20),rz=rand(-115,10);q.c(room,.02,.03,rand(.8,1.8),rx,.6,rz,'d',rand(-.2,.2))}
    for(i=0;i<30;i++){var tx=rand(14,30)*(Math.random()<.5?-1:1),tz=rand(-115,5);q.s(room,rand(2,4),tx,rand(2,3.5),tz,'d',.8)}
    moon=D.glow(3.2);moon.position.set(8,26,-80);moon.material.opacity=.8;room.add(moon);var ml=new T.DirectionalLight(0xffffff,.22);ml.position.set(6,20,-20);room.add(ml);
    /* the road you cannot see: a winding line of points, unmarked */
    path=[];for(i=0;i<=24;i++){var z=6-i*2.6;path.push(new T.Vector3(Math.sin(i*.35)*4+Math.sin(i*.13)*3,0,z))}
    /* the fathers of faith along the way, waiting to fall in with you */
    [['Abraham',6],['Isaac',12],['Jacob',18]].forEach(function(f,j){var p=path[f[1]].clone(),side=j%2?1:-1;var per=person({robe:[0x5a4a3c,0x6a5844,0x4a3c30][j],beard:true,staff:true,h:1.55});
      per.pos.set(p.x+side*2.2,0,p.z);per.g.rotation.y=PI;room.add(per.g);var nm=D.tag(f[0]);nm.position.set(0,2.6,0);nm.material.opacity=0;per.g.add(nm);fathers.push({p:per,at:f[1],joined:false,tag:nm,j:j})});
    /* will-o'-the-wisps: lovely, and leading nowhere */
    for(i=0;i<8;i++){var w=D.glow(1.1);w.material.opacity=0;room.add(w);wisps.push({s:w,ph:rand(0,TAU),r:rand(3,7)})}
    tob.g.visible=true;tob.b.scale.y=1;tob.b.rotation.x=0;tob.arm.rotation.x=0;tob.g.rotation.y=PI;tob.pos.copy(path[0]);
    raf.g.visible=true;raf.g.rotation.y=PI;raf.pos.copy(path[0]).add(new T.Vector3(.9,0,-.9));
    addHit(raf.g,0,1.3,0,1.2,function(){tapHolds()});
    showTitle('Second night · the mean');
    D.hint(touch?'Midnight. You cannot see the road. Hold your finger down to hold Raphael’s hand, and walk.':'Midnight. You cannot see the road. Hold Space (or press and hold) to hold Raphael’s hand, and walk.');
    bgT.set(0x0b0c10);fogT=.045;D.light(.12);
  }
  function along(s){var n=path.length-1,f=Math.max(0,Math.min(n-.001,s)),j=Math.floor(f),u=f-j;return path[j].clone().lerp(path[j+1],u)}
  function secondUpdate(dt,t){
    var h=holding(),speed=h?3:0;prog=Math.min(path.length-1,prog+speed*dt/2.6);
    var p=along(prog),ahead=along(prog+.45),dir=ahead.clone().sub(p).setY(0);
    tob.pos.copy(p);if(dir.lengthSq()>1e-4)tob.g.rotation.y=Math.atan2(dir.x,dir.z);
    var rp=along(prog+.38).add(new T.Vector3(.7,0,0));raf.pos.lerp(rp,Math.min(1,dt*4));raf.g.rotation.y=h?tob.g.rotation.y:tob.g.rotation.y+PI*.85;
    tob.arm.rotation.z=h?.9:.1;raf.arm.rotation.z=h?-.9:-.6;raf.arm.rotation.x=h?0:-.9;
    tob.b.position.y=h?Math.abs(Math.sin(t*7))*.06:0;
    if(h&&Math.random()<dt*2.2)note(rand(90,120),0,.08,'sine',.03);
    if(Math.random()<dt*1.5)note(rand(2400,3600),0,.04,'sine',.006);
    /* alone in the dark, the wisps come */
    wisps.forEach(function(w,j){var a=w.ph+t*.4;w.s.position.set(p.x+Math.cos(a+j)*w.r,.8+Math.sin(t*1.3+j)*.4,p.z+Math.sin(a+j)*w.r-1);var o=w.s.material.opacity;w.s.material.opacity=o+(((h?0:.7)*(.6+.4*Math.sin(t*3+j)))-o)*Math.min(1,dt*2)});
    /* the fathers fall in behind */
    fathers.forEach(function(f){if(!f.joined&&prog>f.at-1.2){f.joined=true;note(392,0,.5,'sine',.04);note(587,.2,.6,'sine',.03);f.tag.material.opacity=1;D.tween(3,function(e){f.tag.material.opacity=e<.6?1:(1-e)/.4})}
      if(f.joined){var fp=along(prog-1.1-f.j*.8).add(new T.Vector3((f.j-1)*.8,0,0));f.p.pos.lerp(fp,Math.min(1,dt*(h?3:1.5)));f.p.g.rotation.y=tob.g.rotation.y;f.p.b.position.y=h?Math.abs(Math.sin(t*6+f.j))*.05:0}});
    if(prog>=path.length-1.2&&next<=0){next=2.4;say(1)}
    if(next>0){next-=dt;if(next<=0){next=0;buildThird()}}
  }

  /* ════ THIRD NIGHT · TO WHICH: before dawn under the mountain; the dark sun ════ */
  var hzS=null,dsun=null,corona=null,gaze=0,look=0,dawn=0,star=null,tableau=null;
  function buildThird(){
    clearRoom();room=q.G();st.add(room);night=3;stageT=0;gaze=0;look=0;dawn=0;
    var g0=new T.Mesh(new T.PlaneGeometry(80,80),new T.MeshStandardMaterial({color:0x14121a,roughness:1}));g0.rotation.x=-PI/2;room.add(g0);
    /* the mountain against the last of the night */
    var mm=new T.MeshBasicMaterial({color:0x050508});[[0,-40,22,26],[-26,-46,16,18],[28,-48,18,16],[-12,-36,10,12]].forEach(function(m){var c=new T.Mesh(new T.ConeGeometry(m[2],m[3],5),mm);c.position.set(m[0],m[3]/2-1,m[1]);c.rotation.y=rand(0,1);room.add(c)});
    star=D.glow(1.2);star.position.set(14,30,-60);star.material.opacity=.95;room.add(star);
    var hz=puffSprite(false,0xffffff);hz.position.set(0,4,-70);hz.scale.set(140,18,1);hz.material.opacity=.12;room.add(hz);hzS=hz;
    /* the dark sun: a black disc ringed with fire, rising over the summit */
    dsun=q.G();dsun.position.set(0,30,-58);room.add(dsun);
    corona=D.glow(16);corona.material.opacity=.4;dsun.add(corona);var c2=D.glow(9);c2.material.opacity=.6;dsun.add(c2);dsun.userData.c2=c2;
    var disc=new T.Mesh(new T.CircleGeometry(3.4,48),new T.MeshBasicMaterial({color:0x000000}));disc.position.z=.5;dsun.add(disc);
    var rays=[];for(i=0;i<14;i++){var r=puffSprite(false,0xffffff);var a=i/14*TAU;r.position.set(Math.cos(a)*5,Math.sin(a)*5,.2);r.scale.set(.7,7,1);r.material.rotation=a-PI/2;r.material.opacity=.15;dsun.add(r);rays.push(r)}dsun.userData.rays=rays;
    addHit(dsun,0,0,0,5,function(){tapHolds()});addHit(room,0,1,4,1.6,function(){tapHolds()});
    /* the company stands at the foot of the mountain, facing it */
    tob.g.visible=true;tob.pos.set(0,0,4);tob.g.rotation.y=PI;tob.b.scale.y=1;tob.b.rotation.x=0;raf.g.visible=true;raf.pos.set(1.4,0,3.4);raf.g.rotation.y=PI;
    fathers.forEach(function(f,j){room.add(f.p.g);f.p.pos.set(-1.6-j*.9,0,4.6+j*.3);f.p.g.rotation.y=PI});
    showTitle('Third night · to which');
    D.hint(touch?'The hour before dawn. Hold your finger down to lift your eyes to it.':'The hour before dawn. Hold Space (or press and hold) to lift your eyes to it.');
    bgT.set(0x0e0d16);fogT=.008;D.light(.08);
  }
  var whiteout=null;
  function thirdUpdate(dt,t){
    var h=holding()&&dawn===0;look+=((h?1:0)-look)*Math.min(1,dt*2.2);
    if(h)gaze=Math.min(1,gaze+dt/6);else if(dawn===0)gaze=Math.max(0,gaze-dt/10);
    dsun.position.y=24+gaze*6;
    /* the brighter the fire round it, the darker everything you can see: by blinding, it illumines */
    corona.material.opacity=.35+gaze*.65;corona.scale.setScalar(16+gaze*30);dsun.userData.c2.material.opacity=.5+gaze*.5;dsun.userData.c2.scale.setScalar(9+gaze*10);
    dsun.userData.rays.forEach(function(r,j){r.material.opacity=.12+gaze*.5*(.6+.4*Math.sin(t*2+j));r.scale.y=7+gaze*16+Math.sin(t*3+j)});
    star.material.opacity=.95*(1-gaze);if(hzS)hzS.material.opacity=.12*(1-gaze);
    var lum=(1-gaze*.92);bgT.setRGB(.055*lum,.05*lum,.085*lum);D.light(.08*lum);
    if(h&&Math.random()<dt*3)note(rand(110,130)*(1+gaze),0,.9,'sine',.02+gaze*.03);
    if(gaze>=1&&dawn===0){dawn=.001;note(294,0,2.4,'sine',.06);note(440,0,2.4,'sine',.05);note(587,.1,2.4,'sine',.05);note(740,.2,2.6,'sine',.04)}
    if(dawn>0){dawn+=dt;var e=Math.min(1,dawn/2);bgT.setRGB(.06+e*.7,.05+e*.62,.08+e*.5);D.light(.08+e*.9);corona.material.opacity=1;
      if(dawn>2.4&&!tableau){buildMorning()}}
    if(tableau){tableau.t+=dt;if(tableau.t>1&&tableau.t-dt<=1)for(k=0;k<6;k++)note(rand(2000,3200),k*.18,.08,'sine',.01);
      if(tableau.t>3.2&&next<=0&&!D.finished){next=99;say(2);D.tween(4,function(){},function(){live=false;D.done()})}}
  }
  /* morning: Tobias and Sarah, as the engraving has them, found alive after the night; the angel above */
  function buildMorning(){
    clearRoom();room=q.G();st.add(room);tableau={t:0};
    q.b(room,14,.3,10,0,-.15,0,'w');q.b(room,14,8,.4,0,4,-4,'p');q.b(room,.4,8,10,-7,4,1,'p');
    var win=q.b(room,2.4,3,.1,4,4.4,-3.75,'l');var shaft=D.glow(8);shaft.position.set(4,4.4,-3);shaft.material.opacity=.6;room.add(shaft);
    var dl=new T.DirectionalLight(0xffffff,.9);dl.position.set(5,6,4);room.add(dl);
    /* the bed with its curtains drawn back */
    q.b(room,4.2,.8,2.6,-1.5,.4,-1.8,'w');q.b(room,4,.3,2.4,-1.5,.95,-1.8,'p');q.b(room,4.4,3.6,.2,-1.5,1.8,-3.1,'w');
    q.b(room,.12,5,.12,-3.6,2.5,-.6,'w');q.b(room,.12,5,.12,.6,2.5,-.6,'w');q.b(room,4.4,.15,.2,-1.5,5,-.6,'w');
    var cur=q.b(room,1.2,4.4,.08,-3.2,2.7,-.55,'c');cur.rotation.y=.4;var cur2=q.b(room,1.2,4.4,.08,.2,2.7,-.55,'c');cur2.rotation.y=-.4;
    /* Tobias and Sarah, hand in hand, and Raphael with his arms spread over them */
    tob.g.visible=true;tob.pos.set(-.4,0,1.2);tob.g.rotation.y=-.2;tob.b.scale.y=1;tob.arm.rotation.z=.6;room.add(tob.g);
    var sarah=person({robe:0xf0e6d4,veil:0xe8dccb,h:1.4});sarah.pos.set(.5,0,1.1);sarah.g.rotation.y=.2;sarah.arm.rotation.z=-.6;room.add(sarah.g);
    raf.g.visible=true;raf.pos.set(.1,2.8,-.4);raf.g.rotation.y=0;raf.arm.rotation.z=1.2;room.add(raf.g);var halo=D.glow(3);halo.position.set(.1,5.4,-.4);halo.material.opacity=.6;room.add(halo);
    fathers.forEach(function(f){f.p.g.visible=false});
    bgT.set(0xe8dcc8);fogT=.0;D.light(1);
    D.hint('Morning. Tobias and Sarah are found alive: the union the three nights were for.');
  }

  /* ════ the loop and the cameras ════ */
  D._gf=function(){return {night:night,burnt:burnt,prog:+prog.toFixed(1),gaze:+gaze.toFixed(2),dawn:+dawn.toFixed(1),tableau:!!tableau}};
  buildFirst();
  D.onUpdate(function(t,dt){
    dt=Math.min(dt,.05);stageT+=dt;
    D.sc.background.lerp(bgT,Math.min(1,dt*2));if(D.sc.fog){D.sc.fog.color.copy(D.sc.background);D.sc.fog.density+=(fogT-D.sc.fog.density)*Math.min(1,dt*2)}
    smoke.forEach(function(u){if(u.t<u.life){u.t+=dt;u.s.position.addScaledVector(u.v,dt);u.v.x+=Math.sin(t+u.sz*9)*dt*.3;var f=u.t/u.life;u.s.scale.setScalar(u.sz*(1+f*3));u.s.material.opacity=.45*Math.sin(f*PI)}else u.s.material.opacity=0});
    if(title){title.userData.t+=dt;var tt=title.userData.t;title.material.opacity=tt<3?1:Math.max(0,1-(tt-3)/1.2);var c=D.cam;if(c){var fw=new T.Vector3(0,0,-1).applyQuaternion(c.quaternion);title.position.copy(c.position).addScaledVector(fw,9);title.position.y+=2.6}}
    if(night===1)firstUpdate(dt,t);else if(night===2)secondUpdate(dt,t);else if(night===3)thirdUpdate(dt,t);
  });
  var cP=new T.Vector3(4,4,9),cL=new T.Vector3();
  D.camFn=function(cam,dt){
    var port=cam.aspect<.85,tp=new T.Vector3(),tl=new T.Vector3();
    if(night===1){tp.set(port?3:4.5,port?6:3.6,port?12:8.5);tl.set(-1,2.2,-6)}
    else if(night===2){var p=tob.pos,b=new T.Vector3(Math.sin(tob.g.rotation.y),0,Math.cos(tob.g.rotation.y));tp.copy(p).addScaledVector(b,port?-9:-7).add(new T.Vector3(0,port?6:4.2,0));tl.copy(p).addScaledVector(b,6).setY(1.2)}
    else if(tableau){tp.set(0,port?3.4:2.8,port?11:8.5);tl.set(-.4,2.2,-1)}
    else{tp.set(0,2.2-look*.6,10+look*1.5);tl.set(0,2+look*24,-20-look*20)}
    var k2=1-Math.exp(-dt*(tableau?4:2.5));cP.lerp(tp,k2);cL.lerp(tl,k2);cam.position.copy(cP);cam.lookAt(cL);cam.fov=port?64:54;cam.updateProjectionMatrix();
  };
  D.fpCleanup=function(){
    live=false;
    try{window.removeEventListener('keydown',kd,true);window.removeEventListener('keyup',ku,true);window.removeEventListener('pointerdown',pd,true);window.removeEventListener('pointerup',pu,true);window.removeEventListener('pointercancel',pu,true)}catch(_){}
    D.sc.fog=null;D.sc.background=D.sky;D.floor.visible=true;D.camFn=null;D.cam.fov=45;
  };
};
})();
