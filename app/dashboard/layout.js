import Navbar from "@components/Navbar";

export const metadata = {
  title: "dashboard",
};
function DashboardLayout({ children }) {
  return (
    <html>
      <body>
        <Navbar/>
        {children}
      </body>
    </html>
  );
}

export default DashboardLayout;
