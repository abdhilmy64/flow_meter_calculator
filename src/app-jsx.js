import React, { useState } from 'react';
import { Calculator, Droplets, Activity } from 'lucide-react';

export default function App() {
  const [volumeAktual, setVolumeAktual] = useState('16500');
  const [faktorKalibrasiLama, setFaktorKalibrasiLama] = useState('1400');
  const [volumeTerbaca, setVolumeTerbaca] = useState('11165');
  const [hasil, setHasil] = useState(null);

  const hitung = () => {
    const vAktual = parseFloat(volumeAktual);
    const fKalibrasi = parseFloat(faktorKalibrasiLama);
    const vTerbaca = parseFloat(volumeTerbaca);

    if (!vAktual || !fKalibrasi || !vTerbaca) {
      alert('Mohon isi semua field dengan angka yang valid');
      return;
    }

    // Hitung jumlah pulse
    const jumlahPulse = vTerbaca / (fKalibrasi / 1000);

    // Hitung faktor kalibrasi baru
    const faktorKalibrasiBaru = (vAktual / jumlahPulse) * 1000;

    // Hitung error
    const errorPersen = ((vTerbaca - vAktual) / vAktual) * 100;

    setHasil({
      jumlahPulse: jumlahPulse.toFixed(2),
      faktorKalibrasiBaru: faktorKalibrasiBaru.toFixed(2),
      errorPersen: errorPersen.toFixed(2)
    });
  };

  const reset = () => {
    setVolumeAktual('');
    setFaktorKalibrasiLama('');
    setVolumeTerbaca('');
    setHasil(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-blue-500 p-3 rounded-lg">
              <Droplets className="text-white" size={32} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Kalkulator Kalibrasi Flow Meter</h1>
              <p className="text-sm text-gray-600">Untuk Knapsack Sprayer</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Volume Aktual (mL)
              </label>
              <input
                type="number"
                value={volumeAktual}
                onChange={(e) => setVolumeAktual(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Contoh: 16500"
              />
              <p className="text-xs text-gray-500 mt-1">Volume cairan yang sebenarnya dikeluarkan</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Faktor Kalibrasi Lama (μL/pulse)
              </label>
              <input
                type="number"
                value={faktorKalibrasiLama}
                onChange={(e) => setFaktorKalibrasiLama(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Contoh: 1400"
              />
              <p className="text-xs text-gray-500 mt-1">Faktor kalibrasi yang saat ini digunakan</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Volume Terbaca Flow Meter (mL)
              </label>
              <input
                type="number"
                value={volumeTerbaca}
                onChange={(e) => setVolumeTerbaca(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Contoh: 11165"
              />
              <p className="text-xs text-gray-500 mt-1">Volume yang ditampilkan oleh flow meter</p>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={hitung}
                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 flex items-center justify-center gap-2"
              >
                <Calculator size={20} />
                Hitung Kalibrasi
              </button>
              <button
                onClick={reset}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-3 px-6 rounded-lg transition duration-200"
              >
                Reset
              </button>
            </div>
          </div>
        </div>

        {hasil && (
          <div className="bg-white rounded-lg shadow-lg p-6 animate-fade-in">
            <div className="flex items-center gap-2 mb-4">
              <Activity className="text-green-500" size={24} />
              <h2 className="text-xl font-bold text-gray-800">Hasil Perhitungan</h2>
            </div>

            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Jumlah Pulse Terdeteksi</p>
                <p className="text-2xl font-bold text-gray-800">{hasil.jumlahPulse} pulse</p>
              </div>

              <div className="bg-green-50 p-4 rounded-lg border-2 border-green-500">
                <p className="text-sm text-gray-600 mb-1">✓ Faktor Kalibrasi Baru</p>
                <p className="text-3xl font-bold text-green-600">{hasil.faktorKalibrasiBaru} μL/pulse</p>
                <p className="text-xs text-gray-600 mt-2">Gunakan nilai ini untuk setting flow meter Anda</p>
              </div>

              <div className={`p-4 rounded-lg ${parseFloat(hasil.errorPersen) > 0 ? 'bg-red-50' : 'bg-blue-50'}`}>
                <p className="text-sm text-gray-600 mb-1">Error Pengukuran</p>
                <p className={`text-2xl font-bold ${parseFloat(hasil.errorPersen) > 0 ? 'text-red-600' : 'text-blue-600'}`}>
                  {hasil.errorPersen}%
                </p>
                <p className="text-xs text-gray-600 mt-1">
                  {parseFloat(hasil.errorPersen) > 0 ? 'Flow meter membaca lebih rendah' : 'Flow meter membaca lebih tinggi'}
                </p>
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm font-semibold text-gray-700 mb-2">📌 Cara Penggunaan:</p>
              <ol className="text-sm text-gray-600 space-y-1 ml-4 list-decimal">
                <li>Masukkan faktor kalibrasi baru ({hasil.faktorKalibrasiBaru} μL/pulse) ke dalam setting flow meter</li>
                <li>Lakukan pengujian ulang dengan volume yang diketahui</li>
                <li>Jika masih ada selisih, ulangi proses kalibrasi</li>
              </ol>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}