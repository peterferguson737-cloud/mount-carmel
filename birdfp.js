(function(){
'use strict';
var X=window.ASCENT;if(!X)return;
var MECH=X.MECH,keys=X.keys,segX=X.segX,reduce=X.reduce;
/* Book One, chapter 11, as a first-person scene: a rotunda in fog, a great bird held by four cords, a knife in your hand. */
MECH.birdfp=function(D,sp){
  var T=D.T,q=D.q,M=q.M,st=D.stage,i,j,TAU2=Math.PI*2,UP=new T.Vector3(0,1,0);
  D.setUsed=true;

  /* ── the room ── */
  D.floor.visible=false;D.sc.fog=new T.FogExp2(0x3a2e26,.036);D.sc.background=new T.Color(0x3a2e26);
  var room=q.G();st.add(room);
  var fl=new T.Mesh(new T.CircleGeometry(12.6,56),D.floor.material);fl.rotation.x=-Math.PI/2;room.add(fl);
  q.c(room,3.7,3.9,.22,0,.11,0,'s');q.t(room,3.2,.05,0,.23,0,'d',1.5708);q.t(room,1.2,.04,0,.23,0,'d',1.5708);
  var NC=8,RC=5.4,cols=[];
  for(i=0;i<NC;i++){
    var a=(i+.5)/NC*TAU2,x=Math.sin(a)*RC,z=Math.cos(a)*RC;cols.push([x,z]);
    q.c(room,.4,.46,.2,x,.1,z,'s');q.t(room,.34,.07,x,.25,z,'s',1.5708);q.c(room,.2,.25,3.4,x,2,z,'s');q.t(room,.23,.05,x,3.68,z,'s',1.5708);
    q.c(room,.46,.22,.52,x,3.98,z,'s');
    for(j=0;j<4;j++)q.s(room,.11,x+Math.sin(a+j*1.5708+.785)*.42,4.12,z+Math.cos(a+j*1.5708+.785)*.42,'s');
    q.b(room,1,.14,1,x,4.32,z,'s',a);
  }
  for(i=0;i<NC;i++){
    var p1=cols[i],p2=cols[(i+1)%NC],dx=p2[0]-p1[0],dz=p2[1]-p1[1],L=Math.sqrt(dx*dx+dz*dz);
    q.t(room,L/2,.14,(p1[0]+p2[0])/2,4.39,(p1[1]+p2[1])/2,'s',0,-Math.atan2(dz,dx),Math.PI);
  }
  var top=6.46,wallM=M.s.clone(),darkM=M.d.clone();wallM.side=T.DoubleSide;darkM.side=T.DoubleSide;
  function shell(geo,mat,y,rx){var m=new T.Mesh(geo,mat);m.position.y=y;if(rx)m.rotation.x=rx;m.userData.ns=1;room.add(m);return m}
  shell(new T.CylinderGeometry(RC,RC,1,48,1,true),wallM,top+.5);
  shell(new T.SphereGeometry(RC,40,14,0,TAU2,.24,Math.PI/2-.24),wallM,top+1);
  shell(new T.RingGeometry(RC,12.6,56),darkM,top,Math.PI/2);
  shell(new T.CylinderGeometry(12.6,12.6,top,56,1,true),wallM,top/2);
  for(i=0;i<16;i++){
    var b=i/16*TAU2;q.b(room,.6,top,.35,Math.sin(b)*12.4,top/2,Math.cos(b)*12.4,'s',b);
    if(i%2===0){var c2=b+TAU2/32,nx=Math.sin(c2)*12.45,nz=Math.cos(c2)*12.45;q.b(room,1.3,2.8,.12,nx,2.6,nz,i%4===0?'p':'n',c2);q.t(room,.65,.08,nx,4,nz,'s',0,c2,Math.PI)}
  }
  var shaftM=M.r.clone();shaftM.side=T.DoubleSide;
  var shaft=new T.Mesh(new T.CylinderGeometry(1.2,3,top+1.2,28,1,true),shaftM);shaft.position.y=(top+1.2)/2;room.add(shaft);
  var dp=[];for(i=0;i<180;i++){var da=Math.random()*TAU2,dr=Math.random()*3.2;dp.push(Math.sin(da)*dr,Math.random()*7.5,Math.cos(da)*dr)}
  var dg=new T.BufferGeometry();dg.setAttribute('position',new T.Float32BufferAttribute(dp,3));
  var dust=new T.Points(dg,new T.PointsMaterial({color:0xffffff,size:.05,transparent:true,opacity:.5,depthWrite:false}));room.add(dust);

  /* ── rocks the cords are tied to ── */
  var AN=[[-2.7,1.7],[-2.2,-1.5],[2.7,1.7],[2.2,-1.5]],anchors=[];
  AN.forEach(function(p,n){
    var r=new T.Mesh(new T.DodecahedronGeometry(1,0),M.s);r.scale.set(.8,.55,.7);r.position.set(p[0],.62,p[1]);r.rotation.y=n*1.3;room.add(r);
    var r2=new T.Mesh(new T.DodecahedronGeometry(1,0),M.s);r2.scale.set(.35,.25,.3);r2.position.set(p[0]+.8,.4,p[1]+.3);room.add(r2);
    var r3=new T.Mesh(new T.DodecahedronGeometry(1,0),M.d);r3.scale.set(.22,.16,.2);r3.position.set(p[0]-.6,.34,p[1]-.5);room.add(r3);
    anchors.push(new T.Vector3(p[0],1.05,p[1]));
  });

  /* ── the bird ── */
  var bird=q.G(),baseY=3.4;st.add(bird);
  q.s(bird,.62,0,0,0,'p',1.55,1,.8);q.c(bird,.2,.34,1.3,0,1.35,0,'p');q.s(bird,.27,0,2.05,0,'p',1.2);q.k(bird,.17,1.15,0,2.82,0,'c');
  q.s(bird,.045,-.2,2.1,.14,'n');q.s(bird,.045,.2,2.1,.14,'n');
  for(j=0;j<5;j++)q.s(bird,.2,(j-2)*.2,-1.55-(2-Math.abs(j-2))*.16,-.12,'p',2.7,1,.24);
  [-1,1].forEach(function(sd){
    q.c(bird,.035,.04,.9,sd*.18,-1.55,.22,'c');
    for(j=-1;j<=1;j++)q.c(bird,.02,.02,.3,sd*.18+j*.07,-2.08,.3,'c',j*.5,.5);
  });
  function wing(side){
    var w=q.G(),o=q.G(),f;w.position.set(side*.42,.55,0);o.position.set(side*1.75,-.05,0);w.add(o);
    q.c(w,.07,.1,1.8,side*.9,0,0,'p',1.5708);
    for(j=0;j<6;j++){f=q.s(w,.25,side*(.3+j*.27),-.55-j*.04,-.03,'p',2.3,1,.2);f.rotation.z=side*(.1+j*.07)}
    for(j=0;j<6;j++){f=q.s(w,.2,side*(.25+j*.28),-.08,.07,'p',1.15,1,.28);f.rotation.z=side*(.12+j*.05)}
    q.c(o,.05,.07,1.3,side*.6,0,0,'p',1.5708);
    for(j=0;j<6;j++){f=q.s(o,.22,side*(.1+j*.22),-.6-j*.1,-.03,'p',2.8,1,.18);f.rotation.z=side*(.3+j*.11)}
    for(j=0;j<5;j++){f=q.s(o,.17,side*(.1+j*.24),-.1,.06,'p',1.1,1,.26);f.rotation.z=side*(.3+j*.08)}
    var e=new T.Object3D(),wr=new T.Object3D();e.position.set(side*.95,-.12,0);w.add(e);wr.position.set(side*.25,-.12,0);o.add(wr);
    q.t(w,.13,.03,side*.95,-.02,0,'w',0,1.5708);q.t(o,.11,.025,side*.25,-.02,0,'w',0,1.5708);
    bird.add(w);return {w:w,o:o,e:e,wr:wr};
  }
  var WL=wing(-1),WR=wing(1);
  bird.position.set(0,baseY,0);

  /* ── four cords: rope, cord, thread, hair ── */
  var atts=[WL.wr,WR.e,WR.wr,WL.e],ank=[0,3,2,1],rad=[.085,.05,.024,.009],col=[0x6a4a34,0x8a6a4c,0xd8ccb6,0xffffff];
  var hp=[4,3,2,1],live=[1,1,1,1],left=4,slack=[1,1,1,1],cool=[0,0,0,0],thick=[1,1,1,1],segs=[],mats=[],hits=[],mids=[];
  for(i=0;i<4;i++)(function(k){
    var m=new T.MeshStandardMaterial({color:col[k],roughness:1,emissive:0xffffff,emissiveIntensity:0}),g=new T.CylinderGeometry(rad[k],rad[k],1,6);
    var s1=new T.Mesh(g,m),s2=new T.Mesh(g,m);st.add(s1);st.add(s2);segs.push([s1,s2]);mats.push(m);mids.push(new T.Vector3());
    hits.push(D.hit(st,0,2,0,.75,function(){strike(k)}));
  })(i);
  var glint=D.glow(.5);st.add(glint);
  var ringTex=(function(){var c=document.createElement('canvas');c.width=c.height=128;var g=c.getContext('2d');
    g.strokeStyle='#fff';g.lineWidth=9;g.beginPath();g.arc(64,64,46,0,6.2832);g.stroke();
    g.lineWidth=5;[[64,4,64,30],[64,98,64,124],[4,64,30,64],[98,64,124,64]].forEach(function(l){g.beginPath();g.moveTo(l[0],l[1]);g.lineTo(l[2],l[3]);g.stroke()});
    return new T.CanvasTexture(c)})();
  var rings=[];for(i=0;i<4;i++){var rg=new T.Sprite(new T.SpriteMaterial({map:ringTex,transparent:true,depthTest:false,depthWrite:false}));rg.renderOrder=9;st.add(rg);rings.push(rg)}
  var tags=[];for(i=0;i<4;i++){var tg=D.tag(sp.items[i][0]);st.add(tg);tags.push(tg)}
  var vP=new T.Vector3(),vd=new T.Vector3();
  function setSeg(m,a2,b2,tk){vd.subVectors(b2,a2);var len=vd.length()||.001;m.position.copy(a2).addScaledVector(vd,.5);m.scale.set(tk,len,tk);m.quaternion.setFromUnitVectors(UP,vd.multiplyScalar(1/len))}

  /* ── the fight ── */
  var phase='rest',pt=.9,target=-1,lunge=0,lift=0,shake=0,swing=0,free=0,finished=false,ldir=new T.Vector3(0,1,0);
  function feathers(n){
    if(reduce)return;
    for(var c=0;c<n;c++)(function(){
      var f=q.s(st,.12,0,0,0,'p',.25,1,.5),sx=bird.position.x+(Math.random()-.5)*3,sy=bird.position.y+(Math.random()-.5)*1.5,sz=bird.position.z+(Math.random()-.5)*1.5,ph=Math.random()*6;
      D.tween(2.4,function(e){f.position.set(sx+Math.sin(e*7+ph)*.5,sy-e*(sy-.3),sz+Math.cos(e*5+ph)*.3);f.rotation.set(e*6,ph,e*4)},function(){st.remove(f)});
    })();
  }
  function strike(k){
    if(!live[k]||free)return;
    swing=1;lastCut=D.time;
    if(cool[k]>0)return;
    var tight=phase==='pull'&&target===k;
    cool[k]=.16;hp[k]-=tight?2:1;shake=tight?.4:.25;D.burst(mids[k].clone(),0xffffff,true);D.tone(520-k*60,.12);
    if(hp[k]>0){thick[k]*=.62;return}
    live[k]=0;left--;segs[k][0].visible=false;segs[k][1].visible=false;rings[k].visible=false;tags[k].visible=false;D.off(hits[k]);if(k===3)glint.visible=false;
    D.tone(170,.25);D.tone(900,.2,.05);shake=.6;lift+=.3;feathers(7);
    D.say(sp.items[k][0],sp.items[k][1]);D.light(.2+.8*(4-left)/4);
    phase='rest';pt=.8;target=-1;
    if(!left){free=.001;D.tone(392,.7,.2);D.tone(587,.9,.5)}
  }
  var lastCut=-9;
  D.gesture=function(a2,b2,d){
    if(free)return;
    if(d>=3)for(var k=0;k<4;k++){
      if(!live[k])continue;
      atts[k].getWorldPosition(vP);
      var pa=D.project(anchors[ank[k]]),pm=D.project(mids[k]),pp=D.project(vP);
      if(segX(a2,b2,pa,pm)||segX(a2,b2,pm,pp)){strike(k);return}
    }
    if(D.time-lastCut>.35)th=Math.max(-1.45,Math.min(1.45,th-(b2.x-a2.x)*1.3));
  };
  D.light(.2);
  D.onUpdate(function(t,dt){
    var k;
    for(k=0;k<4;k++)cool[k]-=dt;
    if(!free){
      pt-=dt;
      if(pt<=0){
        if(phase==='rest'){var c=[];for(k=0;k<4;k++)if(live[k])c.push(k);target=c[Math.floor(Math.random()*c.length)];phase='coil';pt=.34}
        else if(phase==='coil'){phase='pull';pt=1.9;D.tone(108,.3,0,.04);shake=Math.max(shake,.14);feathers(1)}
        else{phase='rest';pt=.45+Math.random()*.35;target=-1}
      }
    }
    var want=phase==='pull'?1:(phase==='coil'?-.4:0);lunge+=(want-lunge)*Math.min(1,dt*9);
    if(target>=0){var A2=anchors[ank[target]];ldir.set(-A2.x,2.4,-A2.z).normalize()}
    var trem=phase==='pull'?Math.sin(t*46)*.035:0;
    if(free){
      free+=dt;bird.position.set(Math.sin(t*3)*.15,baseY+lift+free*free*1.6,0);bird.rotation.z=Math.sin(t*3)*.08;bird.rotation.x=0;
      if(free>1.4&&!finished){finished=true;D.light(1);feathers(10);D.done()}
    }else{
      bird.position.set(ldir.x*lunge*.55+trem,baseY+lift+ldir.y*lunge*.42+Math.sin(t*5)*.05,ldir.z*lunge*.55);
      bird.rotation.z=-ldir.x*lunge*.2;bird.rotation.x=ldir.z*lunge*.2;
    }
    var fq=free?7:(phase==='pull'?17:10),am=free?.8:(phase==='pull'?.5:.28),fz=Math.sin(t*fq),fo=Math.sin(t*fq-.9);
    WL.w.rotation.z=-.2-fz*am;WR.w.rotation.z=.2+fz*am;WL.o.rotation.z=-.25-fo*am*.8;WR.o.rotation.z=.25+fo*am*.8;
    bird.updateMatrixWorld(true);
    for(k=0;k<4;k++){
      if(!live[k])continue;
      var w2=(phase==='pull'&&target===k)?0:1;slack[k]+=(w2-slack[k])*Math.min(1,dt*(w2?4:15));
      var A3=anchors[ank[k]],md=mids[k];atts[k].getWorldPosition(vP);
      md.lerpVectors(A3,vP,.5);md.y-=slack[k]*1.05;md.x+=Math.sin(t*2+k)*.14*slack[k]+(slack[k]<.2?Math.sin(t*60+k)*.02:0);
      setSeg(segs[k][0],A3,md,thick[k]);setSeg(segs[k][1],md,vP,thick[k]);
      mats[k].emissiveIntensity=(1-slack[k])*.5*(.6+.4*Math.sin(t*22));
      hits[k].position.copy(md);
      var tightK=phase==='pull'&&target===k,rs=(k===3?(tightK?.8:.0):(tightK?1.15:.8))*(1+.12*Math.sin(t*7+k));
      rings[k].position.copy(md);rings[k].scale.set(rs,rs,1);rings[k].material.opacity=k===3?(tightK?1:0):(tightK?1:.55);
      tags[k].position.set(md.x,md.y+.55,md.z);tags[k].visible=k===3?tightK:true;
      if(k===3){glint.position.lerpVectors(A3,vP,.5+.4*Math.sin(t*3));glint.position.y-=slack[k]*.6;glint.material.opacity=.15+.85*(1-slack[k])}
    }
    dust.rotation.y+=dt*.05;shaftM.opacity=.11+.04*Math.sin(t*.7)+(free?Math.min(.3,free*.12):0);
  });

  /* ── first-person camera: A and D circle the bird, the pointer turns your head ── */
  var th=0,thv=0,lookx=0,looky=0;
  var touch=!!(window.matchMedia&&window.matchMedia('(pointer:coarse)').matches),lastPtr=null,ptrAge=9;
  D.camFn=function(cam,dt){
    var asp=cam.aspect,port=asp<.85,ptr=D.ptr||{x:0,y:0},t=D.time,kk=Math.min(1,dt*5);
    if(ptr!==lastPtr){lastPtr=ptr;ptrAge=0}else ptrAge+=dt;
    thv+=(((keys.right?1:0)-(keys.left?1:0))*1.25-thv)*Math.min(1,dt*7);th=Math.max(-1.45,Math.min(1.45,th+thv*dt));
    shake*=Math.exp(-dt*7);swing*=Math.exp(-dt*9);
    var sk=reduce?0:shake,Rr=port?10.2:8.4,ex=Math.sin(th)*Rr,ez=Math.cos(th)*Rr,bob=reduce?0:Math.sin(t*1.3)*.03+Math.abs(thv)*Math.sin(t*9)*.03;
    cam.fov=port?66:60;cam.updateProjectionMatrix();
    cam.position.set(ex+(Math.random()-.5)*sk*.3,2.3+bob+(Math.random()-.5)*sk*.3,ez);
    lookx+=((touch?0:ptr.x*1.7)-lookx)*kk;looky+=((touch?0:ptr.y*1.1)-looky)*kk;
    cam.lookAt(Math.cos(th)*lookx,(port?4.3:3.1)+looky+(free?Math.min(9,free*free*1.5):0),-Math.sin(th)*lookx);
  };
  D.fpCleanup=function(){
    D.sc.fog=null;D.sc.background=D.sky;D.floor.visible=true;D.camFn=null;D.cam.fov=45;D.gesture=null;
  };
};
})();
