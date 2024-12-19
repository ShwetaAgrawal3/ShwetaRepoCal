import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import '../Calculator';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import XLSX from 'xlsx';
import DownloadPdf from '../../assets/DownloadPDF.svg';
import ExcelSheet from '../../assets/Excel.svg'
import './ProductCostTable.css';

const ProductCostTable = ({ result, initialResult }) => {
  const pdfContentRef = useRef(null);

  const renderRows = (products, productKey, productName) => {
    return Object.entries(products)
      .filter(([key, val]) => key.startsWith('Total') && (val.cost_incl_vat || 0) > 0)
      .map(([key, val]) => {
        const initialVal = initialResult?.Product?.[productKey]?.[key]?.cost_incl_vat || 0;
        const change = (val.cost_incl_vat || 0) - initialVal;
        return (
          <tr key={key}>
            <td>{productName}</td>
            <td>
              {(val.cost_incl_vat || 0).toFixed(2)}
              {/* {change !== 0 && (
                <span className={`change-value ${change > 0 ? 'positive' : 'negative'}`}>
                  {change > 0 ? '+' : ''}{change.toFixed(2)}
                </span>
              )} */}
            </td>
          </tr>
        );
      });
  };

  const handleDownloadPDF = () => {
    const input = pdfContentRef.current;
    if (input) {
      html2canvas(input).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'PNG', 0, 0);
        pdf.save('detailed-costs.pdf');
      });
    } else {
      console.error('PDF content element not found');
    }
  };

  const handleDownloadExcel = () => {
    const data = [
      ['Product', 'Monthly Cost'],
      ...Object.entries(result.Product || {}).flatMap(([productKey, products]) =>
        Object.entries(products)
          .filter(([key, val]) => key.startsWith('Total') && (val.cost_incl_vat || 0) > 0)
          .map(([key, val]) => {
            const productName = `Total ${productKey.replace(/_/g, ' ')}`;
            const initialVal = initialResult?.Product?.[productKey]?.[key]?.cost_incl_vat || 0;
            const change = (val.cost_incl_vat || 0) - initialVal;
            return [
              productName,
              `${(val.cost_incl_vat || 0).toFixed(2)}${change !== 0 ? ` (${change > 0 ? '+' : ''}${change.toFixed(2)})` : ''}`
            ];
          })
      )
    ];

    const worksheet = XLSX.utils.aoa_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Detailed Costs');
    XLSX.writeFile(workbook, 'detailed-costs.xlsx');
  };

  return (
    <div className="total-section" ref={pdfContentRef}>
      <h3 className="grand-total">
        Grand Total (Monthly): {(result.grand_total || 0).toFixed(2)}
        {initialResult && result.grand_total !== initialResult.grand_total && (
          <span className={`change-value ${result.grand_total > initialResult.grand_total ? 'positive' : 'negative'}`}>
            {result.grand_total > initialResult.grand_total ? '+' : ''}{(result.grand_total - initialResult.grand_total).toFixed(2)}
          </span>
        )}
      </h3>
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Monthly Cost</th>
          </tr>
        </thead>
        <tbody>
          {result.Product && result.Product.ce_products && renderRows(result.Product.ce_products, 'ce_products', 'Total CE')}
          {result.Product && result.Product.cloud_storage_products && renderRows(result.Product.cloud_storage_products, 'cloud_storage_products', 'Total Cloud Storage')}
          {result.Product && result.Product.filestore_products && renderRows(result.Product.filestore_products, 'filestore_products', 'Total Filestore')}
          {result.Product && result.Product.db_products && renderRows(result.Product.db_products, 'db_products', 'Total DB')}
          {result.Product && result.Product.bq_products && renderRows(result.Product.bq_products, 'bq_products', 'Total BQ')}
          {result.Product && result.Product.dFlow_products && renderRows(result.Product.dFlow_products, 'dFlow_products', 'Total Dataflow')}
          {result.Product && result.Product.gclb_products && renderRows(result.Product.gclb_products, 'gclb_products', 'Total Google Cloud Load Balancer')}
          {result.Product && result.Product.lStorage_products && renderRows(result.Product.lStorage_products, 'lStorage_products', 'Total Log Storage')}

        </tbody>
      </table>
      <div className='download-format'>
      <div  onClick={handleDownloadPDF}>
        <img src={DownloadPdf} alt="Download PDF" />
      </div>
      <div onClick={handleDownloadExcel}>
        <img  src={ExcelSheet} alt="Download Excel" />
      </div>
      </div>
      
    </div>
  );
};

ProductCostTable.propTypes = {
  result: PropTypes.object.isRequired,
  initialResult: PropTypes.object,
};

export default ProductCostTable;