// Diego Berrocal <cestdiego@gmail.com>
// Utils library for other functions

export const debounce = <F extends (...args: any[]) => any>(func: F, waitFor: number) => {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return (...args: Parameters<F>): void => {
    if (timeout !== null) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => func(...args), waitFor);
  };
};

export type DeepMergeable = { [key: string]: any };

export function isObject(item: any): item is DeepMergeable {
  return item && typeof item === 'object' && !Array.isArray(item);
}

export function deepMerge<T extends DeepMergeable>(target: T, ...sources: DeepMergeable[]): T {
  if (!sources.length) return target;
  const source = sources.shift();

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} });
        deepMerge(target[key], source[key]);
      } else if (Array.isArray(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: [] });
        target[key] = [...target[key], ...source[key]];
      } else {
        Object.assign(target, { [key]: source[key] });
      }
    }
  }

  return deepMerge(target, ...sources);
}
