import React, { useEffect, useState } from "react";
import { Upload, Loader2, Image as ImageIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { asyncCurrentUser } from "../store/actions/userAction";
import { useNavigate } from "react-router-dom";
import { asyncUploadImageAndGetCaption } from "../store/actions/postAction";

export default function ImageCaptionUI() {
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { register, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ✅ Check user authentication
  const userValidCheck = async () => {
    const userValid = await dispatch(asyncCurrentUser());
    if (!userValid) {
      navigate("/login");
    }
  };

  useEffect(() => {
    userValidCheck();
  }, []);

  // ✅ Image preview on upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Please upload a valid image file.");
      return;
    }
    setError("");
    setImage(URL.createObjectURL(file));
    setCaption("");
  };

  // ✅ Parse multi-section AI captions
  function parseCaptions(rawText) {
    const sections = {};
    let currentMain = null;
    let currentSub = null;

    rawText.split("\n").forEach((line) => {
      line = line.trim();
      if (!line) return;

      const mainMatch = line.match(/^###\s*\*\*(.+?)\*\*/);
      if (mainMatch) {
        currentMain = mainMatch[1];
        sections[currentMain] = {};
        currentSub = null;
        return;
      }

      const subMatch = line.match(/^\*\*(.+?)\*\*/);
      if (subMatch && currentMain) {
        currentSub = subMatch[1].replace(/:$/, "");
        sections[currentMain][currentSub] = [];
        return;
      }

      const bulletMatch = line.match(/^\*\s*(.+)/);
      if (bulletMatch && currentMain) {
        const text = bulletMatch[1];
        if (currentSub) {
          sections[currentMain][currentSub].push(text);
        } else {
          if (!sections[currentMain]["Default"]) {
            sections[currentMain]["Default"] = [];
          }
          sections[currentMain]["Default"].push(text);
        }
      }
    });

    return sections;
  }

  // ✅ Handle form submit
  const imageUpload = async (data) => {
    if (!data.image?.[0]) {
      alert("Please upload an image");
      return;
    }
    setLoading(true);

    const formData = new FormData();
    formData.append("image", data.image[0]);

    const imagefile = await dispatch(asyncUploadImageAndGetCaption(formData));
    if (imagefile) {
      setCaption(imagefile.caption);
      setImage(null); // clear preview
      reset();
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-2xl w-full max-w-lg p-6 space-y-6">
        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-800 text-center">
          Image Caption Generator
        </h1>

        {/* Upload Form */}
        <form onSubmit={handleSubmit(imageUpload)}>
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-500 transition">
            <input
              type="file"
              accept="image/*"
              id="image-upload"
              className="hidden"
              {...register("image", {
                onChange: (e) => handleImageUpload(e),
              })}
              required
            />
            <label
              htmlFor="image-upload"
              className="cursor-pointer flex flex-col items-center space-y-2"
            >
              {image ? (
                <img
                  src={image}
                  alt="Uploaded Preview"
                  className="w-full h-60 object-cover rounded-lg shadow"
                />
              ) : (
                <>
                  <Upload className="w-10 h-10 text-gray-400" />
                  <p className="text-gray-600">
                    Click to <span className="text-blue-500">upload</span> or drag & drop
                  </p>
                  <p className="text-xs text-gray-400">PNG, JPG up to 5MB</p>
                </>
              )}
            </label>
          </div>

          {/* Generate Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-5 cursor-pointer bg-blue-600 text-white py-3 rounded-lg flex justify-center items-center gap-2 hover:bg-blue-700 disabled:bg-gray-400 transition"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={18} /> Generating...
              </>
            ) : (
              <>
                <ImageIcon size={18} /> Generate Caption
              </>
            )}
          </button>
        </form>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 text-red-600 px-4 py-2 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* Dynamic Caption Output */}
        {caption && (() => {
          const parsed = parseCaptions(caption);
          return (
            <div className="space-y-6">
              {Object.entries(parsed).map(([main, subs], idx) => (
                <div key={idx} className="bg-white p-4 rounded-lg shadow">
                  <h2 className="text-xl font-bold text-blue-600 mb-3">{main}</h2>
                  {Object.entries(subs).map(([sub, items], subIdx) => (
                    <div key={subIdx} className="mb-4">
                      {sub !== "Default" && (
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">{sub}</h3>
                      )}
                      <ul className="list-disc pl-5 space-y-1 text-gray-700">
                        {items.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          );
        })()}
      </div>
    </div>
  );
}
