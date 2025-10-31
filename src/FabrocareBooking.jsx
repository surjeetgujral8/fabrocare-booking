import React, { useState } from "react";

export default function FabrocareBooking() {
  const [step, setStep] = useState(1);
  const [bookingId] = useState(
    "FB" + new Date().getFullYear() + (Math.floor(Math.random() * 90000) + 10000)
  );

  const [form, setForm] = useState({
    name: "",
    gender: "Male",
    age: "",
    mobile: "",
    altNumber: "",
    pincode: "",
    houseNo: "",
    address: "",
    landmark: "",
    remarks: "",
    date: "",
    timeSlot: "",
    beneficiariesCount: 0,
    beneficiaries: [],
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleBeneficiaryCount = (e) => {
    const count = parseInt(e.target.value);
    setForm({
      ...form,
      beneficiariesCount: count,
      beneficiaries: Array.from({ length: count }, () => ({
        name: "",
        gender: "Male",
        age: "",
      })),
    });
  };

  const handleBeneficiaryChange = (i, field, value) => {
    const updated = [...form.beneficiaries];
    updated[i][field] = value;
    setForm({ ...form, beneficiaries: updated });
  };

  const generateMessage = () => {
    let msg = `🛵 *Fabrocare Home Sample Booking*%0A`;
    msg += `Booking ID: ${bookingId}%0A`;
    msg += `Name: ${form.name}%0A`;
    msg += `Gender: ${form.gender}%0A`;
    msg += `Age: ${form.age}%0A`;
    msg += `Mobile: ${form.mobile}%0A`;
    msg += `Alt Number: ${form.altNumber}%0A`;
    msg += `Pincode: ${form.pincode}%0A`;
    msg += `Address: ${form.houseNo}, ${form.address}, ${form.landmark}%0A`;
    msg += `Remarks: ${form.remarks || "N/A"}%0A`;
    msg += `Date: ${form.date}%0A`;
    msg += `Time Slot: ${form.timeSlot}%0A`;
    msg += `Beneficiaries: ${form.beneficiariesCount}%0A`;

    if (form.beneficiariesCount > 0) {
      msg += `%0A*Beneficiary Details:*%0A`;
      form.beneficiaries.forEach((b, i) => {
        msg += `${i + 1}. ${b.name} (${b.gender}, ${b.age})%0A`;
      });
    }

    return msg;
  };

  const handleSubmit = () => {
    const url = `https://wa.me/917999999704?text=${generateMessage()}`;
    window.open(url, "_blank");
  };

  return (
    <div className="max-w-md mx-auto p-4 font-sans text-gray-800">
      <h1 className="text-2xl font-bold text-center text-orange-500 mb-4">
        Book Your Home Sample Collection – Fabrocare
      </h1>

      {/* Step 1: Booking Details */}
      {step === 1 && (
        <div className="space-y-2">
          <input name="name" placeholder="Full Name" className="input" onChange={handleChange} />
          <select name="gender" className="input" onChange={handleChange}>
            <option>Male</option>
            <option>Female</option>
          </select>
          <input name="age" placeholder="Age" className="input" onChange={handleChange} />
          <input name="mobile" placeholder="Mobile Number" className="input" onChange={handleChange} />
          <input name="altNumber" placeholder="Alternative Number" className="input" onChange={handleChange} />
          <input name="pincode" placeholder="Pin Code" className="input" onChange={handleChange} />
          <input name="houseNo" placeholder="House No" className="input" onChange={handleChange} />
          <input name="address" placeholder="Address" className="input" onChange={handleChange} />
          <input name="landmark" placeholder="Landmark" className="input" onChange={handleChange} />
          <textarea name="remarks" placeholder="Remarks" className="input" onChange={handleChange}></textarea>

          <button
            onClick={() => setStep(2)}
            className="w-full bg-orange-500 text-white p-2 rounded-lg"
          >
            Fix Appointment
          </button>
        </div>
      )}

      {/* Step 2: Date & Time */}
      {step === 2 && (
        <div className="space-y-2">
          <input
            type="date"
            name="date"
            className="input"
            onChange={handleChange}
          />
          <select name="timeSlot" className="input" onChange={handleChange}>
            <option value="">Select Time Slot</option>
            <option>6:00 to 7:00 AM</option>
            <option>7:00 to 8:00 AM</option>
            <option>8:00 to 9:00 AM</option>
            <option>9:00 to 10:00 AM</option>
            <option>10:00 to 11:00 AM</option>
            <option>11:00 to 12:00 AM</option>
          </select>
          <button
            onClick={() => setStep(3)}
            className="w-full bg-orange-500 text-white p-2 rounded-lg"
          >
            Add Beneficiary
          </button>
        </div>
      )}

      {/* Step 3: Beneficiaries */}
      {step === 3 && (
        <div className="space-y-2">
          <label className="font-semibold">Number of Beneficiaries</label>
          <select
            name="beneficiariesCount"
            value={form.beneficiariesCount}
            onChange={handleBeneficiaryCount}
            className="input"
          >
            {[...Array(10).keys()].map((i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </select>

          {form.beneficiaries.map((b, i) => (
            <div key={i} className="p-2 border rounded-lg">
              <input
                placeholder="Full Name"
                className="input"
                value={b.name}
                onChange={(e) =>
                  handleBeneficiaryChange(i, "name", e.target.value)
                }
              />
              <select
                value={b.gender}
                className="input"
                onChange={(e) =>
                  handleBeneficiaryChange(i, "gender", e.target.value)
                }
              >
                <option>Male</option>
                <option>Female</option>
              </select>
              <input
                placeholder="Age"
                className="input"
                value={b.age}
                onChange={(e) =>
                  handleBeneficiaryChange(i, "age", e.target.value)
                }
              />
            </div>
          ))}

          <button
            onClick={handleSubmit}
            className="w-full bg-orange-500 text-white p-2 rounded-lg mt-3"
          >
            Submit Booking
          </button>
        </div>
      )}
    </div>
  );
}
