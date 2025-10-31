import Navbar from "../components/Navbar";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { fetchJson } from "../lib/api";

const FALLBACK_EXPERIENCES = [
  {
    id: 1,
    title: "Kayaking",
    city: "Udupi, Karnataka",
    price: 999,
    image:
      "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=1470&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Nandi Hills Sunrise",
    city: "Bangalore",
    price: 899,
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1470&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Coffee Trail",
    city: "Coorg",
    price: 1299,
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1374&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Kayaking",
    city: "Udupi, Karnataka",
    price: 999,
    image:
      "https://images.unsplash.com/photo-1512295767273-ac109ac3acfa?q=80&w=1469&auto=format&fit=crop",
  },
  {
    id: 5,
    title: "Nandi Hills Sunrise",
    city: "Bangalore",
    price: 899,
    image:
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?q=80&w=1470&auto=format&fit=crop",
  },
  {
    id: 6,
    title: "Boat Cruise",
    city: "Sunderban",
    price: 999,
    image:
      "https://images.unsplash.com/photo-1473181488821-2d23949a045a?q=80&w=1374&auto=format&fit=crop",
  },
  {
    id: 7,
    title: "Bunjee Jumping",
    city: "Manali",
    price: 999,
    image:
      "https://images.unsplash.com/photo-1466220666686-90bdba318c25?q=80&w=1470&auto=format&fit=crop",
  },
  {
    id: 8,
    title: "Coffee Trail",
    city: "Coorg",
    price: 1299,
    image:
      "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?q=80&w=1470&auto=format&fit=crop",
  },
];

function imageFromKeywords(...keys) {
  const query = keys.filter(Boolean).join(", ");
  return `https://source.unsplash.com/800x600/?${encodeURIComponent(query)}`;
}

export default function Home() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [items, setItems] = useState(FALLBACK_EXPERIENCES);
  useEffect(() => {
    let cancelled = false;
    fetchJson("/experiences")
      .then((data) => {
        if (!cancelled && Array.isArray(data) && data.length) setItems(data);
      })
      .catch(() => {
        // ignore; fallback stays
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const query = (searchParams.get("q") || "").toLowerCase();
  const filtered = useMemo(() => {
    if (!query) return items;
    return items.filter((e) => {
      const hay = [e.title, e.city, e.description].filter(Boolean).join(" ").toLowerCase();
      return hay.includes(query);
    });
  }, [items, query]);
  return (
    <div>
      <Navbar />
      <div className="mx-auto max-w-6xl px-4 py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.length === 0 && (
          <div className="col-span-full text-center text-sm text-gray-500">No experiences match your search.</div>
        )}
        {filtered.map((e) => {
          const cardId = e.id || e._id || e.title;
          return (
          <div key={cardId} className="rounded-lg overflow-hidden shadow-sm border border-gray-100 bg-white">
            <img
              src={e.image || imageFromKeywords(e.title, e.city)}
              alt={e.title}
              className="h-48 w-full object-cover"
              data-attempt="0"
              onError={(ev)=>{
                const img = ev.currentTarget;
                const attempt = img.getAttribute("data-attempt") || "0";
                if (attempt === "0") {
                  img.setAttribute("data-attempt","1");
                  img.src = imageFromKeywords(e.city || e.title);
                  return;
                }
                if (attempt === "1") {
                  img.setAttribute("data-attempt","2");
                  img.src = imageFromKeywords(e.title);
                  return;
                }
                img.onerror = null;
                img.src = imageFromKeywords("travel", "india");
              }}
            />
            <div className="p-4">
              <div className="flex items-start justify-between">
                <h3 className="text-lg font-semibold">{e.title}</h3>
                <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-md">{e.city}</span>
              </div>
              <p className="text-sm text-gray-600 mt-2">Curated small-group experience. Certified guide. Safety first with gear included.</p>
              <div className="mt-4 flex items-center justify-between">
                <div className="text-sm text-gray-700">From <span className="text-lg font-semibold">₹{e.price}</span></div>
                <button
                  onClick={() => navigate(`/details/${cardId}`)}
                  className="px-3 py-2 rounded-md bg-yellow-400 text-gray-900 text-sm font-semibold hover:bg-yellow-300"
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        );})}
      </div>
    </div>
  );
}


