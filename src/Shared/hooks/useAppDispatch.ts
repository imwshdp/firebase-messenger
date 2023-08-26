import { useDispatch } from 'react-redux';

import { AppDispatch } from '@Shared/types';

const useAppDispatch = () => useDispatch<AppDispatch>();

export default useAppDispatch;
