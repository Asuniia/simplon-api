export function routeHandler<T>(Controller: new () => T, method: keyof T) {
    const instance = new Controller();
    const handler = instance[method];

    if (typeof handler !== "function") {
        throw new Error(`${String(method)} is not a function on ${Controller.name}`);
    }

    return handler.bind(instance);
}
