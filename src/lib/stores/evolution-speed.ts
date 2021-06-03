import { writable } from 'svelte/store'

import type { EvolutionSpeed } from '$lib/types'

const localStorageKey = 'gol-evolution-speed'

const createEvolutionSpeed = () => {
    const { subscribe, set } = writable<EvolutionSpeed>('default')

    return {
        subscribe,
        set: (newSpeed: EvolutionSpeed) => {
            localStorage.setItem(localStorageKey, newSpeed)
            set(newSpeed)
        },
    }
}

const evolutionSpeed = createEvolutionSpeed()

const handleLocalStorageChange = () => {
    const theme = localStorage.getItem(localStorageKey) as EvolutionSpeed | null
    if (theme) evolutionSpeed.set(theme)
}

const setupEvolutionSpeed = () => {
    const savedSpeed = localStorage.getItem(localStorageKey) as EvolutionSpeed | null

    if (savedSpeed) evolutionSpeed.set(savedSpeed)
    else evolutionSpeed.set('default')

    window.addEventListener('storage', handleLocalStorageChange)
}

if (typeof window !== 'undefined') setupEvolutionSpeed()

export { evolutionSpeed }
