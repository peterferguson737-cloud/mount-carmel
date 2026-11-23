/* Chiptune plainchant: square-wave cantor in the Dorian mode, a second voice a fifth below on some phrases,
   a quiet drone on the final and fifth, and a short echo. The melody is made up as it goes, so it never loops. */
(function(){
'use strict';
var AC=window.AudioContext||window.webkitAudioContext;if(!AC)return;
var swell=0,ctx=null,master=null,bus=null,on=true,started=false,timer=null,tNext=0,queue=[],duo=false,phraseN=0;
var S=[0,2,3,5,7,9,10],BASE=293.66,UNIT=.4;
function hz(d){var o=Math.floor(d/7),m=((d%7)+7)%7;return BASE*Math.pow(2,(o*12+S[m])/12)}
function clamp(v,a,b){return Math.max(a,Math.min(b,v))}
function phrase(){
  var n=5+((Math.random()*6)|0),d=Math.random()<.45?0:4,i,out=[];
  if(d===0&&Math.random()<.6){out.push([0,1],[2,1],[4,2]);d=4}                 /* an intonation up to the reciting tone */
  for(i=0;i<n;i++){
    out.push([d,Math.random()<.18?2:1]);
    var s=Math.random(),pull=d>4?-.12:d<2?.12:0;
    d+=s<.42+pull?1:s<.84?-1:s<.92?2:-2;d=clamp(d,-1,7);
  }
  while(d>1){out.push([d,1]);d--}                                               /* walk down to the cadence */
  out.push([Math.random()<.5?1:-1,1],[0,4],[null,2+((Math.random()*2)|0)]);
  phraseN++;duo=swell>0||phraseN%3===0;
  return out.map(function(x){return [x[0],x[1],duo]});
}
function voice(type,f,t,len,vol){
  var o=ctx.createOscillator(),g=ctx.createGain();o.type=type;o.frequency.setValueAtTime(f,t);
  g.gain.setValueAtTime(0.0001,t);g.gain.linearRampToValueAtTime(vol,t+.025);g.gain.setValueAtTime(vol,t+Math.max(.03,len-.07));g.gain.linearRampToValueAtTime(0.0001,t+len);
  o.connect(g);g.connect(bus);o.start(t);o.stop(t+len+.03);
}
function tick(){
  if(!ctx||ctx.state!=='running')return;
  if(tNext<ctx.currentTime)tNext=ctx.currentTime+.1;
  while(tNext<ctx.currentTime+1.2){
    if(!queue.length)queue=phrase();
    var n=queue.shift(),len=n[1]*UNIT;
    if(n[0]!=null){voice('square',hz(n[0]),tNext,len*.96,.05);if(n[2])voice('triangle',hz(n[0]-4),tNext,len*.96,.07);if(swell>0)voice('triangle',hz(n[0]+7),tNext,len*.96,.04*swell)}
    tNext+=len;
  }
}
function start(){
  if(started)return;started=true;
  try{
    ctx=new AC();master=ctx.createGain();master.gain.value=on?.55:0;master.connect(ctx.destination);
    bus=ctx.createGain();var lp=ctx.createBiquadFilter();lp.type='lowpass';lp.frequency.value=2400;bus.connect(lp);lp.connect(master);
    var dl=ctx.createDelay(1),fb=ctx.createGain(),wet=ctx.createGain();dl.delayTime.value=.34;fb.gain.value=.36;wet.gain.value=.4;
    lp.connect(dl);dl.connect(fb);fb.connect(dl);dl.connect(wet);wet.connect(master);
    [[BASE/2,.05],[BASE/2*1.4983,.03]].forEach(function(p){var o=ctx.createOscillator(),g=ctx.createGain();o.type='triangle';o.frequency.value=p[0];g.gain.value=p[1];o.connect(g);g.connect(bus);o.start()});
    timer=setInterval(tick,200);tick();
  }catch(e){}
}
function wake(){start();if(ctx&&on&&ctx.state==='suspended')ctx.resume()}
['pointerdown','keydown','touchend'].forEach(function(ev){window.addEventListener(ev,wake,{passive:true})});
document.addEventListener('visibilitychange',function(){if(!ctx)return;if(document.hidden)ctx.suspend();else if(on)ctx.resume()});
window.CHANT={swell:function(v){swell=v||0},amen:function(){if(!ctx||!on)return;var t=ctx.currentTime+.1;queue=[];tNext=t+6.5;
  [196,246.94,293.66,392].forEach(function(f){voice('triangle',f,t,1.7,.06);voice('square',f,t,1.7,.015)});
  [146.83,220,293.66,369.99,440].forEach(function(f){voice('triangle',f,t+1.8,4.4,.06);voice('square',f,t+1.8,4.4,.015)})},set:function(v){on=!!v;if(!ctx)return;if(on){ctx.resume();master.gain.setTargetAtTime(.55,ctx.currentTime,.3)}else master.gain.setTargetAtTime(0,ctx.currentTime,.15)}};
})();
