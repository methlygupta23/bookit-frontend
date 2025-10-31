import Navbar from "../components/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import { useMemo, useState } from "react";

const product = {
  title: "Kayaking",
  description:
    "Curated small-group experience. Certified guide. Safety first with gear included. Helmet and Life jackets along with an expert will accompany in kayaking.",
  price: 999,
  image:
    "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=1470&auto=format&fit=crop",
};

const dateTabs = ["Oct 22", "Oct 23", "Oct 24", "Oct 25", "Oct 26"];
const timeSlots = [
  { label: "07:00 am", left: 4 },
  { label: "9:00 am", left: 2 },
  { label: "11:00 am", left: 5 },
  { label: "1:00 pm", left: 0 },
];

export default function Details() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [qty, setQty] = useState(1);
  const [date, setDate] = useState(dateTabs[0]);
  const [time, setTime] = useState(timeSlots[0]);

  const taxes = useMemo(() => 59, []);
  const subtotal = useMemo(() => product.price * qty, [qty]);
  const total = useMemo(() => subtotal + taxes, [subtotal, taxes]);

  return (
    <div>
      <Navbar />
      <div className="mx-auto max-w-6xl px-4 py-6">
        <button onClick={() => navigate(-1)} className="text-sm text-gray-600 mb-4">← Details</button>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8 items-start">
          <img src={product.image} alt={product.title} className="w-full h-[360px] object-cover rounded-lg" />

          <div className="rounded-lg border border-gray-100 shadow-sm p-5">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">Starts at</div>
              <div className="font-semibold">₹{product.price}</div>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <div className="text-sm text-gray-600">Quantity</div>
              <div className="flex items-center gap-2">
                <button className="w-6 h-6 grid place-items-center rounded border" onClick={() => setQty((q) => Math.max(1, q - 1))}>-</button>
                <span className="w-6 text-center">{qty}</span>
                <button className="w-6 h-6 grid place-items-center rounded border" onClick={() => setQty((q) => q + 1)}>+</button>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between text-sm">
              <div className="text-gray-600">Subtotal</div>
              <div className="text-gray-700">₹{subtotal}</div>
            </div>
            <div className="mt-2 flex items-center justify-between text-sm">
              <div className="text-gray-600">Taxes</div>
              <div className="text-gray-700">₹{taxes}</div>
            </div>
            <div className="my-4 border-t" />
            <div className="flex items-center justify-between">
              <div className="text-sm">Total</div>
              <div className="text-lg font-semibold">₹{total}</div>
            </div>
            <button
              onClick={() =>
                navigate("/checkout", {
                  state: { id, product, qty, date, time, subtotal, taxes, total },
                })
              }
              className="mt-4 w-full h-10 rounded-md bg-gray-200 text-gray-600 font-semibold"
            >
              Confirm
            </button>
          </div>

          <div className="lg:col-span-1">
            <h1 className="text-2xl font-semibold">{product.title}</h1>
            <p className="text-gray-700 mt-2">{product.description}</p>

            <div className="mt-6">
              <div className="text-sm font-medium mb-2">Choose date</div>
              <div className="flex flex-wrap gap-3">
                {dateTabs.map((d) => (
                  <button
                    key={d}
                    onClick={() => setDate(d)}
                    className={`h-9 px-3 rounded-md border text-sm ${
                      date === d ? "bg-yellow-100 border-yellow-300" : "border-gray-200"
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <div className="text-sm font-medium mb-2">Choose time</div>
              <div className="flex flex-wrap gap-3">
                {timeSlots.map((t) => (
                  <button
                    key={t.label}
                    onClick={() => setTime(t)}
                    disabled={t.left === 0}
                    className={`h-9 px-3 rounded-md border text-sm relative ${
                      time.label === t.label
                        ? "bg-gray-100 border-gray-300"
                        : "border-gray-200"
                    } ${t.left === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    {t.label}
                    <span className="ml-2 text-red-500">{t.left === 0 ? "Sold out" : `${t.left} left`}</span>
                  </button>
                ))}
              </div>
              <p className="text-[11px] text-gray-500 mt-2">All times are in IST (GMT +5:30)</p>
            </div>

            <div className="mt-6">
              <div className="text-sm font-medium mb-2">About</div>
              <div className="text-sm text-gray-600 bg-gray-50 border border-gray-200 rounded-md p-3">
                Scenic routes, trained guides, and safety briefing. Minimum age 10.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


