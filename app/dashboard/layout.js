import Navbar from "@components/Navbar";

export const metadata = {
  title: "dashboard",
};
function DashboardLayout({ children }) {
  return (
    <html>
      <body>
        <Navbar />
        <div className="w-4/5 fixed top-0 left-1/4 ">{children}</div>
      </body>
    </html>
  );
}

export default DashboardLayout;
