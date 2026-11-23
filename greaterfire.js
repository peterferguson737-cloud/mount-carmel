/* Book One, chapter 14 — "Kindled in love with yearnings" — Pie-Eyed. A feature lantern, seen through your own eyes.
   You are crossing a warm kitchen at night toward the courtyard door. A pie is cooling on the sill, and a ribbon of its steam
   catches you by the nose and tows you back. Pull against it and you skid and lose ground: willpower alone does not get you
   out. Then someone calls from the courtyard. Turn toward his voice and run: the same button you were pressing a moment ago.
   The ribbon stretches, and snaps. The pie is still there, and still smells wonderful. What changed is whom you are running to.
   Controls are the lanterns' standard: hold Space (or press and hold) to run, A and D to turn, tap things. */
(function(){
'use strict';
var X=window.ASCENT;if(!X||!X.MECH)return;
var MECH=X.MECH,keys=X.keys,reduce=X.reduce;

MECH.s15fp=function(D,sp){
  var T=D.T,q=D.q,M=q.M,st=D.stage,PI=Math.PI,TAU=PI*2,i;
  D.setUsed=true;D.floor.visible=false;
  D.sc.fog=new T.FogExp2(0x241a13,.03);D.sc.background=new T.Color(0x241a13);
  var touch=!!(window.matchMedia&&window.matchMedia('(pointer:coarse)').matches);
  var items=sp.items||[],said={};function say(n){if(said[n])return;said[n]=1;var it=items[n];if(it)D.say(it[0],it[1])}
  function rand(a,b){return a+Math.random()*(b-a)}

  /* ── input: hold Space or press-and-hold to run; A/D turn (from the game); a held finger runs toward where it is ── */
  var live=true,spaceDown=false,hold=null,lastPtr=-9,tapTo=null,tapUntil=0;
  var ray=new T.Raycaster(),plane=new T.Plane(new T.Vector3(0,1,0),0),v2=new T.Vector2(),h3=new T.Vector3();
  function floorAt(e){var cv=document.getElementById('scene');if(!cv||!D.cam)return null;var rc=cv.getBoundingClientRect();
    v2.set((e.clientX-rc.left)/rc.width*2-1,-((e.clientY-rc.top)/rc.height)*2+1);ray.setFromCamera(v2,D.cam);
    /* whatever you hold your finger on, run that way across the floor */
    var d=ray.ray.direction,l=Math.hypot(d.x,d.z)||1;return new T.Vector3(me.x+d.x/l*6,0,me.z+d.z/l*6)}
  function kd(e){if(!live||e.code!=='Space')return;wake();e.preventDefault();e.stopPropagation();spaceDown=true}
  function ku(e){if(e.code!=='Space')return;spaceDown=false;if(live){e.preventDefault();e.stopPropagation()}}
  function pd(e){if(!live)return;wake();lastPtr=D.time;var p=floorAt(e);hold={id:e.pointerId,p:p}}
  function pm(e){if(hold&&e.pointerId===hold.id){var p=floorAt(e);if(p)hold.p=p}}
  function pu(e){if(hold&&e.pointerId===hold.id)hold=null}
  try{window.addEventListener('keydown',kd,true);window.addEventListener('keyup',ku,true);window.addEventListener('pointerdown',pd,true);
    window.addEventListener('pointermove',pm,true);window.addEventListener('pointerup',pu,true);window.addEventListener('pointercancel',pu,true)}catch(_){}
  function runToward(v){tapTo=v.clone();tapUntil=D.time+1.7}

  /* ── sound ── */
  var actx=null;
  function soundOn(){try{var b=document.querySelector('.snd');return !b||!b.getAttribute||b.getAttribute('aria-pressed')!=='false'}catch(_){return true}}
  function wake(){if(!soundOn())return;try{actx=actx||new (window.AudioContext||window.webkitAudioContext)();if(actx.state==='suspended')actx.resume()}catch(_){}}
  function voice(pan){if(!soundOn())return;
    try{wake();var t0=actx.currentTime+.02;[[392,0],[587,.42],[494,.84]].forEach(function(nt){var o=actx.createOscillator(),o2=actx.createOscillator(),g=actx.createGain(),g2=actx.createGain(),out=g;
        o.type='triangle';o.frequency.value=nt[0];o2.type='sine';o2.frequency.value=nt[0]*2;g2.gain.value=.25;o2.connect(g2);g2.connect(g);o.connect(g);
        if(actx.createStereoPanner){var p=actx.createStereoPanner();p.pan.value=Math.max(-1,Math.min(1,pan||0));g.connect(p);out=p}
        out.connect(actx.destination);var t=t0+nt[1];g.gain.setValueAtTime(.0001,t);g.gain.linearRampToValueAtTime(.075,t+.06);g.gain.exponentialRampToValueAtTime(.0001,t+.62);o.start(t);o2.start(t);o.stop(t+.7);o2.stop(t+.7)})}
    catch(_){D.tone(392,.5,0);D.tone(587,.5,.42);D.tone(494,.6,.84)}}

  /* ── the kitchen ── */
  var PIE=new T.Vector3(-9.2,1.32,0),DOOR=new T.Vector3(9.4,0,0);
  var room=q.G();st.add(room);
  q.b(room,20.4,.3,12.4,0,-.15,0,'c');for(var x=-9;x<=9;x+=2)for(var z=-5;z<=5;z+=2)if(((x+z)/2)%2===0)q.b(room,1.96,.02,1.96,x,.01,z,'w');
  q.b(room,20.4,6,.4,0,3,-6.2,'p');q.b(room,20.4,6,.4,0,3,6.2,'p');q.b(room,.4,6,12.4,-10.2,3,0,'p');
  q.b(room,.4,6,5.4,10.2,3,-3.5,'p');q.b(room,.4,6,5.4,10.2,3,3.5,'p');q.b(room,.4,1.6,1.6,10.2,5.2,0,'p');
  q.b(room,.5,4.6,.3,10.2,2.2,-.9,'w');q.b(room,.5,4.6,.3,10.2,2.2,.9,'w');q.b(room,.5,.3,2.1,10.2,4.5,0,'w');
  q.b(room,20.4,.3,12.4,0,6.1,0,'w');for(i=-4;i<=4;i++)q.b(room,.3,.3,12.4,i*2.3,5.85,0,'d');
  /* the courtyard beyond the door: night, a fountain's glint, and a light where the voice comes from */
  var yard=q.G();yard.position.set(16,0,0);room.add(yard);q.b(yard,12,.2,14,0,-.1,0,'s');q.c(yard,1.2,1.3,.5,2,.25,1.5,'s');
  var caller=D.glow(3);caller.position.set(4,1.6,-1.2);caller.material.opacity=.2;yard.add(caller);
  var doorGlow=D.glow(5);doorGlow.position.set(10,2.4,0);doorGlow.material.opacity=.12;room.add(doorGlow);
  var doorLight=new T.PointLight(0xffffff,0,16,1.6);doorLight.position.set(9,2.5,0);room.add(doorLight);
  D.hit(room,9.8,1.8,0,1.5,function(){runToward(DOOR)});
  /* the window, the sill, the pie */
  q.b(room,.5,2.4,3,-10,2.6,0,'n');q.b(room,.9,.25,3.4,-9.7,1.18,0,'w');
  q.c(room,.7,.55,.32,-9.35,1.42,0,'c');q.c(room,.66,.66,.06,-9.35,1.6,0,'p');for(i=0;i<6;i++){var a=i/6*TAU;q.b(room,.5,.03,.06,-9.35+Math.cos(a)*.3,1.64,Math.sin(a)*.3,'w',-a)}
  var pieGlow=D.glow(2);pieGlow.position.set(-9.3,1.7,0);pieGlow.material.opacity=.35;room.add(pieGlow);
  /* the long table, the oven, shelves, hanging pots, a lamp */
  q.b(room,5.2,.22,2,1,1.1,-2.6,'w');[[-1.4,-3.4],[3.4,-3.4],[-1.4,-1.8],[3.4,-1.8]].forEach(function(l){q.b(room,.18,1.1,.18,l[0],.55,l[1],'w')});
  q.s(room,.28,0,1.38,-2.6,'c');q.c(room,.2,.24,.4,2.2,1.4,-2.4,'p');
  var ov=q.G();ov.position.set(-5,0,-5.4);room.add(ov);q.b(ov,3.4,3,1.4,0,1.5,0,'s');q.b(ov,1.5,1.1,.2,0,1.2,.72,'n');var og=D.glow(2.4);og.position.set(0,1.2,.9);og.material.opacity=.5;ov.add(og);
  var ol=new T.PointLight(0xffffff,.6,9,1.8);ol.position.set(0,1.4,1.4);ov.add(ol);
  for(i=0;i<3;i++){q.b(room,3.6,.12,.6,4.5,1.9+i*1.1,-5.7,'w');for(var j=0;j<4;j++)q.c(room,.18,.2,.42,3.1+j*.9,2.18+i*1.1,-5.6,j%2?'c':'p')}
  for(i=0;i<4;i++){var pt=q.G();pt.position.set(-2+i*1.6,4.6,-1);room.add(pt);q.c(pt,.02,.02,1.2,0,.6,0,'d');q.c(pt,.4,.32,.4,0,-.1,0,'d')}
  var lamp=new T.PointLight(0xffffff,.8,26,1.4);lamp.position.set(0,5.2,1);room.add(lamp);
  /* the armchair, which follows you about offering a seat */
  var chair=q.G();chair.position.set(-6,0,3.6);room.add(chair);q.b(chair,1.4,.5,1.3,0,.45,0,'c');q.b(chair,1.4,1.3,.3,0,1.1,-.55,'c');q.b(chair,.3,.8,1.3,-.62,.8,0,'c');q.b(chair,.3,.8,1.3,.62,.8,0,'c');
  var chairTag=D.tag('Have a seat?');chairTag.position.set(0,2.2,0);chair.add(chairTag);chairTag.visible=false;

  /* ── you ── */
  var me={x:-3,z:2.6,yaw:PI*.45,caught:false,free:false,strain:0,out:0},ribbon=null,puffs=[];
  function fwd(y){return new T.Vector3(Math.sin(y),0,-Math.cos(y))}
  function yawTo(p){return Math.atan2(p.x-me.x,-(p.z-me.z))}
  function wrap(a){while(a>PI)a-=TAU;while(a<-PI)a+=TAU;return a}
  for(i=0;i<16;i++){var s=D.glow(.75);s.material.opacity=0;st.add(s);puffs.push(s)}
  var dust=[];for(i=0;i<20;i++){var dd=D.glow(.6);dd.material.opacity=0;st.add(dd);dust.push({s:dd,t:9,v:new T.Vector3()})}
  function kick(n){for(var k=0,c=0;k<dust.length&&c<n;k++){var u=dust[k];if(u.t<.6)continue;u.t=0;var f=fwd(me.yaw);u.s.position.set(me.x+f.x*.6+rand(-.3,.3),.1,me.z+f.z*.6+rand(-.3,.3));u.v.set(rand(-1,1),rand(.5,1.4),rand(-1,1));c++}}

  /* ── the call ── */
  var call={on:false,t:0,next:5.5,n:0},stageT=0,firstSkid=false,shake=0,fov=58,doneT=0;
  D.hint(touch?'Cross the kitchen to the courtyard door. Hold your finger where you want to run.':'Cross the kitchen to the courtyard door. Hold Space to run; A and D turn.');

  D.onUpdate(function(t,dt){
    dt=Math.min(dt,.05);stageT+=dt;
    /* the steam reaches for you */
    if(!ribbon&&stageT>1.2&&!me.free){ribbon={tip:PIE.clone(),state:'reach',t:0,snap:0}}
    var eye=new T.Vector3(me.x,1.55,me.z),f=fwd(me.yaw),nose=eye.clone().addScaledVector(f,.55);nose.y-=.32;
    if(ribbon){ribbon.t+=dt;
      if(ribbon.state==='reach'){var to=nose.clone().sub(ribbon.tip),d=to.length();ribbon.tip.addScaledVector(to.normalize(),Math.min(d,dt*6));
        if(d<.6||ribbon.t>3.5){ribbon.tip.copy(nose);ribbon.state='held';me.caught=true;D.tone(700,.12);D.tone(880,.14,.08);D.hint(touch?'The pie has you by the nose. Try to pull away.':'The pie has you by the nose. Try to pull away (hold Space).')}}
      var A=PIE.clone().add(new T.Vector3(.2,.25,0)),B=ribbon.state==='reach'?ribbon.tip:nose,taut=me.strain,mid=A.clone().lerp(B,.5);mid.y+=1.3*(1-taut*.9);var side=Math.sin(t*2.1)*1.1*(1-taut);
      puffs.forEach(function(s,j){var u=(j+1)/puffs.length,w=1-u,x2=w*w*A.x+2*w*u*mid.x+u*u*B.x,y2=w*w*A.y+2*w*u*mid.y+u*u*B.y,z2=w*w*A.z+2*w*u*(mid.z+side)+u*u*B.z;
        s.position.set(x2,y2+Math.sin(t*3+j)*.05,z2);var near=Math.min(1,s.position.distanceTo(eye)/2);s.scale.setScalar((.5+.3*Math.sin(j*1.7+t))*(1-taut*.5)*(.35+.65*near));
        s.material.opacity=ribbon.state==='snap'?Math.max(0,.4*(1-ribbon.snap/.7)):Math.min(.42,ribbon.t*.6)*(ribbon.state==='reach'?Math.min(1,u*3):1)*(.4+.6*near)});
      if(ribbon.state==='snap'){ribbon.snap+=dt;puffs.forEach(function(s,j){s.position.y+=dt*(1+j*.15)});if(ribbon.snap>.7){ribbon=null;puffs.forEach(function(s){s.material.opacity=0})}}}
    /* the voice from the courtyard, every few seconds once you are caught */
    if(me.caught&&!call.on){call.next-=dt;if(call.next<=0){call.on=true;call.t=0;call.n++;call.next=6.2;voice(Math.sin(wrap(yawTo(DOOR)-me.yaw))*1.2);
      if(call.n===1)D.hint(touch?'Someone is calling from the courtyard. Hold your finger on the door: run toward his voice.':'Someone is calling from the courtyard. Turn toward his voice (A, D) and hold Space.')}}
    if(call.on){call.t+=dt;if(call.t>3.6)call.on=false}
    var cg=call.on?Math.min(1,call.t/.4)*(call.t<3?1:Math.max(0,(3.6-call.t)/.6)):0;
    doorGlow.material.opacity=.12+cg*.75+(me.free?.25:0);doorGlow.scale.setScalar(5+cg*3);doorLight.intensity=cg*1.6+(me.free?.5:0);caller.material.opacity=.2+cg*.6;
    /* which way you want to go, and whether you are running */
    var target=hold&&hold.p?hold.p:(tapTo&&D.time<tapUntil?tapTo:null);if(target&&Math.hypot(target.x-me.x,target.z-me.z)<.6)target=null;var running=spaceDown||!!target;
    if(target){var ty=yawTo(target);me.yaw+=wrap(ty-me.yaw)*Math.min(1,dt*4)}
    me.yaw+=((keys.right?1:0)-(keys.left?1:0))*dt*1.7;
    var dir=fwd(me.yaw),toDoor=DOOR.clone().sub(eye).setY(0).normalize(),vx=0,vz=0;
    if(me.out>0){/* through the door and out under the stars */}
    else if(me.caught){var toPie=PIE.clone().sub(eye).setY(0),dp=toPie.length();toPie.normalize();
      if(!running)me.yaw+=wrap(yawTo(PIE)-me.yaw)*Math.min(1,dt*.7);   /* the nose leads */
      var breaking=call.on&&running&&dir.dot(toDoor)>.75;
      if(breaking){me.strain+=dt/1.2;vx=dir.x*.6;vz=dir.z*.6;shake=.03;fov+=(52-fov)*Math.min(1,dt*3);if(Math.random()<dt*10)kick(1);
        if(me.strain>=1){me.caught=false;me.free=true;me.strain=0;ribbon.state='snap';ribbon.snap=0;D.burst(nose,0xffffff,true);D.tone(880,.08);D.tone(330,.2,.05);D.light(.85);say(1);
          D.hint('Snapped. The pie is still there, and still smells wonderful. Go on to the door.')}}
      else{me.strain=Math.max(0,me.strain-dt*.5);var pull=dp>2.2?1.9:0,away=running&&dir.dot(toPie)<-.2;vx=(running?dir.x*3.2*.3:0)+toPie.x*pull;vz=(running?dir.z*3.2*.3:0)+toPie.z*pull;
        if(away){shake=.05;if(Math.random()<dt*12)kick(1);if(Math.random()<dt*6)D.tone(rand(150,210),.04);if(!firstSkid){firstSkid=true;D.tween(1.4,function(){},function(){say(0)})}}else shake=0}}
    else if(running){vx=dir.x*3.2;vz=dir.z*3.2;shake=0}
    fov+=(58-fov)*Math.min(1,dt*1.5);
    me.x=Math.max(-8.6,Math.min(9.6,me.x+vx*dt));me.z=Math.max(-5.4,Math.min(5.4,me.z+vz*dt));
    if(me.z<-1.3&&me.z>-3.9&&me.x>-1.8&&me.x<3.8){if(me.z>-2.6)me.z=-1.3;else me.z=-3.9}
    /* the armchair shuffles after you */
    var cd=new T.Vector3(me.x-chair.position.x,0,me.z-chair.position.z),cl=cd.length();if(cl>1.9&&me.out===0)chair.position.addScaledVector(cd.normalize(),Math.min(cl-1.9,dt*1.5));
    chair.rotation.y=Math.atan2(me.x-chair.position.x,me.z-chair.position.z);chair.position.y=Math.abs(Math.sin(t*6))*.04;chairTag.visible=cl<3.4&&me.out===0;
    /* out the door */
    if(me.free&&me.out===0&&Math.hypot(me.x-DOOR.x,me.z-DOOR.z)<1.7){me.out=.001;D.tone(523,.4);D.tone(659,.4,.15);D.tone(784,.7,.3)}
    if(me.out>0){me.out+=dt;var e=Math.min(1,me.out/2.4);me.x=9.4+e*5.5;me.z+=(-.6-me.z)*Math.min(1,dt*2);me.yaw+=wrap(PI/2-me.yaw)*Math.min(1,dt*3);
      D.sc.background.setRGB(.14-e*.1,.1-e*.07,.08-e*.05);if(D.sc.fog)D.sc.fog.color.copy(D.sc.background);lamp.intensity=.8*(1-e);D.light(.85-e*.6);
      if(me.out>2.6)say(2);
      if(me.out>7&&!D.finished){live=false;D.done()}}
    dust.forEach(function(u){if(u.t<.6){u.t+=dt;u.s.position.addScaledVector(u.v,dt);u.s.material.opacity=.35*(1-u.t/.6)}else u.s.material.opacity=0});
  });
  /* your eyes: A and D turn, the mouse looks a little, a held finger turns you toward it */
  var lx=0,ly=0;
  D.camFn=function(cam,dt){var port=cam.aspect<.85,ptr=D.ptr||{x:0,y:0},kk=Math.min(1,dt*5);lx+=((touch?0:ptr.x*.35)-lx)*kk;ly+=((touch?0:ptr.y*.25)-ly)*kk;
    var y=me.yaw+lx,s=reduce?0:shake;cam.position.set(me.x+(Math.random()-.5)*s,1.55+(Math.random()-.5)*s,me.z+(Math.random()-.5)*s);
    cam.lookAt(me.x+Math.sin(y)*6,1.35+ly*3,me.z-Math.cos(y)*6);cam.fov=port?fov+14:fov;cam.updateProjectionMatrix()};
  D._gf=function(){return {caught:me.caught,free:me.free,out:+me.out.toFixed(1),x:+me.x.toFixed(1),strain:+me.strain.toFixed(2),call:call.n}};
  D.fpCleanup=function(){
    live=false;
    try{window.removeEventListener('keydown',kd,true);window.removeEventListener('keyup',ku,true);window.removeEventListener('pointerdown',pd,true);
      window.removeEventListener('pointermove',pm,true);window.removeEventListener('pointerup',pu,true);window.removeEventListener('pointercancel',pu,true)}catch(_){}
    D.sc.fog=null;D.sc.background=D.sky;D.floor.visible=true;D.camFn=null;D.cam.fov=45;
  };
};
})();
