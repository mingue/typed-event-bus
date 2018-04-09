export interface IEventBus {
    Publlish<T>(event: T): void;
    Subscribe<T>(event : new() => T, handler: IObserver<T>) : ISubscription;
}

export class EventBus implements IEventBus {
    private eventHandlers: object;

    constructor() {
        this.eventHandlers = new Object();
    }

    Publlish<T>(event: T): void {
        let e = event as any;
        let subscribers = this.GetSubscribers(e);

        if (subscribers === undefined) {
            return;
        }

        subscribers.forEach(s => {
            s(e);
        });
    }

    Subscribe<T>(event : new() => T, handler: IObserver<T>) : ISubscription {
        let e = new event() as any;
        let subscribers = this.GetSubscribers(e);

        if (subscribers === undefined) {
            this.eventHandlers[e._typedEbMeta.key] = [];
            subscribers = this.eventHandlers[e._typedEbMeta.key];
        }

        subscribers.push(handler);

        return new Subscription(() => {
            this.RemoveHandler(subscribers, handler);
        });
    }

    private RemoveHandler<T>(subscribers: Array<IObserver<T>>, handler: IObserver<T>) {
        var index = subscribers.indexOf(handler);
        if (index > -1) {
            subscribers.splice(index, 1);
        }
    }

    private GetSubscribers<T>(event: any): Array<IObserver<T>> {
        let subscribers = this.eventHandlers[event._typedEbMeta.key];
        return subscribers;
    }
}

let messageIndex = 0;
export function message(constructor: Function) {
    console.warn("Updating message index");
    messageIndex++;
    constructor.prototype._typedEbMeta = constructor.prototype._typedEbMeta || {};
    constructor.prototype._typedEbMeta.key = messageIndex;
}

export type IObserver<T> = (n: T) => void;

export interface ISubscription {
    Dispose() : void;
}

class Subscription implements ISubscription {
    constructor(private unsubscribe: Function) {
    }
    Dispose(): void {
        this.unsubscribe();
    }
}