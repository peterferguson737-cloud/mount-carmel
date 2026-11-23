/* The Dark Night, Book Two (the night of the spirit). One scene per chapter, built on John's own images. */
(function(){
'use strict';
var X=window.ASCENT;if(!X||!X.S)return;
var PI=Math.PI;
function lampPost(K,q,p,x,z,h,on){var g=q.G();g.position.set(x,0,z);p.add(g);q.c(g,.06,.08,h,0,h/2,0,'w');q.b(g,.5,.06,.5,0,h,0,'d');g.c=K.candle(g,0,h+.03,0,on);return g}
function token(q,m,r){var g=q.G();q.s(g,r||.3,0,0,0,m||'p');return g}
function ladder(q,p,x,z,n,gap){var g=q.G();g.position.set(x,0,z);p.add(g);q.b(g,.08,n*gap+.4,.08,-.5,(n*gap+.4)/2,0,'w');q.b(g,.08,n*gap+.4,.08,.5,(n*gap+.4)/2,0,'w');
  g.r=[];for(var i=0;i<n;i++){g.r.push(q.b(g,1.05,.08,.1,0,.3+i*gap,0,'w'))}return g}
function rungTargets(L,ty){return L.r.map(function(r){return {g:r,ty:ty||.5,r:.45,nr:.1}})}
/* walk the camera up a ladder as each rung is taken */
function climb(K,L,n,gap,z,fin){K.go([[L.position.x,1.7+(n+1)*gap*.55,z]],.8,fin)}

/* II.1: rest at the inn after the first night, see the storm over the high pass, set out */
X.S('dn16',{fog:.04,z:6},function(K,D,sp,q,st,r){
  K.plain();var inn=D.asset('house');inn.position.set(-2.6,0,-1);inn.rotation.y=.5;st.add(inn);
  var bench=q.G();bench.position.set(-.8,0,-1.4);st.add(bench);q.b(bench,1.4,.08,.4,0,.45,0,'w');q.b(bench,.08,.45,.35,-.6,.22,0,'w');q.b(bench,.08,.45,.35,.6,.22,0,'w');
  var cl=q.G();cl.position.set(2,5,-12);st.add(cl);for(var i=0;i<5;i++)q.s(cl,1+Math.random(),i*1.3-2.6,Math.random()*.6,0,'d',1.4,.6,1);cl.scale.setScalar(.2);
  var pass=q.G();pass.position.set(2.2,0,-11);st.add(pass);q.k(pass,3,5,-2,2.5,0,'s');q.k(pass,3.4,6,2.5,3,-1,'s');
  var fig=null,body=q.G();body.position.set(-.8,0,-1.4);st.add(body);q.s(body,.32,0,.9,0,'h',1,1.6,1);
  K.order([{g:bench,ty:1.1,r:.7},{g:pass,hy:3,ty:4,r:1.6},{g:body,hy:.9,ty:1.7,r:.6},{g:pass,hy:2,ty:2.6,r:1.6}],function(n,g,fin){
    if(n===0){D.burst(D.wpos(bench),0xffffff);fin()}
    else if(n===1){D.tween(2,function(e){cl.scale.setScalar(.2+e*.9)});K.fogT=.06;fin()}
    else if(n===2){D.tween(1,function(e){body.rotation.z=Math.sin(e*20)*.15*(1-e)});fin()}
    else K.go([[1,1.7,-5]],2.6,fin)});
});

/* II.2: a cloth with stains, some on the surface, some soaked deep */
X.S('dn17',{fog:.035,z:5.4},function(K,D,sp,q,st,r){
  K.hall(5,12,-1);var fr=q.G();fr.position.set(0,1.6,-3);st.add(fr);q.b(fr,3.4,.08,.08,0,1.1,0,'w');q.b(fr,3.2,2.1,.04,0,0,0,'p');
  [[-1,.4,'d',.4],[.6,.5,'d',.32],[-.7,-.5,'c',.3],[.9,-.4,'c',.26]].forEach(function(s,n){var m=q.s(fr,s[3],s[0],s[1],.05,s[2],1,1,.15);
    K.strike(n,m,{hp:n<2?4:2,ty:.5,r:.4,nr:.1},function(f){m.scale.set(1-f*.8,1-f*.8,.15)},function(){fr.remove(m)})});
});

/* II.3: two lamps, sense and spirit, dimmed together; one clear light rises */
X.S('dn18',{fog:.04,z:6},function(K,D,sp,q,st,r){
  K.court(9,14,-2);var a=lampPost(K,q,st,-1.8,-3,1.4,true),b=lampPost(K,q,st,1.8,-3,1.4,true);
  var one=D.glow(8);one.position.set(0,3.2,-3);one.material.opacity=0;st.add(one);var core=q.G();core.position.set(0,3.2,-3);st.add(core);q.s(core,.25,0,0,0,'l');core.visible=false;
  K.order([{g:a,hy:1.5,ty:2.4,r:.8},{g:b,hy:1.5,ty:2.4,r:.8},{g:core,ty:.6,r:.8,hy:0}],function(n,g,fin){
    if(n<2){g.c.set(false);D.tone(200+n*60,.4);if(n===1)core.visible=true;fin()}else{D.tween(2,function(e){one.material.opacity=e*.9});fin()}});
});

/* II.4: three doors in a dark wall, the mind, the will, the memory, opening onto light */
X.S('dn19',{fog:.04,z:6},function(K,D,sp,q,st,r){
  K.hall(8,12,-1);var L=[];[-2.4,0,2.4].forEach(function(x){var d=D.arch(1.5);d.position.set(x,0,-3.6);st.add(d);var lf=q.b(d,1.3,2.2,.08,0,1.1,0,'w');var gl=D.glow(5);gl.position.set(0,1.2,-.6);gl.material.opacity=0;d.add(gl);L.push({g:d,lf:lf,gl:gl,hy:1.2,ty:2.6,r:.9})});
  K.order(L,function(n,g,fin){var it=L[n];D.tween(1,function(e){it.lf.position.x=-e*1.3;it.gl.material.opacity=e*.9});fin()});
});

/* II.5: a dazzling sun and a stained glass: why God's light feels like darkness */
X.S('dn20',{fog:.03,z:6},function(K,D,sp,q,st,r){
  K.court(9,14,-2);var sun=q.G();sun.position.set(-2.2,2.4,-3.4);st.add(sun);q.s(sun,.6,0,0,0,'l');var sg=D.glow(9);sun.add(sg);
  var gl=q.G();gl.position.set(2.2,0,-3.2);st.add(gl);q.b(gl,1.5,2.4,.06,0,1.6,0,'a');[[-.3,1.9],[.35,1.4],[0,2.3]].forEach(function(p){q.s(gl,.18,p[0],p[1],.05,'d',1,1,.2)});q.b(gl,1.7,.1,.1,0,.4,0,'w');
  K.sort([{g:sun,hy:0,fy:0,ty:1.2,r:1,got:function(c){st.remove(c);sg.scale.multiplyScalar(1.1)}},{g:gl,hy:1.6,fy:1.6,ty:3.1,r:1,got:function(c){st.remove(c)}}]);
});

/* II.6: a heavy stone presses down; bear it breath by breath */
X.S('dn21',{fog:.05,z:5.4},function(K,D,sp,q,st,r){
  K.cavern(8);var fig=q.f(st,0,-3,1,0);var slab=q.G();slab.position.set(0,2.6,-3);st.add(slab);q.b(slab,2.4,.6,1.4,0,0,0,'s');
  var whale=q.G();whale.position.set(0,0,-3);st.add(whale);
  var n0=sp.items.length;
  function breath(n){K.tap(n,slab,{hy:0,ty:.8,r:.9},function(fin){var k=n+1;D.tween(.8,function(e){slab.position.y=2.6-k*.18+Math.sin(e*PI)*.05;fig.scale.y=1-k*.04});D.tone(110+k*20,.5);
    if(k===n0){D.tween(2,function(e){slab.position.y=2.6-n0*.18+e*4;fig.scale.y=1-n0*.04+e*n0*.04})}else D.tween(.7,function(){},function(){breath(n+1)});fin()})}
  breath(0);
});

/* II.7: three comforters with lamps that will not light; then the brief pause of dawn */
X.S('dn22',{fog:.05,z:6},function(K,D,sp,q,st,r){
  K.plain();var who=[];[-2.2,0,2.2].forEach(function(x,n){var g=q.G();g.position.set(x,0,-3.4);st.add(g);q.f(g,0,0,.9,0);var l=K.candle(g,.35,1.1,.2,false);g.l=l;who.push(g)});
  var dawn=D.glow(30);dawn.position.set(0,2,-30);dawn.material.opacity=0;st.add(dawn);
  K.order([{g:who[0],hy:1,ty:2,r:.7},{g:who[1],hy:1,ty:2,r:.7},{g:who[2],hy:1,ty:2,r:.7},{g:dawn,hy:0,ty:1,r:3}],function(n,g,fin){
    if(n<3){g.l.set(true);setTimeout(function(){g.l.set(false)},500);D.tone(180,.3);fin()}
    else{D.tween(3,function(e){dawn.material.opacity=Math.sin(e*PI)*.9;K.fogT=.05-.03*Math.sin(e*PI)},fin)}});
});

/* II.8: a prayer book whose pages are blank; then simply kneel */
X.S('dn23',{fog:.04,z:5.2},function(K,D,sp,q,st,r){
  K.hall(5,12,-1);var st2=q.G();st2.position.set(0,0,-2.6);st.add(st2);q.c(st2,.08,.12,1.1,0,.55,0,'w');q.b(st2,.9,.06,.6,0,1.12,0,'w',-.35);
  var pages=[];for(var i=0;i<3;i++){var pg=q.b(st2,.4,.02,.52,.2,1.2+i*.012,0,'p',-.35);pages.push(pg)}
  var cush=q.G();cush.position.set(0,0,-1.6);st.add(cush);q.b(cush,.9,.18,.5,0,.09,0,'c');
  K.order([{g:pages[0],ty:.4,r:.4},{g:pages[1],ty:.4,r:.4},{g:pages[2],ty:.4,r:.4},{g:cush,ty:.6,r:.6}],function(n,g,fin){
    if(n<3){D.tween(.6,function(e){g.rotation.z=e*PI;g.position.x=.2-e*.4},fin)}else K.go([[0,1.1,-.2]],1.6,fin)});
});

/* II.9: a vessel full of small things, emptied, then filled with light */
X.S('dn24',{fog:.04,z:5.6},function(K,D,sp,q,st,r){
  K.hall(5,12,-1);var v=q.G();v.position.set(0,0,-3);st.add(v);q.c(v,.7,.5,1.2,0,.6,0,'c');q.t(v,.7,.06,0,1.2,0,'c',PI/2);
  var lt=D.glow(6);lt.position.set(0,1.4,-3);lt.material.opacity=0;st.add(lt);
  var small=[];[[-.3,'g'],[.25,'w'],[0,'d']].forEach(function(s,n){var o=q.s(v,.2,s[0],1.25,0,s[1]);small.push(o);
    K.strike(n,o,{hp:1,ty:.5,r:.35,nr:.1},null,function(){D.tween(.7,function(e){o.position.y=1.25+e*1.2;o.position.x=s[0]+e*(n-1)*1.4;o.scale.setScalar(1-e)},function(){v.remove(o)})})});
  K.tap(3,v,{hy:1.2,ty:2,r:.8},function(fin){D.tween(2,function(e){lt.material.opacity=e*.95});D.burst(D.wpos(v),0xffffff);fin()});
});

/* II.10: the log in the fire: hissing, blackening, cracking, then becoming fire */
X.S('dn25',{fog:.045,z:5.4},function(K,D,sp,q,st,r){
  K.hall(4.6,12,-1);var hr=q.G();hr.position.set(0,0,-3);st.add(hr);q.b(hr,2.8,.3,1.4,0,.15,0,'s');q.b(hr,2.8,2.6,.3,0,1.3,-.7,'s');
  var log=q.c(hr,.28,.28,1.8,0,.55,0,'w',PI/2);var fl=q.fl(hr,0,.55,0,.6),gl=D.glow(7);gl.position.y=1;gl.material.opacity=.15;hr.add(gl);
  var steam=q.G();steam.position.y=.9;hr.add(steam);for(var i=0;i<4;i++)q.s(steam,.12,i*.3-.45,0,0,'p');steam.visible=true;
  K.ups.push(function(t){steam.children.forEach(function(c,k){c.position.y=((t*.6+k*.25)%1)*1.2})});
  function step(n){if(n>3)return;K.strike(n,hr,{hp:3,ty:2.2,r:.9,hy:.6},function(f){var v=(n+f)/4;fl.scale.setScalar(.6+v*2.4);gl.material.opacity=.15+v*.8;
      if(n===0)steam.scale.setScalar(1+f);if(n===1){log.material=q.M.d}if(n===2){log.rotation.x=f*.08;steam.visible=false}if(n===3){log.material=q.M.l;log.scale.setScalar(1+f*.15)}},function(){step(n+1)})}
  step(0);
});

/* II.11: scattered sparks gathered into one flame */
X.S('dn26',{fog:.045,z:6},function(K,D,sp,q,st,r){
  K.cavern(9);var bz=K.brazier(st,0,-3.2,2.4);bz.set(false);var lit=0;
  [[-2.4,.4,-1.8],[-1.2,.3,-1.2],[1.3,.3,-1.4],[2.5,.4,-2]].forEach(function(p,n){var s=K.orb(.6);s.position.set(p[0],p[1],p[2]);st.add(s);
    K.tap(n,s,{ty:.6,r:.5},function(fin){D.tween(.8,function(e){s.position.set(p[0]*(1-e),p[1]+(1.6-p[1])*e,p[2]+(-3.2-p[2])*e)},function(){st.remove(s);lit++;if(lit===1)bz.set(true);bz.fl.scale.setScalar(1+lit*.5);if(lit===4)oneFlame();fin()})})});
  function oneFlame(){K.tap(4,bz,{hy:1.6,ty:3,r:.9},function(fin){D.tween(1.4,function(e){bz.fl.scale.setScalar(3+e*1.5);bz.gl.material.opacity=.6+e*.4});D.burst(D.wpos(bz),0xffffff);fin()})}
});

/* II.12: three lanterns one above another; the light passes down */
X.S('dn27',{fog:.035,z:6.2},function(K,D,sp,q,st,r){
  K.rotunda(5,8,7);var ch=q.c(st,.03,.03,7,0,4.2,-2.6,'d');var L=[];
  [4.6,3.1,1.6].forEach(function(y,n){var g=q.G();g.position.set(0,y,-2.6);st.add(g);q.b(g,.5,.6,.5,0,0,0,'g');var c=K.candle(g,0,-.2,0,false);g.c=c;var gl=D.glow(4);gl.material.opacity=0;g.add(gl);g.gl=gl;L.push({g:g,hy:0,ty:.7,r:.5})});
  K.order(L,function(n,g,fin){g.c.set(true);D.tween(1,function(e){g.gl.material.opacity=e*.8});D.tone(520-n*120,.5);fin()});
});

/* II.13: light in the mind or fire in the will */
X.S('dn28',{fog:.035,z:6},function(K,D,sp,q,st,r){
  K.court(9,14,-2);var lamp=lampPost(K,q,st,-2.2,-3,1.6,true),lg=D.glow(4);lg.position.y=1.8;lg.material.opacity=.2;lamp.add(lg);
  var bz=K.brazier(st,2.2,-3,2.2);bz.set(true);
  K.sort([{g:lamp,hy:1.6,fy:1.8,ty:2.8,r:.9,got:function(c){st.remove(c);lg.material.opacity+=.18}},{g:bz,hy:1.4,fy:1.6,ty:2.8,r:.9,got:function(c){st.remove(c);bz.fl.scale.multiplyScalar(1.15)}}]);
});

/* II.14: a house with four lit rooms; close each shutter, then go out by the door */
X.S('dn29',{fog:.04,z:6.6},function(K,D,sp,q,st,r){
  K.plain();var h=q.G();h.position.set(0,0,-4);st.add(h);q.b(h,5,3.6,2.4,0,1.8,0,'s');q.py(h,3.8,1.6,0,4.4,0,'w');
  var W=[];[[-1.6,2.6],[1.6,2.6],[-1.6,1.1],[1.6,1.1]].forEach(function(p){var g=q.G();g.position.set(p[0],p[1],1.22);h.add(g);var win=q.b(g,.9,.8,.04,0,0,0,'l');var sh=q.b(g,.9,.8,.06,0,0,.04,'w');sh.scale.x=.01;sh.position.x=-.45;g.sh=sh;W.push({g:g,ty:.7,r:.5,hy:0})});
  var door=q.G();door.position.set(0,0,1.22);h.add(door);q.b(door,1,1.8,.06,0,.9,0,'d');W.push({g:door,hy:.9,ty:2,r:.7});
  K.order(W,function(n,g,fin){if(n<4){D.tween(.5,function(e){g.sh.scale.x=e;g.sh.position.x=-.45+e*.45});D.tone(220,.2);K.fogT=.04+n*.006;fin()}
    else{D.tween(.8,function(e){g.rotation.y=-e*1.3});K.go([[0,1.7,-1.4],[2.6,1.7,1.2]],2.6,fin)}});
});

/* II.15: a ladder rising into darkness; one phrase of the verse on each rung */
X.S('dn30',{fog:.05,z:4.6,pitch:.25},function(K,D,sp,q,st,r){
  K.cavern(9);var n=sp.items.length,gap=.75,L=ladder(q,st,0,-1.6,n,gap);
  K.order(rungTargets(L,.4),function(k,g,fin){climb(K,L,k,gap,1.6,fin)});
});

/* II.16: a dark path with a guide rope, and a torch-lit path: sort each step */
X.S('dn31',{fog:.045,z:6},function(K,D,sp,q,st,r){
  K.plain();var dark=q.G();dark.position.set(-2.2,0,-3.2);st.add(dark);q.b(dark,1.4,.04,5,0,.02,-1.5,'d');for(var i=0;i<4;i++)q.c(dark,.05,.05,1,-.8,.5,-i*1.3,'w');q.b(dark,.04,.04,4,-.8,1,-2,'p');
  var torch=q.G();torch.position.set(2.2,0,-3.2);st.add(torch);q.b(torch,1.4,.04,5,0,.02,-1.5,'s');[0,-1.6,-3.2].forEach(function(z,k){q.c(torch,.05,.05,1.3,.8,.65,z,'w');q.fl(torch,.8,1.4,z,.5)});
  K.sort([{g:dark,hy:.6,fy:.8,ty:2,r:1,got:function(c){c.position.y=.4;c.scale.setScalar(.4)}},{g:torch,hy:.6,fy:.8,ty:2,r:1,got:function(c){st.remove(c);D.tone(140,.2)}}]);
});

/* II.17: a vast desert; try to name what you find and watch each word dissolve */
X.S('dn32',{fog:.02,z:6},function(K,D,sp,q,st,r){
  K.plain();var W=[];sp.items.forEach(function(it,n){var g=q.G();g.position.set((n-1.5)*1.8,1.3+(n%2)*.4,-3.4);st.add(g);var s=K.orb(.7);g.add(s);g.s=s;W.push({g:g,ty:.6,r:.5,hy:0})});
  K.order(W,function(n,g,fin){if(n<3)D.tween(1.2,function(e){g.position.y+=.01;g.position.x+=.02;g.scale.setScalar(1-e)},function(){st.remove(g);fin()});else{D.tween(2,function(e){K.fogT=.02-.012*e});fin()}});
});

/* II.18: a ladder you go up and down; each step a lesson */
X.S('dn33',{fog:.045,z:4.8,pitch:.2},function(K,D,sp,q,st,r){
  K.cavern(9);var gap=.7,L=ladder(q,st,0,-1.6,6,gap),levels=[1,0,3,2,5];
  var T=levels.map(function(lv){return {g:L.r[lv],ty:.4,r:.45,nr:.1}});
  K.order(T,function(k,g,fin){K.go([[0,1.7+(levels[k]+1)*gap*.55,1.6]],.8,fin)});
});

/* II.19 and II.20: the ladder of love, five rungs each */
function loveLadder(start){return function(K,D,sp,q,st,r){
  K.cavern(10);var gap=.8,L=ladder(q,st,0,-1.6,5,gap);var top=D.glow(10);top.position.set(0,5.4,-1.6);top.material.opacity=start?.5:.15;st.add(top);
  K.order(rungTargets(L,.4),function(k,g,fin){top.material.opacity=Math.min(1,top.material.opacity+.1);climb(K,L,k,gap,1.6,fin)})}}
X.S('dn34',{fog:.05,z:4.6,pitch:.25},loveLadder(false));
X.S('dn35',{fog:.03,z:4.6,pitch:.3},loveLadder(true));

/* II.21: dress the figure in the white tunic, the green coat and the red toga */
X.S('dn36',{fog:.035,z:5.4},function(K,D,sp,q,st,r){
  K.hall(6,12,-1);var fig=q.f(st,0,-3,1.1,0);var clo=[['p',-2.2],['c',0],['d',2.2]];var T=[];
  clo.forEach(function(c,n){var rack=q.G();rack.position.set(c[1],0,-1.6);st.add(rack);q.c(rack,.04,.04,1.6,0,.8,0,'w');var g=q.k(rack,.4,1,0,1.1,0,c[0]);rack.g=g;T.push({g:rack,hy:1.1,ty:2.1,r:.6})});
  K.order(T,function(n,g,fin){D.tween(1,function(e){g.position.z=-1.6-e*1.4;g.position.x=clo[n][1]*(1-e)},function(){st.remove(g);q.k(st,.42+n*.06,1.3-n*.15,0,1.2+n*.08,-3,clo[n][0]);fin()})});
});

/* II.22: a bird in a cage; break the three bars and let it fly */
X.S('dn37',{fog:.035,z:5.4},function(K,D,sp,q,st,r){
  K.court(8,12,-2);var cg=q.G();cg.position.set(0,1.4,-3);st.add(cg);q.c(cg,.8,.8,.06,0,-.6,0,'w');q.c(cg,.8,.8,.06,0,.8,0,'w');
  var bird=q.G();cg.add(bird);q.s(bird,.16,0,-.2,0,'p',1,.8,1.4);q.k(bird,.06,.14,0,-.2,.24,'g',PI/2);
  var bars=[];for(var i=0;i<3;i++){var a=-PI/2+(i-1)*.5,b=q.b(cg,.05,1.4,.05,Math.cos(a)*.8,.1,-Math.sin(a)*.8,'d');bars.push(b)}
  var broke=0;bars.forEach(function(b,n){K.strike(n,b,{hp:2,ty:.8,r:.35,nr:.1},null,function(){D.tween(.6,function(e){b.position.y-=.03;b.rotation.z+=.1},function(){cg.remove(b)});if(++broke===3)fly()})});
  function fly(){K.tap(3,bird,{ty:.5,r:.4},function(fin){D.tween(2.2,function(e){bird.position.set(e*1.2,-.2+e*4,e*.8);bird.rotation.z=Math.sin(e*30)*.3},fin)})}
});

/* II.23: a hidden inner chamber; shadows press at the door; turn them away and close it */
X.S('dn38',{fog:.05,z:5.4},function(K,D,sp,q,st,r){
  K.cavern(7);var door=D.arch(1.8);door.position.set(0,0,-.4);door.rotation.y=PI;st.add(door);var lf=q.b(door,1.6,2.4,.08,1.6,1.2,0,'w');
  var core=D.glow(6);core.position.set(0,1.4,-3.4);core.material.opacity=.6;st.add(core);
  var sh=[];[-1,1].forEach(function(sd,n){var g=q.G();g.position.set(sd*.9,1.2,1.4);st.add(g);q.s(g,.5,0,0,0,'n',1,1.8,.6);sh.push(g);
    K.ups.push(function(t){g.position.x=sd*.9+Math.sin(t*2+n)*.15});
    K.strike(n,g,{hp:2,ty:1.4,r:.6},function(f){g.scale.setScalar(1-f*.6)},function(){D.tween(.6,function(e){g.position.z=1.4+e*3},function(){st.remove(g)});if(++gone===2)shut()})});
  var gone=0;function shut(){K.tap(2,door,{hy:1.2,ty:2.6,r:1},function(fin){D.tween(1,function(e){lf.position.x=1.6-e*1.6});D.tween(1.5,function(e){core.material.opacity=.6+e*.4});D.tone(160,.6);fin()})}
});

/* II.24: two houses with ringing bells; still each bell until both are quiet under the stars */
X.S('dn39',{fog:.035,z:6.4},function(K,D,sp,q,st,r){
  K.plain();var H=[];[-2.4,2.4].forEach(function(x,n){var h=q.G();h.position.set(x,0,-4);st.add(h);q.b(h,2.2,2,1.8,0,1,0,'s');q.py(h,1.8,1,0,2.5,0,'w');
    var bell=q.G();bell.position.set(0,3.4,0);h.add(bell);q.k(bell,.28,.4,0,0,0,'g');h.bell=bell;H.push(h);
    K.ups.push(function(t){if(bell.ring!==false)bell.rotation.z=Math.sin(t*9+n)*.5});
    K.strike(n,bell,{hp:2,ty:.7,r:.5},function(f){},function(){bell.ring=false;bell.rotation.z=0;D.tone(300-n*80,.8);if(++quiet===2)sky()})});
  var quiet=0,stars=D.glow(26);stars.position.set(0,7,-12);stars.material.opacity=0;st.add(stars);var mark=q.G();mark.position.set(0,3.6,-6);st.add(mark);q.s(mark,.18,0,0,0,'l');
  function sky(){K.tap(2,mark,{ty:.5,r:.8},function(fin){D.tween(2,function(e){stars.material.opacity=e*.7;K.fogT=.035-.02*e});fin()})}
});

/* II.25: walk on with no light but the heart's; then the page runs out */
X.S('dn40',{fog:.06,z:6,finDelay:3},function(K,D,sp,q,st,r){
  K.plain();q.b(r,1.4,.04,24,0,.02,-6,'s');var heart=D.glow(4);heart.position.set(0,1.3,3.6);heart.material.opacity=.8;st.add(heart);
  var M=[];[-1,-5,-9].forEach(function(z){var g=q.G();g.position.set(0,.05,z);st.add(g);q.b(g,.5,.04,.8,0,0,0,'p');M.push({g:g,ty:.6,r:.6})});
  var page=q.G();page.position.set(0,1.6,-13);st.add(page);q.b(page,1.6,2,.04,0,0,0,'p');M.push({g:page,ty:1.4,r:.9,hy:0});
  K.order(M,function(n,g,fin){if(n<3){K.go([[0,1.7,[2,-2,-6][n]]],1.8,function(){heart.position.z=[2,-2,-6][n]-2.4;fin()})}
    else{D.tween(1.6,function(e){page.scale.y=1-e*.95});X.card&&X.card('The Dark Night ends here','John stopped writing at the third verse.',3200);fin()}});
});
})();
