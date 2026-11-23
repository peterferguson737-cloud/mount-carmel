/* Book One, chapter 13 — how to enter the night of sense — as In His Footsteps. A feature lantern.
   John's method: first, a habitual desire to imitate Christ in everything, studying his life; second, for love of him,
   turning down any pleasure of the senses that is not purely for God's honour; and then his famous counsels, to incline
   always not to the easiest but to the hardest, not to the most delightful but to the harshest, not to the most but to
   the least, not to rest but to toil; all with order and discretion. And over it all the verses of his sketch of the Mount:
   to come to possess all, desire to possess nothing; on the narrow road, nada, nada, nada, and on the Mount, nothing.
   So: night and snow on the narrow road up the Mount. Christ goes ahead carrying his cross, and his footprints glow in the
   snow; walk in them and each step sounds the next note of a hymn. Four times the road forks and an easier way branches
   off, lovely and warm; it goes round the mountain and never climbs, and he waits for you at the fork. Then the stones of
   nada, and the summit at dawn. Controls as on the mountain: W or the up arrow to walk, S or down to step back, A and D
   (or the side arrows) to step aside, Shift to run, Space to hop; on a phone, drag to walk and tap to hop. Walking
   straight on always follows him; the easy roads are only taken by stepping aside onto them. */
(function(){
'use strict';
var X=window.ASCENT;if(!X||!X.MECH)return;
var MECH=X.MECH,keys=X.keys,reduce=X.reduce;

MECH.s14fp=function(D,sp){
  var T=D.T,q=D.q,M=q.M,st=D.stage,cam=D.cam,PI=Math.PI,TAU=PI*2,i,j;
  D.setUsed=true;D.floor.visible=false;
  D.sc.background=new T.Color(0x1d1814);D.sc.fog=new T.FogExp2(0x1d1814,.02);
  var touch=!!(window.matchMedia&&window.matchMedia('(pointer:coarse)').matches);
  var items=sp.items||[],said={};function say(n){if(said[n])return;said[n]=1;var it=items[n];if(it)D.say(it[0],it[1])}
  function rand(a,b){return a+Math.random()*(b-a)}
  function clamp(v,a,b){return v<a?a:v>b?b:v}
  function sstep(a,b,v){v=clamp((v-a)/(b-a),0,1);return v*v*(3-2*v)}
  function wrapA(a){while(a>PI)a-=TAU;while(a<-PI)a+=TAU;return a}

  /* ── input, as on the mountain: W/up to walk, S/down back, A/D or the side arrows to step aside, Shift to run, Space to hop;
        on a phone, drag to walk and tap to hop. The mouse still drags the view round. ── */
  var live=true,kb={f:0,b:0,l:0,r:0,run:0},joy=null,jf=0,jl=0,sf=0,sl=0,jumpReq=false,auto=0;
  var KM={KeyW:'f',ArrowUp:'f',KeyS:'b',ArrowDown:'b',KeyA:'l',ArrowLeft:'l',KeyD:'r',ArrowRight:'r',ShiftLeft:'run',ShiftRight:'run'};
  function kd(e){if(!live||e.metaKey||e.ctrlKey||e.altKey)return;var k=KM[e.code];if(k){kb[k]=1;wake();e.preventDefault();e.stopPropagation();return}
    if(e.code==='Space'){if(!e.repeat)jumpReq=true;wake();e.preventDefault();e.stopPropagation()}}
  function ku(e){var k=KM[e.code];if(k)kb[k]=0;if(live&&(k||e.code==='Space')){e.preventDefault();e.stopPropagation()}}
  function dz(v){var a=Math.abs(v)-12;return a<=0?0:Math.sign(v)*Math.min(1,a/95)}
  function pd(e){if(!live)return;wake();if(e.pointerType==='mouse')return;if(joy&&e.pointerId!==joy.id){jumpReq=true;e.stopPropagation();return}
    e.stopPropagation();joy={id:e.pointerId,ox:e.clientX,oy:e.clientY,t0:D.time,moved:0}}
  function pm(e){if(!joy||e.pointerId!==joy.id)return;e.stopPropagation();var dx=e.clientX-joy.ox,dy=e.clientY-joy.oy;joy.moved=Math.max(joy.moved,Math.hypot(dx,dy));jf=-dz(dy);jl=dz(dx)}
  function pu(e){if(!joy||e.pointerId!==joy.id)return;e.stopPropagation();if(joy.moved<12&&D.time-joy.t0<.3)jumpReq=true;joy=null;jf=jl=0}
  try{window.addEventListener('keydown',kd,true);window.addEventListener('keyup',ku,true);window.addEventListener('pointerdown',pd,true);window.addEventListener('pointermove',pm,true);
    window.addEventListener('pointerup',pu,true);window.addEventListener('pointercancel',pu,true)}catch(_){}

  /* ── sound ── */
  var actx=null,nb=null;
  function soundOn(){try{var b=document.querySelector('.snd');return !b||!b.getAttribute||b.getAttribute('aria-pressed')!=='false'}catch(_){return true}}
  function wake(){if(!soundOn())return;try{actx=actx||new (window.AudioContext||window.webkitAudioContext)();if(actx.state==='suspended')actx.resume()}catch(_){}}
  function ac(){wake();return soundOn()?actx:null}
  function note(f,when,dur,type,vol,drop){var a=ac();if(!a){D.tone(f,dur,when||0);return}try{var t=a.currentTime+(when||0),o=a.createOscillator(),g=a.createGain();o.type=type||'sine';o.frequency.setValueAtTime(f,t);if(drop)o.frequency.exponentialRampToValueAtTime(f*drop,t+dur);
    g.gain.setValueAtTime(.0001,t);g.gain.linearRampToValueAtTime(vol||.05,t+.02);g.gain.exponentialRampToValueAtTime(.0001,t+dur);o.connect(g);g.connect(a.destination);o.start(t);o.stop(t+dur+.05)}catch(_){}}
  function hiss(dur,freq,vol,type){var a=ac();if(!a)return;try{if(!nb){nb=a.createBuffer(1,a.sampleRate,a.sampleRate);var d=nb.getChannelData(0);for(var k=0;k<d.length;k++)d[k]=Math.random()*2-1}
    var t=a.currentTime,s=a.createBufferSource(),f=a.createBiquadFilter(),g=a.createGain();s.buffer=nb;s.loop=true;f.type=type||'bandpass';f.frequency.value=freq;g.gain.setValueAtTime(.0001,t);g.gain.linearRampToValueAtTime(vol,t+Math.min(.04,dur*.3));g.gain.exponentialRampToValueAtTime(.0001,t+dur);
    s.connect(f);f.connect(g);g.connect(a.destination);s.start(t);s.stop(t+dur+.05)}catch(_){}}
  /* an original hymn in the Dorian mode, one note for every step you take in his footprints */
  var HYMN=[294,330,349,392,440,392,349,330,349,392,330,294,262,294,349,330,294,392,440,523,440,392,349,392,330,294];
  function crunch(){hiss(.09,900,.03)}

  /* ── the narrow road: a steep snowy ridge straight up the middle of the Mount; the summit a plateau ── */
  var L=84,TOP=78,SUM=82.5;
  function mx(s){return 1.4*Math.sin(s*.075)}
  function my(s){return .3*Math.min(s,TOP)}
  function mh(s){return Math.atan2(.105*Math.cos(s*.075),1)}
  function P(s){return {x:mx(s),y:my(s),z:-s,h:mh(s)}}
  var snowM=new T.MeshStandardMaterial({color:0xf2ece2,roughness:.95,side:T.DoubleSide}),rockM=new T.MeshStandardMaterial({color:0x4e4237,roughness:1,flatShading:true,side:T.DoubleSide});
  function strip(pts,half,topM,flank){var top=[],fl=[],ti=[],fi=[],n=pts.length,k;
    for(k=0;k<n;k++){var p=pts[k],rx=Math.cos(p.h),rz=Math.sin(p.h),F=half+flank;
      top.push(p.x-rx*half,p.y,p.z-rz*half, p.x+rx*half,p.y,p.z+rz*half);
      fl.push(p.x-rx*F,p.y-flank*.8,p.z-rz*F, p.x-rx*half,p.y-.02,p.z-rz*half, p.x+rx*half,p.y-.02,p.z+rz*half, p.x+rx*F,p.y-flank*.8,p.z+rz*F)}
    for(k=0;k<n-1;k++){var a=k*2,b=a+2;ti.push(a,a+1,b, a+1,b+1,b);var c=k*4,d=c+4;fi.push(c,c+1,d, c+1,d+1,d, c+2,c+3,c+6, c+3,d+3,c+6)}
    function mesh(arr,idx,m){var g=new T.BufferGeometry();g.setAttribute('position',new T.Float32BufferAttribute(arr,3));g.setIndex(idx);g.computeVertexNormals();var o=new T.Mesh(g,m);st.add(o);return o}
    mesh(top,ti,topM);mesh(fl,fi,rockM)}
  var mainPts=[];for(i=0;i<=L;i++)mainPts.push(P(i));strip(mainPts,1.15,snowM,9);
  var hill=new T.Mesh(new T.ConeGeometry(80,22,48),rockM);hill.position.set(0,11-1.2,-84);st.add(hill);
  [[-95,-70,60,30],[110,-90,70,34],[-30,-170,90,40]].forEach(function(c){var m=new T.Mesh(new T.ConeGeometry(c[2],c[3],24),rockM);m.position.set(c[0],c[3]/2-4,c[1]);st.add(m)});
  for(i=0;i<40;i++){var rs=rand(6,TOP-2),rp=P(rs),side=Math.random()<.5?-1:1,off=rand(1.5,3.2),rr=rand(.2,.55);q.s(st,rr,rp.x+Math.cos(rp.h)*off*side,rp.y-.25,rp.z+Math.sin(rp.h)*off*side,'s',.7,1,1)}
  var stars=[];for(i=0;i<44;i++){var el=rand(.15,1.3),az=rand(0,TAU),sg=D.glow(rand(1.2,2.4));sg.material.fog=false;sg.position.set(Math.cos(el)*Math.cos(az)*380,Math.sin(el)*380,-60+Math.cos(el)*Math.sin(az)*380);st.add(sg);stars.push({s:sg,p:rand(0,TAU),o:rand(.4,.85)})}
  /* only the honour and glory of God dwells on this Mount */
  var glory=D.glow(36);glory.material.fog=false;glory.material.opacity=.22;glory.position.set(mx(SUM),my(SUM)+7,-SUM-6);st.add(glory);

  /* ── four forks: an easier road branches off, lovely and warm; it runs round the mountain and never climbs ── */
  var FK=[{s:14,sd:-1,easy:'The easiest',hard:'The hardest',pass:'Not the easiest, but the hardest.',say:2,kind:'road'},
    {s:30,sd:1,easy:'The most delightful',hard:'The harshest',pass:'Not the most delightful, but the harshest: for love of him, the pleasure goes by.',say:1,kind:'garden'},
    {s:44,sd:-1,easy:'The most',hard:'The least',pass:'Not the most, but the least.',kind:'heap'},
    {s:57,sd:1,easy:'Rest',hard:'Toil',pass:'Not rest, but toil, for love of him.',kind:'cottage'}];
  var BL=14,pavedM=new T.MeshStandardMaterial({color:0xcdb998,roughness:.8,side:T.DoubleSide}),anim=[];
  FK.forEach(function(f,n){var p=P(f.s),H=p.h+f.sd*.95,x=p.x,y=p.y-.03,z=p.z,pts=[];
    for(var b=0;b<=BL*2;b++){pts.push({x:x,y:y,z:z,h:H});x+=Math.sin(H)*.5;z-=Math.cos(H)*.5;y-=.025;H+=f.sd*.025}
    f.pts=pts;f.state='ahead';f.tries=0;strip(pts,1.7,f.kind==='road'?pavedM:snowM,7);
    function at(b,off,dy){var k=Math.min(pts.length-1,Math.round(b*2)),pp=pts[k];return {x:pp.x+Math.cos(pp.h)*off,y:pp.y+(dy||0),z:pp.z+Math.sin(pp.h)*off,h:pp.h}}
    var lure=D.glow(7);var lp=at(7,0,2.4);lure.position.set(lp.x,lp.y,lp.z);lure.material.opacity=.3;st.add(lure);anim.push({k:'lure',s:lure,p:n});
    if(f.kind==='road')[3,5.5,8,10.5,13].forEach(function(b,k){var a=at(b,k%2?1.9:-1.9);q.c(st,.05,.07,2,a.x,a.y+1,a.z,'d');q.b(st,.3,.36,.3,a.x,a.y+2.1,a.z,'l');var g=D.glow(1.8);g.position.set(a.x,a.y+2.1,a.z);g.material.opacity=.7;st.add(g);anim.push({k:'flick',s:g,p:k})});
    if(f.kind==='garden'){[4,6.5,9,11.5].forEach(function(b,k){var a=at(b,k%2?2.5:-2.5);q.c(st,.1,.16,1.6,a.x,a.y+.8,a.z,'w');q.s(st,1.05,a.x,a.y+2.1,a.z,'p',.75,1,1);var g=D.glow(2.6);g.position.set(a.x,a.y+2.2,a.z);g.material.opacity=.3;st.add(g)});
      var fo=at(8,0);q.c(st,.9,1,.4,fo.x+Math.cos(fo.h)*2.2,fo.y+.2,fo.z+Math.sin(fo.h)*2.2,'s');var sp2=D.glow(1.6);sp2.position.set(fo.x+Math.cos(fo.h)*2.2,fo.y+1,fo.z+Math.sin(fo.h)*2.2);sp2.material.opacity=.5;st.add(sp2);anim.push({k:'flick',s:sp2,p:3});
      for(var k=0;k<14;k++){var pt=D.glow(.22);st.add(pt);var c0=at(rand(3,12),rand(-2.6,2.6));anim.push({k:'petal',s:pt,x:c0.x,y:c0.y,z:c0.z,p:rand(0,TAU)})}}
    if(f.kind==='heap')[5,6.5,8,9.5,11].forEach(function(b,k){var sd=k%2?1:-1,a=at(b,sd*2.1);q.s(st,.45,a.x,a.y+.35,a.z,'c',.8,1,1);q.s(st,.35,a.x+.5,a.y+.3,a.z+.3,'c',.8,1,1);q.c(st,.22,.3,.8,a.x-.4,a.y+.4,a.z-.3,'c');
      if(k===2)q.b(st,1.1,.7,.7,a.x,a.y+.35,a.z-.6,'g');var g=D.glow(.7);g.position.set(a.x,a.y+.9,a.z);st.add(g);anim.push({k:'twinkle',s:g,p:k})});
    if(f.kind==='cottage'){var hp=at(9,2.9),house=q.G();house.position.set(hp.x,hp.y,hp.z);house.rotation.y=-hp.h;st.add(house);
      q.b(house,3,2.2,2.6,0,1.1,0,'w');var roof=q.k(house,2.3,1.2,0,2.8,0,'d');if(roof)roof.rotation.y=PI/4;q.b(house,.5,1.8,.5,.8,3,0,'s');
      var win=new T.Mesh(new T.BoxGeometry(.7,.6,.05),new T.MeshBasicMaterial({color:0xffe8c0}));win.position.set(-1.51,1.3,0);win.rotation.y=PI/2;house.add(win);
      var wg=D.glow(2.4);wg.position.set(-1.7,1.3,0);wg.material.opacity=.6;house.add(wg);anim.push({k:'flick',s:wg,p:1});
      var bn=at(6,-1.9);q.b(st,1.4,.08,.45,bn.x,bn.y+.45,bn.z,'w');q.b(st,.08,.45,.4,bn.x-.6,bn.y+.22,bn.z,'w');q.b(st,.08,.45,.4,bn.x+.6,bn.y+.22,bn.z,'w');
      for(var k2=0;k2<6;k2++){var sm=D.glow(1);st.add(sm);anim.push({k:'smoke',s:sm,p:k2/6,x:hp.x,y:hp.y+3.7,z:hp.z})}}
    var te=D.tag(f.easy),ta=at(2.6,0,2.1);te.position.set(ta.x,ta.y,ta.z);st.add(te);f.te=te;
    var q2=P(f.s+2),th=D.tag(f.hard);th.position.set(q2.x,q2.y+2.4,q2.z);st.add(th);f.th=th;
    var a0=at(0,0);f.blocked=false});

  /* ── the stones of nada on the last stretch, and the summit ── */
  var NADA=[63.5,66,68.5,71,73.5,76].map(function(s,k){var p=P(s),g=q.G();g.position.set(p.x+(k%2?.75:-.75),p.y,p.z);st.add(g);q.s(g,.32,0,.1,0,'s',.45,1.3,1);
    var tg=D.tag('nada');tg.position.y=.75;tg.material.opacity=.35;g.add(tg);return {s:s,tag:tg,lit:false}});
  var sumTag=D.tag('and on the Mount, nothing');var spT=P(SUM+1.5);sumTag.position.set(spT.x,spT.y+3.4,spT.z);sumTag.visible=false;st.add(sumTag);

  /* ── Christ, carrying his cross ahead of you ── */
  var C=q.G();st.add(C);var cb=q.G();C.add(cb);
  var robe=new T.Mesh(new T.ConeGeometry(.55,1.75,18),new T.MeshStandardMaterial({color:0xece4d4,roughness:1}));robe.position.y=.875;cb.add(robe);
  var mantle=new T.Mesh(new T.ConeGeometry(.6,1.3,18,1,true,PI*.15,PI*1.7),new T.MeshStandardMaterial({color:0x8a7a68,roughness:1,side:T.DoubleSide}));mantle.position.y=1.05;mantle.rotation.y=PI;cb.add(mantle);
  q.s(cb,.2,0,1.95,0,'k');q.s(cb,.215,0,2.0,-.05,'d',1,1,1);q.k(cb,.14,.32,0,1.72,.12,'d',PI);
  var halo=D.glow(2.4);halo.position.set(0,2,-.1);halo.material.opacity=.35;cb.add(halo);
  var cross=q.G();cross.position.set(.3,1.62,.05);cross.rotation.x=1;cb.add(cross);
  q.b(cross,.15,3.2,.15,0,-1.45,0,'w');q.b(cross,1.55,.14,.14,0,-.35,0,'w');
  q.c(cb,.06,.07,.55,.25,1.45,.15,'k',.3,-.6);
  var sC=4,cWait=0,cFace=0,cAng=PI,lastPrint=sC-.85,printSide=1;
  function placeC(){var p=P(sC);C.position.set(p.x,p.y+(cWalk>.1&&!reduce?Math.abs(Math.sin(D.time*7))*.05:0),p.z)}
  var cWalk=0;

  /* ── his footprints in the snow ── */
  var printGeo=new T.CircleGeometry(.11,12),prints=[];
  for(i=0;i<46;i++){var pm2=new T.MeshBasicMaterial({color:0xffffff,transparent:true,opacity:0,depthWrite:false});var pr=new T.Mesh(printGeo,pm2);pr.rotation.order='YXZ';pr.visible=false;st.add(pr);prints.push({m:pr,s:-99,age:99,lit:0,lat:0})}
  var printN=0;
  function dropPrint(s){var p=P(s),o=prints[printN++%prints.length],rx=Math.cos(p.h),rz=Math.sin(p.h);printSide=-printSide;
    o.m.position.set(p.x+rx*.17*printSide,p.y+.03,p.z+rz*.17*printSide);o.lat=.17*printSide;o.m.rotation.set(-PI/2,-p.h,0);o.m.scale.set(1,1.7,1);o.m.visible=true;o.s=s;o.age=0;o.lit=0}

  /* ── falling snow ── */
  var flakes=[];for(i=0;i<40;i++){var fl=D.glow(rand(.1,.18));fl.material.opacity=.7;st.add(fl);flakes.push({s:fl,on:false})}

  /* ── a curtain for when the easy road brings you back ── */
  var curtain=new T.Sprite(new T.SpriteMaterial({color:0x000000,transparent:true,opacity:0,depthTest:false,depthWrite:false,fog:false}));curtain.renderOrder=999;curtain.position.z=-.5;curtain.scale.set(4,4,1);cam.add(curtain);

  /* ── state ── */
  var me={s:0,v:0,br:-1,b:0,lat:0,jy:0,jvy:0},phase='intro',T0=0,camYaw=PI*0,camPit=.5,stepS=0,matched=0,hymnN=0,fade=null,firstFork=0,tooClose=0,endT=0,day=0,nadaN=0,lureT=0,lureN=0;
  var WALK=touch?'Drag to walk.':'W or ↑ to walk, A and D to step aside, Shift to run.';
  var walkHit=D.hit(st,0,1.2,-4,1.3,function(){wake();auto=D.time+1.5});
  camYaw=mh(0);

  function curFork(){for(var k=0;k<FK.length;k++)if(FK[k].state!=='passed')return FK[k];return null}

  D.onUpdate(function(t,dt){
    dt=Math.min(dt,.05);var k,go=kb.f||kb.b||kb.l||kb.r||Math.abs(jf)+Math.abs(jl)>.2||auto>D.time;
    if(phase==='intro'){T0+=dt;if(T0>3.4||(T0>1.5&&go)){phase='walk';D.hint('Christ goes ahead of you up the narrow road. Follow in his footsteps. '+WALK)}}

    /* moving, as on the mountain: along the road, back, and side to side; straight on always follows him */
    var f=curFork(),e8=1-Math.exp(-dt*8);sf+=(jf-sf)*e8;sl+=(jl-sl)*e8;
    var inF=(kb.f?1:0)-(kb.b?1:0),fwd=inF||(Math.abs(sf)>.03?Math.pow(Math.abs(sf),1.4)*Math.sign(sf):0),side=((kb.r?1:0)-(kb.l?1:0))||(Math.abs(sl)>.03?sl:0);
    if(!inF&&auto>D.time)fwd=1;if(phase!=='walk'||fade){fwd=0;side=0}
    var tv=fwd*(kb.run||Math.abs(sf)>.88?4.8:3);
    if(me.br<0){var lim=sC-1.6;if(phase==='end')lim=Math.min(lim,SUM-1.4);
      if(fwd>0&&me.s>sC-2.1&&phase==='walk'&&!tooClose){tooClose=1;D.hint('Behind him, at his pace: not ahead of him.');D.tween(1.2,function(){},function(){say(4)})}
      if(tv>0&&me.s>sC-2.4)tv=Math.min(tv,cWalk>.5?2.4:0)}
    me.v+=(tv-me.v)*Math.min(1,dt*(Math.abs(tv)>Math.abs(me.v)?6:9));
    /* step aside: the road is narrow, but at a fork you can step across onto the easy road's side */
    var nearF=me.br<0&&f&&me.s>f.s-5&&me.s<f.s+.3,lo=-.85,hi=.85;if(nearF){if(f.sd>0)hi=1.9;else lo=-1.9}if(me.br>=0){lo=-1.3;hi=1.3}
    me.lat+=side*2.6*dt;var cl=clamp(me.lat,lo,hi);me.lat+=(cl-me.lat)*Math.min(1,dt*8);
    if(nearF&&!firstFork){firstFork=1;D.hint('The road forks. His footprints go straight on up the hard way. Keep walking to follow him, or step aside onto the easy road.')}
    if(jumpReq&&me.jy<=0&&phase==='walk'){me.jvy=5;me.jy=.001;note(520,0,.07,'sine',.03)}jumpReq=false;
    if(me.jy>0){me.jvy-=(me.jvy>0?20:26)*dt;me.jy+=me.jvy*dt;if(me.jy<=0){me.jy=0;me.jvy=0;crunch()}}
    if(me.br<0){var ns=Math.max(0,Math.min(me.s+me.v*dt,lim));
      if(f&&me.s<f.s&&ns>=f.s){
        if(me.lat*f.sd>.6){me.br=FK.indexOf(f);me.b=0;f.tries++;stepS=0;D.hint(f.easy+'. How easy the going is here.')}
        else{f.state='passed';f.te.visible=false;note(587,0,.8,'sine',.04);note(880,.08,1,'sine',.03);D.hint(f.pass);if(f.say!=null)D.tween(1.4,function(){},(function(n){return function(){say(n)}})(f.say))}}
      if(me.br<0)me.s=ns}
    else{var fb=FK[me.br];me.b+=me.v*dt;
      if(me.b<0){me.br=-1;me.s=fb.s-.05;me.lat=fb.sd*1.5;stepS=me.s}
      else if(me.b>11&&!fade){fade={t:0,fb:fb}}}
    if(fade){fade.t+=dt;curtain.material.opacity=fade.t<.7?fade.t/.7:Math.max(0,1-(fade.t-1)/.7);
      if(fade.t>=.7&&me.br>=0){me.br=-1;me.s=fade.fb.s-2.6;me.v=0;me.lat=0;camYaw=mh(me.s);stepS=me.s;
        D.hint(fade.fb.tries<2?'The easy road ran round the mountain and never climbed. Back at the fork, he is waiting for you.':'Round again. He is still waiting at the fork.')}
      if(fade.t>1.7){fade=null;curtain.material.opacity=0}}

    /* steps: in his footprints a note of the hymn; in fresh snow only a crunch */
    if(me.br<0){if(stepS>me.s+.85)stepS=me.s;while(me.s-stepS>=.85){stepS+=.85;var hit=null;for(k=0;k<prints.length;k++){var pp=prints[k];if(pp.m.visible&&pp.age<7&&Math.abs(pp.s-stepS)<.45&&Math.abs(pp.lat-me.lat)<.45){hit=pp;break}}
        crunch();if(hit){hit.lit=1;matched++;var hf=HYMN[hymnN++%HYMN.length];note(hf,0,1,'sine',.045);note(hf*1.5,0,.9,'sine',.012);if(matched===8)say(0)}}}
    else{while(me.b-stepS>=.85){stepS+=.85;note(rand(200,240),0,.05,'square',.008)}}
    if(me.br>=0&&stepS>me.b+1)stepS=me.b;

    /* Christ: walks ahead at his own pace, leaving footprints; waits if you fall behind or wander off */
    var wait=me.br>=0||sC-me.s>7||(f&&sC>=f.s+2.5&&me.s<f.s)||phase==='intro'||sC>=SUM;
    var cv=wait?0:2;cWalk+=((cv?1:0)-cWalk)*Math.min(1,dt*5);sC=Math.min(SUM,sC+cv*dt);
    while(sC-lastPrint>=.85){lastPrint+=.85;dropPrint(lastPrint)}
    placeC();
    var hTo=mh(sC),faceFwd=PI-hTo,toMe=Math.atan2(mx(me.s)-C.position.x,-me.s-C.position.z);
    var want=phase==='end'&&endT>2?toMe:(wait&&phase==='walk'&&(me.br>=0||sC-me.s>7)?faceFwd+wrapA(toMe-faceFwd)*.55:faceFwd);if(phase==='intro')want=faceFwd+wrapA(toMe-faceFwd)*(T0<2.4?.8:0);
    C.rotation.y+=wrapA(want-C.rotation.y)*Math.min(1,dt*4);cb.rotation.z=cWalk*Math.sin(t*7)*.03;
    if(cWalk>.5&&Math.random()<dt*2)hiss(.25,260,.012,'lowpass');
    prints.forEach(function(o){if(!o.m.visible)return;o.age+=dt;var g=o.lit?Math.max(.5,1-o.age*.02):Math.max(.12,.85*(1-o.age/7));o.m.material.opacity=g*(1-.6*day)});

    /* the stones of nada, and the summit */
    NADA.forEach(function(n,k){if(!n.lit&&me.s>=n.s-.6){n.lit=true;nadaN++;n.tag.material.opacity=1;note([392,440,494,523,587,659][k],0,1.6,'sine',.04);note(196,0,1.6,'triangle',.02);
      if(nadaN===1)D.hint('The narrow road of nothing: nada, nada, nada.');if(nadaN===3)say(3)}});
    if(phase==='walk'&&me.s>=SUM-2.6&&sC>=SUM){phase='end';endT=0;sumTag.visible=true;note(294,0,2.4,'sine',.05);note(440,.1,2.4,'sine',.04);note(587,.2,2.6,'sine',.035);
      D.hint('And on the Mount, nothing. Here there is no road any more: only the honour and glory of God.')}
    if(phase==='end'){endT+=dt;var ce=sstep(.3,1.8,endT);cross.rotation.x=1-ce;cross.position.set(.3+ce*.7,1.62+ce*1.48,.05);day=sstep(1.5,7,endT);
      glory.material.opacity=.22+.6*day;glory.scale.setScalar(36*(1+.6*day));if(endT>8.5&&!D.finished){live=false;D.done()}}

    /* lures, snow, sky */
    lureT-=dt;var nearF=f&&me.br<0&&me.s>f.s-8&&me.s<f.s+1;
    if((nearF||me.br>=0)&&lureT<=0){lureT=.32;var lf=me.br>=0?1:Math.max(0,1-Math.abs(f.s-me.s)/8)*(.5+.5*Math.max(0,me.lat*f.sd));note([523,659,784,1047,784,659][lureN++%6],0,.6,'triangle',.02*lf)}
    anim.forEach(function(a){if(a.k==='lure')a.s.material.opacity=FK[a.p].state==='passed'?Math.max(0,a.s.material.opacity-dt*.3):.25+.08*Math.sin(t*2+a.p);
      else if(a.k==='flick')a.s.material.opacity=.55+.15*Math.sin(t*9+a.p*3)+.08*Math.sin(t*23+a.p);
      else if(a.k==='twinkle')a.s.material.opacity=Math.max(0,Math.sin(t*3+a.p*1.7))*.8;
      else if(a.k==='petal'){var u=((t*.18+a.p)%1);a.s.position.set(a.x+Math.sin(t+a.p)*.4,a.y+3-u*3,a.z+Math.cos(t*.7+a.p)*.4);a.s.material.opacity=.6*Math.sin(u*PI)}
      else if(a.k==='smoke'){var u2=((t*.12+a.p)%1);a.s.position.set(a.x+u2*.8,a.y+u2*3,a.z);a.s.scale.setScalar(.8+u2*2);a.s.material.opacity=.3*Math.sin(u2*PI)}});
    var eye=me.br<0?P(me.s):FK[me.br].pts[Math.min(FK[me.br].pts.length-1,Math.round(me.b*2))];
    flakes.forEach(function(fk){var p=fk.s.position;if(!fk.on||p.y<eye.y-1){fk.on=true;p.set(eye.x+rand(-7,7),eye.y+rand(3,7),eye.z-rand(-2,10))}
      p.set(p.x+Math.sin(t+p.z)*dt*.3,p.y-dt*rand(.5,.9),p.z);fk.s.material.opacity=.6*(1-.7*day)});
    stars.forEach(function(s){s.s.material.opacity=s.o*(.7+.3*Math.sin(t*1.7+s.p))*(1-day)});
    var r=.114+.6*day,g2=.094+.53*day,b2=.078+.43*day;D.sc.background.setRGB(r,g2,b2);if(D.sc.fog){D.sc.fog.color.setRGB(r,g2,b2);D.sc.fog.density=.02*(1-.5*day)}
    D.light(.42+.55*day);
    walkHit.position.set(mx(me.s+4),my(me.s+4)+1.2,-(me.s+4));
  });

  /* your eyes: up the road at him (the mouse drags the view round); drawn up to the summit at the start and the end */
  D.camFn=function(cam,dt){
    var on=me.br<0,p=on?P(me.s):null;
    if(!on){var pts=FK[me.br].pts,kf=me.b*2,k0=Math.min(pts.length-2,Math.floor(kf)),u=Math.min(1,Math.max(0,kf-k0)),a=pts[k0],b=pts[k0+1];p={x:a.x+(b.x-a.x)*u,y:a.y+(b.y-a.y)*u,z:a.z+(b.z-a.z)*u,h:a.h+(b.h-a.h)*u}}
    p={x:p.x+Math.cos(p.h)*me.lat,y:p.y+me.jy,z:p.z+Math.sin(p.h)*me.lat,h:p.h};
    var bob=reduce?0:Math.abs(Math.sin(stepS*PI/.85))*.03*Math.min(1,Math.abs(me.v)/2);
    var ty=p.h+(D.yaw||0);camYaw+=wrapA(ty-camYaw)*Math.min(1,dt*5);
    var up=phase==='intro'?.42:phase==='end'?.15+.3*sstep(0,2,endT):.17;camPit+=(up-camPit)*Math.min(1,dt*1.5);
    var ex=p.x,ey=p.y+1.6+bob,ez=p.z;cam.position.set(ex,ey,ez);
    cam.lookAt(ex+Math.sin(camYaw)*10,ey+Math.tan(camPit)*10,ez-Math.cos(camYaw)*10);
    cam.fov=cam.aspect<.85?74:60;cam.updateProjectionMatrix();
  };
  D._gf=function(){return {stage:phase,s:+me.s.toFixed(1),lat:+me.lat.toFixed(2),b:+me.b.toFixed(1),sC:+sC.toFixed(1),br:me.br,passed:FK.filter(function(f){return f.state==='passed'}).length,tries:FK.map(function(f){return f.tries}).join(''),matched:matched,nada:nadaN}};
  D.fpCleanup=function(){
    live=false;
    try{window.removeEventListener('keydown',kd,true);window.removeEventListener('keyup',ku,true);window.removeEventListener('pointerdown',pd,true);window.removeEventListener('pointermove',pm,true);
      window.removeEventListener('pointerup',pu,true);window.removeEventListener('pointercancel',pu,true)}catch(_){}
    try{cam.remove(curtain)}catch(_){}
    D.sc.fog=null;D.sc.background=D.sky;D.floor.visible=true;D.camFn=null;cam.fov=45;try{cam.updateProjectionMatrix()}catch(_){}
  };
};
})();
