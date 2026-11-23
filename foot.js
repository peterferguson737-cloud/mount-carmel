/* The foot of the Mount — John's own drawing of Mount Carmel — as The Three Roads. A feature lantern.
   John drew the whole book as a mountain with three roads. Two wide ones, of the goods of earth (possessing, joy, knowledge,
   consolation, rest) and of the goods of heaven (glory, joy, knowledge, consolation, rest), each marked: the more I sought
   them, the less I had. They wander off and never reach the top. Straight up the middle runs the narrow road: nada, nada,
   nada, and even on the Mount, nada. At the top: here there is no longer any road; only the honour and glory of God dwells on
   this Mount; and the gifts written round the summit (peace, joy, gladness, delight, wisdom, justice, fortitude, charity,
   piety): when I no longer wanted them, I had them all without wanting.
   So: walk into the drawing at dusk. Heaven's road on the left, earth's on the right, as John drew them. Step left or right at
   the foot to choose a road. On the wide roads the goods float along the way and you take each one by walking into it, and
   each one makes you smaller; the road runs off and brings you back to the foot. The middle road is steep, with nothing on it
   but the word nada inked on the ground; each one you cross types one line of John's sayings. At the top the gifts come by
   themselves. No floating labels: every word arrives one sentence at a time in the typed bubble at eye level.
   Controls as on the mountain: W or the up arrow to walk, S or down to go back, A and D (or the side arrows) to step left
   and right, Shift to hurry; on a phone, drag. */
(function(){
'use strict';
var X=window.ASCENT;if(!X||!X.MECH)return;
var MECH=X.MECH,reduce=X.reduce;

MECH.footfp=function(D,sp){
  var T=D.T,q=D.q,M=q.M,st=D.stage,cam=D.cam,PI=Math.PI,TAU=PI*2,i;
  D.setUsed=true;D.floor.visible=false;
  var SKY=[.1,.068,.046];D.sc.background=new T.Color(0x1a110c);D.sc.fog=new T.FogExp2(0x1a110c,.005);
  /* night at the writing desk: the room is dark, one low warm light rakes across from the far left so the books, the inkpot
     and the quill throw long shadows, and a soft pool of light lies on the page. Dawn comes only at the summit. */
  var hemi=null,hemi0=0,sun=D.sun,sun0=null;D.sc.children.forEach(function(c){if(c.isHemisphereLight)hemi=c});if(hemi){hemi0=hemi.intensity;hemi.intensity=.07}
  if(sun){var sc0=sun.shadow.camera;sun0={p:sun.position.clone(),i:sun.intensity,l:sc0.left,r:sc0.right,t:sc0.top,b:sc0.bottom,n:sc0.near,f:sc0.far,nb:sun.shadow.normalBias,bi:sun.shadow.bias};
    sun.position.set(-175,70,-66);sun.target.position.set(0,0,-48);D.sc.add(sun.target);sun.intensity=.5;sc0.left=-150;sc0.right=150;sc0.top=150;sc0.bottom=-150;sc0.near=20;sc0.far=520;sc0.updateProjectionMatrix();sun.shadow.normalBias=1.4;sun.shadow.bias=-.004}
  /* the little scenes' own star field sits close in; from high over the desk it would hang in mid-air, so it is put away */
  var hid=[];D.sc.traverse(function(o){if(o.isPoints&&o.visible){o.visible=false;hid.push(o)}});
  var pool=new T.SpotLight(0xfff0d8,1.25,420,.36,1,1.1);pool.position.set(-10,190,-30);pool.target.position.set(4,0,-44);st.add(pool);st.add(pool.target);
  var vig=null;try{var vc=document.createElement('canvas');vc.width=vc.height=256;var vg=vc.getContext('2d'),gr=vg.createRadialGradient(128,128,60,128,128,182);gr.addColorStop(0,'rgba(0,0,0,0)');gr.addColorStop(.6,'rgba(0,0,0,.28)');gr.addColorStop(1,'rgba(0,0,0,.82)');vg.fillStyle=gr;vg.fillRect(0,0,256,256);
    vig=new T.Sprite(new T.SpriteMaterial({map:new T.CanvasTexture(vc),transparent:true,depthTest:false,depthWrite:false,fog:false}));vig.renderOrder=998;vig.position.z=-.5;cam.add(vig)}catch(_){vig=null}
  var touch=!!(window.matchMedia&&window.matchMedia('(pointer:coarse)').matches);
  var items=sp.items||[],said={};
  function rand(a,b){return a+Math.random()*(b-a)}
  function clamp(v,a,b){return v<a?a:v>b?b:v}
  function sstep(a,b,v){v=clamp((v-a)/(b-a),0,1);return v*v*(3-2*v)}
  function wrapA(a){while(a>PI)a-=TAU;while(a<-PI)a+=TAU;return a}

  /* ── input, as on the mountain ── */
  var HOLD=3.6,BLEND=2.6,introT=reduce?HOLD+BLEND:0;
  var live=true,kb={f:0,b:0,l:0,r:0,run:0},joy=null,jf=0,jl=0,sf=0,sl=0,auto=0;
  var KM={KeyW:'f',ArrowUp:'f',KeyS:'b',ArrowDown:'b',KeyA:'l',ArrowLeft:'l',KeyD:'r',ArrowRight:'r',ShiftLeft:'run',ShiftRight:'run'};
  function kd(e){if(!live||e.metaKey||e.ctrlKey||e.altKey)return;if(introT<HOLD)introT=HOLD;if(e.code==='Space'){hop();e.preventDefault();e.stopPropagation();return}var k=KM[e.code];if(k){kb[k]=1;wake();e.preventDefault();e.stopPropagation()}}
  function ku(e){var k=KM[e.code];if(k){kb[k]=0;if(live){e.preventDefault();e.stopPropagation()}}}
  function dz(v){var a=Math.abs(v)-12;return a<=0?0:Math.sign(v)*Math.min(1,a/95)}
  function pd(e){if(!live)return;wake();if(introT<HOLD)introT=HOLD;if(e.pointerType==='mouse'||joy)return;e.stopPropagation();joy={id:e.pointerId,ox:e.clientX,oy:e.clientY,t:Date.now(),m:0}}
  function pm(e){if(!joy||e.pointerId!==joy.id)return;e.stopPropagation();joy.m=Math.max(joy.m,Math.abs(e.clientX-joy.ox)+Math.abs(e.clientY-joy.oy));jf=-dz(e.clientY-joy.oy);jl=dz(e.clientX-joy.ox)}
  function pu(e){if(!joy||e.pointerId!==joy.id)return;e.stopPropagation();if(joy.m<12&&Date.now()-joy.t<300)hop();joy=null;jf=jl=0}
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
    var t=a.currentTime,s=a.createBufferSource(),f=a.createBiquadFilter(),g=a.createGain();s.buffer=nb;s.loop=true;f.type=type||'bandpass';f.frequency.value=freq;g.gain.setValueAtTime(.0001,t);g.gain.linearRampToValueAtTime(vol,t+Math.min(.05,dur*.3));g.gain.exponentialRampToValueAtTime(.0001,t+dur);
    s.connect(f);f.connect(g);g.connect(a.destination);s.start(t);s.stop(t+dur+.05)}catch(_){}}

  /* ── the drawing itself: one great sheet of parchment on a desk, and everything on it in John's ink ── */
  var inkM=new T.MeshBasicMaterial({color:0x2a1f17,side:T.DoubleSide,polygonOffset:true,polygonOffsetFactor:-2,polygonOffsetUnits:-2}),paperM=new T.MeshStandardMaterial({color:0xece0c6,roughness:1});
  function ground(){return 0}
  var deskM=new T.MeshStandardMaterial({color:0x5a4130,roughness:.85,polygonOffset:true,polygonOffsetFactor:3,polygonOffsetUnits:120});var desk=new T.Mesh(new T.BoxGeometry(900,.2,900),deskM);desk.position.set(0,-.35,-50);desk.userData.ns=1;st.add(desk);
  for(var dk=0;dk<26;dk++){var gl2=new T.Mesh(new T.PlaneGeometry(900,.5+Math.random()*1.2),new T.MeshBasicMaterial({color:0x140d09,transparent:true,opacity:.18+Math.random()*.2,depthWrite:false}));gl2.rotation.x=-PI/2;gl2.rotation.z=.42;gl2.position.set(0,-.24,-50+(dk-13)*34+Math.random()*20);st.add(gl2)}
  var sheet=new T.Mesh(new T.BoxGeometry(100,.2,136),paperM);sheet.position.set(0,-.1,-50);sheet.userData.ns=1;st.add(sheet);
  /* ── the writing desk around the sheet, at John's own scale: his inkpot and goose quill, his books, a few blots.
        They are enormous beside the little figure walking on the page ── */
  (function(){
    var DY=-.25,potM=new T.MeshStandardMaterial({color:0x2e211a,roughness:.4,metalness:.35,side:T.DoubleSide}),inkB=new T.MeshBasicMaterial({color:0x140d09}),
        vaneM=new T.MeshStandardMaterial({color:0xefe4cb,roughness:1,side:T.DoubleSide}),pageM=new T.MeshStandardMaterial({color:0xe6d9bd,roughness:1}),j;
    /* inkpot */
    var pot=q.G();pot.position.set(70,DY,-42);st.add(pot);
    var prof=[[0,0],[6.2,0],[7.4,1.2],[8,4],[7.2,7],[4.6,9],[3.2,10],[3.2,11.2],[4.2,11.8],[4.2,12.4],[2.9,12.4]].map(function(v){return new T.Vector2(v[0],v[1])});
    pot.add(new T.Mesh(new T.LatheGeometry(prof,40),potM));
    var ink=new T.Mesh(new T.CircleGeometry(2.9,28),inkB);ink.rotation.x=-PI/2;ink.position.y=11.6;pot.add(ink);
    [-1,1].forEach(function(sd){var h=new T.Mesh(new T.TorusGeometry(1.7,.42,8,20),potM);h.position.set(sd*7.6,6.2,0);pot.add(h)});
    for(j=0;j<3;j++){var bnd=new T.Mesh(new T.TorusGeometry([7.75,8.02,7.5][j],.16,6,48),potM);bnd.rotation.x=PI/2;bnd.position.y=[2.6,4.2,6.2][j];pot.add(bnd)}
    /* the quill standing in it, leaning out over the page */
    var quill=q.G();quill.position.set(70,DY+3,-42);quill.rotation.set(-.85,0,-.3);st.add(quill);
    var shaft=new T.Mesh(new T.CylinderGeometry(.1,.32,50,8),vaneM);shaft.position.y=25;quill.add(shaft);
    var sh=new T.Shape(),R=[],L=[];for(j=0;j<=44;j++){var u=j/44,w=6*Math.pow(Math.sin(PI*Math.min(1,u*1.04)),.55)*(1-.35*u)*(1+.1*Math.sin(u*37)+(j%7===3?-.28:0)),y=13+u*38;R.push([w*1.15+u*1.5,y+w*.5]);L.push([-w*.7+u*1.5,y+w*.35])}
    sh.moveTo(0,13);R.forEach(function(v){sh.lineTo(v[0],v[1])});sh.lineTo(1.6,52);L.reverse().forEach(function(v){sh.lineTo(v[0],v[1])});sh.lineTo(0,13);
    var vane=new T.Mesh(new T.ShapeGeometry(sh),vaneM);quill.add(vane);
    for(j=0;j<16;j++){var u2=.06+j/16*.9,yy=13+u2*38,b2=new T.Mesh(new T.PlaneGeometry(5.2*(1-.4*u2),.07),inkB);b2.position.set(2.2+u2*1.5,yy+1.2,.03);b2.rotation.z=.5;quill.add(b2);var b3=b2.clone();b3.position.z=-.03;quill.add(b3)}
    /* books */
    function book(x,z,w,hh,d,ry,m,tilt){var g=q.G();g.position.set(x,DY+hh/2,z);g.rotation.set(0,ry,tilt||0);st.add(g);q.b(g,w,hh,d,0,0,0,m);var pg=new T.Mesh(new T.BoxGeometry(w-.5,hh-1.2,d-.8),pageM);pg.position.set(.5,0,0);g.add(pg);
      [-.32,-.12,.12,.32].forEach(function(f){q.b(g,.5,hh+.16,.7,-w/2+.1,0,d*f,'g')});return g}
    var bible=book(-80,-104,46,8,62,.32,'d');q.b(bible,2.4,.4,30,0,4.1,0,'g');q.b(bible,15,.4,2.4,0,4.1,-6,'g');
    book(82,-108,42,7,54,-.12,'c');
    /* his rosary, lying in a loop at the near corner */
    var bead=new T.SphereGeometry(1.15,10,8),rosM=q.M.w;function bd(x,z,k){var m=new T.Mesh(bead,rosM);m.position.set(x,DY+1.1*(k||1),z);m.scale.setScalar(k||1);st.add(m)}
    for(j=0;j<54;j++){var a=j/54*TAU;bd(-80+Math.cos(a)*(19+2.5*Math.sin(a*3)),8+Math.sin(a)*(24+2*Math.cos(a*2)),j%11===0?1.45:1)}
    for(j=1;j<=5;j++)bd(-80+19+j*2.9,8+j*3.4,j===1||j===5?1.45:1);
    var rc=q.G();rc.position.set(-80+19+18.5,DY+.5,8+24.5);rc.rotation.y=-.7;st.add(rc);q.b(rc,1.5,.9,11,0,0,3,'w');q.b(rc,6.5,.9,1.5,0,0,1,'w');
    /* blots where the pen dripped */
    [[60,-36,1.6],[57.5,-31,.7],[62.5,-29.5,.45],[55,-52,1],[-56,-60,.8]].forEach(function(b){var c=new T.Mesh(new T.CircleGeometry(b[2],18),inkB);c.rotation.x=-PI/2;c.position.set(b[0],DY+.03,b[1]);c.scale.set(1,.8+b[2]*.2,1);st.add(c)});
  })();
  /* a pen line: a flat ribbon of ink through [x,z] points */
  /* ── the pen: every line is laid down by hand. A stroke wanders a little, swells and thins with the pressure of the nib,
        tapers where the pen lifts, leaves a small pool of ink where it lands, and is drawn once. The ink itself is a brown iron-gall, ragged at the edges, with dry gaps. ── */
  var nibTex=(function(){try{var c=document.createElement('canvas');c.width=256;c.height=32;var g=c.getContext&&c.getContext('2d');if(!g||!g.getImageData)return null;
    var im=g.createImageData(256,32),d=im.data,x,y,edge=[],dry=[];for(x=0;x<256;x++){edge.push([.5+.38*Math.random(),.5+.38*Math.random()]);dry.push(Math.random())}
    for(x=0;x<256;x++){var e0=(edge[x][0]+edge[(x+1)%256][0]+edge[(x+255)%256][0])/3,e1=(edge[x][1]+edge[(x+1)%256][1]+edge[(x+255)%256][1])/3;
      for(y=0;y<32;y++){var v=(y+.5)/32*2-1,lim=v<0?e0:e1,a=Math.abs(v)<lim?1:Math.max(0,1-(Math.abs(v)-lim)*9);
        if(dry[x]>.93&&Math.abs(v)<.5)a*=.35+.4*Math.random();a*=.82+.18*Math.random();var o=(y*256+x)*4;d[o]=d[o+1]=d[o+2]=255;d[o+3]=Math.round(255*Math.max(0,Math.min(1,a)))}}
    g.putImageData(im,0,0);var t=new T.CanvasTexture(c);t.wrapS=T.RepeatWrapping;t.anisotropy=8;return t}catch(_){return null}})();
  function inkMat(op){return new T.MeshBasicMaterial({color:0x3a2416,map:nibTex,transparent:true,opacity:op,depthWrite:false,side:T.DoubleSide,polygonOffset:true,polygonOffsetFactor:-2,polygonOffsetUnits:-2})}
  var INK=[{m:inkMat(.95),p:[],u:[],i:[]},{m:inkMat(.5),p:[],u:[],i:[]}];
  function nz(s0,ph){return Math.sin(s0*.37+ph[0])*.55+Math.sin(s0*1.13+ph[1])*.3+Math.sin(s0*2.71+ph[2])*.15}
  function ribbon(B,Q,w,a,b,off,wob,y){var n=Q.length,i0=Math.floor(a*(n-1)),i1=Math.ceil(b*(n-1)),L=Q[i1].s-Q[i0].s,base=B.p.length/3,ph=[Math.random()*9,Math.random()*9,Math.random()*9],pr=[Math.random()*9,Math.random()*9,Math.random()*9],k,cnt=0;
    for(k=i0;k<=i1;k++){var q0=Q[k],t=q0.s-Q[i0].s,tap=Math.min(1,t/Math.min(1.1,L*.3),(L-t)/Math.min(1.6,L*.35)),press=Math.max(.25,.82+.3*nz(t*.6,pr))*(.35+.65*Math.sqrt(Math.max(0,tap))),
        o=off+wob*nz(t,ph),hw=w*press,x=q0.x+q0.nx*o,z=q0.z+q0.nz*o;
      B.p.push(x-q0.nx*hw,y,z-q0.nz*hw,x+q0.nx*hw,y,z+q0.nz*hw);B.u.push(t/1.7,0,t/1.7,1);cnt++}
    for(k=0;k<cnt-1;k++){var j=base+k*2;B.i.push(j,j+1,j+2,j+1,j+3,j+2)}}
  function pen(P,w,close){w=(w||.12)/2;var Q=[],k,j,pts=P.slice();if(close)pts.push(P[0]);
    for(k=0;k<pts.length-1;k++){var A=pts[k],C=pts[k+1],d=Math.hypot(C[0]-A[0],C[1]-A[1]),m=Math.max(1,Math.ceil(d/.28));for(j=0;j<m;j++)Q.push({x:A[0]+(C[0]-A[0])*j/m,z:A[1]+(C[1]-A[1])*j/m})}
    Q.push({x:pts[pts.length-1][0],z:pts[pts.length-1][1]});
    var s0=0;for(k=0;k<Q.length;k++){if(k)s0+=Math.hypot(Q[k].x-Q[k-1].x,Q[k].z-Q[k-1].z);Q[k].s=s0;var a=Q[Math.max(0,k-1)],c=Q[Math.min(Q.length-1,k+1)],dx=c.x-a.x,dz=c.z-a.z,l=Math.hypot(dx,dz)||1;Q[k].nx=-dz/l;Q[k].nz=dx/l}
    if(s0<.05)return;
    var wob=.035+w*.35;ribbon(INK[0],Q,w,0,1,0,wob,.02);
    /* where the nib landed */
    if(!close&&s0>.8){var bl=new T.Mesh(new T.CircleGeometry(w*(1.1+Math.random()*.5),10),INK[0].m);bl.rotation.x=-PI/2;bl.position.set(Q[0].x,.022,Q[0].z);bl.scale.set(1,.8+Math.random()*.4,1);st.add(bl)}}
  function flushInk(){INK.forEach(function(B){if(!B.i.length)return;var g=new T.BufferGeometry();g.setAttribute('position',new T.Float32BufferAttribute(B.p,3));g.setAttribute('uv',new T.Float32BufferAttribute(B.u,2));g.setIndex(B.i);
    var o=new T.Mesh(g,B.m);o.renderOrder=1;st.add(o);B.p=[];B.u=[];B.i=[]})}
  /* a word in his hand, lying on the paper to be read from the foot */
  var HAND='italic 700 120px "Apple Chancery","Snell Roundhand","Segoe Script","URW Chancery L",Georgia,serif',TEX={};
  function word(txt,w,x,z,op,rot){var e=TEX[txt];
    if(!e){e=TEX[txt]={t:null,r:.3};try{var c=document.createElement('canvas'),g=c.getContext&&c.getContext('2d');if(g&&g.fillText){g.font=HAND;var cw=Math.ceil((g.measureText(txt).width||txt.length*50)+60);c.width=cw;c.height=190;
      g=c.getContext('2d');g.font=HAND;g.fillStyle='#ffffff';g.textAlign='center';g.textBaseline='middle';g.globalAlpha=.22;[[-2,1],[2,-1],[1,2],[-1,-2]].forEach(function(o){g.fillText(txt,cw/2+o[0],100+o[1])});g.globalAlpha=1;g.fillText(txt,cw/2,100);e.t=new T.CanvasTexture(c);e.r=190/cw}}catch(_){}}
    var m=new T.MeshBasicMaterial({color:0x3a2416,map:e.t,transparent:true,opacity:e.t?(op||1):0,depthWrite:false,polygonOffset:true,polygonOffsetFactor:-4,polygonOffsetUnits:-4});
    var o=new T.Mesh(new T.PlaneGeometry(w,w*e.r),m);o.position.set(x,.04,z);o.rotation.x=-PI/2;if(rot)o.rotation.z=rot;st.add(o);return o}
  function arc(cx,cz,rx,rz,a0,a1,n){var P=[];for(var j=0;j<=n;j++){var a=a0+(a1-a0)*j/n;P.push([cx+Math.cos(a)*rx,cz-Math.sin(a)*rz])}return P}

  /* ── the roads, as he drew them: three columns side by side. Heaven's on the left and earth's on the right are wide and stop
        short under a rounded end; the path between them is narrow and runs on to the top ── */
  var ROADS=[],k,CX=[-7,0,7],FOOTH=10;
  var foot=[];for(k=0;k<=16;k++)foot.push({x:0,y:.03,z:8-k*.5,h:0});
  function col(x,n){var P=[];for(var j=0;j<=n;j++)P.push({x:x,y:.03,z:-j*.5,h:0});return P}
  var heaven=col(CX[0],90),mid=col(0,140),earth=col(CX[2],90);
  ROADS=[{pts:heaven,L:44,half:2,spd:5,name:'heaven'},{pts:mid,L:70,half:.6,spd:4.3,name:'nada'},{pts:earth,L:44,half:2,spd:5,name:'earth'}];
  function ptAt(pts,b){var kf=clamp(b*2,0,pts.length-1.001),k0=Math.floor(kf),u=kf-k0,a=pts[k0],c=pts[Math.min(pts.length-1,k0+1)];return {x:a.x+(c.x-a.x)*u,y:a.y+(c.y-a.y)*u,z:a.z+(c.z-a.z)*u,h:a.h+(c.h-a.h)*u}}
  [[CX[0],2.4,44],[0,.95,70],[CX[2],2.4,44]].forEach(function(c){pen([[c[0]-c[1],9],[c[0]-c[1],-c[2]]].concat(arc(c[0],-c[2],c[1],c[1],PI,0,14)).concat([[c[0]+c[1],9]]),.13)});
  /* the Mount: its foot line broken by the three roads, and the great round outline over everything */
  [[-40,CX[0]-2.4],[CX[0]+2.4,-.95],[.95,CX[2]-2.4],[CX[2]+2.4,40]].forEach(function(sg){pen([[sg[0],0],[sg[1],0]],.13)});
  pen(arc(0,0,40,100,0,PI,80).map(function(p,j){var a=j/80*PI,f=Math.pow(Math.abs(Math.cos(a)),.55)*(Math.cos(a)<0?-1:1);return [40*f,-100*Math.pow(Math.sin(a),.8)]}),.18);
  pen([[-47,15],[47,15],[47,-115],[-47,-115]],.16,true);
  (function(){for(var j=2;j<79;j++){var a=j/80*PI,c=Math.cos(a),f=Math.pow(Math.abs(c),.55)*(c<0?-1:1),x=40*f,z=-100*Math.pow(Math.sin(a),.8);
    var n=c<0?3:2;for(var h=0;h<n;h++){var t=(h+Math.random()*.6)*.55,x0=x-(x>0?1:-1)*(.4+t),z0=z+.4+t*1.1+Math.random()*.6,L=1.2+Math.random()*1.8;
      if(Math.abs(x0)<12&&z0>-70)continue;pen([[x0,z0],[x0-(x>0?1:-1)*L*.55,z0+L*.8]],.06)}}})();
  pen(arc(0,-76.5,8.5,5.5,0,TAU,48),.13,true);
  word('Mount Carmel',26,0,-107.5);
  word('only the honour and glory',10.5,0,-77.7);word('of God dwell on this mount',10.5,0,-75.2);
  /* the rest of what he wrote on it, where he wrote it: lettering that runs up the page reads from below, as on the original */
  word('here there is no longer any way, because for the just there is no law',46,0,-91.5,.9);
  word('I brought you into the land of Carmel, to eat its fruit and its good things',12,0,-80.3,.8);
  word('now that I no longer desire them, I have them all without desire',33,CX[0]-4.1,-23,.9,PI/2);
  word('now that I least desire them, I have them all without desire',33,CX[2]+4.1,-23,.9,PI/2);
  word('glory matters nothing to me',15,-34,-50,.85,PI/2);word('suffering matters nothing to me',17,34,-50,.85,PI/2);
  word('the way of the imperfect spirit',8.2,CX[0],4.6,.9,PI/2);word('the way of the imperfect spirit',8.2,CX[2],4.6,.9,PI/2);word('the path of Mount Carmel: the perfect spirit',8.6,0,4.6,.9,PI/2);
  word('goods of heaven',4.4,CX[0],-1.6,.9);word('goods of earth',4.2,CX[2],-1.6,.9);
  word('the more I desired to possess them, the less I had',4.5,CX[0],-43.2,.85);word('the more I desired to seek them, the less I had',4.5,CX[2],-43.2,.85);
  word('and even on the Mount nothing',9.5,0,-63.5,1,PI/2);
  [7,13.5,20,26.5,33,39.5].forEach(function(bz,n){[-1,1].forEach(function(sd){word(n?'nor this':'neither this',n?2.5:3,sd*2.8,-bz,.9);pen([[sd*4.1,-bz],[sd*5.3,-bz+.2]],.1)})});
  flushInk();
  var GW=[['peace',-23,-22],['joy',-25,-42],['gladness',-23,-62],['delight',-16,-80],['wisdom',0,-85],['justice',16,-80],['fortitude',23,-62],['charity',25,-42],['piety',23,-22]].map(function(w){return word(w[0],w[0].length*1.15+1.5,w[1],w[2],.85)});

  /* ── the goods along the wide roads, and what is written at their ends ── */
  function tokEarth(n,g){if(n===0){q.b(g,.7,.45,.45,0,0,0,'g');for(var c=0;c<5;c++)q.c(g,.12,.12,.03,-.25+c*.12,.28+c%2*.04,0,'g')}
    if(n===1){q.c(g,.22,.08,.35,0,.1,0,'g');q.c(g,.03,.03,.3,0,-.2,0,'g');q.c(g,.15,.15,.03,0,-.36,0,'g')}
    if(n===2){q.b(g,.4,.04,.55,-.21,0,0,'p',0,.25);q.b(g,.4,.04,.55,.21,0,0,'p',0,-.25);q.b(g,.86,.03,.6,0,-.06,0,'w')}
    if(n===3){q.s(g,.4,0,0,0,'c',.45,1.2,1)}
    if(n===4){q.b(g,1.1,.12,.5,0,0,0,'w');q.b(g,1.1,.4,.08,0,.2,-.22,'w');q.s(g,.18,-.35,.12,0,'c',.5,1.2,1)}}
  function tokHeaven(n,g){if(n===0){q.t(g,.28,.05,0,0,0,'g',PI/2);for(var c=0;c<6;c++){var a=c/6*TAU;q.k(g,.06,.22,Math.cos(a)*.28,.13,Math.sin(a)*.28,'g')}}
    if(n===1){q.t(g,.32,.04,0,.1,0,'g',0,0,PI*1.2);for(var c2=0;c2<5;c2++)q.c(g,.008,.008,.5,-.16+c2*.08,.05,0,'l')}
    if(n===2){q.c(g,.12,.12,.7,0,0,0,'p',PI/2);q.c(g,.03,.03,.9,0,0,0,'w',PI/2)}
    if(n===3){q.s(g,.16,0,0,0,'p',.8,1.3,1);q.b(g,.5,.04,.22,-.25,.08,0,'p',0,.5);q.b(g,.5,.04,.22,.25,.08,0,'p',0,-.5)}
    if(n===4){q.s(g,.32,0,0,0,'p',.6,1,1);q.s(g,.25,.32,-.04,0,'p',.6,1,1);q.s(g,.25,-.32,-.04,0,'p',.6,1,1)}}
  var tokShM=new T.MeshBasicMaterial({color:0x1a110c,transparent:true,opacity:.42,depthWrite:false,polygonOffset:true,polygonOffsetFactor:-3,polygonOffsetUnits:-3});
  var GOODS=[['Glory','Joy','Knowledge','Consolation','Rest'],null,['Possessions','Joy','Knowledge','Consolation','Rest']],toks=[];
  [0,2].forEach(function(r){var R=ROADS[r];GOODS[r].forEach(function(nm,n){var bb=6+n*7.5,p=ptAt(R.pts,bb),g=q.G(),body=q.G();g.add(body);
      g.position.set(p.x,p.y+1.35,p.z);st.add(g);(r?tokEarth:tokHeaven)(n,body);var gl=D.glow(1.8);gl.material.opacity=.45;g.add(gl);
      toks.push({g:g,body:body,r:r,b:bb,got:false,t:0,y0:p.y+1.35,p:n,nm:nm});})});

  /* ── nada inked on the narrow road, as on John's drawing; the summit and its gifts (lights, not labels) ── */
  var NADA=[7,16,25,34,43,52,60].map(function(bb,n){return n<6?bb:-bb}).map(function(bb){var p=ptAt(mid,Math.abs(bb));if(bb>0)word('nothing',1.85,p.x,p.z);bb=Math.abs(bb);
    var gl=D.glow(2.6);gl.material.opacity=0;gl.position.set(p.x,p.y+.5,p.z);st.add(gl);return {b:bb,gl:gl,lit:false,t:0}});
  var ring=new T.Mesh(new T.TorusGeometry(2.6,.06,8,48),new T.MeshBasicMaterial({color:0xfff2d0,transparent:true,opacity:0}));ring.rotation.x=PI/2;ring.scale.set(8.5/2.6,5.5/2.6,1);ring.position.set(0,.1,-76.5);st.add(ring);
  var gifts=[];for(i=0;i<9;i++){var gg=D.glow(1.5);gg.material.opacity=0;st.add(gg);var fl=q.fl(st,0,0,0,.7);fl.visible=false;gifts.push({gl:gg,fl:fl,t:-1,a:i/9*TAU})}
  var glory=D.glow(30);glory.material.fog=false;glory.material.opacity=.15;glory.position.set(0,9,-84);st.add(glory);
  var curtain=new T.Sprite(new T.SpriteMaterial({color:0x2a1f17,transparent:true,opacity:0,depthTest:false,depthWrite:false,fog:false}));curtain.renderOrder=999;curtain.position.z=-.5;curtain.scale.set(4,4,1);cam.add(curtain);

  /* ── the one place words appear: the typed bubble at eye level, one sentence at a time ── */
  var LQ=[],lHold=0,pipN=0;
  function show(o){if(o.pip&&pipN<items.length){pipN++;D.say('',o.s)}else D.hint(o.s);lHold=o.s.length*.045+(o.hold||1.5)}
  function line(s2,pip,hold){LQ.push({s:s2,pip:pip,hold:hold})}
  function now(s2,pip,hold){LQ.length=0;show({s:s2,pip:pip,hold:hold})}
  var MAX=["To enjoy everything, want joy in nothing.","To know everything, want to know nothing.","To own everything, want to own nothing.","To be everything, want to be nothing.","Stop at anything, and you stop rushing to the all.","Wanting nothing, the spirit rests.","And even on the mountain: nothing."];
  var ENDS=["The more I wanted to have them, the less I had.",null,"The more I went looking, the less I found."];

  /* ── John himself, seen from behind as on the mountain ── */
  var JS=.6,jy=0,jvy=0,john=null;try{john=X.john&&X.john()}catch(_){john=null}
  var jg=john?john.g:q.f(st,0,0,1.6,0);if(john)st.add(jg);
  /* his own lantern would wash out the shadow at his feet, where it should be darkest, so here it only glows */
  try{if(john&&john.lamp&&john.lamp.light){john.lamp.light.intensity*=.12;john.lamp.light.distance=6}}catch(_){}
  /* his shadow is real: a second light, in the same direction as the one across the desk, whose shadow map covers only the
     little patch of page around John, so that he and the goods near him cast sharp, long shadows */
  var LD=new T.Vector3(-175,104,-18).normalize(),key=new T.DirectionalLight(0xfff0d8,.8);key.castShadow=true;key.shadow.mapSize.set(1024,1024);key.shadow.bias=-.0006;key.shadow.normalBias=.03;
  (function(c){c.left=-11;c.right=11;c.top=11;c.bottom=-11;c.near=5;c.far=140;c.updateProjectionMatrix()})(key.shadow.camera);st.add(key);st.add(key.target);
  function hop(){if(jy<=0&&phase==='walk'&&!fade){jvy=9;jy=.001;note(520,0,.07,'sine',.03);note(780,.06,.1,'sine',.03)}}
  /* ── state ── */
  var me={road:-1,b:0,lat:0,v:0,size:1,sizeT:1},phase='walk',fade=null,firstGood=0,stepT=0,faceS=0,yawS=0,pitS=.52,topT=0,giftN=0,visited={};
  var walkHit=D.hit(st,0,1.2,4,1.2,function(){wake();auto=D.time+1.5});
  now("John's own drawing of the mountain. Three roads go in.",false,1.2);line(touch?'Drag to walk, and sideways to choose a road.':'W or ↑ to walk. A or D to choose a road.');
  function here(){return me.road<0?ptAt(foot,me.b):ptAt(ROADS[me.road].pts,me.b)}
  function enter(r){me.road=r;me.b=0;me.lat=clamp(me.lat-CX[r],-ROADS[r].half,ROADS[r].half);visited[r]=1;
    now(r===1?'The narrow road: nada, nothing, all the way up.':r===0?"Heaven's goods: a wide, easy road.":"Earth's goods: a wide, easy road.")}

  D.onUpdate(function(t,dt){
    dt=Math.min(dt,.05);var k,e8=1-Math.exp(-dt*8);sf+=(jf-sf)*e8;sl+=(jl-sl)*e8;
    var inF=(kb.f?1:0)-(kb.b?1:0),fwd=inF||(Math.abs(sf)>.03?Math.pow(Math.abs(sf),1.4)*Math.sign(sf):0),side=((kb.r?1:0)-(kb.l?1:0))||(Math.abs(sl)>.03?sl:0);
    if(!inF&&auto>D.time)fwd=1;if(phase!=='walk'||fade||introT<HOLD){fwd=0;side=0}
    var hurry=kb.run||Math.abs(sf)>.88,R=me.road<0?null:ROADS[me.road];
    var spd=(R?R.spd:4.4)*(hurry?1.6:1)*(.55+.45*me.size),tv=fwd*spd;me.v+=(tv-me.v)*Math.min(1,dt*(Math.abs(tv)>Math.abs(me.v)?11:13));
    var half=R?R.half:FOOTH;me.lat=clamp(me.lat+side*(R?3.8:6.5)*dt,-half,half);
    me.b+=me.v*dt;
    if(Math.abs(me.v)>.3){stepT-=dt*Math.abs(me.v)*1.3;if(stepT<=0){stepT=1;hiss(.06,me.road===1?700:1100,.02)}}
    /* the foot: where you stand across it chooses the road */
    if(me.road<0){if(me.b<0)me.b=0;if(me.b>=8){var gate=Math.abs(me.lat)<1.3?1:Math.abs(me.lat-CX[0])<2.6?0:Math.abs(me.lat-CX[2])<2.6?2:-1;if(gate<0){me.b=8;me.v=0}else enter(gate)}}
    else{if(me.b<0){var from=me.road;me.road=-1;me.b=7.9;me.lat=CX[from]+me.lat}
      else if(me.road!==1&&me.b>=R.L&&!fade){fade={t:0,r:me.road};now(ENDS[me.road],!said[me.road],.4);said[me.road]=1;note(196,0,1.6,'triangle',.035,.8)}
      else if(me.road===1&&me.b>=R.L&&phase==='walk'){phase='top';topT=0;me.b=R.L;note(294,0,2.4,'sine',.05);note(440,.1,2.4,'sine',.04);
        line('Here there is no road: the just need no law.',false,1.2);line("Only God's honour and glory live on this mountain.",false,1.2);line('Now that I want none of it, I have it all.',true,2.6)}}
    if(fade){fade.t+=dt;curtain.material.opacity=fade.t<.8?fade.t/.8:Math.max(0,1-(fade.t-1.1)/.8);
      if(fade.t>=.8&&me.road>=0){var fr=fade.r;me.road=-1;me.b=1;me.lat=0;me.v=0;me.sizeT=1;yawS=0;toks.forEach(function(o){if(o.r===fr&&o.got){o.got=false;o.t=0;o.g.visible=true;o.g.scale.setScalar(1)}});
        line('That road never reaches the top.')}
      if(fade.t>2){fade=null;curtain.material.opacity=0}}
    if(me.road===1)NADA.forEach(function(n,j){if(!n.lit&&me.b>=n.b-.6){n.lit=true;note([392,440,494,523,587,659,698][j],0,1.4,'sine',.035);note(196,0,1.4,'triangle',.02);
      if(LQ.length||lHold>.9)line(MAX[j],j===0);else now(MAX[j],j===0)}});
    NADA.forEach(function(n){if(!n.lit||n.t>=1)return;n.t=Math.min(1,n.t+dt*.7);n.gl.material.opacity=.6*Math.sin(n.t*PI)+.3*n.t})

    /* the goods: walk into one and take it; sweet, and you are smaller */
    var hp=here(),rx=Math.cos(hp.h),rz=Math.sin(hp.h),ex=hp.x+rx*me.lat,ez=hp.z+rz*me.lat;
    toks.forEach(function(o){o.body.rotation.y+=dt*.8;
      if(!o.got){o.g.position.y=o.y0+Math.sin(t*1.6+o.p)*.12;if(me.road===o.r&&Math.abs(me.b-o.b)<1.1&&Math.hypot(ex-o.g.position.x,ez-o.g.position.z)<1.9){o.got=true;o.t=0;
          me.sizeT*=.8;note(784,0,.5,'sine',.04);note(988,.07,.5,'sine',.035);note(1319,.14,.6,'sine',.03);note(330,.5,.8,'triangle',.03,.7);
          if(!firstGood){firstGood=1;now(o.nm+'. Sweet, but you shrink.')}else if(LQ.length||lHold>1.2)line(o.nm+'.',false,.6);else now(o.nm+'.',false,.6)}}
      else if(o.t<1){o.t+=dt*2;var e=Math.min(1,o.t);o.g.position.set(o.g.position.x+(ex-o.g.position.x)*e*.3,o.g.position.y+(hp.y+me.size*1.6-o.g.position.y)*e*.3,o.g.position.z+(ez-o.g.position.z)*e*.3);o.g.scale.setScalar(Math.max(.01,1-e));if(e>=1)o.g.visible=false}});
    me.size+=(me.sizeT-me.size)*Math.min(1,dt*2.5);

    /* the summit: the gifts come by themselves, and you grow */
    if(phase==='top'){topT+=dt;me.sizeT=1.15;
      if(giftN<gifts.length&&topT>4+giftN*.5){var gf=gifts[giftN];gf.t=0;gf.fl.visible=true;note([523,587,659,698,784,880,988,1047,1175][giftN],0,1.6,'sine',.035);giftN++}
      glory.material.opacity=.15+.5*sstep(1,6,topT);ring.material.opacity=.7*sstep(1.5,4,topT);
      if(topT>8&&!LQ.length&&lHold<=0&&!D.finished){live=false;D.done()}}
    gifts.forEach(function(gf){if(gf.t<0)return;gf.t+=dt;var a=gf.a+t*.15,r2=4.5,y=.1+Math.min(1.2,gf.t*1.1);gf.fl.position.set(Math.cos(a)*r2,y,-76.5+Math.sin(a)*r2*.62);gf.gl.position.set(gf.fl.position.x,y+.3,gf.fl.position.z);gf.gl.material.opacity=.45*Math.min(1,gf.t)});
    if(lHold>0)lHold-=dt;else if(LQ.length)show(LQ.shift());
    var day=phase==='top'?sstep(1,7,topT):0;D.sc.background.setRGB(SKY[0]+.62*day,SKY[1]+.56*day,SKY[2]+.46*day);if(hemi)hemi.intensity=.07+.4*day;if(vig)vig.material.opacity=1-.7*day;if(D.sc.fog)D.sc.fog.color.copy(D.sc.background);
    D.light(-.2+.6*day);
    var wp=me.road<0?ptAt(foot,me.b+3):ptAt(ROADS[me.road].pts,Math.min(ROADS[me.road].L,me.b+3));walkHit.position.set(wp.x,wp.y+1.2,wp.z);
    me.ex=ex;me.ez=ez;me.ey=hp.y;me.h=hp.h;
    if(jy>0){jvy-=26*dt;jy+=jvy*dt;if(jy<=0){jy=0;jvy=0}}
    var sc=JS*me.size,wk=Math.min(1,Math.abs(me.v)/2);jg.position.set(ex,hp.y+jy+(reduce?0:Math.abs(Math.sin(t*9))*.07*wk*me.size),ez);jg.scale.set(sc,sc,sc);
    key.target.position.set(ex,0,ez);key.position.set(ex+LD.x*60,LD.y*60,ez+LD.z*60);
    var face=hp.h+(me.v<-.2?PI:0)+(Math.abs(side)>.1&&Math.abs(me.v)<.3?side*PI/2:0);faceS+=wrapA(face-faceS)*Math.min(1,dt*10);jg.rotation.y=Math.atan2(Math.sin(faceS),-Math.cos(faceS));
  });

  /* the camera follows behind John, as on the mountain; drag to look round him */
  /* the camera: first an establishing shot from high over the desk (the sheet, the inkpot and quill, the books, the rosary,
     and one tiny figure at the foot of the drawing); then it comes down behind John and follows him as on the mountain;
     at the summit it rises over the whole drawing again */
  var distS=7,cp=new T.Vector3(),cl=new T.Vector3(),ep=new T.Vector3(),el=new T.Vector3(0,0,-48);
  D.camFn=function(cam,dt){
    var ex=me.ex||0,ez=me.ez==null?8:me.ez,ey=me.ey||0,k=.55+.45*me.size,top=phase==='top',dist=top?62:(cam.aspect<.85?8.5:7)*k;
    var yaw=(me.h||0)+(top?0:(D.yaw||0));yawS+=wrapA(yaw-yawS)*Math.min(1,dt*4);
    var e=Math.min(1,dt*(top?.5:1.3));pitS+=((top?1.15:.52)-pitS)*e;distS+=(dist-distS)*e;
    var hd=distS*Math.cos(pitS),lz=top?ez+22:ez;
    cp.set(ex-Math.sin(yawS)*hd,ey+1.1*k+distS*Math.sin(pitS),lz+Math.cos(yawS)*hd);cl.set(ex,ey+1.5*k,lz);
    introT+=dt;var ik=1-sstep(HOLD,HOLD+BLEND,introT);
    if(ik>0){var hh=cam.aspect<.85?Math.min(420,190/Math.max(.3,cam.aspect)):205;ep.set(0,hh,-48+hh*.16);cp.lerp(ep,ik);cl.lerp(el,ik)}
    if(D.sc.fog)D.sc.fog.density=.005-.0044*ik;
    cam.position.copy(cp);cam.lookAt(cl);cam.near=Math.max(.4,Math.min(24,cp.distanceTo(cl)*.09));
    if(vig){var vh=Math.tan((cam.aspect<.85?64:52)*PI/360)*1.02;vig.scale.set(vh*cam.aspect,vh,1)}
    cam.fov=cam.aspect<.85?64:52;cam.far=Math.max(cam.far||0,1200);cam.updateProjectionMatrix();
  };
  D._gf=function(){return {stage:phase,road:me.road,b:+me.b.toFixed(1),lat:+me.lat.toFixed(1),size:+me.size.toFixed(2),gifts:giftN}};
  D.fpCleanup=function(){
    live=false;
    try{window.removeEventListener('keydown',kd,true);window.removeEventListener('keyup',ku,true);window.removeEventListener('pointerdown',pd,true);window.removeEventListener('pointermove',pm,true);
      window.removeEventListener('pointerup',pu,true);window.removeEventListener('pointercancel',pu,true)}catch(_){}
    try{cam.remove(curtain);if(vig)cam.remove(vig)}catch(_){}
    hid.forEach(function(o){o.visible=true});if(hemi)hemi.intensity=hemi0;if(sun&&sun0){var c0=sun.shadow.camera;sun.position.copy(sun0.p);sun.target.position.set(0,0,0);sun.intensity=sun0.i;c0.left=sun0.l;c0.right=sun0.r;c0.top=sun0.t;c0.bottom=sun0.b;c0.near=sun0.n;c0.far=sun0.f;c0.updateProjectionMatrix();sun.shadow.normalBias=sun0.nb;sun.shadow.bias=sun0.bi}
    D.sc.fog=null;D.sc.background=D.sky;D.floor.visible=true;D.camFn=null;cam.fov=45;cam.far=500;cam.near=.1;try{cam.updateProjectionMatrix()}catch(_){}
  };
};
})();
