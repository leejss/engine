class Stream extends EventEmitter {
  private isPaused: boolean = false;

  constructor() {
    super();
    this.isPaused = false;
  }

  write(data: any) {
    if (this.isPaused) {
      // Emit an error event because writing to a paused stream should not be allowed.
      this.emit("error", new Error("Stream is paused"));
      return;
    }
    this.emit("data", data);
  }

  end() {
    if (this.isPaused) {
      this.emit("error", new Error("Stream is paused"));
      return;
    }
    this.emit("end");
  }

  pause() {
    this.isPaused = true;
  }

  resume() {
    this.isPaused = false;
    this.emit("resume");
  }

  pipe(destination: Stream): Stream {
    this.on("data", (chunk) => destination.write(chunk));
    this.on("end", () => destination.end());

    return destination; // Returning the destination stream allows for chaining
  }
}

// Usage:

const sourceStream = new Stream();
const destinationStream = new Stream();

sourceStream.pipe(destinationStream);

destinationStream.on("data", (data) => {
  console.log("Destination Received:", data);
});

destinationStream.on("end", () => {
  console.log("Destination Stream Ended.");
});

sourceStream.write("Hello");
sourceStream.pause();
sourceStream.write("This should not be written");

setTimeout(() => {
  sourceStream.resume();
  sourceStream.write("World");
  sourceStream.end();
}, 1000);
