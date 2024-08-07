// Diego Berrocal <cestdiego@gmail.com>
// Utils library for other functions

// Define el tipo de la función de debounce
export const debounce = <T extends unknown[]>(func: (...args: T) => void, waitFor: number) => {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return (...args: T): void => {
    if (timeout !== null) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => func(...args), waitFor);
  };
};

// Define el tipo DeepMergeable usando Record y evitando 'any'
type DeepMergeable = Record<string, unknown>;

export function deepMerge<T extends DeepMergeable>(target: T, ...sources: DeepMergeable[]): T {
  if (!sources.length) return target;
  const source = sources.shift();

  if (isObject(target) && isObject(source)) {
    for (const key in source) {
      if (isObject(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} });
        // Casts here are safe because of type checks
        deepMerge(target[key] as DeepMergeable, source[key] as DeepMergeable);
      } else if (Array.isArray(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: [] });
        // Ensure the target[key] is an array before spreading
        (target[key] as unknown[]).push(...(source[key] as unknown[]));
      } else {
        Object.assign(target, { [key]: source[key] });
      }
    }
  }

  // Continue merging if there are more sources
  return deepMerge(target, ...sources);
}

// Verifica si el item es un objeto
function isObject(item: unknown): item is DeepMergeable {
  // Usa un tipo de guardia para asegurar que 'item' es un objeto y no un array
  return typeof item === 'object' && item !== null && !Array.isArray(item);
}
