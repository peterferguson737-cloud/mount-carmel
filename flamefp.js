/* The Living Flame of Love: one scene per lantern, every one built round fire.
   Words come only through the typed bubble at eye level, a line at a time, as you act. */
(function(){
'use strict';
var X=window.ASCENT;if(!X||!X.S)return;
var PI=Math.PI;

/* every flame scene: warm dark, the instruction typed once the scene has settled */
function S(id,o,fn){X.S(id,o,function(K,D,sp,q,st,r){
  fn(K,D,sp,q,st,r);
  var told=false;D.onUpdate(function(t){if(!told&&D.time>.5){told=true;D.hint(sp.q)}});
})}
function flame(q,st,x,y,z,s){var f=q.fl(st,x,y,z,s||1);return f}
function glow(D,st,x,y,z,size,op){var g=D.glow(size);g.position.set(x,y,z);g.material.opacity=op==null?.4:op;st.add(g);return g}
function grow(D,o,to,d){var a=o.scale.x;D.tween(d||.8,function(e){o.scale.setScalar(a+(to-a)*e)})}
function fade(D,g,to,d){var a=g.material.opacity;D.tween(d||.8,function(e){g.material.opacity=a+(to-a)*e})}
function fly(D,o,to,d,fin){var a=o.position.clone();D.tween(d||.7,function(e){o.position.set(a.x+(to.x-a.x)*e,a.y+(to.y-a.y)*e+Math.sin(e*PI)*.8,a.z+(to.z-a.z)*e)},fin)}
function rock(K,q,st,n,R){for(var i=0;i<n;i++){var a=i/n*PI*2;q.s(st,.6+((i*7)%5)*.25,Math.sin(a)*R,.1,Math.cos(a)*R-3,'d',.6)}}

/* the poem: four braziers on the slope */
S('lf0',{fog:.05,z:6},function(K,D,sp,q,st){
  K.plain();var L=[];for(var i=0;i<4;i++){var b=K.brazier(st,-3.3+i*2.2,-2.4-Math.abs(i-1.5)*.6,1.6);b.set(false);L.push({g:b,ty:2.8,r:.9,hy:1.4})}
  var sky=glow(D,st,0,4,-8,14,.08);
  K.order(L,function(n,g,fin){g.set(true);D.burst(D.wpos(g).add(new K.T.Vector3(0,1.6,0)),0xffffff);fade(D,sky,.08+.12*(n+1));fin()});
});

/* prologue: the log from the Dark Night, already burning; stir it hotter */
S('lf1',{fog:.045,z:5.5},function(K,D,sp,q,st){
  K.hall(5,14,-1);var h=q.G();h.position.set(0,0,-3);st.add(h);q.b(h,3.4,.3,1.4,0,.15,0,'s');q.b(h,3.6,2.8,.3,0,1.4,-.75,'d');
  q.c(h,.32,.36,2.4,0,.55,0,'w',PI/2);var f=flame(q,h,0,.7,0,.9),g=glow(D,h,0,1.2,.2,6,.35);
  var E=[-.8,0,.8].map(function(x){var e=q.G();e.position.set(x,.55,.3);h.add(e);q.s(e,.14,0,0,0,'l');return e});
  E.forEach(function(e,n){K.strike(n,e,{hp:2,ty:1.1,r:.5},function(){D.burst(D.wpos(e),0xffffff)},function(){grow(D,f,.9+.5*(n+1));fade(D,g,.35+.2*(n+1))})});
});

/* O living flame: three sparks given to the fire */
S('lf2',{fog:.06,z:6},function(K,D,sp,q,st){
  K.plain(0);rock(K,q,st,9,5);var f=flame(q,st,0,0,-3,1.2),g=glow(D,st,0,1.5,-3,8,.3);
  var L=[-2.4,0,2.4].map(function(x,i){var o=K.orb(.9);o.position.set(x,1.4+(i===1?1.1:0),-1+(i===1?.4:0));st.add(o);return {g:o,ty:.8,r:.8}});
  K.order(L,function(n,o,fin){fly(D,o,new K.T.Vector3(0,1,-3),.8,function(){st.remove(o);grow(D,f,1.2+.7*(n+1));fade(D,g,.3+.2*(n+1));D.burst(new K.T.Vector3(0,1.5,-3),0xffffff);fin()})});
});

/* that tenderly wounds: three darts of light into a heart */
S('lf3',{fog:.05,z:6},function(K,D,sp,q,st){
  K.plain(0);var h=D.asset('heart');h.position.set(0,1.2,-3.2);h.scale.setScalar(1.4);st.add(h);var g=glow(D,st,0,2,-3.1,5,.1);
  var L=[[-2.6,2.4],[2.6,2.4],[0,3.6]].map(function(p){var o=K.orb(.7);o.position.set(p[0],p[1],-1.6);st.add(o);return {g:o,ty:.7,r:.7}});
  K.order(L,function(n,o,fin){fly(D,o,new K.T.Vector3(0,2,-3),.5,function(){st.remove(o);K.shake=.3;D.burst(new K.T.Vector3(0,2,-3),0xffffff);fade(D,g,.1+.25*(n+1));fin()})});
});

/* in its deepest centre: rings going down, step through them */
S('lf4',{fog:.05,z:6,yawMax:.8},function(K,D,sp,q,st){
  K.cavern(14);var L=[];for(var i=0;i<4;i++){var z=-1-i*2.6,y=1.6-i*.35,rg=q.t(st,1.1-i*.12,.07,0,y,z,'g');L.push({g:rg,ty:1.4,r:1,hy:0})}
  var c=glow(D,st,0,.4,-11,10,.15),cf=flame(q,st,0,-.4,-11,.6);
  K.order(L,function(n,g,fin){D.burst(D.wpos(g),0xffffff);fade(D,c,.15+.2*(n+1));K.go([[0,1.7-.35*(n+1),-1-n*2.6+1.6]],1.2,function(){if(n===3)grow(D,cf,2);fin()})});
});

/* since now you are not oppressive: clear the clouds over the figure */
S('lf5',{fog:.04,z:6},function(K,D,sp,q,st){
  K.plain();var fig=q.f(st,0,-3,1.1,0),g=glow(D,st,0,1.6,-3,6,0);
  [[-1.4,3.1],[0,3.6],[1.4,3.1]].forEach(function(p,n){var c=q.G();c.position.set(p[0],p[1],-3);st.add(c);q.s(c,.7,0,0,0,'n',.55,1.3);q.s(c,.5,-.6,-.1,0,'n',.5,1.2);q.s(c,.5,.6,-.1,0,'n',.5,1.2);
    K.wipe(n,c,{ty:.9,r:.9,nr:.14},function(){fade(D,g,.2+.25*(n+1))})});
});

/* now finish it, if you will: the door with light behind, two candles */
S('lf6',{fog:.045,z:5.5},function(K,D,sp,q,st){
  K.hall(5,14,-1);var a=D.arch(1.8);a.position.set(0,0,-4);st.add(a);q.b(a,1.6,2.6,.05,0,1.3,-.1,'n');var g=glow(D,st,0,1.4,-4.4,4,.15);
  var fig=q.f(st,0,-2.4,.95,PI);fig.rotation.x=.25;
  [-1.4,1.4].forEach(function(x,n){var c=K.candle(st,x,0,-3.6,false);K.tap(n,c,{ty:1.3,r:.5,hy:.5},function(fin){c.set(true);fade(D,g,.15+.3*(n+1));fin()})});
});

/* tear the veil: three veils, the light behind them */
S('lf7',{fog:.05,z:6,yawMax:.7},function(K,D,sp,q,st){
  K.hall(5,18,-4);var g=glow(D,st,0,1.6,-10,12,.5);flame(q,st,0,0,-10,2.2);
  var V=[0,1,2].map(function(i){var v=q.G();v.position.set(0,0,-1.6-i*2.6);st.add(v);var m=q.b(v,3.6,3,.03,0,1.6,0,'p');m.material=m.material.clone();m.material.transparent=true;m.material.opacity=.9-i*.25;return {g:v,ty:3.4,r:1.2,hy:1.6}});
  K.order(V,function(n,v,fin){D.tween(.9,function(e){v.scale.y=Math.max(.01,1-e);v.position.y=3*e},function(){v.visible=false});K.go([[0,1.7,-1.6-n*2.6+1.2]],1.1,fin)});
});

/* O sweet cautery: heat the iron, touch the heart */
S('lf8',{fog:.045,z:5.5},function(K,D,sp,q,st){
  K.hall(5,14,-1);var b=K.brazier(st,-1.4,-3,1.4);b.set(true);
  var iron=q.G();iron.position.set(-1.4,1.55,-3);iron.rotation.z=-.5;st.add(iron);var rod=q.c(iron,.05,.05,1.6,0,.6,0,'d'),tip=q.s(iron,.1,0,-.2,0,'d');
  var h=D.asset('heart');h.position.set(1.5,1,-3);st.add(h);var g=glow(D,st,1.5,1.8,-3,4,.05);
  K.order([{g:b,ty:2.4,r:.8,hy:1},{g:iron,ty:1.6,r:.6},{g:h,ty:1.8,r:.8,hy:.6}],function(n,o,fin){
    if(n===1){tip.material=tip.material.clone();tip.material.color.set(0xffffff);D.burst(D.wpos(tip),0xffffff)}
    if(n===2){fly(D,iron,new K.T.Vector3(1.1,1.9,-2.8),.6,function(){fade(D,g,.7);D.burst(new K.T.Vector3(1.5,1.8,-3),0xffffff);fin()});return}
    fin()});
});

/* O delightful wound: the seraph's dart */
S('lf9',{fog:.05,z:6},function(K,D,sp,q,st){
  K.plain(0);var s=D.asset('seraph');s.position.set(0,1.2,-4.2);s.scale.setScalar(1.3);st.add(s);glow(D,st,0,3,-4.4,9,.3);
  var fig=q.f(st,0,-1.8,1,PI);var g=glow(D,st,0,1.2,-1.8,3,0);
  var dart=q.G();dart.position.set(0,2.6,-3.6);dart.rotation.x=PI/2;st.add(dart);q.c(dart,.02,.02,1.2,0,0,0,'g');q.k(dart,.07,.2,0,.7,0,'l');
  K.order([{g:s,ty:3.6,r:1.1,hy:1.6},{g:dart,ty:.6,r:.5},{g:fig,ty:1.8,r:.7,hy:.8}],function(n,o,fin){
    if(n===1){fly(D,dart,new K.T.Vector3(0,1.15,-1.9),.4,function(){dart.visible=false;K.shake=.4;fade(D,g,.6);D.burst(new K.T.Vector3(0,1.1,-1.8),0xffffff);fin()});return}
    if(n===2)grow(D,g,1.8);fin()});
});

/* O gentle hand: lights placed in the open hand */
S('lf10',{fog:.05,z:6},function(K,D,sp,q,st){
  K.plain(0);var h=D.asset('handcloud');h.position.set(0,0,-3.6);h.scale.setScalar(1.5);st.add(h);var g=glow(D,st,0,2.2,-3.4,6,.15);
  var L=[-2.2,0,2.2].map(function(x,i){var o=K.orb(.7);o.position.set(x,.9+(i===1?.5:0),-1.2);st.add(o);return {g:o,ty:.7,r:.7}});
  K.order(L,function(n,o,fin){fly(D,o,new K.T.Vector3(-.3+n*.3,2.2,-3.4),.7,function(){fade(D,g,.15+.2*(n+1));fin()})});
});

/* O delicate touch: brush the bright, fine thing gently */
S('lf11',{fog:.06,z:6},function(K,D,sp,q,st){
  K.plain(0);var g=glow(D,st,0,1.8,-3,6,.1);
  [-1.6,0,1.6].forEach(function(x,n){var o=q.G();o.position.set(x,1.4+Math.abs(x)*.2,-2.6);st.add(o);var gl=D.glow(1.6);gl.material.opacity=.7;o.add(gl);q.s(o,.08,0,0,0,'l');
    K.ups.push(function(t){o.position.y=1.4+Math.abs(x)*.2+Math.sin(t*1.3+n)*.08});
    K.wipe(n,o,{ty:.6,r:.6,nr:.12},function(){fade(D,g,.1+.25*(n+1));D.burst(new K.T.Vector3(x,1.5,-2.6),0xffffff)})});
});

/* and pays every debt: three heavy chests turn to gold */
S('lf12',{fog:.045,z:5.6},function(K,D,sp,q,st){
  K.hall(5,14,-1);var C=[-2,0,2].map(function(x){return K.chest(st,x,-3,1.1,0)});
  C.forEach(function(c,n){K.tap(n,c,{ty:1.4,r:.7,hy:.4},function(fin){D.tween(.6,function(e){c.lid.rotation.x=-1.6*e});var gl=D.glow(3);gl.position.set(c.position.x,1.1,-3);st.add(gl);D.burst(new K.T.Vector3(c.position.x,1,-3),0xffffff);c.traverse(function(m){if(m.isMesh){m.material=q.M.g}});fin()})});
});

/* killing, you changed death to life: the dead tree blooms */
S('lf13',{fog:.045,z:6},function(K,D,sp,q,st){
  K.plain();var tr=q.G();tr.position.set(0,0,-3.2);st.add(tr);q.c(tr,.14,.22,2.2,0,1.1,0,'w');
  var B=[[-1,2.6,.6],[1.1,2.5,-.6],[0,3.1,0]].map(function(b){var br=q.G();br.position.set(0,1.9,0);br.rotation.z=b[2];tr.add(br);q.c(br,.05,.08,1.4,0,.6,0,'w');
    var bl=q.G();bl.position.set(0,1.35,0);bl.scale.setScalar(.01);br.add(bl);for(var k=0;k<5;k++)q.s(bl,.14,Math.cos(k*1.26)*.22,Math.sin(k*1.26)*.12,Math.sin(k*1.26)*.22,'p');bl.add(D.glow(1.4));return {br:br,bl:bl}});
  K.order(B.map(function(b){return {g:b.bl,ty:.6,r:.6}}),function(n,o,fin){grow(D,B[n].bl,1,1);D.burst(D.wpos(B[n].bl),0xffffff);fin()});
});

/* O lamps of fire: a ring of lamps, lit one by one */
S('lf14',{fog:.045,z:6.5},function(K,D,sp,q,st){
  K.rotunda(5,8);var c=glow(D,st,0,2.6,-1,10,.08);
  var L=[0,1,2,3,4].map(function(i){var a=-1.1+i*.55,x=Math.sin(a)*3.4,z=-Math.cos(a)*3.4-.4,b=K.brazier(st,x,z,1.1);b.set(false);return {g:b,ty:2.4,r:.8,hy:1.2}});
  K.order(L,function(n,g,fin){g.set(true);fade(D,c,.08+.12*(n+1));fin()});
});

/* in whose splendours: shadows of light; walk in */
S('lf15',{fog:.045,z:6.5},function(K,D,sp,q,st){
  K.rotunda(5,8);[-2.4,2.4].forEach(function(x){var b=K.brazier(st,x,-3,1.3);b.set(true)});
  var sh=[-1,1].map(function(s){var m=new K.T.Mesh(new K.T.PlaneGeometry(1.6,5),new K.T.MeshBasicMaterial({color:0xfff2d0,transparent:true,opacity:.18,depthWrite:false}));m.rotation.x=-PI/2;m.rotation.z=s*.35;m.position.set(s*1.1,.03,-1);st.add(m);return m});
  var g=glow(D,st,0,1.6,-1,5,.1);var spot=q.G();spot.position.set(0,0,-1.2);st.add(spot);
  K.tap(0,spot,{ty:1.2,r:.9,hy:.4},function(fin){K.go([[0,1.7,.4]],1.4,function(){sh.forEach(function(m){fade(D,m,.45)});fin()})});
  K.tap(1,g,{ty:.6,r:.8},function(fin){fade(D,g,.8);fin()});
});

/* the deep caverns of feeling: carry light into three caverns */
S('lf16',{fog:.05,z:6},function(K,D,sp,q,st){
  K.plain(0);q.b(st,12,4.5,1,0,2.25,-4.6,'d');
  var C=[-2.6,0,2.6].map(function(x){var g=q.G();g.position.set(x,1.1,-4.05);st.add(g);var m=new K.T.Mesh(new K.T.CircleGeometry(.85,24),q.M.n);g.add(m);var gl=D.glow(3);gl.material.opacity=0;gl.position.z=.2;g.add(gl);g.gl=gl;return g});
  C.forEach(function(c,n){K.tap(n,c,{ty:1.3,r:.8},function(fin){var o=K.orb(.8);o.position.set(0,1.6,-.6);st.add(o);fly(D,o,new K.T.Vector3(c.position.x,1.1,-4),.7,function(){st.remove(o);fade(D,c.gl,.8);fin()})})});
});

/* the three blind guides: send them aside */
S('lf17',{fog:.045,z:6},function(K,D,sp,q,st){
  K.plain();q.b(st,1.4,.04,14,0,.02,-5,'s');var g=glow(D,st,0,1.4,-9,8,.25);
  [-1,0,1].forEach(function(s,n){var f=q.f(st,s*.6,-2-n*1.6,1,s*.8);q.b(f,.42,.08,.1,0,1.3,.17,'n');
    K.tap(n,f,{ty:1.9,r:.6,hy:.8},function(fin){var x0=f.position.x,side=n===1?1:-s||1;D.tween(.7,function(e){f.position.x=x0+side*(1.8+n*.2)*e;f.rotation.y=side*PI/2*e});fade(D,g,.25+.2*(n+1));fin()})});
});

/* once dark and blind: a great eye opens */
S('lf18',{fog:.05,z:6},function(K,D,sp,q,st){
  K.plain(0);q.b(st,8,4.6,1,0,2.3,-4.4,'d');var eye=q.G();eye.position.set(0,2.1,-3.85);st.add(eye);
  q.s(eye,1,0,0,0,'p',.5,1.6,.15);var iris=q.s(eye,.4,0,0,.12,'g',1,1,.3);iris.scale.setScalar(.01);
  var lid=q.s(eye,1.04,0,0,.04,'d',.52,1.62,.2);var g=glow(D,st,0,2.1,-3.6,4,0);
  K.order([{g:lid,ty:.9,r:.9},{g:eye,ty:1.1,r:1}],function(n,o,fin){if(n===0){D.tween(1,function(e){lid.scale.y=.52*(1-e)+.02})}else{D.tween(1,function(e){iris.scale.setScalar(.01+e)});fade(D,g,.7)}fin()});
});

/* give warmth and light to their Beloved: carry the lights back to the great lamp */
S('lf19',{fog:.045,z:6},function(K,D,sp,q,st){
  K.plain(0);var b=K.brazier(st,0,-4,2.4);b.set(true);var g=glow(D,st,0,2.6,-4,9,.25);
  var L=[-2.4,0,2.4].map(function(x,i){var o=K.orb(.75);o.position.set(x,.6,-1.2+(i===1?.6:0));st.add(o);return {g:o,ty:.7,r:.7}});
  K.order(L,function(n,o,fin){fly(D,o,new K.T.Vector3(0,2.4,-4),.9,function(){st.remove(o);fade(D,g,.25+.2*(n+1));D.burst(new K.T.Vector3(0,2.4,-4),0xffffff);fin()})});
});

/* how gently you wake in my heart: the still world stirs */
S('lf20',{fog:.04,z:6},function(K,D,sp,q,st){
  K.plain();var T=K.T,wake=[0,0,0];
  var trees=[-3,-1.8,1.8,3].map(function(x){var g=q.G();g.position.set(x,0,-3.4-Math.abs(x)*.3);st.add(g);q.c(g,.08,.12,1.4,0,.7,0,'w');q.k(g,.6,1.6,0,2,0,'w');return g});
  var stars=[];for(var i=0;i<14;i++){var s=D.glow(.6);s.position.set(-5+i*.75,4+Math.sin(i*2.1)*.8,-7);s.material.opacity=.15;st.add(s);stars.push(s)}
  var heart=glow(D,st,0,1.4,-2,3,.1);
  K.ups.push(function(t){trees.forEach(function(g,k){g.rotation.z=Math.sin(t*1.6+k)*.08*wake[0]});stars.forEach(function(s,k){s.position.x=-5+k*.75+Math.sin(t*.4+k)*.5*wake[1];s.material.opacity=.15+.6*wake[1]})});
  K.order([{g:trees[1],ty:2.8,r:.9,hy:1.2},{g:stars[7],ty:.6,r:.9},{g:heart,ty:.6,r:.8}],function(n,o,fin){if(n<2)D.tween(1.2,function(e){wake[n]=e});else fade(D,heart,.8);fin()});
});

/* where you dwell secretly alone: the small room, one light inside */
S('lf21',{fog:.05,z:6.5},function(K,D,sp,q,st){
  K.plain();var h=D.asset('house');h.position.set(0,0,-4);st.add(h);var lt=glow(D,st,0,1.2,-3.4,3,.25);
  var door=q.G();door.position.set(0,0,-2.6);st.add(door);
  K.tap(0,door,{ty:1.6,r:.8,hy:.8},function(fin){K.go([[0,1.7,-1.2]],1.6,function(){K.fogT=.08;fin()})});
  K.tap(1,lt,{ty:.6,r:.6},function(fin){fade(D,lt,.8);fin()});
});

/* and in your sweet breathing: the breath lifts the flame toward the summit, then silence */
S('lf22',{fog:.04,z:6,finDelay:3},function(K,D,sp,q,st){
  K.plain();var f=flame(q,st,0,0,-3,1.4),g=glow(D,st,0,1.4,-3,5,.3),top=glow(D,st,0,9,-14,24,.05);
  var wisps=[];for(var i=0;i<3;i++){var w=q.G();w.position.set(-2.4+i*2.4,1.2,-1.6);st.add(w);var gl=D.glow(1.4);gl.material.opacity=.5;w.add(gl);wisps.push({g:w,ty:.6,r:.7})}
  K.order(wisps,function(n,o,fin){fly(D,o.g||o,new K.T.Vector3(0,1.4,-3),.8,function(){(o.g||o).visible=false;grow(D,f,1.4+.5*(n+1));
    if(n===2){D.tween(2.4,function(e){f.position.y=e*6;f.position.z=-3-e*9;g.material.opacity=.3*(1-e)});fade(D,top,.45,2.4)}fin()})});
});
})();
