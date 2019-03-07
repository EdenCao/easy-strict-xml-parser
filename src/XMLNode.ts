export enum XMLNodeType {
  Element,
  Text
}

type XMLNodeEachCallback = (node: XMLNode) => void;

export class XMLNode {
  public static XMLNodeType = XMLNodeType;

  public name: string = '';
  public type: XMLNodeType | null = null;
  // value can only be string or truthy, cannot be falsy
  public attrs: Map<string, string | boolean> = new Map();
  public childNodes: XMLNode[] = [];

  constructor(name: string, type: XMLNodeType) {
    this.name = name;
    this.type = type;
  }

  public append(node: XMLNode): void {
    // just move
    this.removeChild(node);

    this.childNodes.push(node);
  }

  public forEach(cb: XMLNodeEachCallback): void {
    this.childNodes.forEach(
      node => cb(node)
    )
  }

  public removeChild(child: XMLNode): void {
    if (this.childNodes.includes(child)) {
      let index = this.childNodes.indexOf(child);
      this.childNodes.splice(index, 1);
    }
  }

  public setAttribute(key: string, value: string): void {
    this.removeAttribute(key);
    this.attrs.set(key, value || true);
  }

  public removeAttribute(key: string): void {
    this.attrs.delete(key)
  }
}