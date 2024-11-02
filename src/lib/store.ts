import { atom } from 'jotai';
import type { User } from './types';

export const userAtom = atom<User | null>(null);
export const isAuthenticatedAtom = atom<boolean>(false);
export const isLoadingAtom = atom<boolean>(false);
export const errorAtom = atom<string | null>(null);