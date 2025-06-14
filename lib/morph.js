const ELEMENT_NODE = 1;
const TEXT_NODE = 3;
const COMMENT_NODE = 8;

// diff elements and apply the resulting patch to the old node
// (obj, obj) -> null
export default function morph(newNode, oldNode, events) {
  const { nodeType, nodeName } = newNode;

  if (nodeType === ELEMENT_NODE) {
    copyAttrs(newNode, oldNode);
  }

  if (nodeType === TEXT_NODE || nodeType === COMMENT_NODE) {
    if (oldNode.nodeValue !== newNode.nodeValue) {
      oldNode.nodeValue = newNode.nodeValue;
    }
  }

  // Some DOM nodes are weird
  // https://github.com/patrick-steele-idem/morphdom/blob/master/src/specialElHandlers.js
  switch (nodeName) {
    case 'INPUT':
      updateInput(newNode, oldNode);
      break;
    case 'OPTION':
      updateOption(newNode, oldNode);
      break;
    case 'TEXTAREA':
      updateTextarea(newNode, oldNode);
      break;
  }

  if (events) {
    copyEvents(newNode, oldNode, events);
  }
}

function copyAttrs(newNode, oldNode) {
  const oldAttrs = oldNode.attributes;
  const newAttrs = newNode.attributes;

  for (let i = newAttrs.length - 1; i >= 0; --i) {
    const attr = newAttrs[i];
    let attrName = attr.name;
    const attrNamespaceURI = attr.namespaceURI;
    const attrValue = attr.value;
    if (attrNamespaceURI) {
      attrName = attr.localName || attrName;
      const fromValue = oldNode.getAttributeNS(attrNamespaceURI, attrName);
      if (fromValue !== attrValue) {
        oldNode.setAttributeNS(attrNamespaceURI, attrName, attrValue);
      }
    } else {
      if (!oldNode.hasAttribute(attrName)) {
        oldNode.setAttribute(attrName, attrValue);
      } else {
        const fromValue = oldNode.getAttribute(attrName);
        if (fromValue !== attrValue) {
          // apparently values are always cast to strings, ah well
          if (attrValue === 'null' || attrValue === 'undefined') {
            oldNode.removeAttribute(attrName);
          } else {
            oldNode.setAttribute(attrName, attrValue);
          }
        }
      }
    }
  }

  // Remove any extra attributes found on the original DOM element that
  // weren't found on the target element.
  for (let j = oldAttrs.length - 1; j >= 0; --j) {
    const attr = oldAttrs[j];
    if (attr.specified !== false) {
      let attrName = attr.name;
      const attrNamespaceURI = attr.namespaceURI;

      if (attrNamespaceURI) {
        attrName = attr.localName || attrName;
        if (!newNode.hasAttributeNS(attrNamespaceURI, attrName)) {
          oldNode.removeAttributeNS(attrNamespaceURI, attrName);
        }
      } else {
        if (!newNode.hasAttributeNS(null, attrName)) {
          oldNode.removeAttribute(attrName);
        }
      }
    }
  }
}

function copyEvents(newNode, oldNode, events) {
  for (const ev of events) {
    if (newNode[ev]) {
      // if new element has a whitelisted attribute
      oldNode[ev] = newNode[ev]; // update existing element
    } else if (oldNode[ev]) {
      // if existing element has it and new one doesnt
      oldNode[ev] = undefined; // remove it from existing element
    }
  }
}

function updateOption(newNode, oldNode) {
  updateAttribute(newNode, oldNode, 'selected');
}

// The "value" attribute is special for the <input> element since it sets the
// initial value. Changing the "value" attribute without changing the "value"
// property will have no effect since it is only used to the set the initial
// value. Similar for the "checked" attribute, and "disabled".
function updateInput(newNode, oldNode) {
  const newValue = newNode.value;
  const oldValue = oldNode.value;

  updateAttribute(newNode, oldNode, 'checked');
  updateAttribute(newNode, oldNode, 'disabled');

  // The "indeterminate" property can not be set using an HTML attribute.
  // See https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox
  if (newNode.indeterminate !== oldNode.indeterminate) {
    oldNode.indeterminate = newNode.indeterminate;
  }

  // Persist file value since file inputs can't be changed programatically
  if (oldNode.type === 'file') {
    return;
  }

  if (newValue !== oldValue) {
    oldNode.setAttribute('value', newValue);
    oldNode.value = newValue;
  }

  if (newValue === 'null') {
    oldNode.value = '';
    oldNode.removeAttribute('value');
  }

  if (!newNode.hasAttributeNS(null, 'value')) {
    oldNode.removeAttribute('value');
  } else if (oldNode.type === 'range') {
    // this is so elements like slider move their UI thingy
    oldNode.value = newValue;
  }
}

function updateTextarea(newNode, oldNode) {
  const newValue = newNode.value;
  if (newValue !== oldNode.value) {
    oldNode.value = newValue;
  }

  if (oldNode.firstChild && oldNode.firstChild.nodeValue !== newValue) {
    // Needed for IE. Apparently IE sets the placeholder as the
    // node value and vise versa. This ignores an empty update.
    if (newValue === '' && oldNode.firstChild.nodeValue === oldNode.placeholder) {
      return;
    }

    oldNode.firstChild.nodeValue = newValue;
  }
}

function updateAttribute(newNode, oldNode, name) {
  if (newNode[name] !== oldNode[name]) {
    oldNode[name] = newNode[name];
    if (newNode[name]) {
      oldNode.setAttribute(name, '');
    } else {
      oldNode.removeAttribute(name);
    }
  }
}
