import { useState } from "react";
import { createPortal } from "react-dom";
import { FaPlus, FaTrash, FaEdit, FaTimes, FaUserMd, FaExclamationCircle } from "react-icons/fa";

import {
  useGetDoctorsQuery,
  useAddDoctorMutation,
  useUpdateDoctorMutation,
  useDeleteDoctorMutation,
} from "../services/doctorApi";

function AdminDoctors() {
  const { data, isLoading, isError } = useGetDoctorsQuery();
  const doctors = data || [];

  const [addDoctor] = useAddDoctorMutation();
  const [updateDoctor] = useUpdateDoctorMutation();
  const [deleteDoctor] = useDeleteDoctorMutation();

  const [showModal, setShowModal] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState(null);
  const [deletingDoctor, setDeletingDoctor] = useState(null);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [errors, setErrors] = useState({});

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
    setErrors({});
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
    setErrors({});
    setShowModal(true);
  }

  function validate() {
    const nextErrors = {};
    if (!name.trim()) nextErrors.name = "Full name is required.";
    if (!specialization.trim()) nextErrors.specialization = "Specialization is required.";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  async function handleSubmit() {
    if (!validate()) return;

    const doctorData = {
      name: name.trim(),
      specialization: specialization.trim(),
      photo,
      bio,
      availableTime,
      availableDays: availableDays
        .split(",")
        .map((day) => day.trim())
        .filter((day) => day.length > 0),
    };

    setSaving(true);
    try {
      if (editingDoctor) {
        await updateDoctor({ id: editingDoctor._id, ...doctorData }).unwrap();
      } else {
        await addDoctor(doctorData).unwrap();
      }
      setShowModal(false);
    } catch (err) {
      setErrors({ form: "Could not save doctor. Please try again." });
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!deletingDoctor) return;
    setDeleting(true);
    try {
      await deleteDoctor(deletingDoctor._id).unwrap();
      setDeletingDoctor(null);
    } catch (err) {
      setDeletingDoctor(null);
      alert("Could not delete doctor. Please try again.");
    } finally {
      setDeleting(false);
    }
  }

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl shadow-sm p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-10 bg-[#E7EEFC] rounded-lg w-full"></div>
          <div className="h-10 bg-[#E7EEFC] rounded-lg w-full"></div>
          <div className="h-10 bg-[#E7EEFC] rounded-lg w-full"></div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-white rounded-2xl shadow-sm p-8 text-center">
        <FaExclamationCircle className="text-red-400 text-3xl mx-auto mb-3" />
        <p className="text-red-500 font-medium">Could not load doctors.</p>
        <p className="text-gray-400 text-sm mt-1">Check your backend is running.</p>
      </div>
    );
  }

  return (
    <div className="anim-fadeIn">
      <div className="flex justify-between items-center mb-6">
        <span className="text-gray-400 text-sm">
          {doctors.length} {doctors.length === 1 ? "doctor" : "doctors"}
        </span>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 bg-[#3EA6E0] hover:bg-[#161654] text-white font-semibold px-5 py-3 rounded-xl transition-colors"
        >
          <FaPlus /> Add Doctor
        </button>
      </div>

      {doctors.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm p-10 text-center text-gray-500">
          <FaUserMd className="text-4xl text-[#dde9fc] mx-auto mb-3" />
          No doctors yet. Click "Add Doctor" to create one.
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden overflow-x-auto">
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
                <tr
                  key={doctor._id}
                  className="border-b border-[#E7EEFC] last:border-0 hover:bg-[#E7EEFC]/30 transition-colors"
                >
                  <td className="px-6 py-4 flex items-center gap-3">
                    {doctor.photo ? (
                      <img
                        src={doctor.photo}
                        alt={doctor.name}
                        className="w-10 h-10 rounded-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-[#E7EEFC] flex items-center justify-center text-[#3EA6E0]">
                        <FaUserMd />
                      </div>
                    )}
                    <span className="font-medium text-[#161654]">{doctor.name}</span>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{doctor.specialization}</td>
                  <td className="px-6 py-4 text-gray-600">
                    {(doctor.availableDays || []).join(", ") || "—"}
                  </td>
                  <td className="px-6 py-4 text-gray-600">{doctor.availableTime || "—"}</td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-4">
                      <button
                        onClick={() => openEdit(doctor)}
                        title="Edit doctor"
                        className="text-[#3EA6E0] hover:text-[#161654] transition-colors"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => setDeletingDoctor(doctor)}
                        title="Delete doctor"
                        className="text-red-400 hover:text-red-600 transition-colors"
                      >
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
        <Modal title={editingDoctor ? "Edit Doctor" : "Add Doctor"} onClose={() => !saving && setShowModal(false)}>
          {errors.form && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl">
              {errors.form}
            </div>
          )}

          <Field label="Full Name" error={errors.name}>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`w-full px-4 py-3 rounded-xl border focus:outline-none ${
                errors.name ? "border-red-300 focus:border-red-400" : "border-[#dde9fc] focus:border-[#3EA6E0]"
              }`}
            />
          </Field>

          <Field label="Specialization" error={errors.specialization}>
            <input
              value={specialization}
              onChange={(e) => setSpecialization(e.target.value)}
              className={`w-full px-4 py-3 rounded-xl border focus:outline-none ${
                errors.specialization ? "border-red-300 focus:border-red-400" : "border-[#dde9fc] focus:border-[#3EA6E0]"
              }`}
            />
          </Field>

          <Field label="Photo URL">
            <input
              value={photo}
              onChange={(e) => setPhoto(e.target.value)}
              placeholder="https://..."
              className="w-full px-4 py-3 rounded-xl border border-[#dde9fc] focus:outline-none focus:border-[#3EA6E0]"
            />
            {photo && (
              <img
                src={photo}
                alt="Preview"
                className="w-12 h-12 rounded-full object-cover mt-2"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            )}
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

          <ModalButtons onCancel={() => setShowModal(false)} onSave={handleSubmit} saving={saving} />
        </Modal>
      )}

      {deletingDoctor && (
        <Modal title="Delete Doctor" onClose={() => !deleting && setDeletingDoctor(null)}>
          <p className="text-gray-600">
            Are you sure you want to delete <span className="font-semibold text-[#161654]">{deletingDoctor.name}</span>?
            This can't be undone.
          </p>
          <div className="flex justify-end gap-3 pt-2">
            <button
              onClick={() => setDeletingDoctor(null)}
              disabled={deleting}
              className="px-5 py-3 rounded-xl font-semibold text-gray-500 hover:bg-gray-100 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              disabled={deleting}
              className="px-5 py-3 rounded-xl font-semibold bg-red-500 hover:bg-red-600 text-white transition-colors disabled:opacity-50"
            >
              {deleting ? "Deleting..." : "Delete"}
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ---------------- Local modal pieces ----------------
// If you already have these in a shared file (e.g. ../components/Modal),
// delete this section and import them instead.

function Modal({ title, onClose, children }) {
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

function Field({ label, error, children }) {
  return (
    <div>
      <label className="block text-sm font-medium text-[#161654] mb-2">{label}</label>
      {children}
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}

function ModalButtons({ onCancel, onSave, saving }) {
  return (
    <div className="flex justify-end gap-3 pt-2">
      <button
        onClick={onCancel}
        disabled={saving}
        className="px-5 py-3 rounded-xl font-semibold text-gray-500 hover:bg-gray-100 disabled:opacity-50"
      >
        Cancel
      </button>
      <button
        onClick={onSave}
        disabled={saving}
        className="px-5 py-3 rounded-xl font-semibold bg-[#3EA6E0] hover:bg-[#161654] text-white transition-colors disabled:opacity-50"
      >
        {saving ? "Saving..." : "Save"}
      </button>
    </div>
  );
}

export default AdminDoctors;