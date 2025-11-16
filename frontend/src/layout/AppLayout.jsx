import "../layout/applayout.css";
import Navbar from "../components/Navbar";

export default function AppLayout({ children }) {
  return (
    <div className="layout-container">
      <Navbar />

      <main className="layout-content">
        {children}
      </main>
    </div>
  );
}
