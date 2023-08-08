import SideBar from "@components/SideBar";
import Navbar from "@components/Navbar";

export const metadata = {
  title: "dashboard",
};
function DashboardLayout({ children }) {
  return (
    <>
      <Navbar />
      <SideBar />
      <div className="ml-80 margin-responsive">{children}</div>
    </>
  );
}

export default DashboardLayout;
