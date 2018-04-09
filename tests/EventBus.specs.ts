import { EventBus, message } from "./../src/EventBus";
import { expect } from "chai";
import "mocha";

describe("EventBus", () => {

    let eb: EventBus;

    @message
    class SomeEvent { }

    @message
    class AnotherEvent { }

    beforeEach(() => {
        eb = new EventBus();
    });

    it("not be null", () => {
        expect(eb).not.null;
    });

    describe("Subscribe", () => {

        it("returns a subscription", () => {
            let s = eb.Subscribe(SomeEvent, () => {});
            expect(s).not.null;
        });

        it("can subscribe before a message is created", () => {
            @message
            class NewEvent { }
            let counter = 0;

            let s = eb.Subscribe(NewEvent, () => { counter++;});
            expect(s).not.null;
            eb.Publlish(new NewEvent());
            expect(counter).to.equal(1);
        });
    });

    describe("Publish", () => {
        it("receives a message when published", () => {
            var receivedCount = 0;
            let s = eb.Subscribe(SomeEvent, () => { receivedCount++; });
            eb.Publlish(new SomeEvent());
            expect(receivedCount).equal(1);
        });

        it("can publish before a message is created", () => {
            @message
            class NewEvent { }
            let counter = 0;

            let s = eb.Subscribe(NewEvent, () => { counter++;});
            expect(s).not.null;
            eb.Publlish(new NewEvent());
            expect(counter).to.equal(1);
        });

        it("stops receiving messages when unsubscribed", () => {
            // arrange
            var receivedCount = 0;
            let s = eb.Subscribe(SomeEvent, () => { receivedCount++; });

            // act
            eb.Publlish(new SomeEvent());
            s.Dispose();
            eb.Publlish(new SomeEvent());

            // assert
            expect(receivedCount).equal(1);
        });

        it("receives messages while subscribed", () => {
            // arrange
            var receivedCount = 0;
            let s = eb.Subscribe(SomeEvent, () => { receivedCount++; });

            // act
            eb.Publlish(new SomeEvent());
            eb.Publlish(new SomeEvent());

            // assert
            expect(receivedCount).equal(2);
        });

        it("allows multiple subscription channels", () => {
            // arrange
            var receivedCount = 0;
            var anotherCount = 0;

            let sr = eb.Subscribe(SomeEvent, () => { receivedCount++; });
            let sa = eb.Subscribe(AnotherEvent, () => { anotherCount++; });

            // act
            eb.Publlish(new SomeEvent());
            eb.Publlish(new AnotherEvent());

            // assert
            expect(receivedCount).equal(1);
            expect(anotherCount).equal(1);
        });
    });
});