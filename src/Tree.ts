export type Id = string | number;

export type TreeNodeData = {
    id: Id;
    parent: Id | 'root';
    type?: string | null;
    [key: string]: any;
}

export class TreeNode {
    data: TreeNodeData;
    children: TreeNode[] = [];
    parent?: TreeNode;

    constructor(data: TreeNodeData) {
        this.data = data;
    }

    static isRoot(node: TreeNode): boolean {
        return node.parent === undefined;
    }

    addChild(child: TreeNode): void {
        this.children.push(child);
    }

    getAllChildren(): TreeNode[] {
        let children: TreeNode[] = [...this.children];
        for (let child of this.children) {
            children = children.concat(child.getAllChildren());
        }
        return children;
    }

    getAllParents(): TreeNode[] {
        const parents: TreeNode[] = [];
        let currentParent: TreeNode | undefined = this.parent;
        while (currentParent) {
            parents.push(currentParent);
            currentParent = currentParent.parent;
        }
        return parents;
    }

}


export class TreeStore {
    private nodeMap: Map<string | number, TreeNode> = new Map();

    constructor(nodes: TreeNodeData[]) {
        nodes.forEach(nodeData => {
            this.nodeMap.set(nodeData.id, new TreeNode(nodeData));
        });

        // separate loop to ensure all nodes are created before assigning parents
        nodes.forEach(nodeData => {
            const currentNode = this.nodeMap.get(nodeData.id);
            const parentNode = this.nodeMap.get(nodeData.parent);
            if (parentNode && currentNode && nodeData.parent !== 'root') {
                currentNode.parent = parentNode;
                parentNode.addChild(currentNode);
            }
        });
    }

    getAll(): TreeNodeData[] {
        const result: TreeNodeData[] = [];
        this.nodeMap.forEach(node => {
            result.push(node.data);
        });
        return result;
    }

    getItem(id: string | number): TreeNodeData | null {
        return this.nodeMap.get(id)?.data || null;
    }

    getChildren(id: string | number): TreeNodeData[] {
        const node = this.nodeMap.get(id);
        if (!node) return [];
        return node.children.map(childNode => childNode.data);
    }

    getAllChildren(id: string | number): TreeNodeData[] {
        const node = this.nodeMap.get(id);
        if (!node) return [];
        const childNodes = node.getAllChildren();
        return childNodes.map(childNode => childNode.data);
    }

    getAllParents(id: string | number): TreeNodeData[] {
        const node = this.nodeMap.get(id);
        if (!node) return [];
        const parentNodes = node.getAllParents();
        return parentNodes.map(parentNode => parentNode.data);
    }
}