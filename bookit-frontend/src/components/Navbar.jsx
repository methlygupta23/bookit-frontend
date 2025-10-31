import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

function Logo() {
  return (
    <div className="flex items-center gap-3 select-none">
      {/* hd highway delite pin logo (closely matching provided artwork) */}
      <svg width="44" height="56" viewBox="0 0 64 80" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Highway Delite logo">
        {/* pin body */}
        <path d="M32 76c0 0 24-25.2 24-44C56 14.745 45.255 4 32 4S8 14.745 8 32c0 18.8 24 44 24 44Z" fill="#0B0B0B"/>
        {/* center vertical road line */}
        <path d="M32 12V68" stroke="#FACC15" strokeWidth="2" strokeLinecap="round"/>
        {/* smile curve */}
        <path d="M18 40 Q32 48 46 40" stroke="#FACC15" strokeWidth="3" strokeLinecap="round" fill="none"/>
        {/* letters */}
        <text x="21.5" y="34" fontSize="20" fontWeight="700" fill="#FACC15" fontFamily="Inter, ui-sans-serif, system-ui">h</text>
        <text x="35.5" y="34" fontSize="20" fontWeight="700" fill="#FACC15" fontFamily="Inter, ui-sans-serif, system-ui">d</text>
      </svg>
      <div className="leading-none -mt-1">
        <div className="text-2xl font-extrabold tracking-tight">highway</div>
        <div className="text-2xl font-extrabold -mt-1 leading-none">delite</div>
      </div>
    </div>
  );
}

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState("");

  useEffect(() => {
    const current = searchParams.get("q") || "";
    setQuery(current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);

  function performSearch() {
    const q = query.trim();
    if (!q) {
      if (location.pathname !== "/") navigate("/");
      else setSearchParams({});
      return;
    }
    if (location.pathname !== "/") navigate(`/?q=${encodeURIComponent(q)}`);
    else setSearchParams({ q });
  }

  return (
    <div className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-gray-100">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <button onClick={() => navigate("/")} className="shrink-0" aria-label="Go home">
          <Logo />
        </button>
        <div className="flex items-center gap-2 w-[560px] max-w-full">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e)=>{ if (e.key === "Enter") performSearch(); }}
            placeholder={location.pathname === "/" ? "Search experiences" : "Search"}
            className="flex-1 h-10 rounded-md border border-gray-200 bg-gray-50 focus:bg-white px-4 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <button onClick={performSearch} className="h-10 px-4 rounded-md bg-yellow-400 text-gray-900 font-semibold hover:bg-yellow-300 active:translate-y-[1px]">
            Search
          </button>
        </div>
      </div>
    </div>
  );
}


