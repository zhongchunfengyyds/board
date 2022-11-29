
import { useEffect } from 'react';
import { EventEmitter } from 'events';

const eventBus = new EventEmitter();

type FNC = (eventName: string, callback: (...args: any[]) => void) => void

// RefreshList 刷新列表

export const useEventBus = () => {
    const emit = (eventName: string, ...args: any[]) => {
        eventBus.emit(eventName, ...args)
    }
    return {
        emit
    }
}

export const removeEventBus: FNC = (eventName, callback) => {
    eventBus.on(eventName, callback)
}

export const useEventBusOn: FNC = (eventName, callback) => {
    useEffect(() => {
        eventBus.on(eventName, callback)
        return () => {
            eventBus.off(eventName, callback)
        };
    }, [eventName, callback])
}

export const useEventBusOnce: FNC = (eventName, callback) => {
    useEffect(() => {
        eventBus.once(eventName, callback)
        return () => {
            eventBus.off(eventName, callback)
        };
    }, [eventName, callback])
}

export const useEventBusRemoveAllListeners = (eventName: string) => {
    useEffect(() => {
        eventBus.removeAllListeners(eventName)
    }, [eventName])
}