export default function Home() {
  return (
    <main className="min-h-screen bg-rose-50 flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-3xl shadow-xl max-w-md w-full text-center border border-rose-100">
        <h1 className="text-3xl font-extrabold text-slate-800">
          Nailscape<span className="text-rose-500">.</span>
        </h1>
        <p className="text-slate-500 mt-2 text-sm">
          Studio Kuku Eksklusif — Booking slot perawatanmu di sini ✨
        </p>
        <div className="mt-6">
          <button className="w-full bg-rose-500 hover:bg-rose-600 text-white font-semibold py-3 rounded-xl shadow-md transition">
            Booking Sekarang
          </button>
        </div>
      </div>
    </main>
  );
}
