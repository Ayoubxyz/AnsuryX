import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export const generateCertificate = async (userData, challengeData) => {
  // Create certificate HTML content
  const certificateHTML = createCertificateHTML(userData, challengeData);
  
  // Create a temporary div to render the certificate
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = certificateHTML;
  tempDiv.style.position = 'absolute';
  tempDiv.style.left = '-9999px';
  tempDiv.style.width = '800px';
  tempDiv.style.height = '600px';
  document.body.appendChild(tempDiv);

  try {
    // Convert HTML to canvas
    const canvas = await html2canvas(tempDiv, {
      width: 800,
      height: 600,
      scale: 2,
      backgroundColor: '#1e293b'
    });

    // Create PDF
    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'px',
      format: [800, 600]
    });

    // Add canvas to PDF
    const imgData = canvas.toDataURL('image/png');
    pdf.addImage(imgData, 'PNG', 0, 0, 800, 600);

    // Generate filename
    const filename = `AnsuryX-Challenge-Certificate-${userData.user_metadata?.full_name?.replace(/\s+/g, '-') || 'User'}.pdf`;

    // Download PDF
    pdf.save(filename);

    return { success: true, filename };
  } catch (error) {
    console.error('Error generating certificate:', error);
    return { success: false, error: error.message };
  } finally {
    // Clean up
    document.body.removeChild(tempDiv);
  }
};

const createCertificateHTML = (userData, challengeData) => {
  const userName = userData.user_metadata?.full_name || 'Challenge Participant';
  const completionDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return `
    <div style="
      width: 800px;
      height: 600px;
      background: linear-gradient(135deg, #1e293b 0%, #7c3aed 50%, #1e293b 100%);
      color: white;
      font-family: 'Arial', sans-serif;
      position: relative;
      padding: 40px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
    ">
      <!-- Decorative border -->
      <div style="
        position: absolute;
        top: 20px;
        left: 20px;
        right: 20px;
        bottom: 20px;
        border: 3px solid #a855f7;
        border-radius: 20px;
      "></div>
      
      <!-- Header -->
      <div style="margin-bottom: 30px;">
        <h1 style="
          font-size: 48px;
          font-weight: bold;
          margin: 0;
          background: linear-gradient(45deg, #a855f7, #06b6d4);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        ">Certificate of Achievement</h1>
        <div style="
          width: 100px;
          height: 4px;
          background: linear-gradient(45deg, #a855f7, #06b6d4);
          margin: 20px auto;
          border-radius: 2px;
        "></div>
      </div>

      <!-- Main content -->
      <div style="margin-bottom: 30px;">
        <p style="font-size: 18px; margin: 0 0 20px 0; color: #cbd5e1;">This is to certify that</p>
        <h2 style="
          font-size: 36px;
          font-weight: bold;
          margin: 0 0 20px 0;
          color: #f1f5f9;
        ">${userName}</h2>
        <p style="font-size: 18px; margin: 0 0 10px 0; color: #cbd5e1;">has successfully completed the</p>
        <h3 style="
          font-size: 28px;
          font-weight: bold;
          margin: 0 0 20px 0;
          color: #a855f7;
        ">AnsuryX Challenge</h3>
        <p style="font-size: 16px; margin: 0; color: #94a3b8; line-height: 1.6;">
          Demonstrating unwavering commitment to personal transformation<br>
          through 40 days of consistent daily habits and spiritual growth
        </p>
      </div>

      <!-- Achievement details -->
      <div style="
        background: rgba(168, 85, 247, 0.1);
        border: 1px solid rgba(168, 85, 247, 0.3);
        border-radius: 15px;
        padding: 20px;
        margin-bottom: 30px;
        width: 100%;
        max-width: 500px;
      ">
        <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
          <span style="color: #cbd5e1;">Challenge Duration:</span>
          <span style="color: #f1f5f9; font-weight: bold;">40 Days</span>
        </div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
          <span style="color: #cbd5e1;">Habits Mastered:</span>
          <span style="color: #f1f5f9; font-weight: bold;">5 Core Pillars</span>
        </div>
        <div style="display: flex; justify-content: space-between;">
          <span style="color: #cbd5e1;">Completion Date:</span>
          <span style="color: #f1f5f9; font-weight: bold;">${completionDate}</span>
        </div>
      </div>

      <!-- Footer -->
      <div style="margin-top: auto;">
        <div style="
          font-size: 48px;
          margin-bottom: 10px;
        ">🏆</div>
        <p style="
          font-size: 14px;
          color: #94a3b8;
          margin: 0;
          font-style: italic;
        ">"Excellence is not an act, but a habit. We are what we repeatedly do." - Aristotle</p>
      </div>
    </div>
  `;
};

export const generateJournalPDF = async (journalEntries, userData) => {
  try {
    const pdf = new jsPDF();
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 20;
    const maxWidth = pageWidth - (margin * 2);
    
    // Add title
    pdf.setFontSize(20);
    pdf.setFont(undefined, 'bold');
    pdf.text('AnsuryX Challenge - Journal Entries', margin, 30);
    
    // Add user name
    pdf.setFontSize(14);
    pdf.setFont(undefined, 'normal');
    const userName = userData.user_metadata?.full_name || 'Challenge Participant';
    pdf.text(`Participant: ${userName}`, margin, 45);
    
    let yPosition = 65;
    
    // Add journal entries
    journalEntries.forEach((entry, index) => {
      // Check if we need a new page
      if (yPosition > pageHeight - 60) {
        pdf.addPage();
        yPosition = 30;
      }
      
      // Entry date
      pdf.setFontSize(12);
      pdf.setFont(undefined, 'bold');
      pdf.text(`${entry.date}`, margin, yPosition);
      yPosition += 15;
      
      // Entry content
      pdf.setFontSize(10);
      pdf.setFont(undefined, 'normal');
      const lines = pdf.splitTextToSize(entry.content, maxWidth);
      pdf.text(lines, margin, yPosition);
      yPosition += (lines.length * 5) + 20;
      
      // Add separator line
      if (index < journalEntries.length - 1) {
        pdf.setDrawColor(200, 200, 200);
        pdf.line(margin, yPosition - 10, pageWidth - margin, yPosition - 10);
        yPosition += 10;
      }
    });
    
    // Generate filename
    const filename = `AnsuryX-Challenge-Journal-${userName.replace(/\s+/g, '-')}.pdf`;
    
    // Download PDF
    pdf.save(filename);
    
    return { success: true, filename };
  } catch (error) {
    console.error('Error generating journal PDF:', error);
    return { success: false, error: error.message };
  }
};

