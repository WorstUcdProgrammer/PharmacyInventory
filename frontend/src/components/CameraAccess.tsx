import React, { useState } from "react";

const CameraAccess: React.FC = () => {
  const [isWindowOpen, setIsWindowOpen] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);

  const openWindow = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      setStream(mediaStream);
      setIsWindowOpen(true);
    } catch (error) {
      console.error("Failed to open camera:", error);
    }
  };

  const closeWindow = () => {
    if (stream) {
      stream.getTracks().forEach((track) => {
        track.stop();
      });
    }
    setIsWindowOpen(false);
  };

  return (
    <div>
      <button
        className="bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white mr-2 px-4 py-2 rounded"
        onClick={openWindow}
      >
        Open Camera Window
      </button>
      {isWindowOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg">
            <video
              ref={(video) => {
                if (video) video.srcObject = stream;
              }}
              autoPlay
              muted
              className="w-full max-w-md"
            />
            <button
              className="bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white mr-2 mt-2 px-4 py-2 rounded"
              onClick={closeWindow}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CameraAccess;
