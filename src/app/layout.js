import "@/app/globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";


export const metadata = {
  title: "Premium Digital Services",
  description: "Designing digital experiences that drive real growth."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
          <div className="main-container">
            {children}
          </div>
        
        <Footer />
      </body>
    </html>
  );
}
