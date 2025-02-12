// App.jsx
import { useState } from 'react';
import { FiUploadCloud, FiActivity, FiCheckCircle, FiXCircle } from 'react-icons/fi';
import axios from 'axios';

export default function TennisCoach() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [previews, setPreviews] = useState({
    original: null,
    skeleton: null
  });

  const handleFileUpload = async (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    setLoading(true);
    setFile(selectedFile);
    setPreviews({
      original: URL.createObjectURL(selectedFile),
      skeleton: null
    });

    try {
      const formData = new FormData();
      formData.append('image', selectedFile);

      const response = await axios.post('http://127.0.0.1:5000/api/analyze', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      setPreviews(prev => ({
        ...prev,
        skeleton: response.data.skeleton_image
      }));

      setResult({
        label: response.data.label,
        confidence: response.data.confidence,
        keypoints: response.data.keypoints
      });
    } catch (error) {
      console.error('Analysis failed:', error);
      setResult({ error: 'Analysis failed. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 text-center">
          <FiActivity className="inline mr-3 mb-1" />
          AI Tennis Stroke Analyzer
        </h1>

        <div className="max-w-4xl mx-auto bg-gray-800 rounded-xl shadow-2xl p-8">
          <div className="mb-8">
            <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-600 rounded-lg p-8 cursor-pointer hover:border-blue-500 transition-colors">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
                disabled={loading}
              />
              <FiUploadCloud className="text-4xl mb-4 text-gray-400" />
              <span className="text-lg">
                {file ? file.name : 'Upload tennis stroke image'}
              </span>
            </label>
          </div>

          {loading && (
            <div className="text-center mb-8 animate-fade-in">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
              <p className="mt-2">Analyzing stroke technique...</p>
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-gray-700 rounded-lg p-4">
              <h3 className="text-xl font-semibold mb-4">Original Image</h3>
              {previews.original && (
                <img
                  src={previews.original}
                  alt="Original stroke"
                  className="rounded-lg shadow-lg h-64 w-full object-cover"
                />
              )}
            </div>

            <div className="bg-gray-700 rounded-lg p-4">
              <h3 className="text-xl font-semibold mb-4">Skeleton Analysis</h3>
              {previews.skeleton ? (
                <img
                  src={previews.skeleton}
                  alt="Skeleton analysis"
                  className="rounded-lg shadow-lg h-64 w-full object-cover"
                />
              ) : (
                <div className="h-64 bg-gray-600 rounded-lg flex items-center justify-center text-gray-400">
                  Analysis preview
                </div>
              )}
            </div>
          </div>

          {result && (
            <div className={`p-6 rounded-lg ${result.error ? 'bg-red-900' : 'bg-gray-700'}`}>
              {result.error ? (
                <div className="flex items-center text-red-300">
                  <FiXCircle className="mr-2 text-xl" />
                  {result.error}
                </div>
              ) : (
                <>
                  <div className="flex items-center mb-4">
                    <FiCheckCircle className={`mr-2 text-xl ${result.label === 'Proper' ? 'text-green-500' : 'text-red-500'}`} />
                    <span className="text-2xl font-bold">
                      {result.label} Technique
                      <span className="ml-2 text-lg font-normal text-gray-300">
                        ({result.confidence}% confidence)
                      </span>
                    </span>
                  </div>
                  <div className="space-y-2">
                    <p className="text-gray-300">
                      Detected {result.keypoints} valid body keypoints
                    </p>
                    <div className="w-full bg-gray-600 rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${result.confidence}%` }}
                      ></div>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
