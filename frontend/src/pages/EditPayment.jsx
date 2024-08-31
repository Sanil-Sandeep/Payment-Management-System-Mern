import React, { useState, useEffect } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import visaImg from '../images/visa.png'; 
import masterImg from '../images/master.png'; 
import { useSnackbar } from 'notistack';

function EditPayment() {
//const [paymentID, setPaymentID] = useState('');
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [totalPrice, setTotalPrice] = useState('');
  const [cardHolderName, setCardHolderName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cvv, setCvv] = useState('');
  const [email, setEmail] = useState('');
  const [cardType, setCardType] = useState(''); 
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const {id} = useParams();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:5555/payments/${id}`)
    .then((response) => {
      setProductName(response.data.productName);
      setPrice(response.data.price)
      setQuantity(response.data.quantity)
      setTotalPrice(response.data.totalPrice)
      setCardHolderName(response.data.cardHolderName)
      setCardNumber(response.data.cardNumber)
      setCvv(response.data.cvv)
      setEmail(response.data.email)
      setLoading(false);
    }).catch((error) => {
      setLoading(false);
      alert('An error happend. Please check console');
      console.log(error);
    });
  }, [])

  useEffect(() => {
    const priceValue = parseFloat(price) || 0;
    const quantityValue = parseInt(quantity) || 0;
    setTotalPrice(priceValue * quantityValue);
  }, [price, quantity]);

  const validateForm = () => {
    const newErrors = {};

    if (!productName) {
      newErrors.productName = 'Product name is required.';
    }

    if (!price) {
      newErrors.price = 'Price is required.';
    }

    if (!quantity) {
      newErrors.quantity = 'Quantity is required.';
    }

    if (!email) {
      newErrors.email = 'Email is required.';
    } else if (!email.endsWith('@gmail.com')) {
      newErrors.email = 'Email must end with @gmail.com.';
    }  //else if (!/^[a-zA-Z]+@gmail\.com$/.test(email)) {
      //newErrors.email = 'Email must contain only letters before @gmail.com.';
      //}

    if (!cardType) {
      newErrors.cardType = 'Please select a card type.';
    }

    if (!cardHolderName) {
      newErrors.cardHolderName = 'Card holder name is required.';
    } else if (!/\s/.test(cardHolderName)) {
      newErrors.cardHolderName = 'Card holder name must be more than one word.';
    } else if (/\d/.test(cardHolderName)) {
      newErrors.cardHolderName = 'Card holder name must not contain numbers.';
    }
    

    if (!cardNumber) {
      newErrors.cardNumber = 'Card number is required.';
    } else if (!/^\d{16}$/.test(cardNumber)) {
      newErrors.cardNumber = 'Card number must be 16 digits.';
    } else if (
      (cardType === 'visa' && !/^4/.test(cardNumber)) ||
      (cardType === 'master' && !/^(51|52|53|54|55)/.test(cardNumber))
    ) {
      newErrors.cardNumber = `Card number must start with ${
        cardType === 'visa' ? '4' : '51-55'
      }.`;
    }

    if (!cvv) {
      newErrors.cvv = 'CVV is required.';
    } else if (!/^\d{3}$/.test(cvv)) {
      newErrors.cvv = 'CVV must be 3 digits.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleEditPayment = () => {

    if (!validateForm()) {
      return;
    }

    const data = {
    //paymentID,
      productName,
      price,
      quantity,
      totalPrice,
      cardHolderName,
      cardNumber,
      cvv,
      email, 
    };
    setLoading(true);
    axios
      .put(`http://localhost:5555/payments/${id}`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Payment details edited successfully', { variant: 'success' });
        navigate(`/payments/details/${id}`);
      })
      .catch((error) => {
        setLoading(false);
      //alert('An error occurred. Please check the console.');
        enqueueSnackbar('Error', { variant: 'error' });
        console.log(error);
      })
  };

  return (
    <div style={styles.container}>
      <BackButton />
      <h1 style={styles.title}>Edit your payment details</h1>
      {loading && <Spinner />}
      <div style={styles.formContainer}>
        <div style={styles.leftSection}>
          
          <div style={styles.inputGroup}>
            <label style={styles.label}>Product Name :</label>
            <input 
              type='text'
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              style={styles.input}
            />   
             {errors.productName && <div style={styles.error}>{errors.productName}</div>}
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Price :</label>
            <input 
              type='number'
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              style={styles.input}
            />  
             {errors.price && <div style={styles.error}>{errors.price}</div>} 
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Quantity :</label>
            <input 
              type='number'
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              style={styles.input}
            />  
            {errors.quantity && <div style={styles.error}>{errors.quantity}</div>}  
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Total Price :</label>
            <input 
              type='number'
              value={totalPrice}
              readOnly
              style={styles.input}
            />   
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Email :</label>
            <input 
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
            />  
            {errors.email && <div style={styles.error}>{errors.email}</div>} 
          </div>
        </div>

        <div style={styles.rightSection}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Card Type :</label>
            <div style={styles.cardTypeContainer}>
              <label style={styles.cardTypeLabel}>
                <input 
                  type='radio'
                  value='visa'
                  checked={cardType === 'visa'}
                  onChange={(e) => setCardType(e.target.value)}
                  style={styles.radio}
                />
                <img src={visaImg} alt='Visa' style={styles.cardImage} />
              </label>
              <label style={styles.cardTypeLabel}>
                <input 
                  type='radio'
                  value='master'
                  checked={cardType === 'master'}
                  onChange={(e) => setCardType(e.target.value)}
                  style={styles.radio}
                />
                <img src={masterImg} alt='MasterCard' style={styles.cardImage} />
              </label>
            </div>
            {errors.cardType && <div style={styles.error}>{errors.cardType}</div>}
          </div>

          <div style={styles.inputGroup} className='shift-down'>
            <label style={styles.label}>Card Holder Name :</label>
            <input 
              type='text'
              value={cardHolderName}
              onChange={(e) => setCardHolderName(e.target.value)}
              style={styles.input}
            />   
             {errors.cardHolderName && <div style={styles.error}>{errors.cardHolderName}</div>}
          </div>

          <div style={styles.inputGroup} className='shift-down'>
            <label style={styles.label}>Card Number :</label>
            <input 
              type='text'
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              style={styles.input}
            />  
            {errors.cardNumber && <div style={styles.error}>{errors.cardNumber}</div>} 
          </div>

          <div style={styles.inputGroup} className='shift-down'>
            <label style={styles.label}>CVV :</label>
            <input 
              type='text'
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              style={styles.input}
            /> 
            {errors.cvv && <div style={styles.error}>{errors.cvv}</div>}  
          </div>

          <button style={styles.button} onClick={handleEditPayment}>
            Pay Now
          </button>
          {errors.form && <div style={styles.error}>{errors.form}</div>}
        </div>
      </div>
    </div>
  )
}

const styles = {
  container: {
    padding: '2rem',
    fontFamily: 'Poppins, sans-serif',
    backgroundColor: '#F1EEDA',
    minHeight: '100vh',
  },
  title: {
    fontSize: '2.5rem',
    margin: '0 0 1.5rem',
    textAlign: 'center',
    color: '#330D0F',
  },
  formContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    border: '2.5px solid #E1E1E1',
    borderRadius: '0.75rem',
    backgroundColor: '#FFFFFF',
    padding: '2rem',
    boxShadow: '0 3.75px 6px rgba(0, 2, 0, 4.65)',
    maxWidth: '1000px',
    margin: '0 auto',
    gap: '5rem',
  },
  leftSection: {
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
  },
  rightSection: {
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
  },
  inputGroup: {
    margin: '1rem 0',
  },
  label: {
    display: 'block',
    fontSize: '0.9375rem',
    marginBottom: '0.5rem',
    color: '#330D0F',
    fontWeight: 'bold',
  },
  input: {
    border: '2.5px solid #E1E1E1',
    padding: '0.75rem',
    width: '100%',
    borderRadius: '0.75rem',
    fontSize: '1rem',
  },
  error: {
    marginTop: '0.5rem',
    color: 'red',
    fontSize: '0.9rem',
  },
  cardTypeContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '1rem',
  },
  cardTypeLabel: {
    display: 'flex',
    alignItems: 'center',
    marginRight: '1rem',
  },
  cardImage: {
    width: '50px',
    height: '30px',
  },
  radio: {
    marginRight: '0.5rem',
  },
  button: {
    padding: '0.75rem 1.5rem',
    backgroundColor: '#330D0F',
    width: '100%',
    height: '53px',
    color: '#FFFFFF',
    border: 'none',
    borderRadius: '0.75rem',
    fontSize: '1rem',
    cursor: 'pointer',
    marginTop: '3.1rem',
    alignSelf: 'flex-end',
    transition: 'background-color 0.3s ease',
  },
  buttonHover: {
    backgroundColor: '#218838',
  },
  shiftDown: {
    marginTop: '2rem',
  },
};

export default EditPayment;
