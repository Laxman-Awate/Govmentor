import { auth, db } from './firebase-config.js';
import { showToast } from './utils.js';

// DOM Elements
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const forgotPasswordForm = document.getElementById('forgotPasswordForm');
const logoutBtn = document.getElementById('logoutBtn');

// Auth State Listener
auth.onAuthStateChanged((user) => {
    if (user) {
        // User is signed in
        const userMenu = document.getElementById('userMenu');
        const authButtons = document.getElementById('authButtons');
        
        if (userMenu && authButtons) {
            userMenu.style.display = 'block';
            authButtons.style.display = 'none';
            document.getElementById('userName').textContent = user.displayName || 'User';
        }
        
        // Redirect to dashboard if on auth pages
        if (window.location.pathname.includes('auth/')) {
            redirectToDashboard(user);
        }
    } else {
        // User is signed out
        const userMenu = document.getElementById('userMenu');
        const authButtons = document.getElementById('authButtons');
        
        if (userMenu && authButtons) {
            userMenu.style.display = 'none';
            authButtons.style.display = 'flex';
        }
    }
});

// Login Handler
if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = loginForm['login-email'].value;
        const password = loginForm['login-password'].value;
        const loginBtn = loginForm.querySelector('button[type="submit"]');
        const originalBtnText = loginBtn.innerHTML;
        
        try {
            // Show loading state
            loginBtn.disabled = true;
            loginBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Signing in...';
            
            // Sign in with email and password
            const { user } = await auth.signInWithEmailAndPassword(email, password);
            
            // Redirect to dashboard based on user role
            redirectToDashboard(user);
            
        } catch (error) {
            console.error('Login error:', error);
            showToast(error.message, 'error');
        } finally {
            // Reset button state
            loginBtn.disabled = false;
            loginBtn.innerHTML = originalBtnText;
        }
    });
}

// Signup Handler
if (signupForm) {
    signupForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const name = signupForm['signup-name'].value;
        const email = signupForm['signup-email'].value;
        const password = signupForm['signup-password'].value;
        const role = signupForm['user-role'].value;
        const signupBtn = signupForm.querySelector('button[type="submit"]');
        const originalBtnText = signupBtn.innerHTML;
        
        try {
            // Show loading state
            signupBtn.disabled = true;
            signupBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Creating account...';
            
            // Create user with email and password
            const { user } = await auth.createUserWithEmailAndPassword(email, password);
            
            // Update user profile
            await user.updateProfile({
                displayName: name
            });
            
            // Create user document in Firestore
            await db.collection('users').doc(user.uid).set({
                uid: user.uid,
                name: name,
                email: email,
                role: role,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                updatedAt: firebase.firestore.FieldValue.serverTimestamp()
            });
            
            // Send email verification
            await user.sendEmailVerification();
            
            // Redirect to dashboard
            redirectToDashboard(user);
            
        } catch (error) {
            console.error('Signup error:', error);
            showToast(error.message, 'error');
        } finally {
            // Reset button state
            signupBtn.disabled = false;
            signupBtn.innerHTML = originalBtnText;
        }
    });
}

// Forgot Password Handler
if (forgotPasswordForm) {
    forgotPasswordForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = forgotPasswordForm['reset-email'].value;
        const resetBtn = forgotPasswordForm.querySelector('button[type="submit"]');
        const originalBtnText = resetBtn.innerHTML;
        
        try {
            // Show loading state
            resetBtn.disabled = true;
            resetBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Sending email...';
            
            // Send password reset email
            await auth.sendPasswordResetEmail(email);
            
            showToast('Password reset email sent. Please check your inbox.', 'success');
            forgotPasswordForm.reset();
            
        } catch (error) {
            console.error('Password reset error:', error);
            showToast(error.message, 'error');
        } finally {
            // Reset button state
            resetBtn.disabled = false;
            resetBtn.innerHTML = originalBtnText;
        }
    });
}

// Logout Handler
if (logoutBtn) {
    logoutBtn.addEventListener('click', async () => {
        try {
            await auth.signOut();
            window.location.href = '/index.html';
        } catch (error) {
            console.error('Logout error:', error);
            showToast(error.message, 'error');
        }
    });
}

// Redirect to appropriate dashboard based on user role
async function redirectToDashboard(user) {
    try {
        const userDoc = await db.collection('users').doc(user.uid).get();
        const userData = userDoc.data();
        
        if (userData) {
            switch(userData.role) {
                case 'admin':
                    window.location.href = '/dashboards/dashboard-admin.html';
                    break;
                case 'mentor':
                    window.location.href = '/dashboards/dashboard-mentor.html';
                    break;
                case 'student':
                default:
                    window.location.href = '/dashboards/dashboard-student.html';
            }
        } else {
            // If user role not found, redirect to student dashboard as default
            window.location.href = '/dashboards/dashboard-student.html';
        }
    } catch (error) {
        console.error('Error getting user data:', error);
        // Default to student dashboard in case of error
        window.location.href = '/dashboards/dashboard-student.html';
    }
}
