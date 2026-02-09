import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faClock,
  faUserTie,
  faChartLine,
  faBolt,
  faBrain,
  faPenNib,
  faUsers,
  faCalendarDays
} from "@fortawesome/free-solid-svg-icons";
import QuickAction from "../../components/QuickAction";

function StudentDashboard() {
  const { currentUser } = useAuth();

  return (
    <div className="student-dashboard">
      {/* ================= HEADER ================= */}
      <div className="dashboard-header">
        <h1>
          Welcome back, {currentUser?.username || "Student"} 👋
        </h1>
        <p>Here’s an overview of your preparation progress</p>
      </div>

      {/* ================= STATS ================= */}
      <div className="stats-grid">
        <StatCard icon={faBook} value="12" label="Tests Completed" />
        <StatCard icon={faClock} value="48 hrs" label="Study Hours" />
        <StatCard icon={faUserTie} value="3" label="Mentor Sessions" />
        <StatCard icon={faChartLine} value="65%" label="Overall Progress" />
      </div>

      {/* ================= QUICK ACTIONS ================= */}
      <div className="section">
        <h2 className="section-title">
          <FontAwesomeIcon icon={faBolt} /> Quick Actions
        </h2>

        <div className="quick-actions-grid">
          <QuickAction
            icon={faBrain}
            label="Generate Study Plan"
            onClick={() => console.log("Generate Study Plan clicked")}
          />
          <QuickAction icon={faPenNib} label="Take Mock Test" />
          <QuickAction icon={faBook} label="Browse PYQs" />
          <QuickAction
            icon={faUsers}
            label="Find Mentor"
            link="/mentors"
          />
        </div>
      </div>

      {/* ================= MAIN CONTENT ================= */}
      <div className="content-grid">
        {/* LEFT COLUMN */}
        <div>
          <PerformancePanel />
          <RecentTests />
        </div>

        {/* RIGHT COLUMN */}
        <UpcomingSessions />
      </div>
    </div>
  );
}

/* ================= COMPONENTS ================= */

function StatCard({ icon, value, label }) {
  return (
    <div className="stat-card">
      <div className="stat-icon">
        <FontAwesomeIcon icon={icon} />
      </div>
      <div>
        <h3>{value}</h3>
        <p>{label}</p>
      </div>
    </div>
  );
}

/* ---------- PERFORMANCE ---------- */
function PerformancePanel() {
  return (
    <div className="panel">
      <h2 className="panel-title">
        <FontAwesomeIcon icon={faChartLine} /> Performance
      </h2>

      <div className="bar-chart">
        <div style={{ height: "60%" }} />
        <div style={{ height: "75%" }} />
        <div style={{ height: "50%" }} />
        <div style={{ height: "85%" }} />
        <div style={{ height: "70%" }} />
      </div>
    </div>
  );
}

/* ---------- RECENT TESTS ---------- */
function RecentTests() {
  return (
    <div className="panel">
      <h2 className="panel-title">
        <FontAwesomeIcon icon={faBook} /> Recent Tests
      </h2>

      <table className="tests-table">
        <thead>
          <tr>
            <th>Test Name</th>
            <th>Date</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>GS Paper I</td>
            <td>05 Feb 2026</td>
            <td>78%</td>
          </tr>
          <tr>
            <td>Polity Mock</td>
            <td>02 Feb 2026</td>
            <td>82%</td>
          </tr>
          <tr>
            <td>History Test</td>
            <td>30 Jan 2026</td>
            <td>74%</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

/* ---------- UPCOMING SESSIONS ---------- */
function UpcomingSessions() {
  return (
    <div className="panel sticky">
      <h2 className="panel-title">
        <FontAwesomeIcon icon={faCalendarDays} /> Upcoming Sessions
      </h2>

      <div className="session-card">
        <h4>Strategy Session with Mentor</h4>
        <p>Tomorrow • 10:00 AM</p>
      </div>

      <div className="session-card muted">
        No more upcoming sessions
      </div>
    </div>
  );
}

export default StudentDashboard;
