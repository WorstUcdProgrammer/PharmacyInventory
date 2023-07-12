import React from "react";

interface BarCodeInfo {
  url: string;
  closeOverlay: () => void;
}

const BarCodeGen: React.FC<BarCodeInfo> = ({ url, closeOverlay }) => {
  return (
    <div>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="overlay-content">
          <img src={url} alt="Overlay" />
          <button onClick={closeOverlay}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default BarCodeGen;
