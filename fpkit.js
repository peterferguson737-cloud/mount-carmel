/* Shared first-person toolkit: fogged room, things to strike, bubble labels, look-around camera, walking along a path. */
(function(){
'use strict';
var X=window.ASCENT;if(!X)return;
var keys=X.keys,reduce=X.reduce;
function clamp(v,a,b){return Math.max(a,Math.min(b,v))}
X.fp=function(D,sp,o){
  o=o||{};
  var T=D.T,q=D.q,M=q.M,st=D.stage,v0=new T.Vector3(),asp=1,lastHit=-9,lx=0,ly=0,inited=false,finished=false;
  var touch=!!(window.matchMedia&&window.matchMedia('(pointer:coarse)').matches);
  var K={T:T,q:q,M:M,st:st,targets:[],ups:[],tags:[],fin:0,shake:0,doneN:0,total:o.total||sp.items.length,yaw:0,pitch:0,yawTo:null,pos:new T.Vector3(0,1.7,o.z==null?6:o.z),walk:null};
  D.setUsed=true;D.floor.visible=false;K.fog=new T.FogExp2(0x3a2e26,o.fog||.04);D.sc.fog=K.fog;D.sc.background=new T.Color(0x3a2e26);
  K.room=q.G();st.add(K.room);
  var wallM=M.s.clone();wallM.side=T.DoubleSide;
  K.shell=function(geo,x,y,z,rx,ry){var m=new T.Mesh(geo,wallM);m.position.set(x,y,z);m.rotation.set(rx||0,ry||0,0);m.userData.ns=1;K.room.add(m);return m};
  K.ground=function(w,d,z){var m=new T.Mesh(new T.PlaneGeometry(w,d),D.floor.material);m.rotation.x=-Math.PI/2;m.position.z=z||0;K.room.add(m);return m};
  K.column=function(x,z,h){h=h||3.3;var r=K.room;q.c(r,.36,.42,.2,x,.1,z,'s');q.c(r,.19,.24,h,x,.2+h/2,z,'s');q.c(r,.44,.21,.5,x,.45+h,z,'s');q.b(r,.95,.14,.95,x,.77+h,z,'s')};
  K.hall=function(W,len,zc){
    zc=zc||0;var zf=zc-len/2,zb=Math.max(zc+len/2,K.pos.z+5);len=zb-zf;zc=(zb+zf)/2;K.ground(W*2+.4,len,zc);
    K.shell(new T.PlaneGeometry(len,W),-W,W/2,zc,0,Math.PI/2);K.shell(new T.PlaneGeometry(len,W),W,W/2,zc,0,-Math.PI/2);
    K.shell(new T.CylinderGeometry(W,W,len,28,1,true,Math.PI/2,Math.PI),0,W,zc,Math.PI/2);
    K.shell(new T.PlaneGeometry(W*2,W*2),0,W,zc-len/2);K.shell(new T.PlaneGeometry(W*2,W*2),0,W,zc+len/2);
    for(var z=zc-len/2+2;z<zc+len/2-1;z+=4)[-1,1].forEach(function(sd){q.b(K.room,.5,W,.4,sd*(W-.2),W/2,z,'s');q.t(K.room,1.75,.1,sd*(W-.06),W*.6,z+2,'s',0,Math.PI/2,Math.PI)});
  };
  K.target=function(obj,r,nr,fn,hy){
    var t={obj:obj,nr:nr,live:true,cool:0};
    t.fn=function(amt){if(!t.live||K.fin||K.walk)return;if(amt==null){if(t.cool>0)return;t.cool=.14}lastHit=D.time;fn(t,amt)};
    t.hit=D.hit(obj,0,hy||0,0,r,function(){t.fn(null)});K.targets.push(t);return t;
  };
  K.kill=function(t){t.live=false;D.off(t.hit)};
  K.hits=function(obj,r,nr,n,regen,onHit,onDone,hy){
    var hp=n,t=K.target(obj,r,nr,function(tt,amt){
      if(amt!=null){if(tt.cool>0)return;tt.cool=.14}
      hp-=1;D.tone(240+hp*45,.1);K.shake=.22;D.burst(D.wpos(obj),0xffffff,true);
      if(onHit)onHit(1-Math.max(0,hp)/n);if(hp<=0){K.kill(tt);onDone()}
    },hy);
    if(regen)K.ups.push(function(tm,dt){if(t.live&&hp<n){hp=Math.min(n,hp+dt*regen);if(onHit)onHit(1-hp/n)}});
    return t;
  };
  K.rub=function(g,r,nr,onGone){
    var dirt=1,t=K.target(g,r,nr,function(tt,amt){
      dirt-=amt==null?.5:amt/150;if(amt==null)D.tone(460,.07);
      if(dirt<=0){K.kill(tt);if(g.parent)g.parent.remove(g);D.tone(620,.14);onGone()}else g.scale.setScalar(.4+.6*dirt);
    });
    K.ups.push(function(tm,dt){if(t.live&&dirt<1){dirt=Math.min(1,dirt+dt*.04);g.scale.setScalar(.4+.6*dirt)}});return t;
  };
  K.tag=function(txt,obj,dy,x,y,z){
    var tg=D.tag(txt);st.add(tg);K.tags.push(tg);
    if(obj)K.ups.push(function(){if(tg.visible){obj.getWorldPosition(v0);tg.position.set(v0.x,v0.y+(dy||1),v0.z)}});else tg.position.set(x,y,z);
    return tg;
  };
  K.complete=function(k,line){K.doneN++;D.say(sp.items[k][0],line||sp.items[k][1]);D.light(.2+.8*K.doneN/K.total);K.shake=Math.max(K.shake,.3);if(K.doneN>=K.total){K.finish();if(K.onAll)K.onAll()}};
  K.finish=function(){if(!K.fin){K.fin=.001;D.tone(392,.7,.2);D.tone(587,.9,.5)}};
  K.walkTo=function(pts,d,done){K.walk={p:pts,d:reduce?.05:d,t:0,done:done}};
  var r=K.room;
  /* more rooms */
  K.plain=function(peaks){K.ground(150,150,-30);if(peaks!==0){q.k(r,16,24,-24,12,-56,'s');q.k(r,20,30,6,15,-64,'s');q.k(r,14,20,30,10,-54,'s')}};
  K.court=function(W,L,zc){zc=zc||0;K.ground(W*2+40,L+40,zc);[-1,1].forEach(function(sd){q.b(r,.5,1,L,sd*W,.5,zc,'s');for(var z=zc-L/2+1;z<=zc+L/2;z+=4)K.column(sd*(W-.9),z)});q.b(r,W*2,1,.5,0,.5,zc-L/2,'s')};
  K.rotunda=function(R,n,h){h=h||3.3;var m=new T.Mesh(new T.CircleGeometry(R+2,40),D.floor.material);m.rotation.x=-Math.PI/2;r.add(m);for(var i=0;i<n;i++){var a=(i+.5)/n*6.2832;K.column(Math.sin(a)*R,Math.cos(a)*R,h)}K.shell(new T.CylinderGeometry(R+1.6,R+1.6,h+3,40,1,true),0,(h+3)/2,0);K.shell(new T.SphereGeometry(R+1.6,32,12,0,6.2832,0,1.5708),0,h+3,0)};
  K.cavern=function(R){K.ground(R*2.2,R*2.2,0);var m=K.shell(new T.SphereGeometry(R,24,14),0,0,0);m.scale.y=.62;for(var i=0;i<7;i++){var a=1.9+i*.42;q.s(r,1+((i*7)%4)*.4,Math.sin(a)*(R-2.4),.2,Math.cos(a)*(R-2.4),'d',.8)}};
  K.shaft=function(x,y,z,r1,r2,h,rx,rz,op){var mm=M.r.clone();mm.opacity=op==null?.16:op;var s=new T.Mesh(new T.CylinderGeometry(r1,r2,h,20,1,true),mm);s.position.set(x,y,z);s.rotation.set(rx||0,0,rz||0);s.userData.ns=1;r.add(s);return s};
  K.stair=function(n,x,z,w,rise,run,y0){for(var i=0;i<n;i++)q.b(r,w,rise*(i+1),run,x,(y0||0)+rise*(i+1)/2,z-i*run,'s')};
  /* more props */
  K.asset=function(x,z,s,name,y){var a=D.asset(name||sp.set);a.position.set(x,y||0,z);a.scale.setScalar(s||1.5);st.add(a);return a};
  K.orb=function(s){s=s||1;var g=q.G();q.s(g,.2*s,0,0,0,'l');g.add(D.glow(2.2*s));return g};
  K.tok=function(name,s){s=s||1;var t=D.plinth(name).userData.tok,g=q.G();t.scale.setScalar(s);t.position.set(0,-.5*s,0);g.add(t);return g};
  K.plinth=function(name,x,z,s){var g=D.plinth(name);g.position.set(x,0,z);g.scale.setScalar(s||1.3);st.add(g);return g};
  K.niche=function(x,z,ry,m){var g=q.G();g.position.set(x,0,z);g.rotation.y=ry||0;st.add(g);q.b(g,.3,2.6,.4,-.9,1.3,0,'s');q.b(g,.3,2.6,.4,.9,1.3,0,'s');q.t(g,.9,.16,0,2.6,0,'s',0,0,Math.PI);q.b(g,1.6,3.2,.06,0,1.6,-.2,m||'d');q.b(g,2.2,.2,.7,0,.1,.1,'s');return g};
  K.jar=function(p,x,y,z,s){var g=q.G();g.position.set(x,y,z);g.scale.setScalar(s||1);p.add(g);q.s(g,.55,0,.66,0,'c',1.2);q.c(g,.22,.3,.3,0,1.42,0,'c');q.t(g,.24,.05,0,1.58,0,'c',1.5708);return g};
  K.brazier=function(p,x,z,s){var g=q.G();g.position.set(x,0,z);p.add(g);q.c(g,.2,.5,1.3,0,.65,0,'s');q.c(g,.75,.35,.4,0,1.5,0,'d');g.fl=q.fl(g,0,1.6,0,s||2);g.gl=D.glow(7);g.gl.position.y=2.2;g.add(g.gl);g.set=function(v){g.fl.setOn(v);g.gl.visible=v};return g};
  K.candle=function(p,x,y,z,on){var g=q.G();g.position.set(x,y,z);p.add(g);q.c(g,.07,.08,.6,0,.3,0,'p');q.c(g,.16,.2,.06,0,.03,0,'d');g.fl=q.fl(g,0,.6,0,.7);g.gl=D.glow(3);g.gl.position.y=.9;g.add(g.gl);g.set=function(v){g.fl.setOn(v);g.gl.visible=v};g.set(!!on);return g};
  K.panel=function(p,x,y,z,w,h,m,ry){var g=q.G();g.position.set(x,y,z);g.rotation.y=ry||0;p.add(g);q.b(g,w+.2,h+.2,.08,0,0,-.03,'g');q.b(g,w,h,.06,0,0,.02,m||'p');return g};
  K.chest=function(p,x,z,s,ry){var g=q.G();g.position.set(x,0,z);g.rotation.y=ry||0;g.scale.setScalar(s||1);p.add(g);q.b(g,1.2,.6,.8,0,.3,0,'w');q.b(g,1.26,.08,.86,0,.3,0,'d');g.lid=q.G();g.lid.position.set(0,.6,-.4);g.add(g.lid);q.b(g.lid,1.2,.2,.8,0,.1,.4,'w');q.b(g,.14,.2,.04,0,.5,.41,'g');return g};
  K.rope=function(p,a,b,rr,m){var d=new T.Vector3().subVectors(b,a),L=d.length(),o=new T.Mesh(new T.CylinderGeometry(rr,rr,L,8),M[m||'w']);o.position.copy(a).addScaledVector(d,.5);o.quaternion.setFromUnitVectors(new T.Vector3(0,1,0),d.normalize());p.add(o);return o};
  K.v=function(x,y,z){return new T.Vector3(x,y,z)};
  /* moving, looking */
  K.go=function(pts,d,done){K.walkTo([[K.pos.x,K.pos.y,K.pos.z]].concat(pts),d,function(){K.yawTo=0;if(done)done()})};
  K.pitchTo=null;K.fogT=null;
  K.ups.push(function(t,dt){if(K.pitchTo!=null)K.pitch+=(K.pitchTo-K.pitch)*Math.min(1,dt*1.2);if(K.fogT!=null)K.fog.density+=(K.fogT-K.fog.density)*Math.min(1,dt*1.5)});
  /* ways of playing */
  K.choose=function(list,right,wrong){var busy=false;sp.items.forEach(function(it,n){var c=list[n],tg=K.tag(it[0],c.g,c.ty==null?2:c.ty);
    K.target(c.g,c.r||.8,c.nr||.13,function(t){if(busy)return;busy=true;K.kill(t);tg.visible=false;
      if(it[2]){D.tone(520,.4);var fin=function(){D.say(it[0],it[1]);D.light(1);K.finish()};if(right)right(n,c.g,fin);else fin()}
      else{D.tone(150,.3);var no=function(){busy=false;K.shake=Math.max(K.shake,.3);D.say(it[0],it[1],true)};if(wrong)wrong(n,c.g,no);else no()}},c.hy||0)})};
  K.order=function(list,go){var cur=0,busy=false;sp.items.forEach(function(it,n){var c=list[n],tg=K.tag(it[0],c.g,c.ty==null?2:c.ty);
    K.target(c.g,c.r||.9,c.nr||.13,function(t){if(busy)return;if(n!==cur){D.hint('Take them in order.');return}busy=true;cur++;K.kill(t);tg.visible=false;D.tone(300+n*40,.3);
      var fin=function(){busy=false;K.complete(n)};if(go)go(n,c.g,fin);else fin()},c.hy||0)})};
  K.sort=function(bins,mk,o){o=o||{};var idx=0,cur=null,ctag=null,busy=false,held=true;
    function next(){if(idx>=sp.items.length){cur=null;return}var it=sp.items[idx];cur=mk?mk(it,idx):K.orb();cur.scale.setScalar(o.s||.65);st.add(cur);ctag=K.tag(it[0],cur,o.ty||.5);held=true}
    K.ups.push(function(t){if(cur&&held)cur.position.set(K.pos.x-Math.sin(K.yaw)*2.5,K.pos.y-.85+Math.sin(t*2)*.05,K.pos.z-Math.cos(K.yaw)*2.5)});
    bins.forEach(function(b,k){K.tag(sp.bins[k],b.g,b.ty==null?2.6:b.ty);
      K.target(b.g,b.r||1,b.nr||.15,function(){if(busy||!cur)return;var it=sp.items[idx],c=cur,tg=ctag;
        if(it[1]===k){busy=true;held=false;var a=c.position.clone(),e2=D.wpos(b.g).clone();e2.y+=b.fy==null?1.2:b.fy;D.tone(494+k*60,.3);
          D.tween(.6,function(e){c.position.set(a.x+(e2.x-a.x)*e,a.y+(e2.y-a.y)*e+Math.sin(e*Math.PI)*.9,a.z+(e2.z-a.z)*e);c.scale.setScalar((o.s||.65)*(1-e*.4))},function(){tg.visible=false;if(b.got)b.got(c,k);else st.remove(c);busy=false;var n=idx;idx++;K.complete(n,it[2]);next()})}
        else{D.tone(150,.2);K.shake=.35;D.hint('Not there. Try another.')}},b.hy==null?1:b.hy)});
    next()};
  K.strike=function(n,g,o,onHit,onDone){o=o||{};var it=sp.items[n],ty=o.ty==null?1.6:o.ty,tg=K.tag(it[0],g,ty);
    K.hits(g,o.r||.8,o.nr||.12,o.hp||2,o.regen||0,onHit,function(){tg.visible=false;if(onDone)onDone();if(o.rev&&it[2]){var w=D.wpos(g);K.tag(it[2],null,0,w.x,w.y+ty,w.z)}K.complete(n)},o.hy||0);return tg};
  K.wipe=function(n,g,o,onDone){o=o||{};var tg=K.tag(sp.items[n][0],g,o.ty==null?.9:o.ty);K.rub(g,o.r||.7,o.nr||.11,function(){tg.visible=false;if(onDone)onDone();K.complete(n)});return tg};
  K.tap=function(n,g,o,fn){o=o||{};var it=sp.items[n],ty=o.ty==null?1.6:o.ty,tg=K.tag(it[0],g,ty);
    K.target(g,o.r||.8,o.nr||.12,function(t){K.kill(t);tg.visible=false;D.tone(420+n*40,.25);var fin=function(){if(o.rev&&it[2]){var w=D.wpos(g);K.tag(it[2],null,0,w.x,w.y+ty,w.z)}K.complete(n)};if(fn)fn(fin);else fin()},o.hy||0);return tg};
  D.light(.2);
  /* speech bubbles never overlap: each frame, any bubble that would cover another on screen is lifted above it, smoothly */
  var uv=new T.Vector3(),ucam=new T.Vector3();
  function unstack(dt){
    var cam=D.cam;if(!cam)return;var tf=Math.tan(cam.fov*Math.PI/360),L=[],k;
    cam.getWorldDirection(ucam);
    for(k=0;k<K.tags.length;k++){var tg=K.tags[k];if(!tg.visible){tg.userData.off=0;continue}
      uv.copy(tg.position).sub(cam.position);var d=uv.dot(ucam);if(d<.1)continue;
      var f=1/(d*tf);uv.copy(tg.position).project(cam);
      L.push({tg:tg,x:uv.x,y:uv.y,hw:tg.scale.x*.5*f/cam.aspect,hh:tg.scale.y*.5*f,f:f})}
    L.sort(function(a,b){return a.y-b.y||a.x-b.x});
    var placed=[],pad=.012;
    L.forEach(function(e){var off=0,moved=true,n=0;
      while(moved&&n++<12){moved=false;for(var j=0;j<placed.length;j++){var p=placed[j];
        if(Math.abs(e.x-p.x)<e.hw+p.hw+pad&&Math.abs(e.y+off-p.y)<e.hh+p.hh+pad){off=p.y+p.hh+e.hh+pad-e.y;moved=true}}}
      placed.push({x:e.x,y:e.y+off,hw:e.hw,hh:e.hh});
      var want=off/e.f,cur=e.tg.userData.sm||0;cur+=(want-cur)*Math.min(1,dt*10);e.tg.userData.sm=cur;e.tg.userData.off=cur;e.tg.position.y+=cur});
  }
  D.onUpdate(function(t,dt){
    var k;for(k=0;k<K.targets.length;k++)K.targets[k].cool-=dt;
    for(k=0;k<K.tags.length;k++){var tg0=K.tags[k];if(tg0.userData.off)tg0.position.y-=tg0.userData.off}
    for(k=0;k<K.ups.length;k++)K.ups[k](t,dt);
    unstack(dt);
    if(K.walk){
      var w=K.walk;w.t+=dt;var u=Math.min(1,w.t/w.d);u=u*u*(3-2*u);var f=u*(w.p.length-1),i=Math.min(w.p.length-2,Math.floor(f)),a=w.p[i],b=w.p[i+1],g=f-i;
      K.pos.set(a[0]+(b[0]-a[0])*g,a[1]+(b[1]-a[1])*g,a[2]+(b[2]-a[2])*g);
      var dx=b[0]-a[0],dz=b[2]-a[2];
      if(dx*dx+dz*dz>.01){var df=Math.atan2(-dx,-dz)-K.yaw;while(df>Math.PI)df-=2*Math.PI;while(df<-Math.PI)df+=2*Math.PI;K.yaw+=df*Math.min(1,dt*3)}
      if(w.t>=w.d){K.walk=null;if(w.done)w.done()}
    }else if(K.yawTo!=null){
      while(K.yaw>Math.PI)K.yaw-=2*Math.PI;while(K.yaw<-Math.PI)K.yaw+=2*Math.PI;
      K.yaw+=(K.yawTo-K.yaw)*Math.min(1,dt*3);if(Math.abs(K.yawTo-K.yaw)<.02){K.yaw=K.yawTo;K.yawTo=null}
    }
    if(K.fin){K.fin+=dt;if(K.fin>(o.finDelay||1.5)&&!finished){finished=true;D.done()}}
  });
  D.gesture=function(a2,b2,d){
    if(K.fin||K.walk)return;
    if(d>=2)for(var k=0;k<K.targets.length;k++){
      var t=K.targets[k];if(!t.live)continue;
      t.hit.getWorldPosition(v0);var p=D.project(v0),ax=a2.x*asp,bx=b2.x*asp,px=p.x*asp,dx=bx-ax,dy=b2.y-a2.y,l2=dx*dx+dy*dy||1e-6,
        w=clamp(((px-ax)*dx+(p.y-a2.y)*dy)/l2,0,1),qx=ax+dx*w-px,qy=a2.y+dy*w-p.y;
      if(qx*qx+qy*qy<t.nr*t.nr){t.fn(d);return}
    }
    if(D.time-lastHit>.3&&K.yawTo==null){var ym=o.yawMax||1.2;K.yaw=clamp(K.yaw+(b2.x-a2.x)*1.1,-ym,ym);K.pitch=clamp(K.pitch-(b2.y-a2.y)*.45,-.45,.6)}
  };
  D.camFn=function(cam,dt){
    asp=cam.aspect;var port=asp<.85,ptr=D.ptr||{x:0,y:0},t=D.time,kk=Math.min(1,dt*5);
    if(!inited){inited=true;if(port)K.pos.z+=(o.portBack==null?1.2:o.portBack)}
    if(!K.walk&&K.yawTo==null){var ym=o.yawMax||1.2;K.yaw=clamp(K.yaw+((keys.left?1:0)-(keys.right?1:0))*dt*1.2,-ym,ym)}
    K.shake*=Math.exp(-dt*6);
    var sk=reduce?0:K.shake,bob=reduce?0:Math.sin(t*1.3)*.025+(K.walk?Math.sin(t*9)*.04:0);
    cam.fov=port?70:60;cam.updateProjectionMatrix();
    /* stand a little back from the action and a little higher, looking slightly down onto it */
    var BK=o.camBack==null?1.3:o.camBack,UP=o.camUp==null?.65:o.camUp;
    cam.position.set(K.pos.x+Math.sin(K.yaw)*BK+(Math.random()-.5)*sk*.25,K.pos.y+UP+bob+(Math.random()-.5)*sk*.25,K.pos.z+Math.cos(K.yaw)*BK);
    lx+=((touch?0:ptr.x*-.22)-lx)*kk;ly+=((touch?0:ptr.y*.14)-ly)*kk;
    var yy=K.yaw+lx,pp=K.pitch+ly+(o.pitch||.03)+(port?.08:0)-Math.atan2(UP,BK+6)*.9;
    cam.lookAt(cam.position.x-Math.sin(yy)*10,cam.position.y+Math.sin(pp)*10,cam.position.z-Math.cos(yy)*10);
  };
  D.fpCleanup=function(){D.sc.fog=null;D.sc.background=D.sky;D.floor.visible=true;D.camFn=null;D.cam.fov=45;D.gesture=null};
  return K;
};
X.S=function(i,o,fn){X.MECH['s'+i+'fp']=function(D,sp){var K=X.fp(D,sp,o);fn(K,D,sp,K.q,K.st,K.room)}};
})();
