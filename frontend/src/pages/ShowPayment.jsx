import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const ShowPayment = () => {
  const [payment, setPayment] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/payments/${id}`)
      .then((response) => {
        setPayment(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [id]);

  const handleDelete = () => {
    // Implement delete functionality here
    navigate(`/payments/delete/${payment._id}`);
  };

  const handleEdit = () => {
    navigate(`/payments/edit/${payment._id}`);
  };

  const handleReceipt = () => {
    const input = document.getElementById('receipt-content');
    html2canvas(input, { scale: 6 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
  
      // Adjust the image dimensions to reduce the height
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
  
      // Reduce the height of the PDF, for example, to 50% of the original
      const reducedHeight = imgHeight * 1.51; // Reduce to 50% of the original height
  
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, reducedHeight);
      pdf.save(`receipt_${payment._id}.pdf`);
    });
  };
  
  

  return (
    <div style={styles.pageContainer}>
      <div style={styles.container}>
        <BackButton /> {/* Assuming you have a back button component */}
        <h1 style={styles.title}>Payment Receipt</h1>
        {loading ? (
          <Spinner />
        ) : (
          <div id="receipt-content" style={styles.receipt}>
            <div style={styles.header}>
              <h2 style={styles.companyName}>CraftMart</h2>
              <p style={styles.receiptNumber}>Receipt No: {payment._id}</p>
            </div>
            <div style={styles.details}>
              <div style={styles.row}>
                <span style={styles.label}>Customer Name:</span>
                <span style={styles.value}>{payment.cardHolderName}</span>
              </div>
              <div style={styles.row}>
                <span style={styles.label}>Product Name:</span>
                <span style={styles.value}>{payment.productName}</span>
              </div>
              <div style={styles.row}>
                <span style={styles.label}>Price:</span>
                <span style={styles.value}>{payment.price}</span>
              </div>
              <div style={styles.row}>
                <span style={styles.label}>Quantity:</span>
                <span style={styles.value}>{payment.quantity}</span>
              </div>
              <div style={styles.row}>
                <span style={styles.label}>Total Price:</span>
                <span style={styles.value}>{payment.totalPrice}</span>
              </div>
              <div style={styles.row}>
                <span style={styles.label}>Create Time:</span>
                <span style={styles.value}>{new Date(payment.createdAt).toLocaleString()}</span>
              </div>
              <div style={styles.row}>
                <span style={styles.label}>Last Update Time:</span>
                <span style={styles.value}>{new Date(payment.updatedAt).toLocaleString()}</span>
              </div>
            </div>
          </div>
        )}
        <div style={styles.buttonContainer}>
          <button style={{ ...styles.button, ...styles.deleteButton }} onClick={handleDelete}>Delete</button>
          <button style={{ ...styles.button, ...styles.editButton }} onClick={handleEdit}>Edit</button>
          <button style={{ ...styles.button, ...styles.receiptButton }} onClick={handleReceipt}>Receipt</button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  pageContainer: {
    backgroundColor: '#F1EEDA',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    padding: '0 20px',
  },
  container: {
    padding: '30px',
    fontFamily: 'Arial, sans-serif',
    minWidth: '650px',
    backgroundColor: '#F1EEDA',
    borderRadius: '10px',
  },
  title: {
    fontSize: '30px',
    margin: '30px 0',
    textAlign: 'center',
    color: '#222',
  },
  receipt: {
    border: '1px solid #ccc',
    borderRadius: '10px',
    padding: '20px',
    backgroundColor: '#fff',
    boxShadow: '0 3px 6px rgba(0, 0, 0, 0.1)',
  },
  header: {
    textAlign: 'center',
    marginBottom: '30px',
    borderBottom: '2px solid #ccc',
    paddingBottom: '10px',
  },
  companyName: {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#000',
  },
  receiptNumber: {
    fontSize: '20px',
    color: '#333',
  },
  details: {
    paddingTop: '20px',
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '12px 0',
    borderBottom: '1px solid #eee',
  },
  label: {
    fontWeight: 'bold',
    color: '#444',
    flex: '1',
    fontSize: '18px',
  },
  value: {
    color: '#666',
    flex: '2',
    textAlign: 'right',
    fontSize: '18px',
  },
  buttonContainer: {
    marginTop: '50px',
    display: 'flex',
    justifyContent: 'space-around',
  },
  button: {
    padding: '10px',
    fontWeight: 'bold',
    fontSize: '16px',
    borderRadius: '40px',
    cursor: 'pointer',
    width: '187px', // Fixed width for consistency
  },
  deleteButton: {
    backgroundColor: '#330D0F',
    color: '#F1EEDA',
    border: 'none',
  },
  editButton: {
    backgroundColor: '#F1EEDA',
    color: '#330D0F',
    border: '5px solid #330D0F',
  },
  receiptButton: {
    backgroundColor: '#330D0F',
    color: '#F1EEDA',
    border: 'none',
  },
};

export default ShowPayment;
