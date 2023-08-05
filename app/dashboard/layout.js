import Navbar from "@components/Navbar";

export const metadata = {
  title: "dashboard",
};
function DashboardLayout({ children }) {
  return (
    <body>
      <Navbar />
      <div className="ml-80 margin-responsive">{children}</div>
    </body>
  );
}

export default DashboardLayout;
