// SingleRoom is data structure that accepts only one Promise at a time. When added Promise is resolved, it will remove from the container and be ready accept next Promise.

// Signle room handle async task

type AsyncTask = () => Promise<any>;
type RoomItem = {
  timestamp: number;
  task: AsyncTask;
};
export class SingleRoom {
  private room: RoomItem | null = null;

  isEmpty() {
    return this.room === null;
  }

  roomItem(task: AsyncTask): RoomItem {
    return {
      timestamp: Date.now(),
      task,
    };
  }

  clear() {
    this.room = null;
  }

  add(promise: AsyncTask) {
    if (this.room === null) {
      this.room = this.roomItem(promise);
      this.room.task().finally(() => {
        this.clear();
      });
    }
  }

  async awaitableAdd(promise: AsyncTask) {
    if (this.room === null) {
      try {
        this.room = this.roomItem(promise);
        await this.room.task();
      } catch (error) {
        console.error(error);
      } finally {
        this.clear();
      }
    }
  }
}
