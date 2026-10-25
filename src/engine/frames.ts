export type Shot = {from:number;to:number;box:[number,number,number,number];cx:number};
export type Manifest = {w:number;h:number;count:number;shots:Shot[]};
export type FrameStore = {manifest:Manifest; images:Map<number,HTMLImageElement>; loaded:number; base:string};
const emptyManifest:Manifest={w:1600,h:900,count:0,shots:[]};
export async function loadFrames(onProgress:(n:number,total:number)=>void=()=>{}):Promise<FrameStore>{
 let manifest=emptyManifest;
 try { const r=await fetch('./frames/manifest.json'); if(r.ok) manifest=await r.json() as Manifest; } catch { /* Video frames are intentionally optional until a source video is supplied. */ }
 const base=window.innerWidth<820?'./frames/sm/':'./frames/lg/'; const images=new Map<number,HTMLImageElement>();
 const total=manifest.count; if(!total){onProgress(1,1);return {manifest,images,loaded:0,base};}
 const order:number[]=[]; const boundaries=new Set<number>(); manifest.shots.forEach(s=>{boundaries.add(s.from);boundaries.add(s.to)}); order.push(...[...boundaries].sort((a,b)=>a-b));
 for(const stride of [8,4,2,1]) for(let i=0;i<total;i+=stride) if(!order.includes(i)) order.push(i);
 const load=async(i:number)=>{const img=new Image();img.src=`${base}f${String(i).padStart(3,'0')}.webp`;try{await img.decode();images.set(i,img)}catch{} onProgress(images.size,total)};
 // Load the first quarter before resolving, then stream the rest without blocking startup.
 const initial=order.slice(0,Math.max(1,Math.ceil(total/4))); await Promise.all(initial.map(load));
 void (async()=>{for(const i of order.slice(initial.length)) await load(i)})();
 return {manifest,images,get loaded(){return images.size},base};
}
export function nearestFrame(store:FrameStore,index:number,shot?:Shot):HTMLImageElement|undefined {const keys=[...store.images.keys()].filter(k=>!shot||(k>=shot.from&&k<=shot.to));if(!keys.length)return;const key=keys.reduce((a,b)=>Math.abs(b-index)<Math.abs(a-index)?b:a,keys[0]);return store.images.get(key)}
