import Navbar from "@components/Navbar";

export const metadata = {
  title: "dashboard",
};
function DashboardLayout({ children }) {
  return (
    <html>
      <body>
        <Navbar />
        <div className="ml-80 margin-responsive">{children}</div>
      </body>
    </html>
  );
}

export default DashboardLayout;
