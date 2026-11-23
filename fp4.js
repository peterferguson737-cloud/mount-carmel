/* First-person scenes: Book Three, chapters 1 to 23. */
(function(){
'use strict';
var X=window.ASCENT;if(!X||!X.S)return;
var PI=Math.PI;
function gate(q,st,x,z,w,h){var g=q.G();g.position.set(x,0,z);st.add(g);q.b(g,.5,h,.5,-w,h/2,0,'s');q.b(g,.5,h,.5,w,h/2,0,'s');q.t(g,w,.25,0,h,0,'s',0,0,PI);return g}

/* III.1: a quay. A great anchor for hope, a heart for charity; carry each thing to its own. */
X.S(49,{fog:.035,z:6.5,pitch:.05},function(K,D,sp,q,st,r){
  K.ground(40,14,3);q.b(r,90,.04,60,0,.03,-34,'a');q.b(r,40,.5,.6,0,.25,-4,'s');K.asset(0,-8,1.8);
  var B=[['anchor',-2.5],['heart',2.5]].map(function(b){var g=q.G();g.position.set(b[1],0,-2.4);st.add(g);q.c(g,.8,.95,.7,0,.35,0,'s');var t=K.tok(b[0],2.2);t.position.y=2;g.add(t);return{g:g,hy:1.6,fy:1.8,ty:3.4,r:.9}});
  var T2=['scroll','fist','gem','cup'];K.sort(B,function(it,k){return K.tok(T2[k],1.1)});
});

/* III.2: a boat moored by four ropes. Cut them and it drifts out into the fog. */
X.S(50,{fog:.04,z:6,pitch:.02,finDelay:3},function(K,D,sp,q,st,r){
  K.ground(30,12,4);q.b(r,90,.04,60,0,.03,-32,'a');q.b(r,30,.5,.6,0,.25,-1.9,'s');var boat=K.asset(0,-5,2.2);
  sp.items.forEach(function(it,n){
    var x=-3.3+n*2.2;q.c(st,.16,.2,1,x,.5,-1.2,'w');var rope=K.rope(st,K.v(x,.9,-1.2),K.v(x*.45,1.2,-4.4),.05,'w'),g=q.G();g.position.set(x*.725,1.05,-2.8);st.add(g);q.t(g,.2,.03,0,0,0,'l',1.5708);
    K.strike(n,g,{hp:2,r:.6,ty:.8},function(p){rope.scale.x=rope.scale.z=1-p*.5},function(){rope.visible=false;g.visible=false})});
  K.onAll=function(){K.fogT=.07;D.tween(3,function(e){boat.position.z=-5-e*14;boat.rotation.y=e*.3})};
  K.ups.push(function(t){boat.position.y=Math.sin(t*1.2)*.08;boat.rotation.z=Math.sin(t*.9)*.03});
});

/* III.3: four fire-pits in the floor of a locked room. Slam the lids. Then a light comes through the barred door. */
X.S(51,{fog:.05,z:5.5,finDelay:2.6},function(K,D,sp,q,st,r){
  K.hall(4.2,15,-1);K.asset(0,-7,1.9);var dg=D.glow(5);dg.position.set(0,2,-6.6);dg.material.opacity=0;st.add(dg);
  [[-2.4,.4],[2.4,.4],[-1.6,-3],[1.6,-3]].forEach(function(p,n){
    var g=q.G();g.position.set(p[0],0,p[1]);st.add(g);q.t(g,.75,.1,0,.08,0,'d',1.5708);q.c(g,.7,.7,.04,0,.03,0,'n');
    var f=q.fl(g,0,.05,0,2.2),gl=D.glow(5),lid=q.G();gl.position.y=1;g.add(gl);lid.position.set(.75,.12,0);g.add(lid);q.c(lid,.78,.78,.08,-.75,0,0,'d');lid.rotation.z=-1.9;
    K.strike(n,g,{hp:2,regen:.22,r:.9,hy:.4,ty:2.4},function(pp){lid.rotation.z=-1.9*(1-pp);f.scale.setScalar(2.2*(1-pp*.7));gl.material.opacity=1-pp*.8},function(){lid.rotation.z=0;f.setOn(false);gl.visible=false})});
  K.onAll=function(){dg.material.opacity=1;var o=K.orb(1.6);st.add(o);D.tween(2,function(e){o.position.set(0,1.6,-7.4+e*4.5);dg.scale.setScalar(5+e*6)})};
});

/* III.4: the devil stands on a plank across three piles of stone. Knock the piles out. */
X.S(52,{fog:.05,z:5.6,finDelay:2.4},function(K,D,sp,q,st,r){
  K.hall(4.2,14,-.8);var top=q.G(),left=3;top.position.set(0,1.75,-2.6);st.add(top);q.b(top,5.4,.16,.9,0,0,0,'w');var dv=D.asset(sp.set);dv.scale.setScalar(1.2);dv.position.y=.08;top.add(dv);
  [-2,0,2].forEach(function(x,n){
    var g=q.G();g.position.set(x,0,-2.6);st.add(g);q.b(g,.9,.55,.9,0,.28,0,'s');q.b(g,.8,.55,.8,0,.83,0,'s',.3);q.b(g,.9,.55,.9,0,1.38,0,'s',.1);
    K.strike(n,g,{hp:2,r:.8,hy:.9,ty:2.4,rev:1},function(p){g.rotation.z=p*.12},function(){
      g.visible=false;left--;var y0=top.position.y;D.tween(.5,function(e){top.rotation.z=left?(1-n)*.12:0;top.position.y=y0-e*(left?.25:1.2)})})});
  K.onAll=function(){var sh=q.b(st,6,5,.2,0,7.5,-1.4,'d');D.tween(.8,function(e){sh.position.y=7.5-e*5},function(){K.shake=.8;D.tone(70,.5)})};
});

/* III.5: a cistern leaking through three cracks. Plug them, and the water rises. */
X.S(53,{fog:.04,z:5.6,pitch:-.02,finDelay:2},function(K,D,sp,q,st,r){
  K.court(5.5,16,-2);var c=q.G(),lv=0;c.position.set(0,0,-3);st.add(c);q.c(c,2.4,2.4,1.3,0,.65,0,'s');q.t(c,2.4,.14,0,1.3,0,'s',1.5708);var wa=q.c(c,2.25,2.25,.04,0,.5,0,'a');K.asset(0,-7.5,1.4);
  sp.items.forEach(function(it,n){
    var a=(n-1)*.75,g=q.G();g.position.set(Math.sin(a)*2.42,.55,Math.cos(a)*2.42);g.rotation.y=a;c.add(g);
    q.b(g,.08,.7,.05,0,0,0,'n',0,.3);q.b(g,.06,.4,.05,.12,.1,0,'n',0,-.5);var jet=q.c(g,.07,.04,1.3,0,-.2,.55,'a',0,1.1),pud=q.c(g,.6,.6,.02,0,-.53,1.1,'a');
    K.strike(n,g,{hp:3,regen:.25,r:.75,ty:1.4},function(p){jet.scale.set(1-p*.8,1,1-p*.8)},function(){jet.visible=false;pud.visible=false;q.s(g,.2,0,0,.02,'c',1,1,.4);lv++})});
  K.ups.push(function(t,dt){wa.position.y+=((.5+lv*.24)-wa.position.y)*Math.min(1,dt*2)});
});

/* III.6: an olive tree at night with four lamps hung in it. Send a spark to each. */
X.S(54,{fog:.035,z:6.5,pitch:.12,finDelay:2},function(K,D,sp,q,st,r){
  K.plain();K.asset(0,-6.5,2);q.c(r,.35,.5,3,0,1.5,-3.5,'w');[[-1.8,.6],[1.8,.5],[-.8,-.5],[.9,-.6]].forEach(function(b){q.c(r,.1,.16,2.6,b[0]*.55,3.6,-3.5+b[1],'w',-b[0]*.5);q.s(r,1.3,b[0]*1.1,4.8,-3.5+b[1],'d',.6)});
  sp.items.forEach(function(it,n){
    var x=-2.7+n*1.8,y=2.6+(n%2)*.5,z=-3+((n*7)%3)*.4,g=q.G();g.position.set(x,y,z);st.add(g);q.c(g,.015,.015,1.4,0,.9,0,'d');q.c(g,.26,.14,.22,0,0,0,'c');q.t(g,.26,.03,0,.12,0,'d',1.5708);
    var f=q.fl(g,0,.1,0,.9),gl=D.glow(4);gl.position.y=.5;g.add(gl);f.setOn(false);gl.visible=false;
    K.ups.push(function(t){g.rotation.z=Math.sin(t*1.1+n)*.12});
    K.tap(n,g,{r:.65,ty:.9},function(fin){var s=K.orb(.7),a=K.pos.clone();st.add(s);D.tween(.6,function(e){s.position.set(a.x+(x-a.x)*e,a.y-.4+(y+.6-a.y)*e,a.z+(z-a.z)*e)},function(){st.remove(s);f.setOn(true);gl.visible=true;fin()})})});
});

/* III.7: a kneeling soul tied by three golden cords to a vision, a word and a consolation kept on shelves. */
X.S(55,{fog:.05,z:5.2,finDelay:2.4},function(K,D,sp,q,st,r){
  K.hall(4,13,-.5);K.asset(0,-5,1.4,null,2.2);var fg=q.f(st,0,-1.6,1.4,0);fg.rotation.x=.25;var hg=D.glow(3),cut=0;hg.position.set(0,2.4,-1.6);hg.material.opacity=.1;st.add(hg);
  [[-3,2,-2.6,'eye'],[0,3.2,-5.4,'scroll'],[3,2,-2.6,'cup']].forEach(function(p,n){
    q.b(r,.9,.1,.6,p[0],p[1]-.4,p[2],'w');var t=K.tok(p[3],1.1);t.position.set(p[0],p[1]+.2,p[2]);st.add(t);
    var rope=K.rope(st,K.v(0,1.5,-1.6),K.v(p[0],p[1],p[2]),.035,'g'),g=q.G();g.position.set(p[0]*.5,(1.5+p[1])/2,(-1.6+p[2])/2);st.add(g);q.t(g,.18,.03,0,0,0,'l');
    K.strike(n,g,{hp:2,regen:.15,r:.55,ty:.7},function(pp){rope.scale.x=rope.scale.z=1-pp*.6},function(){rope.visible=false;g.visible=false;cut++;hg.material.opacity=.1+.3*cut;hg.scale.setScalar(3+2*cut)})});
  K.onAll=function(){D.tween(1.2,function(e){fg.rotation.x=.25*(1-e)})};
});

/* III.8: a crossroads in fog. A bright road, a dark road, and the way straight on. */
X.S(56,{fog:.07,z:7,yawMax:1},function(K,D,sp,q,st,r){
  K.plain(0);K.asset(0,2.2,1.6);
  var a=K.plinth('sun',-3,-2,1.3),b=K.plinth('mask',3,-2,1.3),c=gate(q,st,0,-8,1.3,3.4);
  function wrong(sd){return function(n,g,no){K.go([[sd*3,1.7,.5],[sd*6.5,1.7,-7]],2.6,function(){K.shake=.6;D.tone(120,.3);K.go([[sd*3,1.7,.5],[0,1.7,7]],2.6,no)})}}
  K.choose([{g:a,hy:1.4,ty:3,r:.8},{g:b,hy:1.4,ty:3,r:.8},{g:c,hy:2,ty:4.3,r:1.6,nr:.18}],function(n,g,fin){K.fogT=.02;K.go([[0,1.7,-11]],4,fin)},
    function(n,g,no){wrong(n?1:-1)(n,g,no)});
});

/* III.9: a peacock between mirrors, three lit eyes swaying in its tail. */
X.S(57,{fog:.045,z:5.4,finDelay:2},function(K,D,sp,q,st,r){
  K.hall(4.2,14,-.8);K.asset(0,-3,1.7);[-3.6,3.6].forEach(function(x){K.panel(st,x,2.2,-2,1.6,2.6,'a',x<0?1.5708:-1.5708)});
  sp.items.forEach(function(it,n){
    var a=(n-1)*.7,piv=q.G(),g=q.G(),gl=D.glow(4);piv.position.set(0,1,-3.4);st.add(piv);g.position.set(Math.sin(a)*2.4,Math.cos(a)*2.4,0);piv.add(g);K.rope(piv,K.v(0,0,0),K.v(Math.sin(a)*2.2,Math.cos(a)*2.2,0),.03,'d');
    q.s(g,.5,0,0,0,'d',1.2,1,.2);q.s(g,.26,0,0,.08,'l',1,1,.3);g.add(gl);
    K.ups.push(function(t){piv.rotation.z=Math.sin(t*1.4+n*2)*.14});
    K.strike(n,g,{hp:2,regen:.15,r:.6,ty:.9},function(p){gl.material.opacity=1-p*.7},function(){gl.visible=false;D.tween(.6,function(e){g.scale.setScalar(1-e*.7)})})});
});

/* III.10: a figure like an angel of light. A soft seat in front of it, or a heavy door to shut on it. */
X.S(58,{fog:.045,z:5.6},function(K,D,sp,q,st,r){
  K.hall(4,14,-.8);K.asset(0,-4,1.8);var ag=D.glow(9);ag.position.set(0,2.4,-4);st.add(ag);
  var seat=q.G();seat.position.set(-1.9,0,.2);st.add(seat);q.b(seat,1.1,.4,.9,0,.2,0,'w');q.s(seat,.55,0,.5,0,'p',.35);q.b(seat,1.1,.9,.12,0,.85,-.4,'w');
  var door=q.G(),leaf=q.G();door.position.set(2.4,0,-2);st.add(door);q.b(door,.2,3.6,.3,0,1.8,0,'s');door.add(leaf);q.b(leaf,4.6,3.4,.12,-2.3,1.7,0,'w');q.t(leaf,.12,.03,-4.2,1.5,.1,'g');leaf.rotation.y=-1.7;
  K.choose([{g:seat,hy:.6,ty:1.9,r:.8},{g:door,hy:1.6,ty:3.9,r:.9}],function(n,g,fin){D.tween(.7,function(e){leaf.rotation.y=-1.7*(1-e)},function(){K.shake=.8;D.tone(80,.4);ag.visible=false;K.candle(st,-.6,0,-.6,1);fin()})},
    function(n,g,no){K.fogT=.3;D.tween(1.6,function(e){ag.scale.setScalar(9+Math.sin(e*PI)*20)},function(){K.fogT=.045;no()})});
});

/* III.11: a kite on a hilltop, held down by three pegged strings. */
X.S(59,{fog:.03,z:6.5,pitch:.25,finDelay:3},function(K,D,sp,q,st,r){
  K.plain();var kt=K.asset(0,-4,2,null,4.2);
  sp.items.forEach(function(it,n){
    var x=-2.4+n*2.4,z=-1.5-(n%2);q.c(r,.08,.05,.5,x,.25,z,'w');var rope=K.rope(st,K.v(x,.5,z),K.v(0,5.2,-4),.03,'p'),g=q.G();g.position.set(x*.6,2.38,z+(-4-z)*.4);st.add(g);q.t(g,.2,.03,0,0,0,'l');
    K.strike(n,g,{hp:2,regen:.15,r:.6,ty:.8},function(p){rope.scale.x=rope.scale.z=1-p*.6},function(){rope.visible=false;g.visible=false})});
  K.ups.push(function(t){if(!K.fin){kt.position.x=Math.sin(t*1.3)*.25;kt.rotation.z=Math.sin(t*1.7)*.08}});
  K.onAll=function(){K.pitchTo=.6;D.tween(3,function(e){kt.position.y=4.2+e*e*14;kt.position.z=-4-e*6})};
});

/* III.12: the king's court. Look to the chattering courtiers, or to the king. */
X.S(60,{fog:.04,z:7,yawMax:.9},function(K,D,sp,q,st,r){
  K.hall(4.6,26,-5);var th=K.asset(0,-13,2.2),tg=D.glow(8);tg.position.set(0,3.4,-13);tg.material.opacity=.25;st.add(tg);q.b(r,2,.03,18,0,.02,-3,'c');
  var co=q.G();co.position.set(-2.6,0,-1.5);st.add(co);for(var i=0;i<5;i++)q.f(co,(i%2)*.7,-i*.9,1.25,1.2+(i%2)*.6);
  for(i=0;i<4;i++)q.f(st,2.8-(i%2)*.5,-2-i*1.1,1.25,-1.3);
  K.choose([{g:co,hy:1,ty:2.6,r:1.3},{g:th,hy:1,ty:3.2,r:1.2,nr:.16}],function(n,g,fin){tg.material.opacity=1;tg.scale.setScalar(14);K.go([[0,1.7,-8.5]],4,fin)},
    function(n,g,no){K.yawTo=.9;tg.material.opacity=.05;D.tween(1.8,function(){},function(){K.yawTo=0;tg.material.opacity=.25;no()})});
});

/* III.13: a threshing floor. The wind through the arch takes what should go; the basket keeps the grain. */
X.S(61,{fog:.035,z:6,pitch:.04},function(K,D,sp,q,st,r){
  K.court(5.5,16,-2);K.asset(0,-5.5,1.6);
  var a=gate(q,st,-2.8,-2.6,1,3),ch=[];for(var i=0;i<10;i++)ch.push(q.s(a,.05,0,0,0,'p'));
  var b=q.G();b.position.set(2.6,0,-2.4);st.add(b);q.c(b,.8,.55,.8,0,.4,0,'w');q.t(b,.8,.07,0,.8,0,'w',1.5708);q.s(b,.72,0,.72,0,'g',.3);
  K.sort([{g:a,hy:1.6,fy:1.6,ty:3.9,r:1.1},{g:b,hy:.7,fy:.9,ty:2,r:.9}]);
  K.ups.push(function(t){ch.forEach(function(o,k){var u=(t*.4+k*.1)%1;o.position.set(Math.sin(k*2.1)*.6,.6+Math.cos(k*1.3)*.5+u*1.2,1-u*5)})});
});

/* III.14: a little lamp-lit niche for what is worth recalling, and a stream to carry the rest away. */
X.S(62,{fog:.04,z:5.6},function(K,D,sp,q,st,r){
  K.hall(4.2,14,-.8);K.asset(0,-5.4,1.5);
  var a=K.niche(-2.6,-2.8,.45,'d');K.candle(a,0,.22,.1,1);
  var b=q.G();b.position.set(2.6,0,-2.4);st.add(b);q.b(b,1.6,.06,7,0,.04,0,'a');q.b(b,.2,.3,7,-.9,.15,0,'s');q.b(b,.2,.3,7,.9,.15,0,'s');
  K.sort([{g:a,hy:1.3,fy:1.2,ty:3.5,r:1},{g:b,hy:.3,fy:.25,ty:1.5,r:1,got:function(c){D.tween(1.6,function(e){c.position.z=-2.4-e*5},function(){st.remove(c)})}}]);
});

/* III.15: three images hung like doors. Push each open and go through to what it shows. */
X.S(63,{fog:.045,z:5.6,finDelay:2},function(K,D,sp,q,st,r){
  K.hall(4.4,14,-.8);K.asset(0,-6,1.3);
  [-2.7,0,2.7].forEach(function(x,n){
    var g=q.G(),leaf=q.G(),bg=D.glow(6);g.position.set(x,0,-2.6+Math.abs(x)*.3);st.add(g);q.b(g,.16,3,.2,-.75,1.5,0,'s');q.b(g,.16,3,.2,.75,1.5,0,'s');q.b(g,1.66,.16,.2,0,3.05,0,'s');
    leaf.position.set(-.67,0,0);g.add(leaf);K.panel(leaf,.67,1.55,0,1.25,2.7,n===1?'a':'p');
    if(n===0){q.c(leaf,.22,.22,.02,.67,2.1,.07,'d',0,1.5708);q.b(leaf,.5,.9,.02,.67,1.2,.07,'d')}else if(n===2)q.f(leaf,.67,.08,1.1,0);
    bg.position.set(0,1.6,-.6);bg.material.opacity=0;g.add(bg);
    K.strike(n,g,{hp:2,r:.9,hy:1.5,ty:3.5,rev:1},function(p){leaf.rotation.y=-p*.5},function(){bg.material.opacity=1;D.tween(.6,function(e){leaf.rotation.y=-.5-e*1.3})})});
});

/* III.16: four weather-vanes, each carrying a flame, all pointing away. Swing them round to the fire. */
X.S(64,{fog:.04,z:4.8,finDelay:2},function(K,D,sp,q,st,r){
  K.rotunda(6.4,8);var hb=K.brazier(st,0,-2.5,1),n0=0;hb.gl.scale.setScalar(3);K.asset(0,-5.6,1.3);
  [[-3,-.6],[-1.6,-4.4],[1.6,-4.4],[3,-.6]].forEach(function(p,n){
    var g=q.G(),v=q.G();g.position.set(p[0],0,p[1]);st.add(g);q.c(g,.06,.1,2.2,0,1.1,0,'w');v.position.y=2.3;g.add(v);q.b(v,1.2,.08,.08,0,0,0,'g');q.k(v,.16,.4,.7,0,0,'g',-1.5708);q.b(v,.3,.3,.03,-.55,0,0,'g');q.fl(v,0,.05,0,.8);
    var home=Math.atan2(2.5+p[1],-p[0]),away=home+PI;v.rotation.y=away;
    K.strike(n,g,{hp:2,regen:.2,r:.8,hy:2.2,ty:3.2},function(pp){v.rotation.y=away-pp*PI},function(){v.rotation.y=home;n0++;hb.fl.scale.setScalar(1+n0*.6);hb.gl.scale.setScalar(3+n0*2.5)})});
});

/* III.17: six terraces of goods, climbed one after another toward the sunburst. */
X.S(65,{fog:.03,z:7,pitch:.14,yawMax:.9,finDelay:2},function(K,D,sp,q,st,r){
  K.plain();var P=[],T2=['coin','mirror','bread','scales','star','sun'];
  sp.items.forEach(function(it,n){var x=(n%2?1:-1)*1.8,y=.4+n*.8,z=-1-n*3.6;q.b(r,5,y,3.4,x,y/2,z,'s');var g=K.plinth(T2[n],x+(n%2?1.3:-1.3),z-.6,1.1);g.position.y=y;P.push({g:g,hy:1.4,ty:3,r:.8,p:[x,y+1.7,z+1.1]})});
  var L=P[5].p;K.asset(0,L[2]-7,2.4,null,L[1]-1.2);q.s(r,5,0,L[1]-4.2,L[2]-7,'s',.6);var gl=D.glow(10);gl.position.set(0,L[1]+3,L[2]-7);gl.material.opacity=.1;st.add(gl);
  K.order(P,function(n,g,fin){K.go([P[n].p],2.2,function(){gl.material.opacity=.1+.9*(n+1)/6;fin()})});
});

/* III.18: a counting house. A heart on a plinth for what is given, a strongbox for the rest. */
X.S(66,{fog:.045,z:5.4},function(K,D,sp,q,st,r){
  K.hall(4.2,14,-.8);K.asset(0,-5.4,1.5);
  var a=K.plinth('heart',-2.4,-2.4,1.3),b=K.chest(st,2.4,-2.4,1.7,-.3);
  K.sort([{g:a,hy:1.4,fy:2.3,ty:3.3,r:.8},{g:b,hy:.5,fy:1.3,ty:2.2,r:.9}],function(){return K.tok('coin',1.1)});
});

/* III.19: four terraces down from a height toward the golden calf, the light going as you descend. */
X.S(67,{fog:.03,z:7,pitch:-.12,yawMax:.9,finDelay:2},function(K,D,sp,q,st,r){
  K.plain(0);var H=7.2,P=[];K.pos.y=H+1.7;q.b(r,7,H,6,0,H/2,7,'s');
  sp.items.forEach(function(it,n){
    var y=H-(n+1)*1.8,z=2-n*4.4,x=(n%2?1:-1)*1.2;q.b(r,6,Math.max(.1,y),4.2,x,Math.max(.05,y/2),z,'d');
    var g=q.G();g.position.set(x,y,z-1.2);st.add(g);q.c(g,.12,.16,1,0,.5,0,'s');P.push({g:g,hy:1,ty:1.9,r:.9,lamp:q.s(g,.2,0,1.15,0,'l'),p:[x,y+1.7,z+.6]})});
  K.asset(0,-18,2.6);var cg=D.glow(9);cg.position.set(0,2.5,-18);st.add(cg);
  K.order(P,function(n,g,fin){K.go([P[n].p],2.2,function(){K.fogT=.03+(n+1)*.012;P[n].lamp.visible=false;fin();D.light(.8*(1-(n+1)/4)+.05)})});
});

/* III.20: four shut chests in a courtyard. Open each and let what is in it go. */
X.S(68,{fog:.04,z:6,finDelay:2},function(K,D,sp,q,st,r){
  K.court(5.5,16,-2);K.asset(0,-5.5,1.8);
  sp.items.forEach(function(it,n){
    var c=K.chest(st,-3+n*2,-1.6-(n%2)*1.2,1.2,(1.5-n)*.2);
    K.tap(n,c,{hy:.5,ty:1.7,r:.8},function(fin){var o=K.orb(1);o.position.y=.5;c.add(o);D.tween(1.1,function(e){c.lid.rotation.x=-Math.min(1,e*2)*1.9;o.position.y=.5+e*e*6},function(){c.remove(o);fin()})})});
});

/* III.21: a dressing room. The mirror, or the window. */
X.S(69,{fog:.045,z:5.2},function(K,D,sp,q,st,r){
  K.hall(4,13,-.5);var mi=K.asset(-2,-2.4,1.6);mi.rotation.y=.4;
  var w=q.G();w.position.set(2,0,-4.5);st.add(w);q.b(w,1.6,3,.05,0,2.4,0,'l');q.b(w,.14,3.2,.2,-.87,2.4,.05,'s');q.b(w,.14,3.2,.2,.87,2.4,.05,'s');q.t(w,.87,.12,0,4,.05,'s',0,0,PI);var ray=K.shaft(2,1.6,-2.4,.7,1.6,5.2,-.95,0,.04);
  K.choose([{g:mi,hy:1.2,ty:3,r:.8},{g:w,hy:2.4,ty:4.8,r:1}],function(n,g,fin){ray.material.opacity=.22;K.fogT=.02;fin()},
    function(n,g,no){K.shake=.7;D.tone(900,.08);D.tone(700,.1,.06);D.burst(D.wpos(mi),0xffffff,true);D.tween(.8,function(e){mi.rotation.z=e*.25;mi.position.y=-e*.3},no)});
});

/* III.22: six brimming cups on a banquet table. Tip each one out. */
X.S(70,{fog:.045,z:5.6,pitch:-.04,finDelay:2},function(K,D,sp,q,st,r){
  K.hall(4.4,15,-1);q.b(r,7,.14,1.5,0,1,-1.6,'w');[-3,3].forEach(function(x){q.b(r,.16,1,1.3,x,.5,-1.6,'w')});K.asset(0,-5.5,1.8);
  sp.items.forEach(function(it,n){
    var g=q.G();g.position.set(-2.9+n*1.16,1.07,-1.8+(n%2)*.4);st.add(g);q.c(g,.2,.08,.34,0,.42,0,'g');q.c(g,.03,.03,.24,0,.14,0,'g');q.c(g,.14,.14,.03,0,.015,0,'g');var f=q.fl(g,0,.5,0,.9);
    K.strike(n,g,{hp:1,r:.5,hy:.35,ty:1.25+(n%2)*.5},null,function(){f.setOn(false);D.tween(.4,function(e){g.rotation.z=(n<3?1:-1)*e*1.5})})});
});

/* III.23: a round temple with four bronze doors. Push each open and the light comes in. */
X.S(71,{fog:.045,z:4.6,finDelay:2},function(K,D,sp,q,st,r){
  K.rotunda(6.2,8);K.asset(0,-2.2,.9);var op=0;
  sp.items.forEach(function(it,n){
    var a=(n-1.5)*.52,g=q.G(),L=q.G(),R=q.G();g.position.set(Math.sin(a)*5.6,0,-Math.cos(a)*5.6+.4);g.rotation.y=-a;st.add(g);
    q.b(g,.2,3.4,.3,-.8,1.7,0,'s');q.b(g,.2,3.4,.3,.8,1.7,0,'s');q.t(g,.8,.14,0,3.4,0,'s',0,0,PI);q.b(g,1.5,3.6,.04,0,1.8,-.15,'l');
    L.position.set(-.7,0,0);R.position.set(.7,0,0);g.add(L);g.add(R);q.b(L,.7,3.3,.1,.35,1.65,0,'g');q.b(R,.7,3.3,.1,-.35,1.65,0,'g');
    K.strike(n,g,{hp:2,r:.9,hy:1.6,ty:4},function(p){L.rotation.y=-p*.6;R.rotation.y=p*.6},function(){op++;K.fogT=.045-op*.008;D.tween(.6,function(e){L.rotation.y=-.6-e*1.2;R.rotation.y=.6+e*1.2})})});
});
})();
