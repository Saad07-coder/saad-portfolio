import Lenis from 'lenis';
import gsap from 'gsap';
export type SceneSpec={id:string;from:number;to:number;x:number;k:number;label:string;height:number};

export const SCENES: SceneSpec[] = [
  { id: 'hero',    from: 0, to: 0, x: .70, k: 1,    label: 'Hello',   height: 100 },
  { id: 'about',   from: 0, to: 0, x: .27, k: 1,    label: 'About',   height: 100 },
  { id: 'work',    from: 0, to: 0, x: .77, k: .86, label: 'Work', height: 240 },
  { id: 'journey', from: 0, to: 0, x: .26, k: 1,    label: 'Journey', height: 100 },
  { id: 'skills',  from: 0, to: 0, x: .50, k: .98,  label: 'Toolkit', height: 100 },
  { id: 'awards',  from: 0, to: 0, x: .75, k: 1,    label: 'Awards',  height: 100 },
  { id: 'contact', from: 0, to: 0, x: .50, k: 1,    label: 'Contact', height: 100 },
];

export type SceneState={id:string;top:number;height:number;enter:number;p:number;exit:number;vis:number};
const clamp=(v:number)=>Math.max(0,Math.min(1,v));
export class Director {
 lenis:Lenis; states:SceneState[]=[]; listeners=new Set<(s:SceneState[],y:number)=>void>(); private raf=0; private tops=new Map<string,{top:number;height:number}>(); private ro:ResizeObserver;
 constructor(){history.scrollRestoration='manual';this.lenis=new Lenis({lerp:.075,smoothWheel:true,wheelMultiplier:.9,touchMultiplier:1.4,autoRaf:false});gsap.ticker.lagSmoothing(0);this.ro=new ResizeObserver(()=>this.measure());document.querySelectorAll<HTMLElement>('[data-scene]').forEach(el=>this.ro.observe(el));this.measure();gsap.ticker.add(this.tick);}
 start(){this.lenis.start()} stop(){this.lenis.stop()} scrollTo(target:string){const el=document.getElementById(target);if(el)this.lenis.scrollTo(el,{duration:2.2,easing:t=>1-Math.pow(1-t,4)});} subscribe(fn:(s:SceneState[],y:number)=>void){this.listeners.add(fn);return()=>this.listeners.delete(fn)}
 private measure=()=>{document.querySelectorAll<HTMLElement>('[data-scene]').forEach(el=>this.tops.set(el.dataset.scene!,{top:el.getBoundingClientRect().top+window.scrollY,height:el.offsetHeight}));};
 private tick=(time:number)=>{this.lenis.raf(time*1000);const y=this.lenis.scroll;const vh=innerHeight;this.states=SCENES.map(sc=>{const m=this.tops.get(sc.id)??{top:0,height:vh};const enter = clamp((y - (m.top - vh)) / vh);
const p = clamp((y - m.top) / Math.max(1, m.height - vh));
const exit = clamp((y - (m.top + m.height - vh)) / vh);return {id:sc.id,top:m.top,height:m.height,enter,p,exit,vis:clamp(Math.min(enter*1.6,1-exit*2.2))}});this.listeners.forEach(fn=>fn(this.states,y));};
 destroy(){gsap.ticker.remove(this.tick);this.ro.disconnect();this.lenis.destroy()}
}
