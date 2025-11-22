import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const CleanLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main
        style={{
          marginTop: 0, // 🔥 removido o espaço extra
          position: "relative",
          zIndex: 1,
        }}
      >
        {children}
      </main>
      <Footer />
    </>
  );
};

export default CleanLayout;
