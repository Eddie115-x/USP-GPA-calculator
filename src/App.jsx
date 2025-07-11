import { useState } from 'react';
import Tesseract from 'tesseract.js';
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
  const [isProcessing, setIsProcessing] = useState(false);

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

  // Extract grades from OCR text
  const extractGradesFromText = (rawText) => {
    const validGrades = ['A+', 'A', 'B+', 'B', 'C+', 'C', 'D', 'E'];
    const counts = {};

    // Initialize all grades to 0
    validGrades.forEach(grade => counts[grade] = 0);

    console.log('Raw OCR Text:', rawText);
    
    // Use regex to find grade patterns more precisely
    // Look for grades that are standalone or followed by common grade indicators
    const gradeRegex = /\b(A\+|A|B\+|B|C\+|C|D|E)\b/g;
    const matches = rawText.match(gradeRegex);
    
    console.log('Regex matches found:', matches);
    
    if (matches) {
      matches.forEach(match => {
        const grade = match.toUpperCase();
        if (validGrades.includes(grade)) {
          counts[grade] += 1;
          console.log(`✓ Found valid grade: ${grade}`);
        }
      });
    }
    
    // Alternative approach: Split by common separators and look for isolated grades
    const separators = /[\s,\t\n\r|;]+/;
    const tokens = rawText.split(separators).filter(token => token.trim().length > 0);
    
    console.log('Tokens found:', tokens);
    
    // Reset counts for cleaner approach
    validGrades.forEach(grade => counts[grade] = 0);
    
    tokens.forEach(token => {
      const cleanToken = token.trim().toUpperCase();
      // Only count exact matches to avoid false positives
      if (validGrades.includes(cleanToken)) {
        counts[cleanToken] += 1;
        console.log(`✓ Found exact grade token: ${cleanToken}`);
      }
    });

    console.log('Final grade counts:', counts);
    return counts;
  };

  // Handle file upload with real OCR functionality
  const handleFileUpload = async (file) => {
    try {
      setIsProcessing(true);
      
      // Convert file to data URL
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          console.log('Starting OCR processing...');
          
          // Perform OCR on the image with better configuration
          const result = await Tesseract.recognize(e.target.result, 'eng', {
            logger: m => {
              console.log('OCR Progress:', m);
              if (m.status === 'recognizing text') {
                console.log(`OCR Progress: ${Math.round(m.progress * 100)}%`);
              }
            },
            tessedit_char_whitelist: 'ABCDEabcde+0123456789 \n\t',
            tessedit_pageseg_mode: '6', // Single uniform block of text
          });
          
          const rawText = result.data.text;
          console.log('=== OCR RESULT ===');
          console.log('Raw OCR Text:', rawText);
          console.log('Text length:', rawText.length);
          console.log('==================');
          
          // Extract grades from the OCR text
          const gradeCounts = extractGradesFromText(rawText);
          console.log('Final extracted grades:', gradeCounts);
          
          // Update state with extracted grades
          setGradeQuantities(gradeCounts);
          
          // Show success message
          const totalGrades = Object.values(gradeCounts).reduce((sum, count) => sum + count, 0);
          if (totalGrades > 0) {
            alert(`OCR completed! Found ${totalGrades} grades. Grade quantities have been auto-filled.`);
          } else {
            alert('OCR completed, but no valid grades were found. Please check the image quality and try again.');
          }
          
        } catch (error) {
          console.error('OCR Error:', error);
          alert('Error processing image. Please try again with a clearer image.');
        } finally {
          setIsProcessing(false);
        }
      };
      
      reader.readAsDataURL(file);
      
    } catch (error) {
      console.error('File processing error:', error);
      alert('Error processing file. Please try again.');
      setIsProcessing(false);
    }
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
                Upload SOLS Grade Screenshot
              </h3>
              <p className="text-xs text-gray-600 mb-2">
                Upload a screenshot of your SOLS grades for automatic extraction
              </p>
              
              {/* Processing Status */}
              {isProcessing && (
                <div className="mb-3 p-2 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center text-xs text-blue-800">
                    <svg className="animate-spin h-4 w-4 mr-2" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing image with OCR...
                  </div>
                </div>
              )}
              
              <FileUpload onFileUpload={handleFileUpload} isProcessing={isProcessing} />
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
