/* Easter egg: a hole in the plain at the foot of the mountain. Fall in, drop down a long shaft,
   and land in the Nada Bowl, an underground skatepark. Free skating, no scores. */
window.makeSkate=function(ctx){
'use strict';
var T=ctx.T,keys=ctx.keys,tone=ctx.tone||function(){},PI=Math.PI;
var scene=new T.Scene(),cam=new T.PerspectiveCamera(60,1,.1,900);
scene.background=new T.Color(0x1a120d);scene.fog=new T.FogExp2(0x1a120d,.0085);
var hemi=new T.HemisphereLight(0xffffff,0x3a2a20,.55);scene.add(hemi);
var key=new T.PointLight(0xffffff,.9,140,1.4);key.position.set(0,30,0);scene.add(key);
function M(c,r){return new T.MeshStandardMaterial({color:c,roughness:r==null?1:r,map:ctx.ink||null})}
var stone=M(0x8a7360),dark=M(0x3d2c22),pale=M(0xd8cab4),wood=M(0x7a5a40),deck=M(0x5a4030,.8);

/* ── the park: a wooden bowl like a backyard mini-bowl, closed all round so the line never ends. A flat bottom shaped like a
   rounded rectangle, a transition on every side rising to vertical at the coping, a deck round the rim on an open wooden
   frame, floodlights at the corners. One height function, built from the distance to the flat bottom, drives riding,
   airs and landing everywhere. ── */
var R=16,FX=34,FZ=12,CR=9,DECK=8,OX=FX+R,OZ=FZ+R,DX=OX+DECK,DZ=OZ+DECK;
function sdf(x,z){var qx=Math.abs(x)-FX+CR,qz=Math.abs(z)-FZ+CR,mx=Math.max(qx,0),mz=Math.max(qz,0);return Math.sqrt(mx*mx+mz*mz)+Math.min(Math.max(qx,qz),0)-CR}
function outward(x,z){var e=.05,gx=sdf(x+e,z)-sdf(x-e,z),gz=sdf(x,z+e)-sdf(x,z-e),l=Math.sqrt(gx*gx+gz*gz)||1;return {x:gx/l,z:gz/l}}
function clampPark(x,z){var d=sdf(x,z),lim=R-.05;if(d<=lim)return [x,z];var o=outward(x,z);return [x-o.x*(d-lim),z-o.z*(d-lim)]}
function hRamps(x,z){var u=sdf(x,z);if(u<=0)return 0;if(u>=R)return R;return R-Math.sqrt(R*R-u*u)}
function hgt(x,z){return hRamps(x,z)}
function grad(x,z){var e=.08;return {x:(hRamps(x+e,z)-hRamps(x-e,z))/(2*e),z:(hRamps(x,z+e)-hRamps(x,z-e))/(2*e)}}
/* the flat bottom's edge, walked by distance s: a point on it and the outward normal there */
var SEGL=[2*(FX-CR),PI*CR/2,2*(FZ-CR),PI*CR/2,2*(FX-CR),PI*CR/2,2*(FZ-CR),PI*CR/2],PER=0;SEGL.forEach(function(l){PER+=l});
function outline(s){s=((s%PER)+PER)%PER;var k=0;while(k<7&&s>SEGL[k]){s-=SEGL[k];k++}var ax=FX-CR,az=FZ-CR,a;
  switch(k){case 0:return {px:-ax+s,pz:FZ,nx:0,nz:1};case 1:a=PI/2-s/CR;return {px:ax+CR*Math.cos(a),pz:az+CR*Math.sin(a),nx:Math.cos(a),nz:Math.sin(a)};
    case 2:return {px:FX,pz:az-s,nx:1,nz:0};case 3:a=-s/CR;return {px:ax+CR*Math.cos(a),pz:-az+CR*Math.sin(a),nx:Math.cos(a),nz:Math.sin(a)};
    case 4:return {px:ax-s,pz:-FZ,nx:0,nz:-1};case 5:a=-PI/2-s/CR;return {px:-ax+CR*Math.cos(a),pz:-az+CR*Math.sin(a),nx:Math.cos(a),nz:Math.sin(a)};
    case 6:return {px:-FX,pz:-az+s,nx:-1,nz:0};default:a=PI-s/CR;return {px:-ax+CR*Math.cos(a),pz:az+CR*Math.sin(a),nx:Math.cos(a),nz:Math.sin(a)}}}
/* a point on the transition: s round the bowl, a from 0 (flat) to PI/2 (vertical at the coping), off lifts it off the surface */
function wallPt(s,a,off){var o=outline(s),rr=R-(off||0);return [o.px+o.nx*rr*Math.sin(a),R-rr*Math.cos(a),o.pz+o.nz*rr*Math.sin(a)]}
var COPING=[],NCOP=200;for(var ci=0;ci<NCOP;ci++){var cp0=outline(ci/NCOP*PER);COPING.push([cp0.px+cp0.nx*R,R,cp0.pz+cp0.nz*R])}
(function(){
  var ply=new T.MeshStandardMaterial({color:0xffffff,vertexColors:true,roughness:.8,map:ctx.ink||null,side:T.DoubleSide});
  /* the transitions: one smooth sheet all the way round */
  var NS=520,NA=44,pos=[],col=[],uv=[],ix=[],i,j;
  for(i=0;i<=NS;i++)for(j=0;j<=NA;j++){var a=PI/2*Math.pow(j/NA,.85),q=wallPt(i/NS*PER,a,0),y=q[1],sheet=(Math.abs(((i/NS*PER)+100)%2.44)<.12)?.9:1,
      band=y>R*.86?.55:1,c=.78*band*sheet;pos.push(q[0],q[1],q[2]);uv.push(q[0]*.03,q[2]*.03+y*.03);col.push(c*1.12,c*.86,c*.62)}
  for(i=0;i<NS;i++)for(j=0;j<NA;j++){var k0=i*(NA+1)+j;ix.push(k0,k0+NA+1,k0+1,k0+1,k0+NA+1,k0+NA+2)}
  var g=new T.BufferGeometry();g.setAttribute('position',new T.Float32BufferAttribute(pos,3));g.setAttribute('color',new T.Float32BufferAttribute(col,3));g.setAttribute('uv',new T.Float32BufferAttribute(uv,2));g.setIndex(ix);g.computeVertexNormals();
  scene.add(new T.Mesh(g,ply));
  /* the flat bottom, and the deck round the rim with the bowl cut out of it */
  function loop(off,n){var pts=[];for(var k=0;k<n;k++){var o=outline(k/n*PER);pts.push(new T.Vector2(o.px+o.nx*off,-(o.pz+o.nz*off)))}return pts}
  var flatG=new T.ShapeGeometry(new T.Shape(loop(0,160)));flatG.rotateX(-PI/2);
  var fc=[],fp=flatG.attributes.position;for(i=0;i<fp.count;i++){var sx=fp.getX(i),sh=(Math.abs((sx+100)%2.44)<.06)?.9:1;fc.push(.78*1.12*sh,.78*.86*sh,.78*.62*sh)}
  flatG.setAttribute('color',new T.Float32BufferAttribute(fc,3));scene.add(new T.Mesh(flatG,ply));
  var deckS=new T.Shape([new T.Vector2(-DX,-DZ),new T.Vector2(DX,-DZ),new T.Vector2(DX,DZ),new T.Vector2(-DX,DZ)]);deckS.holes.push(new T.Path(loop(R,200).reverse()));
  var deckG=new T.ShapeGeometry(deckS);deckG.rotateX(-PI/2);deckG.translate(0,R,0);var dm=new T.Mesh(deckG,M(0x8a6648,.8));dm.material.side=T.DoubleSide;scene.add(dm);
  /* the coping: a steel pipe all the way round the rim */
  var cpts=COPING.map(function(p){return new T.Vector3(p[0],p[1],p[2])});
  scene.add(new T.Mesh(new T.TubeGeometry(new T.CatmullRomCurve3(cpts,true),400,.32,8,true),M(0xd8ccb4,.3)));
  /* the open wooden frame under the deck, like the photo: dark backing, pale ribs and rails */
  var back=M(0x241a14),rib=M(0x9a7650,.8);
  [[0,DZ,2*DX,0],[0,-DZ,2*DX,0],[DX,0,2*DZ,1],[-DX,0,2*DZ,1]].forEach(function(w){
    var len=w[2],pan=new T.Mesh(new T.BoxGeometry(w[3]?.3:len,R,w[3]?len:.3),back);pan.position.set(w[0]*(w[3]?.985:1),R/2,w[1]*(w[3]?1:.985));scene.add(pan);
    for(var t=-len/2;t<=len/2+.01;t+=len/Math.round(len/6)){var rb=new T.Mesh(new T.BoxGeometry(w[3]?.6:.5,R,w[3]?.5:.6),rib);rb.position.set(w[3]?w[0]:t,R/2,w[3]?t:w[1]);scene.add(rb)}
    [R*.5,R-.2].forEach(function(hy){var rl=new T.Mesh(new T.BoxGeometry(w[3]?.55:len,.5,w[3]?len:.55),rib);rl.position.set(w[0],hy,w[1]);scene.add(rl)})});
  /* a railing at each end, and floodlights at the corners */
  var rm=M(0x5a4a3a,.5);[-1,1].forEach(function(sx){var xr=sx*(DX-.5);for(var z=-DZ+1;z<=DZ-1;z+=3.25){var po=new T.Mesh(new T.BoxGeometry(.14,1.3,.14),rm);po.position.set(xr,R+.65,z);scene.add(po)}
    var bar=new T.Mesh(new T.BoxGeometry(.14,.14,2*DZ-2),rm);bar.position.set(xr,R+1.3,0);scene.add(bar);
    [-1,1].forEach(function(sz){var lx=sx*(DX-1.5),lz=sz*(DZ-1.5),pole=new T.Mesh(new T.CylinderGeometry(.16,.2,14,8),M(0x2c2018));pole.position.set(lx,R+7,lz);scene.add(pole);
      var lamp=new T.Mesh(new T.BoxGeometry(1.6,.8,.7),new T.MeshBasicMaterial({color:0xffffff}));lamp.position.set(lx,R+14,lz);scene.add(lamp);
      var gl=ctx.glow(12);gl.position.copy(lamp.position);gl.material.opacity=.6;scene.add(gl);
      var sp=new T.SpotLight(0xffffff,.75,140,.8,.5,1.2);sp.position.copy(lamp.position);sp.target.position.set(0,0,0);scene.add(sp);scene.add(sp.target)})});
  /* the grind rail on the long deck, just behind the coping, like a sign rail */
  var rz=OZ+2.6,rm2=M(0xd8ccb4,.3),rail=new T.Mesh(new T.CylinderGeometry(.12,.12,18,10),rm2);rail.rotation.z=PI/2;rail.position.set(4,R+1.4,rz);scene.add(rail);
  [-1,1].forEach(function(e){var l=new T.Mesh(new T.BoxGeometry(.14,1.4,.14),M(0x3d2c22));l.position.set(4+e*8.4,R+.7,rz);scene.add(l)});
  var sign=new T.Mesh(new T.BoxGeometry(10,1.1,.08),M(0x6b5444));sign.position.set(4,R+.7,rz+.06);scene.add(sign);
  /* cavern floor below everything */
  var gr=new T.Mesh(new T.CircleGeometry(260,48),dark);gr.rotation.x=-PI/2;gr.position.y=-1;scene.add(gr)})();
/* ── stickers on the ramp, the way a real ramp collects them, but Catholic. All original designs, drawn on canvases. ── */
(function(){try{
  var FONT='"Arial Black","Helvetica Neue",Helvetica,Arial,sans-serif';
  function cv(w,h){var c=document.createElement('canvas');c.width=w;c.height=h;return c}
  function rr(g,x,y,w,h,r){g.beginPath();g.moveTo(x+r,y);g.arcTo(x+w,y,x+w,y+h,r);g.arcTo(x+w,y+h,x,y+h,r);g.arcTo(x,y+h,x,y,r);g.arcTo(x,y,x+w,y,r);g.closePath()}
  function txt(g,t,x,y,size,fill,stroke,sw){g.font='900 '+size+'px '+FONT;g.textAlign='center';g.textBaseline='middle';if(stroke){g.lineJoin='round';g.lineWidth=sw||size*.18;g.strokeStyle=stroke;g.strokeText(t,x,y)}g.fillStyle=fill;g.fillText(t,x,y)}
  function fit(g,t,maxW,size){g.font='900 '+size+'px '+FONT;var w=g.measureText(t).width;return w>maxW?size*maxW/w:size}
  function cross(g,x,y,s,col){g.fillStyle=col;g.fillRect(x-s*.12,y-s*.5,s*.24,s);g.fillRect(x-s*.36,y-s*.22,s*.72,s*.22)}
  function star(g,x,y,r,col){g.beginPath();for(var k=0;k<10;k++){var a=-Math.PI/2+k*Math.PI/5,q=k%2?r*.42:r;g.lineTo(x+Math.cos(a)*q,y+Math.sin(a)*q)}g.closePath();g.fillStyle=col;g.fill()}
  function flame(g,x,y,w,h,col){g.beginPath();g.moveTo(x-w/2,y);g.bezierCurveTo(x-w/2,y-h*.5,x-w*.1,y-h*.55,x,y-h);g.bezierCurveTo(x+w*.1,y-h*.55,x+w/2,y-h*.5,x+w/2,y);g.closePath();g.fillStyle=col;g.fill()}
  function heart(g,x,y,s,col){g.beginPath();g.moveTo(x,y+s*.42);g.bezierCurveTo(x-s*.75,y-s*.05,x-s*.45,y-s*.6,x,y-s*.25);g.bezierCurveTo(x+s*.45,y-s*.6,x+s*.75,y-s*.05,x,y+s*.42);g.fillStyle=col;g.fill()}
  var D={
    nadaFlame:function(){var c=cv(512,256),g=c.getContext('2d');rr(g,6,40,500,180,30);g.fillStyle='#fff';g.fill();
      for(var k=0;k<9;k++)flame(g,60+k*49,140,60,90+((k*37)%40),k%2?'#e0561b':'#f2a51c');txt(g,'NADA',256,128,fit(g,'NADA',400,112),'#ffd23a','#1a0d07',20);txt(g,'LIVING FLAME',256,198,24,'#1a0d07');return [c,2]},
    sacredHeart:function(){var c=cv(256,256),g=c.getContext('2d');g.beginPath();g.arc(128,128,122,0,7);g.fillStyle='#fff';g.fill();g.beginPath();g.arc(128,128,108,0,7);g.fillStyle='#f4e7c8';g.fill();
      for(var k=0;k<3;k++)flame(g,108+k*20,98,22,46+(k===1?14:0),'#e8761f');cross(g,128,52,34,'#5a2a14');heart(g,128,138,118,'#c1121f');
      g.strokeStyle='#3b2a12';g.lineWidth=6;g.beginPath();g.ellipse(128,128,46,14,-.15,0,7);g.stroke();for(var j=0;j<10;j++){var a=j/10*6.28;g.beginPath();g.moveTo(128+Math.cos(a)*46,128+Math.sin(a)*14);g.lineTo(128+Math.cos(a)*58,128+Math.sin(a)*20-6);g.stroke()}return [c,1]},
    carmel:function(){var c=cv(256,300),g=c.getContext('2d');g.beginPath();g.moveTo(28,40);g.lineTo(228,40);g.lineTo(228,170);g.quadraticCurveTo(228,262,128,292);g.quadraticCurveTo(28,262,28,170);g.closePath();g.fillStyle='#fff';g.fill();
      g.beginPath();g.moveTo(40,52);g.lineTo(216,52);g.lineTo(216,170);g.quadraticCurveTo(216,252,128,278);g.quadraticCurveTo(40,252,40,170);g.closePath();g.fillStyle='#6a4426';g.fill();
      g.beginPath();g.moveTo(40,250);g.lineTo(128,92);g.lineTo(216,250);g.quadraticCurveTo(200,262,128,278);g.quadraticCurveTo(56,262,40,250);g.fillStyle='#f3ead7';g.fill();
      cross(g,128,66,46,'#f3ead7');star(g,80,110,18,'#f3ead7');star(g,176,110,18,'#f3ead7');star(g,128,214,20,'#6a4426');return [c,.85]},
    mementoMori:function(){var c=cv(256,256),g=c.getContext('2d');rr(g,10,10,236,236,18);g.fillStyle='#e9f1f7';g.fill();rr(g,22,22,212,212,12);g.fillStyle='#9cc6e4';g.fill();
      g.strokeStyle='#fff';g.lineWidth=16;g.lineCap='round';g.beginPath();g.moveTo(70,190);g.lineTo(186,96);g.moveTo(70,96);g.lineTo(186,190);g.stroke();
      g.fillStyle='#fff';g.beginPath();g.arc(128,108,48,0,7);g.fill();g.fillRect(100,130,56,34);g.fillStyle='#1d2a33';g.beginPath();g.arc(108,108,13,0,7);g.arc(148,108,13,0,7);g.fill();
      g.beginPath();g.moveTo(128,120);g.lineTo(120,136);g.lineTo(136,136);g.fill();for(var k=0;k<4;k++)g.fillRect(108+k*12,146,4,16);txt(g,'MEMENTO MORI',128,214,fit(g,'MEMENTO MORI',196,28),'#fff','#1d2a33',6);return [c,1]},
    aveMaria:function(){var c=cv(256,256),g=c.getContext('2d');g.beginPath();g.arc(128,128,124,0,7);g.fillStyle='#fff';g.fill();g.beginPath();g.arc(128,128,110,0,7);g.fillStyle='#24438f';g.fill();
      txt(g,'M',128,140,120,'#fff');cross(g,128,60,40,'#fff');for(var k=0;k<12;k++){var a=k/12*6.28;if(a>.75&&a<2.4)continue;star(g,128+Math.cos(a)*92,128+Math.sin(a)*92,8,'#ffd75a')}txt(g,'AVE MARIA',128,206,22,'#ffd75a');return [c,1]},
    chiRho:function(){var c=cv(256,256),g=c.getContext('2d');g.beginPath();g.arc(128,128,124,0,7);g.fillStyle='#fff';g.fill();g.beginPath();g.arc(128,128,112,0,7);g.fillStyle='#111';g.fill();
      g.strokeStyle='#fff';g.lineWidth=20;g.lineCap='round';g.beginPath();g.moveTo(78,72);g.lineTo(178,184);g.moveTo(178,72);g.lineTo(78,184);g.moveTo(128,50);g.lineTo(128,206);g.stroke();g.beginPath();g.arc(146,84,34,-Math.PI/2,Math.PI/2);g.stroke();return [c,1]},
    ihs:function(){var c=cv(256,256),g=c.getContext('2d');g.save();g.translate(128,128);for(var k=0;k<32;k++){g.rotate(Math.PI/16);g.beginPath();g.moveTo(-9,0);g.lineTo(0,k%2?-124:-104);g.lineTo(9,0);g.fillStyle=k%2?'#f2b90f':'#ffd75a';g.fill()}g.restore();
      g.beginPath();g.arc(128,128,74,0,7);g.fillStyle='#fff7df';g.fill();txt(g,'IHS',128,134,fit(g,'IHS',120,70),'#7a1f12');cross(g,128,82,26,'#7a1f12');return [c,1]},
    dove:function(){var c=cv(256,256),g=c.getContext('2d');rr(g,8,8,240,240,120);g.fillStyle='#fff';g.fill();rr(g,20,20,216,216,108);g.fillStyle='#ef8a1d';g.fill();
      g.strokeStyle='#ffe2a6';g.lineWidth=5;for(var k=0;k<14;k++){var a=k/14*6.28;g.beginPath();g.moveTo(128+Math.cos(a)*50,118+Math.sin(a)*50);g.lineTo(128+Math.cos(a)*100,118+Math.sin(a)*100);g.stroke()}
      g.fillStyle='#fff';g.beginPath();g.ellipse(128,124,40,18,0,0,7);g.fill();g.beginPath();g.moveTo(96,120);g.quadraticCurveTo(60,64,40,70);g.quadraticCurveTo(80,110,104,128);g.fill();g.beginPath();g.moveTo(160,120);g.quadraticCurveTo(196,64,216,70);g.quadraticCurveTo(176,110,152,128);g.fill();
      g.beginPath();g.arc(128,100,15,0,7);g.fill();g.beginPath();g.moveTo(116,140);g.lineTo(128,176);g.lineTo(140,140);g.fill();txt(g,'VENI',128,206,30,'#fff','#8a3a08',6);return [c,1]},
    keys:function(){var c=cv(256,256),g=c.getContext('2d');rr(g,10,10,236,236,40);g.fillStyle='#fff';g.fill();rr(g,22,22,212,212,30);g.fillStyle='#8a1e1e';g.fill();
      [[1,'#ffd75a'],[-1,'#e8e8e8']].forEach(function(o){g.save();g.translate(128,128);g.rotate(o[0]*.75);g.fillStyle=o[1];g.fillRect(-7,-84,14,150);g.beginPath();g.arc(0,-84,22,0,7);g.fill();g.fillStyle='#8a1e1e';g.beginPath();g.arc(0,-84,9,0,7);g.fill();
        g.fillStyle=o[1];g.fillRect(0,40,34,12);g.fillRect(0,58,26,10);g.restore()});return [c,1]},
    nadaTeTurbe:function(){var c=cv(512,180),g=c.getContext('2d');g.save();g.translate(256,90);g.rotate(-.06);rr(g,-240,-62,480,124,10);g.fillStyle='#111';g.fill();rr(g,-228,-50,456,100,6);g.fillStyle='#ffe14d';g.fill();
      txt(g,'NADA TE TURBE',0,4,fit(g,'NADA TE TURBE',420,64),'#111');g.restore();return [c,2.8]},
    darkNight:function(){var c=cv(512,256),g=c.getContext('2d');rr(g,8,8,496,240,24);g.fillStyle='#fff';g.fill();rr(g,20,20,472,216,16);g.fillStyle='#14121f';g.fill();
      g.beginPath();g.arc(92,110,52,0,7);g.fillStyle='#f5e7b8';g.fill();g.beginPath();g.arc(114,96,48,0,7);g.fillStyle='#14121f';g.fill();for(var k=0;k<14;k++)star(g,40+((k*97)%440),40+((k*53)%170),4+k%3*2,'#f5e7b8');
      txt(g,'DARK NIGHT',300,110,fit(g,'DARK NIGHT',300,64),'#f5e7b8');txt(g,'SKATEBOARDS',300,170,30,'#9aa3c7');return [c,2]},
    stJohn:function(){var c=cv(256,256),g=c.getContext('2d');g.beginPath();g.arc(128,128,124,0,7);g.fillStyle='#1a120c';g.fill();g.beginPath();g.arc(128,128,112,0,7);g.fillStyle='#d9c29a';g.fill();
      g.beginPath();g.arc(128,128,74,0,7);g.fillStyle='#4a2f1d';g.fill();cross(g,128,128,96,'#d9c29a');
      g.save();g.translate(128,128);g.font='900 21px '+FONT;g.fillStyle='#1a120c';g.textAlign='center';g.textBaseline='middle';var t='ST JOHN OF THE CROSS · PRAY FOR US · ';for(var k=0;k<t.length;k++){g.save();g.rotate(k/t.length*6.283);g.fillText(t[k],0,-93);g.restore()}g.restore();return [c,1]},
    rosary:function(){var c=cv(256,256),g=c.getContext('2d');g.beginPath();g.arc(128,128,124,0,7);g.fillStyle='#fff';g.fill();
      for(var k=0;k<30;k++){var a=k/30*6.28;g.beginPath();g.arc(128+Math.cos(a)*84,112+Math.sin(a)*72,k%6?7:11,0,7);g.fillStyle='#5b2c83';g.fill()}
      g.strokeStyle='#5b2c83';g.lineWidth=6;g.beginPath();g.moveTo(128,184);g.lineTo(128,206);g.stroke();cross(g,128,222,40,'#5b2c83');txt(g,'PRAY',128,112,44,'#5b2c83');return [c,1]},
    ascent:function(){var c=cv(512,220),g=c.getContext('2d');rr(g,6,6,500,208,104);g.fillStyle='#fff';g.fill();rr(g,18,18,476,184,92);g.fillStyle='#2f6b4a';g.fill();
      g.beginPath();g.moveTo(40,190);g.lineTo(130,52);g.lineTo(220,190);g.closePath();g.fillStyle='#e9f0e3';g.fill();cross(g,130,46,30,'#e9f0e3');
      txt(g,'ASCENT',360,96,fit(g,'ASCENT',240,70),'#fff');txt(g,'OF MOUNT CARMEL',360,152,24,'#bfe0c8');return [c,2.3]}
  };
  var names=Object.keys(D),mats={};
  names.forEach(function(n){var r=D[n](),tex=new T.CanvasTexture(r[0]);tex.anisotropy=4;
    mats[n]={m:new T.MeshStandardMaterial({map:tex,alphaTest:.5,roughness:.5,side:T.DoubleSide,polygonOffset:true,polygonOffsetFactor:-2,polygonOffsetUnits:-2}),asp:r[1]}});
  var rnd=(function(){var s=7;return function(){s=(s*16807)%2147483647;return (s-1)/2147483646}})();
  /* a sticker bent onto the curved transition: sd picks the wall, xc where along it, a0 how far up the curve */
  function onWall(n,s0,a0,size,rot,offp){var st=mats[n],w=size*Math.sqrt(st.asp),h=size/Math.sqrt(st.asp),N=8,pos=[],uv=[],ix=[],i,j,off=offp||.04,cr=Math.cos(rot),sr=Math.sin(rot);
    var p1=wallPt(s0+.05,a0,off),p0=wallPt(s0-.05,a0,off),tx=p1[0]-p0[0],tz=p1[2]-p0[2],str=Math.sqrt(tx*tx+tz*tz)/.1,o=outline(s0),sg=(tx*-o.nz+tz*o.nx)>=0?1:-1;
    for(j=0;j<=N;j++)for(i=0;i<=N;i++){var ls=(i/N-.5)*w,lt=(j/N-.5)*h,u=ls*cr-lt*sr,v=ls*sr+lt*cr,q=wallPt(s0+sg*u/str,a0+v/R,off);pos.push(q[0],q[1],q[2]);uv.push(i/N,j/N)}
    for(j=0;j<N;j++)for(i=0;i<N;i++){var k=j*(N+1)+i;ix.push(k,k+1,k+N+1,k+1,k+N+2,k+N+1)}
    var g=new T.BufferGeometry();g.setAttribute('position',new T.Float32BufferAttribute(pos,3));g.setAttribute('uv',new T.Float32BufferAttribute(uv,2));g.setIndex(ix);g.computeVertexNormals();
    scene.add(new T.Mesh(g,st.m))}
  function onDeck(n,x,z,size,rot){var st=mats[n],m=new T.Mesh(new T.PlaneGeometry(size*Math.sqrt(st.asp),size/Math.sqrt(st.asp)),st.m);m.rotation.set(-PI/2,0,rot);m.position.set(x,R+.015,z);scene.add(m)}
  var order=names.slice().sort(function(){return rnd()-.5}),slots=40;
  for(var k=0;k<slots;k++){var n=order[k%order.length],s0=PER*(k+.2+rnd()*.6)/slots,
    a0=.95+rnd()*.42,size=mats[n].asp>1.5?3.8+rnd()*1:2.1+rnd()*1.1,rot=(rnd()-.5)*.5;
    if(a0+size/(2*R)>1.5)a0=1.5-size/(2*R);onWall(n,s0,a0,size,rot)}
  for(k=0;k<14;k++){var n2=order[(k+5)%order.length],sd=outline(rnd()*PER),dd=R+1.6+rnd()*(DECK-3.4),dx=sd.px+sd.nx*dd,dz=sd.pz+sd.nz*dd;
    if(Math.abs(dx)<DX-1.2&&Math.abs(dz)<DZ-1.2&&!(dz>OZ+1&&dz<OZ+4.2&&dx>-6&&dx<14))onDeck(n2,dx,dz,2.2+rnd()*1.2,rnd()*PI*2)}
  /* the user's own "Nada, nada, nada" sticker: big, eight times round the bowl and once on each end deck, on top of the others */
  var NS=window.NADA_STICKER;
  if(NS&&NS.src&&typeof Image!=='undefined'){var img=new Image(),ntex=new T.Texture(img);ntex.minFilter=T.LinearFilter;ntex.generateMipmaps=false;img.onload=function(){ntex.needsUpdate=true};img.src=NS.src;
    mats.nadaUser={m:new T.MeshStandardMaterial({map:ntex,alphaTest:.5,roughness:.5,side:T.DoubleSide,polygonOffset:true,polygonOffsetFactor:-4,polygonOffsetUnits:-4}),asp:NS.asp};
    for(k=0;k<8;k++)onWall('nadaUser',PER*(k+.5)/8+(rnd()-.5)*4,1.1+rnd()*.12,4.4,(rnd()-.5)*.3,.08);
    onDeck('nadaUser',DX-4,0,3.6,PI/2);onDeck('nadaUser',-(DX-4),0,3.6,-PI/2)}
}catch(_){}})();
/* the cavern: rock vault far overhead, a few hanging lanterns */
(function(){var g=new T.SphereGeometry(110,40,24,0,PI*2,0,PI/2),p=g.attributes.position;for(var i=0;i<p.count;i++){var x=p.getX(i),y=p.getY(i),z=p.getZ(i),k=1+.08*Math.sin(x*.13)*Math.cos(z*.11)+.05*Math.sin(y*.3);p.setXYZ(i,x*k,y*1.3*k-1,z*k)}
  g.computeVertexNormals();var m=new T.Mesh(g,M(0x4a372b));m.material.side=T.BackSide;scene.add(m)})();
var lamps=[];for(var li=0;li<8;li++){var a=li/8*PI*2,lx=Math.cos(a)*74,lz=Math.sin(a)*74,ly=44+Math.sin(li*1.7)*4;
  var chain=new T.Mesh(new T.CylinderGeometry(.04,.04,140,4),dark);chain.position.set(lx,ly+70,lz);scene.add(chain);
  var box=new T.Mesh(new T.BoxGeometry(.8,1,.8),new T.MeshBasicMaterial({color:0xffffff}));box.position.set(lx,ly,lz);scene.add(box);
  var gl=ctx.glow(9);gl.position.set(lx,ly,lz);gl.material.opacity=.45;scene.add(gl);lamps.push(gl)}
key.position.set(0,62,0);key.distance=260;
var SX=0,SZ=0,ROOF=150;
var shaft=new T.Group();scene.add(shaft);
(function(){var Hs=300,g=new T.CylinderGeometry(6,6,Hs,28,60,true),p=g.attributes.position;
  for(var i=0;i<p.count;i++){var x=p.getX(i),y=p.getY(i),z=p.getZ(i),a=Math.atan2(z,x),k=1+.14*Math.sin(y*.07+a*3)+.06*Math.sin(y*.21-a*5);p.setX(i,x*k);p.setZ(i,z*k)}
  g.computeVertexNormals();var m=new T.Mesh(g,M(0x6b5444));m.material.side=T.BackSide;m.position.set(SX,ROOF-8+Hs/2,SZ);shaft.add(m)})();
var lines=[];for(var i=0;i<46;i++){var sl=new T.Mesh(new T.BoxGeometry(.04,2.5+Math.random()*3,.04),new T.MeshBasicMaterial({color:0xffffff,transparent:true,opacity:.7,fog:false}));
  var ra=Math.random()*PI*2,rr=1.2+Math.random()*3.6;sl.userData={x:Math.cos(ra)*rr,z:Math.sin(ra)*rr,o:Math.random()*60};scene.add(sl);lines.push(sl)}

/* ── John on his board ── */
var rider=new T.Group();scene.add(rider);
var BK=4.4,BY=.12*BK,BC=.07*BK;   /* board scale, height of the deck top, and the board's middle (its spin point) */
var body=ctx.figure();body.position.y=BY;body.rotation.order='YXZ';body.rotation.y=PI/2;rider.add(body);
var board=new T.Group();board.position.y=BC;rider.add(board);var boardIn=new T.Group();boardIn.position.y=-BC;board.add(boardIn);
/* his board: the cross-shaped deck the user modelled, dark brown like before, with cream wheels and mid-brown trucks */
(function(){var CB=window.CROSSBOARD,K=BK;
  if(CB&&typeof atob==='function'){try{
    var bm={deck:new T.MeshStandardMaterial({color:0x5a4030,roughness:.8,flatShading:true}),truck:new T.MeshStandardMaterial({color:0x8a6a4c,roughness:.55,metalness:.15}),
      wheel:new T.MeshStandardMaterial({color:0xece0c8,roughness:.45}),hub:new T.MeshStandardMaterial({color:0xcbb99a,roughness:.5})};
    var b64=function(t){var bin=atob(t),u=new Uint8Array(bin.length);for(var i=0;i<bin.length;i++)u[i]=bin.charCodeAt(i);return u.buffer};
    Object.keys(bm).forEach(function(k){var P=CB[k];if(!P)return;var q=new Uint16Array(b64(P.v)),ix=new Uint16Array(b64(P.f)),pos=new Float32Array(P.n*3);
      for(var i=0;i<P.n*3;i++)pos[i]=(P.lo[i%3]+q[i]/65535*P.sz[i%3])*K;
      var g=new T.BufferGeometry();g.setAttribute('position',new T.BufferAttribute(pos,3));g.setIndex(new T.BufferAttribute(ix,1));g.computeVertexNormals();
      var m=new T.Mesh(g,bm[k]);m.castShadow=true;boardIn.add(m)});
    return}catch(_){}}
  /* fallback: a plain plank */
  var dk=new T.Mesh(new T.BoxGeometry(.62,.07,2),deck);dk.position.y=.16;boardIn.add(dk);
  [-1,1].forEach(function(e){var k2=new T.Mesh(new T.BoxGeometry(.62,.07,.4),deck);k2.position.set(0,.22,e*1.08);k2.rotation.x=-e*.35;boardIn.add(k2);
    [-1,1].forEach(function(s){var w=new T.Mesh(new T.CylinderGeometry(.09,.09,.1,10),dark);w.rotation.z=PI/2;w.position.set(s*.25,.06,e*.65);boardIn.add(w)})});
})();
var blob=new T.Mesh(new T.CircleGeometry(1,20),new T.MeshBasicMaterial({color:0x000000,transparent:true,opacity:.35,depthWrite:false}));blob.rotation.x=-PI/2;scene.add(blob);
var dust=[];for(i=0;i<14;i++){var d=ctx.glow(2.2);d.material.opacity=0;scene.add(d);dust.push({s:d,v:new T.Vector3(),t:9})}
function puff(x,y,z,n){for(var k=0;k<(n||14);k++){var q=dust[k%dust.length],a=Math.random()*PI*2;q.s.position.set(x,y+.2,z);q.v.set(Math.cos(a)*6,1+Math.random()*2,Math.sin(a)*6);q.t=0}}

/* ── state ── */
var S={active:false,phase:'',t:0,x:SX,y:0,z:SZ,th:PI,v:0,air:false,vel:new T.Vector3(),spin:0,flip:0,vert:false,airT:0,shake:0,tilt:new T.Quaternion()};
var camP=new T.Vector3(),camL=new T.Vector3(),up=new T.Vector3(0,1,0),qa=new T.Quaternion(),qb=new T.Quaternion(),nrm=new T.Vector3(),fwd=new T.Vector3(),mtx=new T.Matrix4(),rgt=new T.Vector3();
function say(t,s){ctx.trick(t,s)}

/* ── the secret game: six rosaries (the user's own model, from their Blender file) hang in the air over the bowl's rim, each with a
   glowing edge like a secret tape. Launch out of the bowl and fly through them. Progress is remembered. ── */
var ROS=(function(){
  var RD=typeof window!=='undefined'&&window.ROSARY;if(!RD||!T.InstancedMesh)return {update:function(){},hello:function(){}};
  var SC=.38,CY=-.02,N=6,got=[],gotN=0,all=null,el=null,hello=0;
  try{var sv=JSON.parse(localStorage.getItem('ascent-rosaries')||'[]');if(sv&&sv.length===N)got=sv}catch(_){}
  for(var k=0;k<N;k++)got[k]=!!got[k];gotN=got.filter(Boolean).length;
  var beadGeo=new T.SphereGeometry(1,12,9),beadM=new T.MeshStandardMaterial({color:0x5e3f2a,roughness:.35,metalness:.15}),
    silverM=new T.MeshStandardMaterial({color:0xe2d9c8,roughness:.3,metalness:.6}),cordM=new T.MeshStandardMaterial({color:0x2c2018,roughness:.8}),
    glowM=new T.MeshBasicMaterial({color:0xfff3d6,side:T.BackSide,transparent:true,opacity:.6,blending:T.AdditiveBlending,depthWrite:false,fog:false});
  function polyGeo(P){var g=new T.BufferGeometry();g.setAttribute('position',new T.Float32BufferAttribute(P.v,3));g.setIndex(P.f);g.computeVertexNormals();return g}
  var crossG=RD.cross&&polyGeo(RD.cross),corpusG=RD.corpus&&polyGeo(RD.corpus);
  function model(big){
    var g=new T.Group(),inner=new T.Group();g.add(inner);inner.scale.setScalar(SC*(big||1));inner.position.y=-CY*SC*(big||1);
    var n=RD.beads.length,im=new T.InstancedMesh(beadGeo,beadM,n),om=new T.InstancedMesh(beadGeo,glowM,n),m4=new T.Matrix4(),q=new T.Quaternion(),p=new T.Vector3(),sc=new T.Vector3();
    RD.beads.forEach(function(b,k){m4.compose(p.set(b[0],b[1],b[2]),q,sc.set(b[3],b[3],b[3]));im.setMatrixAt(k,m4);m4.compose(p,q,sc.set(b[3]*1.5,b[3]*1.5,b[3]*1.5));om.setMatrixAt(k,m4)});
    im.frustumCulled=om.frustumCulled=false;inner.add(im);inner.add(om);
    var r=RD.ring,t1=new T.Mesh(new T.TorusGeometry(r[3],r[4]*1.8,6,120),cordM);t1.position.set(r[0],r[1],r[2]);inner.add(t1);
    var t2=new T.Mesh(new T.TorusGeometry(r[3],r[4]*5,6,120),glowM);t2.position.copy(t1.position);inner.add(t2);
    var pc=RD.pcord,cl=pc[1]-pc[2],c1=new T.Mesh(new T.CylinderGeometry(pc[3]*1.6,pc[3]*1.6,cl,6),cordM);c1.position.set(pc[0],(pc[1]+pc[2])/2,0);inner.add(c1);
    var c2=new T.Mesh(new T.CylinderGeometry(pc[3]*4,pc[3]*4,cl,6),glowM);c2.position.copy(c1.position);inner.add(c2);
    var md=RD.medal,m1=new T.Mesh(beadGeo,silverM);m1.position.set(md[0],md[1],md[2]);m1.scale.set(md[3],md[4],md[5]);inner.add(m1);var m2=new T.Mesh(beadGeo,glowM);m2.position.copy(m1.position);m2.scale.set(md[3]*1.4,md[4]*1.4,md[5]*1.6);inner.add(m2);
    var hd=RD.head,h1=new T.Mesh(beadGeo,silverM);h1.position.set(hd[0],hd[1],hd[2]);h1.scale.setScalar(hd[3]);inner.add(h1);
    [[crossG,silverM],[corpusG,silverM]].forEach(function(a,j){if(!a[0])return;var m=new T.Mesh(a[0],a[1]);inner.add(m);
      if(j===0){var gm=new T.Mesh(a[0],glowM);gm.geometry.computeBoundingBox();var bb=gm.geometry.boundingBox,cx=(bb.min.x+bb.max.x)/2,cy=(bb.min.y+bb.max.y)/2;
        gm.scale.set(1.12,1.1,1.6);gm.position.set(cx*(1-1.12),cy*(1-1.1),0);inner.add(gm)}});
    var halo=ctx.glow(big?26:9);halo.material.opacity=big?.5:.3;halo.position.z=-.6;g.add(halo);g.userData.halo=halo;
    var tw=[];for(var k=0;k<4;k++){var st=ctx.glow(.9);st.material.opacity=0;g.add(st);tw.push({s:st,p:k*1.7,a:k/4*PI*2})}g.userData.tw=tw;
    return g}
  /* six places just inside the coping, from a small air to a full-speed launch */
  var SPOTS=[[.06,28],[.22,32],[.36,36],[.55,30],[.71,41],[.88,34]],list=SPOTS.map(function(sp,k){
    var o=outline(sp[0]*PER),u=15.1,g=model(),px=o.px+o.nx*u,pz=o.pz+o.nz*u;g.position.set(px,sp[1],pz);g.rotation.y=Math.atan2(-o.nx,-o.nz);g.visible=!got[k];scene.add(g);
    return {g:g,y0:sp[1],face:Math.atan2(-o.nx,-o.nz),ph:k*1.3,t:-1,nx:o.nx,nz:o.nz,px:px,pz:pz,y:sp[1]}});
  try{if(typeof document!=='undefined'&&document.createElement){el=document.createElement('div');el.id='skRos';el.setAttribute('aria-live','polite');document.body.appendChild(el);
    var css=document.createElement('style');css.textContent='#skRos{display:none;position:fixed;left:14px;top:calc(56px + env(safe-area-inset-top));z-index:7;pointer-events:none;'+
      'font:700 .72rem/1 system-ui,sans-serif;letter-spacing:.16em;text-transform:uppercase;color:#f3ead9;background:rgba(42,29,22,.72);padding:.55em .9em;border-radius:99px;box-shadow:0 0 0 2px rgba(243,234,217,.25),0 0 14px rgba(255,240,210,.35)}'+
      'body.skating #skRos{display:block}';document.head.appendChild(css)}}catch(_){el=null}
  function label(){if(el)el.textContent='Rosaries '+gotN+' / '+N}label();
  function save(){try{localStorage.setItem('ascent-rosaries',JSON.stringify(got))}catch(_){}}
  function crown(){if(all)return;all=model(2.6);all.position.set(0,-6,0);scene.add(all);all.userData.rise=0;
    [523,659,784,1047,1319].forEach(function(f,k){tone(f,.9,k*.14)});tone(262,2.4,.1)}
  if(gotN===N)crown();
  return {
    /* every visit to the bowl is a fresh hunt: all six rosaries are back in the air and the crown is taken down */
    hello:function(){for(var k=0;k<N;k++){got[k]=false;list[k].g.visible=true;list[k].t=-1}gotN=0;if(all){scene.remove(all);all=null}save();label();hello=3.2},count:function(){return gotN},where:function(){return list.map(function(r){return [r.px,r.y0,r.pz,r.nx,r.nz]})},reset:function(){for(var k=0;k<N;k++){got[k]=false;list[k].g.visible=true;list[k].t=-1}gotN=0;label()},
    update:function(dt,t){
      if(hello>0){hello-=dt;if(hello<=0)say(gotN<N?'Find the six rosaries':'All six rosaries found',gotN<N?'Launch out of the bowl to reach them':'Hail, holy Queen')}
      var bx=S.x,by=S.y+1.6,bz=S.z;
      list.forEach(function(r,k){var g=r.g;
        if(r.t>=0){r.t+=dt;var e=Math.min(1,r.t/.6);g.scale.setScalar(1+e*.9);g.position.y=r.y0+e*2;g.traverse(function(c){if(c.material&&c.material.opacity!=null&&c.material!==glowM&&c.material.transparent)c.material.opacity*=1-e*.2});if(e>=1){g.visible=false;r.t=-1}return}
        if(got[k])return;
        r.y=r.y0+Math.sin(t*1.4+r.ph)*.45;g.position.y=r.y;g.rotation.y=r.face+Math.sin(t*.7+r.ph)*.45;
        var h=g.userData.halo;h.material.opacity=.24+.1*Math.sin(t*3+r.ph);
        g.userData.tw.forEach(function(w){var u=((t*.8+w.p)%2.2)/2.2;w.s.position.set(Math.cos(w.a+t*.6)*1.9,Math.sin(w.a*2+t)*2.2,.2);w.s.material.opacity=u<.5?Math.sin(u*2*PI):0;w.s.scale.setScalar(.6+.5*Math.sin(u*PI))});
        var dx=r.px-bx,dy=r.y-by,dz=r.pz-bz;
        if(dx*dx+dy*dy+dz*dz<11.5){got[k]=true;gotN++;r.t=0;save();label();sparks.burst(0,0,26);S.shake=Math.max(S.shake,.25);
          [784,988,1175,1568].forEach(function(f,j){tone(f,.35,j*.07)});
          say('Rosary '+gotN+' of '+N,gotN<N?'':'All six! Hail, holy Queen');if(gotN===N)crown()}});
      glowM.opacity=.5+.12*Math.sin(t*4);
      if(all){all.userData.rise=Math.min(1,all.userData.rise+dt*.25);var e2=all.userData.rise;all.position.y=-6+e2*(R+22)+Math.sin(t*.8)*.6;all.rotation.y=t*.25;all.userData.halo.material.opacity=.35+.15*Math.sin(t*2)}
    }};
})();
function start(){cYaw=null;try{if(document.activeElement&&document.activeElement.blur)document.activeElement.blur()}catch(_){}combo=[];bailT=0;grind=null;S.active=true;S.phase='fall';S.t=0;S.x=SX;S.z=SZ;S.y=ROOF+250;S.vel.set(0,-20,0);S.th=PI;S.v=0;S.air=true;S.spin=0;S.flip=0;rider.rotation.set(0,PI,0);board.rotation.set(0,0,0);shaft.visible=true;tone(300,.4);tone(200,.6,.2)}
function stop(){S.active=false}

/* ── tricks, Carmelite edition. No points: the combo is shown, and that is all. ── */
var FLIPS={n:'Kickflip',u:'Genuflip',d:'Vesper Varial',l:'Heelflip of the Holy Hill',r:'Sign-of-the-Cross Shuv'};
var GRABS={n:'Rosary Grab',u:'Monstrance Grab',d:'Scapular Grab',l:'Benedictus Indy',r:'Melon of Mount Carmel'};
var vN=new T.Vector3(),vF=new T.Vector3(),vS=new T.Vector3(),vV0=1,spinLock=false,triBuf=0,combo=[],I={},PI0={},kb={},tb={},flipT=0,flipName='',flipAxis='z',grab=null,crouch=0,grind=null,bailT=0,manual=0;
function ground(){S.air=false;S.vert=false;S.spin=0;S.flip=0;board.rotation.set(0,0,0);body.rotation.set(0,PI/2,0);body.scale.set(1,1,1);body.position.y=BY;flipT=0;grab=null}
function add(n){combo.push(n);ctx.trick(combo.join(' + '),'')}
function spinName(sp){var d=Math.round(Math.abs(sp)/PI)*180;return d>=180?(d+(d>=720?' Ascension':'')):''}
function land(clean){var sp=spinName(S.spin);if(sp)combo.push(sp);
  if(clean){if(!combo.length)combo.push('Ollie');ctx.trick(combo.join(' + '),combo.length>2?'Deo gratias!':'Landed')}
  else{ctx.trick('Bail!',combo.length?'lost: '+combo.join(' + '):'');}
  combo=[]}
/* rails you can grind: the funbox rail, two floor rails, and the coping round the bowl */
function setSeg(gr,r){var dx=r.b[0]-r.a[0],dy=r.b[1]-r.a[1],dz=r.b[2]-r.a[2];gr.r=r;gr.dx=dx;gr.dy=dy;gr.dz=dz;gr.L=Math.sqrt(dx*dx+dy*dy+dz*dz)||1}
var vO={x:0,z:1},vLaunch=0;
var RAILS=[];(function(){var segs=[];for(var k=0;k<NCOP;k++)segs.push({a:COPING[k],b:COPING[(k+1)%NCOP],name:'Lip of Carmel 50-50'});
  segs.forEach(function(r,k){r.next=segs[(k+1)%NCOP];r.prev=segs[(k+NCOP-1)%NCOP];RAILS.push(r)});
  RAILS.push({a:[-5,R+1.4,OZ+2.6],b:[13,R+1.4,OZ+2.6],name:'Via Crucis Boardslide',slide:true})})();
function nearRail(x,y,z,reach){var best=null,bd=reach;RAILS.forEach(function(r){var ax=r.a[0],ay=r.a[1],az=r.a[2],dx=r.b[0]-ax,dy=r.b[1]-ay,dz=r.b[2]-az,L2=dx*dx+dy*dy+dz*dz,
  t=Math.max(0,Math.min(1,((x-ax)*dx+(y-ay)*dy+(z-az)*dz)/L2)),px=ax+dx*t,py=ay+dy*t,pz=az+dz*t,dh=Math.hypot(x-px,z-pz),dv=py-y;
  if(dh<bd&&dv>-1.6&&dv<2.2){bd=dh;best={r:r,t:t,L:Math.sqrt(L2),dx:dx,dy:dy,dz:dz}}});return best}

/* ── grind sparks, made like the lantern's trail: bright little dashes and a few drawn stars, flung off the board ── */
var sparks=(function(){
  var list=[],N=110,i,dashT=null,starT=null,acc=0;
  try{var dc=document.createElement('canvas');dc.width=64;dc.height=32;var z=dc.getContext('2d'),gr=z.createRadialGradient(32,16,0,32,16,30);
    gr.addColorStop(0,'rgba(255,255,255,1)');gr.addColorStop(.45,'rgba(255,255,255,.9)');gr.addColorStop(1,'rgba(255,255,255,0)');z.fillStyle=gr;z.save();z.translate(32,16);z.scale(1,.42);z.beginPath();z.arc(0,0,30,0,6.2832);z.restore();z.fill();dashT=new T.CanvasTexture(dc);
    var sc=document.createElement('canvas');sc.width=sc.height=64;var y=sc.getContext('2d');y.strokeStyle='#fff';y.lineCap='round';y.lineWidth=3.5;y.shadowColor='#fff';y.shadowBlur=4;
    [[0,26],[1.1,22],[2.2,25],[.55,12],[2.75,14]].forEach(function(a){y.beginPath();y.moveTo(32-Math.cos(a[0])*a[1],32-Math.sin(a[0])*a[1]);y.lineTo(32+Math.cos(a[0])*a[1]*.9,32+Math.sin(a[0])*a[1]*.9);y.stroke()});starT=new T.CanvasTexture(sc)}catch(_){}
  for(i=0;i<N;i++){var star=i%7===0,m=new T.SpriteMaterial({map:star?starT:dashT,transparent:true,depthWrite:false,blending:T.AdditiveBlending,fog:false,opacity:0}),sp=new T.Sprite(m);sp.visible=false;scene.add(sp);
    list.push({s:sp,star:star,t:9,life:1,v:new T.Vector3(),sz:1})}
  var head=0,pa=new T.Vector3(),pb=new T.Vector3();
  function one(hx,hz){var p=list[head];head=(head+1)%N;var back=4+Math.random()*10,side=(Math.random()-.5)*9;
    p.t=0;p.life=.3+Math.random()*.4;p.sz=p.star?.5+Math.random()*.5:.25+Math.random()*.3;
    p.s.position.set(S.x+(Math.random()-.5)*.4,S.y+.15,S.z+(Math.random()-.5)*.4);
    p.v.set(-hx*back-hz*side,2.5+Math.random()*7,-hz*back+hx*side);p.s.visible=true;p.s.material.rotation=Math.random()*6.28}
  return {
    emit:function(dt,hx,hz){acc+=dt*(55+Math.min(60,S.v));while(acc>1){acc-=1;one(hx,hz)}},
    burst:function(hx,hz,n){for(var k=0;k<n;k++)one(hx,hz)},
    update:function(dt){for(var k=0;k<N;k++){var p=list[k];if(p.t>=p.life){if(p.s.visible){p.s.visible=false;p.s.material.opacity=0}continue}
      p.t+=dt;p.v.y-=26*dt;p.v.multiplyScalar(Math.exp(-dt*1.2));p.s.position.addScaledVector(p.v,dt);var f=1-p.t/p.life;
      p.s.material.opacity=Math.max(0,f)*(p.star?.95:1);
      if(p.star){p.s.scale.set(p.sz*(.6+.6*f),p.sz*(.6+.6*f),1);p.s.material.rotation+=dt*3}
      else{if(pa.project){pa.copy(p.s.position).project(cam);pb.copy(p.s.position).addScaledVector(p.v,.03).project(cam);p.s.material.rotation=Math.atan2(pb.y-pa.y,(pb.x-pa.x)*(cam.aspect||1))}var sp2=Math.min(3.2,1+p.v.length()*.12);p.s.scale.set(p.sz*sp2,p.sz*.55,1)}}}
  };
})();
/* ── the balance meter shown while grinding ── */
var balEl=null,balNd=null;
try{if(typeof document!=='undefined'&&document.createElement){balEl=document.createElement('div');balEl.id='skBal';balEl.setAttribute('aria-hidden','true');balEl.innerHTML='<i></i><b></b>';document.body.appendChild(balEl);balNd=balEl.querySelector('b');
  var bcss=document.createElement('style');bcss.textContent='#skBal{display:none;position:fixed;left:50%;top:30%;width:200px;height:20px;margin-left:-100px;z-index:7;pointer-events:none}'+
   'body.skating #skBal.on{display:block}#skBal i{position:absolute;left:0;right:0;top:8px;height:5px;border-radius:3px;background:linear-gradient(90deg,#5a2e1c,#c9b095 28%,#f7f3ea 50%,#c9b095 72%,#5a2e1c);box-shadow:0 0 0 2px rgba(42,29,22,.6)}'+
   '#skBal b{position:absolute;top:0;left:50%;width:5px;height:21px;margin-left:-2.5px;border-radius:3px;background:#fff;box-shadow:0 0 8px rgba(255,255,255,.9),0 0 0 1.5px rgba(42,29,22,.7)}';document.head.appendChild(bcss)}}catch(_){balEl=null}
function balShow(){if(!balEl)return;var on=!!grind&&S.active;if(on!==balEl._on){balEl._on=on;balEl.className=on?'on':''}if(on&&balNd)balNd.style.left=(50+Math.max(-1,Math.min(1,grind.bal||0))*48)+'%'}
/* ── input: keyboard, a PlayStation pad (Gamepad API) and on-screen face buttons on touch screens ── */
var KEYMAP={ArrowUp:'u',KeyW:'u',ArrowDown:'d',KeyS:'d',ArrowLeft:'l',KeyA:'l',ArrowRight:'r',KeyD:'r',Space:'x',KeyJ:'sq',KeyK:'ci',KeyL:'tri',KeyQ:'l1',KeyE:'r1',ShiftLeft:'sh',ShiftRight:'sh'};
if(typeof window!=='undefined'&&window.addEventListener){
  window.addEventListener('keydown',function(e){if(!S.active)return;var k=KEYMAP[e.code];if(k){kb[k]=true;e.preventDefault()}},true);
  window.addEventListener('keyup',function(e){var k=KEYMAP[e.code];if(k){kb[k]=false;if(S.active)e.preventDefault()}},true);
  window.addEventListener('blur',function(){for(var k in kb)kb[k]=false})}
var pad=null;
if(typeof document!=='undefined'&&document.createElement&&document.body&&document.head&&document.body.querySelectorAll)try{
  pad=document.createElement('div');pad.id='psPad';pad.setAttribute('aria-hidden','true');
  pad.innerHTML='<button data-b="tri">△</button><button data-b="sq">□</button><button data-b="ci">○</button><button data-b="x">✕</button>';
  document.body.appendChild(pad);
  Array.prototype.forEach.call(pad.querySelectorAll('button'),function(btn){var b=btn.getAttribute('data-b');
    btn.addEventListener('pointerdown',function(e){e.preventDefault();e.stopPropagation();tb[b]=true;btn.classList.add('on')});
    ['pointerup','pointercancel','pointerleave'].forEach(function(ev){btn.addEventListener(ev,function(){tb[b]=false;btn.classList.remove('on')})})});
  var css=document.createElement('style');css.textContent='#psPad{display:none;position:fixed;right:calc(18px + env(safe-area-inset-right));bottom:calc(18px + env(safe-area-inset-bottom));width:170px;height:170px;z-index:12;touch-action:none}'+
   'body.skating #psPad{display:block}@media (pointer:fine){body.skating #psPad{display:none}}'+
   '#psPad button{position:absolute;width:58px;height:58px;border-radius:50%;border:2px solid rgba(233,220,198,.55);background:rgba(42,29,22,.45);color:#e9dcc6;font-size:24px;line-height:1;padding:0;touch-action:none;-webkit-user-select:none;user-select:none}'+
   '#psPad button.on{background:rgba(233,220,198,.45);color:#2a1d16}'+
   '#psPad [data-b=tri]{left:56px;top:0}#psPad [data-b=sq]{left:0;top:56px}#psPad [data-b=ci]{left:112px;top:56px}#psPad [data-b=x]{left:56px;top:112px}';
  document.head.appendChild(css)}catch(_){}
function readInput(){
  var o={sh:!!kb.sh,u:!!kb.u,d:!!kb.d,l:!!kb.l,r:!!kb.r,x:!!(kb.x||tb.x),sq:!!(kb.sq||tb.sq),ci:!!(kb.ci||tb.ci),tri:!!(kb.tri||tb.tri),l1:!!kb.l1,r1:!!kb.r1};
  var tf=keys.tf||0,tl=keys.tl||0;if(tf>.3)o.u=true;if(tf<-.3)o.d=true;if(tl>.3)o.l=true;if(tl<-.3)o.r=true;
  try{var gp=navigator.getGamepads&&navigator.getGamepads();for(var gi=0;gp&&gi<gp.length;gi++){var g=gp[gi];if(!g)continue;var B=function(n){return g.buttons[n]&&g.buttons[n].pressed};
    o.x=o.x||B(0);o.ci=o.ci||B(1);o.sq=o.sq||B(2);o.tri=o.tri||B(3);o.l1=o.l1||B(4)||B(6);o.r1=o.r1||B(5)||B(7);
    o.u=o.u||B(12)||g.axes[1]<-.4;o.d=o.d||B(13)||g.axes[1]>.4;o.l=o.l||B(14)||g.axes[0]<-.4;o.r=o.r||B(15)||g.axes[0]>.4}}catch(_){}
  var pr={};for(var k in o)pr[k]=o[k]&&!PI0[k];PI0=o;I=o;return pr}
function dirOf(){return I.u?'u':I.d?'d':I.l?'l':I.r?'r':'n'}

function update(dt){
  if(!S.active)return;S.t+=dt;var t=S.t;
  lamps.forEach(function(g,k){g.material.opacity=.45+.08*Math.sin(t*3+k)});sparks.update(dt);balShow();ROS.update(dt,t);
  dust.forEach(function(q){if(q.t<.9){q.t+=dt;q.s.position.addScaledVector(q.v,dt);q.v.multiplyScalar(.9);q.s.material.opacity=.5*(1-q.t/.9)}else q.s.material.opacity=0});
  if(S.phase==='fall'){
    S.vel.y=Math.max(-95,S.vel.y-40*dt);S.y+=S.vel.y*dt;rider.position.set(S.x,S.y,S.z);rider.rotation.x=Math.sin(t*3)*.25;rider.rotation.z=Math.sin(t*2.3)*.2;
    var inShaft=S.y>ROOF-6;
    lines.forEach(function(l){l.visible=inShaft;var u=l.userData,yy=((u.o+t*70)%60)-30;l.position.set(S.x+u.x,S.y+yy,S.z+u.z)});
    if(inShaft){camP.set(S.x,S.y-1.5,S.z+4.6);camL.set(S.x,S.y-.5,S.z)}
    else{camP.lerp(new T.Vector3(S.x+8,7,S.z+14),Math.min(1,dt*3));camL.set(S.x,S.y,S.z)}
    var gy=hgt(S.x,S.z);
    if(S.y<=gy){S.y=gy;S.phase='ride';rider.rotation.set(0,S.th,0);ground();S.v=0;S.shake=.8;puff(S.x,0,S.z,14);tone(70,.5);tone(110,.3);lines.forEach(function(l){l.visible=false});
      say('The Nada Bowl','The controls are along the bottom of the screen.');ROS.hello()}
  }else ride(dt);
  rider.updateMatrixWorld();
  blob.position.set(rider.position.x,hgt(rider.position.x,rider.position.z)+.03,rider.position.z);var hh=Math.max(0,rider.position.y-blob.position.y);blob.scale.setScalar(1+hh*.08);blob.material.opacity=.35/(1+hh*.15);
  cam.position.copy(camP);if(S.shake>0){S.shake=Math.max(0,S.shake-dt*1.6);var sa=S.shake*.6;cam.position.x+=(Math.random()-.5)*sa;cam.position.y+=(Math.random()-.5)*sa}cam.lookAt(camL);
}

function ride(dt){
  var P=readInput(),steer=(I.l?1:0)-(I.r?1:0);
  if(bailT>0){bailT-=dt;var bu=1-bailT/1.3;body.rotation.z=Math.min(1,bu*3)*1.4;body.position.y=BY-.3*Math.min(1,bu*3);board.position.set(Math.min(1,bu*2)*1.6,BC,Math.min(1,bu*2)*2);board.rotation.y=bu*4;
    S.v*=Math.exp(-dt*3);if(bailT<=0){ground();board.position.set(0,BC,0);board.rotation.set(0,0,0);S.v=0;S.y=hgt(S.x,S.z);S.tilt.identity()}
    rider.position.set(S.x,S.y,S.z);rider.quaternion.copy(S.tilt);chase(dt);return}
  if(grind){
    var gr=grind,dir=gr.sgn;gr.t+=dir*S.v*dt/gr.L;gr.time=(gr.time||0)+dt;
    while(gr.t>1&&gr.r.next){var ov=(gr.t-1)*gr.L,nr=gr.r.next;setSeg(gr,nr);gr.t=ov/gr.L}
    while(gr.t<0&&gr.r.prev){var ov2=-gr.t*gr.L,pr=gr.r.prev;setSeg(gr,pr);gr.t=1-ov2/gr.L}
    var r=gr.r;S.th=Math.atan2(gr.dx*dir,gr.dz*dir);sparks.emit(dt*(1+Math.abs(gr.bal||0)*1.5),gr.dx*dir/gr.L,gr.dz*dir/gr.L);
    S.x=r.a[0]+gr.dx*gr.t;S.y=r.a[1]+gr.dy*gr.t;S.z=r.a[2]+gr.dz*gr.t;
    board.rotation.y=r.slide?PI/2:0;
    /* balance, like the Tony Hawk games: the needle drifts away from the middle, faster the longer you hold the grind;
       left and right push it back. Lose it and he slips off and drops back in (no fall) */
    var dif=1.1+gr.time*.32;gr.bv+=(gr.bal>=0?1:-1)*dif*(.55+Math.abs(gr.bal))*dt+(Math.random()-.5)*1.4*dt;
    gr.bv+=((I.r?1:0)-(I.l?1:0))*5.4*dt;gr.bv*=Math.exp(-dt*1.4);gr.bal+=gr.bv*dt;
    body.rotation.z=-gr.bal*.65+Math.sin(S.t*9)*.04;
    var off=gr.t<0||gr.t>1;
    if(gr.r.next&&I.d)off=true;   /* pull back to drop in off the coping */
    var lost=Math.abs(gr.bal)>=1;if(lost){off=true;ctx.trick('Off balance','');tone(180,.12)}
    if(P.x||off){var hx=gr.dx/gr.L*dir,hz=gr.dz/gr.L*dir,lb=gr.bal;grind=null;S.air=true;S.vert=false;S.th=Math.atan2(hx,hz);S.vel.set(hx*S.v-hz*lb*5,P.x?13:3,hz*S.v+hx*lb*5);
      if(sdf(S.x,S.z)>R-1.2){var ow=outward(S.x,S.z);S.th=Math.atan2(hx*.3-ow.x,hz*.3-ow.z);S.vel.set(hx*S.v*.3-ow.x*8,P.x?9:1.5,hz*S.v*.3-ow.z*8);S.x-=ow.x*.6;S.z-=ow.z*.6}S.airT=0;S.spin=0;board.rotation.y=0;
      var cg=clampPark(S.x,S.z);S.x=cg[0];S.z=cg[1];if(P.x)ctx.tone&&tone(420,.08)}
    rider.position.set(S.x,S.y+.05,S.z);qb.setFromAxisAngle(up,S.th);S.tilt.slerp(qb,Math.min(1,dt*12));rider.quaternion.copy(S.tilt);chase(dt);return}
  if(!S.air){
    var g=grad(S.x,S.z),fx=Math.sin(S.th),fz=Math.cos(S.th),sh=g.x*fx+g.z*fz,cs=1/Math.sqrt(1+sh*sh);
    var top=I.sh?84:64;if(P.u&&S.v<36){S.v=Math.max(S.v,0)+(I.sh?20:16);tone(95,.07);tone(140,.05,.03)}
    if(I.u)S.v+=(I.sh?96:72)*dt;else if(I.sh&&S.v>0)S.v+=40*dt;if(I.d)S.v-=52*dt;S.v-=52*sh*cs*dt;S.v*=Math.exp(-dt*.1);
    if(S.v<20&&!I.d&&Math.abs(sh)<.15)S.v+=(20-S.v)*Math.min(1,dt*1.5);   /* he always rolls along at a good clip */
    S.v=Math.max(-48,Math.min(top,S.v));
    S.th+=steer*3.8*dt*Math.min(1,.6+Math.abs(S.v)/12);
    var sideSlope=g.x*Math.cos(S.th)-g.z*Math.sin(S.th);S.th-=sideSlope*Math.min(1,Math.abs(S.v)/8+.2)*.9*dt*Math.sign(S.v||1);
    if(S.v<-3&&Math.hypot(g.x,g.z)>.35){S.th+=PI;S.v=-S.v;ctx.trick('Fakie','')}
    if(I.x)crouch=Math.min(.6,crouch+dt);
    body.scale.y=1-Math.min(1,crouch/.25)*.18;
    var step=S.v*cs*dt,nx=S.x+fx*step,nz=S.z+fz*step;var cl=clampPark(nx,nz);
    if(cl[0]!==nx||cl[1]!==nz){var ob=outward(nx,nz),fd=fx*ob.x+fz*ob.z;if(fd>0)S.th=Math.atan2(fx-2*fd*ob.x,fz-2*fd*ob.z);S.v*=.92}   /* the rim turns him back along the bowl instead of stopping him */
    nx=cl[0];nz=cl[1];
    var y0=hgt(S.x,S.z),y1=hgt(nx,nz),vy=S.v*sh*cs;
    if(y1-y0>Math.max(.3,Math.abs(vy*dt)*1.6+.05)){S.th+=PI;S.v=Math.max(12,Math.abs(S.v)*.7);nx=S.x;nz=S.z;y1=y0}   /* not enough speed for the lip: roll smoothly back in */
    var steepNow=Math.hypot(g.x,g.z)>2.4;
    var popped=!I.x&&crouch>0;
    if(P.tri){var nr=nearRail(S.x,S.y,S.z,3.6);if(nr&&nr.r.a[1]-S.y<2.2){popped=true;crouch=Math.max(crouch,.25);triBuf=.5}}
    if(steepNow&&vy>4){var gl=grad(nx,nz);vN.set(-gl.x,1,-gl.z).normalize();vF.set(fx,0,fz);vF.addScaledVector(vN,-vF.dot(vN)).normalize();var ow2=outward(nx,nz),cosA=Math.max(0,fx*ow2.x+fz*ow2.z);vO.x=ow2.x;vO.z=ow2.z;vLaunch=Math.abs(S.v);S.air=true;S.vert=true;S.vel.set(0,Math.min(80,Math.abs(S.v)*(.52+.68*cosA)),0);   /* big airs: a full-speed launch flies well over twice the bowl's height, up to the highest rosaries */vV0=Math.max(1,S.vel.y);S.airT=0;S.x=nx;S.z=nz;S.y=y1;crouch=0;body.scale.y=1;tone(520,.1)}
    else if(popped||(y1<y0+vy*dt-.18&&S.v>12)){
      var hs=S.v*cs,pop=popped?13.5+Math.min(crouch,.35)*21:0;crouch=0;body.scale.y=1;
      S.air=true;S.vert=false;S.vel.set(fx*hs,(vy>0?vy:0)+pop,fz*hs);S.airT=0;S.x=nx;S.z=nz;S.y=y1;if(popped)tone(420,.08)}
    else{S.x=nx;S.z=nz;S.y=y1}
    if(!S.air){var gn=grad(S.x,S.z);nrm.set(-gn.x,1,-gn.z).normalize();fwd.set(fx,0,fz);fwd.addScaledVector(nrm,-fwd.dot(nrm)).normalize();rgt.crossVectors(nrm,fwd);mtx.makeBasis(rgt,nrm,fwd);qb.setFromRotationMatrix(mtx);S.tilt.slerp(qb,Math.min(1,dt*14))}
  }else{
    if(S.airT===0)spinLock=steer!==0;if(steer===0)spinLock=false;
    S.airT+=dt;S.vel.y-=62*dt;S.x+=S.vel.x*dt;S.z+=S.vel.z*dt;S.y+=S.vel.y*dt;
    var cl2=clampPark(S.x,S.z);if(cl2[0]!==S.x||cl2[1]!==S.z){var oa=outward(S.x,S.z),vd=S.vel.x*oa.x+S.vel.z*oa.z;if(vd>0){S.vel.x-=1.6*vd*oa.x;S.vel.z-=1.6*vd*oa.z}}S.x=cl2[0];S.z=cl2[1];
    /* spin: D-pad left/right, or L1/R1 */
    S.spin+=((spinLock?0:steer)+(I.l1?1:0)-(I.r1?1:0))*11*dt;
    /* flips on square, with a direction */
    if(P.sq&&flipT<=0){var d=dirOf();flipName=FLIPS[d];flipAxis=d==='u'?'x':d==='r'?'y':'z';flipT=.36;tone(660,.06)}
    if(flipT>0){flipT-=dt;var fu=1-Math.max(0,flipT)/.36;board.rotation.set(0,0,0);board.rotation[flipAxis]=fu*PI*2*(flipAxis==='y'?.5:1);if(flipT<=0){board.rotation.set(0,0,0);add(flipName)}}
    /* grabs on circle, held */
    if(P.ci&&!grab){grab=GRABS[dirOf()];add(grab);tone(560,.06)}
    if(grab&&!I.ci)grab=null;
    body.rotation.x=grab?.55:0;body.position.y=grab?BY-.2:BY;board.position.y=grab?BC+.3:BC;
    /* grind on triangle near any rail */
    if(P.tri)triBuf=S.vert?9:.35;if(triBuf>0){triBuf-=dt;var nr2=nearRail(S.x,S.y,S.z,3.4);if(nr2&&(S.vel.y<1||nr2.r.a[1]+nr2.dy*nr2.t>S.y-.3)){triBuf=0;var hx2=Math.sin(S.th),hz2=Math.cos(S.th),dd=(nr2.dx*hx2+nr2.dz*hz2);
      grind={r:nr2.r,t:nr2.t,L:nr2.L,dx:nr2.dx,dy:nr2.dy,dz:nr2.dz,sgn:dd>=0?1:-1,bal:(Math.random()-.5)*.16,bv:0,time:0};S.v=Math.max(14,Math.hypot(S.vel.x,S.vel.z),Math.abs(S.vel.y)*.6);
      var sp=spinName(S.spin);if(sp)combo.push(sp);S.spin=0;S.air=false;S.vert=false;grab=null;flipT=0;board.rotation.set(0,0,0);add(nr2.r.name);tone(300,.25);sparks.burst(nr2.dx*grind.sgn/nr2.L,nr2.dz*grind.sgn/nr2.L,18);
      rider.position.set(S.x,S.y,S.z);chase(dt);return}}
    if(S.vert){var pr=Math.max(0,Math.min(1,(vV0-S.vel.y)/(2*vV0))),ang=PI*pr+S.spin,ca=Math.cos(ang),sa=Math.sin(ang);
      vS.crossVectors(vN,vF);fwd.copy(vF).multiplyScalar(ca).addScaledVector(vS,sa);rgt.crossVectors(vN,fwd);mtx.makeBasis(rgt,vN,fwd);qb.setFromRotationMatrix(mtx);S.tilt.slerp(qb,Math.min(1,dt*18))}
    else{qb.setFromAxisAngle(up,S.th+S.spin);S.tilt.slerp(qb,Math.min(1,dt*14))}
    var gy=hgt(S.x,S.z);
    if(S.y<=gy&&S.vel.y<0){S.y=gy;
      /* flow first: he never bails. Any flip finishes, and he lands squared up to the way he is travelling */
      if(flipT>0){flipT=0;board.rotation.set(0,0,0);add(flipName)}
      if(S.vert){var hf=Math.sin(S.th),hz3=Math.cos(S.th),fd2=hf*vO.x+hz3*vO.z;S.th=Math.atan2(hf-2*fd2*vO.x,hz3-2*fd2*vO.z);S.v=Math.max(20,vLaunch*.97)}   /* drop back in, carrying the carve */
      else{var hv=Math.hypot(S.vel.x,S.vel.z);if(hv>3)S.th=Math.atan2(S.vel.x,S.vel.z);S.v=Math.max(hv,16)}
      land(true);puff(S.x,gy,S.z,6);S.shake=.1;tone(140,.15);ground()}
  }
  rider.position.set(S.x,S.y,S.z);rider.quaternion.copy(S.tilt);
  if(!S.air&&!grab)body.rotation.x=0;
  chase(dt);
}
/* THPS-style chase camera: tethered behind the line he is travelling, swinging round after him with a little lag.
   It follows where he is going, not where he faces, so spins don't spin the view. On vert it stays below the lip and
   tilts up to watch the air, then swings round behind him as he drops back in. Distance and field of view open up with
   height and speed. */
var cYaw=null,cH=null,cD=8.5,cA=new T.Vector3(),cT=new T.Vector3(),cLk=new T.Vector3();
function wrapA(a){while(a>PI)a-=2*PI;while(a<-PI)a+=2*PI;return a}
function chase(dt){
  var yawT;
  if(grind)yawT=Math.atan2(grind.dx*grind.sgn,grind.dz*grind.sgn);
  else if(S.air&&!S.vert&&Math.hypot(S.vel.x,S.vel.z)>1.5)yawT=Math.atan2(S.vel.x,S.vel.z);
  else yawT=S.v<-.5?S.th+PI:S.th;
  if(cYaw===null){cYaw=yawT;cH=S.y+3.4;cA.set(S.x,0,S.z);cLk.set(S.x,S.y+1.2,S.z)}
  var spd=Math.abs(S.air?Math.hypot(S.vel.x,S.vel.z,S.vel.y):S.v);
  cYaw+=wrapA(yawT-cYaw)*Math.min(1,dt*(S.air?2.2:4.2));
  var lift=Math.max(0,S.y-R);
  var dT=9+Math.min(16,lift*.4)+Math.min(3,spd*.04);cD+=(dT-cD)*Math.min(1,dt*3);
  var hT=Math.min(S.y,R+2.5)+3.2+cD*.1;cH+=(hT-cH)*Math.min(1,dt*(S.air?2.5:6));
  cA.x+=(S.x-cA.x)*Math.min(1,dt*20);cA.z+=(S.z-cA.z)*Math.min(1,dt*20);
  var bx=cA.x-Math.sin(cYaw)*cD,bz=cA.z-Math.cos(cYaw)*cD,by=cH;
  /* keep the lens out of the ramp and inside the cavern */
  bx=Math.max(-DX-14,Math.min(DX+14,bx));bz=Math.max(-DZ-14,Math.min(DZ+14,bz));
  var inPark=Math.abs(bx)<DX&&Math.abs(bz)<DZ;if(inPark)by=Math.max(by,hgt(bx,bz)+1.5);
  cT.set(bx,by,bz);camP.lerp(cT,Math.min(1,dt*14));
  if(Math.abs(camP.x)<DX&&Math.abs(camP.z)<DZ){var fl=hgt(camP.x,camP.z)+1.3;if(camP.y<fl)camP.y=fl}
  var ex=camP.x-S.x,ey=camP.y-S.y,ez=camP.z-S.z,ed=Math.sqrt(ex*ex+ey*ey+ez*ez);if(ed<7){var kk=7/(ed||1);camP.set(S.x+ex*kk,S.y+ey*kk,S.z+ez*kk)}
  cLk.lerp(new T.Vector3(S.x,S.y+1.2,S.z),Math.min(1,dt*12));camL.copy(cLk);
  var fv=62+Math.min(10,spd*.14);if(Math.abs(cam.fov-fv)>.05){cam.fov+=(fv-cam.fov)*Math.min(1,dt*3);cam.updateProjectionMatrix()}
}
return {scene:scene,cam:cam,start:start,stop:stop,update:update,_ros:ROS,get active(){return S.active},_s:S,_camP:camP,_grind:function(){return grind},_kb:kb,_clear:function(){grind=null;combo=[];bailT=0;flipT=0;grab=null;ground()}};
};
