import './App.css';
import StakeCard from './components/StakeCard';
import Navbar from './components/Navbar';
import {useState} from 'react';
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

const App = () => {
	const [alert, setAlert] = useState({
		content: "",
		title: "",
		level: "info",
		isOpen: false,
	});

	const handleAlertClose = () => {
		setAlert((prevAlert) => ({ ...prevAlert, isOpen: false }));
	};

	return (
		<div className="App">
			<Navbar />
			<StakeCard setAlert={setAlert} />
			{alert.isOpen && (
				<Alert className="alert" severity={alert.level} onClose={handleAlertClose}>
					{alert.title && <AlertTitle>{alert.title}</AlertTitle>}
					{alert.content}
				</Alert>
			)}
		</div>
	);
};

export default App;
