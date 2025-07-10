import { useState } from 'react';
import FileUpload from './components/FileUpload';
import GpaResult from './components/GpaResult';
import GradeInputTable from './components/GradeInputTable';
import GradeRangeSelector from './components/GradeRangeSelector';

// Grade definitions with their point values
const GRADES = [
  { letter: 'A+', points: 4.5 },
  { letter: 'A', points: 4.0 },
  { letter: 'B+', points: 3.5 },
  { letter: 'B', points: 3.0 },
  { letter: 'C+', points: 2.5 },
  { letter: 'C', points: 2.0 },
  { letter: 'D', points: 1.5 },
  { letter: 'E', points: 1.0 }
];

function App() {
  const [startGrade, setStartGrade] = useState('A+');
  const [endGrade, setEndGrade] = useState('E');
  const [gradeQuantities, setGradeQuantities] = useState({});
  const [gpa, setGpa] = useState(null);

  // Calculate GPA based on current grade quantities
  const calculateGPA = () => {
    let totalPoints = 0;
    let totalGrades = 0;

    GRADES.forEach(grade => {
      const quantity = parseInt(gradeQuantities[grade.letter] || 0);
      if (quantity > 0) {
        totalPoints += grade.points * quantity;
        totalGrades += quantity;
      }
    });

    if (totalGrades === 0) {
      setGpa(null);
      return;
    }

    const calculatedGpa = totalPoints / totalGrades;
    setGpa(parseFloat(calculatedGpa.toFixed(2)));
  };

  // Handle grade quantity changes
  const handleGradeQuantityChange = (gradeLetter, quantity) => {
    setGradeQuantities(prev => ({
      ...prev,
      [gradeLetter]: quantity
    }));
  };

  // Handle file upload (mock OCR functionality)
  const handleFileUpload = (file) => {
    // Mock OCR extraction - in a real app, this would process the image
    const mockGradeData = {
      'A+': Math.floor(Math.random() * 3),
      'A': Math.floor(Math.random() * 4),
      'B+': Math.floor(Math.random() * 3),
      'B': Math.floor(Math.random() * 2),
      'C+': Math.floor(Math.random() * 2),
      'C': Math.floor(Math.random() * 1),
    };
    
    setGradeQuantities(mockGradeData);
    alert('Mock OCR completed! Grade quantities have been auto-filled with sample data.');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 font-sans">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            USP GPA Calculator
          </h1>
          <p className="text-base text-gray-600">
            Calculate your GPA quickly and easily with professional accuracy
          </p>
        </div>

        {/* Main Container */}
        <div className="bg-white rounded-lg shadow-lg p-8 space-y-8">
          {/* Grade Range Selector */}
          <GradeRangeSelector
            grades={GRADES}
            startGrade={startGrade}
            endGrade={endGrade}
            onStartGradeChange={setStartGrade}
            onEndGradeChange={setEndGrade}
          />

          {/* Grade Input Table */}
          <GradeInputTable
            grades={GRADES}
            startGrade={startGrade}
            endGrade={endGrade}
            gradeQuantities={gradeQuantities}
            onGradeQuantityChange={handleGradeQuantityChange}
          />

          {/* Calculate Button */}
          <div className="text-center pt-4">
            <button
              onClick={calculateGPA}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg text-lg transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              Calculate GPA
            </button>
          </div>

          {/* GPA Result */}
          <GpaResult gpa={gpa} />

          {/* File Upload Section */}
          <div className="border-t border-gray-200 pt-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Upload Grade Screenshot
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Future feature: Upload screenshots for automatic grade extraction
            </p>
            <FileUpload onFileUpload={handleFileUpload} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
