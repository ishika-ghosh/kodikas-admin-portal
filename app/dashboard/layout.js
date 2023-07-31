export const metadata = {
  title: "dashboard",
};
function DashboardLayout({ children }) {
  return (
    <html>
      <body>
        <h1>This is layout</h1>
        {children}
      </body>
    </html>
  );
}

export default DashboardLayout;
