

const GradeRangeSelector = ({ 
  grades, 
  startGrade, 
  endGrade, 
  onStartGradeChange, 
  onEndGradeChange 
}) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">
        Select Grade Range
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Start Grade Selector */}
        <div>
          <label htmlFor="startGrade" className="block text-sm font-medium text-gray-700 mb-3">
            Start Grade (Highest)
          </label>
          <select
            id="startGrade"
            value={startGrade}
            onChange={(e) => onStartGradeChange(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-base text-gray-900 bg-white"
          >
            {grades.map(grade => (
              <option key={grade.letter} value={grade.letter}>
                {grade.letter} ({grade.points} points)
              </option>
            ))}
          </select>
        </div>

        {/* End Grade Selector */}
        <div>
          <label htmlFor="endGrade" className="block text-sm font-medium text-gray-700 mb-3">
            End Grade (Lowest)
          </label>
          <select
            id="endGrade"
            value={endGrade}
            onChange={(e) => onEndGradeChange(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-base text-gray-900 bg-white"
          >
            {grades.map(grade => (
              <option key={grade.letter} value={grade.letter}>
                {grade.letter} ({grade.points} points)
              </option>
            ))}
          </select>
        </div>
      </div>
      
      {/* Range Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 shadow-sm">
        <p className="text-sm text-blue-800">
          <span className="font-semibold">Selected Range:</span> {startGrade} to {endGrade}
        </p>
      </div>
    </div>
  );
};

export default GradeRangeSelector;
