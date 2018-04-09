# An strongly typed EventBus

- Simple bus for sending strongly typed events between components
- Allows pub/sub based on message types

## Usage

```typescript
//Create a new EventBus, usually once per application.
let eb = new EventBus();

//Define some events to publish and subscribe on
@message //Decorate  with @message to create an event channel
class SomeEvent {
    content: string;

    constructor(content: string) {
        this.content = content;
    }
}

//Subscribe to events
let s = eb.Subscribe(SomeEvent, (e) => {
    console.log(e.content);
});

//Publish new events to the bus
eb.Publlish(new SomeEvent("Hello World!!"));

//Once finish you can unsubscribe to stop receiving messages
s.Dispose();

```