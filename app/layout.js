import "./globals.css";
export const metadata = {
  title: "Kodikas Admin Portal",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
//admin portal -> 1) payment accept scanner
//                2) Admin => teams reguler transactions
