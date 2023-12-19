import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'

function App() {
	const navigate = useNavigate();
    const { login } = useAuth();
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')


	async function loginUser(event) {
		event.preventDefault();
		await login(email, password);
		navigate('/');
	}

	return (
		<div>
			<h1>Login</h1>
			<form onSubmit={loginUser}>
				<input
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					type="email"
					placeholder="Email"
				/>
				<br />
				<input
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					type="password"
					placeholder="Password"
				/>
				<br />
				<input type="submit" value="Login" />
			</form>
		</div>
	)
}

export default App