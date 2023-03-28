import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import { logout } from '../../store/session';
import { createNote } from "../../store/note";
import './Navigation.css';

function Navigation(){

	const dispatch = useDispatch();
	const history = useHistory();
	const sessionUser = useSelector(state => state.session.user);

	// return (
	// 	<ul>
	// 		<li>
	// 			<NavLink exact to="/">Home</NavLink>
	// 		</li>
	// 		{isLoaded && (
	// 			<li>
	// 				<ProfileButton user={sessionUser} />
	// 			</li>
	// 		)}
	// 	</ul>
	// );

	const newNoteBtn = async (e) => {
		e.preventDefault();
	}

	const handleLogout = async (e) => {
		e.preventDefault();
		const resp = await dispatch(logout());
		if (resp.message) return history.push('/');
	  };

	return (
		<div className='nav-bar-container'>
			<div className='nav-bar-user'>
				<p>Hello, {sessionUser.username}</p>
				<button onClick={handleLogout}>
				<i class="fa-solid fa-right-from-bracket"></i>
				</button>
			</div>
			<div className='nav-bar-actions'>
				<button>New Note</button>
			</div>
			<nav className='nav-bar-links'>
				<ul>
					<li>
						<NavLink to="/home">Home</NavLink>
					</li>
					<li>
						<NavLink to="/notes">Notes</NavLink>
					</li>
					<li>
						<NavLink to="/notebooks">Notebooks</NavLink>
					</li>
					<li>
						<NavLink to="/trash">Trash</NavLink>
					</li>
				</ul>
			</nav>
		</div>
	)
}

export default Navigation;
