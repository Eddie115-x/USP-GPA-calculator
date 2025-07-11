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
    <div className="min-h-screen bg-gray-50 font-sans flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-md mx-auto px-2 py-3">
          <div className="text-center">
            <div className="flex items-center justify-center mb-2">
              <img 
                src="/logo.png" 
                alt="USP Logo" 
                className="w-8 h-8 mr-2"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
              <h1 className="text-xl font-bold text-gray-800">
                USP GPA Calculator
              </h1>
            </div>
            <p className="text-xs text-gray-600">
              Calculate your GPA quickly and easily
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 py-2 px-2">
        <div className="max-w-md mx-auto">
          {/* Main Container */}
          <div className="bg-white rounded-lg shadow-lg p-4 space-y-4">
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
            <div className="text-center pt-2">
              <button
                onClick={calculateGPA}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg text-sm transition-all duration-200 shadow-md hover:shadow-lg"
              >
                Calculate GPA
              </button>
            </div>

            {/* GPA Result */}
            <GpaResult gpa={gpa} />

            {/* File Upload Section */}
            <div className="border-t border-gray-200 pt-4">
              <h3 className="text-base font-bold text-gray-800 mb-2">
                Upload Grade Screenshot
              </h3>
              <p className="text-xs text-gray-600 mb-2">
                Future feature: Upload screenshots for automatic grade extraction
              </p>
              <FileUpload onFileUpload={handleFileUpload} />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white">
        <div className="max-w-md mx-auto px-2 py-3">
          <div className="text-center space-y-1">
            <p className="text-xs font-medium">
              © 2025 Adrian Obadiah. All rights reserved.
            </p>
            <p className="text-xs text-gray-400">
              USP GPA Calculator - Built with React & Tailwind CSS
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
