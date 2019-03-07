import { XMLNode } from '../XMLNode';

export const xmlTemplate = `<p></p>`

export const xmlNode = {
  name: 'p',
  type: XMLNode.XMLNodeType.Element,
  attrs: {},
  childNodes: [],
}


export const xmlWithAttrs = `<p test="asdf"></p>`

export const xmlNodeWithAttrs = {
  name: 'p',
  type: XMLNode.XMLNodeType.Element,
  attrs: {
    test: 'asdf'
  },
  childNodes: []
}

export const xmlWithStringChild = `<p>asdf</p>`;

export const xmlNodeWithStringChild = {
  name: 'p',
  type: XMLNode.XMLNodeType.Element,
  attrs: {},
  childNodes: [
    {
      name: 'text',
      content: 'asdf',
      attrs: {},
      childNodes: [],
      type: XMLNode.XMLNodeType.Text
    }
  ]
}

export const xmlWithElementChild = `<p><b></b><p>`

export const xmlNodeWithElementChild = {
  name: 'p',
  type: XMLNode.XMLNodeType.Element,
  content: null,
  attrs: {},
  childNodes: [
    {
      name: 'b',
      content: null,
      attrs: {},
      childNodes: [],
      type: XMLNode.XMLNodeType.Text
    }
  ]
}