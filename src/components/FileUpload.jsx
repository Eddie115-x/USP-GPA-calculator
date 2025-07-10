import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

const FileUpload = ({ onFileUpload }) => {
  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      onFileUpload(file);
    }
  }, [onFileUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.bmp', '.webp']
    },
    multiple: false
  });

  return (
    <div className="space-y-2">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-all duration-200 shadow-sm ${
          isDragActive
            ? 'border-blue-400 bg-blue-50 shadow-md'
            : 'border-gray-400 hover:border-gray-500 hover:bg-gray-50 hover:shadow-md'
        }`}
      >
        <input {...getInputProps()} />
        
        <div className="space-y-2">
          {/* Upload Icon */}
          <div className={`mx-auto w-8 h-8 transition-colors duration-200 ${
            isDragActive ? 'text-blue-500' : 'text-gray-500'
          }`}>
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
          </div>
          
          {/* Upload Text */}
          <div>
            {isDragActive ? (
              <p className="text-blue-600 font-semibold text-xs">
                Drop here...
              </p>
            ) : (
              <div className="space-y-1">
                <p className="text-gray-700 font-semibold text-xs">
                  Click or drag to upload
                </p>
                <p className="text-xs text-gray-600">
                  Screenshot for grade extraction
                </p>
              </div>
            )}
          </div>
          
          {/* Supported Formats */}
          <div className="text-xs text-gray-500 font-medium">
            PNG, JPG, JPEG, GIF, BMP, WebP
          </div>
        </div>
      </div>
      
      {/* Feature Notice */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-2 shadow-sm">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <svg className="h-4 w-4 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="ml-2">
            <p className="text-xs text-yellow-800 font-medium">
              <span className="font-semibold">Demo:</span> OCR simulated with sample data
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
