import React, { useEffect } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import OpenModalItem from '../OpenModalItem';
import ViewTags from '../Tags';
import { logout } from '../../store/session';
import { createNote, readAllNotes, readTrash } from "../../store/note";
import { getNotebooks } from '../../store/notebook';
import { readAllTags } from '../../store/tag';
import './Navigation.css';

function Navigation(){

	const dispatch = useDispatch();
	const history = useHistory();
	const sessionUser = useSelector(state => state.session.user);
	const defaultNotebook = useSelector(state => Object.values(state.notebooks.all_notebooks)[0]);


	useEffect(() => {
		dispatch(readAllNotes())
		dispatch(readTrash())
		dispatch(getNotebooks())
		dispatch(readAllTags())
	}, [dispatch])


	const newNoteBtn = async (e) => {
		e.preventDefault();
		const newNote = await dispatch(createNote({ notebook_id: defaultNotebook.id }));
		if (newNote) {
			return history.push(`/notes`);
		}else {
			return alert("ERROR")
		}
	}

	const handleLogout = async (e) => {
		e.preventDefault();
		const resp = await dispatch(logout());
		if (resp.message) return history.push('/');
	  };

	if (!defaultNotebook) return null;

	return (
		<div className='nav-bar-container'>
			<div className='nav-bar-user'>
				<p className='nav-bar-user-greet'>Hello, {sessionUser.username}</p>
				<button
				aria-label='Log out'
				className='nav-bar-user-signout curs'
				onClick={handleLogout}
				>
				<i class="fa-solid fa-right-from-bracket"></i>
				</button>
			</div>
			<div className='nav-bar-actions'>
				<button className='new-note-btn curs' onClick={newNoteBtn}>New Note</button>
			</div>
			<nav className='nav-bar-links'>
				<ul className='nav-bar-links'>
					<li>
						<NavLink to="/home"><i class="fa-solid fa-house"></i>  Home</NavLink>
					</li>
					<li>
						<NavLink to="/notes"><i class="fa-solid fa-file-lines"> </i>  Notes</NavLink>
					</li>
					<li>
						<NavLink to="/notebooks"><i class="fa-solid fa-book"></i>  Notebooks</NavLink>
					</li>
					<li>
						<NavLink to="/tags"><i class="fa-solid fa-tags"></i> Tags</NavLink>
					</li>
					<li>
						<NavLink to="/trash"><i class="fa-solid fa-trash"></i>  Trash</NavLink>
					</li>
				</ul>
			</nav>
		</div>
	)
}

export default Navigation;
