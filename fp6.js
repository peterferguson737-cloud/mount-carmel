/* Rebuilt levels, each built on an image or Scripture story John himself uses in that chapter. These replace the earlier versions. */
(function(){
'use strict';
var X=window.ASCENT;if(!X||!X.S)return;
var PI=Math.PI;

/* I.12: John is given the little book (Apocalypse 10), sweet in the mouth and bitter in the belly; and Paul's "virtue made perfect in weakness".
   A honey pot that sours for what does harm, an anvil that tempers what does not. */
X.S(13,{fog:.045,z:5.5},function(K,D,sp,q,st,r){
  K.hall(4.4,16,-1);K.shaft(0,3.6,-4,.5,1.6,7,0,0,.07);
  var tb=q.G(),sour=0;tb.position.set(-2.3,0,-2.8);tb.rotation.y=.35;st.add(tb);
  q.b(tb,2,.12,1.1,0,.95,0,'w');[-.85,.85].forEach(function(x){q.b(tb,.12,.95,1,x,.47,0,'w')});
  q.c(tb,.5,.36,.62,-.4,1.32,0,'c');q.t(tb,.5,.05,-.4,1.63,0,'c',1.5708);q.c(tb,.45,.45,.04,-.4,1.6,0,'g');
  var dk=q.c(tb,.45,.45,.05,-.4,1.61,0,'n');dk.scale.set(.01,1,.01);q.c(tb,.025,.025,.9,-.2,1.9,0,'w',.35);
  q.b(tb,.4,.05,.52,.45,1.06,.05,'p',0,.22);q.b(tb,.4,.05,.52,.84,1.06,.05,'p',0,-.22);q.b(tb,.04,.07,.52,.645,1.03,.05,'d');
  var an=q.G(),racks=0;an.position.set(2.3,0,-2.8);an.rotation.y=-.35;st.add(an);
  q.b(an,.8,.75,.8,0,.37,0,'w');q.b(an,1.3,.32,.5,0,.95,0,'d');q.k(an,.16,.6,.92,.95,0,'d',-1.5708);q.b(an,.5,.12,.5,0,.76,0,'d');
  var ham=q.G();ham.position.set(-.9,1.2,0);an.add(ham);q.c(ham,.04,.05,1.2,.5,.3,0,'w',-1.05);q.b(ham,.34,.3,.5,1,.6,0,'d',0,-1.05);
  q.b(r,2.4,.1,.4,2.9,2.7,-4.2,'w');
  K.sort([{g:tb,hy:1.4,fy:1.7,ty:2.6,r:1.1,got:function(c){st.remove(c);sour++;D.tone(140,.3);D.tween(.7,function(e){var s=Math.min(1,(sour-1+e)/3);dk.scale.set(s,1,s)})}},
          {g:an,hy:1.1,fy:1.2,ty:2.5,r:1.1,got:function(c){c.position.copy(D.wpos(an));c.position.y=1.2;c.scale.setScalar(1);
            D.tween(.45,function(e){ham.rotation.z=-Math.sin(e*PI)*1.1},function(){K.shake=.5;D.tone(880,.15);D.burst(c.position,0xffffff,true);st.remove(c);var o=K.orb(.7);o.position.set(2+racks*.6,2.95,-4.2);racks++;st.add(o)})}}],
    function(){var g=q.G();q.c(g,.09,.09,.55,0,0,0,'p',1.5708);q.s(g,.1,-.3,0,0,'w');q.s(g,.1,.3,0,0,'w');return g});
});

/* I.13: John's own sketch of the Mount: the narrow path of "nothing" straight up the middle, and Christ to be imitated going on ahead. */
X.S(14,{fog:.03,z:7,pitch:.12,yawMax:.9,finDelay:2.4},function(K,D,sp,q,st,r){
  K.plain();var P=[],i;
  for(i=0;i<6;i++){var y=i*.9,z=-2-i*4.6;q.b(r,3.2,Math.max(.12,y),4.6,0,Math.max(.06,y/2),z,'s');P.push([0,y,z])}
  q.b(r,5,.05,26,-7,.03,-8,'d',.5);q.b(r,5,.05,26,7,.03,-8,'d',-.5);
  var gl=D.glow(14);gl.position.set(0,P[5][1]+6,P[5][2]-6);gl.material.opacity=.06;st.add(gl);
  var cal=D.asset(sp.set);cal.scale.setScalar(2.2);cal.position.set(0,P[5][1],P[5][2]-5);st.add(cal);
  var lead=q.G();st.add(lead);var lf=q.f(lead,0,0,1.35,PI);lf.rotation.x=-.2;q.b(lead,.12,2.4,.12,.35,1.5,.3,'w',0,0,.5);q.b(lead,1.1,.12,.12,.35,2,.75,'w');
  function leadTo(n,d){var a=lead.position.clone(),b=P[Math.min(5,n+1)];D.tween(d||1.6,function(e){lead.position.set(a.x+(.9-a.x)*e,a.y+(b[1]-a.y)*e,a.z+(b[2]-.6-a.z)*e)})}
  lead.position.set(.9,P[0][1],P[0][2]-.6);var lg=D.glow(3);lg.position.y=2.6;lg.material.opacity=.5;lead.add(lg);
  var O=[];
  var fp=q.G();fp.position.set(0,P[0][1]+.02,P[0][2]+1.2);st.add(fp);for(i=0;i<4;i++)q.s(fp,.14,(i%2?.2:-.2),.02,-i*.45,'l',.15,1,1.6);O.push({g:fp,hy:.3,ty:1.1,r:.9});
  var tbl=D.asset('table');tbl.scale.setScalar(1.3);tbl.position.set(-1.9,P[1][1],P[1][2]+.6);st.add(tbl);O.push({g:tbl,hy:1,ty:2.4,r:1});
  var stp=q.G();stp.position.set(.6,P[2][1],P[2][2]+2.2);st.add(stp);for(i=0;i<4;i++)q.b(stp,1.5,.22,.4,0,.11+i*.22,-i*.4,'s');q.b(stp,1.4,.05,2.4,-1.8,.5,-.8,'d',0,0,-.38);O.push({g:stp,hy:.6,ty:1.7,r:1});
  var bw=q.G();bw.position.set(1.5,P[3][1],P[3][2]+.4);st.add(bw);q.c(bw,.2,.3,1,0,.5,0,'s');var cup=q.G();cup.position.y=1.15;bw.add(cup);q.c(cup,.5,.24,.3,0,0,0,'c');q.c(cup,.44,.44,.02,0,.13,0,'n');O.push({g:bw,hy:1.2,ty:2.1,r:.8});
  var sc=q.G();sc.position.set(-1.5,P[4][1],P[4][2]+.4);st.add(sc);q.c(sc,.06,.22,1.7,0,.85,0,'s');var bm=q.G();bm.position.y=1.75;bm.rotation.z=.35;sc.add(bm);q.b(bm,1.4,.07,.07,0,0,0,'g');[-.65,.65].forEach(function(x){q.c(bm,.26,.1,.1,x,-.45,0,'g');q.c(bm,.012,.012,.45,x,-.22,0,'d')});O.push({g:sc,hy:1.5,ty:2.8,r:.8});
  var acts=[function(){},function(){D.tween(1,function(e){tbl.position.x=-1.9-e*3;tbl.rotation.z=e*.3})},function(){},function(){D.tween(.7,function(e){cup.rotation.z=e*PI})},function(){D.tween(.9,function(e){bm.rotation.z=.35*(1-e)})}];
  function step(n){if(n>4)return;var o=O[n];K.tap(n,o.g,{hy:o.hy,ty:o.ty,r:o.r},function(fin){
    acts[n]();leadTo(n);K.go([[0,P[n][1]+1.7,P[n][2]+2.4]],2.4,function(){K.fogT=.03+n*.01;gl.material.opacity=.06+.94*(n+1)/5;fin();step(n+1)})})}
  step(0);
});

/* I.15: John's own picture: a captive in a prison, who gets out only when the gaolers are asleep. */
X.S(16,{fog:.05,z:4.6,finDelay:3.6},function(K,D,sp,q,st,r){
  K.hall(3.4,22,-5);var i,bars=q.G(),gate=q.G();st.add(bars);
  for(i=0;i<9;i++)if(i<3||i>5)q.c(bars,.06,.06,6.8,-3.2+i*.8,3.4,-3,'d');q.b(bars,6.8,.14,.14,0,3,-3,'d');q.b(bars,6.8,.14,.14,0,.12,-3,'d');
  gate.position.set(-.8,0,-3);st.add(gate);for(i=0;i<3;i++)q.c(gate,.06,.06,2.9,.2+i*.6,1.5,0,'d');q.b(gate,1.7,.12,.12,.8,2.9,0,'d');q.b(gate,1.7,.12,.12,.8,.2,0,'d');q.b(gate,.3,.36,.16,1.5,1.4,0,'g');
  q.b(r,1.8,3,.06,0,1.5,-15.9,'n');for(i=0;i<9;i++)q.s(r,.05,-.7+((i*37)%14)*.1,.7+((i*53)%21)*.1,-15.8,'l');
  var star=D.glow(5);star.position.set(0,8,-30);star.material.opacity=0;st.add(star);
  var w=q.f(st,0,0,1.35,0),still=false;q.t(w,.2,.04,0,.12,0,'d',1.5708);
  K.strike(0,w,{hp:2,r:.9,hy:.8,ty:2.5},null,function(){still=true;w.rotation.x=-1.45;w.position.y=.35});
  K.ups.push(function(t){if(!still){w.position.set(Math.sin(t*1.1)*2.2,0,-.6+Math.sin(t*2.2)*.9);w.rotation.y=Math.cos(t*1.1)>0?1.57:-1.57}});
  var wn=2,wt=K.tag(sp.items[1][0],null,0,0,3.7,-4.6);
  [-1.9,1.9].forEach(function(x){
    var g=q.G();g.position.set(x,0,-5);st.add(g);q.b(g,.7,.5,.7,0,.25,0,'w');var f=q.f(g,0,0,1.3,x>0?-.5:.5);f.position.y=.3;var c=K.candle(g,x>0?-.6:.6,0,.3,1);q.t(f,.14,.03,.3,.8,.25,'g');
    K.target(g,.9,.13,function(t){K.kill(t);c.set(false);D.tone(240,.25);D.tween(.6,function(e){f.rotation.x=e*.7;f.position.y=.3-e*.1});if(!--wn){wt.visible=false;K.complete(1)}},1);
  });
  var lamp=q.G();lamp.position.set(1.7,3.2,-1.2);st.add(lamp);q.c(lamp,.02,.02,3,0,1.6,0,'d');q.c(lamp,.4,.2,.25,0,0,0,'d');var lf=q.fl(lamp,0,.05,0,1.6),lg=D.glow(6);lg.position.y=.6;lamp.add(lg);
  K.strike(2,lamp,{hp:3,regen:.15,r:.75,ty:1.2},function(p){lf.scale.setScalar(1.6*(1-p*.6));lg.material.opacity=1-p*.7},function(){lf.setOn(false);lg.visible=false});
  K.onAll=function(){
    D.tone(700,.1);D.tween(1.3,function(e){gate.rotation.y=e*1.5});star.material.opacity=1;
    K.go([[0,1.7,-1],[0,1.7,-6],[0,1.7,-17.5]],4.2,function(){K.pitchTo=.5;K.fogT=.02});
  };
});

/* II.6: the friend who comes at midnight asking for three loaves (Luke 11:5), which John reads as the three virtues; the seraphim's six wings over the door. */
X.S(22,{fog:.035,z:6.5,pitch:.06},function(K,D,sp,q,st,r){
  K.plain(0);var i,n0=0;
  q.b(r,16,7,.8,0,3.5,-6,'s');q.b(r,17,.5,1.4,0,7.2,-6,'d');q.b(r,2.2,3.6,.3,0,1.8,-5.5,'s');q.b(r,1.6,3,.1,0,1.5,-5.42,'l');
  var door=q.G();door.position.set(-.8,0,-5.3);st.add(door);q.b(door,1.6,3,.12,.8,1.5,0,'w');q.t(door,.1,.03,1.4,1.5,.1,'g');
  var dg=D.glow(4);dg.position.set(0,1.6,-5);dg.material.opacity=0;st.add(dg);
  q.b(r,1.2,1.4,.1,4,3.4,-5.56,'l');q.b(r,.08,1.4,.14,4,3.4,-5.5,'d');q.b(r,1.2,.08,.14,4,3.4,-5.5,'d');
  var se=q.G();se.position.set(0,5.4,-5.4);st.add(se);q.s(se,.3,0,0,0,'g');
  [[-.5,.5,.5],[.5,.5,-.5],[-.9,0,0],[.9,0,0],[-.5,-.55,-.5],[.5,-.55,.5]].forEach(function(w){q.s(se,.5,w[0],w[1],.05,'p',.36,1,.12).rotation.z=w[2]});
  for(i=0;i<16;i++)q.s(r,.07,-14+((i*37)%29),9+((i*53)%8),-22-((i*7)%6),'l');
  q.b(r,6.6,.2,1,0,1,-3.6,'s');[-2.9,2.9].forEach(function(x){q.b(r,.5,1,.9,x,.5,-3.6,'s')});
  var T2=['eye','scroll','fist'],B=[-2.2,0,2.2].map(function(x){
    var g=q.G();g.position.set(x,1.1,-3.6);st.add(g);q.s(g,.55,0,.22,0,'c',.5,1.3,1);q.b(g,.5,.03,.03,0,.5,0,'d',.5);q.b(g,.5,.03,.03,0,.5,0,'d',-.5);
    return{g:g,hy:.3,fy:.8,ty:1.3,r:.8,got:function(c){st.remove(c);n0++;var o=D.glow(3);o.position.y=.5;g.add(o);D.tone(520+n0*60,.3);
      var a0=door.rotation.y;D.tween(.9,function(e){door.rotation.y=a0-(e*.5);dg.material.opacity=n0/3;dg.scale.setScalar(4+n0*3)})}}});
  K.sort(B,function(it,k){return K.tok(T2[k],1.1)});
});
/* II.29: "The voice is the voice of Jacob, but the hands are the hands of Esau" (Genesis 27): blind Isaac, and the son in goatskins. */
X.S(45,{fog:.045,z:5.2},function(K,D,sp,q,st,r){
  K.ground(30,30,0);K.shell(new K.T.ConeGeometry(13,10,12,1,true),0,5,0);q.c(r,.1,.12,10,0,5,-3.6,'w');
  var bed=q.G();bed.position.set(-1.5,0,-2.2);bed.rotation.y=.5;st.add(bed);q.b(bed,2.4,.5,1.2,0,.25,0,'w');q.s(bed,.5,-.9,.6,0,'p',.5);
  var isaac=q.f(bed,.2,0,1.3,0);isaac.position.y=.45;isaac.rotation.z=-.25;q.b(isaac,.3,.06,.1,0,1.32,.2,'p');var arm=q.c(isaac,.05,.05,.7,.3,.9,.3,'k',0,1.2);
  var son=q.G();son.position.set(.9,0,-1.6);son.rotation.y=-.9;st.add(son);var sf=q.f(son,0,0,1.25,0);sf.rotation.x=.35;
  var voice=q.G();voice.position.set(.15,1.75,.5);son.add(voice);q.s(voice,.12,0,0,0,'l');voice.add(D.glow(2.4));
  var hands=q.G();hands.position.set(0,.95,.7);son.add(hands);var skins=[];[-.22,.22].forEach(function(x){q.s(hands,.12,x,0,0,'k');var s=q.s(hands,.2,x,0,0,'d');for(var i=0;i<6;i++)q.k(s,.05,.16,Math.sin(i)*.16,Math.cos(i*1.7)*.16,Math.sin(i*2.3)*.12,'d');skins.push(s)});
  var lamp=K.candle(st,2.6,0,-3,1);lamp.gl.material.opacity=.4;
  K.choose([{g:voice,ty:.6,r:.5,nr:.1},{g:hands,ty:-.75,r:.5,nr:.1}],function(n,g,fin){
    D.tween(1,function(e){skins.forEach(function(s){s.position.y=-e*.9;s.scale.setScalar(1-e*.6)});lamp.gl.material.opacity=.4+.6*e;lamp.gl.scale.setScalar(3+e*5)},fin)},
   function(n,g,no){D.tween(1.2,function(e){arm.rotation.x=1.2-Math.sin(e*PI)*.8;voice.scale.setScalar(1+Math.sin(e*PI)*1.5)},no)});
  K.ups.push(function(t){voice.position.y=1.75+Math.sin(t*3)*.05});
});

/* III.9: the Pharisee standing in the Temple thanking God he is not like other men, and the publican far off (Luke 18). */
X.S(57,{fog:.04,z:6.5,pitch:.06,finDelay:2.6},function(K,D,sp,q,st,r){
  K.hall(4.6,22,-4);K.stair(4,0,-6,6,.25,.8);q.b(r,2.4,1.3,1.2,0,1.65,-10.4,'s');K.candle(st,-.8,2.3,-10.4,1);K.candle(st,.8,2.3,-10.4,1);
  var ph=q.G();ph.position.set(0,1,-7.6);st.add(ph);var pf=q.f(ph,0,0,1.7,0);q.c(ph,.05,.05,1,-.45,2.3,0,'k',-.5);q.c(ph,.05,.05,1,.45,2.3,0,'k',.5);q.b(ph,.5,.14,.2,0,2.95,.1,'g');
  var spot=K.shaft(0,5.2,-7.6,.4,1.7,8,0,0,.22),pg=D.glow(7);pg.position.set(0,3,-7.6);st.add(pg);
  var pub=q.f(st,3.2,2.2,1.2,-2.4);pub.rotation.x=.6;var ug=D.glow(2);ug.position.set(3.2,1.2,2.2);ug.material.opacity=.05;st.add(ug);var ush=K.shaft(3.2,4.5,2.2,.3,1.2,7,0,0,0),n0=0;
  [[-2.4,-6.4],[2.4,-6.4],[0,-5.2]].forEach(function(p,n){
    var g=q.G();g.position.set(p[0],n===2?0:.75,p[1]);st.add(g);q.c(g,.05,.06,3.4,0,1.7,0,'w');q.b(g,1.1,.08,.08,0,3.3,0,'w');var bn=q.b(g,1,1.7,.05,0,2.4,0,'g');q.k(g,.14,.3,0,3.55,0,'g');
    K.strike(n,g,{hp:2,regen:.12,r:.85,hy:2.4,ty:3.9},function(pp){g.rotation.z=pp*.2*(p[0]<0?1:-1)},function(){
      n0++;D.tween(.6,function(e){bn.position.y=2.4-e*2;bn.rotation.z=e*1.1});spot.material.opacity=.22*(1-n0/3);pg.material.opacity=1-n0/3;ug.material.opacity=.05+.95*n0/3;ug.scale.setScalar(2+n0*2);ush.material.opacity=.07*n0})});
  K.onAll=function(){K.yawTo=-.75;D.tween(1.2,function(e){pf.rotation.x=e*.2})};
});

/* III.39: the woman at the well asks which mountain is the place to pray; Christ, who chose bare hills himself, answers "in spirit and in truth" (John 4). */
X.S(87,{fog:.03,z:7,pitch:.06,yawMax:1},function(K,D,sp,q,st,r){
  K.plain(0);var well=q.G();well.position.set(0,0,-1.5);st.add(well);q.c(well,.9,1,.8,0,.4,0,'s');q.c(well,.75,.75,.04,0,.72,0,'n');[-.85,.85].forEach(function(x){q.c(well,.06,.06,1.6,x,1.4,0,'w')});q.c(well,.07,.07,1.9,0,2.2,0,'w',1.5708);q.c(well,.012,.012,1,0,1.7,0,'d');q.c(well,.16,.12,.24,0,1.15,0,'w');
  q.f(st,-1.5,-1.2,1.3,.9);K.jar(st,-1.9,0,-.6,.6);var chr=q.f(st,1.4,-1.6,1.4,-.8);chr.position.y=-.25;q.b(r,.9,.5,.7,1.5,.25,-1.8,'s');
  var tp=q.G(),tg=D.glow(9);tp.position.set(-7,0,-13);tp.rotation.y=.5;st.add(tp);q.s(tp,6,0,-2.5,0,'s',.6);q.b(tp,4.4,3,3.4,0,2.3,0,'p');q.b(tp,4.8,.4,3.8,0,4,0,'g');for(var i=0;i<4;i++)q.c(tp,.2,.24,3,-1.8+i*1.2,2.3,1.9,'g');q.py(tp,2.2,1.4,0,4.9,0,'g');tg.position.set(0,3.5,2.4);tp.add(tg);
  var hill=q.G(),hg=D.glow(3);hill.position.set(6,0,-12);st.add(hill);q.s(hill,6.5,0,-2.6,0,'s',.62);var pr=q.f(hill,0,0,1.3,0);pr.position.y=1.4;pr.rotation.x=.4;hg.position.y=3.2;hg.material.opacity=.15;hill.add(hg);
  for(i=0;i<14;i++)q.s(r,.08,-16+((i*37)%33),9+((i*53)%9),-34-((i*7)%6),'l');
  K.choose([{g:tp,hy:3,ty:6.4,r:2.6,nr:.2},{g:hill,hy:1.6,ty:3.8,r:2.4,nr:.2}],function(n,g,fin){hg.material.opacity=1;hg.scale.setScalar(8);tg.material.opacity=.2;K.go([[2.5,1.8,-4],[5,2.6,-8.4]],4,function(){K.pitchTo=.3;fin()})},
    function(n,g,no){K.go([[-2.5,1.7,-4],[-5,1.9,-8.5]],3,function(){D.tween(1,function(e){tg.scale.setScalar(9+Math.sin(e*PI)*16);K.shake=.15},function(){K.go([[-2.5,1.7,-4],[0,1.7,7]],2.8,no)})})});
});

/* III.43: Mass said with exactly so many candles, by this priest, at this hour, in this posture: John's own list of ceremonies trusted in place of prayer. */
X.S(91,{fog:.045,z:5.6,finDelay:2.2},function(K,D,sp,q,st,r){
  K.hall(4.4,15,-1);q.b(r,3,1.1,1.2,0,.55,-4.6,'s');q.b(r,3.3,.12,1.4,0,1.16,-4.6,'p');var one=K.candle(st,0,1.22,-4.6,1),n0=0;one.gl.scale.setScalar(2.5);q.b(r,.12,1.6,.12,0,3,-5.2,'w');q.b(r,.8,.12,.12,0,3.3,-5.2,'w');
  function grew(){n0++;one.gl.scale.setScalar(2.5+n0*1.8);one.fl.scale.setScalar(.7+n0*.25)}
  var rack=q.G(),cs=[];rack.position.set(-2.7,0,-2.4);rack.rotation.y=.5;st.add(rack);q.b(rack,2.4,.1,.4,0,1.2,0,'w');[-1,1].forEach(function(x){q.b(rack,.1,1.2,.3,x,.6,0,'w')});for(var i=0;i<7;i++)cs.push(K.candle(rack,-1.05+i*.35,1.25,0,1));q.b(rack,2.4,.05,.05,0,2.1,.25,'g');
  K.strike(0,rack,{hp:2,r:1.1,hy:1.5,ty:2.8},function(p){rack.rotation.z=p*.12},function(){cs.forEach(function(c){c.set(false)});D.tween(.6,function(e){rack.rotation.z=.12+e*1.3;rack.position.y=-e*.4});grew()});
  var hgl=q.G();hgl.position.set(2.7,0,-2.4);st.add(hgl);q.c(hgl,.3,.4,1,0,.5,0,'s');var gl=q.G();gl.position.y=1.5;hgl.add(gl);q.k(gl,.3,.5,0,.25,0,'p',PI);q.k(gl,.3,.5,0,-.25,0,'p');q.c(gl,.34,.34,.05,0,.52,0,'w');q.c(gl,.34,.34,.05,0,-.52,0,'w');
  K.strike(1,hgl,{hp:2,r:.8,hy:1.5,ty:2.7},function(p){gl.rotation.z=p*.6},function(){D.tween(.5,function(e){gl.rotation.z=.6+e;gl.position.set(e*.7,1.5-e*1.3,0)});grew()});
  var ab=q.G();ab.position.set(-1.3,0,.4);ab.rotation.y=.3;st.add(ab);q.b(ab,.1,1.5,.1,-.6,.75,0,'w');q.b(ab,.1,1.5,.1,.6,.75,0,'w');for(i=0;i<3;i++){q.c(ab,.02,.02,1.2,0,.5+i*.4,0,'d',1.5708);for(var j=0;j<5;j++)q.s(ab,.08,-.45+j*.16+(i%2)*.1,.5+i*.4,0,'c')}
  K.strike(2,ab,{hp:2,r:.8,hy:.9,ty:2.1},function(p){ab.rotation.z=p*.15},function(){D.tween(.5,function(e){ab.rotation.x=e*1.5;ab.position.y=-e*.2});grew()});
  var post=q.G();post.position.set(1.4,0,.4);st.add(post);q.c(post,.07,.09,2.2,0,1.1,0,'w');var note=q.b(post,.8,1,.04,0,1.7,.1,'p');for(i=0;i<4;i++)q.b(note,.56,.04,.02,0,.3-i*.2,.03,'d');q.s(note,.05,0,.42,.03,'d');
  K.strike(3,post,{hp:2,r:.8,hy:1.7,ty:2.7},function(p){note.rotation.z=p*.3},function(){D.tween(.7,function(e){note.position.y=1.7-e*1.6;note.rotation.z=.3+e*2;note.rotation.x=e});grew()});
  K.onAll=function(){K.shaft(0,3.6,-4.6,.4,1.6,6.5,0,0,.16)};
});
})();
