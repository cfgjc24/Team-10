import React, { useState, useRef, useCallback } from 'react';
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';
import { Button } from '@chakra-ui/react';
import { Input } from '@chakra-ui/react';

pdfjs.GlobalWorkerOptions.workerSrc = '/path/to/pdf.worker.min.js';

const PDFSignerPage = () => {
  const [pdfFile, setPdfFile] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [signature, setSignature] = useState(null);
  const [sigPosition, setSigPosition] = useState({ x: 0, y: 0 });
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const onFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/pdf") {
      setPdfFile(URL.createObjectURL(file));
    } else {
      alert("Please select a valid PDF file.");
    }
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const startDrawing = useCallback((event) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(event.nativeEvent.offsetX, event.nativeEvent.offsetY);
    setIsDrawing(true);
  }, []);

  const draw = useCallback((event) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.lineTo(event.nativeEvent.offsetX, event.nativeEvent.offsetY);
    ctx.stroke();
  }, [isDrawing]);

  const stopDrawing = useCallback(() => {
    if (isDrawing) {
      setIsDrawing(false);
      const canvas = canvasRef.current;
      setSignature(canvas.toDataURL());
    }
  }, [isDrawing]);

  const placeSignature = (event) => {
    if (signature) {
      const boundingRect = event.currentTarget.getBoundingClientRect();
      setSigPosition({
        x: event.clientX - boundingRect.left,
        y: event.clientY - boundingRect.top
      });
    }
  };

  const downloadSignedPDF = () => {
    // In a real implementation, you would use a library like pdf-lib
    // to actually modify the PDF and add the signature
    alert("In a real implementation, this would download the signed PDF.");
  };

  return (
    <div className="flex flex-col items-center p-4">
      <Input type="file" onChange={onFileChange} accept="application/pdf" className="mb-4" />
      
      {pdfFile && (
        <div className="mb-4">
          <Document file={pdfFile} onLoadSuccess={onDocumentLoadSuccess}>
            <Page pageNumber={pageNumber} onClick={placeSignature} />
          </Document>
          <p>Page {pageNumber} of {numPages}</p>
          {signature && (
            <img 
              src={signature} 
              alt="Signature" 
              style={{ 
                position: 'absolute', 
                left: `${sigPosition.x}px`, 
                top: `${sigPosition.y}px`,
                pointerEvents: 'none'
              }} 
            />
          )}
        </div>
      )}

      <div className="mb-4">
        <canvas 
          ref={canvasRef} 
          width={300} 
          height={100} 
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseOut={stopDrawing}
          className="border border-gray-300"
        />
      </div>

      <div className="space-x-2">
        <Button onClick={() => setPageNumber(prev => Math.max(prev - 1, 1))}>
          Previous Page
        </Button>
        <Button onClick={() => setPageNumber(prev => Math.min(prev + 1, numPages))}>
          Next Page
        </Button>
        <Button onClick={downloadSignedPDF}>Download Signed PDF</Button>
      </div>
    </div>
  );
};

export default PDFSignerPage;