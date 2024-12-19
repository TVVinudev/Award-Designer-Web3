import { useState } from 'react';
import './App.css'
import { ethers } from 'ethers';
import ABI from "./assets/CertiApp.json"
import address from "./assets/deployed_addresses.json"

function App() {



  const [data, setData] = useState('')
  const [signer, setSigner] = useState('');
  const [formData, setFormData] = useState(
    {
      id: 0,
      name: '',
      course: '',
      grade: '',
      date: ''
    }
  )

  async function connectWithMetamask() {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    console.log(signer);

    if (signer) {
      alert(`The address ${signer.address} is connected!`);
      setSigner(signer);
    } else {
      alert("Error Occure!")
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    console.log('Form submitted:', formData);

    const provider = new ethers.BrowserProvider(window.ethereum); //
    const signer = await provider.getSigner(); 

    const abi = ABI.abi;
    const cAddress = address['CertModule#CertiApp'];
    console.log(cAddress);

    const certiInstance = new ethers.Contract(cAddress, abi, signer); //make instance
    console.log(certiInstance);
    const transactionReceipt = await certiInstance.issue(
      formData.id,
      formData.name,
      formData.course,
      formData.grade,
      formData.date
    );
    console.log(transactionReceipt)
  }

  async function getCertificate() {
    const id = document.getElementById('ID').value;
    console.log(id);

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    const abi = ABI.abi;
    const cAddress = address['CertModule#CertiApp'];

    const certiInstance = new ethers.Contract(cAddress, abi, signer);//make instance
    console.log(certiInstance);


    const tx = await certiInstance.Certificates(id);
    console.log(tx);
    setData(tx)

  }


  return (
    <>
      <div>
        <button onClick={connectWithMetamask}>connect to Meta Mask</button>
      </div>
      <div>
        <form action="" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="">ID:</label>
            <input type="number" id='id' name='id' value={formData.id} onChange={handleChange} />
          </div>

          <div>
            <label htmlFor="">Candidate Name:</label>
            <input type="text" id='name' name='name' value={formData.name} onChange={handleChange} />
          </div>

          <div>
            <label htmlFor="">Course:</label>
            <input type="text" id='course' name='course' value={formData.course} onChange={handleChange} />
          </div>

          <div>
            <label htmlFor="">Grade:</label>
            <input type="text" id='grade' name='grade' value={formData.grade} onChange={handleChange} />
          </div>

          <div>
            <label htmlFor="">Date:</label>
            <input type="date" id='date' name='date' value={formData.date} onChange={handleChange} />
          </div>

          <div><button type='submit' >Submit</button></div>


        </form>
      </div>
      <div>
        <label htmlFor="">Enter your ID:</label>
        <input type="number" id='ID' name='id' />

        <button type='submit' onClick={getCertificate}>Get Certificate</button>
      </div>

      {data && (
        <div id='certificate'>
          <h2>Certificate</h2>
          This is to certify that <b>{data.name}</b> <br />
          has successfully completed <b>{data.course}</b> <br />
          with a grade of <b>{data.grade}</b> on <b>{data.date}</b>.

        </div>
      )}


    </>
  )
}

export default App
