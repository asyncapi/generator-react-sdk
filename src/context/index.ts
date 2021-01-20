import { render } from "../renderer";
import { PROVIDER_SYMBOL } from "../constants";

export interface Context<T> {
  id: symbol;
  Provider: (props: { value: T; children: any }) => any;
  defaultValue?: T;
}

export function createContext<T>(defaultValue?: T): Context<T> {
  const id = Symbol("context");
  return { id, Provider: createProvider(id), defaultValue };
}

interface CurrentContext<T = any> {
  id: symbol | null;
  value: any;
  parent: CurrentContext | null,
}
let currentContext: CurrentContext = { id: null, value: undefined, parent: null };

export function useContext<T>(context: Context<T>): T {
  return lookupContext(currentContext, context.id)?.value || context.defaultValue;
}

function createProvider(id: symbol) {
  const fn = function provider(props: { value: unknown; children: any }) {
    const previous = setCurrentContext(id, props.value)
    try {
      return render(props.children);
    } finally {
      currentContext = previous;
    }
  };
  fn.$$typeof = PROVIDER_SYMBOL;
  return fn;
}

function lookupContext(current: CurrentContext, id: symbol): CurrentContext | null {
  if (current.id === id) {
    return current;
  }
  return current.parent && lookupContext(current.parent, id);
}

function setCurrentContext(id: symbol, value: unknown): CurrentContext {
  const previous = currentContext;
  currentContext = { id, value, parent: previous };
  return previous;
}
