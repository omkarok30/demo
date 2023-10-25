export const debouncePromise = (
  inner,
  ms = 0,
  reject = false,
  rejectionBuilder
) => {
  let timer = null;
  let resolves = [];

  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      const resolvesLocal = resolves;
      resolves = [];
      if (reject) {
        const resolve = resolvesLocal.pop();
        resolve.res(inner(...args));
        resolvesLocal.forEach((r, _i) => {
          !!rejectionBuilder ? r.rej(rejectionBuilder(r.args)) : r.rej(r.args);
        });
      }
      else {
        resolvesLocal.forEach((r) => r.res(inner(...args)));
      }
      resolves = [];
    }, ms);
    return new Promise((res, rej) =>
      resolves.push({ res, rej, args: [...args] }),
    );
  };
};
