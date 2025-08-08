import React, { useState } from "react";

 const ProcessPage =()=> {
   const [image, setImage] = useState(null);
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        setText("Image uploaded successfully."); // Replace with desired logic
      };
      reader.readAsDataURL(file);
    } else {
      setImage(null);
      setText("Please upload a valid image file.");
    }
  };

  const handleCopy = () => {
       navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="bg-gray-700 rounded-2xl shadow-md w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
        {/* Image Upload Section */}
        <div className="flex flex-col items-center justify-center">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="mb-4 text-white cursor-pointer"
          />
          {image && (
            <img
              src={image}
              alt="Uploaded Preview"
              className="max-w-full max-h-60 rounded-lg border"
            />
          )}
        </div>

        {/* Text Display Section */}
        <div className="flex flex-col">
          <div className="flex-1 bg-gray-50 border rounded-lg p-4 min-h-[200px] whitespace-pre-wrap">
            {text || "Text output will appear here."}
          </div>
          <button
            onClick={handleCopy}
            className="mt-2 cursor-pointer self-end bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Copy Text
          </button>
        </div>
      </div>
    </div>
  );
}
export default ProcessPage;