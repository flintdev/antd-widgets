/* steps

1. get tree height
2. fill each path with dummy node to tree height
3. assign y to leaf node, X = height, Y = leaf node order
4. post order build position for each node
5. collect node and edge info

*/
export const dataTreeHandler = (dataTree, customNodes: any[] | undefined) => {
    const getHeight = (nodes) => {
        if (nodes) {
            const heights = nodes.map(node => getHeight(node.children));
            return 1 + Math.max(...heights);
        } else {
            return 0;
        }
    }
    const height = getHeight(dataTree);


    let Y = 0;
    const getY = () => Y++;
    const fillNode = (nodes, stepToBottom) => {
        if (stepToBottom === 1) return nodes.map(node => {
            node.y = getY();
            return node;
        });
        nodes = nodes.map(child => {
            child.children = fillNode(child.children || [{ id: "dummy" }], stepToBottom - 1);
            return child;
        })
        return nodes;
    }
    const _fillNode = fillNode(dataTree, height)


    const _retNodes: any[] = [];
    const _retEdges: any[] = [];
    const getNodeEdges = (node) => {
        if (node.id !== "dummy") {
            _retNodes.push(node);
            if (node.children) {
                node.children.forEach(child => {
                    if (child.id !== "dummy") {
                        _retEdges.push({
                            "source": node.id,
                            "target": child.id,
                            "id": `${node.id}::${child.id}`
                        })
                    }
                })
            }
        }
    }

    const fillY = (nodes, stepToBottom) => {
        if (stepToBottom === 1) {
            return nodes.map(node => {
                node.x = height - stepToBottom;
                getNodeEdges(node);
                return node;
            })
        } else {
            return nodes.map(node => {
                node.children = fillY(node.children, stepToBottom - 1);
                const childY = node.children.map(node => node.y);
                const maxChildY = Math.max(...childY);
                const minChildY = Math.min(...childY);
                node.x = height - stepToBottom;
                node.y = minChildY + (maxChildY - minChildY) / 2;
                getNodeEdges(node);
                return node;
            });
        }
    }
    fillY(_fillNode, height);


    const getSVG = (name: string, color: string, icon: string) => {
        return `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 18.04 17.5'><defs/><path fill='${color}' d='M8.96.46a1.14 1.13 0 00-.44.11L2.58 3.41a1.14 1.13 0 00-.61.77L.5 10.55a1.14 1.13 0 00.16.86 1.14 1.13 0 00.06.1l4.11 5.1a1.14 1.13 0 00.9.43h6.58a1.14 1.13 0 00.9-.43l4.1-5.1a1.14 1.13 0 00.22-.96l-1.47-6.38a1.14 1.13 0 00-.61-.76L9.5.57a1.14 1.13 0 00-.55-.1z'/><text x='10' y='16.8' style='line-height:6.61458349px' fill='white' stroke-width='.3' font-family='monospace' font-size='10.6' font-weight='400' letter-spacing='0' transform='translate(-1 -1.2)' word-spacing='0'><tspan x='10' y='16.8' font-family='monospace' font-size='2.8' text-anchor='middle'>${name}</tspan></text>${icon}</svg>`
    }


    const _retGroups = Array.from(new Set(_retNodes.map(node => node.parent).filter(node => !!node)));
    const group2order = _retGroups
        .sort((a, b) => a.split("-")[1] - b.split("-")[1])
        .reduce((ret, parent, i) => {
        ret[parent] = i;
        return ret;
    }, {})

    return {
        edges: _retEdges,
        nodes: _retNodes.map((node: any) => {
            node.x = node.parent ? (height *200 + (200 * group2order[node.parent])) : node.x *= 200
            node.y *= 100
            const icon = node.icon || customNodes?.find(customNode => customNode.name === node.name)?.icon;
            node.icon = getSVG(node.name, node.color || "rgb(51,113,227)", icon)
            node.type = "node"
            node.shape = "hex-object"
            delete node.children;
            delete node.color;
            return node;
        }),
        groups: _retGroups.map(group => {return  {id: group, label: group}})
    };
}

/* steps

1. get a dic, key=nodeid val=node value
2. get a dic, key=nodeid val=childrenid
3. bfs start with node with no children

*/
export const graphHandler = (data) => {
    const {nodes=[], edges=[], groups=[]} = data;
    const group2label = (groups || []).reduce((ret, group) => {
        ret[group.id] = group.label;
        return ret;
    }, {});
    const node2children = {};
    const node2val = {};
    const rootNodes = new Set();
    for (let node of nodes) {
        delete node.x
        delete node.y
        delete node.index
        delete node.size
        node.parent = group2label[node.parent]
        node2val[node.id] = node;
        rootNodes.add(node.id);
    }
    for (let edge of edges) {
        node2children[edge.source] = (node2children[edge.source] || []).concat(edge.target);
        rootNodes.delete(edge.target);

    }

    const helper = (nodes) => {
        return nodes.reduce((ret, nodeid) => {
            const node = node2val[nodeid];
            if (node2children[nodeid]) node.children = helper(node2children[nodeid])
            ret.push(node);
            return ret;
        }, [])
    } 
    return helper(Array.from(rootNodes));
}