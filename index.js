const assert = require('nanoassert');
const morph = require('./lib/morph');

const TEXT_NODE = 3;
// var DEBUG = false

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
function nanomorph(oldTree, newTree, options = {}) {
  assert.equal(typeof oldTree, 'object', 'nanomorph: oldTree should be an object');
  assert.equal(typeof newTree, 'object', 'nanomorph: newTree should be an object');

  if (options.childrenOnly) {
    updateChildren(newTree, oldTree);
    return oldTree;
  }

  assert.notEqual(
    newTree.nodeType,
    11,
    'nanomorph: newTree should have one root node (which is not a DocumentFragment)'
  );

  return walk(newTree, oldTree);
}

// Walk and morph a dom tree
function walk(newNode, oldNode) {
  if (!oldNode) {
    return newNode;
  } else if (!newNode) {
    return null;
  } else if (newNode.isSameNode?.(oldNode)) {
    return oldNode;
  } else if (
    newNode.tagName !== oldNode.tagName ||
    newNode.dataset?.nanomorphComponentId !== oldNode.dataset?.nanomorphComponentId
  ) {
    return newNode;
  } else {
    morph(newNode, oldNode);
    updateChildren(newNode, oldNode);
    return oldNode;
  }
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

      // There is no new child, remove old
    } else if (!newChild) {
      oldNode.removeChild(oldChild);
      i--;

      // There is no old child, add new
    } else if (!oldChild) {
      oldNode.appendChild(newChild);
      offset++;

      // Both nodes are the same, morph
    } else if (same(newChild, oldChild)) {
      const morphed = walk(newChild, oldChild);
      if (morphed !== oldChild) {
        oldNode.replaceChild(morphed, oldChild);
        offset++;
      }

      // Both nodes do not share an ID or a placeholder, try reorder
    } else {
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

        // It's safe to morph two nodes in-place if neither has an ID
      } else if (!newChild.id && !oldChild.id) {
        const morphed = walk(newChild, oldChild);
        if (morphed !== oldChild) {
          oldNode.replaceChild(morphed, oldChild);
          offset++;
        }

        // Insert the node at the index if we couldn't morph or find a matching node
      } else {
        oldNode.insertBefore(newChild, oldChild);
        offset++;
      }
    }
  }
}

function same(a, b) {
  if (a.id) { return a.id === b.id; }
  if (a.isSameNode) { return a.isSameNode(b); }
  if (a.tagName !== b.tagName) { return false; }
  if (a.type === TEXT_NODE) { return a.nodeValue === b.nodeValue; }
  return false;
}
