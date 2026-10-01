import type { Role } from '@/features/auth/types/auth.types';
import {create} from 'zustand';

interface EspaceState {
    espace:Role;
    changeEspace: (espace: Role) => void;
}

export const useEspace = create<EspaceState>((set) => ({
    espace: "CLIENT",
    changeEspace: (espace) => set({
        espace
    })
}))
