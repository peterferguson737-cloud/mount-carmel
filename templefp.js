/* Book One, chapter 9, first person: Ezekiel's temple. The Ark of the Covenant, where God dwells among his people, fouled with pitch and soot;
   creeping things on the walls, figures with their backs to the sanctuary. */
(function(){
'use strict';
var X=window.ASCENT;if(!X)return;
var MECH=X.MECH,keys=X.keys,reduce=X.reduce;
MECH.templefp=function(D,sp){
  var T=D.T,q=D.q,M=q.M,st=D.stage,i;
  D.setUsed=true;
  D.floor.visible=false;D.sc.fog=new T.FogExp2(0x3a2e26,.045);D.sc.background=new T.Color(0x3a2e26);
  var room=q.G();st.add(room);

  /* ── the nave: narrow, barrel vaulted, ending in a round apse with a half dome ── */
  var W=4.6,fl=new T.Mesh(new T.PlaneGeometry(W*2+.4,24),D.floor.material);fl.rotation.x=-Math.PI/2;fl.position.z=1;room.add(fl);
  var wallM=M.s.clone();wallM.side=T.DoubleSide;
  function shell(geo,x,y,z,rx,ry){var m=new T.Mesh(geo,wallM);m.position.set(x,y,z);m.rotation.set(rx||0,ry||0,0);m.userData.ns=1;room.add(m);return m}
  shell(new T.PlaneGeometry(20,W),-W,W/2,1,0,Math.PI/2);shell(new T.PlaneGeometry(20,W),W,W/2,1,0,-Math.PI/2);
  shell(new T.CylinderGeometry(W,W,20,28,1,true,Math.PI/2,Math.PI),0,W,1,Math.PI/2);
  shell(new T.CylinderGeometry(W,W,W,28,1,true,Math.PI/2,Math.PI),0,W/2,-9);
  shell(new T.SphereGeometry(W,28,12,Math.PI,Math.PI,0,Math.PI/2),0,W,-9);
  shell(new T.PlaneGeometry(W*2,W*2),0,W,11);
  q.c(room,W-.2,W-.2,.25,0,.12,-9,'s');q.c(room,W-1.4,W-1.4,.25,0,.37,-9.4,'s');
  [-6,-2,2,6].forEach(function(z){
    [-1,1].forEach(function(sd){
      q.b(room,.5,W,.4,sd*(W-.2),W/2,z,'s');q.b(room,.7,.2,.6,sd*(W-.2),W-.1,z,'s');
      if(z<6)q.t(room,1.75,.1,sd*(W-.06),2.7,z+2,'s',0,Math.PI/2,Math.PI);
    });
  });
  [-1,1].forEach(function(sd){var x=sd*3.5;q.c(room,.36,.42,.2,x,.1,-8.6,'s');q.c(room,.2,.25,3.5,x,2,-8.6,'s');q.c(room,.45,.22,.5,x,4,-8.6,'s');q.b(room,.95,.14,.95,x,4.32,-8.6,'s')});

  /* ── the Ark of the Covenant on a stepped stone base: a gilded chest with mouldings and a panelled front, carrying poles through
        rings along its long sides, and on the mercy seat two kneeling cherubim facing each other, wings arched over the middle ── */
  var img=q.G();img.position.set(0,.5,-9.6);img.scale.setScalar(1.2);st.add(img);
  var AW=3,AD=1.75,AB=.65,AH=1.6,PI=Math.PI;
  q.b(img,4.2,.34,2.9,0,.17,0,'s');q.b(img,3.8,.3,2.5,0,.49,0,'s');
  q.b(img,AW,AH,AD,0,AB+AH/2,0,'g');
  q.b(img,AW+.12,.14,AD+.12,0,AB+.07,0,'g');q.b(img,AW+.06,.06,AD+.06,0,AB+.17,0,'g');
  q.b(img,AW+.16,.16,AD+.16,0,AB+AH-.04,0,'g');q.b(img,AW+.04,.035,AD+.04,0,AB+AH-.17,0,'d');q.b(img,AW+.08,.09,AD+.08,0,AB+AH-.25,0,'g');
  [-1,1].forEach(function(sd){var z=sd*(AD/2+.012);q.b(img,2.5,.06,.04,0,AB+1.25,z,'g');q.b(img,2.5,.06,.04,0,AB+.35,z,'g');q.b(img,.06,.96,.04,-1.22,AB+.8,z,'g');q.b(img,.06,.96,.04,1.22,AB+.8,z,'g')});
  [-1,1].forEach(function(sd){var x=sd*(AW/2+.012);q.b(img,.04,.96,1.3,x,AB+.8,0,'g')});
  q.b(img,AW,.12,AD,0,AB+AH+.14,0,'g');
  var PY=AB+.62;[-1,1].forEach(function(sd){var z=sd*(AD/2+.14);
    q.c(img,.055,.055,5,0,PY,z,'g',PI/2);q.s(img,.08,-2.5,PY,z,'g');q.s(img,.08,2.5,PY,z,'g');
    [-1.2,1.2].forEach(function(x){q.t(img,.13,.03,x,PY,z,'g',0,PI/2);q.b(img,.08,.1,.14,x,PY+.14,sd*(AD/2+.06),'g')})});
  function wingGeo(){var w=new T.Shape();w.moveTo(0,0);w.bezierCurveTo(.15,.55,.55,.86,1.05,.78);w.bezierCurveTo(1.25,.74,1.4,.6,1.45,.42);
    w.bezierCurveTo(1.22,.5,1.05,.38,.9,.43);w.bezierCurveTo(.78,.3,.62,.3,.5,.35);w.bezierCurveTo(.4,.2,.25,.18,.14,.2);w.lineTo(0,0);
    return new T.ExtrudeGeometry(w,{depth:.06,bevelEnabled:true,bevelThickness:.02,bevelSize:.02,bevelSegments:1,curveSegments:10})}
  var WG=wingGeo();
  [-1,1].forEach(function(sd){var c=q.G();c.position.set(sd*1.02,AB+AH+.2,0);c.rotation.y=sd>0?PI:0;c.scale.setScalar(.9);img.add(c);
    q.s(c,.33,0,.28,0,'g',.85,1.25,1);q.b(c,.6,.14,.5,-.2,.07,0,'g');
    q.c(c,.15,.25,.62,.05,.8,0,'g',-.3);q.s(c,.16,.2,1.2,0,'g');q.s(c,.1,.09,1.3,0,'g');
    [-1,1].forEach(function(z){q.c(c,.05,.06,.44,.27,.87,z*.09,'g',-1.2)});q.s(c,.07,.44,.8,0,'g');
    [-1,1].forEach(function(z){var wg=new T.Mesh(WG,M.g);wg.position.set(-.02,.95,z>0?.24:-.3);wg.rotation.x=z*.28;wg.scale.setScalar(.78);c.add(wg)})});
  var aura=D.glow(11);aura.position.set(0,4.1,-10);aura.material.opacity=.06;st.add(aura);
  var shaftM=M.r.clone();shaftM.side=T.DoubleSide;shaftM.opacity=.04;
  var shaft=new T.Mesh(new T.CylinderGeometry(.6,2.2,9,24,1,true),shaftM);shaft.position.set(0,4.6,-9.6);room.add(shaft);

  /* ── targets ── */
  var targets=[],lastHit=-9,v0=new T.Vector3(),asp=1,fin=0,shake=0;
  function target(obj,r,nr,fn){
    var t={obj:obj,nr:nr,live:true,cool:0};
    t.fn=function(amt){if(!t.live||fin)return;if(amt==null){if(t.cool>0)return;t.cool=.14}lastHit=D.time;fn(t,amt)};
    t.hit=D.hit(obj,0,0,0,r,function(){t.fn(null)});targets.push(t);return t;
  }
  function kill(t){t.live=false;D.off(t.hit)}

  /* ── 1 and 2. pitch and soot on the image: rub them away ── */
  var left=[0,0,0,0];
  function stain(kind,x,y,z,r,sx,sy){
    var g=q.G();g.position.set(x,y,z);img.add(g);
    var b=q.s(g,r,0,0,0,kind?'d':'n',sy,sx,.45);
    if(!kind){q.k(g,r*.3,r*1.6,-r*.3,-r*1.3,.05,'n',3.1416);q.k(g,r*.22,r*1.1,r*.35,-r*1.1,.05,'n',3.1416)}
    var dirt=1;left[kind]++;
    target(g,r*1.5,.1,function(t,amt){
      dirt-=amt==null?.5:amt/150;if(amt==null){D.tone(kind?440:330,.08);D.burst(D.wpos(g),0xffffff,true)}
      if(dirt<=0){kill(t);st.remove(g);img.remove(g);D.tone(kind?620:520,.15);shake=.2;left[kind]--;if(!left[kind])complete(kind)}
      else g.scale.setScalar(.45+.55*dirt);
    });
    D.onUpdate(function(tm,dt){if(dirt>0&&dirt<1){dirt=Math.min(1,dirt+dt*.04);g.scale.setScalar(.45+.55*dirt)}});
    return g;
  }
  /* pitch on the chest and a cherub's wing; soot on the crown moulding and the faces of the cherubim */
  var pitch=[stain(0,-.75,1.55,.93,.4,1.1,1.3),stain(0,.55,1.1,.93,.42,1.2,1.2),stain(0,-1.25,.95,.93,.32,1,1.2),stain(0,.5,3.68,.42,.3,1.1,1)];
  var soot=[stain(1,0,2.28,.98,.38,1.6,.6),stain(1,-.85,3.5,.15,.3,1.1,1),stain(1,.85,3.5,.15,.3,1.1,1)];

  /* ── 3. creeping things on the walls ── */
  var bugs=[],bugN=6;
  for(i=0;i<6;i++)(function(n){
    var sd=n%2?1:-1,g=q.G(),y0=1.2+(n%3)*.9,z0=-4+n*1.3,ph=n*1.7,spd=.5+n*.07;
    q.s(g,.24,0,0,0,'n',.55,1.7,.3);q.s(g,.13,.45,0,0,'n',.8,1,.4);q.k(g,.07,.6,-.6,0,0,'n',1.5708);
    for(var l=0;l<3;l++){q.b(g,.05,.5,.04,-.2+l*.2,.05,0,'n',0,.5);q.b(g,.05,.5,.04,-.2+l*.2,-.05,0,'n',0,2.6)}
    g.rotation.y=sd*Math.PI/2;g.scale.setScalar(1.5);st.add(g);
    var t=target(g,.55,.11,function(tt){
      kill(tt);bugN--;D.tone(700-n*40,.08);D.burst(D.wpos(g),0xffffff,true);
      var sy=g.position.y;D.tween(.5,function(e){g.position.y=sy*(1-e);g.rotation.x=e*3;g.scale.setScalar(1.5*(1-e*.7))},function(){st.remove(g)});
      if(!bugN)complete(2);
    });
    bugs.push(t);
    D.onUpdate(function(tm){
      if(!t.live)return;var s=Math.sin(tm*spd+ph);
      g.position.set(sd*(W-.12),y0+Math.sin(tm*1.3+ph)*.35,z0+s*2.2);g.rotation.z=Math.cos(tm*spd+ph)>0?0:Math.PI;
    });
  })(i);

  /* ── 4. the figures with their backs to the sanctuary ── */
  var men=[],menN=5;
  [[-2.6,-2.2],[-1.3,-3.1],[0,-2.4],[1.3,-3.2],[2.6,-2.1]].forEach(function(p,n){
    var f=q.f(st,p[0],p[1],1.45,0);q.s(f,.07,0,1.3,.17,'p');q.s(f,.23,0,1.34,-.07,'h');
    var t=target(f,.9,.1,function(tt){
      kill(tt);menN--;D.tone(300+n*35,.18);
      D.tween(.7,function(e){f.rotation.y=e*Math.PI;f.scale.y=1.45*(1-.14*e)});
      if(!menN)complete(3);
    });
    t.hit.position.y=.8;men.push(t);
    D.onUpdate(function(tm){if(t.live)f.rotation.y=Math.sin(tm*.7+n)*.12});
  });

  /* ── a label over each of the four ── */
  var tags=[];for(i=0;i<4;i++){var tg=D.tag(sp.items[i][0]);st.add(tg);tags.push(tg)}
  function firstLive(list){for(var k=0;k<list.length;k++)if(list[k].live)return list[k];return null}
  function liveStain(arr){for(var k=0;k<arr.length;k++)if(arr[k].parent)return arr[k];return null}

  /* ── progress ── */
  var doneN=0,finished=false;
  function complete(k){tags[k].visible=false;doneN++;D.say(sp.items[k][0],sp.items[k][1]);D.light(.2+.8*doneN/4);shake=.35;if(doneN>=4){fin=.001;D.tone(392,.7,.2);D.tone(587,.9,.5)}}
  D.light(.2);
  D.onUpdate(function(t,dt){
    var k,o;for(k=0;k<targets.length;k++)targets[k].cool-=dt;
    o=liveStain(pitch);if(o){o.getWorldPosition(v0);tags[0].position.set(v0.x-1.1,v0.y+.3,v0.z+.3)}
    o=liveStain(soot);if(o){o.getWorldPosition(v0);tags[1].position.set(v0.x+1,v0.y+.5,v0.z+.3)}
    o=firstLive(bugs);if(o){tags[2].position.set(o.obj.position.x*.93,o.obj.position.y+.45,o.obj.position.z)}
    o=firstLive(men);if(o){tags[3].position.set(o.obj.position.x,2.35,o.obj.position.z)}
    var prog=doneN/4,want=fin?1:.06+.5*prog;
    aura.material.opacity+=(want-aura.material.opacity)*Math.min(1,dt*2);aura.scale.setScalar(11+(fin?4*Math.min(1,fin):0)+Math.sin(t*2)*.3);
    shaftM.opacity+=((fin?.3:.04+.12*prog)-shaftM.opacity)*Math.min(1,dt*2);
    if(fin){fin+=dt;if(fin>1.5&&!finished){finished=true;D.done()}}
  });

  /* ── rub or swipe across a target; drag elsewhere to look around ── */
  var yaw=0,pitchA=0;
  D.gesture=function(a2,b2,d){
    if(fin)return;
    if(d>=2)for(var k=0;k<targets.length;k++){
      var t=targets[k];if(!t.live)continue;
      t.obj.getWorldPosition(v0);var p=D.project(v0),ax=a2.x*asp,bx=b2.x*asp,px=p.x*asp,dx=bx-ax,dy=b2.y-a2.y,l2=dx*dx+dy*dy||1e-6,
        u=Math.max(0,Math.min(1,((px-ax)*dx+(p.y-a2.y)*dy)/l2)),ex=ax+dx*u-px,ey=a2.y+dy*u-p.y;
      if(ex*ex+ey*ey<t.nr*t.nr){t.fn(d);return}
    }
    if(D.time-lastHit>.3){yaw=Math.max(-1.2,Math.min(1.2,yaw+(b2.x-a2.x)*1.1));pitchA=Math.max(-.4,Math.min(.5,pitchA-(b2.y-a2.y)*.45))}
  };

  /* ── first-person camera ── */
  var touch=!!(window.matchMedia&&window.matchMedia('(pointer:coarse)').matches),lx=0,ly=0;
  D.camFn=function(cam,dt){
    asp=cam.aspect;var port=asp<.85,ptr=D.ptr||{x:0,y:0},t=D.time,kk=Math.min(1,dt*5);
    yaw=Math.max(-1.2,Math.min(1.2,yaw+((keys.left?1:0)-(keys.right?1:0))*dt*1.2));
    shake*=Math.exp(-dt*6);
    var sk=reduce?0:shake,bob=reduce?0:Math.sin(t*1.3)*.025;
    cam.fov=port?70:60;cam.updateProjectionMatrix();
    cam.position.set((Math.random()-.5)*sk*.25,2.35+bob+(Math.random()-.5)*sk*.25,port?8.4:7.2);
    lx+=((touch?0:ptr.x*-.22)-lx)*kk;ly+=((touch?0:ptr.y*.14)-ly)*kk;
    var yy=yaw+lx,pp=pitchA+ly+(port?.2:.1);
    cam.lookAt(cam.position.x-Math.sin(yy)*10,cam.position.y+Math.sin(pp)*10-.9,cam.position.z-Math.cos(yy)*10);
  };
  D.fpCleanup=function(){D.sc.fog=null;D.sc.background=D.sky;D.floor.visible=true;D.camFn=null;D.cam.fov=45;D.gesture=null};
};
})();
