"use client";
import { useState } from "react";
import type { Employee } from "@/lib/types";

const DEPT_COLORS: Record<string, { bg: string; text: string }> = {
  Engineering: { bg: "#EEEDFE", text: "#2D1B69" },
  Marketing:   { bg: "#FAECE7", text: "#993C1D" },
  Design:      { bg: "#E1F5EE", text: "#0F6E56" },
  Sales:       { bg: "#FAEEDA", text: "#854F0B" },
  HR:          { bg: "#FBEAF0", text: "#993556" },
  Finance:     { bg: "#E6F1FB", text: "#185FA5" },
  Product:     { bg: "#EAF3DE", text: "#3B6D11" },
};
const DEFAULT_COLOR = { bg: "#F1EFE8", text: "#5F5E5A" };
function deptColor(dept: string) { return DEPT_COLORS[dept] || DEFAULT_COLOR; }
function initials(name: string) { return name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase(); }
function fmtBirthday(mmdd: string) {
  const [m, d] = mmdd.split("-");
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  return `${months[parseInt(m) - 1]} ${parseInt(d)}`;
}

const EMPTY_FORM = { name: "", email: "", department: "", birthday: "", notes: "" };

interface Props {
  employees: Employee[];
  onAdd: (data: Omit<Employee, "id" | "createdAt">) => Promise<void>;
  onEdit: (id: string, data: Omit<Employee, "id" | "createdAt">) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  onImport: () => void;
  onCompose: (emp: Employee) => void;
}

export default function TeamTab({ employees, onAdd, onEdit, onDelete, onImport, onCompose }: Props) {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState("");
  const [confirm, setConfirm] = useState<string | null>(null);
  const [editId, setEditId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState(EMPTY_FORM);

  const filtered = employees.filter(
    (e) =>
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.email.toLowerCase().includes(search.toLowerCase()) ||
      (e.department || "").toLowerCase().includes(search.toLowerCase())
  );

  async function handleAdd() {
    if (!form.name || !form.email || !form.birthday) return;
    setSaving(true);
    await onAdd({ name: form.name.trim(), email: form.email.trim().toLowerCase(), department: form.department.trim(), birthday: form.birthday, notes: form.notes.trim() || undefined });
    setForm(EMPTY_FORM);
    setShowForm(false);
    setSaving(false);
  }

  // Convert HTML date input (YYYY-MM-DD) to MM-DD
  function handleDateChange(val: string) {
    const mmdd = val.slice(5);
    setForm((f) => ({ ...f, birthday: mmdd }));
  }

  // Convert MM-DD to YYYY-MM-DD for the input
  function toInputDate(mmdd: string) {
    return mmdd ? `2000-${mmdd}` : "";
  }

  function openEdit(emp: Employee) {
    setShowForm(false);
    setEditId(emp.id);
    setEditForm({ name: emp.name, email: emp.email, department: emp.department || "", birthday: emp.birthday, notes: emp.notes || "" });
  }

  function cancelEdit() {
    setEditId(null);
    setEditForm(EMPTY_FORM);
  }

  async function handleEdit() {
    if (!editId || !editForm.name || !editForm.email || !editForm.birthday) return;
    setSaving(true);
    await onEdit(editId, { name: editForm.name.trim(), email: editForm.email.trim().toLowerCase(), department: editForm.department.trim(), birthday: editForm.birthday, notes: editForm.notes.trim() || undefined });
    cancelEdit();
    setSaving(false);
  }

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex items-center gap-3">
        <input
          type="search" placeholder="Search name, email, department…"
          value={search} onChange={(e) => setSearch(e.target.value)}
          className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#2D1B69]/50"
        />
        <button onClick={onImport}
          className="flex items-center gap-1.5 px-3 py-2 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-700 whitespace-nowrap">
          📂 Import CSV
        </button>
        <button onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-1.5 px-3 py-2 text-sm text-white bg-[#2D1B69] rounded-lg hover:bg-[#3d2580] whitespace-nowrap">
          + Add Person
        </button>
      </div>

      {/* Add form */}
      {showForm && (
        <div className="bg-white border border-[#2D1B69]/20 rounded-xl p-5">
          <h3 className="text-sm font-semibold text-gray-800 mb-4">New Team Member</h3>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-gray-500 block mb-1">Full name *</label>
              <input value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                placeholder="Sarah Chen"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#2D1B69]/50" />
            </div>
            <div>
              <label className="text-xs text-gray-500 block mb-1">Work email *</label>
              <input type="email" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                placeholder="sarah@company.com"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#2D1B69]/50" />
            </div>
            <div>
              <label className="text-xs text-gray-500 block mb-1">Department</label>
              <input value={form.department} onChange={(e) => setForm((f) => ({ ...f, department: e.target.value }))}
                placeholder="Engineering"
                list="depts"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#2D1B69]/50" />
              <datalist id="depts">
                {Object.keys(DEPT_COLORS).map((d) => <option key={d} value={d} />)}
              </datalist>
            </div>
            <div>
              <label className="text-xs text-gray-500 block mb-1">Birthday (month & day) *</label>
              <input type="date" value={toInputDate(form.birthday)}
                onChange={(e) => handleDateChange(e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#2D1B69]/50" />
            </div>
            <div className="col-span-2">
              <label className="text-xs text-gray-500 block mb-1">Notes (optional — for personalizing emails)</label>
              <input value={form.notes} onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
                placeholder="Loves coffee, dog parent, joined 2021…"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#2D1B69]/50" />
            </div>
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <button onClick={() => { setShowForm(false); setForm(EMPTY_FORM); }}
              className="px-4 py-2 text-sm border border-gray-200 rounded-lg hover:bg-gray-50">Cancel</button>
            <button onClick={handleAdd} disabled={!form.name || !form.email || !form.birthday || saving}
              className="px-4 py-2 text-sm text-white bg-[#2D1B69] rounded-lg hover:bg-[#3d2580] disabled:opacity-40">
              {saving ? "Saving…" : "Add Member"}
            </button>
          </div>
        </div>
      )}

      {/* Edit form */}
      {editId && (
        <div className="bg-white border border-[#2D1B69]/20 rounded-xl p-5">
          <h3 className="text-sm font-semibold text-gray-800 mb-4">Edit Team Member</h3>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-gray-500 block mb-1">Full name *</label>
              <input value={editForm.name} onChange={(e) => setEditForm((f) => ({ ...f, name: e.target.value }))}
                placeholder="Sarah Chen"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#2D1B69]/50" />
            </div>
            <div>
              <label className="text-xs text-gray-500 block mb-1">Work email *</label>
              <input type="email" value={editForm.email} onChange={(e) => setEditForm((f) => ({ ...f, email: e.target.value }))}
                placeholder="sarah@company.com"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#2D1B69]/50" />
            </div>
            <div>
              <label className="text-xs text-gray-500 block mb-1">Department</label>
              <input value={editForm.department} onChange={(e) => setEditForm((f) => ({ ...f, department: e.target.value }))}
                placeholder="Engineering"
                list="depts-edit"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#2D1B69]/50" />
              <datalist id="depts-edit">
                {Object.keys(DEPT_COLORS).map((d) => <option key={d} value={d} />)}
              </datalist>
            </div>
            <div>
              <label className="text-xs text-gray-500 block mb-1">Birthday (month & day) *</label>
              <input type="date" value={toInputDate(editForm.birthday)}
                onChange={(e) => setEditForm((f) => ({ ...f, birthday: e.target.value.slice(5) }))}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#2D1B69]/50" />
            </div>
            <div className="col-span-2">
              <label className="text-xs text-gray-500 block mb-1">Notes (optional)</label>
              <input value={editForm.notes} onChange={(e) => setEditForm((f) => ({ ...f, notes: e.target.value }))}
                placeholder="Loves coffee, dog parent, joined 2021…"
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#2D1B69]/50" />
            </div>
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <button onClick={cancelEdit}
              className="px-4 py-2 text-sm border border-gray-200 rounded-lg hover:bg-gray-50">Cancel</button>
            <button onClick={handleEdit} disabled={!editForm.name || !editForm.email || !editForm.birthday || saving}
              className="px-4 py-2 text-sm text-white bg-[#2D1B69] rounded-lg hover:bg-[#3d2580] disabled:opacity-40">
              {saving ? "Saving…" : "Save Changes"}
            </button>
          </div>
        </div>
      )}

      {/* List */}
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-12 px-4 py-2.5 bg-gray-50 border-b border-gray-100 text-xs font-medium text-gray-400 uppercase tracking-wide">
          <div className="col-span-4">Name</div>
          <div className="col-span-2">Department</div>
          <div className="col-span-2">Birthday</div>
          <div className="col-span-4 text-right">Actions</div>
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-sm text-gray-400 py-10">
            {search ? "No results found." : "No team members yet — add one above or import a CSV."}
          </p>
        )}

        {filtered.map((e, i) => {
          const c = deptColor(e.department);
          return (
            <div key={e.id}
              className={`grid grid-cols-12 items-center px-4 py-3 hover:bg-gray-50/80 transition-colors ${i < filtered.length - 1 ? "border-b border-gray-50" : ""}`}>
              {/* Name */}
              <div className="col-span-4 flex items-center gap-3 min-w-0">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0"
                  style={{ background: c.bg, color: c.text }}>
                  {initials(e.name)}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">{e.name}</p>
                  <p className="text-xs text-gray-400 truncate">{e.email}</p>
                </div>
              </div>
              {/* Dept */}
              <div className="col-span-2">
                {e.department ? (
                  <span className="dept-badge" style={{ background: c.bg, color: c.text }}>{e.department}</span>
                ) : (
                  <span className="text-xs text-gray-400">—</span>
                )}
              </div>
              {/* Birthday */}
              <div className="col-span-2">
                <p className="text-sm text-gray-700">{fmtBirthday(e.birthday)}</p>
              </div>
              {/* Actions */}
              <div className="col-span-4 flex justify-end gap-2">
                <button onClick={() => onCompose(e)}
                  className="text-xs text-[#2D1B69] border border-[#2D1B69]/20 px-3 py-1.5 rounded-lg hover:bg-brand-50 transition-colors">
                  ✉ Compose
                </button>
                <button onClick={() => openEdit(e)}
                  title="Edit"
                  className={`text-xs border px-2 py-1.5 rounded-lg transition-colors ${editId === e.id ? "text-[#2D1B69] border-[#2D1B69]/40 bg-[#2D1B69]/5" : "text-gray-400 border-gray-100 hover:bg-[#2D1B69]/5 hover:text-[#2D1B69] hover:border-[#2D1B69]/30"}`}>
                  ✏
                </button>
                {confirm === e.id ? (
                  <>
                    <button onClick={() => { onDelete(e.id); setConfirm(null); }}
                      className="text-xs text-red-600 border border-red-200 px-3 py-1.5 rounded-lg hover:bg-red-50">Confirm</button>
                    <button onClick={() => setConfirm(null)}
                      className="text-xs text-gray-500 border border-gray-200 px-2 py-1.5 rounded-lg hover:bg-gray-50">✕</button>
                  </>
                ) : (
                  <button onClick={() => setConfirm(e.id)}
                    className="text-xs text-gray-400 border border-gray-100 px-2 py-1.5 rounded-lg hover:bg-red-50 hover:text-red-500 hover:border-red-200">
                    🗑
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <p className="text-xs text-gray-400 text-right">{employees.length} total members</p>
    </div>
  );
}
