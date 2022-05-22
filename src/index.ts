import Graph from './graph';
import Node from './attributes/node';
import * as cytoscape from 'cytoscape';
import './styles.css';
import './modal.css';

window.oncontextmenu = (event: Event) => {
  event.preventDefault();
};

// cytoscape container
const container: HTMLElement = document.getElementById('cy') as HTMLElement;

// modal HTML Elements
const modal: HTMLElement = document.getElementById('modal') as HTMLElement;
const modalContainer: HTMLElement = document.getElementsByClassName('modal-container')[0] as HTMLElement;
const select: HTMLSelectElement = document.getElementById('content-selector') as HTMLSelectElement;
const nodeNameInput: HTMLElement = document.getElementsByClassName('node-name-input')[0] as HTMLElement;
const edgeInfoInput: HTMLElement = document.getElementsByClassName('edge-info')[0] as HTMLElement;
const submitButton: HTMLButtonElement = document.getElementById('submit-button') as HTMLButtonElement;

// algorithms buttons
const dfs: HTMLButtonElement = document.getElementById('dfs') as HTMLButtonElement;
const bfs: HTMLButtonElement = document.getElementById('bfs') as HTMLButtonElement;

// removeModal HTML Elements
const removeButton: HTMLButtonElement = document.getElementById('remove') as HTMLButtonElement;
const removeModal: HTMLElement = document.getElementById('remove-modal') as HTMLElement;
const removeSelect: HTMLSelectElement = document.getElementById('remove-content-selector') as HTMLSelectElement;
const removeNodeInput: HTMLElement = document.getElementsByClassName('node-name-input')[1] as HTMLElement;
const removeEdgeInput: HTMLElement = document.getElementsByClassName('edge-info')[1] as HTMLElement;
const removeSubmitButton: HTMLButtonElement = document.getElementById('remove-submit-button') as HTMLButtonElement;

// dfs modal html elements
const dfsModal: HTMLElement = document.getElementById('dfs-modal') as HTMLElement;
const dfsSubmitButton: HTMLButtonElement = document.getElementById('dfs-submit-button') as HTMLButtonElement;
const bfsModal: HTMLElement = document.getElementById('bfs-modal') as HTMLElement;
const bfsSubmitButton: HTMLButtonElement = document.getElementById('bfs-submit-button') as HTMLButtonElement;

const clearSelectButton: HTMLButtonElement = document.getElementById('clear') as HTMLButtonElement;

const resultLabel: HTMLLabelElement = document.getElementById('result') as HTMLLabelElement;

const dijkstraModal: HTMLElement = document.getElementById('dijkstra-modal') as HTMLElement;
const dijkstra: HTMLButtonElement = document.getElementById('dijkstra') as HTMLButtonElement;
const dijkstraSubmitButton: HTMLButtonElement = document.getElementById('dijkstra-submit-button') as HTMLButtonElement;

const astarModal: HTMLElement = document.getElementById('astar-modal') as HTMLElement;
const astar: HTMLButtonElement = document.getElementById('astar') as HTMLButtonElement;
const astarSubmitButton: HTMLButtonElement = document.getElementById('astar-submit-button') as HTMLButtonElement;

const floydWarshallModal: HTMLElement = document.getElementById('floydWarshall-modal') as HTMLElement;
const floydWarshall: HTMLButtonElement = document.getElementById('floydWarshall') as HTMLButtonElement;
const floydWarshallSubmitButton: HTMLButtonElement = document.getElementById('floydWarshall-submit-button') as HTMLButtonElement;

floydWarshall.addEventListener('click', (event: MouseEvent) => {
  openFloydWarshallModal();
});

floydWarshallModal.addEventListener('click', (event: MouseEvent) => {
  if (event.target === event.currentTarget) {
    closeFloydWarshallModal();
  }
});

floydWarshallSubmitButton.addEventListener('click', (event: MouseEvent) => {
  collectFloydWarshallInformation().then(data => {
    collectFloydWarshallInformationEnd().then(goal => {
      // const goalNode = `#${goal}`
      // const elements = cy.elements();
      // const curPath = elements.aStar({
      //   root: `#${data}`,
      //   goal: goalNode,
      // });
      
      // curPath.path.forEach((elem, index) => {
      //   setTimeout(() => {
      //     if (elem.group() === 'nodes') {
      //       console.log(elem.id());
      //       elem.addClass('selectedNode');
      //     } else {
      //       elem.addClass('selectedEdge');
      //     }
      //   }, 1000*index);
      // });
      // console.log(curPath.distance);
    });
    });
  closeAstarModal();
});

astar.addEventListener('click', (event: MouseEvent) => {
  openAstarModal();
});

astarModal.addEventListener('click', (event: MouseEvent) => {
  if (event.target === event.currentTarget) {
    closeAstarModal();
  }
});

astarSubmitButton.addEventListener('click', (event: MouseEvent) => {
  collectAstarInformation().then(data => {
    collectAstarInformationEnd().then(goal => {
      const goalNode = `#${goal}`
      const elements = cy.elements();
      const curPath = elements.aStar({
        root: `#${data}`,
        goal: goalNode,
      });
      
      curPath.path.forEach((elem, index) => {
        setTimeout(() => {
          if (elem.group() === 'nodes') {
            console.log(elem.id());
            elem.addClass('selectedNode');
          } else {
            elem.addClass('selectedEdge');
          }
        }, 1000*index);
      });
      console.log(curPath.distance);
    });
    });
  closeAstarModal();
});

dijkstra.addEventListener('click', (event: MouseEvent) => {
  openDijkstraModal();
});

dijkstraModal.addEventListener('click', (event: MouseEvent) => {
  if (event.target === event.currentTarget) {
    closeDijkstraModal();
  }
});

dijkstraSubmitButton.addEventListener('click', (event: MouseEvent) => {
  collectDijkstraInformation().then(data => {
    collectDijkstraInformationEnd().then(goal => {
      const goalNode = `#${goal}`;
      const elements = cy.elements();
      const curPath = elements.dijkstra({
        root: `#${data}`,
        directed: true,
      });
      
      const path = curPath.pathTo(cy.$(goalNode.toString()));
      
      path.forEach((elem, index) => {
        setTimeout(() => {
          if (elem.group() === 'nodes') {
            console.log(elem.id());
            elem.addClass('selectedNode');
          } else {
            elem.addClass('selectedEdge');
          }
        }, 1000*index);
      });
      
      const p = curPath.distanceTo(cy.$(goalNode.toString()));
      console.log(p);
    });
  });
  closeDijkstraModal();
});

dfs.addEventListener('click', (event: MouseEvent) => {
  openDfsModal();
});

dfsModal.addEventListener('click', (event: MouseEvent) => {
  if (event.target === event.currentTarget) {
    closeDfsModal();
  }
});

clearSelectButton.addEventListener('click', (event:MouseEvent) => {
    const elements = cy.elements();
    console.log(elements);
    elements.forEach((elem,index) => {
      if (elem.group() === 'nodes') {
        elem.removeClass('selectedNode');
      } else {
        elem.removeClass('selectedEdge');
      }
    });
})

dfsSubmitButton.addEventListener('click', (event: MouseEvent) => {
  collectDfsInformation().then(data => {
    const elements = cy.elements();
    const dfs_path = elements.depthFirstSearch({
      root: `#${data}`,
      directed: true,
    });

    console.log(dfs_path.found);

    resultLabel.innerHTML = dfs_path.path.toString();

    dfs_path.path.forEach((elem,index) => {
      setTimeout(() => {
        if (elem.group() === 'nodes') {
          console.log(elem.id());
          elem.addClass('selectedNode');
        } else {
          elem.addClass('selectedEdge');
        }
      }, 1000*index);
    });
  });
  closeDfsModal();
});

bfs.addEventListener('click', (event: MouseEvent) => {
  openBfsModal();
});

bfsModal.addEventListener('click', (event: MouseEvent) => {
  if (event.target === event.currentTarget) {
    closeBfsModal();
  }
});

bfsSubmitButton.addEventListener('click', (event: MouseEvent) => {
  collectBfsInformation().then(data => {

    const elements = cy.elements();
    const bfs_path = elements.breadthFirstSearch({
      root: `#${data}`,
      directed: true,
    });

    resultLabel.innerHTML = bfs_path.path.toString();

    bfs_path.path.forEach((elem,index) => {
      setTimeout(() => {
        if (elem.group() === 'nodes') {
          console.log(elem.id());
          elem.addClass('selectedNode');
        } else {
          elem.addClass('selectedEdge');
        }
      }, 1000*index);
    });
  });
  closeBfsModal();
});

var cy = cytoscape({
  container,
  elements: [],
  style: [ // the stylesheet for the graph
    {
      selector: 'node',
      style: {'background-color': '#ffa12f', 'label': 'data(id)'}
    },
    {
      selector: 'edge',
      style: { 'width': 3, 'line-color': '#ccc', 'target-arrow-color': '#ccc', 'target-arrow-shape': 'triangle', 'curve-style': 'bezier','label': 'data(weight)',}
    },
    {
      selector: '.selectedNode',
      style: { 'background-color': '#ff0000', 'label': 'data(id)',}
    },
    {
      selector: '.selectedEdge',
      style: { 'line-color': '#000', 'target-arrow-color': '#000', 'target-arrow-shape': 'triangle', 'curve-style': 'bezier','label': 'data(weight)', },
    }
  ],

  layout: { name: 'grid', rows: 1 },

  zoom: 1,
  minZoom: 1,
  maxZoom: 3,
});

cy.on('tap', function (event: cytoscape.EventObject) {
  const target = event.target;
  currentPosition = { x: event.position.x, y: event.position.y }

  if (target === cy) { openModal(); }
});

removeButton.addEventListener('click', (event: MouseEvent) => {
  openRemoveModal();
});

enum ElementTypes {
  NODE = 'node',
  EDGE = 'edge',
};

type ElementInfo = {
  type: ElementTypes,
  first: string,
  second?: string,
  weight?: number,
};

var graph = new Graph();

graph.serializeGraph();

dfs.addEventListener('click', (event: MouseEvent) => {
  const elements = cy.elements();
  const dfs_path = elements.depthFirstSearch({
    root: '#a',
    directed: true,
  });

  dfs_path.path.forEach((elem,index) => {
    setTimeout(() => {
      console.log(index);
      if (elem.group() === 'nodes') {
        elem.addClass('selectedNode');
      } else {
        elem.addClass('selectedEdge');
      }
    }, 1000);
  });
});

bfs.addEventListener('click', (event: MouseEvent) => {
  const elements = cy.elements();
  const bfs_path = elements.breadthFirstSearch({
    root: '#a',
    directed: true,
  });

  // console.log(bfs_path.path);

  bfs_path.path.forEach((elem) => {
    if (elem.group() === 'nodes') {
      elem.addClass('selectedNode');
    } else {
      elem.addClass('selectedEdge');
    }
  });
});

modal.addEventListener('click', (event: MouseEvent) => {
  if (event.currentTarget == event.target) {
    closeModal();
  }
});

removeModal.addEventListener('click', (event: MouseEvent) => {
  if (event.currentTarget === event.target) {
    closeRemoveModal();
  }
})

select.addEventListener('change', (event) => {
  const target: HTMLOptionElement = event.target as HTMLOptionElement;
  if (target.value === 'node') {
    edgeInfoInput.style.display = 'none';
    nodeNameInput.style.display = 'flex';
    type = ElementTypes.NODE;
  } else {
    nodeNameInput.style.display = 'none';
    edgeInfoInput.style.display = 'flex';
    type = ElementTypes.EDGE;
  }
});

removeSelect.addEventListener('change', (event) => {
  const target: HTMLOptionElement = event.target as HTMLOptionElement;
  if (target.value === 'node') {
    removeEdgeInput.style.display = 'none';
    removeNodeInput.style.display = 'flex';
    type = ElementTypes.NODE;
  } else {
    removeNodeInput.style.display = 'none';
    removeEdgeInput.style.display = 'flex';
    type = ElementTypes.EDGE;
  }
});

submitButton.addEventListener('click', (event: MouseEvent) => {
  collectInformation().then(data => {
    if (data.type === ElementTypes.NODE) {
      addNode(data.first, event);
    } else if (data.type === ElementTypes.EDGE) {
      addEdge(data, event);
    }
    closeModal();
  })
});

removeSubmitButton.addEventListener('click', (event: MouseEvent) => {
  collectRemoveInformation().then(data => {
    if (type === ElementTypes.NODE) {
      removeNode(data);
    } else if (type === ElementTypes.EDGE) {
      removeEdge(data);
    }
    closeRemoveModal();
  })
})

let currentPosition = {
  x: 0,
  y: 0,
};

let type: ElementTypes = ElementTypes.NODE;

function addNode(id: string, event: MouseEvent): void {
  cy.add({
    group: 'nodes',
    data: { id },
    position: { x: currentPosition.x, y: currentPosition.y },
  });

  graph.addNode(id, '#ffa12f', 10, {
    x: currentPosition.x,
    y: currentPosition.y,
  });
}

function addEdge(data: ElementInfo, event: MouseEvent): void {
  cy.add({
    group: 'edges',
    data: { id: `${data.first}${data.second}`, source: data.first, target: data.second, weight: data.weight },
  });

  const from: Node = graph.nodes.find((item: Node) => {
    return item.label === data.first;
  });

  const to: Node = graph.nodes.find((item: Node) => {
    return item.label === data.second;
  });

  graph.addEdge(from, to, data.weight);
}

function removeNode(id: string) {
  cy.remove(cy.$(`#${id}`));
}

function removeEdge(id: string) {
  cy.remove(cy.$(`#${id}`));
}

function openModal() {
  modal.style.display = 'flex';
}

function closeModal() {
  modal.style.display = 'none';
}

function openRemoveModal() {
  removeModal.style.display = 'flex';
}

function closeRemoveModal() {
  removeModal.style.display = 'none';
}

function openDfsModal() {
  dfsModal.style.display = 'flex';
}

function closeDfsModal() {
  dfsModal.style.display = 'none';
}

function openBfsModal() {
  bfsModal.style.display = 'flex';
}

function closeBfsModal() {
  bfsModal.style.display = 'none';
}

function openDijkstraModal() {
  dijkstraModal.style.display = 'flex';
}

function closeDijkstraModal() {
  dijkstraModal.style.display = 'none';
}

function openAstarModal() {
  astarModal.style.display = 'flex';
}

function closeAstarModal() {
  astarModal.style.display = 'none';
}

function openFloydWarshallModal() {
  floydWarshallModal.style.display = 'flex';
}

function closeFloydWarshallModal() {
  floydWarshallModal.style.display = 'none';
}

async function collectInformation(): Promise<ElementInfo> {
  if (type === ElementTypes.NODE) {
    const elem = document.getElementById('node-name-input') as HTMLInputElement;
    return {
      type: ElementTypes.NODE,
      first: elem.value,
    };
  } else {
    const from = document.getElementById('edge-from') as HTMLInputElement;
    const to = document.getElementById('edge-to') as HTMLInputElement;
    const weight = document.getElementById('edge-weight') as HTMLInputElement;

    return {
      type: ElementTypes.EDGE,
      first: from.value,
      second: to.value,
      weight: +weight.value,
    };
  }
}

async function collectRemoveInformation(): Promise<string> {
  if (type === ElementTypes.NODE) {
    const elem = document.getElementById('remove-node') as HTMLInputElement;
    return elem.value;
  }
  else {
    const from = document.getElementById('remove-edge-from') as HTMLInputElement;
    const to = document.getElementById('remove-edge-to') as HTMLInputElement;
    return `${from.value}${to.value}`;
  }
}

async function collectDfsInformation(): Promise<string> {
  const elem = document.getElementById('dfs-node') as HTMLInputElement;
  return elem.value;
}

async function collectBfsInformation(): Promise<string> {
  const elem = document.getElementById('bfs-node') as HTMLInputElement;
  return elem.value;
}

async function collectDijkstraInformation(): Promise<string> {
  const elem = document.getElementById('dijkstra-node') as HTMLInputElement;
  return elem.value;
}

async function collectDijkstraInformationEnd(): Promise<string> {
  const elem = document.getElementById('dijkstra-node-end') as HTMLInputElement;
  return elem.value;
}

async function collectAstarInformation(): Promise<string> {
  const elem = document.getElementById('astar-node') as HTMLInputElement;
  return elem.value;
}

async function collectAstarInformationEnd(): Promise<string> {
  const elem = document.getElementById('astar-node-end') as HTMLInputElement;
  return elem.value;
}

async function collectFloydWarshallInformation(): Promise<string> {
  const elem = document.getElementById('astar-node') as HTMLInputElement;
  return elem.value;
}

async function collectFloydWarshallInformationEnd(): Promise<string> {
  const elem = document.getElementById('astar-node-end') as HTMLInputElement;
  return elem.value;
}