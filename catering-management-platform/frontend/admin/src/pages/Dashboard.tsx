import { useState, useEffect } from 'react'
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { 
  LayoutDashboard, 
  Mail, 
  Utensils, 
  Image as ImageIcon, 
  FileText, 
  Users,
  LogOut,
  CalendarDays,
  Clock,
  CheckCircle,
  Plus,
  Edit,
  Trash2,
  X
} from 'lucide-react'

const API_URL = 'http://localhost:4000/api'

interface DashboardProps {
  onLogout: () => void
}

interface Inquiry {
  id: number
  name: string
  email: string
  phone: string
  eventType: string
  eventDate?: string
  guestCount?: string
  message?: string
  createdAt: string
}

interface Staff {
  id: number
  name: string
  email: string
  phone: string
  role: string
  department?: string
  salary?: string
  joinDate: string
  address?: string
  emergencyContact?: string
  status: string
  createdAt: string
}

export default function Dashboard({ onLogout }: DashboardProps) {
  const location = useLocation()
  const navigate = useNavigate()
  
  const handleLogout = () => {
    localStorage.removeItem('adminToken')
    onLogout()
    navigate('/login')
  }

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2>Saffron <span className="gold">&</span> Sage</h2>
          <p>Admin Panel</p>
        </div>

        <nav className="sidebar-nav">
          <div className="nav-section">
            <p className="nav-section-title">Website</p>
            <Link 
              to="/dashboard" 
              className={location.pathname === '/dashboard' ? 'active' : ''}
            >
              <LayoutDashboard size={18} />
              <span>Overview</span>
            </Link>
            <Link 
              to="/dashboard/inquiries" 
              className={location.pathname.includes('/inquiries') ? 'active' : ''}
            >
              <Mail size={18} />
              <span>Inquiries</span>
            </Link>
            <Link 
              to="/dashboard/services" 
              className={location.pathname.includes('/services') ? 'active' : ''}
            >
              <Utensils size={18} />
              <span>Services</span>
            </Link>
            <Link 
              to="/dashboard/gallery" 
              className={location.pathname.includes('/gallery') ? 'active' : ''}
            >
              <ImageIcon size={18} />
              <span>Gallery</span>
            </Link>
            <Link 
              to="/dashboard/content" 
              className={location.pathname.includes('/content') ? 'active' : ''}
            >
              <FileText size={18} />
              <span>Content</span>
            </Link>
          </div>

          <div className="nav-section">
            <p className="nav-section-title">Team</p>
            <Link 
              to="/dashboard/staff" 
              className={location.pathname.includes('/staff') ? 'active' : ''}
            >
              <Users size={18} />
              <span>Staff Management</span>
            </Link>
          </div>
        </nav>

        <button onClick={handleLogout} className="btn-logout">
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </aside>

      <main className="dashboard-main">
        <Routes>
          <Route index element={<Overview />} />
          <Route path="inquiries" element={<Inquiries />} />
          <Route path="services" element={<Services />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="content" element={<Content />} />
          <Route path="staff" element={<StaffManagement />} />
        </Routes>
      </main>
    </div>
  )
}

function Overview() {
  const [stats, setStats] = useState({
    totalInquiries: 0,
    todayInquiries: 0,
    pendingInquiries: 0,
    totalStaff: 0
  })

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('adminToken')
      const [inquiriesRes, staffRes] = await Promise.all([
        axios.get(`${API_URL}/inquiries`, {
          headers: { Authorization: `Bearer ${token}` }
        }),
        axios.get(`${API_URL}/staff`, {
          headers: { Authorization: `Bearer ${token}` }
        }).catch(() => ({ data: [] }))
      ])
      
      const inquiries = inquiriesRes.data
      const staff = staffRes.data
      const today = new Date().toDateString()
      const todayCount = inquiries.filter((inq: Inquiry) => 
        new Date(inq.createdAt).toDateString() === today
      ).length

      setStats({
        totalInquiries: inquiries.length,
        todayInquiries: todayCount,
        pendingInquiries: inquiries.length,
        totalStaff: staff.length
      })
    } catch (error) {
      console.error('Failed to fetch stats:', error)
    }
  }

  return (
    <div className="overview">
      <h1>Dashboard Overview</h1>
      
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <Mail size={24} />
          </div>
          <div className="stat-content">
            <h3>{stats.totalInquiries}</h3>
            <p>Total Inquiries</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <CalendarDays size={24} />
          </div>
          <div className="stat-content">
            <h3>{stats.todayInquiries}</h3>
            <p>Today's Inquiries</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <Clock size={24} />
          </div>
          <div className="stat-content">
            <h3>{stats.pendingInquiries}</h3>
            <p>Pending</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <Users size={24} />
          </div>
          <div className="stat-content">
            <h3>{stats.totalStaff}</h3>
            <p>Team Members</p>
          </div>
        </div>
      </div>

      <div className="quick-actions">
        <h2>Quick Actions</h2>
        <div className="action-grid">
          <Link to="/dashboard/inquiries" className="action-card">
            <Mail size={32} />
            <h3>View Inquiries</h3>
            <p>Manage customer inquiries</p>
          </Link>
          <Link to="/dashboard/staff" className="action-card">
            <Users size={32} />
            <h3>Manage Staff</h3>
            <p>View and manage team members</p>
          </Link>
          <Link to="/dashboard/gallery" className="action-card">
            <ImageIcon size={32} />
            <h3>Update Gallery</h3>
            <p>Add new event photos</p>
          </Link>
        </div>
      </div>
    </div>
  )
}

function Inquiries() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchInquiries()
  }, [])

  const fetchInquiries = async () => {
    try {
      const token = localStorage.getItem('adminToken')
      const response = await axios.get(`${API_URL}/inquiries`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setInquiries(response.data)
    } catch (error) {
      console.error('Failed to fetch inquiries:', error)
    } finally {
      setLoading(false)
    }
  }

  const deleteInquiry = async (id: number) => {
    if (!confirm('Are you sure you want to delete this inquiry?')) return

    try {
      const token = localStorage.getItem('adminToken')
      await axios.delete(`${API_URL}/inquiries/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      fetchInquiries()
    } catch (error) {
      console.error('Failed to delete inquiry:', error)
    }
  }

  if (loading) return <div className="loading">Loading...</div>

  return (
    <div className="inquiries-page">
      <h1>Customer Inquiries</h1>
      
      {inquiries.length === 0 ? (
        <div className="empty-state">
          <p>No inquiries yet</p>
        </div>
      ) : (
        <div className="inquiries-table">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Event Type</th>
                <th>Guests</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {inquiries.map((inquiry) => (
                <tr key={inquiry.id}>
                  <td>{new Date(inquiry.createdAt).toLocaleDateString()}</td>
                  <td>{inquiry.name}</td>
                  <td>{inquiry.email}</td>
                  <td>{inquiry.phone}</td>
                  <td className="event-type">{inquiry.eventType}</td>
                  <td>{inquiry.guestCount || '-'}</td>
                  <td>
                    <button 
                      onClick={() => deleteInquiry(inquiry.id)}
                      className="btn-delete"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

function Services() {
  return (
    <div className="services-page">
      <h1>Manage Services</h1>
      <div className="placeholder">
        <p>Service management interface</p>
        <p>Create, edit, and delete catering services</p>
      </div>
    </div>
  )
}

function Gallery() {
  return (
    <div className="gallery-page">
      <h1>Manage Gallery</h1>
      <div className="placeholder">
        <p>Gallery management interface</p>
        <p>Upload and organize event photos</p>
      </div>
    </div>
  )
}

function Content() {
  return (
    <div className="content-page">
      <h1>Manage Content</h1>
      <div className="placeholder">
        <p>Content management interface</p>
        <p>Update homepage content, testimonials, and more</p>
      </div>
    </div>
  )
}

function StaffManagement() {
  const [staff, setStaff] = useState<Staff[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingStaff, setEditingStaff] = useState<Staff | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
    department: '',
    salary: '',
    joinDate: '',
    address: '',
    emergencyContact: '',
    status: 'active'
  })

  useEffect(() => {
    fetchStaff()
  }, [])

  const fetchStaff = async () => {
    try {
      const token = localStorage.getItem('adminToken')
      const response = await axios.get(`${API_URL}/staff`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setStaff(response.data)
    } catch (error) {
      console.error('Failed to fetch staff:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const token = localStorage.getItem('adminToken')

    try {
      if (editingStaff) {
        await axios.put(`${API_URL}/staff/${editingStaff.id}`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        })
      } else {
        await axios.post(`${API_URL}/staff`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        })
      }
      fetchStaff()
      handleCloseModal()
    } catch (error: any) {
      alert(error.response?.data?.message || 'Failed to save staff member')
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this staff member?')) return

    try {
      const token = localStorage.getItem('adminToken')
      await axios.delete(`${API_URL}/staff/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      fetchStaff()
    } catch (error) {
      alert('Failed to delete staff member')
    }
  }

  const handleEdit = (staffMember: Staff) => {
    setEditingStaff(staffMember)
    setFormData({
      name: staffMember.name,
      email: staffMember.email,
      phone: staffMember.phone,
      role: staffMember.role,
      department: staffMember.department || '',
      salary: staffMember.salary || '',
      joinDate: staffMember.joinDate.split('T')[0],
      address: staffMember.address || '',
      emergencyContact: staffMember.emergencyContact || '',
      status: staffMember.status
    })
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setEditingStaff(null)
    setFormData({
      name: '',
      email: '',
      phone: '',
      role: '',
      department: '',
      salary: '',
      joinDate: '',
      address: '',
      emergencyContact: '',
      status: 'active'
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  if (loading) return <div className="loading">Loading...</div>

  return (
    <div className="staff-page">
      <div className="page-header">
        <div>
          <h1>Staff Management</h1>
          <p>Manage your team members and their details</p>
        </div>
        <button onClick={() => setShowModal(true)} className="btn-primary">
          <Plus size={18} />
          <span>Add Staff Member</span>
        </button>
      </div>

      {staff.length === 0 ? (
        <div className="empty-state">
          <Users size={48} />
          <h3>No staff members yet</h3>
          <p>Add your first team member to get started</p>
          <button onClick={() => setShowModal(true)} className="btn-primary">
            <Plus size={18} />
            <span>Add Staff Member</span>
          </button>
        </div>
      ) : (
        <div className="staff-grid">
          {staff.map((member) => (
            <div key={member.id} className="staff-card">
              <div className="staff-card-header">
                <div className="staff-avatar">
                  {member.name.charAt(0).toUpperCase()}
                </div>
                <div className="staff-info">
                  <h3>{member.name}</h3>
                  <p className="role">{member.role}</p>
                  {member.department && <p className="department">{member.department}</p>}
                </div>
                <span className={`status-badge ${member.status}`}>
                  {member.status}
                </span>
              </div>

              <div className="staff-details">
                <div className="detail-row">
                  <Mail size={16} />
                  <span>{member.email}</span>
                </div>
                <div className="detail-row">
                  <span>Phone:</span>
                  <span>{member.phone}</span>
                </div>
                <div className="detail-row">
                  <span>Join Date:</span>
                  <span>{new Date(member.joinDate).toLocaleDateString()}</span>
                </div>
                {member.salary && (
                  <div className="detail-row">
                    <span>Salary:</span>
                    <span>{member.salary}</span>
                  </div>
                )}
                {member.emergencyContact && (
                  <div className="detail-row">
                    <span>Emergency:</span>
                    <span>{member.emergencyContact}</span>
                  </div>
                )}
              </div>

              <div className="staff-actions">
                <button onClick={() => handleEdit(member)} className="btn-edit">
                  <Edit size={16} />
                  <span>Edit</span>
                </button>
                <button onClick={() => handleDelete(member.id)} className="btn-delete">
                  <Trash2 size={16} />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingStaff ? 'Edit Staff Member' : 'Add New Staff Member'}</h2>
              <button onClick={handleCloseModal} className="btn-close">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="staff-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="John Doe"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="phone">Phone *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="+91 9999999999"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="role">Role *</label>
                  <input
                    type="text"
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    required
                    placeholder="Chef, Manager, etc."
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="department">Department</label>
                  <input
                    type="text"
                    id="department"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    placeholder="Kitchen, Service, etc."
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="salary">Salary</label>
                  <input
                    type="text"
                    id="salary"
                    name="salary"
                    value={formData.salary}
                    onChange={handleChange}
                    placeholder="50000"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="joinDate">Join Date *</label>
                  <input
                    type="date"
                    id="joinDate"
                    name="joinDate"
                    value={formData.joinDate}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="status">Status</label>
                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="on-leave">On Leave</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="address">Address</label>
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows={2}
                  placeholder="Full address"
                />
              </div>

              <div className="form-group">
                <label htmlFor="emergencyContact">Emergency Contact</label>
                <input
                  type="text"
                  id="emergencyContact"
                  name="emergencyContact"
                  value={formData.emergencyContact}
                  onChange={handleChange}
                  placeholder="Name: Phone"
                />
              </div>

              <div className="form-actions">
                <button type="button" onClick={handleCloseModal} className="btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  {editingStaff ? 'Update Staff' : 'Add Staff'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
