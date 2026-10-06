import { Routes, Route, NavLink, useNavigate } from 'react-router-dom'

function StudentDashboard() {
  const navigate = useNavigate()

  // Mock user data - will come from auth context
  const user = {
    name: 'John Student',
    id: 'STU-2024-001',
    role: 'Student'
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
          <p className="sidebar-tagline">STUDENT PORTAL</p>
        </div>

        <nav className="sidebar-nav">
          <NavLink to="/student" end className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
            <span>📊</span> Dashboard
          </NavLink>
          <NavLink to="/student/clearance" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
            <span>📝</span> My Clearance
          </NavLink>
          <NavLink to="/student/requirements" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
            <span>📋</span> Requirements
          </NavLink>
          <NavLink to="/student/history" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
            <span>📜</span> History
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
          <Route index element={<StudentHome />} />
          <Route path="clearance" element={<StudentClearance />} />
          <Route path="requirements" element={<StudentRequirements />} />
          <Route path="history" element={<StudentHistory />} />
        </Routes>
      </main>
    </div>
  )
}

function StudentHome() {
  return (
    <>
      <div className="page-header">
        <h1>Welcome, Student</h1>
        <p>Track your clearance progress and manage requirements</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-value">3/8</div>
          <div className="stat-label">Departments Cleared</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">2</div>
          <div className="stat-label">Pending Approvals</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">1</div>
          <div className="stat-label">Requirements Needed</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">5 days</div>
          <div className="stat-label">Until Deadline</div>
        </div>
      </div>

      <div className="card">
        <h3>Clearance Status Overview</h3>
        <p>Your clearance is currently in progress. You have been approved by 3 out of 8 departments.</p>
      </div>

      <div className="card">
        <h3>Recent Activity</h3>
        <p>No recent activity to display.</p>
      </div>
    </>
  )
}

function StudentClearance() {
  return (
    <div className="placeholder-content">
      <h2>My Clearance</h2>
      <p>View and submit clearance requests</p>
      <button className="btn btn-primary">Start New Clearance</button>
    </div>
  )
}

function StudentRequirements() {
  return (
    <div className="placeholder-content">
      <h2>Requirements</h2>
      <p>View required documents and upload submissions</p>
      <button className="btn btn-primary">Upload Documents</button>
    </div>
  )
}

function StudentHistory() {
  return (
    <div className="placeholder-content">
      <h2>Clearance History</h2>
      <p>View your past clearance records</p>
    </div>
  )
}

export default StudentDashboard
