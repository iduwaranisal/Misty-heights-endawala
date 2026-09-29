"use client";

import { useState } from "react";
import { uploadImageToCloudinary } from "@/actions/settings";
import { Loader2, Image as ImageIcon, Copy, Check } from "lucide-react";

export default function SettingsView() {
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState<{ok: boolean, msg: string} | null>(null);
  const [copied, setCopied] = useState(false);
  
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    
    setUploading(true);
    setResult(null);
    setCopied(false);
    try {
      const res = await uploadImageToCloudinary(formData);
      if (res.success) {
        setResult({ok: true, msg: res.url});
      } else {
        setResult({ok: false, msg: res.message || 'Upload failed'});
      }
    } catch (err: any) {
      setResult({ok: false, msg: err.message});
    } finally {
      setUploading(false);
    }
  };

  const copyToClipboard = () => {
    if (result?.ok) {
      navigator.clipboard.writeText(result.msg);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 max-w-2xl">
      <h3 className="font-bold text-gray-900 text-lg mb-1">Website Content & Settings</h3>
      <p className="text-sm text-gray-500 mb-6">Upload images directly to Cloudinary and copy the URL to use anywhere on your site.</p>
      
      <div className="space-y-6">
        <div className="p-6 border-2 border-dashed border-emerald-200 bg-emerald-50/50 rounded-xl transition-all hover:bg-emerald-50">
          <h4 className="font-semibold text-emerald-900 mb-3 flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-emerald-600"/> Upload New Image
          </h4>
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleUpload}
            disabled={uploading}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-5 file:rounded-xl file:border-0 file:text-sm file:font-bold file:bg-emerald-600 file:text-white hover:file:bg-emerald-700 transition-all cursor-pointer"
          />
          {uploading && (
            <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-emerald-600">
              <Loader2 className="w-4 h-4 animate-spin"/> Uploading to Cloudinary...
            </div>
          )}
        </div>
        
        {result && (
          <div className={`p-4 rounded-xl text-sm ${result.ok ? 'bg-emerald-50 text-emerald-900 border border-emerald-200' : 'bg-red-50 text-red-800 border border-red-200'}`}>
            {result.ok ? (
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2 text-emerald-700 font-bold">
                  <Check className="w-4 h-4" /> Image Uploaded Successfully!
                </div>
                <div className="flex items-center gap-2">
                  <input 
                    type="text" 
                    readOnly 
                    value={result.msg} 
                    className="flex-1 bg-white border border-emerald-200 rounded-lg px-3 py-2 text-xs font-mono text-gray-600 focus:outline-none"
                  />
                  <button 
                    onClick={copyToClipboard}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold flex items-center gap-1.5 transition-colors"
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    {copied ? "Copied" : "Copy"}
                  </button>
                </div>
              </div>
            ) : (
              <div>{result.msg}</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
