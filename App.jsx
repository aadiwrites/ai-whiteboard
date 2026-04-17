import React, { useRef, useState } from 'react';

export default function AIWhiteboardMVP() { const canvasRef = useRef(null); const [notes, setNotes] = useState([{ id: 1, text: 'Start writing here...', x: 40, y: 40 }]); const [showAI, setShowAI] = useState(false); const [bg, setBg] = useState('grid');

const backgrounds = { grid: 'bg-[linear-gradient(#e5e7eb_1px,transparent_1px),linear-gradient(90deg,#e5e7eb_1px,transparent_1px)] bg-[size:20px_20px]', plain: 'bg-white', dark: 'bg-gray-900' };

const addSticky = () => { setNotes([...notes, { id: Date.now(), text: 'New note', x: 80, y: 80 }]); };

return ( <div className="min-h-screen flex flex-col bg-gray-50"> <header className="flex items-center justify-between p-4 border-b bg-white shadow-sm"> <h1 className="text-xl font-bold">AI Whiteboard</h1> <div className="flex gap-2 flex-wrap"> <button onClick={() => setShowAI(!showAI)} className="px-4 py-2 rounded-2xl border">AI</button> <button onClick={addSticky} className="px-4 py-2 rounded-2xl border">Sticky</button> <select onChange={(e) => setBg(e.target.value)} className="px-3 py-2 rounded-2xl border"> <option value="grid">Grid</option> <option value="plain">Plain</option> <option value="dark">Dark</option> </select> <button className="px-4 py-2 rounded-2xl border">Upload Image/PDF</button> <button className="px-4 py-2 rounded-2xl border">Share</button> </div> </header>

<div className="flex flex-1">
    <aside className="w-20 md:w-24 border-r bg-white p-2 flex flex-col gap-3">
      <button className="p-3 rounded-2xl border">✏️</button>
      <button className="p-3 rounded-2xl border">🧽</button>
      <button className="p-3 rounded-2xl border">🎨</button>
      <button className="p-3 rounded-2xl border">📐</button>
      <button className="p-3 rounded-2xl border">📎</button>
    </aside>

    <main className="flex-1 p-4 relative">
      <div ref={canvasRef} className={`w-full h-[75vh] rounded-3xl border relative overflow-hidden ${backgrounds[bg]}`}>
        {notes.map((note) => (
          <div
            key={note.id}
            className="absolute bg-yellow-200 p-3 rounded-xl shadow w-32"
            style={{ left: note.x, top: note.y }}
            contentEditable
            suppressContentEditableWarning
          >
            {note.text}
          </div>
        ))}
      </div>
    </main>

    {showAI && (
      <aside className="w-72 border-l bg-white p-4">
        <h2 className="font-semibold mb-3">AI Assistant</h2>
        <input className="w-full border rounded-xl p-2" placeholder="Ask anything..." />
        <button className="mt-3 w-full border rounded-xl p-2">Search Web</button>
      </aside>
    )}
  </div>
</div>

); }
