

const GradeInputTable = ({ 
  grades, 
  startGrade, 
  endGrade, 
  gradeQuantities, 
  onGradeQuantityChange 
}) => {
  // Determine which grades are in the selected range
  // startGrade is the highest grade (lower index), endGrade is the lowest grade (higher index)
  const startIndex = grades.findIndex(grade => grade.letter === startGrade);
  const endIndex = grades.findIndex(grade => grade.letter === endGrade);
  
  const isGradeInRange = (gradeIndex) => {
    // Since grades are ordered from highest to lowest (A+ to E),
    // we include grades from startIndex (highest) to endIndex (lowest)
    return gradeIndex >= startIndex && gradeIndex <= endIndex;
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">
        Enter Grade Quantities
      </h2>
      
      <div className="bg-gray-50 rounded-lg p-6 shadow-sm">
        <div className="space-y-4">
          {grades.map((grade, index) => {
            const inRange = isGradeInRange(index);
            
            return (
              <div 
                key={grade.letter}
                className={`grid grid-cols-2 gap-6 items-center py-4 px-4 rounded-lg transition-all duration-200 ${
                  inRange 
                    ? 'bg-white shadow-sm border border-gray-200 hover:shadow-md' 
                    : 'bg-gray-100 opacity-50'
                }`}
              >
                {/* Grade Letter and Points */}
                <div className="flex items-center justify-between">
                  <span className={`font-semibold text-xl ${
                    inRange ? 'text-gray-800' : 'text-gray-500'
                  }`}>
                    {grade.letter}
                  </span>
                  <span className={`text-sm font-medium ${
                    inRange ? 'text-gray-600' : 'text-gray-400'
                  }`}>
                    {grade.points} pts
                  </span>
                </div>

                {/* Quantity Input */}
                <div>
                  <input
                    type="number"
                    min="0"
                    max="50"
                    value={gradeQuantities[grade.letter] || ''}
                    onChange={(e) => onGradeQuantityChange(grade.letter, e.target.value)}
                    disabled={!inRange}
                    placeholder={inRange ? "0" : "—"}
                    className={`w-full border rounded-lg px-4 py-3 text-center text-base font-medium transition-all duration-200 ${
                      inRange 
                        ? 'border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 hover:border-gray-400' 
                        : 'border-gray-200 bg-gray-100 cursor-not-allowed opacity-50'
                    }`}
                  />
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Summary */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <div className="text-base text-blue-800">
              <span className="font-semibold">Total Grades Entered:</span>{' '}
              <span className="font-bold text-blue-900">
                {Object.values(gradeQuantities)
                  .filter(qty => qty && parseInt(qty) > 0)
                  .reduce((sum, qty) => sum + parseInt(qty), 0)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GradeInputTable;
