import { Routes, Route, NavLink, useNavigate } from 'react-router-dom'

function FacultyDashboard() {
  const navigate = useNavigate()

  const user = {
    name: 'Prof. Teacher',
    id: 'FAC-001',
    role: 'Faculty'
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
          <p className="sidebar-tagline">FACULTY PORTAL</p>
        </div>

        <nav className="sidebar-nav">
          <NavLink to="/faculty" end className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
            <span>📊</span> Dashboard
          </NavLink>
          <NavLink to="/faculty/issues" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
            <span>⚠️</span> Report Issues
          </NavLink>
          <NavLink to="/faculty/reported" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
            <span>📝</span> My Reports
          </NavLink>
          <NavLink to="/faculty/students" className={({ isActive }) => isActive ? 'nav-item active' : 'nav-item'}>
            <span>👥</span> My Students
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
          <Route index element={<FacultyHome />} />
          <Route path="issues" element={<FacultyIssues />} />
          <Route path="reported" element={<FacultyReported />} />
          <Route path="students" element={<FacultyStudents />} />
        </Routes>
      </main>
    </div>
  )
}

function FacultyHome() {
  return (
    <>
      <div className="page-header">
        <h1>Faculty Dashboard</h1>
        <p>Report academic issues and monitor student clearances</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-value">3</div>
          <div className="stat-label">Active Issues</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">8</div>
          <div className="stat-label">Resolved Issues</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">32</div>
          <div className="stat-label">My Students</div>
        </div>
      </div>

      <div className="card">
        <h3>Your Role</h3>
        <p>As faculty, you can report academic issues (incomplete requirements, failing grades, etc.) for administrators to review. You do not approve or reject clearances directly.</p>
      </div>

      <div className="card">
        <h3>Recent Issues Reported</h3>
        <p>No recent issues to display.</p>
      </div>
    </>
  )
}

function FacultyIssues() {
  return (
    <div className="placeholder-content">
      <h2>Report Academic Issue</h2>
      <p>Report incomplete requirements or academic concerns</p>
      <button className="btn btn-primary">New Issue Report</button>
    </div>
  )
}

function FacultyReported() {
  return (
    <div className="placeholder-content">
      <h2>My Reports</h2>
      <p>View and manage your reported issues</p>
    </div>
  )
}

function FacultyStudents() {
  return (
    <div className="placeholder-content">
      <h2>My Students</h2>
      <p>View students under your advisory</p>
    </div>
  )
}

export default FacultyDashboard
