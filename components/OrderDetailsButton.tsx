'use client';

import React, { useState } from 'react';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { saveAs } from 'file-saver';
import { FiDownload, FiLoader } from 'react-icons/fi';
import { format } from 'date-fns';

type OrderItem = {
  id: string;
  productId: number;
  product: {
    id: number;
    name: string;
    price: number;
    image: string;
  };
  quantity: number;
  price: number;
};

type Shipping = {
  name: string;
  phone: string;
  address: string;
  createdAt: string;
};

type OrderStatus = 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';

type Order = {
  id: string;
  userId: string;
  total: number;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
  items: OrderItem[];
  shipping?: Shipping;
};

type Props = {
  order: Order;
};

export default function InvoicePdfGenerator({ order }: Props) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generatePdf = async () => {
    try {
      setIsGenerating(true);
      setError(null);

      // Create a new PDFDocument
      const pdfDoc = await PDFDocument.create();

      // Add a page (A4 size in points)
      const page = pdfDoc.addPage([595.28, 841.89]);

      const { width, height } = page.getSize();

      // Load fonts
      const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
      const fontItalic = await pdfDoc.embedFont(StandardFonts.HelveticaOblique);

      // Color palette
      const colors = {
        primary: rgb(220 / 255, 38 / 255, 38 / 255), // rose-800
        secondary: rgb(251 / 255, 113 / 255, 133 / 255), // rose-400
        dark: rgb(0.1, 0.1, 0.1),
        medium: rgb(0.4, 0.4, 0.4),
        light: rgb(0.8, 0.8, 0.8),
        background: rgb(0.98, 0.96, 0.96), // rose-50
      };

      // Margins and layout
      const margin = 50;
      const contentWidth = width - margin * 2;
      let y = height - margin;

      // Add decorative header
      page.drawRectangle({
        x: 0,
        y: height - 100,
        width,
        height: 100,
        color: colors.primary,
      });

      // Company logo/text
      page.drawText('Milk Shop', {
        x: margin,
        y: height - 60,
        size: 22,
        font: fontBold,
        color: rgb(1, 1, 1),
      });

      page.drawText('We have the best price in the city!!!', {
        x: margin,
        y: height - 85,
        size: 12,
        font: fontItalic,
        color: rgb(1, 1, 1),
      });

      // Invoice title
      page.drawText('INVOICE', {
        x: width - margin - 100,
        y: height - 70,
        size: 28,
        font: fontBold,
        color: rgb(1, 1, 1),
      });

      y = height - 130;

      // Invoice details
      const invoiceDetails = [
        { label: 'Invoice #', value: order.id.slice(0, 8).toUpperCase() },
        { label: 'Date', value: format(new Date(order.createdAt), 'MMMM dd, yyyy') },
        { label: 'Status', value: order.status.toLowerCase() },
      ];

      invoiceDetails.forEach((detail) => {
        page.drawText(`${detail.label}:`, {
          x: margin,
          y,
          size: 10,
          font: fontBold,
          color: colors.dark,
        });

        page.drawText(detail.value, {
          x: margin + 80,
          y,
          size: 10,
          font: fontRegular,
          color: colors.medium,
        });

        y -= 15;
      });

      y -= 20;

      // Billing information
      // Billing information
page.drawText('BILL TO:', {
  x: margin,
  y,
  size: 12,
  font: fontBold,
  color: colors.primary,
});

y -= 28;

if (order.shipping) {
  // Name with label
  page.drawText(`Name: ${order.shipping.name}`, {
    x: margin,
    y,
    size: 11,
    font: fontRegular,
    color: colors.dark,
  });
  y -= 25;

  // Address with label
  page.drawText(`Address: ${order.shipping.address}`, {
    x: margin,
    y,
    size: 11,
    font: fontRegular,
    color: colors.dark,
  });
  y -= 25;

  // Phone with label
  page.drawText(`Phone: ${order.shipping.phone}`, {
    x: margin,
    y,
    size: 11,
    font: fontRegular,
    color: colors.dark,
  });
  y -= 35;
} else {
  page.drawText('No shipping information available', {
    x: margin,
    y,
    size: 11,
    font: fontRegular,
    color: colors.medium,
  });
  y -= 15;
}
 y -= 15;

     

     

      // Items table header
      const columnWidths = [280, 80, 80, 80]; // Product, Price, Qty, Total
      const columnPositions = [margin]; // Initialize with first position
      
      // Calculate positions for each column
      for (let i = 1; i < columnWidths.length; i++) {
        columnPositions.push(columnPositions[i - 1] + columnWidths[i - 1]);
      }

      // Table header background
      page.drawRectangle({
        x: margin,
        y: y - 15,
        width: columnWidths.reduce((a, b) => a + b, 0),
        height: 25,
        color: colors.primary,
        borderColor: colors.primary,
      });

      // Table headers
      const headers = ['Description', 'Unit Price', 'Qty', 'Total'];
      headers.forEach((header, i) => {
        const xPosition = columnPositions[i] + (i > 0 ? 10 : 15);
        if (!isNaN(xPosition)) { // Ensure position is valid
          page.drawText(header, {
            x: xPosition,
            y: y - 5,
            size: 11,
            font: fontBold,
            color: rgb(1, 1, 1),
          });
        }
      });

      y -= 30;

      // Items rows
      order.items.forEach((item, index) => {
        // Alternate row background
        if (index % 2 === 0) {
          page.drawRectangle({
            x: margin,
            y: y - 5,
            width: columnWidths.reduce((a, b) => a + b, 0),
            height: 20,
            color: colors.background,
            borderColor: colors.background,
          });
        }

        const totalPrice = item.product.price * item.quantity ;

        // Product name
        page.drawText(item.product.name, {
          x: columnPositions[0] + 5,
          y,
          size: 10,
          font: fontRegular,
          color: colors.dark,
        });

        // Unit price
        page.drawText(`ETB  ${item.product.price.toFixed(2)}`, {
          x: columnPositions[1] + 10,
          y,
          size: 10,
          font: fontRegular,
          color: colors.dark,
        });

        // Quantity
        page.drawText(item.quantity.toString(), {
          x: columnPositions[2] + 10,
          y,
          size: 10,
          font: fontRegular,
          color: colors.dark,
        });

        // Total
        page.drawText(`ETB  ${totalPrice.toFixed(2)}`, {
          x: columnPositions[3] + 10,
          y,
          size: 10,
          font: fontRegular,
          color: colors.dark,
        });

        y -= 20;
      });

      y -= 20;

      // Total section
      const subtotalX = margin + columnWidths[0] + columnWidths[1];
      const totalX = margin + columnWidths[0] + columnWidths[1] + columnWidths[2];

      page.drawLine({
        start: { x: subtotalX, y },
        end: { x: totalX + columnWidths[3], y },
        thickness: 1,
        color: colors.light,
      });

      y -= 20;

      page.drawText('Total+Tax:', {
        x: subtotalX,
        y,
        size: 12,
        font: fontBold,
        color: colors.dark,
      });

      page.drawText(`ETB  ${order.total.toFixed(2)}`, {
        x: totalX,
        y,
        size: 12,
        font: fontRegular,
        color: colors.dark,
      });

      y -= 15;

      page.drawText('Shipping:', {
        x: subtotalX,
        y,
        size: 12,
        font: fontBold,
        color: colors.dark,
      });

      page.drawText('ETB 0.00', {
        x: totalX,
        y,
        size: 12,
        font: fontRegular,
        color: colors.dark,
      });

      y -= 15;

      page.drawLine({
        start: { x: subtotalX, y },
        end: { x: totalX + columnWidths[3], y },
        thickness: 1,
        color: colors.medium,
      });

      y -= 20;

      page.drawText('Total:', {
        x: subtotalX,
        y,
        size: 14,
        font: fontBold,
        color: colors.primary,
      });

      page.drawText(`ETB ${order.total.toFixed(2)}`, {
        x: totalX,
        y,
        size: 14,
        font: fontBold,
        color: colors.primary,
      });

      y -= 40;

      // Signature sections
      const signatureWidth = 180;
      const signatureHeight = 60;

      // Merchant signature
      page.drawRectangle({
        x: margin,
        y: y - signatureHeight,
        width: signatureWidth,
        height: signatureHeight,
        borderColor: colors.light,
        borderWidth: 1,
      });

      page.drawText('Authorized Signature', {
        x: margin + 10,
        y: y - 15,
        size: 10,
        font: fontItalic,
        color: colors.medium,
      });

      page.drawLine({
        start: { x: margin + 10, y: y - 30 },
        end: { x: margin + signatureWidth - 10, y: y - 30 },
        thickness: 1,
        color: colors.light,
      });

      // Customer signature
      page.drawRectangle({
        x: width - margin - signatureWidth,
        y: y - signatureHeight,
        width: signatureWidth,
        height: signatureHeight,
        borderColor: colors.light,
        borderWidth: 1,
      });

      page.drawText('Customer Signature', {
        x: width - margin - signatureWidth + 10,
        y: y - 15,
        size: 10,
        font: fontItalic,
        color: colors.medium,
      });

      page.drawLine({
        start: { x: width - margin - signatureWidth + 10, y: y - 30 },
        end: { x: width - margin - 10, y: y - 30 },
        thickness: 1,
        color: colors.light,
      });

      y -= 80;

      // Footer note
      page.drawText('Thank you for your business!', {
        x: margin,
        y: 40,
        size: 10,
        font: fontRegular,
        color: colors.medium,
      });

      page.drawText('Terms: Payment due within 30 days', {
        x: margin,
        y: 25,
        size: 8,
        font: fontItalic,
        color: colors.light,
      });

      // Serialize PDF
      const pdfBytes = await pdfDoc.save();

      // Save file
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      saveAs(blob, `Invoice_RB_${order.id.slice(0, 8).toUpperCase()}.pdf`);
    } catch (err) {
      setError('Failed to generate PDF. Please try again.');
      console.error('PDF generation error:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <button
        onClick={(e) => {
          e.stopPropagation();
          generatePdf();
        }}
        disabled={isGenerating}
        title="Download Invoice PDF"
        className={`inline-flex items-center px-4 py-2 rounded-lg transition-all ${
          isGenerating
            ? 'bg-rose-400 cursor-not-allowed'
            : 'bg-rose-600 hover:bg-rose-700 shadow-md hover:shadow-lg'
        } text-white font-medium`}
      >
        {isGenerating ? (
          <>
            <FiLoader className="animate-spin mr-2" />
            Generating...
          </>
        ) : (
          <>
            <FiDownload className="mr-2" />
            Download Invoice
          </>
        )}
      </button>
      
      {error && (
        <p className="mt-2 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}