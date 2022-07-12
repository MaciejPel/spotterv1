import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { resetAuth } from '../features/auth/authSlice';
import { authURL } from '../utils/spotifyApi';
import useAuth from '../hooks/useAuth';
import useTheme from '../hooks/useTheme';
import { useState } from 'react';
import { RiFolderMusicFill } from 'react-icons/ri';
import { BiLogIn, BiLogOut, BiUser, BiHomeAlt } from 'react-icons/bi';
import { BsMusicNoteList } from 'react-icons/bs';
import { FaGuitar, FaCompactDisc } from 'react-icons/fa';
import Switch from './Switch';
import Tippy from '@tippyjs/react';
import 'tippy.js/themes/light.css';
import 'tippy.js/dist/tippy.css';

const Navbar: React.FC = () => {
	const [theme, setTheme] = useState<string>();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { accessToken } = useAuth();
	const { currentMode } = useTheme(theme);

	const handleTheme = () => {
		setTheme(currentMode === 'light' ? 'dark' : 'light');
	};

	const handleLogout = () => {
		dispatch(resetAuth());
		navigate('/');
	};

	return (
		<nav className="navbar">
			<div className="navbar__container">
				<Link to="/" className="navbar__logo">
					<RiFolderMusicFill size={35} />
					<span className="navbar__title">Spotter</span>
				</Link>
				<div className="navbar__list__container">
					<ul className="navbar__list">
						{accessToken ? (
							<>
								<li className="navbar__list__item">
									<Tippy content="Home" theme={currentMode} arrow={false} delay={[300, 200]}>
										<Link to="/" className="navbar__icon">
											<BiHomeAlt size={24} />
										</Link>
									</Tippy>
								</li>
								<li className="navbar__list__item">
									<Tippy content="Top Tracks" theme={currentMode} arrow={false} delay={[300, 200]}>
										<Link to="/track/top" className="navbar__icon">
											<BsMusicNoteList size={24} />
										</Link>
									</Tippy>
								</li>
								<li className="navbar__list__item">
									<Tippy content="Top Artists" theme={currentMode} arrow={false} delay={[300, 200]}>
										<Link to="/artist/top" className="navbar__icon">
											<FaGuitar size={24} />
										</Link>
									</Tippy>
								</li>
								<li className="navbar__list__item">
									<Tippy content="Top Genres" theme={currentMode} arrow={false} delay={[300, 200]}>
										<Link to="/genre/top" className="navbar__icon">
											<FaCompactDisc size={24} />
										</Link>
									</Tippy>
								</li>
								<li className="navbar__list__item">
									<Tippy
										content={`Switch mode (current mode is ${currentMode})`}
										theme={currentMode}
										arrow={false}
										delay={[300, 200]}
									>
										<div className="navbar__icon" onClick={handleTheme}>
											<Switch />
										</div>
									</Tippy>
								</li>
								<li className="navbar__list__item">
									<Tippy content="Profile" theme={currentMode} arrow={false} delay={[300, 200]}>
										<Link to="/profile" className="navbar__icon">
											<BiUser size={24} />
										</Link>
									</Tippy>
								</li>
								<li onClick={handleLogout} className="navbar__list__item">
									<Tippy content="Log out" theme={currentMode} arrow={false} delay={[300, 200]}>
										<div className="navbar__icon">
											<BiLogOut size={24} />
										</div>
									</Tippy>
								</li>
							</>
						) : (
							<>
								<li className="navbar__list__item">
									<Tippy
										content={`Switch mode (current mode is ${currentMode})`}
										theme={currentMode}
										arrow={false}
										delay={[300, 200]}
									>
										<div className="navbar__icon" onClick={handleTheme}>
											<Switch />
										</div>
									</Tippy>
								</li>
								<li>
									<Tippy content="Log In" theme={currentMode} arrow={false} delay={[300, 200]}>
										<a href={authURL} className="navbar__icon">
											<BiLogIn size={24} />
										</a>
									</Tippy>
								</li>
							</>
						)}
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
