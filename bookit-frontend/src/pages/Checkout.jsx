import Navbar from "../components/Navbar";
import { useLocation, useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";

export default function Checkout() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [promo, setPromo] = useState("");
  const [agree, setAgree] = useState(false);

  const order = state ?? {
    product: { title: "Kayaking" },
    qty: 1,
    date: "2025-10-22",
    time: { label: "09:00 am" },
    subtotal: 999,
    taxes: 59,
    total: 958,
  };

  const isDisabled = useMemo(() => !fullName || !email || !agree, [fullName, email, agree]);

  return (
    <div>
      <Navbar />
      <div className="mx-auto max-w-6xl px-4 py-6">
        <button onClick={() => navigate(-1)} className="text-sm text-gray-600 mb-4">← Checkout</button>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8 items-start">
          <div className="rounded-lg border border-gray-100 shadow-sm p-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-600">Full name</label>
                <input className="mt-1 w-full h-10 rounded-md border border-gray-200 bg-gray-50 px-3 focus:outline-none focus:ring-2 focus:ring-gray-300" placeholder="Your name" value={fullName} onChange={(e)=>setFullName(e.target.value)} />
              </div>
              <div>
                <label className="text-sm text-gray-600">Email</label>
                <input className="mt-1 w-full h-10 rounded-md border border-gray-200 bg-gray-50 px-3 focus:outline-none focus:ring-2 focus:ring-gray-300" placeholder="Your name" value={email} onChange={(e)=>setEmail(e.target.value)} />
              </div>
              <div className="md:col-span-2">
                <label className="text-sm text-gray-600">Promo code</label>
                <div className="mt-1 flex gap-2">
                  <input className="flex-1 h-10 rounded-md border border-gray-200 bg-gray-50 px-3 focus:outline-none focus:ring-2 focus:ring-gray-300" placeholder="Promo code" value={promo} onChange={(e)=>setPromo(e.target.value)} />
                  <button className="h-10 px-4 rounded-md bg-black text-white">Apply</button>
                </div>
              </div>
              <label className="md:col-span-2 flex items-center gap-2 text-sm text-gray-600 mt-1">
                <input type="checkbox" checked={agree} onChange={(e)=>setAgree(e.target.checked)} className="rounded border-gray-300" />
                I agree to the terms and safety policy
              </label>
            </div>
          </div>

          <div className="rounded-lg border border-gray-100 shadow-sm p-5">
            <div className="flex items-center justify-between text-sm">
              <div className="text-gray-600">Experience</div>
              <div className="font-medium">{order.product.title}</div>
            </div>
            <div className="mt-3 flex items-center justify-between text-sm">
              <div className="text-gray-600">Date</div>
              <div className="text-gray-700">{order.date || "2025-10-22"}</div>
            </div>
            <div className="mt-3 flex items-center justify-between text-sm">
              <div className="text-gray-600">Time</div>
              <div className="text-gray-700">{order.time?.label}</div>
            </div>
            <div className="mt-3 flex items-center justify-between text-sm">
              <div className="text-gray-600">Qty</div>
              <div className="text-gray-700">{order.qty}</div>
            </div>
            <div className="mt-3 flex items-center justify-between text-sm">
              <div className="text-gray-600">Subtotal</div>
              <div className="text-gray-700">₹{order.subtotal}</div>
            </div>
            <div className="mt-2 flex items-center justify-between text-sm">
              <div className="text-gray-600">Taxes</div>
              <div className="text-gray-700">₹{order.taxes}</div>
            </div>
            <div className="my-4 border-t" />
            <div className="flex items-center justify-between">
              <div className="text-sm">Total</div>
              <div className="text-lg font-semibold">₹{order.total}</div>
            </div>
            <button
              disabled={isDisabled}
              onClick={() => navigate("/result", { state: { order, customer: { fullName, email } } })}
              className={`mt-4 w-full h-10 rounded-md font-semibold ${isDisabled ? "bg-gray-200 text-gray-500" : "bg-yellow-400 text-gray-900"}`}
            >
              Pay and Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


