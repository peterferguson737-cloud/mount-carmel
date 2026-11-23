/* First-person scenes: Book One chapters 12 to 15, and Book Two chapter 1. */
(function(){
'use strict';
var X=window.ASCENT;if(!X||!X.S)return;

/* I.12: which desires do harm. Each one comes to hand; throw it to the thorns or to the shield. */
X.S(13,{fog:.045,z:5.5},function(K,D,sp,q,st,r){
  K.hall(4.4,16,-1);
  var pit=q.G();pit.position.set(-2.3,0,-3);st.add(pit);q.c(pit,1.1,1.1,.04,0,.03,0,'n');q.t(pit,1.1,.16,0,.1,0,'s',1.5708);
  for(var i=0;i<9;i++)q.k(pit,.09,1,Math.sin(i*.7)*.75,.5,Math.cos(i*.7)*.75,'d',Math.sin(i*.7)*-.3,Math.cos(i*.7)*.3);
  var sh=K.asset(2.3,-3,1.5);q.c(r,.9,1.1,.3,2.3,.15,-3,'s');
  K.sort([{g:pit,hy:.5,fy:.2,ty:1.9,r:1.1},{g:sh,hy:1.3,fy:1.9,ty:3.7,r:.8}],function(it,k){
    var g=q.G(),m=it[1]?'p':'d';q.s(g,.2,0,0,0,m);q.k(g,.14,.5,-.3,.05,0,m,1.5708);q.k(g,.14,.5,.3,.05,0,m,-1.5708);return g});
  K.ups.push(function(t){pit.rotation.y=t*.2});
});

/* I.13: the counsels, as a climb by five wayside stations up to the cross. The night thickens as you go. */
X.S(14,{fog:.03,z:7,pitch:.14,yawMax:.9,finDelay:2},function(K,D,sp,q,st,r){
  K.plain();var P=[];
  sp.items.forEach(function(it,n){
    var x=Math.sin(n*1.3)*2.2,y=.5+n*.95,z=-1-n*4.2;q.c(r,1.8,2.2,y,x,y/2,z,'s');
    var g=q.G();g.position.set(x+1.15,y,z-.4);st.add(g);q.b(g,.5,.9,.3,0,.45,0,'s');q.b(g,.1,.8,.1,0,1.3,0,'w');q.b(g,.5,.1,.1,0,1.45,0,'w');
    P.push({g:g,hy:.9,ty:2.3,r:1,p:[x,y+1.7,z+1.3]});
  });
  var L=P[4].p,cal=K.asset(L[0],L[2]-7.5,2.4);cal.position.y=L[1]-1.7;q.s(r,5,L[0],L[1]-3.4,L[2]-7.5,'s',.5);
  var gl=D.glow(12);gl.position.set(L[0],L[1]+3.5,L[2]-7.5);gl.material.opacity=.05;st.add(gl);
  K.order(P,function(n,g,fin){K.go([P[n].p],2.4,function(){K.fogT=.03+n*.011;gl.material.opacity=.05+.95*(n+1)/5;fin()})});
});

/* I.14: a cold stone heart in a crypt. Three fires on the walls; carry each to it. */
X.S(15,{fog:.06,z:5,finDelay:2},function(K,D,sp,q,st,r){
  K.hall(3.8,14,-1);q.c(r,1.3,1.5,.4,0,.2,-3.2,'s');
  var h=q.G(),lit=0;h.position.set(0,.3,-3.2);h.scale.setScalar(1.5);st.add(h);
  q.s(h,.5,-.33,1.5,0,'c');q.s(h,.5,.33,1.5,0,'c');q.k(h,.78,1.1,0,.85,0,'c',3.1416);
  var fl=q.fl(h,0,1.9,0,.3),gl=D.glow(2);gl.position.y=2.3;gl.material.opacity=.15;h.add(gl);
  [[-3.1,2,-.5],[3.1,2,-2],[0,3.1,.4]].forEach(function(p,n){
    var g=q.G();g.position.set(p[0],p[1],p[2]);st.add(g);q.c(g,.05,.08,.9,0,-.35,0,'w');q.c(g,.24,.1,.25,0,.2,0,'d');var f=q.fl(g,0,.25,0,1.1);if(n===2)q.c(g,.02,.02,2.4,0,1.5,0,'d');
    K.tap(n,g,{r:.75,ty:1.2},function(fin){
      var s=K.orb(.8);st.add(s);f.setOn(false);
      D.tween(.9,function(e){s.position.set(p[0]*(1-e),p[1]+(3.2-p[1])*e+Math.sin(e*3.1416)*.9,p[2]+(-3.2-p[2])*e)},function(){
        st.remove(s);lit++;fl.scale.setScalar(.3+lit*.65);gl.material.opacity=.15+.28*lit;gl.scale.setScalar(2+3.5*lit);K.shake=.3;fin()});
    });
  });
});

/* I.15: the last of the house. A restless walker, two watchers at the door, one lamp left burning. Then out. */
X.S(16,{fog:.045,z:6,finDelay:3.4},function(K,D,sp,q,st,r){
  K.hall(4.4,18,-1);
  var door=q.b(st,1.6,2.8,.12,0,1.4,-9.8,'w');q.b(r,.25,3,.3,-.95,1.5,-9.85,'s');q.b(r,.25,3,.3,.95,1.5,-9.85,'s');q.b(r,2.2,.3,.3,0,3.1,-9.85,'s');q.b(r,1.6,2.8,.05,0,1.4,-9.95,'n');
  var star=D.glow(5);star.position.set(0,9,-26);star.material.opacity=0;st.add(star);for(var i=0;i<9;i++)q.s(r,.07,-6+((i*37)%13),5+((i*53)%9),-24-((i*7)%5),'l');
  var w=q.f(st,0,0,1.4,0),wl=K.candle(w,.35,.75,.2,1),still=false;
  K.strike(0,w,{hp:2,r:.9,hy:.8,ty:2.5},null,function(){still=true;wl.set(false);w.rotation.x=-1.45;w.position.y=.35});
  K.ups.push(function(t){if(!still)w.position.set(Math.sin(t*.8)*2.6,0,-1.5+Math.cos(t*.6)*1.5)});
  var wn=2,wt=K.tag(sp.items[1][0],null,0,0,3.9,-9.3);
  [-1.9,1.9].forEach(function(x){
    var f=q.f(st,x,-8.8,1.5,0),c=K.candle(f,.3,.75,.25,1);
    K.target(f,.9,.12,function(t){K.kill(t);c.set(false);D.tone(260,.2);D.tween(.5,function(e){f.rotation.x=-e*.5;f.position.y=-e*.25});if(!--wn){wt.visible=false;K.complete(1)}},.8);
  });
  var lamp=q.G();lamp.position.set(0,3.3,-4);st.add(lamp);q.c(lamp,.02,.02,3,0,1.6,0,'d');q.c(lamp,.4,.2,.25,0,0,0,'d');var lf=q.fl(lamp,0,.05,0,1.6),lg=D.glow(6);lg.position.y=.6;lamp.add(lg);
  K.strike(2,lamp,{hp:3,regen:.15,r:.75,ty:1.3},function(p){lf.scale.setScalar(1.6*(1-p*.6));lg.material.opacity=1-p*.7},function(){lf.setOn(false);lg.visible=false});
  K.onAll=function(){
    D.tween(1.2,function(e){door.rotation.y=-e*1.4;door.position.x=-e*.75;door.position.z=-9.8+e*.6});star.material.opacity=1;
    K.go([[0,1.7,-6],[0,1.7,-11.5]],2.8,function(){K.pitchTo=.5});
  };
});

/* II.1: the secret ladder, in a dark shaft. Climb rung by lit rung. */
X.S(17,{fog:.04,z:5,pitch:.3,yawMax:.6,finDelay:2},function(K,D,sp,q,st,r){
  K.ground(16,16,0);K.shell(new K.T.CylinderGeometry(7,7,44,28,1,true),0,21,0);
  q.b(r,.14,30,.14,-.6,15,-2,'w');q.b(r,.14,30,.14,.6,15,-2,'w');for(var i=0;i<56;i++)q.b(r,1.2,.08,.1,0,.48+i*.52,-2,'w');
  for(i=0;i<5;i++)q.t(r,6.9,.12,0,4+i*4.5,0,'d',1.5708);
  var top=D.glow(9);top.position.set(0,26,-2);top.material.opacity=.25;st.add(top);var L=[];
  sp.items.forEach(function(it,n){var g=q.G();g.position.set(0,3.6+n*3.64,-2);st.add(g);q.b(g,1.3,.12,.14,0,0,.02,'l');g.add(D.glow(1.8));L.push({g:g,ty:.6,r:.8})});
  K.order(L,function(n,g,fin){K.go([[0,g.position.y+.3,2.2]],2.2,function(){g.visible=false;K.fogT=.04+(n+1)*.012;top.material.opacity=.25+.25*(n+1);fin()})});
});
})();
