/* First-person scenes: Book Three, chapters 24 to 45, and the summit. */
(function(){
'use strict';
var X=window.ASCENT;if(!X||!X.S)return;
var PI=Math.PI;
function gate(q,st,x,z,w,h){var g=q.G();g.position.set(x,0,z);st.add(g);q.b(g,.5,h,.5,-w,h/2,0,'s');q.b(g,.5,h,.5,w,h/2,0,'s');q.t(g,w,.25,0,h,0,'s',0,0,PI);return g}
function hound(q,p,x,z){var b=q.G();b.position.set(x,0,z);p.add(b);q.s(b,.5,0,.7,0,'d',.8,1.5,.8);q.s(b,.3,.75,1,0,'d');q.k(b,.12,.4,1.05,.95,0,'d',-1.5708);q.k(b,.08,.25,.65,1.3,.14,'d');q.k(b,.08,.25,.65,1.3,-.14,'d');[[-.4,.2],[.4,.2],[-.4,-.2],[.4,-.2]].forEach(function(l){q.c(b,.07,.07,.6,l[0],.3,l[1],'d')});return b}

/* III.24: a harp playing. Sink into the couch beside it, or rise through the light overhead. */
X.S(72,{fog:.045,z:5.4},function(K,D,sp,q,st,r){
  K.hall(4.2,14,-.8);var hp=K.asset(0,-3,1.8);
  var co=q.G();co.position.set(-2.3,0,-1);st.add(co);q.b(co,2,.4,.9,0,.3,0,'w');q.s(co,.9,0,.55,0,'p',.3,1,.5);q.s(co,.3,-.7,.75,0,'p',.8);
  var sh=K.shaft(2.2,3.4,-1.6,.6,1.3,6.8,0,0,.08),up=q.G();up.position.set(2.2,0,-1.6);st.add(up);q.c(up,1.3,1.4,.16,0,.08,0,'s');
  K.choose([{g:co,hy:.6,ty:1.8,r:1},{g:up,hy:1.6,ty:3.4,r:1.1}],function(n,g,fin){sh.material.opacity=.25;K.pitchTo=.5;K.go([[2.2,1.8,.6],[2.2,6,-1]],3.4,fin)},
    function(n,g,no){K.go([[-1.6,1.7,1.4],[-1.8,.9,.6]],1.8,function(){K.fogT=.1;K.go([[0,1.7,5.4]],1.8,function(){K.fogT=.045;no()})})});
  K.ups.push(function(t){hp.rotation.y=Math.sin(t*.6)*.15});
});

/* III.25: five hounds snapping round a feast, one for each sense. Make each lie down. */
X.S(73,{fog:.045,z:6,finDelay:2},function(K,D,sp,q,st,r){
  K.hall(4.6,16,-1);K.asset(0,-5.4,1.7);
  sp.items.forEach(function(it,n){
    var bx=(n-2)*1.5,bz=-1.2-(2-Math.abs(n-2))*.9,b=hound(q,st,bx,bz),calm=false,sd=bx>0?-1:1;b.rotation.y=bx>0?PI:0;
    K.ups.push(function(t){if(!calm){b.position.x=bx+sd*Math.abs(Math.sin(t*2.2+n))*.7;b.rotation.z=Math.sin(t*7+n)*.06}});
    K.strike(n,b,{hp:2,regen:.2,r:.8,hy:.8,ty:1.9+(n%2)*.45},null,function(){calm=true;D.tween(.5,function(e){b.scale.y=1-e*.45})})});
});

/* III.26: a walled garden with four closed buds. Wake each. */
X.S(74,{fog:.03,z:6,pitch:-.02,finDelay:2},function(K,D,sp,q,st,r){
  K.court(5.5,16,-2);K.asset(0,-6,1.8);
  sp.items.forEach(function(it,n){
    var g=q.G(),P=[];g.position.set(-2.7+n*1.8,0,-1.4-(n%2)*1.3);st.add(g);q.c(g,.04,.06,1.3,0,.65,0,'d');q.s(g,.2,.2,.5,0,'d',.4,1.4,.6);
    for(var i=0;i<6;i++){var pv=q.G(),pt=q.G();pv.position.y=1.3;pv.rotation.y=i*1.047;g.add(pv);pv.add(pt);q.s(pt,.3,0,.3,0,'p',1,.45,.2);P.push(pt)}
    var c=q.s(g,.14,0,1.36,0,'g');c.visible=false;
    K.tap(n,g,{hy:1.3,ty:2.3,r:.7},function(fin){c.visible=true;var gl=D.glow(3);gl.position.y=1.5;g.add(gl);D.tween(.9,function(e){P.forEach(function(pt){pt.rotation.x=e*1.25})},fin)})});
});

/* III.27: five handsome lamps on a ledge, unlit. A polishing cloth, or a jar of oil. */
X.S(75,{fog:.05,z:5.2},function(K,D,sp,q,st,r){
  K.hall(4,13,-.5);q.b(r,6,.16,.8,0,1.5,-3.4,'s');q.b(r,6,1.5,.6,0,.75,-3.5,'s');var Lm=[];
  for(var i=0;i<5;i++){var l=q.G();l.position.set(-2.2+i*1.1,1.58,-3.4);st.add(l);q.s(l,.3,0,.14,0,'g',.5,1.3,1);q.k(l,.08,.3,.42,.16,0,'g',-1.5708);q.t(l,.12,.03,-.4,.2,0,'g');var f=q.fl(l,.56,.16,0,.8);f.setOn(false);Lm.push(f)}
  var cl=q.G();cl.position.set(-1.8,0,-.4);st.add(cl);q.c(cl,.3,.4,.9,0,.45,0,'w');q.b(cl,.7,.06,.7,0,.93,0,'p',.4);
  var jar=K.jar(st,1.8,0,-.4,1);
  K.choose([{g:cl,hy:.9,ty:1.9,r:.7},{g:jar,hy:.8,ty:2.2,r:.7}],function(n,g,fin){var k=0;D.tween(1.5,function(e){jar.rotation.z=Math.sin(e*PI)*.6;for(;k<e*5;k++){Lm[k].setOn(true);D.tone(500+k*60,.2)}},fin)},
    function(n,g,no){D.tween(1.2,function(e){Lm.forEach(function(f,k){f.setOn(Math.sin(e*30+k)>.3&&e<.8)})},no)});
});

/* III.28: a stair of seven trophies, going down. Each banner falls as you pass it. */
X.S(76,{fog:.035,z:6,pitch:-.1,yawMax:.8,finDelay:2},function(K,D,sp,q,st,r){
  var H=7.7,P=[];K.pos.y=H+1.7;K.ground(30,60,-14);q.b(r,.6,22,60,-4.2,11,-14,'s');q.b(r,.6,22,60,4.2,11,-14,'s');q.b(r,7.8,H,6,0,H/2,6,'s');
  sp.items.forEach(function(it,n){
    var y=H-(n+1)*1.1,z=1.2-n*3.2,x=n%2?2.4:-2.4,o=x>0?-.55:.55;q.b(r,7.8,Math.max(.1,y),3.2,0,Math.max(.05,y/2),z,'s');
    var g=q.G();g.position.set(x,y,z-.9);st.add(g);q.c(g,.05,.05,2.6,0,1.3,0,'w');q.b(g,1.2,.06,.06,o,2.56,0,'w');
    P.push({g:g,hy:1.8,ty:3,r:.9,bn:q.b(g,1,1.5,.05,o,1.8,0,'g'),p:[x*.2,y+1.7,z+.9]})});
  K.asset(0,-21,1.6);
  K.order(P,function(n,g,fin){K.go([P[n].p],1.8,function(){var b=P[n].bn;D.tween(.6,function(e){b.position.y=1.8-e*1.6;b.rotation.z=e*1.2});K.fogT=.035+(n+1)*.006;fin();D.light(.8*(1-(n+1)/7)+.05)})});
});

/* III.29: four coins on a table and an alms box. Give each one unseen; a lamp lights for it. */
X.S(77,{fog:.045,z:5.2,finDelay:2},function(K,D,sp,q,st,r){
  K.hall(4,13,-.5);K.asset(0,-3,1.8);var Lm=[];
  [-2.6,-1.3,1.3,2.6].forEach(function(x){var y=1.6+Math.abs(x)*.2;q.b(r,.5,.1,.4,x,y-.05,-5.6,'s');Lm.push(K.candle(st,x,y,-5.6,0))});
  q.b(r,3.6,.1,.8,0,.9,.6,'w');[-1.6,1.6].forEach(function(x){q.b(r,.1,.9,.7,x,.45,.6,'w')});
  sp.items.forEach(function(it,n){
    var x=-1.35+n*.9,g=q.G();g.position.set(x,1,.6);st.add(g);q.c(g,.2,.2,.05,0,0,0,'g');
    K.tap(n,g,{r:.45,ty:.7+(n%2)*.5},function(fin){D.tween(.8,function(e){g.position.set(x*(1-e),1+Math.sin(e*PI)*1.6+e*.9,.6-3.6*e);g.rotation.x=e*9},function(){g.visible=false;D.tone(900,.1);Lm[n].set(true);fin()})})});
});

/* III.30: the disciples' return. The book of life on its stand, and a heap of broken chains. */
X.S(78,{fog:.045,z:5.6},function(K,D,sp,q,st,r){
  K.hall(4.2,14,-.8);var a=K.asset(-2.4,-2.6,1.6),ag=D.glow(4);ag.position.set(-2.4,2.4,-2.6);ag.material.opacity=.4;st.add(ag);
  var b=q.G();b.position.set(2.4,0,-2.6);st.add(b);q.c(b,1,1.1,.3,0,.15,0,'s');for(var i=0;i<7;i++)q.t(b,.22,.06,Math.sin(i*1.9)*.5,.45+(i%3)*.12,Math.cos(i*1.9)*.4,'d',1.2+i*.4,i);
  K.sort([{g:a,hy:1.2,fy:2.2,ty:3.4,r:.9},{g:b,hy:.6,fy:.8,ty:2,r:1}],function(){return K.tok('star',1)});
});

/* III.31: a crowd in a square, and a staff that could become a serpent. Use it, or sit down. */
X.S(79,{fog:.035,z:6.5,pitch:.04},function(K,D,sp,q,st,r){
  K.court(6,18,-3);var sv=K.asset(-1.8,-1.5,1.7),cw=[];for(var i=0;i<9;i++)cw.push(q.f(st,-4+i,-6-(i%3)*.9,1.2,0));
  var stn=q.G();stn.position.set(1.9,0,-1.2);st.add(stn);q.s(stn,.8,0,.3,0,'s',.6);q.b(stn,.9,.1,.6,0,.82,0,'h');
  K.choose([{g:sv,hy:1.2,ty:3.2,r:.8},{g:stn,hy:.6,ty:1.8,r:.9}],function(n,g,fin){K.fogT=.02;var gl=D.glow(7);gl.position.set(0,4,-6.5);gl.material.opacity=.5;st.add(gl);fin()},
    function(n,g,no){var gl=D.glow(10);gl.position.set(-1.8,2.5,-1.5);st.add(gl);D.tween(1.6,function(e){sv.rotation.y=e*12;gl.material.opacity=Math.sin(e*PI);cw.forEach(function(f,k){f.position.y=Math.abs(Math.sin(e*14+k))*.3*(1-e)})},function(){st.remove(gl);no()})});
});

/* III.32: three signal fires under a cloud. Beat them out, and the cloud parts over the peak. */
X.S(80,{fog:.05,z:6.5,pitch:.1,finDelay:3},function(K,D,sp,q,st,r){
  K.plain(0);K.asset(0,-18,5);var pg=D.glow(12),cl=[];pg.position.set(0,14,-18);pg.material.opacity=.05;st.add(pg);
  for(var i=0;i<7;i++)cl.push(q.s(st,2.6,-7+i*2.3,8+(i%2)*1.5,-13,'p',.55));
  [[-2.8,-1],[0,-3],[2.8,-1]].forEach(function(p,n){var b=K.brazier(st,p[0],p[1],2.2);K.strike(n,b,{hp:3,regen:.25,r:.9,hy:1.6,ty:3.6},function(pp){b.fl.scale.setScalar(2.2*(1-pp*.6));b.gl.material.opacity=1-pp*.7},function(){b.set(false)})});
  K.onAll=function(){K.fogT=.015;K.pitchTo=.5;pg.material.opacity=1;D.tween(2.4,function(e){cl.forEach(function(c,k){c.position.x+=(k<3.5?-1:1)*.08;c.scale.setScalar(1-e*.6)})})};
});

/* III.33: a table with a basket for what John goes on to treat, and a shut cupboard for what he leaves. */
X.S(81,{fog:.045,z:5.4},function(K,D,sp,q,st,r){
  K.hall(4.2,14,-.8);
  var a=q.G();a.position.set(-2.3,0,-2.4);st.add(a);q.b(a,1.8,.12,1.1,0,.9,0,'w');[-.8,.8].forEach(function(x){q.b(a,.1,.9,1,x,.45,0,'w')});var bk=D.asset(sp.set);bk.position.y=.96;bk.scale.setScalar(.9);a.add(bk);
  var b=q.G();b.position.set(2.3,0,-2.8);st.add(b);q.b(b,1.7,3,.7,0,1.5,0,'w');q.b(b,.8,2.8,.06,-.42,1.5,.37,'d');q.b(b,.8,2.8,.06,.42,1.5,.37,'d');q.s(b,.06,-.08,1.5,.42,'g');q.s(b,.06,.08,1.5,.42,'g');
  K.sort([{g:a,hy:1.3,fy:1.5,ty:2.7,r:.9},{g:b,hy:1.6,fy:3.2,ty:3.9,r:.9}],function(){var g=q.G();q.b(g,.4,.08,.5,0,0,0,'p');q.b(g,.42,.1,.06,0,0,-.25,'d');return g});
});

/* III.34: a bowl full of lights. Clutch it, or pour it out on the altar. */
X.S(82,{fog:.045,z:5.2},function(K,D,sp,q,st,r){
  K.hall(4,13,-.5);var bw=K.asset(-1.8,-1.6,1.5),orbs=[];for(var i=0;i<5;i++){var o=K.orb(.6);o.position.set(-1.8+Math.sin(i*1.3)*.3,1.7+i*.12,-1.6+Math.cos(i*1.3)*.3);st.add(o);orbs.push(o)}
  var al=K.asset(1.8,-2.6,1.5,'altar'),ag=D.glow(3);ag.position.set(1.8,2.6,-2.6);ag.material.opacity=.15;st.add(ag);
  K.choose([{g:bw,hy:.9,ty:2.6,r:.8},{g:al,hy:1,ty:3,r:.9}],function(n,g,fin){
    D.tween(1.4,function(e){orbs.forEach(function(o,k){var u=Math.min(1,Math.max(0,e*1.6-k*.12));o.position.set(-1.8+3.6*u,1.7+Math.sin(u*PI)*1.2+u*.9,-1.6-u)});ag.material.opacity=.15+.85*e;ag.scale.setScalar(3+e*7);bw.rotation.z=-Math.sin(e*PI)*.5},fin)},
   function(n,g,no){K.go([[-.8,1.2,2.6]],1.4,function(){K.shake=.4;K.go([[0,1.7,5.2]],1.4,no)})});
});

/* III.35: an image-maker's shop. A prayer niche for what moves to devotion, a merchant's stall for the rest. */
X.S(83,{fog:.045,z:5.6},function(K,D,sp,q,st,r){
  K.hall(4.4,14,-.8);K.asset(0,-5.6,1.5);
  var a=K.niche(-2.7,-2.8,.45,'d');K.candle(a,-.4,.22,.1,1);K.candle(a,.4,.22,.1,1);q.b(a,.1,.9,.06,0,1.5,-.1,'w');q.b(a,.5,.1,.06,0,1.7,-.1,'w');
  var b=q.G();b.position.set(2.6,0,-2.4);b.rotation.y=-.4;st.add(b);q.b(b,2,.12,1,0,.95,0,'w');[-.9,.9].forEach(function(x){q.b(b,.1,.95,.9,x,.47,0,'w');q.c(b,.04,.04,1.6,x,1.8,-.4,'w')});q.b(b,2.2,.06,1.2,0,2.6,0,'p',0,0,.15);
  var sc=K.tok('scales',1.1),cn=K.tok('coin',.9);sc.position.set(0,1.6,0);b.add(sc);cn.position.set(-.6,1.45,.2);b.add(cn);
  K.sort([{g:a,hy:1.3,fy:1.2,ty:3.5,r:1},{g:b,hy:1.3,fy:1.5,ty:3.1,r:1}]);
});

/* III.36: a plain statue in a hill shrine, and pilgrims who walked a long way to it. */
X.S(84,{fog:.035,z:6.5,pitch:.06},function(K,D,sp,q,st,r){
  K.plain();var sh=K.asset(0,-5,2,null,.3);q.s(r,5,0,-2.2,-5,'s',.5);
  var pg=q.G(),gl=D.glow(3);pg.position.set(1.6,0,-1.6);st.add(pg);[[0,0],[.8,.5],[-.5,.8]].forEach(function(p){q.f(pg,p[0],p[1],1.2,-.3).rotation.x=.4});gl.position.y=1.6;gl.material.opacity=.1;pg.add(gl);
  for(var i=0;i<6;i++)q.b(r,.9,.04,.5,-1+Math.sin(i)*.4,.03,3-i*1.2,'c');
  K.choose([{g:sh,hy:1.2,ty:3.4,r:.9},{g:pg,hy:1,ty:2.6,r:1.1}],function(n,g,fin){gl.material.opacity=1;gl.scale.setScalar(9);fin()},
    function(n,g,no){D.tween(1,function(e){sh.rotation.y=Math.sin(e*20)*.05*(1-e)},no)});
});

/* III.37: three framed images. Strike each and it rolls up like a blind, leaving a window. */
X.S(85,{fog:.045,z:5.6,finDelay:2},function(K,D,sp,q,st,r){
  K.hall(4.4,14,-.8);
  [-2.6,0,2.6].forEach(function(x,n){
    var z=-3+Math.abs(x)*.35,g=q.G(),im=q.G();g.position.set(x,0,z);g.rotation.y=-x*.14;st.add(g);
    q.b(g,.14,3.2,.2,-.8,1.8,0,'g');q.b(g,.14,3.2,.2,.8,1.8,0,'g');q.b(g,1.74,.14,.2,0,3.4,0,'g');q.b(g,1.74,.3,.3,0,.2,0,'g');q.b(g,1.46,3,.03,0,1.9,-.12,'l');
    im.position.set(0,3.4,0);g.add(im);q.b(im,1.46,3,.05,0,-1.5,0,n===1?'p':'c');
    if(n===0)q.f(im,0,.05,1.2,0).position.y=-2.9;else if(n===1){q.c(im,.3,.3,.03,0,-1.1,.04,'d',0,1.5708);q.b(im,.7,1,.03,0,-2.1,.04,'d')}else{q.s(im,.4,0,-1.3,.03,'d',1,1,.1);q.s(im,.16,0,-1.3,.07,'l',1,1,.2)}
    var ray=K.shaft(x,1.4,z+1.4,.6,1.2,3.6,-1,0,0);
    K.strike(n,g,{hp:2,r:.9,hy:1.9,ty:3.9,rev:1},function(p){im.scale.y=1-p*.4},function(){ray.material.opacity=.14;D.tween(.6,function(e){im.scale.y=.6-e*.55})})});
});

/* III.38: palms and banners down a street. The splendid arch, or one figure on his knees. */
X.S(86,{fog:.035,z:6.5,pitch:.05},function(K,D,sp,q,st,r){
  K.court(5,22,-5);K.asset(0,-4.5,1.7);
  for(var i=0;i<8;i++){var x=(i%2?1:-1)*3.2,z=-1-Math.floor(i/2)*2.4;q.f(st,x,z,1.25,x>0?-1.4:1.4);q.c(r,.03,.03,2.2,x*.86,1.9,z,'w',x>0?.3:-.3);q.k(r,.3,.9,x*.75,3.1,z,'d',x>0?.3:-.3)}
  var ar=gate(q,st,0,-9,2,4.2),ag=D.glow(6);q.b(ar,3.6,.7,.06,0,3.4,.3,'g');ag.position.y=3.4;ar.add(ag);
  var kn=q.f(st,1.5,1.2,1.2,-.5),hg=D.glow(2);kn.rotation.x=.45;hg.position.set(1.5,1.2,1.2);hg.material.opacity=.2;st.add(hg);
  K.choose([{g:ar,hy:3.4,ty:5.3,r:1.6,nr:.18},{g:kn,hy:.8,ty:2.4,r:.8}],function(n,g,fin){hg.material.opacity=1;hg.scale.setScalar(7);ag.material.opacity=.2;fin()},
    function(n,g,no){D.tween(1.2,function(e){ag.scale.setScalar(6+Math.sin(e*PI)*8)},function(){ag.material.opacity=.3;no()})});
});

/* III.39: a gilded chapel on one side of the road, a bare cave on the other. */
X.S(87,{fog:.035,z:7,yawMax:1},function(K,D,sp,q,st,r){
  K.plain();var cp=q.G(),cg=D.glow(6);cp.position.set(-3.6,0,-4);cp.rotation.y=.5;st.add(cp);q.b(cp,3.4,3.6,3,0,1.8,0,'s');q.py(cp,2.8,1.6,0,4.4,0,'g');q.b(cp,1,2,.08,0,1,1.52,'g');q.c(cp,.5,.5,.06,0,2.9,1.52,'l',0,1.5708);[-1.3,1.3].forEach(function(x){q.c(cp,.14,.16,3.6,x,1.8,1.6,'g')});cg.position.set(0,2,2);cp.add(cg);
  var cv=K.asset(3.4,-4,2.2);cv.rotation.y=-.5;
  K.choose([{g:cp,hy:1.8,ty:5.6,r:1.6},{g:cv,hy:.8,ty:2.6,r:1.4}],function(n,g,fin){K.fogT=.07;K.go([[2.6,1.5,-1.6]],3,fin)},
    function(n,g,no){K.go([[-2.4,1.7,-.6]],2.2,function(){var k=0;D.tween(1.2,function(e){cg.scale.setScalar(6+e*14);K.shake=.2;for(;k<e*8;k++){var o=D.glow(1.5);o.position.set(-3+Math.sin(k*2)*1.5,1+k*.3,-2);st.add(o)}},function(){cg.scale.setScalar(6);K.go([[0,1.7,7]],2,no)})})});
});

/* III.40: a tent in the desert, and a road of signposts that loops back to it. */
X.S(88,{fog:.04,z:7,yawMax:1},function(K,D,sp,q,st,r){
  K.plain();var tn=K.asset(2.6,-3,2.2),lamp=K.candle(st,2.2,0,-1.6,0);tn.rotation.y=-.4;
  var rd=q.G();rd.position.set(-2.6,0,-2);st.add(rd);q.c(rd,.06,.08,2.2,0,1.1,0,'w');q.b(rd,1.1,.3,.06,-.35,1.9,0,'w');q.b(rd,1.1,.3,.06,.35,1.5,0,'w',.4);for(var i=0;i<5;i++)q.b(r,1,.04,.6,-3-i*1.1,.03,-3-i*2.2,'c',.5);
  K.choose([{g:rd,hy:1.7,ty:2.9,r:.9},{g:tn,hy:.9,ty:3.2,r:1.3}],function(n,g,fin){lamp.set(true);lamp.gl.scale.setScalar(7);K.go([[1.6,1.5,-.4]],2.6,fin)},
    function(n,g,no){K.go([[-3.4,1.7,-4],[-8,1.7,-10],[-3,1.7,-16],[4,1.7,-10],[4,1.7,0],[0,1.7,7]],6,no)});
});

/* III.41: four whirligigs spinning by a votive stand. Still each one; they start up again if you let them. */
X.S(89,{fog:.045,z:5.6,finDelay:2},function(K,D,sp,q,st,r){
  K.hall(4.4,14,-.8);K.asset(0,-5,1.6);
  sp.items.forEach(function(it,n){
    var g=q.G(),w=q.G(),spin=1;g.position.set(-3+n*2,0,-1.4-(n%2)*1.4);st.add(g);q.c(g,.05,.08,2,0,1,0,'w');w.position.set(0,2.1,.12);g.add(w);
    for(var i=0;i<6;i++)q.b(w,.16,.7,.03,Math.sin(i*1.047)*.4,Math.cos(i*1.047)*.4,0,i%2?'p':'c').rotation.z=-i*1.047;
    q.s(w,.1,0,0,.03,'g');
    K.ups.push(function(t,dt){w.rotation.z+=dt*9*spin});
    K.strike(n,g,{hp:3,regen:.3,r:.75,hy:2.1,ty:3.1},function(p){spin=1-p},function(){spin=0})});
});

/* III.42: three places: a quiet grove, a standing stone, a peak marked out by cloud. */
X.S(90,{fog:.03,z:6.5,pitch:.08},function(K,D,sp,q,st,r){
  K.plain();
  var a=q.G();a.position.set(-3,0,-3);st.add(a);q.c(a,.2,.3,1.8,0,.9,0,'w');q.s(a,1.2,0,2.6,0,'d',.9);q.s(a,.8,.7,2.2,.2,'d');q.s(a,.8,-.7,2.3,-.1,'d');
  var b=K.asset(0,-4,1.7);
  var c=q.G(),cg=D.glow(4);c.position.set(3.2,0,-4.5);st.add(c);q.k(c,2,4.4,0,2.2,0,'s');q.s(c,.9,-.5,4.4,0,'p',.5);q.s(c,1.1,.4,4.6,0,'p',.5);cg.position.y=5;c.add(cg);
  K.sort([{g:a,hy:1.6,fy:2,ty:4,r:1.1},{g:b,hy:1,fy:2.2,ty:3.9,r:.9},{g:c,hy:2.4,fy:3,ty:6,r:1.5}]);
});

/* III.43: one small flame, with four props leaned against it as if it needed them. Knock them away. */
X.S(91,{fog:.045,z:5.4,finDelay:2},function(K,D,sp,q,st,r){
  K.hall(4.2,14,-.8);K.asset(0,-5.6,1.5);var c=K.candle(st,0,1.1,-2.4,1),n0=0;q.c(r,.3,.45,1.1,0,.55,-2.4,'s');c.gl.scale.setScalar(3);
  sp.items.forEach(function(it,n){
    var a=(n-1.5)*.8,x=Math.sin(a)*2.2,z=-2.1+Math.cos(a)*1.2,g=q.G(),sd=x>0?-1:1;g.position.set(x,0,z);st.add(g);
    K.rope(g,K.v(0,0,0),K.v(-x*.8,2.2,(-2.4-z)*.8),.06,'w');q.b(g,.5,.08,.08,-x*.8,2.2,(-2.4-z)*.8,'w');
    K.strike(n,g,{hp:2,r:.7,hy:1.1,ty:2.6+(n%2)*.5},function(p){g.rotation.z=p*.15*sd},function(){n0++;c.gl.scale.setScalar(3+n0*1.5);D.tween(.5,function(e){g.rotation.z=sd*(.15+e*1.3);g.position.y=-e*.3})})});
});

/* III.44: the way Christ taught to ask: through the gate, along seven stones, into the cell with the door shut, out to a hill at night. */
X.S(92,{fog:.035,z:7,yawMax:.9,finDelay:2.4},function(K,D,sp,q,st,r){
  K.plain();var g0=gate(q,st,0,1,1.6,3.6),kg=D.glow(4);kg.position.y=4.6;g0.add(kg);
  var g1=q.G();g1.position.set(0,0,-5);st.add(g1);for(var i=0;i<7;i++)q.c(g1,.4,.45,.14,Math.sin(i*.9)*.7,.07,2.4-i*.8,'s');
  var cell=K.asset(0,-13,2.2),dr=q.b(st,1.3,2.6,.1,-1.6,1.3,-10.9,'w');
  var g3=q.G(),mg=D.glow(6);g3.position.set(0,0,-24);st.add(g3);q.s(g3,6,0,-1.5,0,'s',.5);for(i=0;i<14;i++)q.s(r,.08,-10+((i*37)%21),8+((i*53)%9),-40-((i*7)%6),'l');mg.position.set(3,9,-44);mg.material.opacity=0;st.add(mg);
  var path=[[[0,1.7,-.5]],[[0,1.7,-8]],[[0,1.7,-9.6]],[[3.6,1.7,-11],[3.6,1.7,-16],[0,3.2,-21]]];
  K.order([{g:g0,hy:2,ty:4.6,r:1.6,nr:.18},{g:g1,hy:.3,ty:1.4,r:1.6,nr:.18},{g:cell,hy:1,ty:3.2,r:1.2,nr:.16},{g:g3,hy:1.6,ty:3,r:2.4,nr:.2}],function(n,g,fin){
    K.go(path[n],n===3?4.5:2.8,function(){
      if(n===2){D.tween(.6,function(e){dr.position.x=-1.6+e*1.6},function(){K.shake=.4;D.tone(110,.3)});K.fogT=.08}
      if(n===3){K.fogT=.02;mg.material.opacity=1;K.pitchTo=.35}
      fin()})});
});

/* III.45: two pulpits. From one, fine sounds that drift off; from the other, plain words that set people alight. */
X.S(93,{fog:.04,z:6.5,pitch:.08},function(K,D,sp,q,st,r){
  K.hall(4.6,18,-2);var a=K.asset(-2.6,-4.5,1.5),b=K.asset(2.6,-4.5,1.5),cw=[];q.t(a,.5,.05,0,3.5,0,'g',1.5708);q.b(a,.5,.6,.04,0,2.2,.78,'g');
  for(var i=0;i<8;i++)cw.push(q.f(st,-2.4+(i%4)*1.6,-.4-Math.floor(i/4)*1.3,1.1,PI));
  K.choose([{g:a,hy:1.9,ty:4,r:.9},{g:b,hy:1.9,ty:4,r:.9}],function(n,g,fin){var k=0;D.tween(1.8,function(e){for(;k<e*8;k++){q.fl(st,cw[k].position.x,1.75,cw[k].position.z,.7);D.tone(400+k*40,.15)}},fin)},
    function(n,g,no){var N=[];for(var k=0;k<7;k++){var o=K.orb(.5);st.add(o);N.push(o)}
      D.tween(1.8,function(e){N.forEach(function(o,k){var u=Math.max(0,e*1.5-k*.07);o.position.set(-2.6+u*3+Math.sin(u*9+k)*.4,3.4-u*1.2,-4.5+u*4);o.visible=u>0&&u<1})},function(){N.forEach(function(o){st.remove(o)});no()})});
});

/* The summit. Three movements, each larger than the last:
   1. Light faith, hope and charity; each draws one lobe of a trinity knot across the sky.
   2. Nine fruits that John wrote across the peak of his drawing fall from the knot; catch them before they sink into the cloud.
   3. The knot comes down in white fire, like the bush that burned and was not consumed. Go into it. */
X.S(94,{fog:.02,z:8,pitch:.16,yawMax:1.5,finDelay:10,total:99,portBack:1.4},function(K,D,sp,q,st,r){
  var T=K.T,i,S3=Math.sqrt(3),glory=.15,heat=0,phase=1,cream=new T.Color(0xf3ead8);
  var oc=D.fpCleanup;D.fpCleanup=function(){if(oc)oc();if(window.CHANT&&CHANT.swell)CHANT.swell(0)};
  D.light(.3);
  function wait(s,fn){D.tween(s,function(){},fn)}
  function ring(y,z,big,col){var m=new T.Mesh(new T.RingGeometry(.92,1,72),new T.MeshBasicMaterial({color:col||0xffffff,transparent:true,side:T.DoubleSide,fog:false,depthWrite:false}));m.rotation.x=-Math.PI/2;m.position.set(0,y,z);st.add(m);
    D.tween(2.2,function(e){m.scale.setScalar(1+e*big);m.material.opacity=1-e},function(){st.remove(m)})}

  /* the peak: a round plateau, the mountain falling away under it, a sea of cloud, stars */
  q.c(r,9,11,4,0,-2,-2,'s');q.c(r,11,42,40,0,-24,-2,'s');
  var pl=new T.Mesh(new T.CircleGeometry(9,64),D.floor.material);pl.rotation.x=-Math.PI/2;pl.position.set(0,.01,-2);r.add(pl);
  var cl=q.G();cl.position.set(0,0,-2);st.add(cl);
  for(i=0;i<34;i++){var a=i*2.399,rr=15+((i*37)%28);q.s(cl,3.5+((i*13)%5),Math.sin(a)*rr,-6.5+((i*7)%3)*.6,Math.cos(a)*rr,'p',.32)}
  (function(){var ps=[];for(var k=0;k<700;k++){var u=k*2.399,v=Math.acos(1-((k*.6180339)%1)*.9);ps.push(Math.sin(v)*Math.cos(u)*90,Math.cos(v)*90-6,Math.sin(v)*Math.sin(u)*90)}
    var g=new T.BufferGeometry();g.setAttribute('position',new T.Float32BufferAttribute(ps,3));st.add(new T.Points(g,new T.PointsMaterial({color:0xffffff,size:2.2,sizeAttenuation:false,fog:false,transparent:true,opacity:.7})))})();

  /* the knot in the sky, built as three half-circles, each dim until its fire is lit */
  var kn=q.G(),KH=15,KZ=-11,R=3.4,lobes=[];kn.position.set(0,KH,KZ);st.add(kn);
  [[0,0,-120],[R,0,120],[R/2,-R*S3/2,0]].forEach(function(a){
    var m=new T.Mesh(new T.TorusGeometry(R,.17,10,64,Math.PI),new T.MeshBasicMaterial({color:0xffffff,transparent:true,opacity:.06,fog:false}));
    m.position.set(a[0]-R/2,a[1]+R*S3/6,0);m.rotation.z=a[2]*Math.PI/180;kn.add(m);lobes.push(m)});
  var halo=D.glow(16);halo.material.opacity=.08;halo.material.fog=false;kn.add(halo);

  /* sparks that dance round the knot in three rings, keeping one slow beat */
  var sparks=[];for(i=0;i<84;i++){var s=D.glow(1);s.material.fog=false;st.add(s);sparks.push({s:s,ring:i%3,a:i*2.399,tw:i*1.3,R:4.6+(i%3)*1.6+((i*13)%10)*.12,sz:.35+((i*7)%5)*.12})}
  K.ups.push(function(t,dt){
    var beat=.5+.5*Math.sin(t*2.2),c=kn.position,k;
    kn.scale.setScalar(kn.userData.sc=(kn.userData.sc||1)*0+((kn.userData.base||1)*(1+.025*beat)));
    halo.scale.setScalar(16*(1+glory*1.6)*(1+.06*beat));halo.material.opacity=Math.min(1,.08+glory*.7);
    for(k=0;k<sparks.length;k++){var u=sparks[k],dir=u.ring===1?-1:1,a2=u.a+dir*t*(.35+glory*.7),RR=u.R*(1+.14*Math.sin(t*2.2+u.tw))*(1+glory*.45)*(kn.userData.base||1),tilt=(u.ring-1)*.55;
      u.s.position.set(c.x+Math.cos(a2)*RR,c.y+Math.sin(a2)*RR*Math.sin(tilt)+Math.sin(t*2.2+u.a*3)*.5,c.z+Math.sin(a2)*RR*Math.cos(tilt));
      var tw=Math.abs(Math.sin(t*1.1+u.tw));u.s.material.opacity=(.12+.88*glory)*(.35+.65*tw);u.s.scale.setScalar(u.sz*(.7+.6*tw)*(1+glory*.6))}
    cl.rotation.y+=dt*(.01+glory*.03);
  });

  /* ── 1. the three fires ── */
  var lit=0,F=[['Faith','The intellect, emptied, now sees by the light it could not grasp.'],['Hope','The memory, emptied, now holds what it cannot picture.'],['Charity','The will, emptied of every lesser joy, now loves with all of itself.']];
  [[-3.4,-.8],[0,-4.2],[3.4,-.8]].forEach(function(p,n){
    q.c(st,.9,1.1,.5,p[0],.25,p[1],'s');var b=K.brazier(st,p[0],p[1],.4);b.position.y=.5;b.set(false);var on=0,tg=K.tag(F[n][0],b,3.6);
    var beam=K.shaft(p[0],9,p[1],.25,.9,17,0,0,0);
    K.hits(b,1,.15,3,.18,function(pp){if(!on){b.set(true);on=1}b.fl.scale.setScalar(.4+pp*2.4);b.gl.material.opacity=pp},function(){
      tg.visible=false;b.fl.scale.setScalar(2.8);lit++;K.shake=.5;D.tone(330+n*110,.6);D.tone(495+n*110,.6,.1,.05);D.burst(D.wpos(b),0xffffff,true);
      D.say(F[n][0],F[n][1],true);glory=.15+lit*.12;D.light(.3+lit*.12);
      D.tween(1.4,function(e){beam.material.opacity=e*.22;lobes[n].material.opacity=.06+e*.94});
      if(lit===3)endOne();
    },1.6);
  });
  function endOne(){
    wait(1.2,function(){
      K.shake=1.4;D.tone(196,1.2);D.tone(294,1.2,.05);D.tone(392,1.4,.1);ring(.3,-2,40);ring(-5.5,-2,70);
      D.say(sp.items[0][0],sp.items[0][1]);if(window.CHANT&&CHANT.swell)CHANT.swell(.5);
      glory=.55;K.pitchTo=.62;K.fogT=.012;
      wait(4.5,function(){K.pitchTo=.3;startTwo()});
    });
  }

  /* ── 2. the fruits of the summit ── */
  var FR=[['Peace','The war inside is over.'],['Joy','A joy that no longer depends on getting.'],['Gladness','It comes without being chased.'],['Delight','God is enjoyed, not used.'],['Wisdom','Knowing that came through unknowing.'],['Justice','Everything in its right place, at last.'],['Fortitude','Strength that was found in weakness.'],['Charity','Love with nothing held back.'],['Piety','A child at home with the Father.']];
  var pil=[],caught=0,next=0,falling=[];
  FR.forEach(function(f,n){var a=-2.15+n*(4.3/8),x=Math.sin(a)*7.2,z=-Math.cos(a)*7.2-2;q.c(st,.13,.17,2.4,x,1.2,z,'s');q.c(st,.36,.2,.22,x,2.5,z,'d');pil.push({x:x,z:z})});
  function drop(){
    if(next>=FR.length)return;var n=next++,o=K.orb(1.25),f={o:o,n:n,t:0,live:true};st.add(o);
    function aim(){f.sx=(Math.random()-.5)*2;f.ex=(Math.random()-.5)*9;f.ez=-5+Math.random()*6;f.d=7.5+Math.random()*2.5;f.t=0;f.ph=Math.random()*6.28}
    aim();f.tag=K.tag(FR[n][0],o,.8);falling.push(f);
    f.tgt=K.target(o,1,.17,function(t){
      if(!f.live)return;f.live=false;K.kill(t);f.tag.visible=false;var a0=o.position.clone(),P=pil[n];D.tone(600+n*45,.35);D.tone(900+n*45,.25,.08,.04);
      D.tween(.85,function(e){o.position.set(a0.x+(P.x-a0.x)*e,a0.y+(2.95-a0.y)*e+Math.sin(e*Math.PI)*2,a0.z+(P.z-a0.z)*e)},function(){
        var g=D.glow(5);g.position.set(P.x,2.95,P.z);st.add(g);K.shaft(P.x,9,P.z,.12,.5,13,0,0,.12);K.tag(FR[n][0],null,0,P.x,3.9,P.z);
        D.say(FR[n][0],FR[n][1],true);caught++;glory=Math.min(.85,.55+caught*.035);D.light(.66+caught*.03);
        if(caught===FR.length)endTwo();else if(next<FR.length)drop();
      });
    });
    f.aim=aim;
  }
  K.ups.push(function(t,dt){
    for(var k=0;k<falling.length;k++){var f=falling[k];if(!f.live)continue;f.t+=dt;var u=Math.min(1,f.t/f.d),c=kn.position;
      f.o.position.set(c.x+f.sx+(f.ex-f.sx-c.x)*u+Math.sin(f.t*1.6+f.ph)*1.2,c.y-2+(-1.5-c.y+2)*u,c.z+(f.ez-c.z)*u+Math.cos(f.t*1.3+f.ph)*.6);
      if(u>=1){D.tone(140,.25,0,.03);f.aim()}}
  });
  function startTwo(){phase=2;D.hint('Catch the fruits of the summit as they fall');drop();wait(1.6,drop);wait(3.2,drop)}
  function endTwo(){
    K.shake=1.2;ring(.3,-2,50);D.tone(220,1.4);D.tone(330,1.4,.05);D.tone(440,1.6,.1);
    D.say(sp.items[1][0],sp.items[1][1]);if(window.CHANT&&CHANT.swell)CHANT.swell(.8);glory=.85;
    wait(4.5,startThree);
  }

  /* ── 3. the living flame ── */
  var fc=q.G(),fires=[];fc.position.set(0,0,-4);st.add(fc);
  for(i=0;i<9;i++){var a3=i*.698,rr3=i===0?0:1.2+(i%2)*.5,fl=q.fl(fc,Math.sin(a3)*rr3,.1,Math.cos(a3)*rr3,i===0?4.5:2.2+(i%3)*.6);fl.setOn(false);fires.push(fl)}
  var core=D.glow(10);core.position.y=2;core.material.opacity=0;fc.add(core);var col=K.shaft(0,9,-4,.7,2.2,18,0,0,0);
  function startThree(){
    phase=3;D.hint('Go into the flame: tap or rub it, and keep going');
    var p0=kn.position.clone();
    D.tween(3.2,function(e){var s=e*e*(3-2*e);kn.position.set(0,p0.y+(4.6-p0.y)*s,p0.z+(-4-p0.z)*s);kn.userData.base=1-.35*s;K.pitchTo=.3-.2*s},function(){
      K.shake=1.6;D.tone(110,1.6);D.tone(165,1.6,.05);fires.forEach(function(f){f.setOn(true)});col.material.opacity=.18;core.material.opacity=.6;ring(.2,-4,30);
      var z0=K.pos.z,y0=K.pos.y,tg=K.tag('The living flame',kn,3.4);
      K.target(fc,2.6,.3,function(t,amt){
        heat=Math.min(1,heat+(amt==null?.085:Math.min(.04,amt/700)));if(amt==null)D.tone(300+heat*500,.15,0,.04);
        if(heat>=1){K.kill(t);tg.visible=false;endThree()}
      },2);
      K.ups.push(function(tt,dt){
        if(phase!==3)return;heat=Math.max(0,heat-dt*.025);
        K.pos.z=z0-heat*(z0-.6);K.pos.y=y0+heat*1.4;glory=.85+heat*.15;D.light(.9+heat*.1);
        core.material.opacity=.6+heat*.4;core.scale.setScalar(10+heat*14);col.material.opacity=.18+heat*.2;
        fires.forEach(function(f,k){f.scale.setScalar((k?2.4:4.6)*(1+heat*.8)*(.85+.25*Math.abs(Math.sin(tt*(5+k)+k))))});
        K.fog.color.copy(K.fogBase||(K.fogBase=K.fog.color.clone())).lerp(cream,heat*.35);D.sc.background.copy(K.fog.color);
        if(heat>.4)K.shake=Math.max(K.shake,heat*.12);
      });
    });
  }
  function endThree(){
    phase=4;D.say(sp.items[2][0],sp.items[2][1]);if(window.CHANT){if(CHANT.swell)CHANT.swell(1);if(CHANT.amen)CHANT.amen()}
    K.shake=2;ring(.2,-4,60);wait(.5,function(){ring(.2,-4,90)});wait(1,function(){ring(-5.5,-2,120)});
    D.tone(147,3);D.tone(220,3,.05);D.tone(294,3,.1);D.tone(370,3,.15);
    if(X.card)wait(1.4,function(){X.card('Only the honour and glory of God dwells on this mount','St John of the Cross, on his drawing of the summit',7000)});
    var fb=K.fog.color.clone(),p0=kn.position.clone();
    D.tween(6,function(e){var s=e*e*(3-2*e);K.fog.color.copy(fb).lerp(cream,s);D.sc.background.copy(K.fog.color);K.fog.density=.02*(1-s)+.002;
      kn.position.y=p0.y+s*11;kn.userData.base=.65+s*.9;K.pitchTo=.2+s*.45;glory=1;D.light(1)});
    K.finish();
  }
});
})();
