import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import "./SignupForm.css";

function SignupFormModal() {
	const dispatch = useDispatch();
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState([]);
	const { closeModal } = useModal();

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (password === confirmPassword) {
			const data = await dispatch(signUp(username, email, password));
			if (data) {
				setErrors(data);
			} else {
				closeModal();
			}
		} else {
			setErrors([
				"Confirm Password field must be the same as the Password field",
			]);
		}
	};

	return (
		<div className="signup-form-container">
			<img
			alt="MindPalace"
			src="https://i.imgur.com/19eLshm.png"
			/>
			<h1>Sign Up</h1>
			<form
			onSubmit={handleSubmit}
			className="signup-form"
			>
				<ul>
					{errors.map((error, idx) => (
						<li className="error" key={idx}>{error}</li>
					))}
				</ul>
				<div>
						<input
							type="text"
							placeholder="Email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
				</div>
				<div>
						<input
							type="text"
							placeholder="Username"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							required
						/>
				</div>
				<div>
						<input
							type="password"
							placeholder="Password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
				</div>
				<div>
						<input
							type="password"
							placeholder="Confirm Password"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							required
						/>
				</div>
				<div className="signup-form-submit">
					<button
					className="signup-form-button curs"
					type="submit"
					disabled = {confirmPassword === password
						&& email.includes('@')
						&& username.length ? false : true }
					>
						Sign Up
					</button>
				</div>
				<div className="signup-form-have-account">
					<p>Already have an account?</p>
            		<OpenModalButton
              			buttonText="Create account"
              			nameClass="signup-form-sign-in-button curs"
              			modalComponent={<LoginFormModal />}
            		/>
				</div>
			</form>
		</div>
	);
}

export default SignupFormModal;
