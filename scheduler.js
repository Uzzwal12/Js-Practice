// scheduler.js
class Scheduler {
  constructor() {
    this.jobs = new Map();
    this._nextId = 1;
  }

  _genId() {
    return this._nextId++;
  }

  scheduleAt(dateOrTs, fn) {
    const runAt =
      dateOrTs instanceof Date ? dateOrTs.getTime() : Number(dateOrTs);

    if (Number.isNaN(runAt)) throw new Error("Invalid date/timestamp");

    const now = Date.now();
    const delay = Math.max(0, runAt - now);
    const id = this._genId();

    const timer = setTimeout(() => {
      try {
        fn();
      } catch (error) {
        console.log("error", error);
      }
      this.jobs.delete(id);
    }, delay);

    this.jobs.set(id, { type: "once", timer });
    return id;
  }

  scheduleRecurring(intervalMs, fn) {
    if (intervalMs <= 0) throw new Error("intervalMs must be > 0");
    const id = this._genId();
    let expected = Date.now() + intervalMs;
    let cancelled = false;

    const tick = () => {
      const now = Date.now();
      const drift = now - expected;

      try {
        fn();
      } catch (e) {
        console.error("Recurring job error:", e);
      }

      if (cancelled) return;

      expected += intervalMs;
      const nextDelay = Math.max(0, intervalMs - Math.max(0, drift));
      const timer = setTimeout(tick, nextDelay);

      this.jobs.set(id, {
        type: "recurring",
        timer,
        cancelledRef: () => cancelled,
      });
    };

    const timer = setTimeout(tick, intervalMs);
    this.jobs.set(id, {
      type: "recurring",
      timer,
      cancelledRef: () => cancelled,
    });

    return {
      id,
      _cancel: () => {
        cancelled = true;
      },
    };
  }

  cancel(idObjOrId) {
    const id = typeof idObjOrId === "object" ? idObjOrId.id : idObjOrId;
    const job = this.jobs.get(id);
    if (!job) return false;

    clearTimeout(job.timer); // cancel the active timer
    this.jobs.delete(id);
    return true;
  }
}

module.exports = Scheduler;
