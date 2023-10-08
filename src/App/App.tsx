import ModalContainer from '@Containers/ModalContainer/ModalContainer';
import { Router } from '@Router';

import './App.scss';

interface PropsType {
	isModalOpen: boolean;
}

function App({ isModalOpen }: PropsType) {
	return (
		<>
			<Router />
			{isModalOpen && <ModalContainer />}
		</>
	);
}

export default App;
