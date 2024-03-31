function classNames(obj: Record<string, boolean>) {
  return Object.keys(obj).filter(x => obj[x]).join(" ");
}

export type Render = (props?: Record<string, any>, children?: Child[]) => HTMLElement | undefined;
export type Tag = string | Render;
export type Child = string | HTMLElement | undefined;

export function h(tag: Tag): HTMLElement | undefined;
export function h(tag: Tag, props: Record<string, any>): HTMLElement | undefined;
export function h(tag: Tag, children: Child[]): HTMLElement | undefined;
export function h(tag: Tag, props: Record<string, any>, children: Child[]): HTMLElement | undefined;
export function h(tag: Tag, props?: Record<string, any>, children?: Child[]): HTMLElement | undefined {
  if (typeof tag === "string") {
    const el = document.createElement(tag);

    if (arguments.length == 2 && Array.isArray(arguments[1])) {
      children = arguments[1];
      props = void 0;
    }

    if (props) {
      for (let p in props) {
        if (props[p] === void 0) continue;

        const curr = props[p];
        if (p === "class" && typeof curr === "object") {
          el.className = classNames(curr);
        } else if (p === "style") {
          for (let s in curr) {
            if (curr[s] === void 0) continue;

            el.style.setProperty(s, curr[s]);
          }
        } else if (p.startsWith("on")) {
          const [alpha, ...words] = p.replace("on", "");
          const evtType = alpha.toLowerCase() + words.join("");
          el.addEventListener(evtType, curr, false);
        } else {
          el.setAttribute(p, curr);
        }
      }
    }

    if (children && children.length > 0) {
      const fragment = document.createDocumentFragment();

      for (let c of children) {
        if (c === void 0) continue;

        if (c instanceof HTMLElement) {
          fragment.appendChild(c);
        } else {
          fragment.textContent += c;
        }
      }

      el.appendChild(fragment);
    }

    return el;
  } else if (typeof tag === "function") {
    return tag(props, children);
  }
}

export function applyProps(definition: string[], props?: any) {
  return definition.reduce((acc, curr) => (acc[curr] = props?.[curr], acc), Object.create(null));
}

