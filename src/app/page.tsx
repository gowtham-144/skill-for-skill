'use client';
export const dynamic = 'force-dynamic';

export default function Home() {
  return (
    <div className="p-8 text-center">
      <h1 className="text-4xl font-bold mb-4">Skill Swap Tamil</h1>
      <p className="text-lg mb-6">பணமில்லா பரிமாற்றம் – கற்றுக்கொள்வோம்!</p>
      <div className="space-x-4">
        <a href="/dashboard" className="bg-blue-600 text-white px-6 py-2 rounded">Dashboard</a>
        <a href="/onboard" className="bg-green-600 text-white px-6 py-2 rounded">Onboard</a>
      </div>
    </div>
  );
}