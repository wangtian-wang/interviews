class ArrangeClass {
  constructor(name) {
    this.name = name;
    this.delay = 0;
  }

  exeute(work) {
    console.log(`${this.name} wake up doing ${work}`);
    return this;
  }
  sleep(ms) {
    this.delay = ms;
    return this;
  }
  wait() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, this.delay);
    });
  }
  async start() {
    await this.wait();
    console.log(11111);
    console.log(22222);
  }
}

const arranging = (name) => {
  return new ArrangeClass(name);
};

arranging("bob").exeute("coding").sleep(1000).start();
