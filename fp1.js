/* First-person scenes for the foot of the mountain, the prologue, and Book One, chapters 1 to 7. */
(function(){
'use strict';
var X=window.ASCENT;if(!X||!X.fp)return;
var MECH=X.MECH;

/* The foot of the mountain: three roads, and you walk the one you choose. */
MECH.footfp=function(D,sp){
  var K=X.fp(D,sp,{fog:.028,z:8,total:1,pitch:.1,finDelay:.6}),q=K.q,r=K.room,st=K.st,busy=false,i;
  K.ground(90,90,-20);
  q.k(r,17,27,0,13.5,-40,'s');q.k(r,9,12,-16,6,-34,'s');q.k(r,10,14,17,7,-36,'s');
  q.b(r,.9,.05,22,0,.03,-6,'p');q.b(r,3.4,.05,16,-5.5,.03,-3,'d',.55);q.b(r,3.4,.05,16,5.5,.03,-3,'d',-.55);
  var tr=D.asset('treasure');tr.position.set(-8.5,0,-6);tr.scale.setScalar(1.4);r.add(tr);
  var tb=D.asset('table');tb.position.set(-11,0,-10);tb.scale.setScalar(1.4);r.add(tb);
  var hp=D.asset('harp');hp.position.set(8.5,0,-6);hp.scale.setScalar(1.4);r.add(hp);
  for(i=0;i<5;i++){var o=D.glow(2.2);o.position.set(7+i*1.2,2+((i*7)%3)*.8,-8-i);st.add(o)}
  var paths=[[[0,1.7,8],[-3,1.7,2],[-7,1.7,-4],[-9,1.7,-8],[-6,1.7,-3],[-2,1.7,4],[0,1.7,8]],[[0,1.7,8],[0,1.9,0],[0,3.5,-9],[0,8,-18]],[[0,1.7,8],[3,1.7,2],[7,1.7,-4],[9,1.7,-8],[6,1.7,-3],[2,1.7,4],[0,1.7,8]]];
  [[-2.6,3.4],[0,2.6],[2.6,3.4]].forEach(function(p,n){
    var g=q.G();g.position.set(p[0],0,p[1]);st.add(g);q.c(g,.07,.09,2,0,1,0,'w');q.b(g,1.1,.3,.06,0,1.8,0,'w',(1-n)*.5);
    var it=sp.items[n],tg=K.tag(it[0],g,2.15);
    K.target(g,.8,.12,function(t){
      if(busy)return;busy=true;D.tone(300,.15);paths[n][0]=[K.pos.x,1.7,K.pos.z];
      if(it[2])K.walkTo(paths[n],4.2,function(){D.say(it[0],it[1]);D.light(1);K.finish()});
      else{paths[n][paths[n].length-1]=[K.pos.x,1.7,K.pos.z];K.walkTo(paths[n],5.5,function(){busy=false;K.yawTo=0;K.kill(t);tg.visible=false;D.say(it[0],it[1],true)})}
    },1.2);
  });
};

/* The prologue: a soul in dryness, surrounded by voices. Send the misleading ones away. */
MECH.prologuefp=function(D,sp){
  var K=X.fp(D,sp,{fog:.05,z:5.2}),q=K.q,st=K.st;K.hall(4,14,0);
  var d=D.asset('desk');d.position.set(0,0,-4.6);K.room.add(d);var soul=q.f(st,0,-2,1.3,0);soul.rotation.x=.25;
  sp.items.forEach(function(it,n){
    var a=(n-2)*.62,x=Math.sin(a)*3.1,z=-2-Math.cos(a)*1.9,f=q.f(st,x,z,1.45,0),tg=K.tag(it[0],f,2.5);
    K.target(f,.9,.11,function(t){
      K.kill(t);tg.visible=false;var sx=f.position.x,sz=f.position.z;
      if(it[1]===1){D.tone(200,.2);D.tween(1.4,function(e){f.position.set(sx+Math.sin(a)*e*5,0,sz-e*5);f.rotation.y=e*2.6},function(){st.remove(f)})}
      else{D.tone(520,.3);var gl=D.glow(4);gl.position.y=1.9;f.add(gl);D.tween(.9,function(e){f.position.set(sx*(1-e*.45),0,sz+e*.5)})}
      K.complete(n,it[2]);
    },.8);
  });
};

/* Chapter 1: the house at night. All four of the household must be asleep at once before you can leave. */
MECH.housefp=function(D,sp){
  var K=X.fp(D,sp,{fog:.045,z:6,total:99,finDelay:.4}),q=K.q,st=K.st,r=K.room,asleep=[0,0,0,0],told=[0,0,0,0],out=false,i;K.hall(4.4,18,-1);
  var door=q.b(st,1.6,2.8,.12,0,1.4,-9.8,'w');q.b(r,.25,3,.3,-.95,1.5,-9.85,'s');q.b(r,.25,3,.3,.95,1.5,-9.85,'s');q.b(r,2.2,.3,.3,0,3.1,-9.85,'s');
  q.b(r,1.6,2.8,.05,0,1.4,-9.95,'n');for(i=0;i<8;i++)q.s(r,.04,-.6+((i*37)%12)*.1,.6+((i*53)%20)*.1,-9.9,'l');
  sp.items.forEach(function(it,n){
    var sd=n%2?1:-1,bz=1.5-Math.floor(n/2)*4.5,bx=sd*3.1,ph=n*1.6,wake=0;
    q.b(r,1.2,.4,2.4,bx,.2,bz,'w');q.b(r,1.1,.15,.6,bx,.48,bz-.8,'p');
    var f=q.f(st,0,0,1.4,0),lamp=q.fl(f,.35,1.05,.2,.7),tg=K.tag(it[0],f,2.45);
    K.target(f,.9,.11,function(){
      if(asleep[n])return;asleep[n]=1;wake=10;tg.visible=false;lamp.setOn(false);D.tone(330-n*30,.25);
      if(!told[n]){told[n]=1;D.say(it[0],it[1])}
      var sum=asleep[0]+asleep[1]+asleep[2]+asleep[3];D.light(.1+.12*(4-sum));
      if(sum===4&&!out){
        out=true;D.light(.9);D.tween(1.2,function(e){door.rotation.y=-e*1.4;door.position.x=-e*.75;door.position.z=-9.8+e*.6});
        K.walkTo([[K.pos.x,1.7,K.pos.z],[0,1.7,-6],[0,1.7,-11.5]],4,function(){K.finish()});
      }
    },.8);
    K.ups.push(function(tm,dt){
      if(asleep[n]){f.position.set(bx,.55,bz);f.rotation.set(-1.45,0,0);if(!out){wake-=dt;if(wake<=0){asleep[n]=0;tg.visible=true;lamp.setOn(true);D.tone(180,.2,0,.03)}}}
      else{f.rotation.set(0,0,0);f.position.set(sd*1.2+Math.sin(tm*.7+ph)*1.3,0,bz-.5+Math.cos(tm*.5+ph)*1.6)}
    });
  });
};

/* Chapter 2: walk through the three parts of the night. */
MECH.nightfp=function(D,sp){
  var K=X.fp(D,sp,{fog:.035,z:8,yawMax:.7}),q=K.q,st=K.st,cur=0,glow=D.glow(16),fogT=.035,fogs=[.07,.11,.02],lights=[.12,0,1];K.hall(4,52,-14);
  glow.position.set(0,3,-38);glow.material.opacity=0;st.add(glow);
  sp.items.forEach(function(it,n){
    var z=1-n*11,g=q.G();g.position.set(0,0,z);st.add(g);q.b(g,.7,4,.7,-1.7,2,0,'s');q.b(g,.7,4,.7,1.7,2,0,'s');q.t(g,1.7,.3,0,4,0,'s',0,0,Math.PI);
    var tg=K.tag(it[0],g,5.9);
    K.target(g,1.9,.16,function(t){
      if(n!==cur)return;cur++;K.kill(t);tg.visible=false;D.tone(300+n*60,.3);
      K.walkTo([[K.pos.x,1.7,K.pos.z],[0,1.7,z+2],[0,1.7,z-5]],3.2,function(){fogT=fogs[n];if(n===2)glow.material.opacity=1;K.complete(n);D.light(lights[n])});
    },2);
  });
  K.ups.push(function(tm,dt){K.fog.density+=(fogT-K.fog.density)*Math.min(1,dt*1.5)});
};

/* Chapter 3: a laden table and a begging craving. Three things you could do about it. */
MECH.tablefp=function(D,sp){
  var K=X.fp(D,sp,{fog:.04,z:5.5,total:1,finDelay:.8}),q=K.q,st=K.st,dark=0,calm=false;K.hall(4.4,16,-1);
  var tb=D.asset('table');tb.scale.setScalar(1.9);tb.position.set(0,0,-2.6);st.add(tb);
  var beast=q.G();beast.position.set(1.5,0,-.6);st.add(beast);
  q.s(beast,.5,0,.75,0,'d',.8,1.5,.8);q.s(beast,.3,.75,1.05,0,'d');q.k(beast,.12,.4,1.05,1,0,'d',-1.5708);q.k(beast,.08,.25,.65,1.35,.14,'d');q.k(beast,.08,.25,.65,1.35,-.14,'d');
  [[-.4,.2],[.4,.2],[-.4,-.2],[.4,-.2]].forEach(function(p){q.c(beast,.07,.07,.6,p[0],.3,p[1],'d')});q.c(beast,.04,.06,.7,-.85,.95,0,'d',.9);
  var bowl=q.G();bowl.position.set(2.5,0,.4);st.add(bowl);q.c(bowl,.42,.26,.25,0,.13,0,'c');q.s(bowl,.3,0,.26,0,'p',.4);
  var ham=q.G();ham.position.set(-2.6,0,.3);st.add(ham);q.b(ham,.5,.9,.5,0,.45,0,'s');q.c(ham,.05,.06,1.1,0,1.4,0,'w',.4);q.b(ham,.6,.28,.28,-.2,1.9,0,'d',0,.4);
  var bl=q.G();bl.position.set(-.9,0,1.2);st.add(bl);q.c(bl,.05,.06,1.5,0,.75,0,'w');q.b(bl,.7,.18,.05,0,1.45,0,'p');q.b(bl,.1,.5,.04,-.3,1.2,0,'p');q.b(bl,.1,.5,.04,.3,1.2,0,'p');
  var objs=[ham,bl,bowl],hy=[1.5,1.3,.3],ty=[2.4,1.95,.9];
  sp.items.forEach(function(it,n){
    var g=objs[n],tg=K.tag(it[0],g,ty[n]);
    K.target(g,.7,.12,function(t){
      K.kill(t);tg.visible=false;
      if(n===0){K.shake=1;D.tone(110,.4);D.tween(.5,function(e){tb.position.y=Math.sin(e*Math.PI)*.35});D.say(it[0],it[1],true)}
      else if(n===1){dark=1.6;D.tone(160,.5);D.say(it[0],it[1],true)}
      else{calm=true;D.tone(520,.4);D.tween(.8,function(e){bowl.position.x=2.5+e*2.5;beast.scale.y=1-e*.4});D.say(it[0],it[1]);D.light(1);K.finish()}
    },hy[n]);
  });
  K.ups.push(function(tm,dt){
    if(dark>0)dark-=dt;K.fog.density+=((dark>0?.6:.04)-K.fog.density)*Math.min(1,dt*6);
    if(!calm){beast.rotation.z=Math.sin(tm*6)*.08;beast.position.z=-.6+Math.sin(tm*3)*.15}
  });
};

/* Chapter 4: four dazzling lights that hide a greater one overhead. */
MECH.lightsfp=function(D,sp){
  var K=X.fp(D,sp,{fog:.03,z:7,pitch:.06,finDelay:2.4}),q=K.q,st=K.st,star=D.glow(6),up=0;
  K.ground(60,60,-8);[-1,1].forEach(function(sd){K.column(sd*6,2);K.column(sd*6,-6);q.b(K.room,.5,1,22,sd*7,.5,-5,'s')});q.b(K.room,14,1,.5,0,.5,-14,'s');
  star.position.set(0,16,-14);star.material.opacity=.05;st.add(star);
  sp.items.forEach(function(it,n){
    var a=(n-1.5)*.55,g=q.G();g.position.set(Math.sin(a)*5.5,0,-3.5-Math.cos(a)*3);st.add(g);
    q.c(g,.2,.5,1.3,0,.65,0,'s');q.c(g,.75,.35,.4,0,1.5,0,'d');var fl=q.fl(g,0,1.6,0,2),gl=D.glow(9);gl.position.y=2.2;g.add(gl);
    var tg=K.tag(it[0],g,3.6);
    K.hits(g,1,.13,2,.12,function(p){fl.scale.setScalar(2*(1-p*.6));gl.material.opacity=1-p*.7},function(){
      fl.setOn(false);gl.visible=false;tg.visible=false;K.complete(n);var k=K.doneN/4;star.material.opacity=.05+.95*k;star.scale.setScalar(6+22*k);if(K.doneN===4)up=1;
    },1.8);
  });
  K.ups.push(function(tm,dt){if(up)K.pitch+=(.75-K.pitch)*Math.min(1,dt*1.2)});
};

/* Chapter 5: Jacob's camp below Bethel. Clear four things before the climb to the altar. */
MECH.bethelfp=function(D,sp){
  var K=X.fp(D,sp,{fog:.03,z:8,pitch:.1,finDelay:2.8}),q=K.q,st=K.st,r=K.room,i;
  K.ground(80,80,-15);q.s(r,13,0,-3,-24,'s',.55);
  var al=D.asset('altar');al.scale.setScalar(2);al.position.set(0,4,-22);st.add(al);var ag=D.glow(3);ag.position.set(0,7.5,-22);ag.material.opacity=.1;st.add(ag);
  q.py(r,2.4,2.8,-7.5,1.4,-3,'p');q.py(r,2.2,2.6,7.5,1.3,-5,'p');q.py(r,2,2.4,-9,1.2,-9,'p');
  function done(k){K.tags[k].visible=false;K.complete(k);if(K.doneN===4){ag.material.opacity=1;ag.scale.setScalar(14);K.walkTo([[K.pos.x,1.7,K.pos.z],[0,1.8,-4],[0,4.5,-13]],2.6)}}
  var bench=q.G();bench.position.set(-3.6,0,1.5);st.add(bench);q.b(bench,2.6,.2,.8,0,.9,0,'w');q.b(bench,.2,.9,.7,-1.1,.45,0,'w');q.b(bench,.2,.9,.7,1.1,.45,0,'w');K.tag(sp.items[0][0],bench,2.3);
  var gods=3;
  for(i=0;i<3;i++)(function(n){
    var g=q.G();g.position.set(-.8+n*.8,1,0);bench.add(g);q.c(g,.16,.22,.6,0,.3,0,'g');q.s(g,.17,0,.72,0,'g');q.k(g,.06,.2,-.1,.95,0,'g');q.k(g,.06,.2,.1,.95,0,'g');
    K.target(g,.45,.1,function(t){K.kill(t);D.tone(420+n*50,.12);D.burst(D.wpos(g),0xffffff,true);D.tween(.5,function(e){g.rotation.z=e*1.6;g.position.y=1-e*.9;g.position.z=e*.9});gods--;if(!gods)done(0)},.4);
  })(i);
  q.c(r,.06,.08,2.6,2.2,1.3,2,'w');q.c(r,.06,.08,2.6,5.4,1.3,1,'w');q.b(r,3.4,.03,.03,3.8,2.5,1.5,'d',.3);K.tag(sp.items[1][0],null,0,3.8,3.2,1.5);
  var cloths=3;
  for(i=0;i<3;i++)(function(n){
    var c=q.b(st,.8,1.3,.05,2.8+n,1.8,1.8-n*.3,'d',.3);
    K.rub(c,.8,.11,function(){q.b(st,.8,1.3,.05,2.8+n,1.8,1.8-n*.3,'p',.3);cloths--;if(!cloths)done(1)});
  })(i);
  K.tag(sp.items[2][0],null,0,-2.6,2.4,-5);
  var pots=2;
  for(i=0;i<2;i++)(function(n){
    var g=q.G();g.position.set(-3.4+n*1.7,0,-5);st.add(g);q.s(g,.6,0,.6,0,'d',.85);q.t(g,.52,.06,0,.95,0,'d',1.5708);q.fl(g,0,0,.2,.8);var sm=D.glow(1.6);sm.position.y=1.6;g.add(sm);
    K.hits(g,.8,.11,2,.1,function(p){g.rotation.z=p*.5},function(){D.tween(.5,function(e){g.rotation.z=.5+e*1.1});sm.visible=false;pots--;if(!pots)done(2)},.6);
  })(i);
  var f2=q.G();f2.position.set(3.6,0,-5.5);st.add(f2);q.t(f2,.7,.14,0,.1,0,'s',1.5708);var ff=q.fl(f2,0,.1,0,2.4),fg=D.glow(6);fg.position.y=1.2;f2.add(fg);K.tag(sp.items[3][0],f2,3);
  K.hits(f2,1,.13,4,.3,function(p){ff.scale.setScalar(2.4*(1-p*.7));fg.material.opacity=1-p*.8},function(){ff.setOn(false);fg.visible=false;done(3)},.9);
};

/* Chapter 6: the furnace that is never satisfied. Feed it and it only grows. */
MECH.forgefp=function(D,sp){
  var K=X.fp(D,sp,{fog:.04,z:5,finDelay:2.2}),q=K.q,st=K.st,s=.8,tgt=.8;K.hall(4.4,16,0);
  q.b(K.room,1,4.2,1.2,-2.2,2.1,-6.6,'s');q.b(K.room,1,4.2,1.2,2.2,2.1,-6.6,'s');q.t(K.room,1.75,.5,0,4.1,-6.6,'s',0,0,Math.PI);q.b(K.room,3.6,.4,1.6,0,.2,-6.4,'d');
  var fire=q.G();fire.position.set(0,.4,-6.6);st.add(fire);q.k(fire,.9,2.4,0,1.2,0,'l');q.k(fire,.6,1.6,-.6,.8,.2,'l');q.k(fire,.6,1.6,.6,.8,.2,'l');var fg=D.glow(10);fg.position.y=1.4;fire.add(fg);
  sp.items.forEach(function(it,n){
    var g=q.G();g.position.set(-2.4+n*1.6,.25,1.6);g.rotation.y=.3*(n-1.5);st.add(g);q.c(g,.24,.26,1.5,0,0,0,'w',1.5708);q.c(g,.25,.25,.02,.76,0,0,'p',1.5708);
    var tg=K.tag(it[0],g,.9);
    K.target(g,.8,.12,function(t){
      K.kill(t);tg.visible=false;D.tone(130+n*25,.4);var sx=g.position.x,sz=g.position.z;
      D.tween(.7,function(e){g.position.set(sx*(1-e),.25+Math.sin(e*Math.PI)*2.2+e*.8,sz+(-6.2-sz)*e);g.rotation.x=e*5},function(){st.remove(g);tgt+=.55;K.shake=.7;K.pos.z+=.45;K.complete(n)});
    },.2);
  });
  K.ups.push(function(tm,dt){s+=(tgt-s)*Math.min(1,dt*3);fire.scale.set(s*(1+Math.sin(tm*13)*.05),s*(1+Math.sin(tm*9)*.1),s);if(K.fin)K.shake=Math.max(K.shake,.12)});
};

/* Chapter 7: Samson, blind and bound, trudging round the mill. */
MECH.samsonfp=function(D,sp){
  var K=X.fp(D,sp,{fog:.045,z:6.5,pitch:.05,finDelay:2.2}),q=K.q,st=K.st,T=K.T,a=0,spd=.55,i;K.hall(5,18,-2);
  q.b(K.room,1.2,1.6,.1,0,4.2,-10.9,'l');
  var shaftM=K.M.r.clone();shaftM.opacity=.05;var sh=new T.Mesh(new T.CylinderGeometry(.7,2.4,8,20,1,true),shaftM);sh.position.set(0,3,-4.5);sh.rotation.x=-.5;K.room.add(sh);
  q.c(K.room,1.5,1.6,.5,0,.25,-3.5,'s');q.c(K.room,.16,.2,2.2,0,1.3,-3.5,'w');
  var stone=q.c(st,1.15,1.15,.5,0,.85,-3.5,'s'),arm=q.G();arm.position.set(0,0,-3.5);st.add(arm);q.b(arm,3.6,.16,.16,1.5,1.25,0,'w');q.b(stone,.2,.52,2.2,0,0,0,'d');
  var sam=q.G();sam.position.set(3.1,0,.5);arm.add(sam);var body=q.f(sam,0,0,1.75,0);body.rotation.x=.3;q.b(body,.5,.12,.5,0,1.3,0,'p');
  var cord=q.G();cord.position.set(0,1.3,-.45);sam.add(cord);q.t(cord,.2,.06,0,0,0,'w',1.5708);q.c(cord,.04,.04,.6,-.3,0,-.1,'w',1.5708);
  var sack=q.G();sack.position.set(0,2,.45);sam.add(sack);q.s(sack,.55,0,0,0,'c',.8,1.1,.9);q.c(sack,.1,.16,.2,0,.5,0,'c');
  function freed(k){K.tags[k].visible=false;K.complete(k);if(K.doneN===4){shaftM.opacity=.3;D.tween(1.2,function(e){body.rotation.x=.3*(1-e);body.scale.setScalar(1.75+.25*e)})}}
  K.tag(sp.items[0][0],cord,.7);K.hits(cord,.5,.11,3,.12,function(p){cord.scale.setScalar(1-p*.5)},function(){sam.remove(cord);freed(0)});
  var bed=q.G();bed.position.set(-3.3,0,1);st.add(bed);q.b(bed,2,.3,1.2,0,.15,0,'w');K.tag(sp.items[1][0],bed,1.9);
  var th=3;
  for(i=0;i<3;i++)(function(n){
    var g=q.G();g.position.set(-.6+n*.6,.45,0);bed.add(g);for(var j=0;j<6;j++)q.k(g,.05,.6,Math.sin(j*1.05)*.18,.2,Math.cos(j*1.05)*.18,'d',Math.sin(j*1.05)*.5,Math.cos(j*1.05)*.5);
    K.rub(g,.5,.1,function(){th--;if(!th)freed(1)});
  })(i);
  K.tag(sp.items[2][0],stone,1.2);K.hits(stone,1.3,.14,3,.15,function(p){spd=.55*(1-p)},function(){spd=0;freed(2)},.3);
  K.tag(sp.items[3][0],sack,.9);K.hits(sack,.6,.11,2,.1,function(p){sack.rotation.z=p*.6},function(){var o=sack.position.clone();D.tween(.6,function(e){sack.position.set(o.x-e*.9,o.y-e*1.7,o.z+e*.4)});freed(3)});
  K.ups.push(function(tm,dt){a+=spd*dt;arm.rotation.y=a;stone.rotation.y=a;body.position.y=spd?Math.abs(Math.sin(tm*3))*.04:0});
};
})();
