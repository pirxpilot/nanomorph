const assert = require('assert');
const morph = require('./lib/morph');

const TEXT_NODE = 3;

module.exports = nanomorph;

// Morph one tree into another tree
//
// no parent
//   -> same: diff and walk children
//   -> not same: replace and return
// old node doesn't exist
//   -> insert new node
// new node doesn't exist
//   -> delete old node
// nodes are not the same
//   -> diff nodes and apply patch to old node
// nodes are the same
//   -> walk all child nodes and append to old node
function nanomorph(oldTree, newTree, { childrenOnly, morphId = 'morph', events } = {}) {
  assert(typeof oldTree === 'object', 'nanomorph: oldTree should be an object');
  assert(typeof newTree === 'object', 'nanomorph: newTree should be an object');

  if (childrenOnly) {
    updateChildren(newTree, oldTree);
    return oldTree;
  }

  assert(
    newTree.nodeType !== 11,
    'nanomorph: newTree should have one root node (which is not a DocumentFragment)'
  );

  return walk(newTree, oldTree);

  // Walk and morph a dom tree
  function walk(newNode, oldNode) {
    if (!oldNode) {
      return newNode;
    }
    if (!newNode) {
      return;
    }
    if (newNode.isSameNode?.(oldNode)) {
      return oldNode;
    }
    if (
      newNode.tagName !== oldNode.tagName ||
      newNode.dataset?.[morphId] !== oldNode.dataset?.[morphId]
    ) {
      return newNode;
    }
    morph(newNode, oldNode, events);
    updateChildren(newNode, oldNode);
    return oldNode;
  }

  // Update the children of elements
  // (obj, obj) -> null
  function updateChildren(newNode, oldNode) {
    // The offset is only ever increased, and used for [i - offset] in the loop
    let offset = 0;

    for (let i = 0; ; i++) {
      const oldChild = oldNode.childNodes[i];
      const newChild = newNode.childNodes[i - offset];
      // Both nodes are empty, do nothing
      if (!oldChild && !newChild) {
        break;
      }

      // There is no new child, remove old
      if (!newChild) {
        oldNode.removeChild(oldChild);
        i--;
        continue;
      }

      // There is no old child, add new
      if (!oldChild) {
        oldNode.appendChild(newChild);
        offset++;
        continue;

      }
      // Both nodes are the same, morph
      if (same(newChild, oldChild)) {
        const morphed = walk(newChild, oldChild);
        if (morphed !== oldChild) {
          oldNode.replaceChild(morphed, oldChild);
          offset++;
        }
        continue;
      }
      // Both nodes do not share an ID or a placeholder, try reorder
      let oldMatch = null;

      // Try and find a similar node somewhere in the tree
      for (let j = i; j < oldNode.childNodes.length; j++) {
        if (same(oldNode.childNodes[j], newChild)) {
          oldMatch = oldNode.childNodes[j];
          break;
        }
      }

      // If there was a node with the same ID or placeholder in the old list
      if (oldMatch) {
        const morphed = walk(newChild, oldMatch);
        if (morphed !== oldMatch) {
          offset++;
        }
        oldNode.insertBefore(morphed, oldChild);
        continue;
      }

      // It's safe to morph two nodes in-place if neither has an ID
      if (!newChild.id && !oldChild.id) {
        const morphed = walk(newChild, oldChild);
        if (morphed !== oldChild) {
          oldNode.replaceChild(morphed, oldChild);
          offset++;
        }
        continue;
      }

      // Insert the node at the index if we couldn't morph or find a matching node
      oldNode.insertBefore(newChild, oldChild);
      offset++;
    }
  }
}

function same(a, b) {
  if (a.id) {
    return a.id === b.id;
  }
  if (a.isSameNode) {
    return a.isSameNode(b);
  }
  if (a.tagName !== b.tagName) {
    return false;
  }
  if (a.type === TEXT_NODE) {
    return a.nodeValue === b.nodeValue;
  }
  return false;
}
