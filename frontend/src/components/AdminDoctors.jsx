import { useState } from "react";
import { createPortal } from "react-dom";
import { FaPlus, FaTrash, FaEdit, FaTimes } from "react-icons/fa";

import {
  useGetDoctorsQuery,
  useAddDoctorMutation,
  useUpdateDoctorMutation,
  useDeleteDoctorMutation,
} from "../services/doctorApi";

const AdminDoctors = () => {
  const { data, isLoading, isError } = useGetDoctorsQuery();
  const doctors = data || [];

  const [addDoctor] = useAddDoctorMutation();
  const [updateDoctor] = useUpdateDoctorMutation();
  const [deleteDoctor] = useDeleteDoctorMutation();

  const [showModal, setShowModal] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState(null);

  const [name, setName] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [photo, setPhoto] = useState("");
  const [bio, setBio] = useState("");
  const [availableDays, setAvailableDays] = useState("");
  const [availableTime, setAvailableTime] = useState("");

  function openAdd() {
    setEditingDoctor(null);
    setName("");
    setSpecialization("");
    setPhoto("");
    setBio("");
    setAvailableDays("");
    setAvailableTime("");
    setShowModal(true);
  }

  function openEdit(doctor) {
    setEditingDoctor(doctor);
    setName(doctor.name);
    setSpecialization(doctor.specialization);
    setPhoto(doctor.photo || "");
    setBio(doctor.bio || "");
    setAvailableDays((doctor.availableDays || []).join(", "));
    setAvailableTime(doctor.availableTime || "");
    setShowModal(true);
  }

  async function handleSubmit() {
    if (!name || !specialization) return;

    const doctorData = {
      name,
      specialization,
      photo,
      bio,
      availableTime,
      availableDays: availableDays
        .split(",")
        .map((day) => day.trim())
        .filter((day) => day.length > 0),
    };

    if (editingDoctor) {
      await updateDoctor({ id: editingDoctor._id, ...doctorData });
    } else {
      await addDoctor(doctorData);
    }
    setShowModal(false);
  }

  async function handleDelete(id) {
    await deleteDoctor(id);
  }

  if (isLoading) {
    return <p className="text-gray-500">Loading doctors...</p>;
  }

  if (isError) {
    return <p className="text-red-500">Could not load doctors. Check your backend is running.</p>;
  }

  return (
    <div className="anim-fadeIn">
      <div className="flex justify-end mb-6">
        <button
          onClick={openAdd}
          className="flex items-center gap-2 bg-[#3EA6E0] hover:bg-[#161654] text-white font-semibold px-5 py-3 rounded-xl transition-colors"
        >
          <FaPlus /> Add Doctor
        </button>
      </div>

      {doctors.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm p-8 text-center text-gray-500">
          No doctors yet. Click "Add Doctor" to create one.
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-[#161654] text-white">
              <tr>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Specialization</th>
                <th className="px-6 py-4">Available Days</th>
                <th className="px-6 py-4">Available Time</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {doctors.map((doctor) => (
                <tr key={doctor._id} className="border-b border-[#E7EEFC] last:border-0">
                  <td className="px-6 py-4 flex items-center gap-3">
                    {doctor.photo ? (
                      <img
                        src={doctor.photo}
                        alt={doctor.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gray-200" />
                    )}
                    <span className="font-medium text-[#161654]">{doctor.name}</span>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{doctor.specialization}</td>
                  <td className="px-6 py-4 text-gray-600">
                    {(doctor.availableDays || []).join(", ") || "—"}
                  </td>
                  <td className="px-6 py-4 text-gray-600">{doctor.availableTime || "—"}</td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-3">
                      <button onClick={() => openEdit(doctor)} className="text-[#3EA6E0]">
                        <FaEdit />
                      </button>
                      <button onClick={() => handleDelete(doctor._id)} className="text-red-400">
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showModal && (
        <Modal title={editingDoctor ? "Edit Doctor" : "Add Doctor"} onClose={() => setShowModal(false)}>
          <Field label="Full Name">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-[#dde9fc] focus:outline-none focus:border-[#3EA6E0]"
            />
          </Field>

          <Field label="Specialization">
            <input
              value={specialization}
              onChange={(e) => setSpecialization(e.target.value)}
              placeholder=""
              className="w-full px-4 py-3 rounded-xl border border-[#dde9fc] focus:outline-none focus:border-[#3EA6E0]"
            />
          </Field>

          <Field label="Photo URL">
            <input
              value={photo}
              onChange={(e) => setPhoto(e.target.value)}
              placeholder=""
              className="w-full px-4 py-3 rounded-xl border border-[#dde9fc] focus:outline-none focus:border-[#3EA6E0]"
            />
          </Field>

          <Field label="Bio">
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={3}
              className="w-full px-4 py-3 rounded-xl border border-[#dde9fc] focus:outline-none focus:border-[#3EA6E0] resize-none"
            />
          </Field>

          <Field label="Available Days">
            <input
              value={availableDays}
              onChange={(e) => setAvailableDays(e.target.value)}
              placeholder="Monday, Wednesday, Friday"
              className="w-full px-4 py-3 rounded-xl border border-[#dde9fc] focus:outline-none focus:border-[#3EA6E0]"
            />
          </Field>

          <Field label="Available Time">
            <input
              value={availableTime}
              onChange={(e) => setAvailableTime(e.target.value)}
              placeholder="9:00 AM - 5:00 PM"
              className="w-full px-4 py-3 rounded-xl border border-[#dde9fc] focus:outline-none focus:border-[#3EA6E0]"
            />
          </Field>

          <ModalButtons onCancel={() => setShowModal(false)} onSave={handleSubmit} />
        </Modal>
      )}
    </div>
  );
};

// ---------------- Local modal pieces ----------------
// If you already have these in a shared file (e.g. ../components/Modal),
// delete this section and import them instead.

function Modal({ title, onClose, children }) {
  // Rendered via portal directly into <body> so it sits above the header
  // and any other component regardless of z-index/overflow set on parents.
  return createPortal(
    <div
      className="fixed inset-0 bg-[#161654]/60 flex items-center justify-center p-4 anim-fadeIn"
      style={{ zIndex: 2147483647 }}
    >
      <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6 anim-fadeInUp">
        <div className="flex justify-between items-center mb-5">
          <h3 className="text-lg font-bold text-[#161654]">{title}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-[#161654]">
            <FaTimes />
          </button>
        </div>
        <div className="space-y-4">{children}</div>
      </div>
    </div>,
    document.body
  );
}

function Field({ label, children }) {
  return (
    <div>
      <label className="block text-sm font-medium text-[#161654] mb-2">{label}</label>
      {children}
    </div>
  );
}

function ModalButtons({ onCancel, onSave }) {
  return (
    <div className="flex justify-end gap-3 pt-2">
      <button onClick={onCancel} className="px-5 py-3 rounded-xl font-semibold text-gray-500 hover:bg-gray-100">
        Cancel
      </button>
      <button
        onClick={onSave}
        className="px-5 py-3 rounded-xl font-semibold bg-[#3EA6E0] hover:bg-[#161654] text-white transition-colors"
      >
        Save
      </button>
    </div>
  );
}

export default AdminDoctors;