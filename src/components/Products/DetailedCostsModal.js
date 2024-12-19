import React, { useState, useEffect } from 'react';
import './DetailedCostsModal.css';
import Headers from '../Headers';
import DownloadPdf from '../../assets/DownloadPDF.svg';
import ExcelSheet from '../../assets/Excel.svg';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import * as XLSX from 'xlsx';

const DetailedCostsModal = ({ data, onClose ,total}) => {
  console.log(data)
  const [sliderValue, setSliderValue] = useState(1);

  // Add these state variables to save the initial configuration
  const [initialData, setInitialData] = useState(null);

  // Save the initial configuration when the component mounts
  useEffect(() => {
    if (!initialData && data) {
      setInitialData(data);
    }
  }, [data]);

  const handleOverlayClick = (e) => {
    if (e.target.className === 'modal-overlay') {
      onClose();
    }
  };

  const handleDownloadPDF = () => {
    const input = document.getElementById('pdf-content');
    const padding = 20; // Define padding value in pixels
    const pdfWidth = input.offsetWidth + padding * 2;
    const pdfHeight = input.offsetHeight + padding * 2;

    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: [pdfWidth, pdfHeight]
      });
      pdf.addImage(imgData, 'PNG', padding, padding, input.offsetWidth, input.offsetHeight);
      pdf.save('detailed_costs.pdf');
    });
  };

  const handleDownloadExcel = () => {
    const workbook = XLSX.utils.book_new();
    const worksheetData = [];

    productOrder.forEach((productKey) => {
      if (data && data[productKey]) {
        worksheetData.push([productKey]);
        worksheetData.push(['Subproduct', 'Cost With Uplift Excl Vat', 'Cost Vat Rate', 'Cost Incl Vat', `Cost ${sliderValue} month(s)`]);

        Object.entries(data[productKey]).forEach(([subProductKey, val]) => {
          worksheetData.push([
            subProductKey,
            val.cost_with_uplift_excl_vat.toFixed(2),
            val.cost_vat_rate.toFixed(2),
            val.cost_incl_vat.toFixed(2),
            (val.cost_incl_vat * sliderValue).toFixed(2)
          ]);
        });

        worksheetData.push([]);
      }
    });

    worksheetData.push(['Grand Total', '', '', '', (data.grand_total * sliderValue).toFixed(2)]);

    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Detailed Costs');
    XLSX.writeFile(workbook, 'detailed_costs.xlsx');
  };

  const handleSliderChange = (e) => {
    setSliderValue(parseInt(e.target.value, 10));
  };

  // Define the order of products
  const productOrder = ['ce_products', 'cloud_storage_products', 'filestore_products', 'db_products', 'bq_products', 'dFlow_products', 'gclb_products', 'lStorage_products']; // Add more products as needed

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>×</button>
        <div className="slider-container">
          <input
            type="range"
            min="1"
            max="12"
            step="1"
            value={sliderValue}
            onChange={handleSliderChange}
            className="slider"
          />
          <span className="slider-value">{sliderValue} month(s)</span>
        </div>
        <Headers level={2} text="Details" className="left-align" />
        <div id="pdf-content">
          {productOrder.map((productKey) => (
            data && data[productKey] && (
              <React.Fragment key={productKey}>
                <Headers level={3} text={productKey} className="left-align" />
                <table>
                  <thead>
                    <tr>
                      <th>Subproduct</th>
                      <th>Cost With Uplift Excl Vat</th>
                      <th>Cost Vat Rate</th>
                      <th>Cost Incl Vat</th>
                      <th>Cost {sliderValue} month(s)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(data[productKey]).map(([subProductKey, val]) => {
                      const initialVal = initialData[productKey]?.[subProductKey]?.cost_incl_vat || 0;
                      const change = val.cost_incl_vat - initialVal;
                      const initialMonthlyVal = initialData[productKey]?.[subProductKey]?.cost_incl_vat * sliderValue || 0;
                      const monthlyChange = (val.cost_incl_vat * sliderValue) - initialMonthlyVal;
                      return (
                        <tr key={subProductKey}>
                          <td>{subProductKey}</td>
                          <td>{val.cost_with_uplift_excl_vat.toFixed(2)}</td>
                          <td>{val.cost_vat_rate.toFixed(2)}</td>
                          <td>{val.cost_incl_vat.toFixed(2)}</td>
                          <td>{(val.cost_incl_vat * sliderValue).toFixed(2)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </React.Fragment>
            )
          ))}
          <h3>Grand Total: {(total * sliderValue).toFixed(2)}</h3>
        </div>
        <div className='download-excel-pdf'>
          <div className="svg-container" onClick={handleDownloadPDF}>
            <img src={DownloadPdf} alt="Download PDF" />
          </div>
          <div onClick={handleDownloadExcel}>
            <img src={ExcelSheet} alt="Download Excel" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailedCostsModal;