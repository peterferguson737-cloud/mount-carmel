/* The Ascent's prologue, as a feature lantern: "The Voices in the Valley".
   John writes because many souls start toward God and stall in the dark: they don't understand the night they are led into,
   and the people they ask make it worse. Like Job's friends, some advisers call it melancholy, or hidden sin, or tell the soul
   to go back to the ways of prayer it has outgrown. And some souls resist God like a child kicking while its mother tries to
   carry it. So:
   A night valley. A narrow path leads up toward the dark mountain. Three campfires burn beside it, each with a seated figure.
   Walk near one and its voice tugs you sideways toward its warm fire; give in and sit, and you are sent back down the path.
   Past the fires a guide with a lantern waits, and walks on ahead of you. The path ends under a cliff you cannot climb. Stop
   pushing, and a great gentle light lifts you up it; press to move while you're being lifted and you kick, and slip back.
   Controls as on the mountain: W or ↑ to walk, S or ↓ back, A and D (or ← →) to step aside, Shift to hurry, Space to hop;
   on a phone, drag to walk, tap to hop. Drag with the mouse to look around. Words only in the typed bubble. */
(function(){
'use strict';
var X=window.ASCENT;if(!X||!X.MECH)return;
var MECH=X.MECH,reduce=X.reduce;

MECH.prologuefp=function(D,sp){
  var T=D.T,q=D.q,st=D.stage,cam=D.cam,PI=Math.PI,TAU=PI*2,i;
  D.setUsed=true;D.floor.visible=false;
  var BG=0x1c130e;D.sc.background=new T.Color(BG);D.sc.fog=new T.FogExp2(BG,.028);
  var touch=!!(window.matchMedia&&window.matchMedia('(pointer:coarse)').matches);
  var items=sp.items||[],said={};
  function clamp(v,a,b){return v<a?a:v>b?b:v}
  function sstep(a,b,v){v=clamp((v-a)/(b-a),0,1);return v*v*(3-2*v)}
  function wrapA(a){while(a>PI)a-=TAU;while(a<-PI)a+=TAU;return a}
  function rand(a,b){return a+Math.random()*(b-a)}

  /* ── the one place words appear: the typed bubble, one sentence at a time ── */
  var LQ=[],lHold=0;
  function show(o){if(o.n!=null){if(!said[o.n]){said[o.n]=1;var it=items[o.n];D.say(it?it[0]:'',o.s)}else D.hint(o.s)}else D.hint(o.s);lHold=o.s.length*.045+(o.hold||1.4)}
  function line(s,n,hold){LQ.push({s:s,n:n,hold:hold})}
  function now(s,n,hold){LQ.length=0;show({s:s,n:n,hold:hold})}
  function itemText(n,fb){var it=items[n];return it&&it[1]?it[1]:fb}

  /* ── input, as on the mountain ── */
  var live=true,kb={f:0,b:0,l:0,r:0,run:0},joy=null,jf=0,jl=0,sf=0,sl=0,touchT=0;
  var KM={KeyW:'f',ArrowUp:'f',KeyS:'b',ArrowDown:'b',KeyA:'l',ArrowLeft:'l',KeyD:'r',ArrowRight:'r',ShiftLeft:'run',ShiftRight:'run'};
  function kd(e){if(!live||e.metaKey||e.ctrlKey||e.altKey)return;wake();if(e.code==='Space'){hop();e.preventDefault();e.stopPropagation();return}var k=KM[e.code];if(k){kb[k]=1;e.preventDefault();e.stopPropagation()}}
  function ku(e){var k=KM[e.code];if(k){kb[k]=0;if(live){e.preventDefault();e.stopPropagation()}}}
  function dz(v){var a=Math.abs(v)-12;return a<=0?0:Math.sign(v)*Math.min(1,a/95)}
  function pd(e){if(!live)return;wake();if(e.pointerType==='mouse'||joy)return;e.stopPropagation();joy={id:e.pointerId,ox:e.clientX,oy:e.clientY,t:Date.now(),m:0}}
  function pm(e){if(!joy||e.pointerId!==joy.id)return;e.stopPropagation();joy.m=Math.max(joy.m,Math.abs(e.clientX-joy.ox)+Math.abs(e.clientY-joy.oy));jf=-dz(e.clientY-joy.oy);jl=dz(e.clientX-joy.ox)}
  function pu(e){if(!joy||e.pointerId!==joy.id)return;e.stopPropagation();if(joy.m<12&&Date.now()-joy.t<300)hop();joy=null;jf=jl=0}
  try{window.addEventListener('keydown',kd,true);window.addEventListener('keyup',ku,true);window.addEventListener('pointerdown',pd,true);window.addEventListener('pointermove',pm,true);
    window.addEventListener('pointerup',pu,true);window.addEventListener('pointercancel',pu,true)}catch(_){}

  /* ── sound ── */
  var actx=null,nb=null,crack=null;
  function soundOn(){try{var b=document.querySelector('.snd');return !b||!b.getAttribute||b.getAttribute('aria-pressed')!=='false'}catch(_){return true}}
  function wake(){if(!soundOn())return;try{actx=actx||new (window.AudioContext||window.webkitAudioContext)();if(actx.state==='suspended')actx.resume()}catch(_){}}
  function ac(){return soundOn()?actx:null}
  function note(f,when,dur,type,vol,drop){var a=ac();if(!a){D.tone(f,dur,when||0);return}try{var t=a.currentTime+(when||0),o=a.createOscillator(),g=a.createGain();o.type=type||'sine';o.frequency.setValueAtTime(f,t);if(drop)o.frequency.exponentialRampToValueAtTime(f*drop,t+dur);
    g.gain.setValueAtTime(.0001,t);g.gain.linearRampToValueAtTime(vol||.05,t+.02);g.gain.exponentialRampToValueAtTime(.0001,t+dur);o.connect(g);g.connect(a.destination);o.start(t);o.stop(t+dur+.05)}catch(_){}}
  function hiss(dur,freq,vol,type){var a=ac();if(!a)return;try{if(!nb){nb=a.createBuffer(1,a.sampleRate,a.sampleRate);var d=nb.getChannelData(0);for(var k=0;k<d.length;k++)d[k]=Math.random()*2-1}
    var t=a.currentTime,s=a.createBufferSource(),f=a.createBiquadFilter(),g=a.createGain();s.buffer=nb;s.loop=true;f.type=type||'bandpass';f.frequency.value=freq;g.gain.setValueAtTime(.0001,t);g.gain.linearRampToValueAtTime(vol,t+Math.min(.05,dur*.3));g.gain.exponentialRampToValueAtTime(.0001,t+dur);
    s.connect(f);f.connect(g);g.connect(a.destination);s.start(t);s.stop(t+dur+.05)}catch(_){}}

  /* ── the valley: a winding path in the dark, the mountain ahead ── */
  var L=84,HALF=1.5;
  function px(s){return 2.6*Math.sin(s*.055)+1.2*Math.sin(s*.13+1)}
  function py(s){return s*.06+Math.max(0,s-60)*.05}
  function ptAt(s){s=clamp(s,-4,L+2);var a=px(s-.5),b=px(s+.5),h=Math.atan2(b-a,1);return {x:px(s),y:py(s),z:-s,h:h}}
  function ground(x,z){var s=-z,c=px(s),off=Math.abs(x-c);return py(s)+Math.max(0,off-HALF-1)*.18+(off>HALF+1?Math.sin(x*.4)*Math.cos(z*.3)*.5:0)}
  /* ground: a field of rows following the path, with a paler strip for the path itself */
  (function(){var pos=[],col=[],idx=[],W=60,nx=40,ns=110,a,b;
    for(b=0;b<=ns;b++){var s=-10+b*(L+22)/ns;for(a=0;a<=nx;a++){var off=-W/2+a*W/nx,c=px(s),x=c+off*(Math.abs(off)<4?1:1),z=-s,y=ground(x,z);pos.push(x,y,z);
      var k=Math.abs(off)<HALF?1:Math.abs(off)<HALF+.8?.55:0,sh=.75+.25*Math.random();col.push((.32+.25*k)*sh,(.24+.2*k)*sh,(.18+.15*k)*sh)}}
    for(b=0;b<ns;b++)for(a=0;a<nx;a++){var i0=b*(nx+1)+a,i1=i0+1,i2=i0+nx+1,i3=i2+1;idx.push(i0,i2,i1,i1,i2,i3)}
    var g=new T.BufferGeometry();g.setAttribute('position',new T.Float32BufferAttribute(pos,3));g.setAttribute('color',new T.Float32BufferAttribute(col,3));g.setIndex(idx);g.computeVertexNormals();
    var m=new T.Mesh(g,new T.MeshStandardMaterial({vertexColors:true,roughness:1}));m.receiveShadow=true;st.add(m)})();
  var inkM=new T.MeshStandardMaterial({color:0x241812,roughness:1});
  for(i=0;i<90;i++){var ts=rand(-6,L+6),side=Math.random()<.5?-1:1,off=side*rand(HALF+5,28),tx=px(ts)+off,tz=-ts,th=rand(2,5);
    var tr=new T.Mesh(new T.ConeGeometry(th*.26,th,7),inkM);tr.position.set(tx,ground(tx,tz)+th/2-.1,tz);st.add(tr)}
  for(i=0;i<40;i++){var rs=rand(-4,L),ro=(Math.random()<.5?-1:1)*rand(HALF+.6,9),rx=px(rs)+ro,rz=-rs,rr=rand(.2,.7),rk=new T.Mesh(new T.DodecahedronGeometry(rr,0),inkM);rk.position.set(rx,ground(rx,rz)+rr*.4,rz);rk.rotation.set(rand(0,3),rand(0,3),0);st.add(rk)}
  /* the mountain, dark ahead, and the cliff at the path's end */
  var mtn=new T.Mesh(new T.ConeGeometry(70,70,40),new T.MeshStandardMaterial({color:0x2a1d16,roughness:1}));mtn.position.set(0,35+py(L)-6,-L-62);st.add(mtn);
  /* the cliff: a wall of rock blocks whose fronts stand a clear step beyond the path's end, all topped flat by the ledge */
  var CL=py(L),cliff=q.G();cliff.position.set(px(L),CL,-L-1.6);st.add(cliff);var rockC=new T.MeshStandardMaterial({color:0x4a3628,roughness:1,flatShading:true});
  for(i=0;i<8;i++){var cw=rand(4,6),ch=rand(10.2,11),cd=rand(8,11),cb=new T.Mesh(new T.BoxGeometry(cw,ch,cd),rockC);cb.position.set(-15+i*4.2,ch/2-.4,-cd/2-rand(0,.6));cb.rotation.y=rand(-.06,.06);cliff.add(cb)}
  var ledge=q.G();ledge.position.set(px(L),CL+10.9,-L-8);st.add(ledge);q.b(ledge,34,.5,13,0,-.25,0,'s');
  var stars=[];for(i=0;i<60;i++){var sg=D.glow(rand(.4,1.1));sg.material.fog=false;sg.position.set(rand(-90,90),rand(30,70),-L-rand(60,140));sg.material.opacity=rand(.2,.7);st.add(sg);stars.push(sg)}
  var moon=D.glow(26);moon.material.fog=false;moon.material.opacity=.35;moon.position.set(-40,48,-L-120);st.add(moon);

  /* ── light: a cold, low moon, and the warm fires ── */
  var hemi=null,hemi0=0,sun=D.sun,sun0=null;D.sc.children.forEach(function(c){if(c.isHemisphereLight)hemi=c});if(hemi){hemi0=hemi.intensity;hemi.intensity=.12}
  if(sun){var sc0=sun.shadow.camera;sun0={p:sun.position.clone(),i:sun.intensity,c:sun.color.getHex(),l:sc0.left,r:sc0.right,t:sc0.top,b:sc0.bottom,n:sc0.near,f:sc0.far};sun.intensity=.28;sun.color.setHex(0xcfd8e8);D.sc.add(sun.target);
    sc0.left=-14;sc0.right=14;sc0.top=14;sc0.bottom=-14;sc0.near=2;sc0.far=120;sc0.updateProjectionMatrix()}

  /* ── the three voices: a seated figure by a fire, each off the path to one side ── */
  var VO=[{s:15,sd:-1,n:0,txt:"It's only melancholy."},{s:31,sd:1,n:1,txt:"You must have a hidden sin."},{s:47,sd:-1,n:2,txt:"Go back to how you used to pray."}];
  VO.forEach(function(v){var p=ptAt(v.s),x=p.x+v.sd*5.2,z=p.z,y=ground(x,z);v.x=x;v.z=z;
    var g=q.G();g.position.set(x,y,z);st.add(g);v.g=g;
    for(var k=0;k<7;k++){var a=k/7*TAU;q.s(g,.16,Math.cos(a)*.45,.08,Math.sin(a)*.45,'d',.6)}
    v.fl=q.fl(g,0,.05,0,1.1);v.gl=D.glow(9,0xffd9a8);v.gl.position.y=1;v.gl.material.opacity=.55;g.add(v.gl);
    v.light=new T.PointLight(0xffc890,1.1,14,1.6);v.light.position.set(0,1.2,0);g.add(v.light);
    var fig=q.f(g,v.sd*.9,-.2,.95,v.sd>0?-PI/2:PI/2);fig.scale.y=.8;v.fig=fig;q.b(g,.9,.35,.5,v.sd*.9,.17,-.2,'w');
    v.met=false;v.out=false;v.dim=0});

  /* ── each voice speaks in its own bubble, over the figure by the fire, typed a letter at a time ── */
  var BUB=[];
  function speak(v,txt){
    var c=document.createElement('canvas');c.width=1024;c.height=300;var g=c.getContext&&c.getContext('2d');if(!g||!g.fillText)return;
    var tex=new T.CanvasTexture(c),sp=new T.Sprite(new T.SpriteMaterial({map:tex,transparent:true,depthTest:false,depthWrite:false,fog:false,opacity:0}));
    sp.renderOrder=5;sp.scale.set(4.6,4.6*300/1024,1);sp.position.set(v.sd*.9,2.9,-.2);v.g.add(sp);
    var b={sp:sp,g:g,c:c,tex:tex,txt:txt,n:-1,t:0,v:v,out:false};BUB.push(b);draw(b,0)}
  /* drawn to match the typed bubble at eye level: cream pill, dark ink rim, bold spaced capitals */
  function draw(b,n){var g=b.g,F='px "Quicksand","Trebuchet MS",sans-serif',T2=b.txt.toUpperCase(),SP=7,k,full=0,x;
    g.clearRect(0,0,1024,300);g.font='700 44'+F;for(k=0;k<T2.length;k++)full+=g.measureText(T2.charAt(k)).width+SP;full-=SP;
    var w=Math.min(1000,full+110),h=124,x0=(1024-w)/2,y0=(300-h)/2,r=h/2;
    g.save();g.shadowColor='rgba(255,236,204,.75)';g.shadowBlur=36;g.fillStyle='rgba(58,42,32,.62)';rrect(g,x0-7,y0-7,w+14,h+14,r+7);g.fill();g.restore();g.fillStyle='rgba(246,241,231,.8)';rrect(g,x0,y0,w,h,r);g.fill();
    g.fillStyle='#2a1d16';g.textAlign='left';g.textBaseline='middle';x=512-full/2;for(k=0;k<n;k++){var ch=T2.charAt(k);g.fillText(ch,x,y0+h/2+2);x+=g.measureText(ch).width+SP}
    b.tex.needsUpdate=true}
  function rrect(g,x,y,w,h,r){g.beginPath();g.moveTo(x+r,y);g.arcTo(x+w,y,x+w,y+h,r);g.arcTo(x+w,y+h,x,y+h,r);g.arcTo(x,y+h,x,y,r);g.arcTo(x,y,x+w,y,r);g.closePath()}
  function bubbles(dt){BUB.forEach(function(b){b.t+=dt;var n=Math.min(b.txt.length,Math.floor(b.t*26));if(n!==b.n){if(n>b.n&&/[A-Za-z]/.test(b.txt.charAt(n-1))&&n%2)note(330+(n%5)*30,0,.04,'sine',.016);b.n=n;draw(b,n)}
    var gone=b.out||b.t>b.txt.length/26+3.2||me.s>b.v.s+6,m=b.sp.material,breathe=reduce?1:.86+.14*Math.sin(b.t*1.3);m.opacity+=((gone?0:breathe)-m.opacity)*Math.min(1,dt*(gone?3:8));
    if(gone&&m.opacity<.02&&b.sp.parent){b.sp.parent.remove(b.sp);b.dead=true}});BUB=BUB.filter(function(b){return !b.dead})}

  /* ── the guide: a figure with a lantern, waiting in the dark beyond the fires ── */
  var guide=q.G();st.add(guide);q.f(guide,0,0,1.05,0);var gpole=q.c(guide,.025,.025,1.7,.32,.85,0,'w'),glamp=q.G();glamp.position.set(.32,1.75,0);guide.add(glamp);q.b(glamp,.2,.24,.2,0,0,0,'l');
  var gglow=D.glow(6,0xfff0d0);gglow.material.opacity=.6;glamp.add(gglow);var glight=new T.PointLight(0xfff0d8,.9,16,1.6);glamp.add(glight);
  var gs=55,gTarget=55,gA=0,gMats=[];guide.visible=false;
  /* he comes out of the dark slowly: every part of him, and his light, fades in */
  guide.traverse(function(o){if(o.isMesh&&o.material){o.material=o.material.clone();o.material.transparent=true;o.material.opacity=0;gMats.push(o.material)}});
  function guideAlpha(a){gMats.forEach(function(m){m.opacity=a;m.depthWrite=a>.98});gglow.material.opacity=.6*a;glight.intensity=.9*a}guideAlpha(0);

  /* ── the mother's light: the great gentle presence that lifts the soul up the cliff ── */
  var arms=q.G();arms.visible=false;st.add(arms);var big=D.glow(18,0xfff4e0);big.material.opacity=0;arms.add(big);
  var cup=new T.Mesh(new T.TorusGeometry(1.1,.18,10,48),new T.MeshBasicMaterial({color:0xfff4e0,transparent:true,opacity:0,fog:false}));cup.rotation.set(-PI/2,0,0);arms.add(cup);

  /* ── John, small, from behind ── */
  var john=null;try{john=X.john&&X.john()}catch(_){john=null}
  var jg=john?john.g:q.f(st,0,0,1.6,0);if(john)st.add(jg);var JS=.55,jy=0,jvy=0;
  try{if(john&&john.lamp&&john.lamp.light){john.lamp.light.intensity*=.7}}catch(_){}
  function hop(){if(jy<=0&&phase==='walk'&&!fade){jvy=8;jy=.001;note(520,0,.07,'sine',.03);note(780,.06,.1,'sine',.03)}}

  var curtain=new T.Sprite(new T.SpriteMaterial({color:BG,transparent:true,opacity:0,depthTest:false,depthWrite:false,fog:false}));curtain.renderOrder=999;curtain.position.z=-.5;curtain.scale.set(4,4,1);cam.add(curtain);

  /* ── state ── */
  var me={s:-2,lat:0,v:0,lv:0},phase='walk',fade=null,lift=0,still=0,kicks=0,endT=0,faceS=0,yawS=0,pitS=.42,distS=9,stepT=0,sent=0;
  var auto=0,walkHit=D.hit(st,0,1.2,-2,1.2,function(){wake();auto=D.time+1.5});
  now('Many start toward God, and stall in the dark.',null,1);line(touch?'Drag to walk.':'W or ↑ to walk.');

  D.onUpdate(function(t,dt){
    dt=Math.min(dt,.05);var e8=1-Math.exp(-dt*8);sf+=(jf-sf)*e8;sl+=(jl-sl)*e8;
    var inF=(kb.f?1:0)-(kb.b?1:0),fwd=inF||(Math.abs(sf)>.03?Math.pow(Math.abs(sf),1.4)*Math.sign(sf):0),side=((kb.r?1:0)-(kb.l?1:0))||(Math.abs(sl)>.03?sl:0);
    /* a tap or click on the path ahead walks you on, keeping to the middle */
    if(!inF&&!joy&&auto>D.time&&phase==='walk'){fwd=1;side=clamp(-me.lat*1.5,-1,1)}
    var pushing=(Math.abs(fwd)>.05||Math.abs(side)>.05)&&!(auto>D.time);
    if(phase!=='walk'||fade){fwd=phase==='walk'?0:fwd;side=phase==='walk'?0:side}
    var hurry=kb.run||Math.abs(sf)>.88;

    if(phase==='walk'&&!fade){
      /* the nearest fire tugs you toward it, and slows you, while you're beside it */
      var pull=0,slow=1,near=null;
      VO.forEach(function(v){var d=me.s-v.s;if(d>-7&&d<5&&!v.out){var k=1-Math.abs(d+1)/6;if(k>0){pull+=v.sd*k*1.35;slow=Math.min(slow,1-.45*k);near=v}}
        if(!v.met&&d>-6){v.met=true;speak(v,v.txt);LQ.length=0;lHold=v.txt.length/26+.8;line(itemText(v.n,''),v.n,1.6)}
        if(!v.out&&d>6){v.out=true;note(330,0,.6,'sine',.025);if(v.n===2)line('Keep to the path, even in the dark.')}});
      var tv=fwd*3.2*(hurry?1.55:1)*slow;me.v+=(tv-me.v)*Math.min(1,dt*(Math.abs(tv)>Math.abs(me.v)?6:9));me.s+=me.v*dt;
      me.lv+=((side*2.6+pull)-me.lv)*Math.min(1,dt*4);me.lat+=me.lv*dt;
      /* give in to a fire and sit down: you're sent back down the path */
      if(near&&Math.abs(me.lat)>HALF+1.6&&Math.sign(me.lat)===near.sd){fade={t:0,to:Math.max(-2,near.s-14)};sent++;now('Sit by their fire, and you lose the road.',null,.8);if(sent===1)line(touch?'Drag away from the fire as you pass.':'Step away from the fire as you pass: A or D.',null,1.4);note(196,0,1.2,'triangle',.035,.75)}
      me.lat=clamp(me.lat,-HALF-1.8,HALF+1.8);if(!near)me.lat=clamp(me.lat,-HALF,HALF);
      me.s=clamp(me.s,-3,L-.6);
      if(Math.abs(me.v)>.3){stepT-=dt*Math.abs(me.v)*1.3;if(stepT<=0){stepT=1;hiss(.05,900,.018)}}
      /* the guide */
      if(me.s>VO[2].s+7&&!guide.visible){guide.visible=true;gs=Math.max(me.s+11,58);gA=0;now(itemText(3,'One who knows the night walks ahead.'),3,1);line('Follow his light.')}
      if(guide.visible){gTarget=Math.min(L-2.2,Math.max(gs,me.s+6));gs+=(gTarget-gs)*Math.min(1,dt*1.2)}
      /* the end of the path: the cliff */
      if(me.s>=L-.8){phase='cliff';me.v=0;still=0;now("You can't climb this yourself.",null,.8);line('Stop. Be still.',null,1)}
    }
    if(fade){fade.t+=dt;curtain.material.opacity=fade.t<.7?fade.t/.7:Math.max(0,1-(fade.t-1)/.7);
      if(fade.t>=.7&&fade.to!=null){me.s=fade.to;me.lat=0;me.v=me.lv=0;fade.to=null;yawS=0}
      if(fade.t>1.8){fade=null;curtain.material.opacity=0}}

    /* being carried: only while you're still. Kick, and you slip back */
    if(phase==='cliff'||phase==='lift'){
      if(!pushing)still+=dt;else still=0;
      if(phase==='cliff'&&still>1.1){phase='lift';arms.visible=true;note(262,0,2.4,'sine',.045);note(392,.2,2.4,'sine',.035);now(itemText(4,'Stop kicking. Let yourself be carried.'),4,1.2)}
      if(phase==='lift'){
        if(pushing&&lift<.98){lift=Math.max(0,lift-dt*.5);K_shake=.5;if(!kick){kick=true;kicks++;note(150,0,.3,'triangle',.04);if(kicks<3)now("Don't kick. Be carried.",null,.6)}}else{kick=false;lift=Math.min(1,lift+dt*.16)}
        big.material.opacity+=((.55+.2*lift)-big.material.opacity)*Math.min(1,dt*2);cup.material.opacity=big.material.opacity*.7;
        if(lift>=1&&!endT){endT=.001;note(392,0,1.6,'sine',.04);note(523,.25,1.8,'sine',.035);note(659,.5,2.2,'sine',.03);
          line('He writes for those who will be stripped of everything.',null,1.4);line('Here the climb begins.',null,1.6)}}}
    if(endT){endT+=dt;if(endT>2.5&&!LQ.length&&lHold<=0&&!D.finished){live=false;D.done()}}

    bubbles(dt);
    if(lHold>0)lHold-=dt;else if(LQ.length)show(LQ.shift());

    /* place John */
    var p=ptAt(me.s),ex=p.x+me.lat,ez=p.z,ey=ground(ex,ez);
    /* carried up the face of the cliff, never into it: straight up in front of the rock, then over the edge onto the ledge */
    if(phase==='lift'){var a=ptAt(L),z0=ez,y0=ground(ex,z0),u1=sstep(0,.68,lift),u2=sstep(.68,1,lift),topY=CL+12.2;
      ex=ex+(a.x-ex)*u1;ey=y0+(topY-y0)*u1-(topY-(CL+10.9))*u2+Math.sin(u2*PI)*.5;ez=z0+(-L-5.2-z0)*u2;
      if(kick&&!reduce)ex+=Math.sin(t*40)*.06}
    if(jy>0){jvy-=24*dt;jy+=jvy*dt;if(jy<=0){jy=0;jvy=0}}
    var wk=Math.min(1,Math.abs(me.v)/2);jg.position.set(ex,ey+jy+(reduce||phase!=='walk'?0:Math.abs(Math.sin(t*9))*.06*wk),ez);jg.scale.setScalar(JS);
    var face=p.h+(me.v<-.2?PI:0)+(Math.abs(side)>.1&&Math.abs(me.v)<.3&&phase==='walk'?side*PI/2:0);faceS+=wrapA(face-faceS)*Math.min(1,dt*10);jg.rotation.y=Math.atan2(Math.sin(faceS),-Math.cos(faceS));
    arms.position.set(ex,ey+.1,ez);cup.position.set(0,-.05,0);big.position.set(0,1.2,0);
    if(sun){sun.target.position.set(ex,ey,ez);sun.position.set(ex-30,ey+40,ez-20)}
    /* the guide walks ahead, his light swinging */
    if(guide.visible){if(gA<1){gA=Math.min(1,gA+dt*.45);guideAlpha(gA*gA*(3-2*gA))}var gp=ptAt(gs);guide.position.set(gp.x,ground(gp.x,gp.z),gp.z);guide.rotation.y=PI;glamp.rotation.z=Math.sin(t*2.2)*.12}
    /* fires flicker; the passed ones die down */
    VO.forEach(function(v){v.dim+=((v.out?1:0)-v.dim)*Math.min(1,dt*.8);var fl=1+(reduce?0:Math.sin(t*11+v.s)*.08+Math.sin(t*17.3+v.s)*.05);v.light.intensity=1.1*fl*(1-.85*v.dim);v.gl.material.opacity=.55*fl*(1-.8*v.dim);v.fl.scale.setScalar(1.1*(1-.6*v.dim))});
    walkHit.position.set(ptAt(me.s+4).x,ptAt(me.s+4).y+1.2,-(me.s+4));
    me.ex=ex;me.ey=ey;me.ez=ez;me.h=p.h;
    K_shake*=Math.exp(-dt*6);
  });
  var K_shake=0,kick=false;

  /* the camera follows behind and above, as on the mountain; at the cliff it pulls back to watch you carried up */
  D.camFn=function(cam,dt){
    var ex=me.ex||0,ez=me.ez==null?2:me.ez,ey=me.ey||0,up=phase!=='walk',dist=up?16:(cam.aspect<.85?9:7.5);
    var yaw=(me.h||0)+(D.yaw||0)+(up?.5:0);yawS+=wrapA(yaw-yawS)*Math.min(1,dt*3);
    var e=Math.min(1,dt*1.4);pitS+=((up?.32:.4)-pitS)*e;distS+=(dist-distS)*e;
    var hd=distS*Math.cos(pitS),cx=ex-Math.sin(yawS)*hd,cz=ez+Math.cos(yawS)*hd,cy=ey+1+distS*Math.sin(pitS),gy=ground(cx,cz)+.8;if(cy<gy)cy=gy;
    var sk=reduce?0:K_shake*.08;cam.position.set(cx+(Math.random()-.5)*sk,cy+(Math.random()-.5)*sk,cz);cam.lookAt(ex,ey+(up?2.5:1.1),ez-(up?3:0));
    cam.fov=cam.aspect<.85?66:54;cam.far=Math.max(cam.far||0,600);cam.updateProjectionMatrix();
  };
  D._gf=function(){return {stage:phase,s:+me.s.toFixed(1),lat:+me.lat.toFixed(2),lift:+lift.toFixed(2),sent:sent,kicks:kicks,guide:guide.visible}};
  D.fpCleanup=function(){
    live=false;
    try{window.removeEventListener('keydown',kd,true);window.removeEventListener('keyup',ku,true);window.removeEventListener('pointerdown',pd,true);window.removeEventListener('pointermove',pm,true);
      window.removeEventListener('pointerup',pu,true);window.removeEventListener('pointercancel',pu,true)}catch(_){}
    try{cam.remove(curtain)}catch(_){}
    if(hemi)hemi.intensity=hemi0;if(sun&&sun0){var c0=sun.shadow.camera;sun.position.copy(sun0.p);sun.target.position.set(0,0,0);sun.intensity=sun0.i;sun.color.setHex(sun0.c);c0.left=sun0.l;c0.right=sun0.r;c0.top=sun0.t;c0.bottom=sun0.b;c0.near=sun0.n;c0.far=sun0.f;c0.updateProjectionMatrix()}
    D.sc.fog=null;D.sc.background=D.sky;D.floor.visible=true;D.camFn=null;cam.fov=45;cam.far=500;try{cam.updateProjectionMatrix()}catch(_){}
  };
};
})();
