'use client';
import { useEffect, useState } from 'react';

export default function Admin(){
  const [data, setData] = useState({count:0, emails:[]});
  const load = ()=> fetch('/api/join').then(r=>r.json()).then(d=>setData({count:d.count, emails:d.emails||[]}));
  useEffect(()=>{ load(); },[]);

  return (
    <div style={{padding:20}}>
      <h1>Total: {data.count} emails</h1>
      <pre>{JSON.stringify(data.emails, null, 2)}</pre>
      <button onClick={async()=>{await fetch('/api/admin',{method:'DELETE'}); load();}}>Borrar Todo</button>
    </div>
  )
}
