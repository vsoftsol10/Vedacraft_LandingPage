import React, { useState, useEffect } from 'react'
import emailjs from '@emailjs/browser'
import { LogOut, Users, Calendar, UserPlus, Upload, Plus, Loader2, Pencil, Trash2, X, Check } from 'lucide-react'
import * as XLSX from 'xlsx'
import { supabase } from '../lib/supabaseClient'
import { sendApprovalEmail } from '../lib/emailjsClient'

const TABS = [
  { id: 'registrations', label: 'Registrations', icon: Users },
  { id: 'joinRequests', label: 'Join Requests', icon: UserPlus },
  { id: 'events', label: 'Events', icon: Calendar },
  { id: 'members', label: 'Community Members', icon: UserPlus },
]

const AdminDashboard = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState('registrations')

  useEffect(() => {
    const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    if (PUBLIC_KEY) {
      emailjs.init(PUBLIC_KEY)
    }
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <h1 className="text-lg font-bold text-gray-900">VedaCraft Admin</h1>
        <button
          onClick={onLogout}
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-red-600 transition-colors"
        >
          <LogOut size={16} /> Log out
        </button>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex gap-2 mb-8 border-b border-gray-200">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === id
                  ? 'border-yellow-400 text-gray-900'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <Icon size={16} /> {label}
            </button>
          ))}
        </div>

        {activeTab === 'registrations' && <RegistrationsTab />}
        {activeTab === 'joinRequests' && <JoinRequestsTab />}
        {activeTab === 'events' && <EventsTab />}
        {activeTab === 'members' && <MembersTab />}
      </div>
    </div>
  )
}

// Small reusable confirm-delete button
const ConfirmDeleteButton = ({ onConfirm, size = 14 }) => {
  const [confirming, setConfirming] = useState(false)

  if (confirming) {
    return (
      <span className="inline-flex items-center gap-1">
        <button
          onClick={() => { onConfirm(); setConfirming(false) }}
          className="text-red-600 hover:text-red-700 text-xs font-medium"
        >
          Confirm?
        </button>
        <button onClick={() => setConfirming(false)} className="text-gray-400 hover:text-gray-600">
          <X size={12} />
        </button>
      </span>
    )
  }

  return (
    <button onClick={() => setConfirming(true)} className="text-gray-400 hover:text-red-600 transition-colors">
      <Trash2 size={size} />
    </button>
  )
}

// ============================================
// Tab 1: Registrations (read + delete)
// ============================================
const RegistrationsTab = () => {
  const [registrations, setRegistrations] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchRegistrations = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('registrations')
      .select('*, events(title, date)')
      .order('created_at', { ascending: false })

    if (error) setError(error.message)
    else setRegistrations(data)
    setLoading(false)
  }

  useEffect(() => {
    fetchRegistrations()
  }, [])

  const handleDelete = async (id) => {
    const prev = registrations
    setRegistrations((rows) => rows.filter((r) => r.id !== id)) // optimistic
    const { error } = await supabase.from('registrations').delete().eq('id', id)
    if (error) {
      setError(error.message)
      setRegistrations(prev) // revert on failure
    }
  }

  if (loading) return <p className="text-sm text-gray-400">Loading registrations...</p>
  if (error) return <p className="text-sm text-red-500">{error}</p>
  if (registrations.length === 0) return <p className="text-sm text-gray-400">No registrations yet.</p>

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
            <tr>
              <th className="text-left px-4 py-3">Name</th>
              <th className="text-left px-4 py-3">Email</th>
              <th className="text-left px-4 py-3">Phone</th>
              <th className="text-left px-4 py-3">Event</th>
              <th className="text-left px-4 py-3">District</th>
              <th className="text-left px-4 py-3">Business</th>
              <th className="text-left px-4 py-3">Registered</th>
              <th className="text-left px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {registrations.map((r) => (
              <tr key={r.id} className="border-t border-gray-100">
                <td className="px-4 py-3 font-medium text-gray-800">{r.name}</td>
                <td className="px-4 py-3 text-gray-600">{r.email}</td>
                <td className="px-4 py-3 text-gray-600">{r.phone}</td>
                <td className="px-4 py-3 text-gray-600">{r.events?.title ?? '—'}</td>
                <td className="px-4 py-3 text-gray-600">{r.district || '—'}</td>
                <td className="px-4 py-3 text-gray-600">{r.business_name || r.business_category || '—'}</td>
                <td className="px-4 py-3 text-gray-400 text-xs">
                  {new Date(r.created_at).toLocaleDateString()}
                </td>
                <td className="px-4 py-3">
                  <ConfirmDeleteButton onConfirm={() => handleDelete(r.id)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

const EMPTY_EVENT = { title: '', tag: 'WORKSHOP', date: '', location: '', image_url: '' }


//===========================================
// Tab 2: Join requests (create, edit, delete)
//===========================================
const JoinRequestsTab = () => {
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(true)
  const [processingId, setProcessingId] = useState(null)
  const [error, setError] = useState('')

  const fetchRequests = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('join_requests')
      .select('*')
      .order('created_at', { ascending: false })
    if (!error) setRequests(data)
    setLoading(false)
  }

  useEffect(() => {
    fetchRequests()
  }, [])

  const handleApprove = async (request) => {
    setError('')
    setProcessingId(request.id)

    // 1. Add them to community_members
    const { error: memberError } = await supabase.from('community_members').insert({
      name: request.name,
      craft: request.business_type || 'Community Member',
      location: request.city || '',
    })

    if (memberError) {
      setProcessingId(null)
      setError(memberError.message)
      return
    }

    // 2. Mark request as approved
    const { error: updateError } = await supabase
      .from('join_requests')
      .update({ status: 'approved' })
      .eq('id', request.id)

    if (updateError) {
      setProcessingId(null)
      setError(updateError.message)
      return
    }

    // 3. Send congrats email (best-effort)
    try {
      await sendApprovalEmail({
        recipient_name: request.name,
        recipient_email: request.email,
        welcome_message: `Congratulations — your request to join the VedaCraft community has been approved. You're now listed as a community member. We're excited to have you with us!`,
      })
    } catch (emailErr) {
      console.error('Approval email failed:', emailErr)
    }

    setProcessingId(null)
    fetchRequests()
  }

  const handleReject = async (request) => {
    setProcessingId(request.id)
    const { error } = await supabase
      .from('join_requests')
      .update({ status: 'rejected' })
      .eq('id', request.id)
    setProcessingId(null)
    if (error) setError(error.message)
    else fetchRequests()
  }

  const pending = requests.filter((r) => r.status === 'pending')
  const reviewed = requests.filter((r) => r.status !== 'pending')

  if (loading) return <p className="text-sm text-gray-400">Loading join requests...</p>

  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Join Requests</h2>

      {error && (
        <div className="mb-4 text-xs text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
          {error}
        </div>
      )}

      <p className="text-sm font-semibold text-gray-700 mb-3">Pending ({pending.length})</p>
      {pending.length === 0 ? (
        <p className="text-sm text-gray-400 mb-8">No pending requests.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {pending.map((r) => (
            <div key={r.id} className="bg-white rounded-xl border border-gray-200 p-4">
              <p className="font-semibold text-gray-800 text-sm">{r.name}</p>
              <p className="text-xs text-gray-500 mt-1">{r.email}</p>
              <p className="text-xs text-gray-500">{r.phone || '—'} · {r.city || '—'}</p>
              <p className="text-xs text-gray-400 mt-1">{r.business_type || '—'}</p>

              <div className="flex items-center gap-2 mt-3">
                <button
                  onClick={() => handleApprove(r)}
                  disabled={processingId === r.id}
                  className="flex items-center gap-1 bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors"
                >
                  <Check size={13} /> Approve
                </button>
                <button
                  onClick={() => handleReject(r)}
                  disabled={processingId === r.id}
                  className="flex items-center gap-1 bg-gray-100 hover:bg-gray-200 disabled:opacity-60 text-gray-700 text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors"
                >
                  <X size={13} /> Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <p className="text-sm font-semibold text-gray-700 mb-3">Reviewed ({reviewed.length})</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {reviewed.map((r) => (
          <div key={r.id} className="bg-white rounded-xl border border-gray-200 p-4 opacity-70">
            <div className="flex items-center justify-between">
              <p className="font-semibold text-gray-800 text-sm">{r.name}</p>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                  r.status === 'approved' ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-600'
                }`}
              >
                {r.status.toUpperCase()}
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-1">{r.email}</p>
          </div>
        ))}
      </div>
    </div>
  )
}



// ============================================
// Tab 2: Events (create, edit, delete)
// ============================================
const EventsTab = () => {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null) // null = creating new
  const [formData, setFormData] = useState(EMPTY_EVENT)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const fetchEvents = async () => {
    setLoading(true)
    const { data, error } = await supabase.from('events').select('*').order('created_at', { ascending: false })
    if (!error) setEvents(data)
    setLoading(false)
  }

  useEffect(() => {
    fetchEvents()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const openCreateForm = () => {
    setEditingId(null)
    setFormData(EMPTY_EVENT)
    setError('')
    setShowForm(true)
  }

  const openEditForm = (event) => {
    setEditingId(event.id)
    setFormData({
      title: event.title || '',
      tag: event.tag || 'WORKSHOP',
      date: event.date || '',
      location: event.location || '',
      image_url: event.image_url || '',
    })
    setError('')
    setShowForm(true)
  }

  const handleSubmit = async () => {
    setError('')
    if (!formData.title || !formData.date) {
      setError('Title and date are required.')
      return
    }

    setSubmitting(true)
    const { error: submitError } = editingId
      ? await supabase.from('events').update(formData).eq('id', editingId)
      : await supabase.from('events').insert(formData)
    setSubmitting(false)

    if (submitError) {
      setError(submitError.message)
      return
    }

    setFormData(EMPTY_EVENT)
    setEditingId(null)
    setShowForm(false)
    fetchEvents()
  }

  const handleDelete = async (id) => {
    const prev = events
    setEvents((rows) => rows.filter((e) => e.id !== id)) // optimistic
    const { error } = await supabase.from('events').delete().eq('id', id)
    if (error) {
      setError(error.message)
      setEvents(prev)
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Events</h2>
        <button
          onClick={() => (showForm ? setShowForm(false) : openCreateForm())}
          className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-gray-900 text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
        >
          <Plus size={16} /> {showForm ? 'Cancel' : 'New Event'}
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-xl border border-gray-200 p-5 mb-6">
          <p className="text-sm font-semibold text-gray-800 mb-4">
            {editingId ? 'Edit Event' : 'New Event'}
          </p>

          {error && (
            <div className="mb-4 text-xs text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
              {error}
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 text-xs font-medium mb-1">Title</label>
              <input
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Digital Selling Workshop"
                className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-xs font-medium mb-1">Tag</label>
              <select
                name="tag"
                value={formData.tag}
                onChange={handleChange}
                className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-yellow-400"
              >
                <option value="WORKSHOP">Workshop</option>
                <option value="EXHIBITION">Exhibition</option>
                <option value="COFFEE MEET">Coffee Meet</option>
                <option value="ADVOCACY">Advocacy</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 text-xs font-medium mb-1">Date</label>
              <input
                name="date"
                value={formData.date}
                onChange={handleChange}
                placeholder="Aug 24, 2026"
                className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-xs font-medium mb-1">Location</label>
              <input
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Madurai, TN"
                className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-gray-700 text-xs font-medium mb-1">Image URL (optional)</label>
              <input
                name="image_url"
                value={formData.image_url}
                onChange={handleChange}
                placeholder="https://..."
                className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>
          </div>
          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="bg-gray-900 hover:bg-gray-800 disabled:opacity-60 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors"
          >
            {submitting ? 'Saving...' : editingId ? 'Update Event' : 'Save Event'}
          </button>
        </div>
      )}

      {loading ? (
        <p className="text-sm text-gray-400">Loading events...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {events.map((e) => (
            <div key={e.id} className="bg-white rounded-xl border border-gray-200 p-4">
              <div className="flex items-start justify-between">
                <p className="font-semibold text-gray-800 text-sm">{e.title}</p>
                <div className="flex items-center gap-2 shrink-0 ml-2">
                  <button onClick={() => openEditForm(e)} className="text-gray-400 hover:text-gray-700 transition-colors">
                    <Pencil size={14} />
                  </button>
                  <ConfirmDeleteButton onConfirm={() => handleDelete(e.id)} />
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-1">{e.tag} · {e.date}</p>
              <p className="text-xs text-gray-400 mt-1">{e.location}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

const EMPTY_MEMBER = { name: '', craft: '', location: '', image_url: '' }

// ============================================
// Tab 3: Community Members (create, edit, delete, + Excel bulk upload)
// ============================================
const MembersTab = () => {
  const [members, setMembers] = useState([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState(null) // null = creating new
  const [formData, setFormData] = useState(EMPTY_MEMBER)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const [excelRows, setExcelRows] = useState([])
  const [excelError, setExcelError] = useState('')
  const [uploadingExcel, setUploadingExcel] = useState(false)
  const [uploadResult, setUploadResult] = useState(null)

  const fetchMembers = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('community_members')
      .select('*')
      .order('created_at', { ascending: false })
    if (!error) setMembers(data)
    setLoading(false)
  }

  useEffect(() => {
    fetchMembers()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const startEdit = (member) => {
    setEditingId(member.id)
    setFormData({
      name: member.name || '',
      craft: member.craft || '',
      location: member.location || '',
      image_url: member.image_url || '',
    })
    setError('')
  }

  const cancelEdit = () => {
    setEditingId(null)
    setFormData(EMPTY_MEMBER)
    setError('')
  }

  const handleManualSubmit = async () => {
    setError('')
    if (!formData.name || !formData.craft) {
      setError('Name and craft are required.')
      return
    }

    setSubmitting(true)
    const { error: submitError } = editingId
      ? await supabase.from('community_members').update(formData).eq('id', editingId)
      : await supabase.from('community_members').insert(formData)
    setSubmitting(false)

    if (submitError) {
      setError(submitError.message)
      return
    }

    setFormData(EMPTY_MEMBER)
    setEditingId(null)
    fetchMembers()
  }

  const handleDelete = async (id) => {
    const prev = members
    setMembers((rows) => rows.filter((m) => m.id !== id)) // optimistic
    const { error } = await supabase.from('community_members').delete().eq('id', id)
    if (error) {
      setError(error.message)
      setMembers(prev)
    }
    if (editingId === id) cancelEdit()
  }

  // ---- Excel bulk upload ----
  const handleFileSelect = (e) => {
    const file = e.target.files[0]
    if (!file) return

    setExcelError('')
    setUploadResult(null)

    const reader = new FileReader()
    reader.onload = (evt) => {
      try {
        const data = new Uint8Array(evt.target.result)
        const workbook = XLSX.read(data, { type: 'array' })
        const sheet = workbook.Sheets[workbook.SheetNames[0]]
        const rows = XLSX.utils.sheet_to_json(sheet, { defval: '' })

        const normalized = rows.map((row) => ({
          name: String(row.name || row.Name || '').trim(),
          craft: String(row.craft || row.Craft || '').trim(),
          location: String(row.location || row.Location || '').trim(),
          image_url: String(row.image_url || row['Image URL'] || '').trim(),
        }))

        const invalid = normalized.filter((r) => !r.name || !r.craft)
        if (invalid.length > 0) {
          setExcelError(
            `${invalid.length} row(s) are missing a required "name" or "craft" value and will be skipped.`
          )
        }

        setExcelRows(normalized.filter((r) => r.name && r.craft))
      } catch (err) {
        setExcelError('Could not read this file. Make sure it is a valid .xlsx or .csv file.')
        setExcelRows([])
      }
    }
    reader.readAsArrayBuffer(file)
  }

  const handleExcelUpload = async () => {
    if (excelRows.length === 0) return

    setUploadingExcel(true)
    const { data, error } = await supabase.from('community_members').insert(excelRows).select()
    setUploadingExcel(false)

    if (error) {
      setExcelError(error.message)
      return
    }

    setUploadResult({ count: data.length })
    setExcelRows([])
    fetchMembers()
  }

  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Community Members</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Manual add / edit form */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <p className="text-sm font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <UserPlus size={16} /> {editingId ? 'Edit Member' : 'Add Manually'}
          </p>

          {error && (
            <div className="mb-3 text-xs text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
              {error}
            </div>
          )}

          <div className="flex flex-col gap-3">
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full name"
              className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <input
              name="craft"
              value={formData.craft}
              onChange={handleChange}
              placeholder="Craft / specialty"
              className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <input
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Location"
              className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <input
              name="image_url"
              value={formData.image_url}
              onChange={handleChange}
              placeholder="Image URL (optional)"
              className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          <div className="flex items-center gap-2 mt-4">
            <button
              onClick={handleManualSubmit}
              disabled={submitting}
              className="bg-gray-900 hover:bg-gray-800 disabled:opacity-60 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors"
            >
              {submitting ? 'Saving...' : editingId ? 'Update Member' : 'Add Member'}
            </button>
            {editingId && (
              <button
                onClick={cancelEdit}
                className="text-gray-500 hover:text-gray-700 text-sm font-medium px-3 py-2.5"
              >
                Cancel
              </button>
            )}
          </div>
        </div>

        {/* Excel bulk upload */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <p className="text-sm font-semibold text-gray-800 mb-2 flex items-center gap-2">
            <Upload size={16} /> Bulk Upload (Excel/CSV)
          </p>
          <p className="text-xs text-gray-500 mb-4">
            File must have columns: <code className="bg-gray-100 px-1 rounded">name</code>,{' '}
            <code className="bg-gray-100 px-1 rounded">craft</code>,{' '}
            <code className="bg-gray-100 px-1 rounded">location</code> (optional),{' '}
            <code className="bg-gray-100 px-1 rounded">image_url</code> (optional)
          </p>

          <input
            type="file"
            accept=".xlsx,.xls,.csv"
            onChange={handleFileSelect}
            className="text-xs text-gray-600 mb-3"
          />

          {excelError && (
            <div className="mb-3 text-xs text-amber-700 bg-amber-50 border border-amber-100 rounded-lg px-3 py-2">
              {excelError}
            </div>
          )}

          {uploadResult && (
            <div className="mb-3 text-xs text-green-700 bg-green-50 border border-green-100 rounded-lg px-3 py-2">
              Successfully added {uploadResult.count} member(s).
            </div>
          )}

          {excelRows.length > 0 && (
            <>
              <div className="max-h-40 overflow-y-auto border border-gray-100 rounded-lg mb-3">
                <table className="w-full text-xs">
                  <thead className="bg-gray-50 text-gray-500 sticky top-0">
                    <tr>
                      <th className="text-left px-2 py-1.5">Name</th>
                      <th className="text-left px-2 py-1.5">Craft</th>
                      <th className="text-left px-2 py-1.5">Location</th>
                    </tr>
                  </thead>
                  <tbody>
                    {excelRows.map((r, i) => (
                      <tr key={i} className="border-t border-gray-100">
                        <td className="px-2 py-1.5">{r.name}</td>
                        <td className="px-2 py-1.5">{r.craft}</td>
                        <td className="px-2 py-1.5">{r.location || '—'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <button
                onClick={handleExcelUpload}
                disabled={uploadingExcel}
                className="w-full flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-500 disabled:opacity-60 text-gray-900 text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors"
              >
                {uploadingExcel ? (
                  <>
                    <Loader2 size={14} className="animate-spin" /> Uploading {excelRows.length} rows...
                  </>
                ) : (
                  `Upload ${excelRows.length} Member(s)`
                )}
              </button>
            </>
          )}
        </div>
      </div>

      <p className="text-sm font-semibold text-gray-800 mb-3">All Members ({members.length})</p>
      {loading ? (
        <p className="text-sm text-gray-400">Loading...</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {members.map((m) => (
            <div key={m.id} className="bg-white rounded-xl border border-gray-200 p-3">
              <div className="flex items-start justify-between">
                <p className="font-semibold text-gray-800 text-sm">{m.name}</p>
                <div className="flex items-center gap-2 shrink-0 ml-2">
                  <button onClick={() => startEdit(m)} className="text-gray-400 hover:text-gray-700 transition-colors">
                    <Pencil size={13} />
                  </button>
                  <ConfirmDeleteButton onConfirm={() => handleDelete(m.id)} size={13} />
                </div>
              </div>
              <p className="text-xs text-gray-500">{m.craft}</p>
              <p className="text-xs text-gray-400">{m.location}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default AdminDashboard