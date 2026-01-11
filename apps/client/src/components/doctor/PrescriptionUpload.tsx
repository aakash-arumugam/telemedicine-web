import { useState, useRef } from 'react';
import { Upload, FileText, X, Check, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PrescriptionUpload() {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [file, setFile] = useState<File | null>(null);
    const [notes, setNotes] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
            setIsSuccess(false);
        }
    };

    const handleUpload = () => {
        if (!file) return;

        setIsUploading(true);
        // Mock upload delay
        setTimeout(() => {
            setIsUploading(false);
            setIsSuccess(true);
            setFile(null);
            setNotes('');
        }, 1500);
    };

    return (
        <div className="bg-white p-6 rounded-2xl border border-neutral-100 shadow-sm">
            <h3 className="font-bold text-neutral-900 mb-4 flex items-center gap-2">
                <FileText size={20} className="text-blue-600" />
                Upload Prescription
            </h3>

            <AnimatePresence mode="wait">
                {isSuccess ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="bg-green-50 border border-green-100 rounded-xl p-6 text-center space-y-3"
                    >
                        <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-2">
                            <Check size={24} />
                        </div>
                        <div>
                            <h4 className="font-bold text-green-800">Prescription Uploaded!</h4>
                            <p className="text-xs text-green-600 mt-1">The patient has been notified.</p>
                        </div>
                        <button
                            onClick={() => setIsSuccess(false)}
                            className="text-xs font-semibold text-green-700 underline"
                        >
                            Upload another
                        </button>
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="space-y-4"
                    >
                        {/* File Drop Area */}
                        <div
                            onClick={() => fileInputRef.current?.click()}
                            className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${file ? 'border-blue-200 bg-blue-50' : 'border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50'
                                }`}
                        >
                            <input
                                type="file"
                                ref={fileInputRef}
                                className="hidden"
                                accept=".pdf,.jpg,.jpeg,.png"
                                onChange={handleFileChange}
                            />

                            {file ? (
                                <div className="flex items-center justify-center gap-3">
                                    <div className="p-2 bg-white rounded-lg shadow-sm">
                                        <FileText size={24} className="text-blue-600" />
                                    </div>
                                    <div className="text-left">
                                        <p className="text-sm font-semibold text-neutral-900">{file.name}</p>
                                        <p className="text-xs text-neutral-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                                    </div>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); setFile(null); }}
                                        className="p-1 hover:bg-white rounded-full transition-colors ml-2"
                                    >
                                        <X size={16} className="text-neutral-400 hover:text-red-500" />
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <div className="w-10 h-10 bg-neutral-100 text-neutral-400 rounded-full flex items-center justify-center mx-auto mb-3">
                                        <Upload size={20} />
                                    </div>
                                    <p className="text-sm font-medium text-neutral-900">Click to upload prescription</p>
                                    <p className="text-xs text-neutral-400 mt-1">PDF, JPG or PNG (max. 10MB)</p>
                                </>
                            )}
                        </div>

                        {/* Notes */}
                        <div>
                            <label className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-1.5 block">Additional Notes (Optional)</label>
                            <textarea
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                placeholder="Instructions for patient..."
                                className="w-full px-4 py-3 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 min-h-[100px] resize-none"
                            />
                        </div>

                        {/* Submit */}
                        <button
                            onClick={handleUpload}
                            disabled={!file || isUploading}
                            className={`w-full py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${!file || isUploading
                                    ? 'bg-neutral-100 text-neutral-400 cursor-not-allowed'
                                    : 'bg-neutral-900 text-white shadow-lg hover:bg-neutral-800'
                                }`}
                        >
                            {isUploading ? (
                                <>
                                    <Loader2 size={18} className="animate-spin" /> Uploading...
                                </>
                            ) : (
                                "Upload Prescription"
                            )}
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
