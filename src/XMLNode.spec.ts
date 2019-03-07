import _ from "lodash";

import { XMLNode } from "./XMLNode";

describe("XMLNode", function() {
  function xmlFactory() {
    const xmlNode = new XMLNode("doc", XMLNode.XMLNodeType.Element);
    const deep1number1 = new XMLNode("elem1", XMLNode.XMLNodeType.Element);
    const deep1number2 = new XMLNode("elem2", XMLNode.XMLNodeType.Element);

    return [xmlNode, deep1number1, deep1number2];
  }

  function makeXMLTree() {
    const [doc, child1, child2] = xmlFactory();
    doc.append(child1);
    doc.append(child2);
    return [doc, child1, child2];
  }

  it("create node", function() {
    const xmlNode = new XMLNode("doc", XMLNode.XMLNodeType.Element);
    expect(xmlNode.name).toBeTruthy();
    expect(xmlNode.type).toEqual(XMLNode.XMLNodeType.Element);
  });

  describe("append()", function() {
    it("should be correctly inserted", function() {
      const [doc, child1, child2] = makeXMLTree();
      expect(doc.childNodes[0]).toEqual(child1);
      expect(doc.childNodes[1]).toEqual(child2);
    });

    it("should only move child order", function() {
      const [doc, child1, child2] = makeXMLTree();
      doc.append(child1);
      expect(doc.childNodes[0]).toEqual(child2);
      expect(doc.childNodes[1]).toEqual(child1);
    });
  });

  it("forEach()", function() {
    const [doc, child1, child2] = makeXMLTree();
    const path: XMLNode[] = [];
    doc.forEach(node => {
      path.push(node);
    });

    expect(path[0]).toEqual(child1);
    expect(path[1]).toEqual(child2);
  });

  describe("removeChild()", function() {
    it("should correctly removed", function() {
      const [doc, , child2] = makeXMLTree();
      doc.removeChild(child2);
      expect(doc.childNodes.length).toEqual(1);
      expect(doc.childNodes.includes(child2)).toBeFalsy();
    });

    it("should do nothing", function() {
      const [doc, child1, child2] = makeXMLTree();
      const noChild = new XMLNode("noInTree", XMLNode.XMLNodeType.Element);
      doc.removeChild(noChild);
      expect(doc.childNodes.length).toEqual(2);
      expect(doc.childNodes[0]).toEqual(child1);
      expect(doc.childNodes[1]).toEqual(child2);
    });
  });

  describe("setAttribute", function() {
    it("should set attribute correctly", function() {
      const [doc] = xmlFactory();
      doc.setAttribute("key1", "value1");
      expect(doc.attrs["key1"]).toBeTruthy();
    });

    it("should update correctly", function() {
      const [doc] = xmlFactory();
      doc.setAttribute("key1", "value1");
      doc.setAttribute("key1", "value2");
      expect(doc.attrs["key1"]).toEqual("value2");
      expect(Object.keys(doc.attrs).length).toEqual(1);
    });

    it("should be setten truthy", function() {
      const [doc] = xmlFactory();
      doc.setAttribute("key1", "");
      expect(doc.attrs["key1"]).toEqual(true);
    });
  });

  describe("removeAttribute", function() {
    it("should be remove correctly", function() {
      const [doc] = xmlFactory();
      doc.setAttribute("key1", "");
      doc.setAttribute("key2", "");
      doc.removeAttribute("key1");

      expect(doc.attrs["key1"]).toBeFalsy();
      expect(doc.attrs["key2"]).toBeTruthy();
    });

    it("should not delete not exist attr", function() {
      const [doc] = xmlFactory();
      doc.setAttribute("key1", "");
      doc.removeAttribute("key2");
      expect(doc.attrs["key1"]).toBeTruthy();
      expect(Object.keys(doc.attrs).length).toEqual(1);
    });
  });

  describe("toJSON", function() {
    it("should toJSON correctly", function() {
      const node = new XMLNode("p", XMLNode.XMLNodeType.Element);

      expect(
        _.isEqual(
          node.toJSON(),
          {
            name: 'p',
            type: XMLNode.XMLNodeType.Element,
            attrs: {},
            content: null,
            childNodes: []
          }
        )
      ).toBeTruthy();
    });

    it('should build json correctly when has children', function () {
      const [doc, child1, child2] = xmlFactory();
      doc.append(child1);
      doc.append(child2);

      const root: any = doc.toJSON();
      const child1JSON = {
        name: 'elem1',
        type: XMLNode.XMLNodeType.Element,
        attrs: {},
        content: null,
        childNodes: []
      };
      const child2JSON = {
        name: 'elem2',
        type: XMLNode.XMLNodeType.Element,
        attrs: {},
        content: null,
        childNodes: []
      }
      const docJSON = {
        name: 'doc',
        type: XMLNode.XMLNodeType.Element,
        attrs: {},
        content: null,
        childNodes: [
          child1JSON,
          child2JSON
        ]
      }

      expect(
        _.isEqual(
          root,
          docJSON
        )
      ).toBeTruthy();
    })
  });
});
