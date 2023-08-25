import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { RootState } from '@Shared/types';

const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default useAppSelector;
