let pending = false;
let callBacks = [];
function flushCallBacks() {
  pending = false;
  for (let i = 0; i < callBacks.length; i++) {
    callBacks[i]();
  }
  callBacks.length = 0;
}

function nextTick(cb) {
  callBacks.push(cb);
  if (!pending) {
    pending = true;
    Promise.resolve().then(flushCallBacks);
  }
}
nextTick(() => {
  console.log("1111");
});
nextTick(() => {
  console.log("22222");
});
