import React, { useEffect, useState } from 'react';
import ReCAPTCHA from "react-google-recaptcha";
import axios from 'axios';

const Captchaform = () => {
    const [captcha, setCaptcha] = useState(false);
    const[countries, setCountries] = useState([])
    const[states, setStates] = useState([])
    
    const [contact, setContact] = useState({
        name: '',
        email: '',
        country: '',
        state: '',
    });
    

    async function fetchData(){
        const response = await axios.get('https://countriesnow.space/api/v0.1/countries/states')
        
        const countrydata = response.data.data.map(country =>country.name)
        // console.log(countrydata)
        setCountries(countrydata)
        setStates([])
    }

    useEffect(()=>{
        fetchData()
    },[])

    // function onCaptchaChange(value) {
    //     console.log(value)
    //     setCaptcha(prevCaptcha => !prevCaptcha);
    // }

    function onCaptchaChange() {
        setCaptcha(prevCaptcha => !prevCaptcha);
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setContact(prevContact => ({
            ...prevContact,
            [name]: value
        }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        console.log(contact);
    }

async function handleCountryChange(e) {
    const selectedCountry = e.target.value;

    setContact(prevContact => ({
        ...prevContact,
        country: selectedCountry,
        state: '', // Clear selected state when country changes
    }));

    // Fetch states for the selected country
    const response = await axios.get('https://countriesnow.space/api/v0.1/countries/states');
    console.log(response.data); // Log the response to inspect the structure

    // Find the selected country object
    const selectedCountryData = response.data.data.find(country => country.name === selectedCountry);

    if (selectedCountryData) {
        // Set states for the selected country
        setStates(selectedCountryData.states.map(state => state.name));
    } else {
        // If selected country data is not found, clear states
        setStates([]);
    }
}


    return (
        <form onSubmit={handleSubmit}>
            <div>
                <div>
                    <label htmlFor="name">Name:</label><br />
                    <input
                        type="text"
                        placeholder="Name"
                        onChange={handleChange}
                        name="name"
                        value={contact.name}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="email">Email:</label><br />
                    <input
                        type="text"
                        placeholder="Email"
                        onChange={handleChange}
                        name="email"
                        value={contact.email}
                        required
                    />
                </div>
                <label>Country:</label>
                <br/>
                <select
                    id="country"
                    value={contact.country}
                    onChange={handleCountryChange}
                    name="country"
                    required
                >
                    <option value="" disabled selected>Select Country</option>
                    {countries.map((country, index) => (
                        <option key={index} value={country}>{country}</option> 
                    ))}
                </select><br />
                <label>State:</label>
                <br/>
                <select
                    id="state"
                    value={contact.state}
                    onChange={handleChange}
                    name="state"
                >
                    <option value="" disabled selected>Select State</option>
                    {states.map((state,index)=>(
                           <option key={index} value={state}>{state}</option>
                    ))}
                </select>
                <br/>
                <ReCAPTCHA
                    sitekey="6LfWvpwpAAAAAMEDVWFhVabUQ0Uv54tSMIskmp7_"
                    onChange={onCaptchaChange}
                />                  
                <button disabled={!captcha}>Submit</button>
            </div>                  
        </form>
    );
};

export default Captchaform;
