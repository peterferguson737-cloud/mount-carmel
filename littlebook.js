/* Book One, chapter 12 — which desires do the harm — as The Little Book. A feature lantern.
   John answers a worry: which desires do all this damage? Only a grave sin embraced cuts the soul off from grace altogether.
   But every desire the will consents to, however small, does every harm in its degree (it tires, torments, darkens, stains
   and weakens), and each kind chiefly one: gluttony makes lukewarm, avarice brings misery, vainglory blinds, the flesh
   stains. Its sweetness comes first and its bitterness after, like the little book the angel gave St John on Patmos: sweet
   in the mouth, bitter in the belly. And stirrings the will does not consent to do no harm at all; refused, they make the
   soul stronger, for power is made perfect in weakness.
   So: a night shore on Patmos, a mighty angel with one foot on the sea and one on the land, and you with a lantern. Sweet
   thoughts rise round you unasked, and your lantern does not mind them. Sweet things wait on the path: tap one and taste
   it, or walk on past it, and watch your light. Controls: hold W, the up arrow or Space (or press and hold) to walk on, tap a
   thing to take it, A and D to look about. */
(function(){
'use strict';
var X=window.ASCENT;if(!X||!X.MECH)return;
var MECH=X.MECH,keys=X.keys,reduce=X.reduce;

MECH.s13fp=function(D,sp){
  var T=D.T,q=D.q,M=q.M,st=D.stage,cam=D.cam,PI=Math.PI,TAU=PI*2,i;
  D.setUsed=true;D.floor.visible=false;
  D.sc.background=new T.Color(0x15110d);D.sc.fog=new T.FogExp2(0x15110d,.016);
  var touch=!!(window.matchMedia&&window.matchMedia('(pointer:coarse)').matches);
  var items=sp.items||[],said={};function say(n){if(said[n])return;said[n]=1;var it=items[n];if(it)D.say(it[0],it[1])}
  function rand(a,b){return a+Math.random()*(b-a)}
  function clamp(v,a,b){return v<a?a:v>b?b:v}
  function sstep(a,b,v){v=clamp((v-a)/(b-a),0,1);return v*v*(3-2*v)}
  var HOLD=touch?'press and hold':'keep walking (W, ↑ or Space)';

  /* ── input: hold Space or press and hold to walk on; tap a thing to take it ── */
  var live=true,ptrHold=null,tapHold=0;
  var WK={Space:1,KeyW:1,ArrowUp:1},down={};

  function onSweet(e){try{var cv=document.getElementById('scene'),rc=cv.getBoundingClientRect(),h=D.pick((e.clientX-rc.left)/rc.width*2-1,-((e.clientY-rc.top)/rc.height)*2+1);return !!(h&&h.userData.sweet)}catch(_){return false}}
  /* W, the up arrow or Space walk you forward */
  function kd(e){if(!live||!WK[e.code]||e.metaKey||e.ctrlKey||e.altKey)return;wake();e.preventDefault();e.stopPropagation();down[e.code]=1}
  function ku(e){if(!WK[e.code])return;down[e.code]=0;if(live){e.preventDefault();e.stopPropagation()}}
  function pd(e){if(!live)return;wake();if(onSweet(e))return;ptrHold={id:e.pointerId,t:D.time}}
  function pu(e){if(ptrHold&&e.pointerId===ptrHold.id)ptrHold=null}
  try{window.addEventListener('keydown',kd,true);window.addEventListener('keyup',ku,true);window.addEventListener('pointerdown',pd,true);window.addEventListener('pointerup',pu,true);window.addEventListener('pointercancel',pu,true)}catch(_){}
  function holding(){return !!(down.Space||down.KeyW||down.ArrowUp)||!!(ptrHold&&D.time-ptrHold.t>.12)||D.time<tapHold}

  /* ── sound ── */
  var actx=null,nb=null;
  function soundOn(){try{var b=document.querySelector('.snd');return !b||!b.getAttribute||b.getAttribute('aria-pressed')!=='false'}catch(_){return true}}
  function wake(){if(!soundOn())return;try{actx=actx||new (window.AudioContext||window.webkitAudioContext)();if(actx.state==='suspended')actx.resume()}catch(_){}}
  function ac(){wake();return soundOn()?actx:null}
  function note(f,when,dur,type,vol,drop){var a=ac();if(!a){D.tone(f,dur,when||0);return}try{var t=a.currentTime+(when||0),o=a.createOscillator(),g=a.createGain();o.type=type||'sine';o.frequency.setValueAtTime(f,t);if(drop)o.frequency.exponentialRampToValueAtTime(f*drop,t+dur);
    g.gain.setValueAtTime(.0001,t);g.gain.linearRampToValueAtTime(vol||.05,t+.02);g.gain.exponentialRampToValueAtTime(.0001,t+dur);o.connect(g);g.connect(a.destination);o.start(t);o.stop(t+dur+.05)}catch(_){}}
  function hiss(dur,freq,vol,type){var a=ac();if(!a)return;try{if(!nb){nb=a.createBuffer(1,a.sampleRate,a.sampleRate);var d=nb.getChannelData(0);for(var j=0;j<d.length;j++)d[j]=Math.random()*2-1}
    var t=a.currentTime,s=a.createBufferSource(),f=a.createBiquadFilter(),g=a.createGain();s.buffer=nb;s.loop=true;f.type=type||'bandpass';f.frequency.value=freq;g.gain.setValueAtTime(.0001,t);g.gain.linearRampToValueAtTime(vol,t+Math.min(.3,dur*.3));g.gain.exponentialRampToValueAtTime(.0001,t+dur);
    s.connect(f);f.connect(g);g.connect(a.destination);s.start(t);s.stop(t+dur+.05)}catch(_){}}
  function chord(fs,gap,type,vol,dur){fs.forEach(function(f,k){note(f,k*gap,dur,type,vol)})}
  function thunder(n){hiss(1.6,80+n*9,.11,'lowpass');note(52+n*4,0,1.3,'sawtooth',.03,.55);flash=1}

  /* ── soft textures ── */
  function radTex(inner,outer,a0,a1){var c=document.createElement('canvas');c.width=c.height=128;var g=c.getContext('2d'),gr=g.createRadialGradient(64,64,inner,64,64,outer);
    gr.addColorStop(0,a0);gr.addColorStop(1,a1);g.fillStyle=gr;g.fillRect(0,0,128,128);return new T.CanvasTexture(c)}
  var SOFT=radTex(0,64,'rgba(255,255,255,.9)','rgba(255,255,255,0)'),DARK=radTex(0,64,'rgba(0,0,0,.85)','rgba(0,0,0,0)'),VIG=radTex(26,92,'rgba(0,0,0,0)','rgba(0,0,0,1)');
  function overlay(tex,col,order,z){var s=new T.Sprite(new T.SpriteMaterial({map:tex,color:col,transparent:true,depthTest:false,depthWrite:false,opacity:0,fog:false}));s.renderOrder=order;s.position.z=z;cam.add(s);return s}

  /* ── the shore of Patmos: sand on the right under the cliffs, the sea on the left, a ramp up to the headland ── */
  var L=96,FACE=new T.Vector3(-15,74,-117);
  function px(s){return 2.8*Math.sin(s*.06)}
  function py(s){return s<70?0:Math.min(2,(s-70)*.1)}
  function hd(s){return Math.atan2(.168*Math.cos(s*.06),1)}
  var sea=new T.Mesh(new T.PlaneGeometry(700,700),new T.MeshStandardMaterial({color:0x221c16,roughness:.28,metalness:.3}));sea.rotation.x=-PI/2;sea.position.set(-80,-.35,-120);st.add(sea);
  q.b(st,60,.3,106,22,-.15,-38,'c');q.b(st,1.8,.3,106,-7.1,-.2,-38,'w');
  q.b(st,12,.4,20.2,-2.5,.8,-80,'s',0,0,Math.atan2(2,20));q.b(st,34,2,48,4,1,-114,'s');
  for(i=0;i<15;i++){var cz=8-i*7.6,ch=rand(4,10);q.b(st,rand(3,6),ch,rand(5,8),rand(10,14),(cz<-88?2:0)+ch/2,cz,'s',rand(-.5,.5))}
  for(i=0;i<18;i++){var lf=i%3===0,br=lf?rand(.25,.5):rand(.4,1.1);q.s(st,br,lf?rand(-6.6,-5):rand(4.6,8),br*.45,rand(4,-86),'s',.7,1,1.1)}
  var stars=[];for(i=0;i<48;i++){var el=rand(.12,1.3),az=rand(0,TAU),sg=D.glow(rand(1.2,2.4));sg.material.fog=false;sg.position.set(Math.cos(el)*Math.cos(az)*380,Math.sin(el)*380,-60+Math.cos(el)*Math.sin(az)*380);st.add(sg);stars.push({s:sg,p:rand(0,TAU),o:rand(.4,.85)})}
  var glints=[];for(i=0;i<16;i++){var gg=D.glow(rand(.5,1.4));gg.position.set(rand(-60,-9),-.3,rand(5,-110));st.add(gg);glints.push({s:gg,p:rand(0,TAU)})}
  var foam=[];for(i=0;i<16;i++){var fg=D.glow(rand(1.2,2));var fz=6-i*6;fg.position.set(-8.1+rand(-.3,.3),-.15,fz);st.add(fg);foam.push({s:fg,z:fz})}

  /* ── the mighty angel: feet as pillars of fire, one on the sea and one on the land; clothed with a cloud, a rainbow on his
        head, his face as the sun, the little book open in his hand (Apocalypse 10) ── */
  var ang=q.G();st.add(ang);var AM=[];
  function bm(col,op){var m=new T.MeshBasicMaterial({color:col,transparent:true,opacity:0,fog:false,depthWrite:false,side:T.DoubleSide});AM.push({m:m,o:op});return m}
  function ag(size,op,x,y,z,par){var g=D.glow(size);g.material.fog=false;g.material.opacity=0;g.position.set(x,y,z);(par||ang).add(g);AM.push({m:g.material,o:op});return g}
  function limb(A,B,r0,r1,mat){var g=q.G(),len=Math.hypot(B.x-A.x,B.y-A.y,B.z-A.z);g.position.set((A.x+B.x)/2,(A.y+B.y)/2,(A.z+B.z)/2);ang.add(g);try{g.lookAt(B.x,B.y,B.z)}catch(_){}
    var c=new T.Mesh(new T.CylinderGeometry(r1,r0,len,16,1,true),mat);c.rotation.x=PI/2;g.add(c);return g}
  var F1=new T.Vector3(6,2,-106),F2=new T.Vector3(-36,-.35,-128),H1=new T.Vector3(-11,44,-116),H2=new T.Vector3(-19,44,-118);
  var fireO=bm(0xfff0d0,.36),fireC=bm(0xffffff,.6);
  limb(F1,H1,2.6,1.7,fireO);limb(F1,H1,1.3,.8,fireC);limb(F2,H2,2.6,1.7,fireO);limb(F2,H2,1.3,.8,fireC);
  var flames=[];[[F1,H1],[F2,H2]].forEach(function(lg){for(var k=0;k<12;k++){var sz=rand(4,7),g=D.glow(sz);g.material.fog=false;g.material.opacity=0;ang.add(g);flames.push({s:g,F:lg[0],H:lg[1],u:k/12,sp:rand(.12,.22),sz:sz})}});
  ag(16,.8,F1.x,F1.y+1,F1.z);ag(16,.6,F2.x,.6,F2.z);
  for(i=0;i<8;i++){var e8=i/8;ag(6-e8*3,.22,F2.x+(-20-F2.x)*e8,-.3,F2.z+(-34-F2.z)*e8)}
  var clouds=[];for(i=0;i<26;i++){var cy=rand(40,68),cw=9-(cy-40)*.18,cs=new T.Sprite(new T.SpriteMaterial({map:SOFT,color:0xf2e8d8,transparent:true,depthWrite:false,opacity:0,fog:false})),csz=rand(9,15);
    cs.scale.set(csz,csz,1);var cx=-15+rand(-cw,cw);cs.position.set(cx,cy,-117+rand(-3,3));ang.add(cs);AM.push({m:cs.material,o:rand(.18,.32)});clouds.push({s:cs,p:rand(0,TAU),x:cx,y:cy})}
  var face=q.G();face.position.set(FACE.x,FACE.y,FACE.z);ang.add(face);try{face.lookAt(0,30,-40)}catch(_){}
  face.add(new T.Mesh(new T.CircleGeometry(4.6,32),bm(0xffffff,.95)));
  for(i=0;i<16;i++){var ray=new T.Mesh(new T.BoxGeometry(.45,9,.05),bm(0xfff4dc,.3)),ra=i/16*TAU;ray.position.set(Math.sin(ra)*9.5,Math.cos(ra)*9.5,-.2);ray.rotation.z=-ra;face.add(ray)}
  var faceGlow=ag(34,.85,0,0,-.5,face);
  [0xffffff,0xe6d6b8,0xc4b08c,0xfff0d0].forEach(function(c,k){var rb=new T.Mesh(new T.TorusGeometry(13+k*1.1,.5,6,48,PI),bm(c,.26-.04*k));rb.position.z=-1;face.add(rb)});
  var sleeve=bm(0xf4ecdc,.4);
  var armR=q.G();armR.position.set(-21,63,-117);ang.add(armR);var au=new T.Mesh(new T.CylinderGeometry(1.4,2.2,24,12,1,true),sleeve);au.position.y=12;armR.add(au);ag(7,.7,0,25,0,armR);armR.rotation.z=.95;
  limb(new T.Vector3(-9,64,-117),new T.Vector3(-2,57,-109),2.2,1.4,sleeve);
  var bk=q.G();bk.position.set(-1.6,57.6,-108.4);ang.add(bk);try{bk.lookAt(0,20,-40)}catch(_){}
  var pageM=bm(0xfff8e8,1),inkM=bm(0x6a5640,.5);
  [-1,1].forEach(function(sd){var pg=q.G();pg.rotation.y=-sd*.32;bk.add(pg);var p=new T.Mesh(new T.BoxGeometry(1.5,2,.06),pageM);p.position.x=sd*.76;pg.add(p);
    for(var k=0;k<5;k++){var ln=new T.Mesh(new T.BoxGeometry(1.05,.06,.01),inkM);ln.position.set(sd*.76,.6-k*.3,.04);pg.add(ln)}});
  var cover=new T.Mesh(new T.BoxGeometry(3.3,2.2,.05),bm(0x5a4632,1));cover.position.z=-.25;bk.add(cover);
  var bookGlow=ag(8,.7,0,0,.6,bk);
  var aL=new T.PointLight(0xffe6c0,0,0);aL.position.set(FACE.x,FACE.y,FACE.z);st.add(aL);
  var pL=new T.PointLight(0xffd8a8,0,70,1.3);pL.position.set(4,10,-104);st.add(pL);

  /* ── your lantern, carried in your right hand ── */
  var LG=q.G();cam.add(LG);
  var lmD=new T.MeshStandardMaterial({color:0x2c2219,roughness:.6,metalness:.5});
  var glassM=new T.MeshStandardMaterial({color:0xfff4dc,roughness:.15,transparent:true,opacity:.2,depthWrite:false});
  function lbox(w,h,d,x,y,z,m){var b=new T.Mesh(new T.BoxGeometry(w,h,d),m||lmD);b.position.set(x,y,z);LG.add(b);return b}
  lbox(.18,.025,.18,0,-.125,0);lbox(.15,.02,.15,0,.12,0);
  var lcap=new T.Mesh(new T.ConeGeometry(.12,.075,4),lmD);lcap.position.y=.165;lcap.rotation.y=PI/4;LG.add(lcap);
  var lring=new T.Mesh(new T.TorusGeometry(.04,.007,6,18),lmD);lring.position.y=.225;LG.add(lring);
  [[1,1],[1,-1],[-1,1],[-1,-1]].forEach(function(c){lbox(.014,.25,.014,c[0]*.075,0,c[1]*.075)});
  LG.add(new T.Mesh(new T.BoxGeometry(.142,.23,.142),glassM));
  var flame=new T.Mesh(new T.ConeGeometry(.02,.075,8),new T.MeshBasicMaterial({color:0xffffff}));flame.position.y=-.06;LG.add(flame);lbox(.03,.03,.03,0,-.1,0);
  var fglow=D.glow(.5);fglow.position.y=-.06;LG.add(fglow);
  var halo=D.glow(1.2);halo.position.y=-.04;halo.material.opacity=0;LG.add(halo);
  var lampL=new T.PointLight(0xffe2b4,1,9,1.6);LG.add(lampL);
  var thornM=new T.MeshStandardMaterial({color:0x14100c,roughness:.8}),thorns=[];
  for(i=0;i<14;i++){var th=new T.Mesh(new T.ConeGeometry(.007,.05,4),thornM),ta=i/14*TAU;th.position.set(Math.cos(ta)*.085,rand(-.11,.11),Math.sin(ta)*.085);th.rotation.set(0,-ta,-PI/2);th.scale.setScalar(.001);LG.add(th);thorns.push(th)}
  var vig=overlay(VIG,0x000000,996,-.5),bitterS=overlay(DARK,0x000000,997,-.51),bloom=overlay(SOFT,0xffe8b0,998,-.52);

  /* ── the sweet things on the path ── */
  var coins=[];
  function mkHoney(g){var hx=[[0,0]];for(var a=0;a<6;a++)hx.push([Math.cos(a*PI/3+PI/6)*.19,Math.sin(a*PI/3+PI/6)*.19]);
    hx.forEach(function(p){var c=new T.Mesh(new T.CylinderGeometry(.1,.1,.09,6),M.g);c.rotation.x=PI/2;c.position.set(p[0],p[1],0);g.add(c);var hn=new T.Mesh(new T.CylinderGeometry(.075,.075,.1,6),M.l);hn.rotation.x=PI/2;hn.position.set(p[0],p[1],0);g.add(hn)});
    for(var k=0;k<3;k++)q.s(g,.035,-.12+k*.12,-.27-k%2*.05,.02,'g',1.7,1,1)}
  function mkPurse(g){q.s(g,.2,0,-.03,0,'d',1.05,1,.9);q.c(g,.07,.12,.08,0,.17,0,'d');q.t(g,.08,.018,0,.15,0,'g',PI/2);
    for(var k=0;k<7;k++){var c=q.c(g,.06,.06,.015,0,0,0,'g',0,1.2);if(c){c.userData.a=k/7*TAU;coins.push(c)}}}
  function mkMirror(g){q.s(g,.19,0,.06,0,'l',1.3,1,.15);var fr=q.t(g,.2,.025,0,.06,0,'g');if(fr&&fr.scale)fr.scale.set(1,1.3,1);q.c(g,.03,.035,.3,0,-.33,0,'g');q.s(g,.04,0,-.5,0,'g')}
  function mkRose(g){q.c(g,.012,.014,.55,0,-.3,0,'w');q.b(g,.12,.01,.06,.07,-.25,0,'w',0,.5);q.b(g,.12,.01,.06,-.06,-.38,0,'w',0,-.5);
    for(var k=0;k<9;k++){var a=k*2.4,r=.03+k*.012;q.s(g,.06+k*.006,Math.cos(a)*r,.02+k*.004,Math.sin(a)*r,'p',.8,1,.6)}}
  var SW=[{n:'A honeycomb',at:24,harm:'weak',mk:mkHoney,
      take:'The honey turned sour in you. Gluttony chiefly makes the soul lukewarm: see how low your flame has sunk.',
      refuse:'You walked on. The honeycomb melts into your lantern like wax, and the flame stands up taller.'},
    {n:'A purse of gold',at:40,harm:'torment',mk:mkPurse,
      take:'The gold turned to thorns. Avarice chiefly brings misery: thorns have grown round your lantern.',
      refuse:'You walked on. The coins fall into your lantern as sparks.'},
    {n:'A mirror',at:54,harm:'dark',mk:mkMirror,
      take:'You looked lovely in it, and then the night closed in. Vainglory chiefly blinds.',
      refuse:'You walked past your own reflection, and its light pours into your lantern.'},
    {n:'A rose',at:66,harm:'stain',mk:mkRose,
      take:'The rose was lovely, and it left soot on the glass. Desires of the flesh chiefly stain the soul.',
      refuse:'You walked on. The rose falls into the flame like incense, and the glass clears.'}];
  SW.forEach(function(w){var g=q.G();st.add(g);var b=q.G();g.add(b);w.mk(b);w.g=g;w.b=b;
    w.glow=D.glow(1.5);w.glow.material.opacity=.4;g.add(w.glow);
    w.tag=D.tag(w.n);w.tag.position.y=.62;g.add(w.tag);
    w.hit=D.hit(g,0,0,0,.5,function(){take(w)});w.hit.userData.sweet=1;D.off(w.hit);
    w.state='wait';w.t=0;w.strain=0;w.idle=0;w.pos=new T.Vector3(px(w.at),py(w.at)+1.55,-w.at);g.position.set(w.pos.x,w.pos.y,w.pos.z)});
  var walkHit=D.hit(st,0,1.1,-4,1.3,function(){wake();tapHold=D.time+1.5});

  /* ── stirrings that rise unasked, and sparks for what you refuse ── */
  var motes=[];for(i=0;i<28;i++){var mg=D.glow(.26);mg.material.opacity=0;st.add(mg);motes.push({s:mg,life:0,max:1,v:new T.Vector3(),on:false,near:false,pp:0})}
  function spawnMote(ex,ey,ez,h){for(var k=0;k<motes.length;k++){var m=motes[k];if(m.on)continue;var a=h+rand(-1.3,1.3),d=rand(2.5,6.5);
      m.s.position.set(ex+Math.sin(a)*d,ey+rand(-1.2,.5),ez-Math.cos(a)*d);m.v.set(rand(-.4,.4)-Math.sin(a)*rand(.5,1),rand(.1,.4),Math.cos(a)*rand(.5,1)+rand(-.3,.3));
      m.life=0;m.max=rand(3.4,5);m.on=true;m.near=false;m.pp=rand(0,TAU);return}}
  var sparks=[];for(i=0;i<16;i++){var sk=D.glow(.3);sk.material.opacity=0;st.add(sk);sparks.push({s:sk,on:false,t:0,ax:0,ay:0,az:0,d:.6})}
  function spark(p,delay){for(var k=0;k<sparks.length;k++){var s=sparks[k];if(s.on)continue;s.on=true;s.t=-delay;s.ax=p.x+rand(-.2,.2);s.ay=p.y+rand(-.2,.2);s.az=p.z+rand(-.2,.2);s.d=rand(.5,.8);return}}

  /* ── state ── */
  var me={s:0,v:0},phase='intro',T0=0,thunderN=0,reveal=0,rv=0,flash=0,lookK=1,look=0,stepPh=0,trem=0,jolt=0,nextJolt=3;
  var Hm={weary:0,torment:0,dark:0,stain:0,weak:0},hv={weary:0,torment:0,dark:0,stain:0,weak:0},strong=0,sv=0,flare=0,sweetV=0,bitterF=0;
  var firstTake=0,firstBit=0,firstRefuse=0,firstSeen=0,introHint=0,endT=0,day=0,waveT=1.5,humT=0,humN=0,moteAcc=0,moteNear=0,moteT=-1;
  var LW={x:0,y:1.3,z:-.8},took=0,passed=0;
  var WALK=touch?'Press and hold to walk the shore toward him.':'Hold W, ↑ or Space to walk the shore toward him. A and D look about.';

  function take(w){if(w.state!=='active'||phase!=='walk')return;wake();w.state='taken';w.t=0;w.bit=0;D.off(w.hit);w.tag.visible=false;took++;
    w.fx=w.g.position.x;w.fy=w.g.position.y;w.fz=w.g.position.z;chord([523,659,784,1047],.07,'sine',.05,1.3);note(262,0,1.4,'triangle',.025);
    if(!firstTake){firstTake=1;say(1)}}
  function refuse(w){wake();w.state='refused';w.t=0;D.off(w.hit);w.tag.visible=false;passed++;
    for(var k in Hm)Hm[k]=Math.max(0,Hm[k]-.25);strong=Math.min(1,strong+.25);
    note(784,0,1.6,'sine',.06);note(1175,.06,1.8,'sine',.04);note(392,0,1.3,'triangle',.03);hiss(.6,4200,.02,'highpass');
    var p=w.g.position;D.burst(new T.Vector3(p.x,p.y,p.z),0xffffff,true);for(var k2=0;k2<10;k2++)spark(p,k2*.05);
    D.hint(w.refuse);if(!firstRefuse){firstRefuse=1;D.tween(1.4,function(){},function(){say(3)})}}

  D.onUpdate(function(t,dt){
    dt=Math.min(dt,.05);var k,w,hold=holding();
    /* the seven thunders, and the angel revealed by them */
    if(phase==='intro'){T0+=dt;
      while(thunderN<7&&T0>=.6+thunderN*.72){thunder(thunderN);thunderN++;reveal=thunderN/7}
      if(T0>5.9||(T0>2.4&&hold)){phase='walk';reveal=1;thunderN=7}}
    if(phase!=='intro'&&!introHint){introHint=1;D.hint('A mighty angel stands with one foot on the sea and one on the land, a little book open in his hand. '+WALK)}
    rv+=(reveal-rv)*Math.min(1,dt*2.5);flash=Math.max(0,flash-dt*2.2);
    lookK+=((phase==='intro'?1:phase==='end'?.9:.2)-lookK)*Math.min(1,dt*(phase==='walk'?1.1:.7));
    look=clamp(look+((keys.right?1:0)-(keys.left?1:0))*dt*1.4,-1.1,1.1);if(me.v>.5&&!keys.left&&!keys.right)look*=1-Math.min(1,dt*.6);

    /* walking, and the first sweet thing still in the way */
    var act=null;for(k=0;k<SW.length;k++)if(SW[k].state==='wait'||SW[k].state==='active'){act=SW[k];break}
    var tv=(phase==='walk'&&hold)?2.4*(1-.42*hv.weary)*(1+.14*strong):0;
    me.v+=(tv-me.v)*Math.min(1,dt*(tv>me.v?2.6:6));
    var lim=act?act.at-1.8+.55*act.strain:L;me.s=Math.min(Math.max(0,me.s)+me.v*dt,lim);if(act&&me.s>=lim-.01)me.v=Math.min(me.v,.4);
    if(me.v>.4){stepPh+=me.v*dt*2.1;if(stepPh>PI){stepPh-=PI;hiss(.08,1300,.02,'highpass')}}
    var ex=px(me.s),ey=py(me.s)+1.6,ez=-me.s,h=hd(me.s),fx=Math.sin(h),fz=-Math.cos(h);
    walkHit.position.set(px(me.s+4),py(me.s+4)+1.1,-(me.s+4));
    if(act&&act.state==='wait'&&me.s>act.at-4.4){act.state='active';act.idle=0;if(D.hits.indexOf(act.hit)<0)D.hits.push(act.hit);
      D.hint(firstSeen?act.n+'. Take it, or walk on past it.':'Something sweet waits on the path. Tap it to take it, or '+HOLD+' to walk on past it.');firstSeen=1}
    trem=0;
    if(act&&act.state==='active'){
      if(hold&&me.s>=act.at-1.95){act.strain+=dt/(2.3+.7*hv.weary);act.idle=0;trem=.012+.035*act.strain}else{act.strain=Math.max(0,act.strain-dt*.45);act.idle+=dt}
      if(act.idle>7){act.idle=0;D.hint('Tap it to take it, or '+HOLD+' to walk on past it.')}
      humT-=dt;if(humT<=0){humT=.42-.15*act.strain;note([523,659,784,659][humN++%4]*(1+.5*act.strain),0,.5,'sine',.014+.03*act.strain)}
      if(act.strain>=1)refuse(act)}

    /* each sweet thing: waiting, hovering at your face, taken (sweet, then bitter), or refused */
    sweetV=Math.max(0,sweetV-dt*1.5);
    SW.forEach(function(w){var g=w.g;w.b.rotation.y+=dt*.6;
      if(w.state==='wait'){g.position.y=w.pos.y+Math.sin(t*1.6+w.at)*.08;w.glow.material.opacity=.35+.1*Math.sin(t*2);var dd=w.at-me.s;w.tag.visible=dd>3.2&&dd<14}
      else if(w.state==='active'){var tx=ex+fx*1.3,ty=ey-.12+Math.sin(t*2.2)*.04,tz=ez+fz*1.3,kk=Math.min(1,dt*3),j=w.strain*.03;
        g.position.set(g.position.x+(tx-g.position.x)*kk+(Math.random()-.5)*j,g.position.y+(ty-g.position.y)*kk+(Math.random()-.5)*j,g.position.z+(tz-g.position.z)*kk);
        g.scale.setScalar(1+.5*w.strain);w.glow.material.opacity=.5+.4*w.strain+.1*Math.sin(t*5)}
      else if(w.state==='taken'){w.t+=dt;var e=Math.min(1,w.t/.45);
        g.position.set(w.fx+(ex+fx*.25-w.fx)*e,w.fy+(ey-.05-w.fy)*e,w.fz+(ez+fz*.25-w.fz)*e);g.scale.setScalar(Math.max(.01,1-e*.9));g.visible=w.t<.45;
        if(w.t<2.3)sweetV=Math.max(sweetV,w.t<.35?w.t/.35:w.t<1.6?1:Math.max(0,1-(w.t-1.6)/.6));
        if(!w.bit&&w.t>=2.3){w.bit=1;for(var hk in Hm)Hm[hk]=Math.min(1,Hm[hk]+(hk===w.harm?.55:hk==='weary'?.22:.16));bitterF=1;jolt=.06;
          chord([196,233,277],.05,'triangle',.05,1.5);note(98,0,1.6,'sawtooth',.02,.7);hiss(.9,320,.04,'lowpass');D.hint(w.take);
          if(!firstBit){firstBit=1;D.tween(1.4,function(){},function(){say(2)})}}
        if(w.t>3.4)w.state='gone'}
      else if(w.state==='refused'){w.t+=dt;var e2=Math.min(1,w.t/.6);g.scale.setScalar(Math.max(.01,1-e2));if(e2>=1){g.visible=false;w.state='gone'}}});

    /* sparks fly from what you refused into your lantern */
    sparks.forEach(function(s){if(!s.on)return;s.t+=dt;if(s.t<0)return;var e=Math.min(1,s.t/s.d);
      s.s.position.set(s.ax+(LW.x-s.ax)*e,s.ay+(LW.y-s.ay)*e+Math.sin(e*PI)*.35,s.az+(LW.z-s.az)*e);s.s.material.opacity=.9-e*.3;
      if(e>=1){s.on=false;s.s.material.opacity=0;flare=Math.min(1.2,flare+.18)}});

    /* stirrings: they come without your asking, brush past, and do your lantern no harm */
    if(phase!=='intro'&&me.s>4&&me.s<L-6){moteAcc+=dt*(me.s<22?7:2.2);while(moteAcc>1){moteAcc-=1;spawnMote(ex,ey,ez,h)}}
    motes.forEach(function(m){if(!m.on)return;m.life+=dt;if(m.life>m.max){m.on=false;m.s.material.opacity=0;return}
      var p=m.s.position;p.set(p.x+m.v.x*dt,p.y+m.v.y*dt+Math.sin(t*2+m.pp)*dt*.2,p.z+m.v.z*dt);m.s.material.opacity=.6*Math.sin(PI*m.life/m.max)*(1-.6*day);
      var dx=p.x-LW.x,dy=p.y-LW.y,dz=p.z-LW.z;if(!m.near&&dx*dx+dy*dy+dz*dz<.5){m.near=true;moteNear++;note(rand(1400,1900),0,.3,'sine',.012)}});
    if(moteT<0&&phase==='walk'&&(moteNear>=3||me.s>13)){moteT=0;D.hint('Sweet thoughts rise around you without your asking. Watch your lantern.')}
    if(moteT>=0&&moteT<99){moteT+=dt;if(moteT>4.5){moteT=99;say(0)}}

    /* the end of the shore: the angel lifts his hand and swears that time shall be no longer; and the dawn */
    if(phase==='walk'&&me.s>=L-.05){phase='end';endT=0;thunder(3);D.hint('The angel lifts his hand to heaven and swears that time shall be no longer.')}
    if(phase==='end'){endT+=dt;armR.rotation.z=.95-.8*sstep(0,2.6,endT);day=sstep(2.6,9,endT);
      if(endT>2.6)say(4);
      if(endT>10.5&&!D.finished){live=false;D.done()}}

    /* what your choices have done to your light */
    for(k in hv)hv[k]+=(Hm[k]-hv[k])*Math.min(1,dt*1.6);sv+=(strong-sv)*Math.min(1,dt*1.6);
    flare=Math.max(0,flare-dt*1.2);bitterF=Math.max(0,bitterF-dt*.7);jolt=Math.max(0,jolt-dt*.12);
    nextJolt-=dt;if(hv.torment>.1&&nextJolt<=0){jolt=.025+.05*hv.torment;nextJolt=rand(2,4.5)-hv.torment;note(rand(140,190),0,.12,'square',.012)}
    var dk=1-.75*day,fs=(1-.62*hv.weak)*(1+.55*sv)*(1+.5*sweetV+.6*flare)*(1+.1*Math.sin(t*13)+.05*Math.sin(t*29));
    flame.scale.set(fs,fs*(1+.15*Math.sin(t*9)),fs);fglow.scale.setScalar(.5*fs);fglow.material.opacity=(.9-.6*hv.stain)*dk;
    halo.material.opacity=(.1+.3*sv)*(1-.7*hv.stain)*dk;halo.scale.setScalar(1.2*(1+.8*sv));
    lampL.intensity=1.15*fs*(1-.62*hv.stain)*dk;lampL.distance=7+6*sv;
    glassM.color.setRGB(1-.86*hv.stain,.95-.83*hv.stain,.86-.76*hv.stain);glassM.opacity=.18+.62*hv.stain;
    thorns.forEach(function(th,n){th.scale.setScalar(Math.max(.001,hv.torment*(.7+.5*Math.sin(n*2.3+t*(1+hv.torment)))))});
    vig.material.opacity=Math.min(.95,(.12+.8*hv.dark)*(1-.55*day)+bitterF*.35);bitterS.material.opacity=bitterF*.55;bloom.material.opacity=sweetV*.55;

    /* sky, sea, stars and the angel */
    var r=.082+.71*day+flash*.25,g2=.067+.59*day+flash*.22,b2=.051+.46*day+flash*.18;D.sc.background.setRGB(r,g2,b2);
    if(D.sc.fog){D.sc.fog.color.setRGB(r,g2,b2);D.sc.fog.density=.016*(1+1.4*hv.dark)*(1-.6*day)}
    D.light(Math.min(1,.36*(1-.45*hv.dark)+.62*day+flash*.5));
    AM.forEach(function(a){a.m.opacity=Math.min(1,a.o*rv*(1+flash*.4))});
    aL.intensity=.55*rv+.4*day;pL.intensity=1.6*rv;faceGlow.scale.setScalar(34*(1+.8*day));bookGlow.scale.setScalar(8*(1+.15*Math.sin(t*2))*(1+1.2*day));
    flames.forEach(function(f){f.u+=dt*f.sp;if(f.u>1)f.u-=1;var u=f.u;
      f.s.position.set(f.F.x+(f.H.x-f.F.x)*u+Math.sin(t*3+u*9)*1.2,f.F.y+(f.H.y-f.F.y)*u,f.F.z+(f.H.z-f.F.z)*u+Math.cos(t*2.6+u*7)*1.2);f.s.material.opacity=Math.sin(u*PI)*.5*rv;f.s.scale.setScalar(f.sz*(1-.4*u))});
    clouds.forEach(function(c){c.s.position.x=c.x+Math.sin(t*.2+c.p)*1.2;c.s.position.y=c.y+Math.sin(t*.15+c.p)*.8});
    coins.forEach(function(c){var a=c.userData.a+t*1.4;c.position.set(Math.cos(a)*.3,.05+Math.sin(a*2)*.1,Math.sin(a)*.14);c.rotation.z=a*2});
    stars.forEach(function(s){s.s.material.opacity=s.o*(.7+.3*Math.sin(t*1.7+s.p))*(1-day)});
    glints.forEach(function(s){s.s.material.opacity=Math.max(0,Math.sin(t*1.9+s.p))*.35*(1-.5*day)});
    foam.forEach(function(s){s.s.material.opacity=.28*Math.max(0,Math.sin(t*1.3-s.z*.08))});
    waveT-=dt;if(waveT<=0){waveT=rand(4.5,6.5);hiss(2.6,380,.035,'lowpass')}
  });

  /* your eyes: down the shore, drawn up toward the angel; A and D (or a drag) look about */
  D.camFn=function(cam,dt){
    var s=me.s,ex=px(s),ez=-s,ey=py(s)+1.6+(reduce?0:Math.abs(Math.sin(stepPh))*.035*Math.min(1,me.v/2)),ptr=D.ptr||{x:0,y:0};
    var h=hd(s)+look+(D.yaw||0)+(touch?0:(ptr.x||0)*.22);
    var bx=Math.sin(h),by=-.06+(touch?0:(ptr.y||0)*.18),bz=-Math.cos(h),bl=Math.hypot(bx,by,bz);bx/=bl;by/=bl;bz/=bl;
    var fx=FACE.x-ex,fy=FACE.y-ey,fz=FACE.z-ez,fl=Math.hypot(fx,fy,fz);fx/=fl;fy/=fl;fz/=fl;
    var k=lookK,dx=bx*(1-k)+fx*k,dy=by*(1-k)+fy*k,dz=bz*(1-k)+fz*k,dl=Math.hypot(dx,dy,dz);dx/=dl;dy/=dl;dz/=dl;
    var j=reduce?0:trem+jolt;
    cam.position.set(ex+(Math.random()-.5)*j,ey+(Math.random()-.5)*j,ez+(Math.random()-.5)*j);cam.lookAt(ex+dx*10,ey+dy*10,ez+dz*10);
    cam.fov=cam.aspect<.85?74:60;cam.updateProjectionMatrix();
    var hh=Math.tan(cam.fov*PI/360),hw=hh*(cam.aspect||1),lz=.78,lx=Math.min(.33,hw*lz*.62),ly=-Math.min(.3,hh*lz*.62)-.06*hv.weary+(reduce?0:Math.sin(stepPh*2)*.008);
    LG.position.set(lx,ly,-lz);LG.rotation.set(-.06,-.25,Math.sin(D.time*1.6)*.05*(1+Math.min(1,me.v)));
    var vh=2*.5*hh*1.08;vig.scale.set(vh*(cam.aspect||1)*1.08,vh,1);bitterS.scale.set(vh*(cam.aspect||1)*1.3,vh*1.3,1);bloom.scale.set(vh*(cam.aspect||1)*1.6,vh*1.6,1);
    var rx=-dz,rz=dx,rl=Math.hypot(rx,rz)||1;rx/=rl;rz/=rl;var ux=-rz*dy,uy=rz*dx-rx*dz,uz=rx*dy;
    LW.x=ex+rx*lx+ux*ly+dx*lz;LW.y=ey+uy*ly+dy*lz;LW.z=ez+rz*lx+uz*ly+dz*lz;
  };
  D._gf=function(){return {stage:phase,s:+me.s.toFixed(1),took:took,passed:passed,dark:+Hm.dark.toFixed(2),strong:+strong.toFixed(2)}};
  D.fpCleanup=function(){
    live=false;
    try{window.removeEventListener('keydown',kd,true);window.removeEventListener('keyup',ku,true);window.removeEventListener('pointerdown',pd,true);window.removeEventListener('pointerup',pu,true);window.removeEventListener('pointercancel',pu,true)}catch(_){}
    [LG,vig,bitterS,bloom].forEach(function(o){try{cam.remove(o)}catch(_){}});
    D.sc.fog=null;D.sc.background=D.sky;D.floor.visible=true;D.camFn=null;cam.fov=45;try{cam.updateProjectionMatrix()}catch(_){}
  };
};
})();
