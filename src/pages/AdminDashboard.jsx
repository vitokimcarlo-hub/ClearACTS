import { Routes, Route, NavLink, useNavigate } from 'react-router-dom'

function AdminDashboard() {
  const navigate = useNavigate()

  const user = {
    name: 'Admin User',
    id: 'ADM-001',
    role: 'Administrator'
  }

  const handleLogout = () => {
    navigate('/')
  }

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-logo">
          <h2>CLEAR<span className="highlight">Acts</span></h2>
          <p className="sidebar-tagline">ADMIN PORTAL</p>
        </div>

        <nav className="sidebar-nav">
          <NavLink to="/admin" end className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
            <span>📊</span> Dashboard
          </NavLink>
          <NavLink to="/admin/pending" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
            <span>⏳</span> Pending Review
          </NavLink>
          <NavLink to="/admin/approved" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
            <span>✅</span> Approved
          </NavLink>
          <NavLink to="/admin/rejected" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
            <span>❌</span> Rejected
          </NavLink>
          <NavLink to="/admin/students" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
            <span>👥</span> Students
          </NavLink>
        </nav>

        <div className="sidebar-user">
          <div className="user-info">
            <div className="user-avatar">{user.name.charAt(0)}</div>
            <div>
              <div className="user-name">{user.name}</div>
              <div className="user-role">{user.role}</div>
            </div>
          </div>
          <button className="btn-logout" onClick={handleLogout}>
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <Routes>
          <Route index element={<AdminHome />} />
          <Route path="pending" element={<AdminPending />} />
          <Route path="approved" element={<AdminApproved />} />
          <Route path="rejected" element={<AdminRejected />} />
          <Route path="students" element={<AdminStudents />} />
        </Routes>
      </main>
    </div>
  )
}

function AdminHome() {
  return (
    <>
      <div className="page-header">
        <h1>Administrator Dashboard</h1>
        <p>Review and process student clearances</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-value">12</div>
          <div className="stat-label">Pending Reviews</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">45</div>
          <div className="stat-label">Approved Today</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">3</div>
          <div className="stat-label">Rejected</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">156</div>
          <div className="stat-label">Total Students</div>
        </div>
      </div>

      <div className="card">
        <h3>Recent Clearance Requests</h3>
        <p>12 students are waiting for clearance approval.</p>
      </div>
    </>
  )
}

function AdminPending() {
  return (
    <div className="placeholder-content">
      <h2>Pending Reviews</h2>
      <p>Review and approve/reject clearance requests</p>
    </div>
  )
}

function AdminApproved() {
  return (
    <div className="placeholder-content">
      <h2>Approved Clearances</h2>
      <p>View all approved clearance records</p>
    </div>
  )
}

function AdminRejected() {
  return (
    <div className="placeholder-content">
      <h2>Rejected Clearances</h2>
      <p>View rejected clearance requests and reasons</p>
    </div>
  )
}

function AdminStudents() {
  return (
    <div className="placeholder-content">
      <h2>Student Management</h2>
      <p>View and manage student records</p>
    </div>
  )
}

export default AdminDashboard
