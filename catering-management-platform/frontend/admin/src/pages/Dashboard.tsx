import { useState, useEffect } from 'react'
import { Routes, Route, Link, useLocation, useNavigate, useParams } from 'react-router-dom'
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
  X,
  Star,
  Settings,
  Layout,
  Eye,
  EyeOff,
  ChevronRight
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

interface Service {
  id: number
  title: string
  description: string
  icon?: string
  features: string
  capacity?: string
  active: boolean
  createdAt: string
}

interface GalleryImage {
  id: number
  url: string
  title?: string
  category?: string
  active: boolean
  createdAt: string
}

interface ContentItem {
  id: number
  pageName: string
  section: string
  title?: string
  content: string
  images?: string
  order: number
  active: boolean
  createdAt: string
}

interface Testimonial {
  id: number
  name: string
  event?: string
  content: string
  rating: number
  image?: string
  active: boolean
  createdAt: string
}

interface WebsiteSetting {
  id: number
  key: string
  value: string
  category: string
  description?: string
  createdAt: string
}

interface Page {
  id: number
  name: string
  title: string
  slug: string
  description?: string
  isEnabled: boolean
  order: number
  sections?: PageSection[]
}

interface PageSection {
  id: number
  pageSlug: string
  sectionType: string
  title?: string
  content: string
  images?: string
  order: number
  isVisible: boolean
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
              to="/dashboard/pages" 
              className={location.pathname.includes('/pages') ? 'active' : ''}
            >
              <Layout size={18} />
              <span>Pages</span>
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
            <Link 
              to="/dashboard/testimonials" 
              className={location.pathname.includes('/testimonials') ? 'active' : ''}
            >
              <Star size={18} />
              <span>Testimonials</span>
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

          <div className="nav-section">
            <p className="nav-section-title">Configuration</p>
            <Link 
              to="/dashboard/website-settings" 
              className={location.pathname.includes('/website-settings') ? 'active' : ''}
            >
              <Settings size={18} />
              <span>Website Settings</span>
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
          <Route path="pages" element={<PagesManagement />} />
          <Route path="pages/:slug" element={<PageEditor />} />
          <Route path="inquiries" element={<Inquiries />} />
          <Route path="services" element={<Services />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="content" element={<Content />} />
          <Route path="testimonials" element={<Testimonials />} />
          <Route path="website-settings" element={<WebsiteSettings />} />
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
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingService, setEditingService] = useState<Service | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    icon: '',
    features: '',
    capacity: '',
    active: true
  })

  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
    try {
      const token = localStorage.getItem('adminToken')
      const response = await axios.get(`${API_URL}/services`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setServices(response.data)
    } catch (error) {
      console.error('Failed to fetch services:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const token = localStorage.getItem('adminToken')

    try {
      if (editingService) {
        await axios.patch(`${API_URL}/services/${editingService.id}`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        })
      } else {
        await axios.post(`${API_URL}/services`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        })
      }
      fetchServices()
      handleCloseModal()
    } catch (error: any) {
      alert(error.response?.data?.message || 'Failed to save service')
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this service?')) return

    try {
      const token = localStorage.getItem('adminToken')
      await axios.delete(`${API_URL}/services/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      fetchServices()
    } catch (error) {
      alert('Failed to delete service')
    }
  }

  const handleEdit = (service: Service) => {
    setEditingService(service)
    setFormData({
      title: service.title,
      description: service.description,
      icon: service.icon || '',
      features: service.features,
      capacity: service.capacity || '',
      active: service.active
    })
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setEditingService(null)
    setFormData({
      title: '',
      description: '',
      icon: '',
      features: '',
      capacity: '',
      active: true
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  if (loading) return <div className="loading">Loading...</div>

  return (
    <div className="services-page">
      <div className="page-header">
        <div>
          <h1>Manage Services</h1>
          <p>Create and manage catering services offered</p>
        </div>
        <button onClick={() => setShowModal(true)} className="btn-primary">
          <Plus size={18} />
          <span>Add Service</span>
        </button>
      </div>

      {services.length === 0 ? (
        <div className="empty-state">
          <Utensils size={48} />
          <h3>No services yet</h3>
          <p>Add your first service to get started</p>
          <button onClick={() => setShowModal(true)} className="btn-primary">
            <Plus size={18} />
            <span>Add Service</span>
          </button>
        </div>
      ) : (
        <div className="services-grid">
          {services.map((service) => (
            <div key={service.id} className={`service-card ${!service.active ? 'inactive' : ''}`}>
              <div className="service-header">
                <h3>{service.title}</h3>
                <span className={`status-badge ${service.active ? 'active' : 'inactive'}`}>
                  {service.active ? 'Active' : 'Inactive'}
                </span>
              </div>
              <p className="service-description">{service.description}</p>
              {service.capacity && (
                <div className="service-detail">
                  <strong>Capacity:</strong> {service.capacity}
                </div>
              )}
              <div className="service-features">
                <strong>Features:</strong>
                <p>{service.features}</p>
              </div>
              <div className="service-actions">
                <button onClick={() => handleEdit(service)} className="btn-edit">
                  <Edit size={16} />
                  <span>Edit</span>
                </button>
                <button onClick={() => handleDelete(service.id)} className="btn-delete">
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
              <h2>{editingService ? 'Edit Service' : 'Add New Service'}</h2>
              <button onClick={handleCloseModal} className="btn-close">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="service-form">
              <div className="form-group">
                <label htmlFor="title">Service Title *</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  placeholder="e.g., Wedding Catering"
                />
              </div>

              <div className="form-group">
                <label htmlFor="description">Description *</label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows={3}
                  placeholder="Describe this service..."
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="icon">Icon</label>
                  <input
                    type="text"
                    id="icon"
                    name="icon"
                    value={formData.icon}
                    onChange={handleChange}
                    placeholder="e.g., 🎂 or URL"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="capacity">Capacity</label>
                  <input
                    type="text"
                    id="capacity"
                    name="capacity"
                    value={formData.capacity}
                    onChange={handleChange}
                    placeholder="e.g., 50-500 guests"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="features">Features *</label>
                <textarea
                  id="features"
                  name="features"
                  value={formData.features}
                  onChange={handleChange}
                  required
                  rows={4}
                  placeholder="List features separated by commas or line breaks"
                />
              </div>

              <div className="form-group checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    name="active"
                    checked={formData.active}
                    onChange={handleChange}
                  />
                  <span>Active (visible to customers)</span>
                </label>
              </div>

              <div className="form-actions">
                <button type="button" onClick={handleCloseModal} className="btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  {editingService ? 'Update Service' : 'Add Service'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

function Gallery() {
  const [images, setImages] = useState<GalleryImage[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingImage, setEditingImage] = useState<GalleryImage | null>(null)
  const [formData, setFormData] = useState({
    url: '',
    title: '',
    category: '',
    active: true
  })

  useEffect(() => {
    fetchImages()
  }, [])

  const fetchImages = async () => {
    try {
      const token = localStorage.getItem('adminToken')
      const response = await axios.get(`${API_URL}/gallery`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setImages(response.data)
    } catch (error) {
      console.error('Failed to fetch gallery:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const token = localStorage.getItem('adminToken')

    try {
      if (editingImage) {
        await axios.patch(`${API_URL}/gallery/${editingImage.id}`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        })
      } else {
        await axios.post(`${API_URL}/gallery`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        })
      }
      fetchImages()
      handleCloseModal()
    } catch (error: any) {
      alert(error.response?.data?.message || 'Failed to save image')
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this image?')) return

    try {
      const token = localStorage.getItem('adminToken')
      await axios.delete(`${API_URL}/gallery/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      fetchImages()
    } catch (error) {
      alert('Failed to delete image')
    }
  }

  const handleEdit = (image: GalleryImage) => {
    setEditingImage(image)
    setFormData({
      url: image.url,
      title: image.title || '',
      category: image.category || '',
      active: image.active
    })
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setEditingImage(null)
    setFormData({
      url: '',
      title: '',
      category: '',
      active: true
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  if (loading) return <div className="loading">Loading...</div>

  return (
    <div className="gallery-page">
      <div className="page-header">
        <div>
          <h1>Manage Gallery</h1>
          <p>Upload and organize event photos</p>
        </div>
        <button onClick={() => setShowModal(true)} className="btn-primary">
          <Plus size={18} />
          <span>Add Image</span>
        </button>
      </div>

      {images.length === 0 ? (
        <div className="empty-state">
          <ImageIcon size={48} />
          <h3>No images yet</h3>
          <p>Add your first gallery image to get started</p>
          <button onClick={() => setShowModal(true)} className="btn-primary">
            <Plus size={18} />
            <span>Add Image</span>
          </button>
        </div>
      ) : (
        <div className="gallery-grid">
          {images.map((image) => (
            <div key={image.id} className={`gallery-item ${!image.active ? 'inactive' : ''}`}>
              <div className="gallery-image">
                <img src={image.url} alt={image.title || 'Gallery image'} />
                <div className="gallery-overlay">
                  <button onClick={() => handleEdit(image)} className="btn-edit">
                    <Edit size={18} />
                  </button>
                  <button onClick={() => handleDelete(image.id)} className="btn-delete">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
              <div className="gallery-info">
                {image.title && <h4>{image.title}</h4>}
                {image.category && <span className="category-tag">{image.category}</span>}
                <span className={`status-badge ${image.active ? 'active' : 'inactive'}`}>
                  {image.active ? 'Active' : 'Inactive'}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingImage ? 'Edit Image' : 'Add New Image'}</h2>
              <button onClick={handleCloseModal} className="btn-close">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="gallery-form">
              <div className="form-group">
                <label htmlFor="url">Image URL *</label>
                <input
                  type="url"
                  id="url"
                  name="url"
                  value={formData.url}
                  onChange={handleChange}
                  required
                  placeholder="https://example.com/image.jpg"
                />
                {formData.url && (
                  <div className="image-preview">
                    <img src={formData.url} alt="Preview" />
                  </div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g., Wedding Reception"
                />
              </div>

              <div className="form-group">
                <label htmlFor="category">Category</label>
                <input
                  type="text"
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  placeholder="e.g., Wedding, Corporate, Birthday"
                />
              </div>

              <div className="form-group checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    name="active"
                    checked={formData.active}
                    onChange={handleChange}
                  />
                  <span>Active (visible to customers)</span>
                </label>
              </div>

              <div className="form-actions">
                <button type="button" onClick={handleCloseModal} className="btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  {editingImage ? 'Update Image' : 'Add Image'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

function Content() {
  const [content, setContent] = useState<ContentItem[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingContent, setEditingContent] = useState<ContentItem | null>(null)
  const [selectedPage, setSelectedPage] = useState<string>('all')
  const [formData, setFormData] = useState({
    pageName: 'home',
    section: '',
    title: '',
    content: '',
    images: '',
    order: 0,
    active: true
  })

  const pageOptions = ['home', 'about', 'services', 'gallery', 'contact', 'testimonials']

  useEffect(() => {
    fetchContent()
  }, [])

  const fetchContent = async () => {
    try {
      const token = localStorage.getItem('adminToken')
      const response = await axios.get(`${API_URL}/content`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setContent(response.data)
    } catch (error) {
      console.error('Failed to fetch content:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const token = localStorage.getItem('adminToken')

    try {
      if (editingContent) {
        await axios.patch(`${API_URL}/content/${editingContent.id}`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        })
      } else {
        await axios.post(`${API_URL}/content`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        })
      }
      fetchContent()
      handleCloseModal()
    } catch (error: any) {
      alert(error.response?.data?.message || 'Failed to save content')
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this content?')) return

    try {
      const token = localStorage.getItem('adminToken')
      await axios.delete(`${API_URL}/content/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      fetchContent()
    } catch (error) {
      alert('Failed to delete content')
    }
  }

  const handleEdit = (item: ContentItem) => {
    setEditingContent(item)
    setFormData({
      pageName: item.pageName,
      section: item.section,
      title: item.title || '',
      content: item.content,
      images: item.images || '',
      order: item.order,
      active: item.active
    })
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setEditingContent(null)
    setFormData({
      pageName: 'home',
      section: '',
      title: '',
      content: '',
      images: '',
      order: 0,
      active: true
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : 
              name === 'order' ? parseInt(value) || 0 : value
    }))
  }

  const filteredContent = selectedPage === 'all' 
    ? content 
    : content.filter(item => item.pageName === selectedPage)

  if (loading) return <div className="loading">Loading...</div>

  return (
    <div className="content-page">
      <div className="page-header">
        <div>
          <h1>Manage Content</h1>
          <p>Update page content and sections</p>
        </div>
        <button onClick={() => setShowModal(true)} className="btn-primary">
          <Plus size={18} />
          <span>Add Content</span>
        </button>
      </div>

      <div className="content-filters">
        <label>Filter by Page:</label>
        <select value={selectedPage} onChange={(e) => setSelectedPage(e.target.value)}>
          <option value="all">All Pages</option>
          {pageOptions.map(page => (
            <option key={page} value={page}>{page.charAt(0).toUpperCase() + page.slice(1)}</option>
          ))}
        </select>
      </div>

      {filteredContent.length === 0 ? (
        <div className="empty-state">
          <FileText size={48} />
          <h3>No content yet</h3>
          <p>Add your first content section to get started</p>
          <button onClick={() => setShowModal(true)} className="btn-primary">
            <Plus size={18} />
            <span>Add Content</span>
          </button>
        </div>
      ) : (
        <div className="content-list">
          {filteredContent.map((item) => (
            <div key={item.id} className={`content-item ${!item.active ? 'inactive' : ''}`}>
              <div className="content-header">
                <div>
                  <h3>{item.title || item.section}</h3>
                  <div className="content-meta">
                    <span className="page-badge">{item.pageName}</span>
                    <span className="section-badge">{item.section}</span>
                    <span className="order-badge">Order: {item.order}</span>
                  </div>
                </div>
                <span className={`status-badge ${item.active ? 'active' : 'inactive'}`}>
                  {item.active ? 'Active' : 'Inactive'}
                </span>
              </div>
              <div className="content-body">
                <p>{item.content.substring(0, 200)}{item.content.length > 200 ? '...' : ''}</p>
              </div>
              <div className="content-actions">
                <button onClick={() => handleEdit(item)} className="btn-edit">
                  <Edit size={16} />
                  <span>Edit</span>
                </button>
                <button onClick={() => handleDelete(item.id)} className="btn-delete">
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
          <div className="modal-content modal-large" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingContent ? 'Edit Content' : 'Add New Content'}</h2>
              <button onClick={handleCloseModal} className="btn-close">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="content-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="pageName">Page *</label>
                  <select
                    id="pageName"
                    name="pageName"
                    value={formData.pageName}
                    onChange={handleChange}
                    required
                  >
                    {pageOptions.map(page => (
                      <option key={page} value={page}>
                        {page.charAt(0).toUpperCase() + page.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="section">Section *</label>
                  <input
                    type="text"
                    id="section"
                    name="section"
                    value={formData.section}
                    onChange={handleChange}
                    required
                    placeholder="e.g., hero, about, features"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Section title"
                />
              </div>

              <div className="form-group">
                <label htmlFor="content">Content *</label>
                <textarea
                  id="content"
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  required
                  rows={6}
                  placeholder="Enter the content for this section..."
                />
              </div>

              <div className="form-group">
                <label htmlFor="images">Images (comma-separated URLs)</label>
                <input
                  type="text"
                  id="images"
                  name="images"
                  value={formData.images}
                  onChange={handleChange}
                  placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="order">Display Order</label>
                  <input
                    type="number"
                    id="order"
                    name="order"
                    value={formData.order}
                    onChange={handleChange}
                    min="0"
                  />
                </div>
                <div className="form-group checkbox-group">
                  <label>
                    <input
                      type="checkbox"
                      name="active"
                      checked={formData.active}
                      onChange={handleChange}
                    />
                    <span>Active (visible on website)</span>
                  </label>
                </div>
              </div>

              <div className="form-actions">
                <button type="button" onClick={handleCloseModal} className="btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  {editingContent ? 'Update Content' : 'Add Content'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    event: '',
    content: '',
    rating: 5,
    image: '',
    active: true
  })

  useEffect(() => {
    fetchTestimonials()
  }, [])

  const fetchTestimonials = async () => {
    try {
      const token = localStorage.getItem('adminToken')
      const response = await axios.get(`${API_URL}/testimonials`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setTestimonials(response.data)
    } catch (error) {
      console.error('Failed to fetch testimonials:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const token = localStorage.getItem('adminToken')

    try {
      if (editingTestimonial) {
        await axios.patch(`${API_URL}/testimonials/${editingTestimonial.id}`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        })
      } else {
        await axios.post(`${API_URL}/testimonials`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        })
      }
      fetchTestimonials()
      handleCloseModal()
    } catch (error: any) {
      alert(error.response?.data?.message || 'Failed to save testimonial')
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this testimonial?')) return

    try {
      const token = localStorage.getItem('adminToken')
      await axios.delete(`${API_URL}/testimonials/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      fetchTestimonials()
    } catch (error) {
      alert('Failed to delete testimonial')
    }
  }

  const handleEdit = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial)
    setFormData({
      name: testimonial.name,
      event: testimonial.event || '',
      content: testimonial.content,
      rating: testimonial.rating,
      image: testimonial.image || '',
      active: testimonial.active
    })
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setEditingTestimonial(null)
    setFormData({
      name: '',
      event: '',
      content: '',
      rating: 5,
      image: '',
      active: true
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : 
              name === 'rating' ? parseInt(value) || 5 : value
    }))
  }

  if (loading) return <div className="loading">Loading...</div>

  return (
    <div className="testimonials-page">
      <div className="page-header">
        <div>
          <h1>Manage Testimonials</h1>
          <p>Customer reviews and feedback</p>
        </div>
        <button onClick={() => setShowModal(true)} className="btn-primary">
          <Plus size={18} />
          <span>Add Testimonial</span>
        </button>
      </div>

      {testimonials.length === 0 ? (
        <div className="empty-state">
          <Star size={48} />
          <h3>No testimonials yet</h3>
          <p>Add your first customer testimonial</p>
          <button onClick={() => setShowModal(true)} className="btn-primary">
            <Plus size={18} />
            <span>Add Testimonial</span>
          </button>
        </div>
      ) : (
        <div className="testimonials-grid">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className={`testimonial-card ${!testimonial.active ? 'inactive' : ''}`}>
              <div className="testimonial-header">
                <div className="testimonial-rating">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star 
                      key={i} 
                      size={16} 
                      fill={i < testimonial.rating ? 'var(--color-gold)' : 'none'}
                      stroke={i < testimonial.rating ? 'var(--color-gold)' : '#ccc'}
                    />
                  ))}
                </div>
                <span className={`status-badge ${testimonial.active ? 'active' : 'inactive'}`}>
                  {testimonial.active ? 'Active' : 'Inactive'}
                </span>
              </div>
              <p className="testimonial-text">{testimonial.content}</p>
              <div className="testimonial-author">
                <h4>{testimonial.name}</h4>
                {testimonial.event && <p className="testimonial-event">{testimonial.event}</p>}
              </div>
              <div className="testimonial-actions">
                <button onClick={() => handleEdit(testimonial)} className="btn-edit">
                  <Edit size={16} />
                  <span>Edit</span>
                </button>
                <button onClick={() => handleDelete(testimonial.id)} className="btn-delete">
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
              <h2>{editingTestimonial ? 'Edit Testimonial' : 'Add New Testimonial'}</h2>
              <button onClick={handleCloseModal} className="btn-close">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="testimonial-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Customer Name *</label>
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
                  <label htmlFor="event">Event Type</label>
                  <input
                    type="text"
                    id="event"
                    name="event"
                    value={formData.event}
                    onChange={handleChange}
                    placeholder="Wedding Catering, Corporate Event, etc."
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="content">Testimonial Content *</label>
                <textarea
                  id="content"
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  required
                  rows={5}
                  placeholder="Customer's feedback..."
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="rating">Rating (1-5) *</label>
                  <select
                    id="rating"
                    name="rating"
                    value={formData.rating}
                    onChange={handleChange}
                    required
                  >
                    <option value="5">5 Stars</option>
                    <option value="4">4 Stars</option>
                    <option value="3">3 Stars</option>
                    <option value="2">2 Stars</option>
                    <option value="1">1 Star</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="image">Customer Image URL</label>
                  <input
                    type="url"
                    id="image"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    placeholder="https://example.com/photo.jpg"
                  />
                </div>
              </div>

              <div className="form-group checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    name="active"
                    checked={formData.active}
                    onChange={handleChange}
                  />
                  <span>Active (visible on website)</span>
                </label>
              </div>

              <div className="form-actions">
                <button type="button" onClick={handleCloseModal} className="btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  {editingTestimonial ? 'Update Testimonial' : 'Add Testimonial'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

function PagesManagement() {
  const [pages, setPages] = useState<Page[]>([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    fetchPages()
  }, [])

  const fetchPages = async () => {
    try {
      const token = localStorage.getItem('adminToken')
      const response = await axios.get(`${API_URL}/pages`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setPages(response.data)
    } catch (error) {
      console.error('Failed to fetch pages:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleToggle = async (slug: string, currentStatus: boolean) => {
    try {
      const token = localStorage.getItem('adminToken')
      await axios.patch(`${API_URL}/pages/${slug}/toggle`, 
        { isEnabled: !currentStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      fetchPages()
    } catch (error) {
      alert('Failed to update page status')
    }
  }

  if (loading) return <div className="loading">Loading...</div>

  return (
    <div className="pages-management">
      <div className="page-header-modern">
        <div>
          <h1>Pages</h1>
          <p>Manage your website pages and their content</p>
        </div>
      </div>

      <div className="pages-table-modern">
        <div className="table-header-modern">
          <div className="th-modern th-name">Page</div>
          <div className="th-modern th-description">Description</div>
          <div className="th-modern th-status">Status</div>
          <div className="th-modern th-actions">Actions</div>
        </div>

        {pages.map((page) => (
          <div key={page.id} className={`table-row-modern ${!page.isEnabled ? 'disabled' : ''}`}>
            <div className="td-modern td-name">
              <div className="page-icon-modern">
                <Layout size={20} />
              </div>
              <div>
                <h3>{page.name}</h3>
                <span className="page-slug">/{page.slug}</span>
              </div>
            </div>
            
            <div className="td-modern td-description">
              <p>{page.description || 'No description'}</p>
            </div>
            
            <div className="td-modern td-status">
              <label className="toggle-switch-modern">
                <input
                  type="checkbox"
                  checked={page.isEnabled}
                  onChange={() => handleToggle(page.slug, page.isEnabled)}
                />
                <span className="toggle-slider-modern"></span>
              </label>
              <span className={`status-text-modern ${page.isEnabled ? 'enabled' : 'disabled'}`}>
                {page.isEnabled ? (
                  <><Eye size={14} /> Live</>
                ) : (
                  <><EyeOff size={14} /> Disabled</>
                )}
              </span>
            </div>
            
            <div className="td-modern td-actions">
              <button 
                onClick={() => navigate(`/dashboard/pages/${page.slug}`)}
                className="btn-edit-modern"
              >
                <Edit size={16} />
                <span>Edit Content</span>
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function PageEditor() {
  const { slug } = useParams<{ slug: string }>()
  const [page, setPage] = useState<Page | null>(null)
  const [loading, setLoading] = useState(true)
  const [editingSection, setEditingSection] = useState<PageSection | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (slug) fetchPage()
  }, [slug])

  const fetchPage = async () => {
    try {
      const token = localStorage.getItem('adminToken')
      const response = await axios.get(`${API_URL}/pages/${slug}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setPage(response.data)
    } catch (error) {
      console.error('Failed to fetch page:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSaveSection = async (section: PageSection) => {
    try {
      const token = localStorage.getItem('adminToken')
      await axios.patch(`${API_URL}/pages/sections/${section.id}`, section, {
        headers: { Authorization: `Bearer ${token}` }
      })
      alert('Section saved successfully!')
      fetchPage()
      setEditingSection(null)
    } catch (error) {
      alert('Failed to save section')
    }
  }

  if (loading) return <div className="loading">Loading...</div>
  if (!page) return <div>Page not found</div>

  return (
    <div className="page-editor-modern">
      <div className="editor-header-modern">
        <button onClick={() => navigate('/dashboard/pages')} className="btn-back-modern">
          <ChevronRight size={18} style={{ transform: 'rotate(180deg)' }} />
          Back to Pages
        </button>
        <div className="editor-title-modern">
          <h1>{page.name}</h1>
          <span className="page-path">/{page.slug}</span>
        </div>
      </div>

      <div className="editor-content-modern">
        <div className="sections-list-modern">
          <h2>Page Sections</h2>
          {page.sections && page.sections.length > 0 ? (
            page.sections.map((section) => (
              <div key={section.id} className="section-card-modern">
                <div className="section-header-modern">
                  <div>
                    <h3>{section.title || section.sectionType}</h3>
                    <span className="section-type-badge">{section.sectionType}</span>
                  </div>
                  <button 
                    onClick={() => setEditingSection(section)}
                    className="btn-edit-section-modern"
                  >
                    <Edit size={16} />
                    Edit
                  </button>
                </div>
                <div className="section-preview-modern">
                  {section.content.substring(0, 150)}...
                </div>
              </div>
            ))
          ) : (
            <div className="empty-sections-modern">
              <Layout size={48} />
              <p>No sections yet for this page</p>
            </div>
          )}
        </div>
      </div>

      {editingSection && (
        <div className="modal-overlay" onClick={() => setEditingSection(null)}>
          <div className="modal-content modal-large" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Edit Section: {editingSection.title || editingSection.sectionType}</h2>
              <button onClick={() => setEditingSection(null)} className="btn-close">
                <X size={20} />
              </button>
            </div>

            <div className="section-editor-modern">
              <div className="form-group">
                <label>Section Title</label>
                <input
                  type="text"
                  value={editingSection.title || ''}
                  onChange={(e) => setEditingSection({...editingSection, title: e.target.value})}
                  placeholder="Section title"
                />
              </div>

              <div className="form-group">
                <label>Content (JSON)</label>
                <textarea
                  value={editingSection.content}
                  onChange={(e) => setEditingSection({...editingSection, content: e.target.value})}
                  rows={15}
                  style={{ fontFamily: 'monospace', fontSize: '0.9rem' }}
                  placeholder='{"key": "value"}'
                />
              </div>

              <div className="form-group checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    checked={editingSection.isVisible}
                    onChange={(e) => setEditingSection({...editingSection, isVisible: e.target.checked})}
                  />
                  <span>Visible on website</span>
                </label>
              </div>

              <div className="form-group">
                <label>Images (URLs, optional)</label>
                <textarea
                  value={editingSection.images ?? ''}
                  onChange={(e) =>
                    setEditingSection({ ...editingSection, images: e.target.value })
                  }
                  rows={3}
                  placeholder="Image URL(s) for this block"
                />
              </div>

              <div className="form-actions">
                <button onClick={() => setEditingSection(null)} className="btn-secondary">
                  Cancel
                </button>
                <button onClick={() => handleSaveSection(editingSection)} className="btn-primary">
                  Save Section
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

/** Maps public page slug → `WebsiteSettings.category` values shown in Website Settings → Edit Content. */
const PAGE_SETTING_CATEGORIES: Record<string, string[]> = {
  home: ['hero', 'stats', 'home'],
  about: ['about'],
  services: ['services'],
  contact: ['contact'],
  gallery: ['gallery'],
  testimonials: ['testimonials'],
}

function settingsForWebsitePage(slug: string, all: WebsiteSetting[]): WebsiteSetting[] {
  const cats = PAGE_SETTING_CATEGORIES[slug]
  if (cats !== undefined) {
    if (cats.length === 0) {
      return all.filter(
        (s) => s.category === slug || s.key.toLowerCase().includes(slug.toLowerCase()),
      )
    }
    return all.filter((s) => cats.includes(s.category))
  }
  return all.filter(
    (s) => s.category === slug || s.key.toLowerCase().includes(slug.toLowerCase()),
  )
}

function WebsiteSettings() {
  const [pages, setPages] = useState<Page[]>([])
  const [settings, setSettings] = useState<WebsiteSetting[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedPage, setSelectedPage] = useState<Page | null>(null)
  const [editedSettings, setEditedSettings] = useState<Record<string, string>>({})
  const [pageDetail, setPageDetail] = useState<Page | null>(null)
  const [pageDetailLoading, setPageDetailLoading] = useState(false)

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    if (!selectedPage) {
      setPageDetail(null)
      return
    }
    const load = async () => {
      setPageDetailLoading(true)
      try {
        const token = localStorage.getItem('adminToken')
        const res = await axios.get(`${API_URL}/pages/${selectedPage.slug}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        setPageDetail(res.data)
      } catch (error) {
        console.error('Failed to fetch page detail:', error)
        setPageDetail(null)
      } finally {
        setPageDetailLoading(false)
      }
    }
    load()
  }, [selectedPage])

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('adminToken')
      const [pagesRes, settingsRes] = await Promise.all([
        axios.get(`${API_URL}/pages`, { headers: { Authorization: `Bearer ${token}` } }),
        axios.get(`${API_URL}/settings`, { headers: { Authorization: `Bearer ${token}` } }),
      ])
      setPages(pagesRes.data)
      setSettings(settingsRes.data)
    } catch (error) {
      console.error('Failed to fetch data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleTogglePage = async (slug: string, currentStatus: boolean) => {
    try {
      const token = localStorage.getItem('adminToken')
      await axios.patch(
        `${API_URL}/pages/${slug}/toggle`,
        { isEnabled: !currentStatus },
        { headers: { Authorization: `Bearer ${token}` } },
      )
      fetchData()
    } catch (error) {
      alert('Failed to update page status')
    }
  }

  const handleEditPage = (page: Page) => {
    setSelectedPage(page)
    const list = settingsForWebsitePage(page.slug, settings)
    const settingsMap: Record<string, string> = {}
    list.forEach((s) => {
      settingsMap[s.key] = s.value
    })
    setEditedSettings(settingsMap)
  }

  const updateSectionField = (
    sectionId: number,
    field: 'title' | 'content' | 'images',
    value: string,
  ) => {
    setPageDetail((prev) => {
      if (!prev?.sections) return prev
      return {
        ...prev,
        sections: prev.sections.map((s) =>
          s.id === sectionId ? { ...s, [field]: value } : s,
        ),
      }
    })
  }

  const updateSectionVisible = (sectionId: number, isVisible: boolean) => {
    setPageDetail((prev) => {
      if (!prev?.sections) return prev
      return {
        ...prev,
        sections: prev.sections.map((s) =>
          s.id === sectionId ? { ...s, isVisible } : s,
        ),
      }
    })
  }

  const handleSaveAll = async () => {
    const token = localStorage.getItem('adminToken')
    if (!token) {
      alert('Not authenticated')
      return
    }
    const hasSettings = Object.keys(editedSettings).length > 0
    const hasSections = (pageDetail?.sections?.length ?? 0) > 0
    if (!hasSettings && !hasSections) {
      alert('No editable fields for this page yet.')
      return
    }

    try {
      if (hasSettings) {
        const settingsArray = Object.entries(editedSettings).map(([key, value]) => ({
          key,
          value,
        }))
        await axios.post(`${API_URL}/settings/bulk`, settingsArray, {
          headers: { Authorization: `Bearer ${token}` },
        })
      }
      if (pageDetail?.sections?.length) {
        for (const section of pageDetail.sections) {
          await axios.patch(`${API_URL}/pages/sections/${section.id}`, section, {
            headers: { Authorization: `Bearer ${token}` },
          })
        }
      }
      alert('Saved successfully.')
      setEditedSettings({})
      setSelectedPage(null)
      fetchData()
    } catch (error) {
      console.error(error)
      alert('Failed to save.')
    }
  }

  const handleChange = (key: string, value: string) => {
    setEditedSettings((prev) => ({ ...prev, [key]: value }))
  }

  if (loading) return <div className="loading">Loading...</div>

  const pageSettingsList = selectedPage
    ? settingsForWebsitePage(selectedPage.slug, settings)
    : []

  return (
    <div className="settings-page-modern">
      <div className="page-header-modern">
        <div>
          <h1>Website Settings</h1>
          <p>Manage pages and the text, JSON blocks, and images your public site uses</p>
        </div>
      </div>

      {/* Pages Table */}
      <div className="pages-table-modern">
        <div className="table-header-modern">
          <div className="th-modern th-name">Page</div>
          <div className="th-modern th-description">Description</div>
          <div className="th-modern th-status">Status</div>
          <div className="th-modern th-actions">Actions</div>
        </div>

        {pages.map((page) => (
          <div key={page.id} className={`table-row-modern ${!page.isEnabled ? 'disabled' : ''}`}>
            <div className="td-modern td-name">
              <div className="page-icon-modern">
                <Layout size={20} />
              </div>
              <div>
                <h3>{page.name}</h3>
                <span className="page-slug">/{page.slug}</span>
              </div>
            </div>

            <div className="td-modern td-description">
              <p>{page.description || 'No description'}</p>
            </div>

            <div className="td-modern td-status">
              <label className="toggle-switch-modern">
                <input
                  type="checkbox"
                  checked={page.isEnabled}
                  onChange={() => handleTogglePage(page.slug, page.isEnabled)}
                />
                <span className="toggle-slider-modern"></span>
              </label>
              <span className={`status-text-modern ${page.isEnabled ? 'enabled' : 'disabled'}`}>
                {page.isEnabled ? (
                  <>
                    <Eye size={14} /> Live
                  </>
                ) : (
                  <>
                    <EyeOff size={14} /> Disabled
                  </>
                )}
              </span>
            </div>

            <div className="td-modern td-actions">
              <button onClick={() => handleEditPage(page)} className="btn-edit-modern">
                <Edit size={16} />
                <span>Edit Content</span>
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Content Editor Modal */}
      {selectedPage && (
        <div className="modal-overlay" onClick={() => setSelectedPage(null)}>
          <div className="modal-content modal-large" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Edit content: {selectedPage.name}</h2>
              <button onClick={() => setSelectedPage(null)} className="btn-close">
                <X size={20} />
              </button>
            </div>

            <div className="content-editor-modern">
              <h3 style={{ margin: '0 0 1rem', fontSize: '1rem', fontWeight: 600 }}>
                Site text &amp; media (settings)
              </h3>
              {pageSettingsList.length > 0 ? (
                pageSettingsList.map((setting) => (
                  <div key={setting.id} className="form-group">
                    <label>{setting.key.replace(/_/g, ' ')}</label>
                    {setting.description && (
                      <p className="field-description">{setting.description}</p>
                    )}
                    <textarea
                      value={editedSettings[setting.key] ?? setting.value}
                      onChange={(e) => handleChange(setting.key, e.target.value)}
                      rows={setting.key.endsWith('_json') ? 14 : 4}
                      placeholder={setting.value}
                      style={
                        setting.key.endsWith('_json')
                          ? { fontFamily: 'ui-monospace, monospace', fontSize: '0.85rem' }
                          : undefined
                      }
                    />
                  </div>
                ))
              ) : (
                <div className="empty-state">
                  <FileText size={48} />
                  <p>No keyed settings for this page. You can still edit page blocks below if any exist.</p>
                </div>
              )}

              <h3
                style={{
                  margin: '2rem 0 1rem',
                  fontSize: '1rem',
                  fontWeight: 600,
                  borderTop: '1px solid rgba(255,255,255,0.08)',
                  paddingTop: '1.5rem',
                }}
              >
                Page blocks (structured JSON &amp; image URLs)
              </h3>
              {pageDetailLoading && <p className="field-description">Loading page blocks…</p>}
              {!pageDetailLoading &&
                pageDetail?.sections &&
                pageDetail.sections.map((section) => (
                  <div
                    key={section.id}
                    className="form-group"
                    style={{
                      marginBottom: '1.25rem',
                      paddingBottom: '1.25rem',
                      borderBottom: '1px solid rgba(255,255,255,0.06)',
                    }}
                  >
                    <label>
                      {section.title || section.sectionType}{' '}
                      <span className="section-type-badge" style={{ marginLeft: 8 }}>
                        {section.sectionType}
                      </span>
                    </label>
                    <div className="form-group checkbox-group" style={{ marginTop: 8 }}>
                      <label>
                        <input
                          type="checkbox"
                          checked={section.isVisible}
                          onChange={(e) =>
                            updateSectionVisible(section.id, e.target.checked)
                          }
                        />
                        <span>Visible on website</span>
                      </label>
                    </div>
                    <label style={{ display: 'block', marginTop: 12 }}>Section title</label>
                    <input
                      type="text"
                      value={section.title ?? ''}
                      onChange={(e) => updateSectionField(section.id, 'title', e.target.value)}
                      placeholder="Title"
                    />
                    <label style={{ display: 'block', marginTop: 12 }}>Content (JSON)</label>
                    <textarea
                      value={section.content}
                      onChange={(e) => updateSectionField(section.id, 'content', e.target.value)}
                      rows={12}
                      style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.85rem' }}
                    />
                    <label style={{ display: 'block', marginTop: 12 }}>Images (URLs, optional)</label>
                    <textarea
                      value={section.images ?? ''}
                      onChange={(e) => updateSectionField(section.id, 'images', e.target.value)}
                      rows={3}
                      placeholder="https://… (one per line or JSON, depending how your site reads this block)"
                    />
                  </div>
                ))}
              {!pageDetailLoading &&
                (!pageDetail?.sections || pageDetail.sections.length === 0) && (
                  <p className="field-description">
                    No page blocks in the database for this route. Home copy also lives in settings
                    above; run page seed if you expect blocks here.
                  </p>
                )}

              <div className="form-actions">
                <button onClick={() => setSelectedPage(null)} className="btn-secondary">
                  Cancel
                </button>
                <button onClick={handleSaveAll} className="btn-primary">
                  <CheckCircle size={18} />
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
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
