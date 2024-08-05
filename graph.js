class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  // this function accepts a Node instance and adds it to the nodes property on the graph
  addVertex(vertex) {
    this.nodes.add(vertex);
    
    for(const node of vertex.adjacent) {
      if (this.nodes.has(node)) {
        node.adjacent.add(vertex);
      }
    }
  }

  // this function accepts an array of Node instances and adds them to the nodes property on the graph
  addVertices(vertexArray) {
    for (const vertex of vertexArray) {
      this.addVertex(vertex);
    }
  }

  // this function accepts two vertices and updates their adjacent values to include the other vertex
  addEdge(v1, v2) {
    v1.adjacent.add(v2);
    v2.adjacent.add(v1);
  }

  // this function accepts two vertices and updates their adjacent values to remove the other vertex
  removeEdge(v1, v2) {
    v1.adjacent.delete(v2);
    v2.adjacent.delete(v1);
  }

  // this function accepts a vertex and removes it from the nodes property, it also updates any adjacency lists that include that vertex
  removeVertex(vertex) {
    this.nodes.delete(vertex);
    
    for (const node of vertex.adjacent) {
      node.adjacent.delete(vertex);
    }
  }

  // this function returns an array of Node values using DFS
  depthFirstSearch(start) {
    const seen = new Set([start]);
    const stack = [start];
    const results = [];
    
    while (stack.length > 0) {
      const viewingVert = stack.pop();
      const newVerts = viewingVert.adjacent.difference(seen)
      for (const vert of newVerts) {
        stack.push(vert);
        seen.add(vert);
      }
      results.push(viewingVert.value);
    }
    return results;
  }

  // this function returns an array of Node values using BFS
  breadthFirstSearch(start) {
    const seen = new Set([start]);
    const queue = [start];
    const results = [];
    
    while (queue.length > 0) {
      const viewingVert = queue.shift();
      const newVerts = viewingVert.adjacent.difference(seen)
      for (const vert of newVerts) {
        queue.push(vert);
        seen.add(vert);
      }
      results.push(viewingVert.value);
    }
    return results;
  }
}

module.exports = {Graph, Node}