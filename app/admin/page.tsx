"use client";
import { useEffect, useState } from "react";

export default function AdminPage() {
  const [emails, setEmails] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/waitlist/list")
     .then(res => res.json())
     .then(data => {
        setEmails(data.emails || []);
        setLoading(false);
      });
  }, []);

  const downloadCSV = () => {
    const csv = "Email,Date\n" + emails.map(e => `${e.email},${e.date}`).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "ryze-waitlist.csv";
    a.click();
  };

  if (loading) return <div className="p-10 text-white bg-black min-h-screen">Cargando correos...</div>;

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-3xl font-bold mb-2">RYZE - Admin</h1>
      <p className="text-gray-400 mb-6">Total: {emails.length} correos</p>
      <button onClick={downloadCSV} className="bg-white text-black px-4 py-2 rounded mb-6 font-bold">Descargar CSV</button>
      <div className="border border-gray-800 rounded">
        {emails.map((item, i) => (
          <div key={i} className="flex justify-between p-4 border-b border-gray-800">
            <span>{item.email}</span>
            <span className="text-gray-500 text-sm">{item.date}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
