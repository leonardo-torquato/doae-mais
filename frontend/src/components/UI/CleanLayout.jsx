import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const CleanLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main style={{ marginTop: "80px", position: "relative", zIndex: 1 }}>
        {children}
      </main>
      <Footer />
    </>
  );
};

export default CleanLayout;
