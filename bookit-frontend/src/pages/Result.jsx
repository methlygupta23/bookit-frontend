import Navbar from "../components/Navbar";
import { useLocation, useNavigate } from "react-router-dom";

function generateRef() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let out = "";
  for (let i = 0; i < 8; i++) out += chars[Math.floor(Math.random() * chars.length)];
  return `${out.slice(0,3)}${out.slice(3,5)}&${out.slice(5)}`;
}

export default function Result() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const ref = generateRef();

  return (
    <div>
      <Navbar />
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <div className="mx-auto w-16 h-16 rounded-full bg-green-500 grid place-items-center">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 7L9 18l-5-5" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h1 className="mt-4 text-3xl font-semibold">Booking Confirmed</h1>
        <p className="mt-3 text-gray-600">Ref ID: {ref}</p>
        <button onClick={()=>navigate('/')} className="mt-6 h-9 px-4 rounded-md bg-gray-200 text-gray-700">Back to Home</button>
      </div>
    </div>
  );
}


