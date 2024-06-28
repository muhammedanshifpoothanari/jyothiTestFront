import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
    const navigate = useNavigate()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [result, setResult] = useState({});
    const [error, setError] = useState(false);
    const [passwordError, setPasswordError] = useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }

    const handlePasswordChange = (e) => {
        const value = e.target.value;
        if (value.length <= 20) {
            setPassword(value);
            setPasswordError('');
        } else {
            setPasswordError('Password must be less than or equal to 20 characters.');
        }
    }

    const handleRepasswordChange = (e) => {
        const value = e.target.value;
        if (value.length <= 20) {
            setRePassword(value);
        } else {
            setPasswordError('Password must be less than or equal to 20 characters.');
        }
    }

   async function handleSubmit() {
        const minPasswordLength = 8;
    
        if (password.length < minPasswordLength) {
            setError(true);
        } else if (password === rePassword) {
            setResult({ email, password, rePassword });
            setError(false);
            const response = await axios.post('http://localhost:5002/login', { 
                email, 
                password
            })
                                                                     
            console.log(response);
            // navigate("/");
        } else {
            setError(true);
        }
    };
    

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div style={{ width: '300px', padding: '20px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', borderRadius: '8px' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Login</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <label>Email</label>
                    <input type="email" value={email} placeholder="Enter your Email..." onChange={handleEmailChange} />
                    <label>Password</label>
                    <input type="password" value={password} placeholder="Enter your password..." maxLength={20} onChange={handlePasswordChange} />
                    {passwordError && <p style={{ color: 'red', fontSize: '14px', textAlign: 'center' }}>{passwordError}</p>}
                    <label>Re-password</label>
                    <input type="password" value={rePassword} placeholder="Re-enter your password..." maxLength={20} onChange={handleRepasswordChange} />
                    {passwordError && <p style={{ color: 'red', fontSize: '14px', textAlign: 'center' }}>{passwordError}</p>}
                    {error && <p style={{ color: 'red', fontSize: '14px', textAlign: 'center' }}>Passwords do not match!</p>}
                    <button style={{ marginTop: '20px', width: '100%', padding: '10px', backgroundColor: '#28A745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }} onClick={handleSubmit}>Sign In</button>
                </div>
                {Object.keys(result).length > 0 && (
                    <div style={{ marginTop: '10px', textAlign: 'center' }}>
                        <p>Logged In Data:</p>
                        <p>Email: {result.email}</p>
                        <p>Password: {result.password}</p>
                        <p>Re-password: {result.rePassword}</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Login;
