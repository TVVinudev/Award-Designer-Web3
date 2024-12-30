import { useState } from 'react';
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
    <div className="p-10 space-y-10">
      <div className="flex justify-end">
        <button
          onClick={connectWithMetamask}
          className="bg-red-500 text-white px-5 py-3 rounded-lg shadow-lg uppercase hover:bg-red-600"
        >
          Connect to MetaMask
        </button>
      </div>

      <div className="shadow-lg p-8 rounded-lg bg-white max-w-lg mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6">
          {[
            { label: "ID", type: "number", name: "id" },
            { label: "Candidate Name", type: "text", name: "name" },
            { label: "Course", type: "text", name: "course" },
            { label: "Grade", type: "text", name: "grade" },
            { label: "Date", type: "date", name: "date" },
          ].map((field) => (
            <div className="flex flex-col" key={field.name}>
              <label
                htmlFor={field.name}
                className="text-gray-700 font-medium mb-2"
              >
                {field.label}:
              </label>
              <input
                type={field.type}
                id={field.name}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                className="shadow-md px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          ))}

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg uppercase hover:bg-blue-600"
            >
              Submit
            </button>
          </div>
        </form>
      </div>

      <div className="shadow-lg p-8 rounded-lg bg-white max-w-lg mx-auto space-y-4">
        <label htmlFor="ID" className="text-gray-700 font-medium">
          Enter your ID:
        </label>
        <div className="flex items-center space-x-4">
          <input
            type="number"
            id="ID"
            name="id"
            className="shadow-md px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 flex-grow"
          />
          <button
            type="button"
            onClick={getCertificate}
            className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg uppercase hover:bg-green-600"
          >
            Get Certificate
          </button>
        </div>
      </div>

      {data && (
        <div className="shadow-lg p-8 rounded-lg bg-white max-w-lg mx-auto">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Certificate
          </h2>
          <p className="text-gray-700">
            This is to certify that <b>{data.name}</b> has successfully
            completed <b>{data.course}</b> with a grade of <b>{data.grade}</b>{" "}
            on <b>{data.date}</b>.
          </p>
        </div>
      )}
    </div>
  )
}

export default App
