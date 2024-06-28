import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
    const navigate = useNavigate();
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [result, setResult] = useState({});
    const [error, setError] = useState(false);
    const [passwordError, setPasswordError] = useState('');

    const handleUserNameChange = (e) => {
        setUserName(e.target.value);
    }

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

    const handleSubmit = () => {
        if (password === rePassword) {
            setResult({ userName, email, password, rePassword });
            setError(false);
            // navigate('/login')
            axios.post('http://localhost:5002/register',{
                userName,
                email,
                password,
            });
          
        } else {
            setError(true);
        }
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div style={{ width: '300px', padding: '20px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', borderRadius: '8px' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Register</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <label>User Name</label>
                    <input type="text" value={userName} placeholder="Enter your Name..." onChange={handleUserNameChange} />
                    <label>Email</label>
                    <input type="email" value={email} placeholder="Enter your Email..." onChange={handleEmailChange} />
                    <label>Password</label>
                    <input type="password" value={password} placeholder="Enter your password..." maxLength={20} onChange={handlePasswordChange} />
                    {passwordError && <p style={{ color: 'red', fontSize: '14px', textAlign: 'center' }}>{passwordError}</p>}
                    <label>Re-password</label>
                    <input type="password" value={rePassword} placeholder="Re-enter your password..." maxLength={20} onChange={handleRepasswordChange} />
                    {passwordError && <p style={{ color: 'red', fontSize: '14px', textAlign: 'center' }}>{passwordError}</p>}
                    {error && <p style={{ color: 'red', fontSize: '14px', textAlign: 'center' }}>Passwords do not match!</p>}
                    <button style={{ marginTop: '20px', width: '100%', padding: '10px', backgroundColor: 'green', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }} onClick={handleSubmit}>Sign Up</button>
                </div>
                {Object.keys(result).length > 0 && (
                    <div style={{ marginTop: '10px', textAlign: 'center' }}>
                        <p>Registered Data:</p>
                        <p>User Name: {result.userName}</p>
                        <p>Email: {result.email}</p>
                        <p>Password: {result.password}</p>
                        <p>Re-password: {result.rePassword}</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Register;
