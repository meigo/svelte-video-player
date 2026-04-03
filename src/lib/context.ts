import { createContext } from 'svelte';
import type { PlayerConfig } from './types.js';

export const [getPlayerConfig, setPlayerConfig] = createContext<PlayerConfig>();
