import React, { useState, useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { snippetsAPI, formatStrapiDate } from '../services/strapiAPI';
import SnippetCard from '../components/SnippetCard';
import SnippetPreviewModal from '../components/SnippetPreviewModal';
import DemoModeNotice from '../components/DemoModeNotice';
import './SnippetsPage.css';

const SnippetsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [snippets, setSnippets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [previewSnippet, setPreviewSnippet] = useState(null);

  // Demo snippets
  const demoSnippets = useMemo(() => [
    {
      id: 1,
      title: "Animated Card Hover Effect",
      description: "Effetto hover elegante per card con gradient e shadow dinamici",
      category: "CSS",
      language: "css",
      htmlCode: `<div class="hover-card">
  <h3>Card Title</h3>
  <p>Beautiful hover animations with smooth transitions and stunning visual effects.</p>
  <button class="cta-btn">Learn More</button>
</div>`,
      cssCode: `.hover-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 16px;
  padding: 2rem;
  color: white;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.hover-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
  transition: left 0.5s;
}

.hover-card:hover::before {
  left: 100%;
}

.hover-card:hover {
  transform: translateY(-10px) scale(1.02);
  box-shadow: 0 20px 40px rgba(0,0,0,0.3);
}

.cta-btn {
  background: rgba(255,255,255,0.2);
  border: 2px solid white;
  color: white;
  padding: 0.8rem 1.5rem;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.cta-btn:hover {
  background: white;
  color: #667eea;
}`,
      jsCode: `// Optional JavaScript for advanced interactions
document.addEventListener('DOMContentLoaded', function() {
  const cards = document.querySelectorAll('.hover-card');
  
  cards.forEach(card => {
    card.addEventListener('mouseenter', function(e) {
      this.style.setProperty('--mouse-x', e.offsetX + 'px');
      this.style.setProperty('--mouse-y', e.offsetY + 'px');
    });
  });
});`,
      tags: ["css", "animation", "hover", "card"],
      downloads: 342,
      rating: 4.8,
      premium: false,
      createdAt: "2024-01-15"
    },
    {
      id: 2,
      title: "React Custom Hook - useLocalStorage",
      description: "Hook personalizzato per gestire localStorage con TypeScript support",
      category: "React",
      language: "javascript",
      htmlCode: `<!-- Usage Example -->
<div id="app">
  <h2>Local Storage Demo</h2>
  <input type="text" id="input" placeholder="Enter some text..." />
  <button onclick="saveData()">Save to LocalStorage</button>
  <button onclick="clearData()">Clear</button>
  <div id="output"></div>
</div>`,
      cssCode: `#app {
  max-width: 500px;
  margin: 2rem auto;
  padding: 2rem;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

#input {
  width: 100%;
  padding: 0.8rem;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  margin-bottom: 1rem;
}

button {
  background: #3b82f6;
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  margin-right: 0.5rem;
  margin-bottom: 1rem;
}

button:hover {
  background: #2563eb;
}

#output {
  background: #f8fafc;
  padding: 1rem;
  border-radius: 8px;
  border-left: 4px solid #3b82f6;
}`,
      jsCode: `// Custom React Hook for localStorage
import { useState, useEffect } from 'react';

function useLocalStorage(key, initialValue) {
  // Get from local storage then parse stored json or return initialValue
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error('Error reading localStorage key "' + key + '":', error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that persists the new value to localStorage
  const setValue = (value) => {
    try {
      // Allow value to be a function so we have the same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error('Error setting localStorage key "' + key + '":', error);
    }
  };

  return [storedValue, setValue];
}

// Usage Example Component
function App() {
  const [name, setName] = useLocalStorage('name', '');
  const [email, setEmail] = useLocalStorage('email', '');

  return (
    <div>
      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <p>Hello, {name}! Your email is {email}</p>
    </div>
  );
}

// Vanilla JavaScript version for demo
function saveData() {
  const input = document.getElementById('input');
  const output = document.getElementById('output');
  
  localStorage.setItem('demoData', input.value);
  output.textContent = 'Saved: ' + input.value;
}

function clearData() {
  localStorage.removeItem('demoData');
  document.getElementById('output').textContent = 'Data cleared';
  document.getElementById('input').value = '';
}

// Load data on page load
window.addEventListener('load', function() {
  const saved = localStorage.getItem('demoData');
  if (saved) {
    document.getElementById('input').value = saved;
    document.getElementById('output').textContent = 'Loaded: ' + saved;
  }
});`,
      tags: ["react", "hooks", "localstorage", "typescript"],
      downloads: 1247,
      rating: 4.9,
      premium: false,
      createdAt: "2024-01-12"
    },
    {
      id: 3,
      title: "CSS Glassmorphism Card",
      description: "Card con effetto vetro moderno usando backdrop-filter e gradienti",
      category: "CSS",
      language: "css",
      htmlCode: `<div class="glass-container">
  <div class="glass-card">
    <div class="card-header">
      <div class="avatar">👨‍💻</div>
      <div class="user-info">
        <h3>John Developer</h3>
        <p>Senior Frontend Engineer</p>
      </div>
    </div>
    <div class="card-body">
      <p>Passionate about creating beautiful, accessible web experiences with modern technologies.</p>
      <div class="stats">
        <div class="stat">
          <span class="number">127</span>
          <span class="label">Projects</span>
        </div>
        <div class="stat">
          <span class="number">2.4k</span>
          <span class="label">Followers</span>
        </div>
      </div>
    </div>
    <div class="card-footer">
      <button class="glass-btn">Connect</button>
      <button class="glass-btn secondary">Message</button>
    </div>
  </div>
</div>`,
      cssCode: `.glass-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
}

.glass-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  padding: 2rem;
  max-width: 350px;
  color: white;
  box-shadow: 0 25px 45px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.glass-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 35px 55px rgba(0, 0, 0, 0.15);
}

.card-header {
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
}

.avatar {
  width: 60px;
  height: 60px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  margin-right: 1rem;
}

.user-info h3 {
  margin: 0 0 0.25rem 0;
  font-size: 1.25rem;
}

.user-info p {
  margin: 0;
  opacity: 0.8;
  font-size: 0.9rem;
}

.stats {
  display: flex;
  justify-content: space-around;
  margin: 1.5rem 0;
}

.stat {
  text-align: center;
}

.stat .number {
  display: block;
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 0.25rem;
}

.stat .label {
  font-size: 0.8rem;
  opacity: 0.8;
}

.card-footer {
  display: flex;
  gap: 0.75rem;
}

.glass-btn {
  flex: 1;
  padding: 0.75rem 1rem;
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 12px;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 500;
}

.glass-btn:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
}

.glass-btn.secondary {
  background: transparent;
}`,
      jsCode: `// Optional: Add interactive particles effect
class ParticleSystem {
  constructor(container) {
    this.container = container;
    this.particles = [];
    this.createParticles();
    this.animate();
  }

  createParticles() {
    for (let i = 0; i < 50; i++) {
      this.particles.push({
        x: Math.random() * this.container.offsetWidth,
        y: Math.random() * this.container.offsetHeight,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.5 + 0.2
      });
    }
  }

  animate() {
    // Create canvas for particles
    if (!this.canvas) {
      this.canvas = document.createElement('canvas');
      this.canvas.style.position = 'absolute';
      this.canvas.style.top = '0';
      this.canvas.style.left = '0';
      this.canvas.style.pointerEvents = 'none';
      this.canvas.style.zIndex = '1';
      this.container.style.position = 'relative';
      this.container.appendChild(this.canvas);
    }

    this.canvas.width = this.container.offsetWidth;
    this.canvas.height = this.container.offsetHeight;
    const ctx = this.canvas.getContext('2d');

    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.particles.forEach(particle => {
      particle.x += particle.speedX;
      particle.y += particle.speedY;

      if (particle.x < 0) particle.x = this.canvas.width;
      if (particle.x > this.canvas.width) particle.x = 0;
      if (particle.y < 0) particle.y = this.canvas.height;
      if (particle.y > this.canvas.height) particle.y = 0;

      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fillStyle = \`rgba(255, 255, 255, \${particle.opacity})\`;
      ctx.fill();
    });

    requestAnimationFrame(() => this.animate());
  }
}

// Initialize particles when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.glass-container');
  if (container) {
    new ParticleSystem(container);
  }

  // Add interactive hover effects
  const card = document.querySelector('.glass-card');
  if (card) {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      card.style.setProperty('--mouse-x', \`\${x}px\`);
      card.style.setProperty('--mouse-y', \`\${y}px\`);
    });
  }
});`,
      tags: ["css", "glassmorphism", "modern", "ui"],
      downloads: 892,
      rating: 4.7,
      premium: false,
      createdAt: "2024-01-10"
    },
    {
      id: 4,
      title: "JavaScript Form Validator",
      description: "Validatore di form completo con RegEx e messaggi di errore personalizzati",
      category: "JavaScript",
      language: "javascript",
      htmlCode: `<form id="registration-form" class="form-container">
  <h2>Registration Form</h2>
  
  <div class="field-group">
    <label for="fullname">Full Name</label>
    <input type="text" id="fullname" name="fullname" placeholder="Enter your full name">
    <span class="error-message" id="fullname-error"></span>
  </div>

  <div class="field-group">
    <label for="email">Email Address</label>
    <input type="email" id="email" name="email" placeholder="Enter your email">
    <span class="error-message" id="email-error"></span>
  </div>

  <div class="field-group">
    <label for="password">Password</label>
    <input type="password" id="password" name="password" placeholder="Enter your password">
    <span class="error-message" id="password-error"></span>
    <div class="password-strength" id="password-strength"></div>
  </div>

  <div class="field-group">
    <label for="confirm-password">Confirm Password</label>
    <input type="password" id="confirm-password" name="confirmPassword" placeholder="Confirm your password">
    <span class="error-message" id="confirm-password-error"></span>
  </div>

  <div class="field-group">
    <label for="phone">Phone Number</label>
    <input type="tel" id="phone" name="phone" placeholder="+1 (555) 123-4567">
    <span class="error-message" id="phone-error"></span>
  </div>

  <button type="submit" class="submit-btn">Create Account</button>
</form>`,
      cssCode: `.form-container {
  max-width: 500px;
  margin: 2rem auto;
  padding: 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.form-container h2 {
  text-align: center;
  margin-bottom: 2rem;
  color: #2d3748;
}

.field-group {
  margin-bottom: 1.5rem;
}

.field-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #4a5568;
}

.field-group input {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.field-group input:focus {
  outline: none;
  border-color: #3182ce;
  box-shadow: 0 0 0 3px rgba(49, 130, 206, 0.1);
}

.field-group input.valid {
  border-color: #38a169;
  background-color: #f0fff4;
}

.field-group input.invalid {
  border-color: #e53e3e;
  background-color: #fed7d7;
}

.error-message {
  display: block;
  color: #e53e3e;
  font-size: 0.875rem;
  margin-top: 0.25rem;
  min-height: 1.25rem;
}

.password-strength {
  margin-top: 0.5rem;
  padding: 0.5rem;
  border-radius: 4px;
  font-size: 0.875rem;
}

.password-strength.weak {
  background-color: #fed7d7;
  color: #c53030;
}

.password-strength.medium {
  background-color: #faf089;
  color: #d69e2e;
}

.password-strength.strong {
  background-color: #c6f6d5;
  color: #38a169;
}

.submit-btn {
  width: 100%;
  padding: 0.875rem;
  background: #3182ce;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.submit-btn:hover:not(:disabled) {
  background: #2c5282;
  transform: translateY(-1px);
}

.submit-btn:disabled {
  background: #a0aec0;
  cursor: not-allowed;
  transform: none;
}`,
      jsCode: `class FormValidator {
  constructor(formId) {
    this.form = document.getElementById(formId);
    this.fields = {
      fullname: {
        element: this.form.querySelector('#fullname'),
        rules: [
          { test: (val) => val.length >= 2, message: 'Name must be at least 2 characters' },
          { test: (val) => /^[a-zA-Z\\s]+$/.test(val), message: 'Name can only contain letters and spaces' }
        ]
      },
      email: {
        element: this.form.querySelector('#email'),
        rules: [
          { test: (val) => /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(val), message: 'Please enter a valid email address' }
        ]
      },
      password: {
        element: this.form.querySelector('#password'),
        rules: [
          { test: (val) => val.length >= 8, message: 'Password must be at least 8 characters' },
          { test: (val) => /[A-Z]/.test(val), message: 'Password must contain at least one uppercase letter' },
          { test: (val) => /[a-z]/.test(val), message: 'Password must contain at least one lowercase letter' },
          { test: (val) => /\\d/.test(val), message: 'Password must contain at least one number' }
        ]
      },
      confirmPassword: {
        element: this.form.querySelector('#confirm-password'),
        rules: [
          { test: (val) => val === this.fields.password.element.value, message: 'Passwords do not match' }
        ]
      },
      phone: {
        element: this.form.querySelector('#phone'),
        rules: [
          { test: (val) => /^\\+?[1-9]\\d{1,14}$/.test(val.replace(/[\\s\\(\\)\\-]/g, '')), message: 'Please enter a valid phone number' }
        ]
      }
    };

    this.init();
  }

  init() {
    // Add event listeners
    Object.keys(this.fields).forEach(fieldName => {
      const field = this.fields[fieldName];
      field.element.addEventListener('blur', () => this.validateField(fieldName));
      field.element.addEventListener('input', () => {
        this.clearErrors(fieldName);
        if (fieldName === 'password') {
          this.updatePasswordStrength();
        }
      });
    });

    this.form.addEventListener('submit', (e) => this.handleSubmit(e));
  }

  validateField(fieldName) {
    const field = this.fields[fieldName];
    const value = field.element.value.trim();
    let isValid = true;

    // Clear previous errors
    this.clearErrors(fieldName);

    // Run validation rules
    for (let rule of field.rules) {
      if (!rule.test(value)) {
        this.showError(fieldName, rule.message);
        isValid = false;
        break;
      }
    }

    // Update visual state
    field.element.classList.toggle('valid', isValid && value !== '');
    field.element.classList.toggle('invalid', !isValid);

    return isValid;
  }

  validateAllFields() {
    let isFormValid = true;
    Object.keys(this.fields).forEach(fieldName => {
      if (!this.validateField(fieldName)) {
        isFormValid = false;
      }
    });
    return isFormValid;
  }

  showError(fieldName, message) {
    const errorElement = document.getElementById(\`\${fieldName}-error\`);
    if (errorElement) {
      errorElement.textContent = message;
    }
  }

  clearErrors(fieldName) {
    const errorElement = document.getElementById(\`\${fieldName}-error\`);
    if (errorElement) {
      errorElement.textContent = '';
    }
  }

  updatePasswordStrength() {
    const password = this.fields.password.element.value;
    const strengthElement = document.getElementById('password-strength');
    
    let score = 0;
    let feedback = '';

    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/\\d/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    strengthElement.className = 'password-strength';

    if (password.length === 0) {
      strengthElement.textContent = '';
      return;
    }

    if (score < 3) {
      strengthElement.classList.add('weak');
      feedback = '🔴 Weak password';
    } else if (score < 5) {
      strengthElement.classList.add('medium');
      feedback = '🟡 Medium strength';
    } else {
      strengthElement.classList.add('strong');
      feedback = '🟢 Strong password';
    }

    strengthElement.textContent = feedback;
  }

  handleSubmit(e) {
    e.preventDefault();
    
    if (this.validateAllFields()) {
      // Form is valid, proceed with submission
      console.log('Form is valid! Submitting...');
      
      // Simulate form submission
      const submitBtn = this.form.querySelector('.submit-btn');
      submitBtn.disabled = true;
      submitBtn.textContent = 'Creating Account...';
      
      setTimeout(() => {
        alert('Account created successfully!');
        submitBtn.disabled = false;
        submitBtn.textContent = 'Create Account';
        this.form.reset();
        this.clearAllErrors();
      }, 2000);
    } else {
      console.log('Form has errors. Please fix them.');
    }
  }

  clearAllErrors() {
    Object.keys(this.fields).forEach(fieldName => {
      this.clearErrors(fieldName);
      this.fields[fieldName].element.classList.remove('valid', 'invalid');
    });
    document.getElementById('password-strength').textContent = '';
  }
}

// Initialize the validator when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new FormValidator('registration-form');
});`,
      tags: ["javascript", "validation", "forms", "regex"],
      downloads: 567,
      rating: 4.6,
      premium: false,
      createdAt: "2024-01-08"
    },
    {
      id: 5,
      title: "CSS Loading Spinner Collection",
      description: "Collezione di 8 spinner animati con CSS puro per ogni occasione",
      category: "CSS",
      language: "css",
      htmlCode: `<div class="spinners-showcase">
  <h2>CSS Loading Spinners</h2>
  
  <div class="spinner-grid">
    <div class="spinner-item">
      <div class="spinner-1"></div>
      <p>Rotating Ring</p>
    </div>
    
    <div class="spinner-item">
      <div class="spinner-2"></div>
      <p>Pulsing Dots</p>
    </div>
    
    <div class="spinner-item">
      <div class="spinner-3">
        <div></div><div></div><div></div><div></div>
      </div>
      <p>Bouncing Balls</p>
    </div>
    
    <div class="spinner-item">
      <div class="spinner-4">
        <div></div><div></div><div></div>
      </div>
      <p>Scaling Bars</p>
    </div>
    
    <div class="spinner-item">
      <div class="spinner-5"></div>
      <p>Gradient Ring</p>
    </div>
    
    <div class="spinner-item">
      <div class="spinner-6">
        <span></span><span></span><span></span><span></span>
      </div>
      <p>Floating Squares</p>
    </div>
  </div>
</div>`,
      cssCode: `.spinners-showcase {
  padding: 3rem 2rem;
  background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
  min-height: 100vh;
  color: white;
  text-align: center;
}

.spinner-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 3rem;
  margin-top: 3rem;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
}

.spinner-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.spinner-item p {
  margin: 0;
  font-size: 0.9rem;
  opacity: 0.8;
}

/* Spinner 1: Rotating Ring */
.spinner-1 {
  width: 40px;
  height: 40px;
  border: 4px solid rgba(255, 255, 255, 0.2);
  border-top: 4px solid #00d4ff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Spinner 2: Pulsing Dots */
.spinner-2 {
  width: 40px;
  height: 40px;
  background: #00d4ff;
  border-radius: 50%;
  animation: pulse 1.5s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { transform: scale(0); opacity: 1; }
  50% { transform: scale(1); opacity: 0.7; }
}

/* Spinner 3: Bouncing Balls */
.spinner-3 {
  display: flex;
  gap: 4px;
}

.spinner-3 div {
  width: 8px;
  height: 8px;
  background: #00d4ff;
  border-radius: 50%;
  animation: bounce 1.4s ease-in-out infinite both;
}

.spinner-3 div:nth-child(1) { animation-delay: -0.32s; }
.spinner-3 div:nth-child(2) { animation-delay: -0.16s; }
.spinner-3 div:nth-child(3) { animation-delay: 0s; }
.spinner-3 div:nth-child(4) { animation-delay: 0.16s; }

@keyframes bounce {
  0%, 80%, 100% { transform: scale(0); opacity: 0.5; }
  40% { transform: scale(1); opacity: 1; }
}

/* Spinner 4: Scaling Bars */
.spinner-4 {
  display: flex;
  gap: 4px;
  align-items: end;
  height: 40px;
}

.spinner-4 div {
  width: 6px;
  background: #00d4ff;
  animation: scale-bars 1.2s ease-in-out infinite;
}

.spinner-4 div:nth-child(1) { animation-delay: -0.4s; }
.spinner-4 div:nth-child(2) { animation-delay: -0.2s; }
.spinner-4 div:nth-child(3) { animation-delay: 0s; }

@keyframes scale-bars {
  0%, 40%, 100% { height: 12px; }
  20% { height: 40px; }
}

/* Spinner 5: Gradient Ring */
.spinner-5 {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: conic-gradient(from 0deg, transparent, #00d4ff);
  animation: spin 1s linear infinite;
  position: relative;
}

.spinner-5::before {
  content: '';
  position: absolute;
  top: 4px;
  left: 4px;
  right: 4px;
  bottom: 4px;
  background: #1e3c72;
  border-radius: 50%;
}

/* Spinner 6: Floating Squares */
.spinner-6 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4px;
  width: 24px;
  height: 24px;
}

.spinner-6 span {
  background: #00d4ff;
  animation: float-squares 2s ease-in-out infinite;
}

.spinner-6 span:nth-child(1) { animation-delay: 0s; }
.spinner-6 span:nth-child(2) { animation-delay: -0.5s; }
.spinner-6 span:nth-child(3) { animation-delay: -1s; }
.spinner-6 span:nth-child(4) { animation-delay: -1.5s; }

@keyframes float-squares {
  0%, 100% { transform: scale(1) rotate(0deg); opacity: 1; }
  25% { transform: scale(0.5) rotate(45deg); opacity: 0.7; }
  50% { transform: scale(1.2) rotate(90deg); opacity: 0.4; }
  75% { transform: scale(0.8) rotate(135deg); opacity: 0.7; }
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .spinner-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
  }
}`,
      jsCode: `// JavaScript for interactive spinner controls
class SpinnerController {
  constructor() {
    this.currentTheme = 'blue';
    this.themes = {
      blue: '#00d4ff',
      green: '#00ff88',
      purple: '#8b5cf6',
      orange: '#f59e0b',
      pink: '#ec4899'
    };
    this.init();
  }

  init() {
    this.createControls();
    this.bindEvents();
  }

  createControls() {
    const controls = document.createElement('div');
    controls.className = 'spinner-controls';
    controls.innerHTML = \`
      <div class="control-panel">
        <h3>Customize Spinners</h3>
        <div class="theme-selector">
          <label>Color Theme:</label>
          <select id="theme-select">
            <option value="blue">Blue</option>
            <option value="green">Green</option>
            <option value="purple">Purple</option>
            <option value="orange">Orange</option>
            <option value="pink">Pink</option>
          </select>
        </div>
        <div class="speed-controller">
          <label>Animation Speed:</label>
          <input type="range" id="speed-range" min="0.5" max="3" step="0.1" value="1">
          <span id="speed-value">1x</span>
        </div>
        <button id="pause-all">Pause All</button>
      </div>
    \`;

    const showcase = document.querySelector('.spinners-showcase');
    showcase.insertBefore(controls, showcase.firstChild);

    // Add CSS for controls
    const style = document.createElement('style');
    style.textContent = \`
      .spinner-controls {
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(10px);
        border-radius: 12px;
        padding: 1.5rem;
        margin-bottom: 2rem;
        max-width: 600px;
        margin-left: auto;
        margin-right: auto;
      }

      .control-panel {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
        align-items: center;
        justify-content: center;
      }

      .control-panel h3 {
        width: 100%;
        margin: 0 0 1rem 0;
        text-align: center;
      }

      .theme-selector, .speed-controller {
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }

      .control-panel select, .control-panel input, .control-panel button {
        padding: 0.5rem;
        border: 1px solid rgba(255, 255, 255, 0.3);
        border-radius: 6px;
        background: rgba(255, 255, 255, 0.1);
        color: white;
      }

      .control-panel button {
        cursor: pointer;
        transition: all 0.3s ease;
      }

      .control-panel button:hover {
        background: rgba(255, 255, 255, 0.2);
      }

      @media (max-width: 768px) {
        .control-panel {
          flex-direction: column;
          text-align: center;
        }
        
        .theme-selector, .speed-controller {
          flex-direction: column;
        }
      }
    \`;
    document.head.appendChild(style);
  }

  bindEvents() {
    const themeSelect = document.getElementById('theme-select');
    const speedRange = document.getElementById('speed-range');
    const speedValue = document.getElementById('speed-value');
    const pauseButton = document.getElementById('pause-all');

    themeSelect.addEventListener('change', (e) => {
      this.changeTheme(e.target.value);
    });

    speedRange.addEventListener('input', (e) => {
      const speed = e.target.value;
      speedValue.textContent = \`\${speed}x\`;
      this.changeSpeed(speed);
    });

    let isPaused = false;
    pauseButton.addEventListener('click', () => {
      isPaused = !isPaused;
      this.togglePause(isPaused);
      pauseButton.textContent = isPaused ? 'Resume All' : 'Pause All';
    });
  }

  changeTheme(theme) {
    const color = this.themes[theme];
    document.documentElement.style.setProperty('--spinner-color', color);
    
    // Update all spinner colors
    const spinners = document.querySelectorAll('[class*="spinner-"]');
    spinners.forEach(spinner => {
      const elements = spinner.querySelectorAll('*');
      elements.forEach(el => {
        if (el.style.background || window.getComputedStyle(el).backgroundColor !== 'rgba(0, 0, 0, 0)') {
          el.style.background = color;
        }
        if (el.style.borderTopColor) {
          el.style.borderTopColor = color;
        }
      });
    });
  }

  changeSpeed(speed) {
    const spinners = document.querySelectorAll('[class*="spinner-"]');
    spinners.forEach(spinner => {
      spinner.style.animationDuration = \`\${1 / speed}s\`;
      const children = spinner.querySelectorAll('*');
      children.forEach(child => {
        const duration = window.getComputedStyle(child).animationDuration;
        if (duration !== '0s') {
          const originalDuration = parseFloat(duration);
          child.style.animationDuration = \`\${originalDuration / speed}s\`;
        }
      });
    });
  }

  togglePause(pause) {
    const spinners = document.querySelectorAll('[class*="spinner-"]');
    spinners.forEach(spinner => {
      spinner.style.animationPlayState = pause ? 'paused' : 'running';
      const children = spinner.querySelectorAll('*');
      children.forEach(child => {
        child.style.animationPlayState = pause ? 'paused' : 'running';
      });
    });
  }
}

// Initialize spinner controller when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new SpinnerController();
});

// Export individual spinner CSS for easy copy-paste
window.SpinnerCSS = {
  rotatingRing: \`
    .spinner {
      width: 40px;
      height: 40px;
      border: 4px solid rgba(255, 255, 255, 0.2);
      border-top: 4px solid #00d4ff;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  \`,
  
  pulsingDots: \`
    .spinner {
      width: 40px;
      height: 40px;
      background: #00d4ff;
      border-radius: 50%;
      animation: pulse 1.5s ease-in-out infinite;
    }
    @keyframes pulse {
      0%, 100% { transform: scale(0); opacity: 1; }
      50% { transform: scale(1); opacity: 0.7; }
    }
  \`
};`,
      tags: ["css", "animation", "loading", "spinners"],
      downloads: 1823,
      rating: 4.9,
      premium: false,
      createdAt: "2024-01-06"
    },
    {
      id: 6,
      title: "Vue 3 Composition API Counter",
      description: "Contatore interattivo con Vue 3, Composition API e animazioni",
      category: "Vue",
      language: "javascript",
      htmlCode: `<div id="app">
  <div class="counter-app">
    <h1>Vue 3 Counter</h1>
    
    <div class="counter-display">
      <span class="count-value">{{ count }}</span>
      <div class="count-label">Current Count</div>
    </div>

    <div class="counter-controls">
      <button @click="decrement" :disabled="count <= 0" class="btn btn-danger">
        <i class="icon">-</i>
        Decrease
      </button>
      
      <button @click="reset" class="btn btn-secondary">
        <i class="icon">↻</i>
        Reset
      </button>
      
      <button @click="increment" class="btn btn-success">
        <i class="icon">+</i>
        Increase
      </button>
    </div>

    <div class="counter-stats">
      <div class="stat-item">
        <span class="stat-value">{{ totalClicks }}</span>
        <span class="stat-label">Total Clicks</span>
      </div>
      <div class="stat-item">
        <span class="stat-value">{{ maxReached }}</span>
        <span class="stat-label">Max Reached</span>
      </div>
    </div>

    <div class="counter-history">
      <h3>Recent Actions</h3>
      <ul class="history-list">
        <li v-for="action in recentActions" :key="action.id" class="history-item">
          <span class="action-type">{{ action.type }}</span>
          <span class="action-value">{{ action.value }}</span>
          <span class="action-time">{{ formatTime(action.timestamp) }}</span>
        </li>
      </ul>
    </div>
  </div>
</div>`,
      cssCode: `.counter-app {
  max-width: 500px;
  margin: 2rem auto;
  padding: 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 20px;
  color: white;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  box-shadow: 0 20px 40px rgba(0,0,0,0.1);
}

.counter-app h1 {
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2rem;
  text-shadow: 0 2px 4px rgba(0,0,0,0.3);
}

.counter-display {
  text-align: center;
  margin-bottom: 2rem;
  padding: 2rem;
  background: rgba(255,255,255,0.1);
  border-radius: 15px;
  backdrop-filter: blur(10px);
}

.count-value {
  display: block;
  font-size: 4rem;
  font-weight: bold;
  animation: pulse-count 0.3s ease;
  text-shadow: 0 4px 8px rgba(0,0,0,0.3);
}

@keyframes pulse-count {
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
}

.count-label {
  font-size: 1rem;
  opacity: 0.8;
  margin-top: 0.5rem;
}

.counter-controls {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 2rem;
}

.btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;
}

.btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.2);
}

.btn:active {
  transform: translateY(0);
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

.btn-success {
  background: #10b981;
  color: white;
}

.btn-danger {
  background: #ef4444;
  color: white;
}

.btn-secondary {
  background: rgba(255,255,255,0.2);
  color: white;
  border: 1px solid rgba(255,255,255,0.3);
}

.counter-stats {
  display: flex;
  gap: 2rem;
  justify-content: center;
  margin-bottom: 2rem;
}

.stat-item {
  text-align: center;
  background: rgba(255,255,255,0.1);
  padding: 1rem;
  border-radius: 10px;
  min-width: 100px;
}

.stat-value {
  display: block;
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 0.25rem;
}

.stat-label {
  font-size: 0.8rem;
  opacity: 0.8;
}

.counter-history {
  background: rgba(255,255,255,0.1);
  border-radius: 10px;
  padding: 1rem;
}

.counter-history h3 {
  margin: 0 0 1rem 0;
  font-size: 1.1rem;
}

.history-list {
  list-style: none;
  padding: 0;
  margin: 0;
  max-height: 150px;
  overflow-y: auto;
}

.history-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  border-bottom: 1px solid rgba(255,255,255,0.1);
  animation: fade-in 0.3s ease;
}

.history-item:last-child {
  border-bottom: none;
}

@keyframes fade-in {
  from { opacity: 0; transform: translateX(-10px); }
  to { opacity: 1; transform: translateX(0); }
}

.action-type {
  font-weight: 600;
  padding: 0.2rem 0.5rem;
  border-radius: 5px;
  font-size: 0.8rem;
}

.action-type:contains("increment") {
  background: rgba(16, 185, 129, 0.3);
}

.action-time {
  font-size: 0.7rem;
  opacity: 0.7;
}

@media (max-width: 600px) {
  .counter-controls {
    flex-direction: column;
  }
  
  .counter-stats {
    flex-direction: column;
    gap: 1rem;
  }
  
  .count-value {
    font-size: 3rem;
  }
}`,
      jsCode: `// Vue 3 Composition API Counter Component
const { createApp, ref, computed, reactive, watch, onMounted } = Vue;

const CounterApp = {
  setup() {
    // Reactive state
    const count = ref(0);
    const totalClicks = ref(0);
    const maxReached = ref(0);
    const actions = reactive([]);

    // Computed properties
    const recentActions = computed(() => {
      return actions.slice(-5).reverse();
    });

    // Methods
    const increment = () => {
      count.value++;
      totalClicks.value++;
      addAction('increment', count.value);
      
      // Trigger animation
      animateCount();
    };

    const decrement = () => {
      if (count.value > 0) {
        count.value--;
        totalClicks.value++;
        addAction('decrement', count.value);
        animateCount();
      }
    };

    const reset = () => {
      count.value = 0;
      totalClicks.value++;
      addAction('reset', 0);
      animateCount();
    };

    const addAction = (type, value) => {
      const action = {
        id: Date.now() + Math.random(),
        type,
        value,
        timestamp: new Date()
      };
      actions.push(action);
      
      // Keep only last 10 actions
      if (actions.length > 10) {
        actions.shift();
      }
    };

    const formatTime = (timestamp) => {
      return timestamp.toLocaleTimeString('en-US', { 
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
    };

    const animateCount = () => {
      const countElement = document.querySelector('.count-value');
      if (countElement) {
        countElement.style.animation = 'none';
        countElement.offsetHeight; // Trigger reflow
        countElement.style.animation = 'pulse-count 0.3s ease';
      }
    };

    // Watchers
    watch(count, (newValue) => {
      if (newValue > maxReached.value) {
        maxReached.value = newValue;
      }
    });

    // Lifecycle hooks
    onMounted(() => {
      // Load saved state from localStorage
      const savedState = localStorage.getItem('vue-counter-state');
      if (savedState) {
        try {
          const state = JSON.parse(savedState);
          count.value = state.count || 0;
          totalClicks.value = state.totalClicks || 0;
          maxReached.value = state.maxReached || 0;
        } catch (error) {
          console.warn('Failed to load saved state:', error);
        }
      }

      // Save state on page unload
      window.addEventListener('beforeunload', () => {
        const state = {
          count: count.value,
          totalClicks: totalClicks.value,
          maxReached: maxReached.value
        };
        localStorage.setItem('vue-counter-state', JSON.stringify(state));
      });

      // Add keyboard shortcuts
      window.addEventListener('keydown', (e) => {
        switch(e.key) {
          case 'ArrowUp':
          case '+':
            e.preventDefault();
            increment();
            break;
          case 'ArrowDown':
          case '-':
            e.preventDefault();
            decrement();
            break;
          case 'r':
          case 'R':
            if (e.ctrlKey || e.metaKey) {
              e.preventDefault();
              reset();
            }
            break;
        }
      });
    });

    // Return reactive data and methods to template
    return {
      count,
      totalClicks,
      maxReached,
      recentActions,
      increment,
      decrement,
      reset,
      formatTime
    };
  }
};

// Create and mount the Vue app
createApp(CounterApp).mount('#app');

// Vanilla JavaScript version for comparison
class VanillaCounter {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.count = 0;
    this.totalClicks = 0;
    this.maxReached = 0;
    this.actions = [];
    
    this.init();
  }

  init() {
    this.render();
    this.bindEvents();
    this.loadState();
  }

  render() {
    this.container.innerHTML = \`
      <div class="vanilla-counter">
        <h2>Vanilla JS Counter</h2>
        <div class="count-display">\${this.count}</div>
        <div class="controls">
          <button class="btn-dec">-</button>
          <button class="btn-reset">Reset</button>
          <button class="btn-inc">+</button>
        </div>
        <div class="stats">
          <span>Clicks: \${this.totalClicks}</span>
          <span>Max: \${this.maxReached}</span>
        </div>
      </div>
    \`;
  }

  bindEvents() {
    this.container.querySelector('.btn-inc').addEventListener('click', () => this.increment());
    this.container.querySelector('.btn-dec').addEventListener('click', () => this.decrement());
    this.container.querySelector('.btn-reset').addEventListener('click', () => this.reset());
  }

  increment() {
    this.count++;
    this.totalClicks++;
    this.updateMaxReached();
    this.render();
  }

  decrement() {
    if (this.count > 0) {
      this.count--;
      this.totalClicks++;
      this.render();
    }
  }

  reset() {
    this.count = 0;
    this.totalClicks++;
    this.render();
  }

  updateMaxReached() {
    if (this.count > this.maxReached) {
      this.maxReached = this.count;
    }
  }

  loadState() {
    // Implementation for loading saved state
  }
}`,
      tags: ["vue", "composition-api", "counter", "reactive"],
      downloads: 423,
      rating: 4.5,
      premium: false,
      createdAt: "2024-01-04"
    },
    {
      id: 7,
      title: "TypeScript Interface Generator",
      description: "Utility per generare automaticamente interfacce TypeScript da oggetti JSON",
      category: "TypeScript",
      language: "typescript",
      htmlCode: `<div class="interface-generator">
  <h2>TypeScript Interface Generator</h2>
  
  <div class="input-section">
    <label for="json-input">Paste your JSON object:</label>
    <textarea 
      id="json-input" 
      placeholder='{"name": "John", "age": 30, "email": "john@example.com"}'
      rows="10"
    ></textarea>
    
    <div class="options">
      <label>
        <input type="checkbox" id="optional-props"> Make properties optional
      </label>
      <label>
        <input type="checkbox" id="readonly-props"> Make properties readonly
      </label>
      <label>
        Interface name: <input type="text" id="interface-name" value="GeneratedInterface">
      </label>
    </div>
    
    <button id="generate-btn">Generate Interface</button>
  </div>

  <div class="output-section">
    <div class="output-header">
      <h3>Generated TypeScript Interface</h3>
      <button id="copy-btn">Copy to Clipboard</button>
    </div>
    <pre id="output"><code id="generated-code">// Generated interface will appear here...</code></pre>
  </div>

  <div class="examples">
    <h3>Example Usage</h3>
    <div class="example-buttons">
      <button class="example-btn" data-example="user">User Object</button>
      <button class="example-btn" data-example="product">Product</button>
      <button class="example-btn" data-example="api">API Response</button>
      <button class="example-btn" data-example="config">Config Object</button>
    </div>
  </div>
</div>`,
      cssCode: `.interface-generator {
  max-width: 1000px;
  margin: 2rem auto;
  padding: 2rem;
  background: #1a1a1a;
  border-radius: 12px;
  color: #e0e0e0;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
}

.interface-generator h2 {
  text-align: center;
  margin-bottom: 2rem;
  color: #61dafb;
}

.input-section {
  margin-bottom: 2rem;
}

.input-section label {
  display: block;
  margin-bottom: 0.5rem;
  color: #b0b0b0;
  font-weight: 500;
}

#json-input {
  width: 100%;
  min-height: 200px;
  background: #2d2d2d;
  border: 2px solid #404040;
  border-radius: 8px;
  padding: 1rem;
  color: #e0e0e0;
  font-family: inherit;
  font-size: 14px;
  resize: vertical;
}

#json-input:focus {
  outline: none;
  border-color: #61dafb;
  box-shadow: 0 0 0 3px rgba(97, 218, 251, 0.1);
}

.options {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin: 1rem 0;
  padding: 1rem;
  background: #2a2a2a;
  border-radius: 8px;
}

.options label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0;
}

.options input[type="checkbox"] {
  accent-color: #61dafb;
}

.options input[type="text"] {
  background: #3a3a3a;
  border: 1px solid #555;
  border-radius: 4px;
  padding: 0.25rem 0.5rem;
  color: #e0e0e0;
  margin-left: 0.5rem;
}

#generate-btn {
  background: #61dafb;
  color: #1a1a1a;
  border: none;
  padding: 0.75rem 2rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

#generate-btn:hover {
  background: #4fa8c5;
  transform: translateY(-1px);
}

.output-section {
  margin-bottom: 2rem;
}

.output-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.output-header h3 {
  margin: 0;
  color: #b0b0b0;
}

#copy-btn {
  background: #28a745;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.875rem;
  transition: background 0.3s ease;
}

#copy-btn:hover {
  background: #218838;
}

#copy-btn.copied {
  background: #17a2b8;
}

#output {
  background: #2d2d2d;
  border: 2px solid #404040;
  border-radius: 8px;
  padding: 1.5rem;
  overflow-x: auto;
  margin: 0;
}

#generated-code {
  color: #e0e0e0;
  font-family: inherit;
  font-size: 14px;
  line-height: 1.5;
}

/* Syntax highlighting */
.keyword { color: #c678dd; }
.type { color: #61dafb; }
.property { color: #e06c75; }
.string { color: #98c379; }
.number { color: #d19a66; }
.boolean { color: #56b6c2; }

.examples {
  background: #2a2a2a;
  padding: 1.5rem;
  border-radius: 8px;
}

.examples h3 {
  margin-top: 0;
  margin-bottom: 1rem;
  color: #b0b0b0;
}

.example-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.example-btn {
  background: #404040;
  color: #e0e0e0;
  border: 1px solid #555;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.875rem;
}

.example-btn:hover {
  background: #555;
  border-color: #666;
}

@media (max-width: 768px) {
  .options {
    flex-direction: column;
  }
  
  .output-header {
    flex-direction: column;
    gap: 0.5rem;
    align-items: stretch;
  }
  
  .example-buttons {
    flex-direction: column;
  }
}`,
      jsCode: `// TypeScript Interface Generator
class TypeScriptInterfaceGenerator {
  constructor() {
    this.examples = {
      user: {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        age: 30,
        isActive: true,
        profile: {
          bio: "Software developer",
          avatar: "https://example.com/avatar.jpg",
          skills: ["TypeScript", "React", "Node.js"]
        }
      },
      product: {
        id: "prod-123",
        name: "MacBook Pro",
        price: 2499.99,
        inStock: true,
        categories: ["electronics", "computers"],
        specifications: {
          cpu: "M2 Pro",
          memory: "16GB",
          storage: "512GB SSD"
        },
        reviews: [
          { rating: 5, comment: "Excellent!", userId: 1 },
          { rating: 4, comment: "Good value", userId: 2 }
        ]
      },
      api: {
        success: true,
        data: {
          users: [
            { id: 1, name: "Alice" },
            { id: 2, name: "Bob" }
          ],
          pagination: {
            page: 1,
            total: 100,
            hasMore: true
          }
        },
        meta: {
          timestamp: "2024-01-15T10:30:00Z",
          version: "1.0.0"
        }
      },
      config: {
        app: {
          name: "MyApp",
          version: "2.1.0",
          debug: false
        },
        database: {
          host: "localhost",
          port: 5432,
          ssl: true,
          options: {
            connectTimeout: 30000,
            retries: 3
          }
        },
        features: {
          auth: true,
          analytics: false,
          experimental: ["new-ui", "beta-api"]
        }
      }
    };
    
    this.init();
  }

  init() {
    this.bindEvents();
    this.setupSyntaxHighlighting();
  }

  bindEvents() {
    const generateBtn = document.getElementById('generate-btn');
    const copyBtn = document.getElementById('copy-btn');
    const exampleBtns = document.querySelectorAll('.example-btn');
    const jsonInput = document.getElementById('json-input');

    generateBtn.addEventListener('click', () => this.generateInterface());
    copyBtn.addEventListener('click', () => this.copyToClipboard());
    
    exampleBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const exampleKey = e.target.dataset.example;
        this.loadExample(exampleKey);
      });
    });

    // Auto-generate on input change (debounced)
    let timeout;
    jsonInput.addEventListener('input', () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => this.generateInterface(), 500);
    });
  }

  loadExample(key) {
    if (this.examples[key]) {
      const jsonInput = document.getElementById('json-input');
      jsonInput.value = JSON.stringify(this.examples[key], null, 2);
      this.generateInterface();
    }
  }

  generateInterface() {
    try {
      const jsonInput = document.getElementById('json-input').value.trim();
      
      if (!jsonInput) {
        this.showOutput('// Please enter a JSON object to generate an interface');
        return;
      }

      const jsonObj = JSON.parse(jsonInput);
      const interfaceName = document.getElementById('interface-name').value || 'GeneratedInterface';
      const makeOptional = document.getElementById('optional-props').checked;
      const makeReadonly = document.getElementById('readonly-props').checked;

      const interfaceCode = this.generateInterfaceFromObject(
        jsonObj, 
        interfaceName, 
        makeOptional, 
        makeReadonly
      );
      
      this.showOutput(interfaceCode);
      this.applySyntaxHighlighting();
      
    } catch (error) {
      this.showOutput(\`// Error parsing JSON: \${error.message}\`);
    }
  }

  generateInterfaceFromObject(obj, name, optional = false, readonly = false, depth = 0) {
    const indent = '  '.repeat(depth);
    const optionalSuffix = optional ? '?' : '';
    const readonlyPrefix = readonly ? 'readonly ' : '';
    
    let result = \`\${indent}interface \${name} {\n\`;
    
    for (const [key, value] of Object.entries(obj)) {
      const type = this.getTypeFromValue(value, \`\${this.capitalize(key)}Type\`, optional, readonly, depth + 1);
      result += \`\${indent}  \${readonlyPrefix}\${key}\${optionalSuffix}: \${type};\n\`;
    }
    
    result += \`\${indent}}\`;
    return result;
  }

  getTypeFromValue(value, typeName, optional, readonly, depth) {
    if (value === null) {
      return 'null';
    }
    
    if (Array.isArray(value)) {
      if (value.length === 0) {
        return 'any[]';
      }
      
      const firstElement = value[0];
      if (typeof firstElement === 'object' && firstElement !== null) {
        const arrayInterface = this.generateInterfaceFromObject(
          firstElement, 
          typeName.replace('Type', 'Item'), 
          optional, 
          readonly, 
          depth
        );
        return \`\${typeName.replace('Type', 'Item')}[]\`;
      }
      
      const elementType = this.getTypeFromValue(firstElement, typeName, optional, readonly, depth);
      return \`\${elementType}[]\`;
    }
    
    if (typeof value === 'object') {
      return typeName;
    }
    
    if (typeof value === 'string') {
      return 'string';
    }
    
    if (typeof value === 'number') {
      return Number.isInteger(value) ? 'number' : 'number';
    }
    
    if (typeof value === 'boolean') {
      return 'boolean';
    }
    
    return 'unknown';
  }

  capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  showOutput(code) {
    const outputElement = document.getElementById('generated-code');
    outputElement.textContent = code;
  }

  applySyntaxHighlighting() {
    const codeElement = document.getElementById('generated-code');
    let code = codeElement.textContent;
    
    // Simple syntax highlighting
    code = code
      .replace(/(interface|readonly)/g, '<span class="keyword">$1</span>')
      .replace(/: (string|number|boolean|null|unknown|any)/g, ': <span class="type">$1</span>')
      .replace(/(\\w+)(?=\\??: )/g, '<span class="property">$1</span>');
    
    codeElement.innerHTML = code;
  }

  setupSyntaxHighlighting() {
    // Initialize with default syntax highlighting
    this.applySyntaxHighlighting();
  }

  async copyToClipboard() {
    const code = document.getElementById('generated-code').textContent;
    const copyBtn = document.getElementById('copy-btn');
    
    try {
      await navigator.clipboard.writeText(code);
      const originalText = copyBtn.textContent;
      copyBtn.textContent = 'Copied!';
      copyBtn.classList.add('copied');
      
      setTimeout(() => {
        copyBtn.textContent = originalText;
        copyBtn.classList.remove('copied');
      }, 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
      // Fallback for older browsers
      this.fallbackCopyToClipboard(code);
    }
  }

  fallbackCopyToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
      document.execCommand('copy');
    } catch (error) {
      console.error('Fallback copy failed:', error);
    }
    
    document.body.removeChild(textArea);
  }
}

// Initialize the generator when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new TypeScriptInterfaceGenerator();
});

// Advanced TypeScript utility types that can be generated
const advancedUtilities = {
  // Utility to make all properties optional recursively
  DeepPartial: \`
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};
\`,
  
  // Utility to make all properties required recursively  
  DeepRequired: \`
type DeepRequired<T> = {
  [P in keyof T]-?: T[P] extends object ? DeepRequired<T[P]> : T[P];
};
\`,
  
  // Utility to get nested property types
  NestedKeyOf: \`
type NestedKeyOf<ObjectType extends object> = {
  [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
    ? \`\${Key}\` | \`\${Key}.\${NestedKeyOf<ObjectType[Key]>}\`
    : \`\${Key}\`;
}[keyof ObjectType & (string | number)];
\`
};`,
      tags: ["typescript", "interface", "generator", "utility"],
      downloads: 756,
      rating: 4.8,
      premium: true,
      createdAt: "2024-01-02"
    },
    {
      id: 8,
      title: "CSS Grid Auto-Layout System",
      description: "Sistema di layout responsive con CSS Grid e utility classes moderne",
      category: "CSS",
      language: "css",
      htmlCode: `<div class="grid-demo">
  <h1>CSS Grid Auto-Layout System</h1>
  
  <!-- Basic Grid -->
  <section class="demo-section">
    <h2>Basic Auto Grid</h2>
    <div class="grid auto-fit" style="--min-item-width: 250px;">
      <div class="card">Card 1</div>
      <div class="card">Card 2</div>
      <div class="card">Card 3</div>
      <div class="card">Card 4</div>
      <div class="card">Card 5</div>
    </div>
  </section>

  <!-- Masonry-like Grid -->
  <section class="demo-section">
    <h2>Masonry-style Grid</h2>
    <div class="grid masonry">
      <div class="card tall">Tall Card</div>
      <div class="card">Regular Card</div>
      <div class="card short">Short Card</div>
      <div class="card">Regular Card</div>
      <div class="card extra-tall">Extra Tall Card</div>
      <div class="card">Regular Card</div>
    </div>
  </section>

  <!-- Dashboard Layout -->
  <section class="demo-section">
    <h2>Dashboard Layout</h2>
    <div class="grid dashboard">
      <header class="widget header-widget">Header</header>
      <nav class="widget nav-widget">Navigation</nav>
      <main class="widget main-widget">
        <h3>Main Content</h3>
        <p>This is the main content area that adapts to available space.</p>
      </main>
      <aside class="widget sidebar-widget">
        <h4>Sidebar</h4>
        <ul>
          <li>Link 1</li>
          <li>Link 2</li>
          <li>Link 3</li>
        </ul>
      </aside>
      <section class="widget stats-widget">
        <h4>Statistics</h4>
        <div class="stat">Users: 1,234</div>
        <div class="stat">Sales: $56,789</div>
      </section>
      <footer class="widget footer-widget">Footer</footer>
    </div>
  </section>

  <!-- Card Gallery -->
  <section class="demo-section">
    <h2>Responsive Card Gallery</h2>
    <div class="grid card-gallery">
      <div class="card featured">Featured Article</div>
      <div class="card">Article 1</div>
      <div class="card">Article 2</div>
      <div class="card">Article 3</div>
      <div class="card wide">Wide Feature</div>
      <div class="card">Article 4</div>
      <div class="card">Article 5</div>
      <div class="card">Article 6</div>
    </div>
  </section>
</div>`,
      cssCode: `/* CSS Grid Auto-Layout System */
:root {
  --grid-gap: 1rem;
  --card-padding: 1.5rem;
  --border-radius: 12px;
  --shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  --shadow-hover: 0 8px 25px rgba(0, 0, 0, 0.15);
  --min-item-width: 200px;
  
  /* Color scheme */
  --primary: #3b82f6;
  --secondary: #8b5cf6;
  --success: #10b981;
  --warning: #f59e0b;
  --danger: #ef4444;
  --dark: #1f2937;
  --light: #f9fafb;
  --white: #ffffff;
}

.grid-demo {
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.demo-section {
  margin-bottom: 4rem;
}

.demo-section h2 {
  margin-bottom: 1.5rem;
  color: var(--dark);
  border-bottom: 2px solid var(--primary);
  padding-bottom: 0.5rem;
}

/* Base Grid Classes */
.grid {
  display: grid;
  gap: var(--grid-gap);
  margin-bottom: 2rem;
}

/* Auto-fit grid - automatically fits columns based on min-width */
.grid.auto-fit {
  grid-template-columns: repeat(auto-fit, minmax(var(--min-item-width), 1fr));
}

/* Auto-fill grid - creates empty columns if needed */
.grid.auto-fill {
  grid-template-columns: repeat(auto-fill, minmax(var(--min-item-width), 1fr));
}

/* Masonry-style Grid */
.grid.masonry {
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-auto-rows: min-content;
  align-items: start;
}

/* Dashboard Grid */
.grid.dashboard {
  grid-template-areas:
    "header header header"
    "nav main sidebar"
    "nav stats sidebar"
    "footer footer footer";
  grid-template-columns: 200px 1fr 250px;
  grid-template-rows: auto 1fr auto auto;
  min-height: 500px;
}

/* Card Gallery Grid */
.grid.card-gallery {
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  grid-auto-rows: 200px;
}

/* Grid Items */
.card {
  background: var(--white);
  border-radius: var(--border-radius);
  padding: var(--card-padding);
  box-shadow: var(--shadow);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-weight: 600;
  color: var(--dark);
}

.card:hover {
  box-shadow: var(--shadow-hover);
  transform: translateY(-2px);
}

/* Card Variants */
.card.tall {
  grid-row: span 2;
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  color: white;
}

.card.short {
  min-height: 100px;
  background: linear-gradient(135deg, var(--success), #059669);
  color: white;
}

.card.extra-tall {
  grid-row: span 3;
  background: linear-gradient(135deg, var(--warning), #d97706);
  color: white;
}

.card.wide {
  grid-column: span 2;
  background: linear-gradient(135deg, var(--danger), #dc2626);
  color: white;
}

.card.featured {
  grid-column: span 2;
  grid-row: span 2;
  background: linear-gradient(135deg, var(--dark), #374151);
  color: white;
  font-size: 1.25rem;
}

/* Widget Styles for Dashboard */
.widget {
  background: var(--white);
  border-radius: var(--border-radius);
  padding: var(--card-padding);
  box-shadow: var(--shadow);
  display: flex;
  flex-direction: column;
}

.header-widget {
  grid-area: header;
  background: var(--primary);
  color: white;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  font-weight: bold;
}

.nav-widget {
  grid-area: nav;
  background: var(--dark);
  color: white;
}

.main-widget {
  grid-area: main;
  background: var(--light);
}

.sidebar-widget {
  grid-area: sidebar;
  background: var(--secondary);
  color: white;
}

.stats-widget {
  grid-area: stats;
  background: var(--success);
  color: white;
}

.footer-widget {
  grid-area: footer;
  background: var(--dark);
  color: white;
  justify-content: center;
  align-items: center;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .grid.dashboard {
    grid-template-areas:
      "header header"
      "nav main"
      "sidebar sidebar"
      "stats stats"
      "footer footer";
    grid-template-columns: 150px 1fr;
  }
}

@media (max-width: 768px) {
  :root {
    --grid-gap: 0.75rem;
    --card-padding: 1rem;
  }
  
  .grid.auto-fit,
  .grid.auto-fill {
    grid-template-columns: 1fr;
  }
  
  .grid.masonry {
    grid-template-columns: 1fr;
  }
  
  .grid.dashboard {
    grid-template-areas:
      "header"
      "nav"
      "main"
      "sidebar"
      "stats"
      "footer";
    grid-template-columns: 1fr;
  }
  
  .grid.card-gallery {
    grid-template-columns: 1fr;
    grid-auto-rows: auto;
  }
  
  .card.wide,
  .card.featured {
    grid-column: span 1;
  }
}

@media (max-width: 480px) {
  .grid-demo {
    padding: 1rem;
  }
  
  :root {
    --grid-gap: 0.5rem;
    --card-padding: 0.75rem;
  }
}

/* Utility Classes */
.span-2 { grid-column: span 2; }
.span-3 { grid-column: span 3; }
.span-4 { grid-column: span 4; }

.row-span-2 { grid-row: span 2; }
.row-span-3 { grid-row: span 3; }
.row-span-4 { grid-row: span 4; }

/* Dense packing */
.grid.dense {
  grid-auto-flow: row dense;
}

/* Centering utilities */
.place-center {
  place-items: center;
}

.place-start {
  place-items: start;
}

.place-end {
  place-items: end;
}

/* Animation for grid items */
.card {
  animation: fadeInUp 0.6s ease-out backwards;
}

.card:nth-child(1) { animation-delay: 0.1s; }
.card:nth-child(2) { animation-delay: 0.2s; }
.card:nth-child(3) { animation-delay: 0.3s; }
.card:nth-child(4) { animation-delay: 0.4s; }
.card:nth-child(5) { animation-delay: 0.5s; }

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Advanced Grid Features */
.grid.subgrid {
  display: subgrid;
}

/* Container Query Support (when available) */
@container (min-width: 400px) {
  .card {
    font-size: 1.1rem;
  }
}`,
      jsCode: `// JavaScript for Enhanced Grid Functionality
class GridLayoutManager {
  constructor() {
    this.grids = document.querySelectorAll('.grid');
    this.resizeObserver = null;
    this.init();
  }

  init() {
    this.setupResizeObserver();
    this.addControlPanel();
    this.bindEvents();
    this.animateGridItems();
  }

  setupResizeObserver() {
    if ('ResizeObserver' in window) {
      this.resizeObserver = new ResizeObserver(entries => {
        entries.forEach(entry => {
          this.handleGridResize(entry.target);
        });
      });

      this.grids.forEach(grid => {
        this.resizeObserver.observe(grid);
      });
    }
  }

  handleGridResize(grid) {
    // Adjust grid properties based on size
    const width = grid.offsetWidth;
    
    if (grid.classList.contains('auto-fit')) {
      const minWidth = parseInt(getComputedStyle(grid).getPropertyValue('--min-item-width')) || 200;
      const columns = Math.floor(width / (minWidth + 16)); // 16px for gap
      
      // Update CSS custom property for better control
      grid.style.setProperty('--calculated-columns', columns);
    }
  }

  addControlPanel() {
    const controlPanel = document.createElement('div');
    controlPanel.className = 'grid-controls';
    controlPanel.innerHTML = \`
      <div class="control-panel">
        <h3>Grid Controls</h3>
        <div class="control-group">
          <label for="gap-slider">Grid Gap:</label>
          <input type="range" id="gap-slider" min="0" max="40" value="16" step="2">
          <span id="gap-value">16px</span>
        </div>
        <div class="control-group">
          <label for="min-width-slider">Min Item Width:</label>
          <input type="range" id="min-width-slider" min="150" max="400" value="200" step="10">
          <span id="min-width-value">200px</span>
        </div>
        <div class="control-group">
          <button id="toggle-dense">Toggle Dense Layout</button>
          <button id="animate-items">Animate Items</button>
          <button id="shuffle-items">Shuffle Grid</button>
        </div>
      </div>
    \`;

    // Add styles for control panel
    const styles = \`
      <style>
        .grid-controls {
          position: fixed;
          top: 20px;
          right: 20px;
          background: white;
          border-radius: 12px;
          padding: 1rem;
          box-shadow: 0 10px 25px rgba(0,0,0,0.1);
          z-index: 1000;
          min-width: 250px;
        }
        
        .control-panel h3 {
          margin: 0 0 1rem 0;
          color: #1f2937;
        }
        
        .control-group {
          margin-bottom: 1rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          flex-wrap: wrap;
        }
        
        .control-group label {
          font-weight: 500;
          min-width: 100px;
        }
        
        .control-group input[type="range"] {
          flex: 1;
          min-width: 100px;
        }
        
        .control-group button {
          background: #3b82f6;
          color: white;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 6px;
          cursor: pointer;
          font-size: 0.875rem;
          transition: background 0.3s ease;
        }
        
        .control-group button:hover {
          background: #2563eb;
        }
        
        @media (max-width: 768px) {
          .grid-controls {
            position: static;
            margin-bottom: 2rem;
          }
        }
      </style>
    \`;

    document.head.insertAdjacentHTML('beforeend', styles);
    document.body.appendChild(controlPanel);
  }

  bindEvents() {
    const gapSlider = document.getElementById('gap-slider');
    const gapValue = document.getElementById('gap-value');
    const minWidthSlider = document.getElementById('min-width-slider');
    const minWidthValue = document.getElementById('min-width-value');
    const toggleDenseBtn = document.getElementById('toggle-dense');
    const animateBtn = document.getElementById('animate-items');
    const shuffleBtn = document.getElementById('shuffle-items');

    gapSlider?.addEventListener('input', (e) => {
      const value = e.target.value + 'px';
      gapValue.textContent = value;
      document.documentElement.style.setProperty('--grid-gap', value);
    });

    minWidthSlider?.addEventListener('input', (e) => {
      const value = e.target.value + 'px';
      minWidthValue.textContent = value;
      document.documentElement.style.setProperty('--min-item-width', value);
    });

    toggleDenseBtn?.addEventListener('click', () => {
      this.grids.forEach(grid => {
        grid.classList.toggle('dense');
      });
    });

    animateBtn?.addEventListener('click', () => {
      this.animateGridItems();
    });

    shuffleBtn?.addEventListener('click', () => {
      this.shuffleGridItems();
    });
  }

  animateGridItems() {
    this.grids.forEach(grid => {
      const items = grid.querySelectorAll('.card, .widget');
      items.forEach((item, index) => {
        item.style.animation = 'none';
        item.offsetHeight; // Trigger reflow
        item.style.animation = \`fadeInUp 0.6s ease-out \${index * 0.1}s backwards\`;
      });
    });
  }

  shuffleGridItems() {
    this.grids.forEach(grid => {
      const items = Array.from(grid.children);
      const shuffled = this.shuffleArray([...items]);
      
      // Clear grid
      items.forEach(item => item.remove());
      
      // Add shuffled items back
      shuffled.forEach(item => grid.appendChild(item));
      
      // Animate
      this.animateGridItems();
    });
  }

  shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  // Advanced grid features
  enableGridInspector() {
    this.grids.forEach(grid => {
      grid.addEventListener('click', (e) => {
        if (e.ctrlKey || e.metaKey) {
          this.inspectGridItem(e.target);
        }
      });
    });
  }

  inspectGridItem(item) {
    const gridArea = window.getComputedStyle(item).gridArea;
    const gridColumn = window.getComputedStyle(item).gridColumn;
    const gridRow = window.getComputedStyle(item).gridRow;
    
    console.log('Grid Item Inspector:', {
      element: item,
      gridArea,
      gridColumn,
      gridRow,
      computedStyle: window.getComputedStyle(item)
    });
    
    // Visual highlight
    item.style.outline = '3px solid #3b82f6';
    setTimeout(() => {
      item.style.outline = '';
    }, 2000);
  }

  // Performance optimization for large grids
  virtualizeGrid(grid, items) {
    // Implementation for virtual scrolling in large grids
    const viewportHeight = window.innerHeight;
    const itemHeight = 200; // Estimated item height
    const buffer = 5;
    
    let startIndex = Math.max(0, Math.floor(window.scrollY / itemHeight) - buffer);
    let endIndex = Math.min(items.length - 1, 
      Math.ceil((window.scrollY + viewportHeight) / itemHeight) + buffer);
    
    // Show only visible items + buffer
    items.forEach((item, index) => {
      if (index >= startIndex && index <= endIndex) {
        item.style.display = '';
      } else {
        item.style.display = 'none';
      }
    });
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  const gridManager = new GridLayoutManager();
  
  // Enable advanced features
  gridManager.enableGridInspector();
  
  // Add keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    if (e.key === 'g' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      document.querySelector('.grid-controls').style.display = 
        document.querySelector('.grid-controls').style.display === 'none' ? 'block' : 'none';
    }
  });
});

// Export utilities for external use
window.GridUtils = {
  createResponsiveGrid: (container, options = {}) => {
    const defaults = {
      minItemWidth: '200px',
      gap: '1rem',
      autoFlow: 'row',
      dense: false
    };
    
    const config = { ...defaults, ...options };
    
    container.style.display = 'grid';
    container.style.gridTemplateColumns = \`repeat(auto-fit, minmax(\${config.minItemWidth}, 1fr))\`;
    container.style.gap = config.gap;
    container.style.gridAutoFlow = config.dense ? 'row dense' : config.autoFlow;
    
    return container;
  },
  
  makeGridResponsive: (grid) => {
    const items = grid.children.length;
    const breakpoints = {
      xs: '(max-width: 576px)',
      sm: '(max-width: 768px)', 
      md: '(max-width: 992px)',
      lg: '(max-width: 1200px)'
    };
    
    Object.entries(breakpoints).forEach(([size, query]) => {
      const mediaQuery = window.matchMedia(query);
      
      const handler = (e) => {
        if (e.matches) {
          grid.setAttribute('data-responsive', size);
          // Adjust grid based on size
        }
      };
      
      mediaQuery.addListener(handler);
      handler(mediaQuery);
    });
  }
};`,
      tags: ["css", "grid", "layout", "responsive"],
      downloads: 1092,
      rating: 4.9,
      premium: false,
      createdAt: "2023-12-30"
    }
  ], []);

  useEffect(() => {
    const fetchSnippets = async () => {
      setLoading(true);
      
      try {
        console.log('Attempting to fetch snippets from Strapi...');
        const strapiSnippets = await snippetsAPI.getAll();
        console.log('Raw Strapi snippets response:', strapiSnippets);
        
        if (strapiSnippets && strapiSnippets.data && strapiSnippets.data.length > 0) {
          console.log('Processing Strapi snippets:', strapiSnippets.data.length, 'items');
          
          const formattedSnippets = strapiSnippets.data.map(snippet => {
            console.log('Processing snippet:', snippet);
            const attrs = snippet.attributes || snippet;
            
            return {
              id: snippet.id,
              title: attrs.title,
              description: attrs.description,
              category: attrs.category,
              language: attrs.language,
              htmlCode: attrs.htmlCode,
              cssCode: attrs.cssCode,
              jsCode: attrs.jsCode,
              tags: attrs.tags || [],
              downloads: attrs.downloads || 0,
              rating: attrs.rating || 5.0,
              premium: attrs.premium || false,
              liveUrl: attrs.liveUrl,
              createdAt: formatStrapiDate(attrs.createdAt)
            };
          });

          setSnippets(formattedSnippets);
          setLoading(false);
          return;
        } else {
          console.log('No snippets data or empty array');
        }
      } catch (err) {
        // Only log non-network errors
        if (err.code !== 'ERR_NETWORK' && err.code !== 'ECONNREFUSED') {
          console.error('Error fetching snippets:', err);
          setError('Errore nel caricamento degli snippets');
        }
      }

      // Fallback to demo data
      console.log('Using demo snippets data');
      setSnippets(demoSnippets);
      setLoading(false);
    };

    fetchSnippets();
  }, [demoSnippets]);

  const categories = [
    'all',
    ...new Set(snippets.map(snippet => snippet.category))
  ];

  const filteredSnippets = snippets.filter(snippet => {
    const matchesCategory = selectedCategory === 'all' || snippet.category === selectedCategory;
    const matchesSearch = snippet.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          snippet.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          snippet.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Download functionality removed - now redirects to shop page

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6
      }
    }
  };

  if (loading) {
    return (
      <div className="snippets-page">
        <DemoModeNotice />
        <Helmet>
          <title>Code Snippets - Axiom Web</title>
          <meta name="description" content="Collezione di snippet di codice utili per lo sviluppo web moderno." />
        </Helmet>
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Caricamento snippets...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="snippets-page">
      <DemoModeNotice />
      <Helmet>
        <title>Code Snippets - Axiom Web</title>
        <meta name="description" content="Collezione di snippet di codice utili per lo sviluppo web moderno." />
      </Helmet>

      {error && (
        <div className="error-banner">
          <p>{error}</p>
        </div>
      )}

      {/* Hero Section */}
      <motion.section 
        className="snippets-hero"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="container">
          <motion.div className="hero-content" variants={itemVariants}>
            <div className="hero-badge">
              <span>💻</span>
              Cerca snippets
            </div>
            <h1>Code Snippets</h1>
            <p>Collezione curata di codice riutilizzabile per accelerare il tuo sviluppo</p>
          </motion.div>
        </div>
      </motion.section>

      {/* Categories Section */}
      <section className="categories-section">
        <div className="container">
          <div className="categories-container">
            {categories.map(category => (
              <button
                key={category}
                className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category === 'all' ? 'Tutti' : category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Snippets Section */}
      <section className="snippets-section">
        <div className="container">
          <div className="search-box">
            <i className="fas fa-search"></i>
            <input
              type="text"
              placeholder="Cerca snippets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <motion.div 
            className="snippets-grid"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredSnippets.map(snippet => (
              <SnippetCard
                key={snippet.id}
                snippet={snippet}
                onPreview={() => setPreviewSnippet(snippet)}
              />
            ))}

            {filteredSnippets.length === 0 && (
              <motion.div className="no-snippets" variants={itemVariants}>
                <h3>Nessuno snippet trovato</h3>
                <p>Prova a modificare i filtri di ricerca o a selezionare una categoria diversa.</p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {previewSnippet && (
        <SnippetPreviewModal 
          snippet={previewSnippet} 
          onClose={() => setPreviewSnippet(null)} 
        />
      )}
    </div>
  );
};

export default SnippetsPage;