declare const wait: (duration?: number) => Promise<void>;
declare function waitUntil<RETURN_TYPE>(fn: () => RETURN_TYPE, duration?: number, error?: Error): Promise<RETURN_TYPE>;
declare function waitUntilAsync<RETURN_TYPE>(fn: () => Promise<RETURN_TYPE>, duration?: number, error?: Error): Promise<RETURN_TYPE>;
declare class TimeoutError extends Error {
    isTimeout: boolean;
}
declare function isTimeoutError(error: Error): error is TimeoutError;

export { TimeoutError, isTimeoutError, wait, waitUntil, waitUntilAsync };
