import React, { useState } from "react";

// Fabrocare Booking - Single file React component (TailwindCSS required in project) // Usage: put this component in a React app (Create React App / Vite) and ensure Tailwind is configured.

export default function FabrocareBooking() { const [step, setStep] = useState(1);

// Booking fields const [bookingId] = useState(() => { const d = new Date(); const y = d.getFullYear(); const m = String(d.getMonth() + 1).padStart(2, "0"); const day = String(d.getDate()).padStart(2, "0"); const rand = Math.floor(100 + Math.random() * 900); return FB${y}${m}${day}${rand}; });

const [form, setForm] = useState({ fullName: "", gender: "Male", age: "", mobile: "", altMobile: "", pincode: "", houseNo: "", address: "", landmark: "", remarks: "", date: "", timeSlot: "6:00–7:00 AM", beneficiariesCount: 0, beneficiaries: [], });

function updateField(key, value) { setForm((s) => ({ ...s, [key]: value })); }

function handleNext() { if (step === 1) setStep(2); else if (step === 2) setStep(3); }

function handleBack() { if (step > 1) setStep(step - 1); }

function handleBeneficiaryCountChange(count) { const c = Number(count); const arr = Array.from({ length: c }, (_, i) => form.beneficiaries[i] || { name: "", gender: "Male", age: "" }); setForm((s) => ({ ...s, beneficiariesCount: c, beneficiaries: arr })); }

function updateBeneficiary(index, key, value) { const copy = [...form.beneficiaries]; copy[index] = { ...copy[index], [key]: value }; setForm((s) => ({ ...s, beneficiaries: copy })); }

function buildWhatsAppMessage() { const lines = []; lines.push("🛵 Fabrocare Home Sample Booking"); lines.push(Booking ID: ${bookingId}); lines.push(Name: ${form.fullName || "-"}); lines.push(Age: ${form.age || "-"}); lines.push(Gender: ${form.gender || "-"}); lines.push(Date: ${form.date || "-"}); lines.push(Time Slot: ${form.timeSlot || "-"}); lines.push(Beneficiaries: ${form.beneficiariesCount});

if (form.beneficiariesCount > 0) {
  form.beneficiaries.forEach((b, i) => {
    lines.push(`Beneficiary ${i + 1}: ${b.name || "-"}, ${b.gender || "-"}, Age ${b.age || "-"}`);
  });
}

lines.push(`Address: ${form.houseNo || ""} ${form.address || ""} - ${form.pincode || ""}`);
if (form.landmark) lines.push(`Landmark: ${form.landmark}`);
if (form.remarks) lines.push(`Remarks: ${form.remarks}`);
lines.push(`Mobile: ${form.mobile || "-"}`);
if (form.altMobile) lines.push(`Alternate: ${form.altMobile}`);

return lines.join("\n");

}

function submitToWhatsApp() { const message = buildWhatsAppMessage(); const phone = "+917999999704"; // configured number const url = https://wa.me/${phone.replace(/\D/g, "")}?text=${encodeURIComponent(message)}; window.open(url, "_blank"); }

return ( <div className="min-h-screen bg-white flex items-start justify-center p-4"> <div className="w-full max-w-xl border rounded-2xl shadow-lg p-6"> {/* Header */} <div className="flex items-center gap-4 mb-4"> <div className="w-12 h-12 rounded-md bg-orange-50 flex items-center justify-center text-2xl">🧪</div> <div> <h1 className="text-xl font-semibold text-gray-800">Book Your Home Sample Collection - Fabrocare</h1> <p className="text-sm text-gray-500">Fast • Reliable • At-home sample collection</p> </div> </div>

{/* Progress */}
    <div className="mb-6">
      <div className="flex items-center justify-between text-xs text-gray-600 mb-2">
        <div>Step {step} of 3</div>
        <div className="font-medium">{step === 1 ? "Booking" : step === 2 ? "Appointment" : "Beneficiaries"}</div>
      </div>
      <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
        <div
          className="h-2 bg-[rgba(255,102,0,0.95)] rounded-full"
          style={{ width: `${(step / 3) * 100}%` }}
        />
      </div>
    </div>

    {/* Step 1 */}
    {step === 1 && (
      <div>
        <div className="mb-3 text-sm text-gray-500">Booking ID: <span className="font-mono text-sm text-gray-700">{bookingId}</span></div>

        <div className="grid grid-cols-1 gap-3">
          <input value={form.fullName} onChange={(e) => updateField("fullName", e.target.value)} placeholder="Full Name" className="input" />

          <div className="flex gap-3">
            <select value={form.gender} onChange={(e) => updateField("gender", e.target.value)} className="input flex-1">
              <option>Male</option>
              <option>Female</option>
            </select>
            <input value={form.age} onChange={(e) => updateField("age", e.target.value)} placeholder="Age" className="input w-28" />
          </div>

          <input value={form.mobile} onChange={(e) => updateField("mobile", e.target.value)} placeholder="Mobile Number" className="input" />
          <input value={form.altMobile} onChange={(e) => updateField("altMobile", e.target.value)} placeholder="Alternative Number" className="input" />

          <div className="flex gap-3">
            <input value={form.pincode} onChange={(e) => updateField("pincode", e.target.value)} placeholder="Pin code" className="input" />
            <input value={form.houseNo} onChange={(e) => updateField("houseNo", e.target.value)} placeholder="House No" className="input" />
          </div>

          <input value={form.address} onChange={(e) => updateField("address", e.target.value)} placeholder="Address" className="input" />
          <input value={form.landmark} onChange={(e) => updateField("landmark", e.target.value)} placeholder="Landmark" className="input" />

          <textarea value={form.remarks} onChange={(e) => updateField("remarks", e.target.value)} placeholder="Remarks" className="input h-24" />
        </div>

        <div className="flex items-center justify-end gap-3 mt-4">
          <button onClick={handleNext} className="px-4 py-2 rounded-lg bg-[rgba(255,102,0,0.95)] text-white font-medium">Fix Appointment</button>
        </div>
      </div>
    )}

    {/* Step 2 */}
    {step === 2 && (
      <div>
        <div className="grid grid-cols-1 gap-3">
          <label className="text-sm text-gray-600">Select preferred date</label>
          <input type="date" value={form.date} onChange={(e) => updateField("date", e.target.value)} className="input" />

          <label className="text-sm text-gray-600">Time slot</label>
          <select value={form.timeSlot} onChange={(e) => updateField("timeSlot", e.target.value)} className="input">
            <option>6:00–7:00 AM</option>
            <option>7:00–8:00 AM</option>
            <option>8:00–9:00 AM</option>
            <option>9:00–10:00 AM</option>
            <option>10:00–11:00 AM</option>
            <option>11:00–12:00 PM</option>
          </select>
        </div>

        <div className="flex items-center justify-between gap-3 mt-4">
          <button onClick={handleBack} className="px-4 py-2 rounded-lg border border-gray-200">Back</button>
          <button onClick={handleNext} className="px-4 py-2 rounded-lg bg-[rgba(255,102,0,0.95)] text-white font-medium">Add Beneficiary</button>
        </div>
      </div>
    )}

    {/* Step 3 */}
    {step === 3 && (
      <div>
        <div className="grid grid-cols-1 gap-3">
          <label className="text-sm text-gray-600">Number of Beneficiaries (0–9)</label>
          <select value={form.beneficiariesCount} onChange={(e) => handleBeneficiaryCountChange(e.target.value)} className="input w-40">
            {Array.from({ length: 10 }, (_, i) => (
              <option key={i} value={i}>{i}</option>
            ))}
          </select>

          {form.beneficiaries.map((b, idx) => (
            <div key={idx} className="p-3 border rounded-md">
              <div className="text-sm font-medium mb-2">Beneficiary {idx + 1}</div>
              <input value={b.name} onChange={(e) => updateBeneficiary(idx, "name", e.target.value)} placeholder="Full Name" className="input mb-2" />
              <div className="flex gap-3">
                <select value={b.gender} onChange={(e) => updateBeneficiary(idx, "gender", e.target.value)} className="input flex-1">
                  <option>Male</option>
                  <option>Female</option>
                </select>
                <input value={b.age} onChange={(e) => updateBeneficiary(idx, "age", e.target.value)} placeholder="Age" className="input w-28" />
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between gap-3 mt-4">
          <button onClick={handleBack} className="px-4 py-2 rounded-lg border border-gray-200">Back</button>
          <button onClick={submitToWhatsApp} className="px-4 py-2 rounded-lg bg-[rgba(255,102,0,0.95)] text-white font-medium">Submit Booking</button>
        </div>
      </div>
    )}

    <div className="mt-6 text-xs text-gray-500">Tip: After you press <span className="font-medium">Submit Booking</span>, WhatsApp will open with a prefilled message to Fabrocare. User must press send to complete the booking.</div>
  </div>

  {/* Inline styles to make "input" class work without external CSS for demo purposes */}
  <style jsx>{`
    .input {
      width: 100%;
      padding: 0.625rem 0.75rem;
      border: 1px solid #e6e6e6;
      border-radius: 0.5rem;
      font-size: 0.95rem;
      outline: none;
    }
    .input:focus {
      box-shadow: 0 0 0 4px rgba(255,102,0,0.08);
      border-color: rgba(255,102,0,0.9);
    }
  `}</style>
</div>

); }
