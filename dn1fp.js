/* The Dark Night: the poem, the prologue and Book One (the night of sense). One scene per lantern, each built on John's own image. */
(function(){
'use strict';
var X=window.ASCENT;if(!X||!X.S)return;
var PI=Math.PI;
function lampPost(K,q,p,x,z,h,on){var g=q.G();g.position.set(x,0,z);p.add(g);q.c(g,.06,.08,h,0,h/2,0,'w');q.b(g,.5,.06,.5,0,h,0,'d');g.c=K.candle(g,0,h+.03,0,on);return g}
function token(q,m,r){var g=q.G();q.s(g,r||.3,0,0,0,m||'p');return g}

/* The poem: eight lamps along a night path, one for each verse; at the end a soft light waits among the lilies. */
X.S('dn0',{fog:.06,z:6,yawMax:1,finDelay:3.2},function(K,D,sp,q,st,r){
  K.plain();q.b(r,1.6,.04,30,0,.02,-9,'s');
  var house=D.asset('house');house.position.set(0,0,9.5);house.rotation.y=PI;st.add(house);
  var L=[],i;for(i=0;i<8;i++){var z=2-i*2.6,x=(i%2?1.3:-1.3);L.push({g:lampPost(K,q,st,x,z,1.3,false),ty:2.3,r:.8,hy:1.3})}
  var bel=D.glow(9,0xffffff);bel.position.set(0,2,-21);bel.material.opacity=0;st.add(bel);
  for(i=0;i<9;i++){var li=q.G();li.position.set((i%3-1)*1.1,0,-20+Math.floor(i/3)*.9);st.add(li);q.c(li,.02,.02,.7,0,.35,0,'p');q.k(li,.12,.3,0,.8,0,'l',PI)}
  K.order(L,function(n,g,fin){g.c.set(true);D.burst(D.wpos(g.c),0xffffff);var z=2-n*2.6;
    K.go([[0,1.7,z+2.6]],1.4,function(){K.fogT=.06-n*.005;if(n===7)D.tween(2.2,function(e){bel.material.opacity=e*.8});fin()})});
});

/* Prologue: two gates. My letting go (the Ascent) and God's work in me (the Dark Night). */
X.S('dn1',{fog:.035,z:6},function(K,D,sp,q,st,r){
  K.court(9,14,-2);
  var a=D.arch(2.2);a.position.set(-2.4,0,-3);st.add(a);var b=D.arch(2.2);b.position.set(2.4,0,-3);st.add(b);
  var dk=q.b(a,1.9,2.6,.04,0,1.3,-.1,'d');var lt=D.glow(5);lt.position.set(0,1.6,-.6);lt.material.opacity=.35;b.add(lt);q.b(b,1.9,2.6,.04,0,1.3,-.1,'n');
  K.sort([{g:a,hy:1.3,fy:1.2,ty:3.3,r:1.2,got:function(c){st.remove(c);D.tone(330,.2)}},{g:b,hy:1.3,fy:1.2,ty:3.3,r:1.2,got:function(c){st.remove(c);lt.material.opacity=Math.min(1,lt.material.opacity+.13)}}],
    function(it){return it[1]?K.orb(.8):token(q,'s',.28)});
});

/* I.1: the mother who nurses her child, then sets it down to walk. */
X.S('dn2',{fog:.04,z:5.5},function(K,D,sp,q,st,r){
  K.hall(5,14,-1);var warm=D.glow(10,0xffffff);warm.position.set(0,3,-4);warm.material.opacity=.5;st.add(warm);
  var cr=q.G();cr.position.set(0,0,-3);st.add(cr);q.t(cr,.7,.06,0,.35,0,'w',0,0,PI);q.b(cr,1.5,.06,.3,0,.08,0,'w',0,.12);q.b(cr,1.2,.5,.7,0,.55,0,'w');q.b(cr,1.05,.1,.55,0,.82,0,'p');
  var babe=q.G();babe.position.set(0,.95,0);cr.add(babe);q.s(babe,.14,-.25,0,0,'k');q.s(babe,.2,.08,0,0,'p',.6,1.4);
  var bk=K.panel(st,-2.2,1.2,-3.2,.7,.5,'p',.5);var pen=q.G();pen.position.set(-1.2,0,-3.6);st.add(pen);q.c(pen,.1,.1,1.2,0,.6,0,'w');q.t(pen,.18,.04,0,1.3,0,'w');
  var cup=q.G();cup.position.set(1.4,0,-3.4);st.add(cup);q.c(cup,.08,.25,.1,0,.05,0,'g');q.c(cup,.05,.05,.7,0,.4,0,'g');q.c(cup,.25,.1,.3,0,.85,0,'g');
  var fig=null;
  K.order([{g:bk,ty:1,r:.6},{g:pen,hy:.8,ty:1.9,r:.6},{g:cup,hy:.8,ty:1.6,r:.6},{g:cr,hy:.7,ty:1.8,r:.9}],function(n,g,fin){
    if(n<3){D.burst(D.wpos(g),0xffffff);fin();return}
    D.tween(2,function(e){warm.material.opacity=.5*(1-e)+.15});babe.visible=false;fig=q.f(st,0,-2.3,.55,0);
    D.tween(2.4,function(e){fig.position.z=-2.3+e*1.6;fig.rotation.z=Math.sin(e*18)*.06},fin)});
});

/* I.2: the peacock of spiritual pride and the bowed figure of the humble. */
X.S('dn3',{fog:.035,z:6},function(K,D,sp,q,st,r){
  K.court(9,14,-2);
  var pk=q.G();pk.position.set(-2.4,0,-3);st.add(pk);q.s(pk,.35,0,.7,0,'g',1.2);q.s(pk,.16,0,1.25,.15,'g');
  for(var i=0;i<9;i++){var a=(i-4)*.32,f=q.b(pk,.08,1.8,.04,Math.sin(a)*.9,1.4+Math.cos(a)*.9-.9,-.3,'g',0,-a);q.s(pk,.12,Math.sin(a)*1.75,1.4+Math.cos(a)*1.75-.9,-.3,'d')}
  var hm=q.G();hm.position.set(2.4,0,-3);st.add(hm);var f=q.f(hm,0,0,1.1,0);f.rotation.x=.45;f.position.z=.3;var gl=D.glow(4);gl.position.y=1.8;gl.material.opacity=.15;hm.add(gl);
  K.sort([{g:pk,hy:1.2,fy:1.4,ty:3.2,r:1.3,got:function(c){st.remove(c);pk.scale.multiplyScalar(.9)}},{g:hm,hy:.9,fy:1,ty:2.6,r:1.1,got:function(c){st.remove(c);gl.material.opacity+=.15}}]);
});

/* I.3: an altar heaped with holy things; clear them until the palm-leaf cross is left. */
X.S('dn4',{fog:.04,z:5.6},function(K,D,sp,q,st,r){
  K.hall(5,14,-1);
  var al=q.G();al.position.set(0,0,-3);st.add(al);q.b(al,3.4,1,1.2,0,.5,0,'s');q.b(al,3.6,.08,1.3,0,1.04,0,'p');
  var bk=q.G();bk.position.set(-1.3,1.1,0);al.add(bk);q.b(bk,.5,.12,.38,0,.06,0,'w');q.b(bk,.48,.12,.36,.02,.18,0,'p',.2);
  var ro=q.G();ro.position.set(-.65,1.12,.2);al.add(ro);q.t(ro,.24,.03,0,0,0,'g',PI/2);q.c(ro,.015,.015,.2,0,0,.34,'g',0,PI/2);
  var sc=q.G();sc.position.set(.7,1.08,-.1);al.add(sc);q.b(sc,.08,.9,.06,0,.45,0,'g');q.b(sc,.45,.08,.06,0,.65,0,'g');q.b(sc,.3,.1,.3,0,.05,0,'g');
  var sr=q.G();sr.position.set(1.35,1.1,.15);al.add(sr);q.c(sr,.08,.08,.5,0,.05,0,'p',PI/2);
  var pc=q.G();pc.position.set(0,1.08,.1);al.add(pc);q.b(pc,.05,.6,.03,0,.3,0,'c');q.b(pc,.3,.05,.03,0,.42,0,'c');q.c(pc,.012,.012,.12,0,.42,.03,'d',0,PI/2);var pg=D.glow(2.5);pg.position.y=.4;pg.material.opacity=0;pc.add(pg);
  var left=4,O=[bk,ro,sc,sr];
  O.forEach(function(g,n){K.strike(n,g,{hp:1,ty:.8,r:.45,nr:.1},null,function(){D.tween(.6,function(e){g.position.y=1.1+e*.6;g.scale.setScalar(1-e)},function(){al.remove(g)});
    left--;if(!left)K.tap(4,pc,{ty:1.1,r:.5,hy:.3},function(fin){D.tween(1.5,function(e){pg.material.opacity=e*.9});fin()})})});
});

/* I.4: the steady lamp and the smoking lamp: a friendship tested by its fruit. */
X.S('dn5',{fog:.035,z:6},function(K,D,sp,q,st,r){
  K.court(9,14,-2);
  var a=lampPost(K,q,st,-2.2,-3,1.5,true);var ga=D.glow(5);ga.position.y=2;ga.material.opacity=.3;a.add(ga);
  var b=lampPost(K,q,st,2.2,-3,1.5,true);var sm=q.G();sm.position.y=2.2;b.add(sm);for(var i=0;i<4;i++)q.s(sm,.16+i*.05,Math.sin(i)*.15,i*.32,0,'d',1);
  K.ups.push(function(t){sm.children.forEach(function(c,k){c.position.x=Math.sin(t*1.3+k)*.2})});
  K.sort([{g:a,hy:1.6,fy:1.8,ty:3,r:1,got:function(c){st.remove(c);ga.material.opacity+=.12}},{g:b,hy:1.6,fy:1.8,ty:3,r:1,got:function(c){st.remove(c);sm.scale.multiplyScalar(.85)}}]);
});

/* I.5: three fires of spiritual anger, cooled by meekness. */
X.S('dn6',{fog:.04,z:6},function(K,D,sp,q,st,r){
  K.court(10,14,-2);
  [-2.4,0,2.4].forEach(function(x,n){var b=K.brazier(st,x,-3+(n===1?-.6:0),2.6);b.set(true);
    K.strike(n,b,{hp:3,ty:3.2,r:.9,hy:1.6},function(f){b.fl.scale.setScalar(2.6*(1-f*.8)+.01);b.gl.material.opacity=1-f*.7},function(){b.set(false);var c=K.candle(b,0,1.7,0,true);c.scale.setScalar(.8)})});
});

/* I.6: a table of sweets and a plain loaf: seeking the taste or seeking God. */
X.S('dn7',{fog:.035,z:6},function(K,D,sp,q,st,r){
  K.hall(6,14,-1);
  var fe=D.asset('feast');fe.position.set(-2.2,0,-3);fe.rotation.y=.4;st.add(fe);
  var lf=q.G();lf.position.set(2.2,0,-3);st.add(lf);q.c(lf,.35,.45,1,0,.5,0,'s');q.c(lf,.5,.5,.06,0,1.03,0,'p');q.s(lf,.32,0,1.2,0,'c',.6,1.3);
  var gl=D.glow(4);gl.position.y=1.6;gl.material.opacity=.15;lf.add(gl);
  K.sort([{g:fe,hy:1,fy:1.1,ty:2.6,r:1.2,got:function(c){st.remove(c);D.tone(160,.2)}},{g:lf,hy:1.1,fy:1.3,ty:2.5,r:.9,got:function(c){st.remove(c);gl.material.opacity+=.17}}],
    function(it){var g=q.G();q.s(g,.22,0,0,0,'g');q.k(g,.12,.18,0,.22,0,'p');return g});
});

/* I.7: envy looks sideways at others; sloth sinks into a soft couch. */
X.S('dn8',{fog:.035,z:6},function(K,D,sp,q,st,r){
  K.court(9,14,-2);
  var mr=q.G();mr.position.set(-2.3,0,-3);mr.rotation.y=.5;st.add(mr);q.c(mr,.06,.08,1.4,0,.7,0,'w');q.c(mr,.6,.6,.05,0,1.9,0,'g',0,PI/2);q.c(mr,.52,.52,.06,0,1.9,.01,'a',0,PI/2);
  for(var i=0;i<3;i++)q.f(st,-3.6+i*.5,-5.3-i*.2,.6+i*.1,.6);
  var co=q.G();co.position.set(2.3,0,-3);co.rotation.y=-.4;st.add(co);q.b(co,2,.45,.9,0,.4,0,'c');q.b(co,2,.8,.25,0,.85,-.35,'c');q.b(co,.25,.6,.9,-.95,.65,0,'c');q.b(co,.25,.6,.9,.95,.65,0,'c');q.b(co,1.7,.15,.7,0,.68,.05,'p');
  K.sort([{g:mr,hy:1.6,fy:1.6,ty:2.9,r:1,got:function(c){st.remove(c)}},{g:co,hy:.7,fy:1,ty:2.1,r:1.2,got:function(c){st.remove(c)}}]);
});

/* I.8: the sweet lamp gutters out, and the soul walks on in the dark toward a light it cannot yet see. */
X.S('dn9',{fog:.05,z:6,finDelay:2.6},function(K,D,sp,q,st,r){
  K.hall(4.4,26,-6);
  var lp=lampPost(K,q,st,-1.2,2,1.3,true);var big=D.glow(8);big.position.y=1.8;big.material.opacity=.5;lp.add(big);
  var bk=K.panel(st,1.2,1.1,1,.7,.5,'p',-.4);
  var st1=q.G();st1.position.set(0,.02,-3);st.add(st1);q.b(st1,.5,.04,.8,-.2,0,0,'p');q.b(st1,.5,.04,.8,.2,0,-.9,'p');
  var far=D.glow(6);far.position.set(0,2,-15);far.material.opacity=.05;st.add(far);var fh=q.G();fh.position.set(0,1.6,-15);st.add(fh);q.s(fh,.3,0,0,0,'l');
  K.order([{g:lp,hy:1.4,ty:2.4,r:.8},{g:bk,ty:.9,r:.6},{g:st1,ty:.8,r:.8},{g:fh,ty:1,r:1}],function(n,g,fin){
    if(n===0){lp.c.set(false);D.tween(1.2,function(e){big.material.opacity=.5*(1-e)});K.fogT=.08;D.tone(110,.6);fin()}
    else if(n===1){D.tween(.6,function(e){bk.rotation.x=-e*1.4});fin()}
    else if(n===2)K.go([[0,1.7,-1]],2.4,fin);
    else{D.tween(2,function(e){far.material.opacity=.05+e*.75});K.go([[0,1.7,-9]],3,function(){K.fogT=.04;fin()})}});
});

/* I.9: three true signs and two false ones, tested at the lamp. */
X.S('dn10',{fog:.04,z:6},function(K,D,sp,q,st,r){
  K.court(9,14,-2);
  var lt=q.G();lt.position.set(-2.2,0,-3);st.add(lt);q.c(lt,.5,.6,.9,0,.45,0,'s');var lc=K.candle(lt,0,.92,0,true);var lg=D.glow(5);lg.position.y=1.6;lg.material.opacity=.3;lt.add(lg);
  var pit=q.G();pit.position.set(2.2,0,-3);st.add(pit);q.t(pit,.8,.14,0,.08,0,'s',PI/2);q.c(pit,.75,.75,.02,0,.03,0,'n');
  K.sort([{g:lt,hy:1,fy:1.3,ty:2.5,r:1,got:function(c){c.position.copy(D.wpos(lt));c.position.y=1.1;c.position.x+=(Math.random()-.5)*.8;c.scale.setScalar(.35);lg.material.opacity+=.2}},
          {g:pit,hy:.3,fy:.4,ty:1.4,r:1,got:function(c){D.tween(.5,function(e){c.position.y=.3-e*.8},function(){st.remove(c)})}}],
    function(){return token(q,'s',.3)});
});

/* I.10: a pool stirred by restless efforts; stilled, it holds the light. */
X.S('dn11',{fog:.04,z:6,pitch:-.06},function(K,D,sp,q,st,r){
  K.cavern(9);
  var pool=q.G();pool.position.set(0,0,-3);st.add(pool);q.t(pool,2.2,.2,0,.12,0,'s',PI/2);var w=q.c(pool,2.1,2.1,.04,0,.1,0,'a');
  var moon=D.glow(6);moon.position.set(0,.2,-3);moon.material.opacity=0;st.add(moon);var mo=D.glow(5);mo.position.set(0,5,-7);mo.material.opacity=.4;st.add(mo);
  var still=0;
  [[-1.2,-2.6],[1.2,-2.6],[0,-4.1]].forEach(function(p,n){var rg=q.G();rg.position.set(p[0],.15,p[1]);st.add(rg);var rs=[];for(var k=0;k<3;k++)rs.push(q.t(rg,.2+k*.18,.025,0,0,0,'p',PI/2));
    K.ups.push(function(t){rs.forEach(function(x,k){var s=1+((t*.8+k/3)%1)*.8;x.scale.set(s,s,1)})});
    K.strike(n,rg,{hp:2,ty:1,r:.7},function(f){rg.scale.setScalar(1-f*.7)},function(){st.remove(rg);still++;moon.material.opacity=still/3*.8;w.material=q.M.a})});
});

/* I.11: cold ashes; breathe on them until the hidden ember catches. */
X.S('dn12',{fog:.045,z:5.4},function(K,D,sp,q,st,r){
  K.hall(4.6,12,-1);
  var hr=q.G();hr.position.set(0,0,-3);st.add(hr);q.b(hr,2.6,.3,1.4,0,.15,0,'s');q.b(hr,2.6,2.4,.3,0,1.2,-.7,'s');q.s(hr,.65,0,.3,0,'d',.35,1.3);
  var fl=q.fl(hr,0,.45,0,.01),gl=D.glow(6);gl.position.y=1;gl.material.opacity=0;hr.add(gl);
  var stage=0;
  function step(n){if(n>2)return;K.strike(n,hr,{hp:3,ty:2.2,r:.9,hy:.4},function(f){var v=(n+f)/3;fl.scale.setScalar(.01+v*2.2);gl.material.opacity=v*.9},function(){step(n+1)})}
  step(0);
});

/* I.12: Moses at the burning bush: take off the sandals on holy ground. */
X.S('dn13',{fog:.035,z:6.2},function(K,D,sp,q,st,r){
  K.plain();
  var bu=D.asset('bush');bu.position.set(0,0,-4);bu.scale.setScalar(1.6);st.add(bu);var bf=q.fl(st,0,1.5,-4,3);var bg=D.glow(9);bg.position.set(0,2.2,-4);bg.material.opacity=.4;st.add(bg);
  var bowl=q.G();bowl.position.set(-2.2,0,-1.6);st.add(bowl);q.c(bowl,.35,.22,.3,0,.15,0,'c');q.c(bowl,.3,.3,.02,0,.3,0,'n');
  var sa=q.G();sa.position.set(0,.03,-1.4);st.add(sa);[-.2,.2].forEach(function(x){q.b(sa,.18,.04,.5,x,0,0,'w');q.b(sa,.2,.04,.04,x,.05,-.05,'d')});
  var kn=q.G();kn.position.set(0,0,-2.8);st.add(kn);q.b(kn,1.2,.05,.6,0,.02,0,'p');
  var ppl=q.G();ppl.position.set(2.4,0,-2);st.add(ppl);for(var i=0;i<3;i++)q.f(ppl,i*.5-.5,-i*.3,.8,-.6);
  K.order([{g:bowl,hy:.3,ty:1,r:.6},{g:sa,ty:.7,r:.6},{g:kn,ty:.7,r:.7},{g:ppl,hy:.6,ty:1.9,r:1}],function(n,g,fin){
    if(n===1)D.tween(.8,function(e){sa.position.x=-1.2*e;sa.position.z=-1.4+e*.6},fin);
    else if(n===2)K.go([[0,1.15,-.6]],1.6,function(){bg.material.opacity=.9;fin()});
    else{D.burst(D.wpos(g),0xffffff);fin()}});
});

/* I.13: seven chains bind a lantern; break each and its light gets out. */
X.S('dn14',{fog:.04,z:6.4},function(K,D,sp,q,st,r){
  K.rotunda(5.5,7,3.6);
  var ln=q.G();ln.position.set(0,1.6,-2);st.add(ln);q.b(ln,.6,.8,.6,0,0,0,'g');q.py(ln,.55,.4,0,.6,0,'d');var c=K.candle(ln,0,-.25,0,true);var gl=D.glow(9);gl.material.opacity=.08;ln.add(gl);
  for(var n=0;n<7;n++)(function(n){var a=-PI*.85+n*PI*1.7/6,x=Math.cos(a)*2.6,y=1.6+Math.sin(a)*1.1+.3,z=-2+.4;
    var post=q.G();post.position.set(x,y,z);st.add(post);q.s(post,.12,0,0,0,'d');
    var ch=K.rope(st,new THREE_V(x,y,z),new THREE_V(0,1.6,-2),.05,'d');var link=q.G();link.position.set(x*.55,y*.55+1.6*.45,z*.55-2*.45);st.add(link);q.t(link,.14,.04,0,0,0,'d',0,a);
    K.strike(n,link,{hp:2,ty:.6,r:.45,nr:.1},null,function(){ch.visible=false;D.tween(.9,function(e){link.position.y-=e*.08;link.rotation.z+=.2},function(){st.remove(link)});gl.material.opacity=.08+(K.doneN+1)/7*.85})})(n);
  function THREE_V(x,y,z){return K.v(x,y,z)}
});

/* I.14: out of the stilled house, across the yard through three gusts, to the gate. */
X.S('dn15',{fog:.05,z:6,finDelay:2.8},function(K,D,sp,q,st,r){
  K.plain();q.b(r,1.4,.04,16,0,.02,-3,'s');
  var ho=D.asset('house');ho.position.set(0,0,9);ho.rotation.y=PI;st.add(ho);
  var gate=D.arch(2);gate.position.set(0,0,-9);st.add(gate);var lf=q.b(gate,1.7,2.3,.08,0,1.15,0,'w');var beyond=D.glow(10);beyond.position.set(0,2,-13);beyond.material.opacity=.15;st.add(beyond);
  var G=[];[[-1.2,0],[1.3,-3],[-.6,-6]].forEach(function(p,n){var g=q.G();g.position.set(p[0],1.1,p[1]);st.add(g);var rs=[];for(var k=0;k<4;k++){rs.push(q.t(g,.3+k*.12,.025,0,k*.15-.25,0,'p',PI/2))}
    K.ups.push(function(t){g.rotation.y=t*4+n;rs.forEach(function(x,k){x.position.x=Math.sin(t*3+k)*.1})});G.push(g);
    K.strike(n,g,{hp:3,regen:.4,ty:1.4,r:.8},function(f){g.scale.setScalar(1-f*.7)},function(){st.remove(g);K.go([[0,1.7,p[1]+1.2]],1.4);if(++calm===3)openGate()})});
  var calm=0;function openGate(){K.tap(3,gate,{hy:1.2,ty:3,r:1.1},function(fin){D.tween(1,function(e){lf.position.x=e*1.7;beyond.material.opacity=.15+e*.8});K.go([[0,1.7,-10]],2.6,fin)})}
});
})();
