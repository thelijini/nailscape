"use client";
import { useState } from "react";

export default function AdminDashboard() {
  const [tab, setTab] = useState<"bookings" | "inventory" | "hpp">("bookings");

  const [materials, setMaterials] = useState([
    { id: 1, name: "Base Coat 15ml", stock: 12, unit: "ml", min: 5, cost: 3500 },
    { id: 2, name: "Gel Color Nude 15ml", stock: 3, unit: "ml", min: 5, cost: 4000 },
    { id: 3, name: "3D Pearl Charm", stock: 25, unit: "pcs", min: 10, cost: 1500 },
  ]);

  const [services] = useState([
    {
      name: "Gel Polish Solid Color",
      price: 120000,
      ingredients: [
        { name: "Base & Top Coat (2ml)", cost: 7000 },
        { name: "Gel Color (2ml)", cost: 8000 },
        { name: "Prep Kit & Wipes", cost: 3000 },
      ],
    },
    {
      name: "Custom 3D Charm Art",
      price: 220000,
      ingredients: [
        { name: "Base, Builder & Top (3ml)", cost: 11000 },
        { name: "Gel Color (2ml)", cost: 8000 },
        { name: "3D Pearl Charm (6 pcs)", cost: 9000 },
        { name: "Prep Kit & Wipes", cost: 3000 },
      ],
    },
  ]);

  const handleRestock = (id: number) => {
    setMaterials(
      materials.map((m) => (m.id === id ? { ...m, stock: m.stock + 15 } : m))
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-slate-900 text-slate-300 p-6 space-y-6">
        <h2 className="text-2xl font-bold text-white">
          Nailscape<span className="text-rose-500"> Admin</span>
        </h2>
        <nav className="space-y-2">
          <button
            onClick={() => setTab("bookings")}
            className={`w-full text-left px-4 py-3 rounded-xl font-medium transition ${
              tab === "bookings" ? "bg-rose-500 text-white" : "hover:bg-slate-800"
            }`}
          >
            📅 Jadwal Booking
          </button>
          <button
            onClick={() => setTab("inventory")}
            className={`w-full text-left px-4 py-3 rounded-xl font-medium transition ${
              tab === "inventory" ? "bg-rose-500 text-white" : "hover:bg-slate-800"
            }`}
          >
            💅 Stok & Bahan
          </button>
          <button
            onClick={() => setTab("hpp")}
            className={`w-full text-left px-4 py-3 rounded-xl font-medium transition ${
              tab === "hpp" ? "bg-rose-500 text-white" : "hover:bg-slate-800"
            }`}
          >
            🧮 Kalkulator HPP
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10">
        {tab === "bookings" && (
          <div>
            <h1 className="text-2xl font-bold text-slate-800 mb-6">Jadwal Booking Masuk</h1>
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex justify-between items-center border-b pb-4 mb-4">
                <div>
                  <p className="font-bold text-slate-800">Nadia Putri — Custom 3D Charm Art</p>
                  <p className="text-sm text-slate-500">Besok, 13:00 WIB • WA: 0812-3456-7890</p>
                </div>
                <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-full">
                  DP Lunas
                </span>
              </div>
              <p className="text-xs text-slate-400">
                *Data contoh. Nanti akan terhubung otomatis ke database Supabase.
              </p>
            </div>
          </div>
        )}

        {tab === "inventory" && (
          <div>
            <h1 className="text-2xl font-bold text-slate-800 mb-6">Kontrol Stok Studio</h1>
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-100 text-slate-600 text-sm">
                  <tr>
                    <th className="p-4">Bahan Baku</th>
                    <th className="p-4">Sisa Stok</th>
                    <th className="p-4">Modal / Unit</th>
                    <th className="p-4">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {materials.map((item) => (
                    <tr key={item.id}>
                      <td className="p-4 font-semibold text-slate-800">{item.name}</td>
                      <td className="p-4">
                        <span
                          className={`font-bold ${
                            item.stock <= item.min ? "text-amber-600" : "text-emerald-600"
                          }`}
                        >
                          {item.stock} {item.unit}
                          {item.stock <= item.min && " (Menipis!)"}
                        </span>
                      </td>
                      <td className="p-4 text-slate-600">
                        Rp {item.cost.toLocaleString("id-ID")} / {item.unit}
                      </td>
                      <td className="p-4">
                        <button
                          onClick={() => handleRestock(item.id)}
                          className="px-3 py-1.5 bg-slate-900 hover:bg-slate-700 text-white rounded-lg text-xs font-semibold"
                        >
                          + Restock (+15)
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {tab === "hpp" && (
          <div>
            <h1 className="text-2xl font-bold text-slate-800 mb-6">Perhitungan HPP & Profit</h1>
            <div className="grid md:grid-cols-2 gap-6">
              {services.map((srv, idx) => {
                const totalHpp = srv.ingredients.reduce((sum, i) => sum + i.cost, 0);
                const profit = srv.price - totalHpp;
                const margin = ((profit / srv.price) * 100).toFixed(1);

                return (
                  <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                    <h3 className="text-lg font-bold text-slate-800">{srv.name}</h3>
                    <div className="my-4 space-y-2 border-y border-slate-100 py-3 text-sm">
                      {srv.ingredients.map((ing, i) => (
                        <div key={i} className="flex justify-between text-slate-600">
                          <span>{ing.name}</span>
                          <span>Rp {ing.cost.toLocaleString("id-ID")}</span>
                        </div>
                      ))}
                    </div>
                    <div className="space-y-1.5 text-sm">
                      <div className="flex justify-between text-slate-500">
                        <span>Harga Jual</span>
                        <span className="font-semibold text-slate-800">
                          Rp {srv.price.toLocaleString("id-ID")}
                        </span>
                      </div>
                      <div className="flex justify-between text-slate-500">
                        <span>Total HPP Bahan</span>
                        <span className="font-semibold text-rose-600">
                          Rp {totalHpp.toLocaleString("id-ID")}
                        </span>
                      </div>
                      <div className="flex justify-between font-bold text-base pt-2 border-t text-emerald-600">
                        <span>Profit Bersih ({margin}%)</span>
                        <span>Rp {profit.toLocaleString("id-ID")}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
