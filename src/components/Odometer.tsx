import {useEffect,useRef} from 'react';
export default function Odometer({value}:{value:string}){const ref=useRef<HTMLSpanElement>(null);useEffect(()=>{const el=ref.current;if(!el)return;el.textContent=value;},[value]);return <span className="odometer" ref={ref}>{value}</span>}
