
import { useEffect } from 'react';
import { EventEmitter } from 'events';
const eventBus = new EventEmitter();



export const useEventBusOn = (eventName: string, callback: (...args: any[]) => void) => {
    useEffect(() => {
        eventBus.on(eventName, callback);
        return () => {
            eventBus.off(eventName, callback);
        };
    }, [eventName, callback]);
}

export const useEventBusOnce = (eventName: string, callback: (...args: any[]) => void) => {
    useEffect(() => {
        eventBus.once(eventName, callback);
        return () => {
            eventBus.off(eventName, callback);
        };
    }, [eventName, callback]);
}

export const useEventBusEmit = (eventName: string, ...args: any[]) => {
    useEffect(() => {
        eventBus.emit(eventName, ...args);
    }, [eventName, ...args]);
}

export const useEventBusRemoveAllListeners = (eventName: string) => {
    useEffect(() => {
        eventBus.removeAllListeners(eventName);
    }, [eventName]);
}