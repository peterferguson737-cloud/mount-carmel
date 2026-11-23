/* Book One, chapter 7 — how the desires torment the soul — as The Mill at Gaza. A feature lantern.
   John's pictures of torment, in his order: desires bind like cords; to rest on them is to lie naked on thorns; they swarm
   like bees and run like fire through thorns; and the torment grows with the desire. Above all Samson: strong and free, he
   was blinded, bound and set to grind at his enemies' mill. Against it all, Christ: come to me, all you who labour and are
   burdened, and I will give you rest; and Isaiah: all you who thirst, come to the waters, you who have no money, come.
   So: you are Samson, blind in the prison at Gaza, pushing the mill round. Lap by lap the torments come: cords at your
   hands, thorns and fire underfoot, bees about your head, a load on your back. The mill grinds nothing. Then someone calls
   at the door, and the one thing that frees you is to stop pushing. You walk out to the water and rest.
   Controls as on the mountain: W or the up arrow to push or walk, S or down to go back, A and D (or the side arrows) to
   step aside, Shift to hurry; on a phone, drag. */
(function(){
'use strict';
var X=window.ASCENT;if(!X||!X.MECH)return;
var MECH=X.MECH,reduce=X.reduce;

MECH.samsonfp=function(D,sp){
  var T=D.T,q=D.q,M=q.M,st=D.stage,cam=D.cam,PI=Math.PI,TAU=PI*2,i;
  D.setUsed=true;D.floor.visible=false;
  D.sc.background=new T.Color(0x120d0a);D.sc.fog=new T.FogExp2(0x120d0a,.06);
  var touch=!!(window.matchMedia&&window.matchMedia('(pointer:coarse)').matches);
  var items=sp.items||[],said={};function say(n){if(said[n])return;said[n]=1;var it=items[n];if(it)D.say(it[0],it[1])}
  function rand(a,b){return a+Math.random()*(b-a)}
  function clamp(v,a,b){return v<a?a:v>b?b:v}
  function sstep(a,b,v){v=clamp((v-a)/(b-a),0,1);return v*v*(3-2*v)}
  function wrapA(a){while(a>PI)a-=TAU;while(a<-PI)a+=TAU;return a}

  /* ── input, as on the mountain ── */
  var live=true,kb={f:0,b:0,l:0,r:0,run:0},joy=null,jf=0,jl=0,sf=0,sl=0,auto=0;
  var KM={KeyW:'f',ArrowUp:'f',KeyS:'b',ArrowDown:'b',KeyA:'l',ArrowLeft:'l',KeyD:'r',ArrowRight:'r',ShiftLeft:'run',ShiftRight:'run'};
  function kd(e){if(!live||e.metaKey||e.ctrlKey||e.altKey)return;var k=KM[e.code];if(k){kb[k]=1;wake();e.preventDefault();e.stopPropagation()}}
  function ku(e){var k=KM[e.code];if(k){kb[k]=0;if(live){e.preventDefault();e.stopPropagation()}}}
  function dz(v){var a=Math.abs(v)-12;return a<=0?0:Math.sign(v)*Math.min(1,a/95)}
  function pd(e){if(!live)return;wake();if(e.pointerType==='mouse'||joy)return;e.stopPropagation();joy={id:e.pointerId,ox:e.clientX,oy:e.clientY}}
  function pm(e){if(!joy||e.pointerId!==joy.id)return;e.stopPropagation();jf=-dz(e.clientY-joy.oy);jl=dz(e.clientX-joy.ox)}
  function pu(e){if(!joy||e.pointerId!==joy.id)return;e.stopPropagation();joy=null;jf=jl=0}
  try{window.addEventListener('keydown',kd,true);window.addEventListener('keyup',ku,true);window.addEventListener('pointerdown',pd,true);window.addEventListener('pointermove',pm,true);
    window.addEventListener('pointerup',pu,true);window.addEventListener('pointercancel',pu,true)}catch(_){}

  /* ── sound ── */
  var actx=null,nb=null,buzz=null;
  function soundOn(){try{var b=document.querySelector('.snd');return !b||!b.getAttribute||b.getAttribute('aria-pressed')!=='false'}catch(_){return true}}
  function wake(){if(!soundOn())return;try{actx=actx||new (window.AudioContext||window.webkitAudioContext)();if(actx.state==='suspended')actx.resume()}catch(_){}}
  function ac(){wake();return soundOn()?actx:null}
  function note(f,when,dur,type,vol,drop){var a=ac();if(!a){D.tone(f,dur,when||0);return}try{var t=a.currentTime+(when||0),o=a.createOscillator(),g=a.createGain();o.type=type||'sine';o.frequency.setValueAtTime(f,t);if(drop)o.frequency.exponentialRampToValueAtTime(f*drop,t+dur);
    g.gain.setValueAtTime(.0001,t);g.gain.linearRampToValueAtTime(vol||.05,t+.02);g.gain.exponentialRampToValueAtTime(.0001,t+dur);o.connect(g);g.connect(a.destination);o.start(t);o.stop(t+dur+.05)}catch(_){}}
  function hiss(dur,freq,vol,type){var a=ac();if(!a)return;try{if(!nb){nb=a.createBuffer(1,a.sampleRate,a.sampleRate);var d=nb.getChannelData(0);for(var k=0;k<d.length;k++)d[k]=Math.random()*2-1}
    var t=a.currentTime,s=a.createBufferSource(),f=a.createBiquadFilter(),g=a.createGain();s.buffer=nb;s.loop=true;f.type=type||'bandpass';f.frequency.value=freq;g.gain.setValueAtTime(.0001,t);g.gain.linearRampToValueAtTime(vol,t+Math.min(.08,dur*.3));g.gain.exponentialRampToValueAtTime(.0001,t+dur);
    s.connect(f);f.connect(g);g.connect(a.destination);s.start(t);s.stop(t+dur+.05)}catch(_){}}
  function voice(){var a=ac();if(!a){D.tone(392,.5,0);D.tone(587,.5,.42);D.tone(494,.6,.84);return}
    try{var t0=a.currentTime+.02;[[392,0],[587,.42],[494,.84]].forEach(function(nt){var o=a.createOscillator(),o2=a.createOscillator(),g=a.createGain(),g2=a.createGain();
      o.type='triangle';o.frequency.value=nt[0];o2.type='sine';o2.frequency.value=nt[0]*2;g2.gain.value=.25;o2.connect(g2);g2.connect(g);o.connect(g);g.connect(a.destination);
      var t=t0+nt[1];g.gain.setValueAtTime(.0001,t);g.gain.linearRampToValueAtTime(.075,t+.06);g.gain.exponentialRampToValueAtTime(.0001,t+.62);o.start(t);o2.start(t);o.stop(t+.7);o2.stop(t+.7)})}catch(_){}}
  function buzzOn(){var a=ac();if(!a||buzz)return;try{var o=a.createOscillator(),l=a.createOscillator(),lg=a.createGain(),g=a.createGain(),f=a.createBiquadFilter();
    o.type='sawtooth';o.frequency.value=210;l.frequency.value=23;lg.gain.value=.012;f.type='bandpass';f.frequency.value=700;g.gain.value=.0001;
    l.connect(lg);lg.connect(g.gain);o.connect(f);f.connect(g);g.connect(a.destination);o.start();l.start();g.gain.linearRampToValueAtTime(.02,a.currentTime+1.2);buzz={o:o,l:l,g:g}}catch(_){}}
  function buzzOff(fade){if(!buzz)return;var b=buzz;buzz=null;try{var t=actx.currentTime;b.g.gain.cancelScheduledValues(t);b.g.gain.setValueAtTime(b.g.gain.value,t);b.g.gain.linearRampToValueAtTime(.0001,t+(fade||.1));b.o.stop(t+(fade||.1)+.05);b.l.stop(t+(fade||.1)+.05)}catch(_){}}

  /* ── soft textures and the blindness ── */
  function radTex(inner,outer,a0,a1){var c=document.createElement('canvas');c.width=c.height=128;var g=c.getContext('2d'),gr=g.createRadialGradient(64,64,inner,64,64,outer);
    gr.addColorStop(0,a0);gr.addColorStop(1,a1);g.fillStyle=gr;g.fillRect(0,0,128,128);return new T.CanvasTexture(c)}
  var VIG=radTex(14,90,'rgba(0,0,0,0)','rgba(0,0,0,1)');
  var vig=new T.Sprite(new T.SpriteMaterial({map:VIG,color:0x000000,transparent:true,depthTest:false,depthWrite:false,opacity:.82,fog:false}));vig.renderOrder=996;vig.position.z=-.5;cam.add(vig);
  var straps=q.G();cam.add(straps);straps.visible=false;
  [-1,1].forEach(function(sd){var s=new T.Mesh(new T.BoxGeometry(.06,.5,.02),M.w);s.position.set(sd*.33,.3,-.6);s.rotation.z=sd*.5;straps.add(s)});

  /* ── the prison house at Gaza: stone walls, straw, a slit of moonlight, a door at the far end ── */
  var room=q.G();st.add(room);
  q.b(room,16,.2,16,0,-.1,0,'d');var ring=new T.Mesh(new T.RingGeometry(4,5.3,64),M.w);ring.rotation.x=-PI/2;ring.position.y=.012;room.add(ring);
  q.b(room,16,6,.4,0,3,8,'s');q.b(room,.4,6,16,-8,3,0,'s');q.b(room,.4,6,16,8,3,0,'s');
  q.b(room,7.2,6,.4,-4.4,3,-8,'s');q.b(room,7.2,6,.4,4.4,3,-8,'s');q.b(room,1.6,3.4,.4,0,4.3,-8,'s');q.b(room,16,.3,16,0,6.1,0,'w');
  for(i=-3;i<=3;i++)q.b(room,.3,.3,16,i*2.4,5.85,0,'d');
  for(i=0;i<34;i++){var sa=rand(0,TAU),sr=rand(4.6,7.5);q.b(room,rand(.3,.7),.02,.04,Math.cos(sa)*sr,.02,Math.sin(sa)*sr,'c',rand(0,PI))}
  [[-7.75,2],[7.75,-2],[-7.75,-4]].forEach(function(p){for(var k=0;k<5;k++)q.t(room,.09,.025,p[0],3.4-k*.16,p[1],'d',k%2?0:PI/2,PI/2)});
  q.b(room,.1,.35,1.4,-7.75,5,2,'l');
  var shaftM=M.r.clone();shaftM.side=T.DoubleSide;shaftM.opacity=.06;var shaft=new T.Mesh(new T.CylinderGeometry(.5,1.6,7,20,1,true),shaftM);shaft.position.set(-5,2.6,1.4);shaft.rotation.z=-.75;room.add(shaft);
  var doorL=q.G();doorL.position.set(-.8,0,-7.95);room.add(doorL);q.b(doorL,.8,2.6,.12,.4,1.3,0,'w');
  var doorR=q.G();doorR.position.set(.8,0,-7.95);room.add(doorR);q.b(doorR,.8,2.6,.12,-.4,1.3,0,'w');
  var crack=D.glow(3);crack.position.set(0,1.3,-7.7);crack.material.opacity=0;st.add(crack);
  var lampL=new T.PointLight(0xffd9b0,.5,7,1.6);st.add(lampL);
  var outL=new T.PointLight(0xfff0d8,0,26,1.2);outL.position.set(0,4,-12);st.add(outL);

  /* outside: a spring under a fig tree */
  q.b(st,40,.2,24,0,-.1,-20,'c');
  var pool=new T.Mesh(new T.CylinderGeometry(2.3,2.3,.1,40),M.a);pool.position.set(0,.03,-16.5);st.add(pool);
  for(i=0;i<16;i++){var pa=i/16*TAU;q.s(st,rand(.25,.4),Math.cos(pa)*2.55,.1,-16.5+Math.sin(pa)*2.55,'s',.6,1,1)}
  var glints=[];for(i=0;i<10;i++){var gg=D.glow(rand(.4,.8));gg.position.set(rand(-1.6,1.6),.1,-16.5+rand(-1.6,1.6));gg.material.opacity=0;st.add(gg);glints.push({s:gg,p:rand(0,TAU)})}
  q.c(st,.22,.32,3,2.8,1.5,-18.2,'w');q.s(st,2,2.8,3.6,-18.2,'p',.7,1.2,1);q.s(st,1.4,1.6,3.2,-17.6,'p',.7,1,1);
  var sun=D.glow(30);sun.material.fog=false;sun.position.set(0,12,-40);sun.material.opacity=0;st.add(sun);

  /* ── the mill: bed stone, runner, spindle, an empty hopper, and the beam you push ── */
  q.c(st,1.45,1.55,.6,0,.3,0,'s');var runner=q.G();st.add(runner);q.c(runner,1.3,1.3,.5,0,.85,0,'s');for(i=0;i<6;i++)q.b(runner,2.4,.04,.07,0,1.11,0,'d',i*PI/6);
  q.c(st,.14,.16,2.8,0,1.4,0,'w');var hop=new T.Mesh(new T.ConeGeometry(.9,1.1,18,1,true),new T.MeshStandardMaterial({color:0x5a4634,roughness:1,side:T.DoubleSide}));hop.rotation.x=PI;hop.position.y=2.45;st.add(hop);
  var R=4.6,DEL=.217,beam=q.G();st.add(beam);q.b(beam,5.3,.16,.18,2.65,1.15,0,'w');q.b(beam,.3,.3,.3,0,1.15,0,'d');
  var HX=[4.23,4.75];HX.forEach(function(x){q.s(beam,.1,x,1.2,0,'k',.9,1.25,1.1)});
  /* your arms, from your shoulders (below the screen) to your fists on the beam */
  var arms=[0,1].map(function(){var g=q.G();st.add(g);q.c(g,.12,.13,.46,0,0,.23,'w',0,PI/2);q.c(g,.075,.095,.6,0,0,.7,'k',0,PI/2);return g});
  var tmpV=new T.Vector3(),tmpH=new T.Vector3();
  var coils=[];HX.forEach(function(x){for(var k=-1;k<=1;k++){var c=q.t(beam,.15,.03,x+k*.13,1.18,0,'w',0,PI/2);if(c){c.scale.setScalar(.001);coils.push({m:c,x:x+k*.13})}}});
  var thorns=[];for(i=0;i<26;i++){var ta=i/26*TAU+rand(-.08,.08),tr=rand(4.25,5.05),tg=q.G();tg.position.set(Math.cos(ta)*tr,0,Math.sin(ta)*tr);tg.scale.setScalar(.001);st.add(tg);
    for(var k2=0;k2<5;k2++)q.k(tg,.03,.38,Math.sin(k2*1.3)*.12,.15,Math.cos(k2*1.3)*.12,'d',Math.sin(k2*1.3)*.5,Math.cos(k2*1.3)*.5);
    var fl=D.glow(.9);fl.position.y=.35;fl.material.opacity=0;tg.add(fl);thorns.push({g:tg,a:ta,fl:fl,p:rand(0,TAU)})}
  var bees=[];for(i=0;i<16;i++){var bg=q.G();st.add(bg);q.s(bg,.035,0,0,0,'n',.8,1.4,.8);q.b(bg,.07,.005,.03,0,.03,0,'l');bg.visible=false;bees.push({g:bg,a:rand(0,TAU),r:rand(.45,.95),w:rand(2,4)*(Math.random()<.5?-1:1),y:rand(-.3,.35),p:rand(0,TAU)})}

  /* ── state ── */
  var look=0,me={a:-PI/2+.9,v:0,laps:0,stoop:0,lat:0,s:0,x:0,z:0,yaw:0},phase='mill',T0=0,torm=0,stopT=0,callT=0,relT=0,restT=0,jolt=0,nextSting=2,lastA=0,stepT=0,doorA=0,sight=0,hope=0;
  var burden=0,cordK=0,thornK=0,fireK=0,beeK=0,path=null,pathL=0,yawS=0;
  me.x=Math.cos(me.a)*R;me.z=Math.sin(me.a)*R;yawS=Math.atan2(-Math.sin(me.a),-Math.cos(me.a));
  var walkHit=D.hit(st,0,1.2,0,1.2,function(){wake();auto=D.time+1.5});
  D.hint('Samson, blind and bound at the mill: this is what desires do to a soul. '+(touch?'Drag up to push.':'Push: W or ↑.'));

  function buildPath(){var pts=[],a0=me.a,r0=R,r1=6.1,k;pts.push([Math.cos(a0)*r0,Math.sin(a0)*r0]);pts.push([Math.cos(a0)*r1,Math.sin(a0)*r1]);
    var d=wrapA(-PI/2-a0),n=Math.max(1,Math.ceil(Math.abs(d)/.25));for(k=1;k<=n;k++){var aa=a0+d*k/n;pts.push([Math.cos(aa)*r1,Math.sin(aa)*r1])}
    pts.push([0,-6.9]);pts.push([0,-9]);pts.push([0,-14.4]);
    var segs=[],tot=0;for(k=0;k<pts.length-1;k++){var dx=pts[k+1][0]-pts[k][0],dzz=pts[k+1][1]-pts[k][1],l=Math.hypot(dx,dzz);if(l<1e-3)continue;segs.push({x:pts[k][0],z:pts[k][1],dx:dx/l,dz:dzz/l,l:l,s0:tot});tot+=l}
    path=segs;pathL=tot}
  function onPath(s){var g=path[path.length-1];for(var k=0;k<path.length;k++)if(s<=path[k].s0+path[k].l){g=path[k];break}var u=clamp(s-g.s0,0,g.l);return {x:g.x+g.dx*u,z:g.z+g.dz*u,dx:g.dx,dz:g.dz}}

  D.onUpdate(function(t,dt){
    dt=Math.min(dt,.05);var k,e8=1-Math.exp(-dt*8);sf+=(jf-sf)*e8;sl+=(jl-sl)*e8;
    var inF=(kb.f?1:0)-(kb.b?1:0),fwd=inF||(Math.abs(sf)>.03?Math.pow(Math.abs(sf),1.4)*Math.sign(sf):0),side=((kb.r?1:0)-(kb.l?1:0))||(Math.abs(sl)>.03?sl:0);
    if(!inF&&auto>D.time)fwd=1;var hurry=kb.run||Math.abs(sf)>.88;
    T0+=dt;

    if(phase==='mill'||phase==='call'){
      /* pushing the mill round: the more you hurry, the more it torments you */
      var tv=fwd*(hurry?.62:.4)*(1-.5*burden)*(1-.12*cordK);me.v+=(tv-me.v)*Math.min(1,dt*(Math.abs(tv)>Math.abs(me.v)?3:5));
      me.a+=me.v*dt;me.laps+=me.v*dt/TAU;torm+=((hurry&&fwd>0?1:.55)-torm)*Math.min(1,dt*2);
      var moving=Math.abs(me.v)>.15;stepT-=dt*Math.abs(me.v)*8;if(moving&&stepT<=0){stepT=1;hiss(.3,140,.05*Math.min(1,Math.abs(me.v)),'lowpass');if(burden>.5)hiss(.35,500,.02,'lowpass')}
      /* the torments arrive, lap by lap */
      if(me.laps>.4&&!cordK){cordK=.001;note(180,0,.4,'triangle',.04,.7);say(0)}
      if(me.laps>.75)say(2);
      if(me.laps>.95&&!thornK){thornK=.001;D.hint('Thorns underfoot.')}
      if(me.laps>1.25&&!fireK){fireK=.001;hiss(1.5,2200,.03,'highpass');say(1)}
      if(me.laps>1.55&&!beeK){beeK=.001;buzzOn();D.hint('Desires swarm like bees.')}
      if(me.laps>1.85&&!burden){burden=.001;note(70,0,.5,'sine',.08,.6);hiss(.4,200,.06,'lowpass');say(3)}
      if(me.laps>2.2&&phase==='mill'){phase='call';callT=1.6;D.off(walkHit);D.hint('Round and round. The mill grinds nothing.')}
      /* someone calls at the door; the one thing that frees you is to stop pushing */
      if(phase==='call'){callT-=dt;if(callT<=0){callT=5.5;voice();D.hint(hope?'Let go. Stop pushing.':'“Come to me, all who labour, and I will give you rest.” Stop pushing.');hope++}
        crack.material.opacity+=(.5-crack.material.opacity)*Math.min(1,dt);
        if(hope&&Math.abs(me.v)<.1&&!fwd)stopT+=dt;else stopT=0;
        if(stopT>1.2){phase='release';relT=0;note(392,0,1.6,'sine',.04);note(587,.15,1.8,'sine',.035)}}
      /* thorns underfoot: a scratch and a stumble as you pass each one */
      if(thornK)for(k=0;k<thorns.length;k++){var th=thorns[k],d0=wrapA(lastA-th.a),d1=wrapA(me.a-th.a);if(d0<0&&d1>=0&&Math.abs(d0)<1){hiss(.12,3000,.03,'highpass');jolt=Math.max(jolt,.012+.012*torm)}}
      if(beeK){nextSting-=dt*(.6+torm);if(nextSting<=0){nextSting=rand(1.4,3);jolt=Math.max(jolt,.02);note(rand(900,1200),0,.08,'square',.015)}}
    }
    lastA=me.a;
    if(phase==='mill'||phase==='call'){var lk2=(kb.r?1:0)-(kb.l?1:0)||(Math.abs(sl)>.03?sl:0);look=clamp(look+lk2*1.5*dt,-1.3,1.3)}else look*=1-Math.min(1,dt*2);
    if(phase==='release'){relT+=dt;me.v*=1-Math.min(1,dt*4);
      if(relT>.3&&cordK>0){cordK=-1;D.hint('You stopped. Everything falls away.');hiss(.5,600,.03);coils.forEach(function(c,n){var y0=c.m.position.y;D.tween(.8,function(e){c.m.position.y=y0-e*1.1;c.m.scale.setScalar(Math.max(.001,1-e*.4))})})}
      if(relT>.8&&beeK>0){beeK=-1;buzzOff(1.6)}
      if(relT>1.3&&fireK>0){fireK=-1;thornK=-1;hiss(1,400,.03,'lowpass')}
      if(relT>1.8&&burden>0){burden=0;note(80,0,.4,'sine',.07);hiss(.3,180,.05,'lowpass')}
      if(relT>2.4&&!doorA){doorA=.001;hiss(1.4,300,.04);note(220,0,1.2,'triangle',.03,1.3)}
      if(relT>3.6){phase='free';buildPath();me.s=0;D.hits.push(walkHit);D.hint('Come to the waters.')}}
    if(phase==='free'){var tv2=fwd*(hurry?4.2:2.6);me.v+=(tv2-me.v)*Math.min(1,dt*(Math.abs(tv2)>Math.abs(me.v)?6:9));me.s=clamp(me.s+me.v*dt,0,pathL);
      me.lat=clamp(me.lat+side*2.2*dt,-.7,.7);if(Math.abs(me.v)>.3){stepT-=dt*Math.abs(me.v)*1.2;if(stepT<=0){stepT=1;hiss(.07,me.s>12?900:500,.025)}}
      sight=me.s/pathL;if(me.s>=pathL-.05){phase='rest';restT=0;note(523,0,2,'sine',.04);note(659,.2,2,'sine',.035);note(784,.4,2.4,'sine',.03);say(4)}}
    if(phase==='rest'){restT+=dt;sight=1;if(restT>7&&!D.finished){live=false;D.done()}}

    /* the torments, drawn */
    var bA=me.a+DEL;beam.rotation.y=-bA;runner.rotation.y=-me.a*.9;
    if(cordK>0){cordK=Math.min(1,cordK+dt*.8);coils.forEach(function(c,n){c.m.scale.setScalar(Math.max(.001,cordK*(1+.15*Math.sin(t*3+n))))})}
    if(thornK>0)thornK=Math.min(1,thornK+dt*.7);
    thorns.forEach(function(th){var s=thornK>0?thornK:Math.max(.001,th.g.scale.x-dt*.8);th.g.scale.setScalar(Math.max(.001,s));
      th.fl.material.opacity=fireK>0?Math.min(1,fireK)*(.55+.3*Math.sin(t*11+th.p))*(.6+.5*torm):Math.max(0,th.fl.material.opacity-dt)});
    if(fireK>0){fireK=Math.min(1,fireK+dt*.5);if(Math.random()<dt*3)hiss(.1,2600,.012,'highpass')}
    var cx=Math.cos(me.a)*R,cz=Math.sin(me.a)*R;
    if(phase==='free'||phase==='rest'){var pp=onPath(me.s);cx=pp.x-pp.dz*me.lat;cz=pp.z+pp.dx*me.lat}
    bees.forEach(function(b){if(beeK>0){b.g.visible=true;b.a+=b.w*dt*(.7+.6*torm);b.g.position.set(cx+Math.cos(b.a)*b.r,1.6-me.stoop+b.y+Math.sin(t*5+b.p)*.08,cz+Math.sin(b.a)*b.r);b.g.rotation.y=-b.a}
      else if(beeK<0&&b.g.visible){b.g.position.set(b.g.position.x+(-6-b.g.position.x)*dt*.8,b.g.position.y+dt*1.5,b.g.position.z+(1.6-b.g.position.z)*dt*.8);if(b.g.position.y>5.5)b.g.visible=false}});
    if(burden>0)burden=Math.min(1,burden+dt*.9);me.stoop+=(.32*burden-me.stoop)*Math.min(1,dt*3);straps.visible=burden>.05;
    if(doorA>0){doorA=Math.min(1,doorA+dt*.6);var de=sstep(0,1,doorA);doorL.rotation.y=1.45*de;doorR.rotation.y=-1.45*de;crack.material.opacity=.5+.5*de;crack.scale.setScalar(3+5*de);outL.intensity=1.4*de;sun.material.opacity=.7*de}
    jolt=Math.max(0,jolt-dt*.2);
    var vt=phase==='rest'?.05:.82-.7*sight-(doorA>0?.1*doorA:0);vig.material.opacity+=(vt-vig.material.opacity)*Math.min(1,dt*2);
    var day=Math.max(sight,doorA*.3),r=.07+.55*day,g2=.051+.48*day,b2=.039+.4*day;D.sc.background.setRGB(r,g2,b2);if(D.sc.fog){D.sc.fog.color.setRGB(r,g2,b2);D.sc.fog.density=.06*(1-.75*day)}
    D.light(.3+.65*day+(fireK>0?.06*Math.sin(t*9):0));
    glints.forEach(function(s){s.s.material.opacity=Math.max(0,Math.sin(t*1.7+s.p))*.6*day});
    walkHit.position.set(cx+(phase==='free'?onPath(Math.min(pathL,me.s+3)).x-cx:-Math.sin(me.a)*3),1.2,cz+(phase==='free'?onPath(Math.min(pathL,me.s+3)).z-cz:Math.cos(me.a)*3));
    me.x=cx;me.z=cz;
  });

  /* your eyes: along the beam's circle as you push it; then down the way to the door and the water */
  var lk={x:0,y:0,z:0};
  D.camFn=function(cam,dt){
    var ex=me.x,ez=me.z,ey=1.58-me.stoop+(reduce?0:Math.abs(Math.sin(D.time*(phase==='free'?7:4)))*.03*Math.min(1,Math.abs(me.v)));
    var fx,fz,down=.2;
    if(phase==='free'||phase==='rest'){var pp=onPath(Math.min(pathL,me.s+.6));fx=pp.dx;fz=pp.dz;down=phase==='rest'?.45:.08}else{fx=-Math.sin(me.a);fz=Math.cos(me.a)}
    if(phase==='rest')ey-=.6*sstep(0,1.5,restT);
    var yaw=Math.atan2(fx,-fz)+(D.yaw||0)+look+(phase==='mill'||phase==='call'?.28:0);yawS+=wrapA(yaw-yawS)*Math.min(1,dt*4);
    var j=reduce?0:jolt;cam.position.set(ex+(Math.random()-.5)*j,ey+(Math.random()-.5)*j,ez+(Math.random()-.5)*j);
    cam.lookAt(ex+Math.sin(yawS)*4,ey-down*4+(phase==='release'?.6*sstep(2,3.6,relT):0),ez-Math.cos(yawS)*4);
    cam.fov=cam.aspect<.85?72:60;cam.updateProjectionMatrix();lampL.position.set(ex,ey+.4,ez);
    var hh=Math.tan(cam.fov*PI/360),vh=2*.5*hh*1.08;vig.scale.set(vh*(cam.aspect||1)*1.08,vh,1);
    try{cam.updateMatrixWorld();beam.updateMatrixWorld(true);var bound=phase==='mill'||phase==='call'||phase==='release'&&relT<1.8;
      arms.forEach(function(g,n){g.visible=bound;if(!bound)return;cam.localToWorld(tmpV.set(n?.24:-.24,-.36,.04));beam.localToWorld(tmpH.set(HX[n?0:1],1.2,0));
        g.position.copy(tmpV);g.lookAt(tmpH);g.scale.set(1,1,tmpV.distanceTo(tmpH))})}catch(_){}
  };
  D._gf=function(){return {stage:phase,laps:+me.laps.toFixed(2),s:+me.s.toFixed(1),cord:+cordK.toFixed(1),burden:+burden.toFixed(1),bees:beeK>0}};
  D.fpCleanup=function(){
    live=false;buzzOff(.1);
    try{window.removeEventListener('keydown',kd,true);window.removeEventListener('keyup',ku,true);window.removeEventListener('pointerdown',pd,true);window.removeEventListener('pointermove',pm,true);
      window.removeEventListener('pointerup',pu,true);window.removeEventListener('pointercancel',pu,true)}catch(_){}
    try{cam.remove(vig);cam.remove(straps)}catch(_){}
    D.sc.fog=null;D.sc.background=D.sky;D.floor.visible=true;D.camFn=null;cam.fov=45;try{cam.updateProjectionMatrix()}catch(_){}
  };
};
})();
