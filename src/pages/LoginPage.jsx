import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import institutionLogo from '../assets/images (2).jpg'

// Icons as SVG components
const UserIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
)

const LockIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
)

function LoginPage() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    userId: '',
    password: '',
    rememberMe: false
  })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!formData.userId || !formData.password) {
      setError('Please fill in all fields')
      return
    }

    setIsLoading(true)

    // Simulate API call - replace with actual backend integration
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))

      // Demo routing based on user type
      // In production, this would come from the backend
      const userType = formData.userId.toLowerCase()

      if (userType.startsWith('admin') || userType.startsWith('lib') || userType.startsWith('lab')) {
        navigate('/admin')
      } else if (userType.startsWith('fac') || userType.startsWith('teach')) {
        navigate('/faculty')
      } else {
        navigate('/student')
      }
    } catch (err) {
      setError('Login failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="login-container">
      {/* Left Section - Branding */}
      <section className="left-section">
        <div className="brand-content">
          <div className="logo">
            <h1>Clear<span className="highlight">ACTS</span></h1>
            <p className="tagline">SCHOOL CLEARANCE SYSTEM</p>
          </div>
          <p className="description">
            A digital platform that streamlines the school clearance process fast, secure, and hassle-free.
          </p>
        </div>
      </section>

      {/* Right Section - Login Form */}
      <section className="right-section">
        <div className="logos-container">
          <img src={institutionLogo} alt="Institution Logo" className="institution-logo" />
          
        </div>

        <div className="quote-section">
          <p className="quote">
            "Your <em>EDUCATION</em> is your <em>LIFE</em>, Guard it well."
          </p>
          <p className="quote-source">— Proverbs 4:13b</p>
        </div>

        <div className="login-form">
          <h2>Sign In</h2>
          <p className="welcome-text">Welcome back! Please login to continue.</p>
          <div className="divider"></div>

          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="userId">Student ID / User ID</label>
              <div className="input-wrapper">
                <span className="input-icon"><UserIcon /></span>
                <input
                  type="text"
                  id="userId"
                  name="userId"
                  placeholder="Enter your Student ID or User ID"
                  value={formData.userId}
                  onChange={handleChange}
                  disabled={isLoading}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="input-wrapper">
                <span className="input-icon"><LockIcon /></span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  disabled={isLoading}
                  required
                />
                <button
                  type="button"
                  className="show-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? 'HIDE' : 'SHOW'}
                </button>
              </div>
            </div>

            <div className="form-options">
              <label className="checkbox-wrapper">
                <input
                  type="checkbox"
                  id="rememberMe"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                />
                <span className="checkbox-label">Remember me</span>
              </label>
              <button type="button" className="forgot-password">
                Forgot Password?
              </button>
            </div>

            <button
              type="submit"
              className="btn-signin"
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <p className="footer-text">
            Designed for <span className="highlight-text">ACTS Computer College</span>
          </p>
        </div>
      </section>
    </div>
  )
}

export default LoginPage
