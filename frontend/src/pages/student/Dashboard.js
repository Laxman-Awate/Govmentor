import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faClock,
  faUserTie,
  faChartLine,
  faCheck,
  faCalendarDays,
  faBrain,
  faPenNib,
  faUsers,
  faBolt
} from "@fortawesome/free-solid-svg-icons";

function StudentDashboard() {
  const { currentUser } = useAuth();

  return (
    <div className="student-dashboard">
      {/* HEADER */}
      <div className="dashboard-header">
        <h1>
          Welcome back, {currentUser?.username || "Laxman Awate"}! 👋
        </h1>
        <p>Here's an overview of your preparation progress.</p>
      </div>

      {/* STATS */}
      <div className="dashboard-stats">
        <StatCard icon={faBook} title="Tests Completed" value="12" />
        <StatCard icon={faClock} title="Study Hours" value="48" />
        <StatCard icon={faUserTie} title="Mentor Sessions" value="3" />
        <StatCard icon={faChartLine} title="Overall Progress" value="65%" />
      </div>

      {/* TODAY GOALS */}
      <div className="dashboard-card">
        <h2>🎯 Today’s Goals</h2>
        <GoalItem text="Complete 2 mock tests" completed />
        <GoalItem text="Review GS Paper I notes" />
        <GoalItem text="Practice 30 MCQs" />
      </div>

      {/* UPCOMING SESSION */}
      <div className="dashboard-card">
        <h2>
          <FontAwesomeIcon icon={faCalendarDays} /> Upcoming Sessions
        </h2>

        <div className="session-box">
          <h3>Strategy Session with Mentor</h3>
          <p>Tomorrow, 10:00 AM</p>
        </div>

        <p className="no-session">No more upcoming sessions</p>

        <button className="book-btn">Book a Session</button>
      </div>

      {/* QUICK ACTIONS */}
      <div className="dashboard-card">
        <h2>
          <FontAwesomeIcon icon={faBolt} /> Quick Actions
        </h2>

        <div className="quick-actions-grid">
          <QuickAction icon={faBrain} label="Generate Study Plan" primary />
          <QuickAction icon={faPenNib} label="Take Mock Test" />
          <QuickAction icon={faBook} label="Browse PYQs" />
          <QuickAction icon={faUsers} label="Find Mentor" />
        </div>
      </div>
    </div>
  );
}

/* ---------- COMPONENTS ---------- */

function StatCard({ icon, title, value }) {
  return (
    <div className="stat-card">
      <FontAwesomeIcon icon={icon} className="stat-icon" />
      <h3>{value}</h3>
      <p>{title}</p>
    </div>
  );
}

function GoalItem({ text, completed }) {
  return (
    <div className="goal-item">
      <div className={`goal-checkbox ${completed ? "completed" : ""}`}>
        {completed && <FontAwesomeIcon icon={faCheck} />}
      </div>
      <span className={`goal-text ${completed ? "completed" : ""}`}>
        {text}
      </span>
    </div>
  );
}

function QuickAction({ icon, label, primary }) {
  return (
    <button className={`quick-action-btn ${primary ? "primary" : ""}`}>
      <FontAwesomeIcon icon={icon} className="qa-icon" />
      <span>{label}</span>
    </button>
  );
}

export default StudentDashboard;
