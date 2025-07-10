

const GpaResult = ({ gpa }) => {
  if (gpa === null) {
    return (
      <div className="text-center p-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 shadow-sm">
        <div className="text-gray-400 mb-4">
          <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        </div>
        <p className="text-gray-500 text-base font-medium">
          Enter your grades and click "Calculate GPA" to see your result
        </p>
      </div>
    );
  }

  // Determine GPA color based on value
  const getGpaColor = (gpaValue) => {
    if (gpaValue >= 4.0) return 'text-green-600';
    if (gpaValue >= 3.5) return 'text-blue-600';
    if (gpaValue >= 3.0) return 'text-yellow-600';
    if (gpaValue >= 2.0) return 'text-orange-600';
    return 'text-red-600';
  };

  const getGpaBackground = (gpaValue) => {
    if (gpaValue >= 4.0) return 'bg-green-100 border-green-300 shadow-green-100';
    if (gpaValue >= 3.5) return 'bg-blue-100 border-blue-300 shadow-blue-100';
    if (gpaValue >= 3.0) return 'bg-yellow-100 border-yellow-300 shadow-yellow-100';
    if (gpaValue >= 2.0) return 'bg-orange-100 border-orange-300 shadow-orange-100';
    return 'bg-red-100 border-red-300 shadow-red-100';
  };

  return (
    <div className={`text-center p-8 rounded-lg border-2 shadow-lg ${getGpaBackground(gpa)}`}>
      <h3 className="text-2xl font-bold text-gray-800 mb-6">
        Your Calculated GPA
      </h3>
      
      <div className="space-y-4">
        <div className={`text-7xl font-bold ${getGpaColor(gpa)} drop-shadow-sm`}>
          {gpa}
        </div>
        <div className="text-sm text-gray-600 font-medium">
          Out of 4.5 scale
        </div>
      </div>
    </div>
  );
};

export default GpaResult;
