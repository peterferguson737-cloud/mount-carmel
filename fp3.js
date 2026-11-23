/* First-person scenes: Book Two, chapters 2 to 32. */
(function(){
'use strict';
var X=window.ASCENT;if(!X||!X.S)return;
var PI=Math.PI;
function easel(K,q,st,x,z,ry,m){var g=q.G();g.position.set(x,0,z);g.rotation.y=ry;st.add(g);q.b(g,.08,1.9,.08,-.4,.95,0,'w',0,.12);q.b(g,.08,1.9,.08,.4,.95,0,'w',0,-.12);q.b(g,.08,1.7,.08,0,.85,-.4,'w',0,0,.35);g.pic=K.panel(g,0,1.5,.08,.9,1.1,m);return g}
function gate(q,st,x,z,w,h){var g=q.G();g.position.set(x,0,z);st.add(g);q.b(g,.5,h,.5,-w,h/2,0,'s');q.b(g,.5,h,.5,w,h/2,0,'s');q.t(g,w,.25,0,h,0,'s',0,0,PI);return g}

/* II.2: a terrace at night. Put out the dusk beacon, the reading lamp and your own lantern; the moon is what is left. */
X.S(18,{fog:.03,z:7,pitch:.08,finDelay:3},function(K,D,sp,q,st,r){
  K.court(6,22,-4);K.asset(0,-20,3,null,5);var mg=D.glow(14);mg.position.set(0,11,-20);mg.material.opacity=.1;st.add(mg);
  var a=K.brazier(st,-3.2,-10,2.4);K.strike(0,a,{hp:2,r:1,hy:1.6,ty:3.6},function(p){a.fl.scale.setScalar(2.4*(1-p*.6))},function(){a.set(false)});
  var desk=q.G();desk.position.set(2.8,0,-3);st.add(desk);q.b(desk,1.6,.1,.9,0,.9,0,'w');[-.7,.7].forEach(function(x){q.b(desk,.1,.9,.8,x,.45,0,'w')});q.b(desk,.6,.06,.45,-.25,.98,0,'p');var c=K.candle(desk,.5,.95,0,1);
  K.strike(1,desk,{hp:2,regen:.12,r:.8,hy:1.3,ty:2.4},null,function(){c.set(false)});
  var lan=q.G();lan.position.set(-.7,0,2.2);st.add(lan);var lb=q.b(lan,.4,.5,.4,0,.3,0,'l');q.py(lan,.36,.25,0,.68,0,'d');q.t(lan,.16,.03,0,.86,0,'d');var lg=D.glow(4);lg.position.y=.4;lan.add(lg);
  K.strike(2,lan,{hp:3,regen:.2,r:.6,hy:.4,ty:1.5},function(p){lg.material.opacity=1-p*.7},function(){lg.visible=false;lb.visible=false;q.b(lan,.4,.5,.4,0,.3,0,'d')});
  K.onAll=function(){mg.material.opacity=1;K.pitchTo=.45;K.fogT=.012};
});

/* II.3: a man born blind, and three things offered him. */
X.S(19,{fog:.045,z:5.5},function(K,D,sp,q,st,r){
  K.hall(4.2,14,-.5);K.asset(0,-3,1.5);
  var ea=easel(K,q,st,-2.3,-.8,.5,'p');q.c(ea.pic,.3,.3,.02,0,0,.06,'d',0,1.5708);
  var bw=q.G();bw.position.set(0,0,.2);st.add(bw);q.c(bw,.12,.3,.8,0,.4,0,'w');q.c(bw,.45,.25,.22,0,.9,0,'c');q.c(bw,.4,.4,.02,0,1,0,'n');
  var gd=q.f(st,2.3,-.8,1.5,-.6);q.k(gd,.12,.4,.25,1.25,.3,'p',0,1.5708);
  K.choose([{g:ea,hy:1.5,ty:2.8},{g:bw,hy:.9,ty:1.8,r:.6},{g:gd,hy:.8,ty:2.6}],function(n,g,fin){
    var gl=D.glow(5),k=0;gl.position.set(0,2.6,-3);st.add(gl);
    D.tween(1.2,function(e){for(;k<e*6;k++){var o=K.orb(.4);o.position.set(2.1-k*.36,1.9+Math.sin(k)*.15,-.9-k*.36);st.add(o)}},fin)},
   function(n,g,no){if(n===0)D.tween(.6,function(e){ea.pic.rotation.x=-e*1.5;ea.pic.position.y=1.5-e*.9},no);else D.tween(.5,function(e){bw.rotation.z=e*1.4},no)});
});

/* II.4: a fork in a ravine. A guide points one way; a dim glimmer drifts the other. */
X.S(20,{fog:.06,z:7,yawMax:1},function(K,D,sp,q,st,r){
  K.plain(0);q.b(r,3,7,16,0,3.5,-13,'d');q.b(r,4,8,30,-9.5,4,-8,'s',.25);q.b(r,4,8,30,9.5,4,-8,'s',-.25);
  var gt=gate(q,st,-5,-17,1,3.4),gg=D.glow(8);gg.position.y=2;gg.material.opacity=.15;gt.add(gg);q.c(r,2,2,.04,5,.03,-15,'n');
  var gl=q.G();gl.position.set(2.4,1.5,-4);st.add(gl);gl.add(D.glow(2.2));q.s(gl,.1,0,0,0,'l');
  var gd=K.asset(-2.2,-1.5,1.5);gd.rotation.y=.5;
  K.choose([{g:gl,ty:.9,r:.7},{g:gd,hy:.9,ty:2.9,r:.7}],function(n,g,fin){gg.material.opacity=1;K.go([[-2.5,1.7,-4],[-5,1.7,-13.5]],4,fin)},
    function(n,g,no){K.fogT=.16;K.go([[2.5,1.7,-2],[4.6,1.7,-12]],3.2,function(){K.shake=1;D.tone(90,.5);gl.visible=false;K.go([[2.5,1.7,-2],[0,1.7,7]],3,function(){K.fogT=.06;no()})})});
  K.ups.push(function(t){gl.position.y=1.5+Math.sin(t*2)*.2;gl.position.x=2.4+Math.sin(t*.9)*.3});
});

/* II.5: a tall window with the sun behind it, and three smears on the glass. */
X.S(21,{fog:.045,z:4.5,pitch:.12,finDelay:2},function(K,D,sp,q,st,r){
  K.hall(4,12,0);var w=q.G(),lit=0;w.position.set(0,0,-5.85);st.add(w);
  q.b(w,2.4,4.2,.05,0,2.9,0,'p');q.b(w,.14,4.4,.2,-1.27,2.9,.05,'s');q.b(w,.14,4.4,.2,1.27,2.9,.05,'s');q.b(w,.1,4.2,.12,0,2.9,.06,'d');q.b(w,2.4,.1,.12,0,2.4,.06,'d');q.b(w,2.4,.1,.12,0,3.8,.06,'d');q.t(w,1.27,.12,0,5,.05,'s',0,0,PI);
  var ray=K.shaft(0,2,-2.65,1.1,2.4,7.4,-1,0,.03),gl=D.glow(3);gl.position.set(0,3,-5.6);gl.material.opacity=.1;st.add(gl);
  [[-.6,3.3],[.55,2.9],[-.1,1.6]].forEach(function(p,n){
    var g=q.G();g.position.set(p[0],p[1],-5.72);st.add(g);q.s(g,.55,0,0,0,'d',1,1,.12);q.s(g,.3,.35,.2,0,'d',1,1,.12);
    K.wipe(n,g,{r:.7,ty:.8},function(){lit++;ray.material.opacity=.03+.09*lit;gl.material.opacity=.1+.3*lit;gl.scale.setScalar(3+4*lit)})});
  K.onAll=function(){q.b(w,2.3,4.1,.04,0,2.9,.03,'l')};
});

/* II.6: three niches for faith, hope and charity. Each faculty comes to hand; carry it to its own. */
X.S(22,{fog:.04,z:5.5},function(K,D,sp,q,st,r){
  K.hall(4.4,15,-1);K.asset(0,-7,1.6);
  var B=[['shield',-2.7,-2.6],['anchor',0,-4.4],['heart',2.7,-2.6]].map(function(b){K.niche(b[1],b[2]-.7,-b[1]*.25);return{g:K.plinth(b[0],b[1],b[2],1.25),hy:1.4,fy:2.2,ty:3.2,r:.9}});
  var T2=['eye','scroll','fist'];K.sort(B,function(it,k){return K.tok(T2[k],1.1)});
});

/* II.7: the narrow gate in a wall, and three loads you might carry through it. */
X.S(23,{fog:.04,z:7,yawMax:.9},function(K,D,sp,q,st,r){
  K.plain(0);K.asset(0,-5,1.7);q.b(r,14,5.4,.6,-9.3,2.7,-5,'s');q.b(r,14,5.4,.6,9.3,2.7,-5,'s');
  var gl=D.glow(9);gl.position.set(0,2,-12);gl.material.opacity=.2;st.add(gl);
  var ch=K.chest(st,-2.2,2.2,1.3,.4);q.s(ch,.2,-.3,.75,0,'g');q.s(ch,.2,.1,.8,0,'g');q.s(ch,.2,.35,.72,.1,'g');
  var ob=q.G();ob.position.set(0,0,1.2);st.add(ob);q.c(ob,.5,.6,.3,0,.15,0,'w');q.s(ob,.6,0,.95,0,'l');var og=D.glow(4);og.position.y=1;ob.add(og);
  var cr=q.G();cr.position.set(2.2,0,2.2);cr.rotation.z=-.25;st.add(cr);q.b(cr,.12,1.5,.12,0,.75,0,'w');q.b(cr,.8,.12,.12,0,1.1,0,'w');
  K.choose([{g:ch,hy:.5,ty:1.6},{g:ob,hy:.9,ty:2.1},{g:cr,hy:.8,ty:2}],function(n,g,fin){gl.material.opacity=1;K.go([[0,1.7,-3.2],[0,1.7,-9]],3.6,fin)},
    function(n,g,no){K.go([[0,1.7,-2.9]],2,function(){K.shake=1.2;D.tone(80,.4);K.go([[0,1.7,7]],2,no)})});
});

/* II.8: a cave mouth facing the sun. Hold up the finest image, the clearest idea, or neither. */
X.S(24,{fog:.035,z:6,pitch:.08},function(K,D,sp,q,st,r){
  K.cavern(12);q.c(st,3,3,.05,0,3.2,-11,'l',0,1.5708);var sg=D.glow(22);sg.position.set(0,3.2,-10.8);st.add(sg);K.asset(-3.2,-5,1.3,null,1.6);
  var ea=easel(K,q,st,-2,0,.4,'g');
  var cry=q.G();cry.position.set(0,0,-.6);st.add(cry);q.c(cry,.3,.4,.9,0,.45,0,'s');var gem=q.G();gem.position.y=1.3;cry.add(gem);q.k(gem,.3,.45,0,.22,0,'l');q.k(gem,.3,.45,0,-.22,0,'l',PI);
  var dk=K.niche(3.4,-1.5,-1.1,'n');
  function burn(o,no){D.tween(.9,function(e){o.position.y+=.03;o.scale.setScalar(1-e)},function(){D.burst(D.wpos(o),0xffffff,true);o.visible=false;no()})}
  K.choose([{g:ea,hy:1.5,ty:2.7},{g:cry,hy:1.2,ty:2.3,r:.6},{g:dk,hy:1.4,ty:3.5,r:1}],function(n,g,fin){K.fogT=.2;sg.material.opacity=.3;K.go([[2.6,1.7,-1]],2.6,fin)},
    function(n,g,no){burn(n?gem:ea.pic,no)});
  K.ups.push(function(t){gem.rotation.y=t});
});

/* II.9: Gideon's camp on a ridge at night. Four clay jars with lamps hidden in them. */
X.S(25,{fog:.04,z:6.5,pitch:.04,finDelay:2},function(K,D,sp,q,st,r){
  K.plain();K.asset(0,-8,1.7);for(var i=0;i<6;i++)q.py(r,1.4,1.6,-9+i*3.6,.8,-14-(i%2)*2,'p');
  [[-2.8,-.5,1],[-.9,-2.6,1],[1.2,-1.2,1],[3,-3.6,1.5]].forEach(function(p,n){
    q.s(r,.8,p[0],.1,p[1],'s',.7);var j=K.jar(st,p[0],.5,p[1],p[2]),f=q.fl(st,p[0],.9,p[1],1.2*p[2]),gl=D.glow(6*p[2]);gl.position.set(p[0],1.5,p[1]);st.add(gl);f.setOn(false);gl.visible=false;
    K.strike(n,j,{hp:2,r:.7,hy:.8,ty:2,rev:1},function(pp){j.rotation.z=pp*.25},function(){j.visible=false;f.setOn(true);gl.visible=true});
  });
});

/* II.10: a map room with three ways out: a lit window, a starry niche, a dark door. */
X.S(26,{fog:.04,z:5.5},function(K,D,sp,q,st,r){
  K.hall(4.4,15,-1);K.asset(0,1.2,1.1);
  var a=K.niche(-2.8,-3.6,.5,'l');q.b(a,.08,3,.1,0,1.6,-.12,'d');q.b(a,1.6,.08,.1,0,1.8,-.12,'d');
  var b=K.niche(0,-5.4,0,'n');for(var i=0;i<9;i++)q.s(b,.05,-.6+((i*37)%13)*.1,.7+((i*53)%21)*.1,-.14,'l');
  var c=K.niche(2.8,-3.6,-.5,'n');
  K.sort([{g:a,hy:1.5,fy:1.5,ty:3.5},{g:b,hy:1.5,fy:1.5,ty:3.5},{g:c,hy:1.5,fy:1.5,ty:3.5}]);
});

/* II.11: a light stands in the cloister walk. A net, a pair of scales, or the way on past it. */
X.S(27,{fog:.05,z:6,yawMax:.8},function(K,D,sp,q,st,r){
  K.hall(3.4,34,-9);var ap=K.asset(0,-3.5,1.6),ag=D.glow(7);ag.position.set(0,2,-3.5);st.add(ag);
  var net=q.G();net.position.set(-1.9,0,1.6);st.add(net);q.c(net,.04,.05,2.2,0,1.1,0,'w',.15);q.t(net,.45,.04,-.2,2.4,0,'w');q.k(net,.44,.9,-.2,1.95,0,'p',PI);
  var sc=q.G();sc.position.set(1.9,0,1.6);st.add(sc);q.c(sc,.05,.2,1.6,0,.8,0,'s');var bm=q.G();bm.position.y=1.65;sc.add(bm);q.b(bm,1.3,.06,.06,0,0,0,'g');[-.6,.6].forEach(function(x){q.c(bm,.25,.1,.1,x,-.4,0,'g');q.c(bm,.01,.01,.4,x,-.2,0,'d')});
  var far=gate(q,st,0,-20,1.2,3.4),fg=D.glow(6);fg.position.y=2;fg.material.opacity=.3;far.add(fg);
  K.choose([{g:net,hy:2,ty:3.2,r:.7},{g:sc,hy:1.5,ty:2.6,r:.7},{g:far,hy:2,ty:4.4,r:2,nr:.2}],function(n,g,fin){
    fg.material.opacity=1;D.tween(2.5,function(e){ag.material.opacity=1-e;ap.scale.setScalar(1.6*(1-e*.9))});K.go([[0,1.7,-3.5],[0,1.7,-15]],4.5,fin)},
   function(n,g,no){if(n===0){K.fogT=.2;D.tween(1.4,function(e){ag.scale.setScalar(7+Math.sin(e*PI)*14)},function(){K.fogT=.05;no()})}else D.tween(1.4,function(e){bm.rotation.z=Math.sin(e*12)*.4*(1-e)},no)});
});

/* II.12: a stair of images. Climb to each, and it sinks away behind you. */
X.S(28,{fog:.04,z:7,pitch:.2,yawMax:.8,finDelay:2},function(K,D,sp,q,st,r){
  K.ground(40,60,-10);q.b(r,.6,14,40,-4,7,-10,'s');q.b(r,.6,14,40,4,7,-10,'s');K.stair(24,0,3,7.4,.3,.9);q.b(r,7.4,7.2,8,0,3.6,-22.1,'s');
  var P=[],imgs=[];
  [5,11,17,23].forEach(function(s,n){
    var y=.3*(s+1),z=3-s*.9,x=n%2?1.9:-1.9,g=q.G(),top=n===3;g.position.set(top?0:x,y,z-(top?4:.6));st.add(g);
    if(n===0){q.c(g,.2,.24,1.8,0,.9,0,'s');q.f(g,.45,.1,.8,0)}
    else if(n===1){q.b(g,.14,2,.14,0,1,0,'w');q.b(g,1,.14,.14,0,1.5,0,'w')}
    else if(n===2){q.c(g,.7,.7,.06,0,1.3,0,'l',0,1.5708);var gl=D.glow(5);gl.position.y=1.3;g.add(gl)}
    else{var a=D.asset(sp.set);a.scale.setScalar(1.4);g.add(a)}
    imgs.push(g);P.push({g:g,hy:1.2,ty:2.8,r:1,p:[top?0:x*.3,y+1.7,z+(top?-.5:1.8)]})});
  K.order(P,function(n,g,fin){if(n>0){var o=imgs[n-1];D.tween(1.2,function(e){o.position.y-=.04;o.scale.setScalar(1-e*.9)})}K.go([P[n].p],2.6,fin)});
});

/* II.13: three candles in a cell. Each gutters out unless all three are burning together. */
X.S(29,{fog:.05,z:4.2,total:99,finDelay:1.6},function(K,D,sp,q,st,r){
  K.hall(3.4,11,0);K.asset(0,-2.6,1.4);var lit=[0,0,0],told=[0,0,0],done=false;
  [[-2.5,1.1,-1.6],[0,2.5,-5.2],[2.5,1.1,-1.6]].forEach(function(p,n){
    q.b(r,.7,.12,.5,p[0],p[1]-.06,p[2],'s');var c=K.candle(st,p[0],p[1],p[2],0),it=sp.items[n],tg=K.tag(it[0],c,1.5),left=0;
    K.target(c,.7,.12,function(){
      if(lit[n]||done)return;lit[n]=1;left=9;c.set(true);tg.visible=false;D.tone(440+n*60,.3);if(!told[n]){told[n]=1;D.say(it[0],it[1])}
      var s=lit[0]+lit[1]+lit[2];D.light(.2+.25*s);if(s===3){done=true;D.light(1);K.shaft(0,3,-2.6,.4,1.6,6,0,0,.14);K.finish()}},.4);
    K.ups.push(function(t,dt){if(lit[n]&&!done){left-=dt;c.fl.scale.setScalar(.3+.4*Math.min(1,left/4));if(left<=0){lit[n]=0;c.set(false);tg.visible=true;D.tone(180,.2,0,.03)}}});
  });
});

/* II.14: a sunbeam across a room, visible only by its dust. Brush the dust out of it. */
X.S(30,{fog:.045,z:4.6,finDelay:2},function(K,D,sp,q,st,r){
  K.hall(3.6,12,0);K.asset(0,-4.6,1.4);q.b(r,.1,1.6,1.2,-3.5,3.2,-1.5,'l');
  var ray=K.shaft(-.45,1.6,-1.5,.5,1.1,6.7,0,1.07,.34),n0=0;
  sp.items.forEach(function(it,n){
    var t=.2+n*.2,g=q.G();g.position.set(-3.4+5.9*t,3.2-3.2*t,-1.5);st.add(g);
    for(var i=0;i<9;i++)q.s(g,.045,Math.sin(i*2.4)*.35,Math.cos(i*1.7)*.3,Math.sin(i*4.1)*.3,'l');
    K.ups.push(function(tm){g.rotation.y=tm*.5+n;g.rotation.x=tm*.3});
    K.wipe(n,g,{r:.6,ty:.7},function(){n0++;ray.material.opacity=.34*(1-n0/4)+.015})});
});

/* II.15: a dark room, three shuttered windows that swing shut again if you let them. */
X.S(31,{fog:.06,z:4.6,finDelay:2},function(K,D,sp,q,st,r){
  K.hall(4.2,12,0);var open=0;
  [-2.6,0,2.6].forEach(function(x,n){
    var w=q.G();w.position.set(x,2.2,-5.9);st.add(w);q.b(w,1.5,2.2,.04,0,0,-.02,'l');q.b(w,1.8,.16,.3,0,-1.18,.05,'s');q.b(w,1.8,.16,.3,0,1.18,.05,'s');
    var L=q.G(),R=q.G();L.position.set(-.75,0,.05);R.position.set(.75,0,.05);w.add(L);w.add(R);q.b(L,.75,2.2,.07,.375,0,0,'w');q.b(R,.75,2.2,.07,-.375,0,0,'w');
    for(var i=0;i<4;i++){q.b(L,.6,.05,.09,.375,-.8+i*.5,.01,'d');q.b(R,.6,.05,.09,-.375,-.8+i*.5,.01,'d')}
    var ray=K.shaft(x,1.1,-3.45,.7,1.5,5.4,-1.14,0,0);
    K.strike(n,w,{hp:3,regen:.3,r:1,ty:1.7},function(p){L.rotation.y=-p*1.9;R.rotation.y=p*1.9;ray.material.opacity=p*.1},function(){L.rotation.y=-1.9;R.rotation.y=1.9;ray.material.opacity=.14;open++;K.fogT=.06-open*.012})});
});

/* II.16: a storeroom. A lovely image hangs in the air: shelve it, or let it go by and keep to the lamp. */
X.S(32,{fog:.05,z:5},function(K,D,sp,q,st,r){
  K.hall(3.8,13,-.5);var cab=K.asset(-2.3,-2.4,1.5),gone=false;cab.rotation.y=.5;
  q.b(r,.5,.1,5,3.4,1.4,-1.5,'w');for(var i=0;i<4;i++)K.jar(r,3.4,1.45,-3.3+i*1.2,.55);
  var im=q.G();im.position.set(0,1.9,-1.4);st.add(im);K.panel(im,0,0,0,1,1.3,'l');var ig=D.glow(5);im.add(ig);
  var lamp=K.candle(st,1.6,1,-5.4,1);q.c(lamp,.1,.3,1,0,-.5,0,'s');lamp.gl.material.opacity=.4;
  K.choose([{g:cab,hy:1.2,ty:3.3,r:.8},{g:lamp,hy:.5,ty:1.6,r:.7}],function(n,g,fin){
    lamp.gl.material.opacity=1;lamp.gl.scale.setScalar(9);if(gone){fin();return}
    D.tween(1.4,function(e){im.position.y=1.9+e*4;im.position.z=-1.4-e*3;ig.material.opacity=1-e},fin)},
   function(n,g,no){gone=true;D.tween(1,function(e){im.position.set(-2.3*e,1.9-e*.5,-1.4-e);im.scale.setScalar(1-e*.6);ig.material.opacity=1-e},function(){im.visible=false;no()})});
  K.ups.push(function(t){if(!gone)im.rotation.y=Math.sin(t*.8)*.3});
});

/* II.17: inward by four thresholds: the porch, the painted room, the bare arch, the table. */
X.S(33,{fog:.04,z:6,yawMax:.7,finDelay:2},function(K,D,sp,q,st,r){
  K.hall(3.6,42,-13);
  var g0=gate(q,st,0,-1,1.7,3.6),f0=q.G();f0.position.set(1.2,0,1.4);g0.add(f0);q.c(f0,.2,.35,.9,0,.45,0,'s');q.c(f0,.55,.3,.3,0,1.05,0,'s');q.c(f0,.48,.48,.02,0,1.2,0,'a');K.candle(st,-1.3,0,.2,1);K.candle(st,-1,0,.6,1);q.k(r,.35,.5,0,4.6,-1,'g');
  var g1=gate(q,st,0,-9,1.6,3.4);K.panel(st,-3.3,2,-7,1.4,1.8,'p',1.5708);K.panel(st,3.3,2,-7,1.4,1.8,'p',-1.5708);K.panel(st,-3.3,2,-5,1.4,1.8,'g',1.5708);K.panel(st,3.3,2,-5,1.4,1.8,'g',-1.5708);
  var g2=gate(q,st,0,-17,1.3,2.8);
  var tb=q.G();tb.position.set(0,0,-26);st.add(tb);q.b(tb,2.2,.12,1.1,0,.95,0,'w');[-1,1].forEach(function(s){q.b(tb,.12,.95,.9,s*.95,.47,0,'w')});q.s(tb,.36,-.3,1.15,0,'c',.6);q.c(tb,.16,.1,.3,.5,1.16,0,'g');
  K.asset(2.2,-27,1.3);var tg=D.glow(7);tg.position.set(0,2.2,-26);tg.material.opacity=.2;st.add(tg);
  var Z=[-1,-9,-17,-26],fogs=[.05,.06,.09,.03];
  K.order([{g:g0,hy:2,ty:4.4,r:1.6,nr:.18},{g:g1,hy:2,ty:4.2,r:1.6,nr:.18},{g:g2,hy:1.6,ty:3.6,r:1.4,nr:.18},{g:tb,hy:1.2,ty:2.4,r:1}],function(n,g,fin){
    K.go([[0,1.7,Z[n]+(n===3?2.4:-2.5)]],3,function(){K.fogT=fogs[n];if(n===3)tg.material.opacity=1;fin()})});
});

/* II.18: a penitent kneels under a vision. On the table: a lens, a horn to ask for more, a plain snuffer. */
X.S(34,{fog:.05,z:5},function(K,D,sp,q,st,r){
  K.hall(3.8,13,-.5);var pen=q.f(st,0,-2.6,1.3,0);pen.rotation.x=.3;var vis=D.glow(4);vis.position.set(0,3.2,-2.6);st.add(vis);K.asset(2.6,-4.6,1.1);
  q.b(r,3.6,.12,.9,0,.9,1.4,'w');q.b(r,.12,.9,.8,-1.6,.45,1.4,'w');q.b(r,.12,.9,.8,1.6,.45,1.4,'w');
  var lens=q.G();lens.position.set(-1.2,.96,1.4);st.add(lens);q.c(lens,.03,.05,.5,0,.25,0,'g');q.t(lens,.26,.04,0,.75,0,'g');
  var horn=q.G();horn.position.set(0,.96,1.4);st.add(horn);q.k(horn,.3,.7,0,.4,0,'g',PI);q.c(horn,.04,.04,.2,0,.05,0,'g');
  var cap=q.G();cap.position.set(1.2,.96,1.4);st.add(cap);q.k(cap,.2,.35,0,.5,0,'d');q.c(cap,.02,.02,.5,.2,.4,0,'d',1.1);q.c(cap,.12,.14,.06,0,.03,0,'d');
  K.choose([{g:lens,hy:.6,ty:1.4,r:.5},{g:horn,hy:.4,ty:1.2,r:.5},{g:cap,hy:.4,ty:1.2,r:.5}],function(n,g,fin){
    K.candle(st,.9,0,-2.2,1);D.tween(1,function(e){vis.scale.setScalar(4*(1-e*.85));pen.rotation.x=.3+e*.25},fin)},
   function(n,g,no){
    if(n===0)D.tween(1.2,function(e){vis.scale.setScalar(4+e*5);pen.scale.setScalar(1.3+e*.5);pen.rotation.x=.3-e*.3},no);
    else{K.fogT=.12;var k=0;D.tween(1.4,function(e){for(;k<e*4;k++){var o=D.glow(2.5);o.position.set(-2+k*1.3,2.4+(k%2),-3-k*.4);st.add(o)}},function(){K.fogT=.05;no()})}});
});

/* II.19: three stone tablets of the letter. Split each to find what the promise meant. */
X.S(35,{fog:.045,z:6,finDelay:2},function(K,D,sp,q,st,r){
  K.hall(4.4,16,-1);K.asset(0,-7.5,1.6);
  [-2.6,0,2.6].forEach(function(x,n){
    var g=q.G();g.position.set(x,0,-2.5+Math.abs(x)*.3);st.add(g);
    var L=q.b(g,.7,2.6,.3,-.36,1.5,0,'s'),R=q.b(g,.7,2.6,.3,.36,1.5,0,'s');q.b(g,1.8,.2,.7,0,.1,0,'s');
    for(var i=0;i<4;i++){q.b(L,.4,.05,.04,0,.7-i*.4,.16,'d');q.b(R,.4,.05,.04,0,.7-i*.4,.16,'d')}
    var beh=q.G(),bg=D.glow(5);beh.position.set(0,0,-.8);beh.visible=false;g.add(beh);bg.position.y=1.5;beh.add(bg);
    if(n===0){q.f(beh,-.4,0,.7,0);q.f(beh,0,0,.9,0);q.f(beh,.4,0,.7,0)}
    else if(n===1){for(i=0;i<5;i++)q.f(beh,-.6+i*.3,(i%2)*.3,.8,0)}
    else{q.b(beh,.14,2,.14,0,1,0,'l');q.b(beh,1,.14,.14,0,1.5,0,'l')}
    K.strike(n,g,{hp:3,r:.9,hy:1.5,ty:3.2,rev:1},function(p){L.position.x=-.36-p*.1;R.position.x=.36+p*.1;L.rotation.z=p*.08;R.rotation.z=-p*.08},function(){
      beh.visible=true;D.tween(.6,function(e){L.position.x=-.46-e*.6;R.position.x=.46+e*.6;L.rotation.z=.08+e*.3;R.rotation.z=-.08-e*.3})});
  });
});

/* II.20: Nineveh across the plain, a storm over it, the people on their knees at the gate. */
X.S(36,{fog:.022,z:8,pitch:.12,yawMax:.8},function(K,D,sp,q,st,r){
  K.plain(0);K.asset(0,-14,3.2);
  var cl=q.G();cl.position.set(0,9.5,-14);st.add(cl);[[-2,0,1.6],[0,.5,2.1],[2.2,0,1.5],[.8,-.6,1.3],[-1,-.5,1.2]].forEach(function(c){q.s(cl,c[2],c[0],c[1],0,'d',.7)});
  var bolt=q.b(st,.25,5,.25,0,5.5,-13,'l');bolt.visible=false;
  var cr=q.G();cr.position.set(0,0,-6.5);st.add(cr);for(var i=0;i<7;i++){var f=q.f(cr,-2.4+i*.8,(i%2)*.8,1,0);f.rotation.x=.5}var cg=D.glow(8);cg.position.y=1.5;cg.material.opacity=0;cr.add(cg);
  var booth=q.G();booth.position.set(4.4,0,1);st.add(booth);q.py(booth,1.3,1.2,0,2,0,'p');[-.8,.8].forEach(function(x){q.c(booth,.05,.05,1.5,x,.75,.8,'w');q.c(booth,.05,.05,1.5,x,.75,-.8,'w')});q.f(booth,0,0,1.2,-.7);
  K.choose([{g:cl,ty:2.4,r:2.4,nr:.2},{g:cr,hy:1,ty:2.6,r:2.2,nr:.2}],function(n,g,fin){cg.material.opacity=1;K.fogT=.012;D.tween(1.6,function(e){cl.position.y=9.5+e*8;cl.scale.setScalar(1-e*.7)},fin)},
    function(n,g,no){D.tween(1.6,function(e){cl.position.y=9.5-Math.sin(e*PI)*2.5;var z=e>.4&&e<.6;bolt.visible=z;if(z)K.shake=.8},function(){bolt.visible=false;D.tween(.8,function(e){cl.scale.setScalar(1-e*.99)},function(){cl.visible=false;no()})})});
});

/* II.21: a child reaching for one dish, a father, and a curtain with a feast behind it. */
X.S(37,{fog:.045,z:5.2},function(K,D,sp,q,st,r){
  K.hall(4,13,-.5);q.b(st,1.9,.12,1,0,.85,-1.6,'w');q.c(st,.12,.16,.85,0,.42,-1.6,'w');
  var dish=q.G();dish.position.set(0,.92,-1.6);st.add(dish);q.c(dish,.4,.24,.2,0,.1,0,'c');q.s(dish,.28,0,.2,0,'p',.5);
  var fa=q.f(st,-1.6,-1.8,1.5,.5),ch=q.f(st,1.4,-1.5,.85,-.6);
  var cL=q.b(st,2.1,4.4,.08,-1.05,2.2,-4.2,'p'),cR=q.b(st,2.1,4.4,.08,1.05,2.2,-4.2,'p');q.c(r,.05,.05,7,0,4.45,-4.2,'w',1.5708);
  K.asset(0,-6,1.7,'table');var fg=D.glow(8);fg.position.set(0,2,-6);fg.material.opacity=0;st.add(fg);
  K.choose([{g:dish,hy:.2,ty:.9,r:.55},{g:fa,hy:.9,ty:2.6,r:.7}],function(n,g,fin){fg.material.opacity=1;D.tween(1.4,function(e){fa.rotation.x=e*.45;cL.position.x=-1.05-e*1.9;cR.position.x=1.05+e*1.9;cL.scale.x=1-e*.6;cR.scale.x=1-e*.6},fin)},
    function(n,g,no){D.tween(.9,function(e){dish.position.x=e;dish.position.z=-1.6+e*.15;ch.position.y=Math.abs(Math.sin(e*9))*.2},no)});
  K.ups.push(function(t){ch.rotation.z=Math.sin(t*5)*.06});
});

/* II.22: three lesser lights wander the chapel. Strike them out; the Gospel on its lectern remains. */
X.S(38,{fog:.045,z:5.5,finDelay:2.6},function(K,D,sp,q,st,r){
  K.hall(4.2,14,-1);K.asset(0,-4.2,1.6);var bg=D.glow(4);bg.position.set(0,2.2,-4.2);bg.material.opacity=.12;st.add(bg);
  sp.items.forEach(function(it,n){
    var g=q.G(),live=true;st.add(g);
    if(n===0){q.s(g,.3,0,0,0,'l');g.add(D.glow(5))}else if(n===1){q.c(g,.2,.12,.2,0,-.1,0,'d');q.fl(g,0,0,0,1.1);g.add(D.glow(3))}else{q.s(g,.16,0,0,0,'l');q.k(g,.14,1.1,-.55,.2,0,'l',-1.2);g.add(D.glow(3))}
    K.ups.push(function(t){if(live)g.position.set(Math.sin(t*.6+n*2.1)*2.7,1.7+n*.75+Math.sin(t*1.3+n)*.3,-2+Math.cos(t*.5+n*2.1)*1.4)});
    K.strike(n,g,{hp:2,r:.6,ty:.8},function(p){g.scale.setScalar(1-p*.5)},function(){live=false;g.visible=false})});
  K.onAll=function(){bg.material.opacity=1;bg.scale.setScalar(12);K.yawTo=0;K.pitchTo=.05};
});

/* II.23: a rotunda with four plinths: sight, a truth told, hearing, touch. */
X.S(39,{fog:.04,z:4.6},function(K,D,sp,q,st,r){
  K.rotunda(6.2,8);K.asset(0,-3.5,1.4,null,3.2);
  K.sort([['eye',-3,-1.2],['scroll',-1.1,-3.4],['ear',1.1,-3.4],['hand',3,-1.2]].map(function(b){return{g:K.plinth(b[0],b[1],b[2],1.2),hy:1.4,fy:2.2,ty:3.1,r:.8}}));
});

/* II.24: a rooftop under the stars. One arch stands open to the light, one is veiled. */
X.S(40,{fog:.03,z:6.5,pitch:.06},function(K,D,sp,q,st,r){
  K.court(6,18,-3);K.asset(0,-5.5,1.7);for(var i=0;i<12;i++)q.s(r,.08,-12+((i*37)%25),7+((i*53)%8),-26-((i*7)%6),'l');
  var a=K.niche(-2.8,-2.6,.45,'l');K.shaft(-2.8,3,-2.2,.5,1,5,0,0,.1);
  var b=K.niche(2.8,-2.6,-.45,'n');q.b(b,1.6,3,.05,0,1.6,-.05,'p');
  K.sort([{g:a,hy:1.5,fy:1.5,ty:3.5},{g:b,hy:1.5,fy:1.5,ty:3.5}]);
});

/* II.25: two curtained alcoves, a lamp in one and a key in the other. */
X.S(41,{fog:.05,z:5.2},function(K,D,sp,q,st,r){
  K.hall(4,13,-.5);K.asset(0,-5,1.5);
  var a=K.plinth('lamp',-2.2,-2.4,1.3),b=K.plinth('key',2.2,-2.4,1.3);
  [-2.2,2.2].forEach(function(x){q.c(r,.04,.04,2.6,x,3.6,-2.9,'w',1.5708);q.b(r,.5,3.4,.06,x-.95,1.9,-2.9,'p');q.b(r,.5,3.4,.06,x+.95,1.9,-2.9,'p')});
  K.sort([{g:a,hy:1.4,fy:2.3,ty:3.3,r:.8},{g:b,hy:1.4,fy:2.3,ty:3.3,r:.8}],function(){var g=q.G();q.b(g,.36,.46,.04,0,0,0,'p');q.b(g,.4,.5,.03,0,0,-.02,'g');return g});
});

/* II.26: a mountain ledge. A bowl held up under the cloud, and a cairn to leave things on. */
X.S(42,{fog:.03,z:6.5,pitch:.1},function(K,D,sp,q,st,r){
  K.plain();K.asset(-2.4,-4,1.6,null,2.6);
  var a=q.G();a.position.set(-2.4,0,-3.4);st.add(a);q.c(a,.25,.4,1.1,0,.55,0,'s');q.c(a,.7,.35,.35,0,1.28,0,'c');K.shaft(-2.4,3.6,-3.4,.3,.8,4.4,0,0,.1);
  var b=q.G();b.position.set(2.4,0,-3.4);st.add(b);[[0,.3,.7],[.2,.85,.5],[-.1,1.25,.36],[0,1.55,.24]].forEach(function(s){q.s(b,s[2],s[0],s[1],0,'s',.6)});
  K.sort([{g:a,hy:1.3,fy:1.5,ty:2.4,r:.8},{g:b,hy:.9,fy:1.9,ty:2.5,r:.8}]);
});

/* II.27: lean on a star balanced on a pole, or stand on the church built on rock. */
X.S(43,{fog:.045,z:5.4},function(K,D,sp,q,st,r){
  K.hall(4.2,14,-.8);K.asset(0,-5.5,1.4);
  var po=q.G();po.position.set(-2,0,-2);st.add(po);q.c(po,.04,.06,3,0,1.5,0,'w');var sg=q.G();sg.position.y=3.2;po.add(sg);q.s(sg,.22,0,0,0,'l');sg.add(D.glow(4));
  var rk=q.G();rk.position.set(2,0,-2);st.add(rk);q.c(rk,1.2,1.5,.8,0,.4,0,'s');q.b(rk,1,1,1.2,0,1.3,0,'s');q.py(rk,.85,.6,0,2.1,0,'c');q.b(rk,.4,1.6,.4,0,1.9,.75,'s');q.py(rk,.34,.5,0,2.95,.75,'c');q.b(rk,.06,.4,.06,0,3.4,.75,'g');q.b(rk,.22,.06,.06,0,3.45,.75,'g');
  K.choose([{g:po,hy:2.8,ty:4,r:.7},{g:rk,hy:1.4,ty:4,r:1.1}],function(n,g,fin){var gl=D.glow(9);gl.position.set(2,2,-2);st.add(gl);fin()},
    function(n,g,no){K.shake=.6;D.tween(1.2,function(e){po.rotation.z=Math.sin(e*14)*.25*(1-e)+e*1.3},function(){sg.visible=false;no()})});
});

/* II.28: a scriptorium with three lecterns. Each scroll of inner words goes to its own. */
X.S(44,{fog:.045,z:5.4},function(K,D,sp,q,st,r){
  K.hall(4.4,14,-.8);K.asset(0,-5.6,1.5);
  var B=[['feather',-2.7,-2.2],['scroll',0,-3.6],['hammer',2.7,-2.2]].map(function(b){
    var g=q.G();g.position.set(b[1],0,b[2]);st.add(g);q.c(g,.08,.3,1.1,0,.55,0,'w');q.b(g,1,.08,.7,0,1.2,0,'w',0,0,-.35);var t=K.tok(b[0],1.2);t.position.set(0,1.9,0);g.add(t);return{g:g,hy:1.5,fy:1.6,ty:2.9,r:.8}});
  K.sort(B,function(){var g=q.G();q.c(g,.09,.09,.6,0,0,0,'p',1.5708);q.s(g,.1,-.32,0,0,'w');q.s(g,.1,.32,0,0,'w');return g});
});

/* II.29: words rain down in a cell. Crown them as God's, or see your own mind in the mirror. */
X.S(45,{fog:.05,z:5},function(K,D,sp,q,st,r){
  K.hall(3.8,12,-.5);K.asset(0,-3,1.5);var W=[],calm=0;for(var i=0;i<10;i++)W.push(q.s(st,.07,0,0,0,'l'));
  var a=K.plinth('crown',-2.1,-1.2,1.25),b=K.plinth('mirror',2.1,-1.2,1.25);
  K.choose([{g:a,hy:1.4,ty:3,r:.8},{g:b,hy:1.4,ty:3,r:.8}],function(n,g,fin){calm=1;var gl=D.glow(6);gl.position.set(2.1,2.2,-1.2);st.add(gl);fin()},
    function(n,g,no){var t=a.userData.tok;D.tween(.8,function(e){t.position.x=e*.9;t.position.y=1-e*e;t.rotation.z=-e*2},no)});
  K.ups.push(function(t){W.forEach(function(o,k){var u=(t*(calm?.15:.5)+k*.1)%1;o.position.set(Math.sin(k*2.3)*.5*(1-u),4.4-u*2.6,-3+Math.cos(k*1.7)*.4)})});
});

/* II.30: a bush burns in the desert and gives a command. A crown, a road to rush down, a confessor's hut. */
X.S(46,{fog:.03,z:7,pitch:.06,yawMax:.9},function(K,D,sp,q,st,r){
  K.plain();K.asset(0,-5,2.2);var bg=D.glow(9);bg.position.set(0,2.5,-5);st.add(bg);
  var cr=K.plinth('crown',-2.8,0,1.3);
  var sg=q.G();sg.position.set(2.6,0,1);st.add(sg);q.c(sg,.06,.08,2.2,0,1.1,0,'w');q.b(sg,1.2,.36,.06,.4,1.9,0,'w');q.k(sg,.26,.4,1.15,1.9,0,'w',-1.5708);
  var hut=q.G();hut.position.set(3.4,0,-6.5);hut.rotation.y=-.6;st.add(hut);q.b(hut,2.2,2,2,0,1,0,'s');q.py(hut,1.8,.9,0,2.45,0,'c');q.b(hut,.7,1.4,.06,0,.7,1.02,'n');q.f(hut,0,1.5,1.2,0);var cc=K.candle(hut,.7,0,1.5,1);
  K.choose([{g:cr,hy:1.4,ty:3,r:.8},{g:sg,hy:1.8,ty:2.9,r:.8},{g:hut,hy:1.2,ty:3.8,r:1.4,nr:.16}],function(n,g,fin){cc.gl.scale.setScalar(8);K.go([[2,1.7,-2.5]],3,fin)},
    function(n,g,no){
      if(n===0){var t=cr.userData.tok;D.tween(.8,function(e){t.position.x=-e*.9;t.position.y=1-e*e;t.rotation.z=e*2},no)}
      else K.go([[6,1.7,-4],[9,1.7,-9]],2,function(){K.shake=1;D.tone(90,.4);K.go([[6,1.7,-4],[0,1.7,7]],2.6,no)})});
});

/* II.31: three words that do what they say: a cowering man stands, a dead tree flowers, a cold hearth burns. */
X.S(47,{fog:.04,z:6,pitch:.06,finDelay:2},function(K,D,sp,q,st,r){
  K.plain();K.asset(0,-7,1.8);
  var a=q.f(st,-2.6,-1.5,1.4,.4);a.rotation.x=.9;a.position.y=-.3;
  var tr=q.G();tr.position.set(0,0,-3);st.add(tr);q.c(tr,.12,.2,2,0,1,0,'w');[-.5,.5,0].forEach(function(b,k){q.c(tr,.04,.07,1,b*.5,2+k*.25,0,'w',-b)});
  var hb=K.brazier(st,2.6,-1.5,1.6);hb.set(false);
  K.tap(0,a,{hy:.6,ty:2.3,r:.8},function(fin){D.tween(.9,function(e){a.rotation.x=.9*(1-e);a.position.y=-.3*(1-e)},fin)});
  K.tap(1,tr,{hy:2,ty:3.6,r:.9},function(fin){var k=0;D.tween(1,function(e){for(;k<e*9;k++)q.s(tr,.26,Math.sin(k*2.4)*.8,2.3+Math.cos(k*1.3)*.5,Math.cos(k*2.4)*.5,'p')},fin)});
  K.tap(2,hb,{hy:1.6,ty:3,r:.8},function(fin){hb.set(true);hb.fl.scale.setScalar(.4);D.tween(.9,function(e){hb.fl.scale.setScalar(.4+e*2)},fin)});
});

/* II.32: a fountain overflows. Work the pump to add to it, or leave the empty basin to fill. */
X.S(48,{fog:.035,z:6,pitch:.05},function(K,D,sp,q,st,r){
  K.court(5.5,16,-2);var fo=K.asset(0,-3.5,1.7);
  var pu=q.G();pu.position.set(-2.4,0,-.6);st.add(pu);q.c(pu,.18,.22,1.3,0,.65,0,'d');var hd=q.G();hd.position.set(0,1.3,0);pu.add(hd);q.b(hd,1.1,.08,.08,.45,0,0,'d');q.c(pu,.06,.06,.5,-.3,.9,0,'d',1.5708);
  var ba=q.G();ba.position.set(2.4,0,-.6);st.add(ba);q.c(ba,.9,.6,.5,0,.25,0,'s');q.t(ba,.9,.08,0,.5,0,'s',1.5708);var wa=q.c(ba,.82,.82,.03,0,.1,0,'a');
  K.choose([{g:pu,hy:1.2,ty:2.3,r:.8},{g:ba,hy:.4,ty:1.7,r:1}],function(n,g,fin){var gl=D.glow(6);gl.position.set(2.4,1,-.6);st.add(gl);D.tween(1.4,function(e){wa.position.y=.1+e*.38},fin)},
    function(n,g,no){D.tween(1.4,function(e){hd.rotation.z=Math.sin(e*18)*.5;fo.scale.setScalar(1.7*(1-e*.35));K.shake=.15},no)});
});
})();
