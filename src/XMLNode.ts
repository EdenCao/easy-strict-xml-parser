export enum XMLNodeType {
  Element,
  Text
}

type XMLNodeEachCallback = (node: XMLNode) => void;


export class XMLNode {
  public static XMLNodeType = XMLNodeType;

  public static createTextNode(content: string) {
    return new XMLNode('text', XMLNodeType.Text, content);
  }

  public name: string = '';
  public type: XMLNodeType | null = null;
  // value can only be string or truthy, cannot be falsy
  public attrs: {
    [index: string]: string | boolean
  } = {}
  public content: string | null = null;
  public childNodes: XMLNode[] = [];

  constructor(name: string, type: XMLNodeType, content: string | null = null) {
    this.name = name;
    this.type = type;
    this.content = content;
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
    this.attrs[key] = value || true;
  }

  public removeAttribute(key: string): void {
    if (key in this.attrs) {
      const attrs = {} as any;
      for (let k of Object.getOwnPropertyNames(this.attrs)) {
        if (k !== key) attrs[k] = this.attrs[k];
      }
      this.attrs = attrs;
    }
  }

  public toJSON(): object {
    const childNodes: object[] = [];
    // get all of the child json
    this.forEach((node) => {
      childNodes.push(node.toJSON());
    });

    const selfJSON = buildNodeJSON(this)

    selfJSON.childNodes = childNodes;

    return selfJSON;
  }
}

function buildNodeJSON(node: XMLNode) {
  return {
    name: node.name,
    type: node.type,
    attrs: {...node.attrs},
    content: node.content,
    childNodes: [] as object[]
  }
}