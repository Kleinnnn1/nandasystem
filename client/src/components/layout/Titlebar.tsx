export default function Titlebar() {
  return (
    <div
      className="h-8 flex items-center justify-between px-4 select-none shrink-0"
      style={
        {
          background: "#0a0a0a",
          WebkitAppRegion: "drag",
        } as React.CSSProperties
      }
    >
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-red-600" />
        <span className="text-xs text-zinc-600">N&A School Supplies POS</span>
      </div>
      <div
        className="flex items-center gap-1.5"
        style={{ WebkitAppRegion: "no-drag" } as React.CSSProperties}
      >
        <button
          onClick={() => window.electron?.minimize()}
          className="w-6 h-6 rounded flex items-center justify-center text-zinc-500 hover:text-white hover:bg-zinc-800 transition-colors text-xs"
        >
          −
        </button>
        <button
          onClick={() => window.electron?.maximize()}
          className="w-6 h-6 rounded flex items-center justify-center text-zinc-500 hover:text-white hover:bg-zinc-800 transition-colors text-xs"
        >
          □
        </button>
        <button
          onClick={() => window.electron?.close()}
          className="w-6 h-6 rounded flex items-center justify-center text-zinc-500 hover:text-red-500 hover:bg-zinc-800 transition-colors text-xs"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
