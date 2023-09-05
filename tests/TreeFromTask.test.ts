import { TreeStore, type TreeNodeData } from '../src/Tree';

describe('Tree with given items', () => {
    const items: TreeNodeData[] = [
        { id: 1, parent: 'root' },
        { id: 2, parent: 1, type: 'test' },
        { id: 3, parent: 1, type: 'test' },
        { id: 4, parent: 2, type: 'test' },
        { id: 5, parent: 2, type: 'test' },
        { id: 6, parent: 2, type: 'test' },
        { id: 7, parent: 4, type: null },
        { id: 8, parent: 4, type: null },
    ];
    const tree = new TreeStore(items);

    test('getAll() returns all nodes', () => {
        expect(tree.getAll()).toEqual(items);
    });

    test('getItem(id) returns the correct node', () => {
        expect(tree.getItem(5)).toEqual({ id: 5, parent: 2, type: 'test' });
        expect(tree.getItem(7)).toEqual({ id: 7, parent: 4, type: null });
    });

    test('getChildren(id) returns the direct children', () => {
        expect(tree.getChildren(1)).toEqual([
            { id: 2, parent: 1, type: 'test' },
            { id: 3, parent: 1, type: 'test' }
        ]);
        expect(tree.getChildren(2)).toEqual([
            { id: 4, parent: 2, type: 'test' },
            { id: 5, parent: 2, type: 'test' },
            { id: 6, parent: 2, type: 'test' }
        ]);
        expect(tree.getChildren(4)).toEqual([
            { id: 7, parent: 4, type: null },
            { id: 8, parent: 4, type: null }
        ]);
    });

    test('getAllChildren(id) returns all descendants', () => {
        expect(tree.getAllChildren(1)).toEqual([
            { id: 2, parent: 1, type: 'test' },
            { id: 3, parent: 1, type: 'test' },
            { id: 4, parent: 2, type: 'test' },
            { id: 5, parent: 2, type: 'test' },
            { id: 6, parent: 2, type: 'test' },
            { id: 7, parent: 4, type: null },
            { id: 8, parent: 4, type: null }
        ]);

        expect(tree.getAllChildren(2)).toEqual([
            { id: 4, parent: 2, type: 'test' },
            { id: 5, parent: 2, type: 'test' },
            { id: 6, parent: 2, type: 'test' },
            { id: 7, parent: 4, type: null },
            { id: 8, parent: 4, type: null }
        ]);
    });

    test('getAllParents(id) returns all ancestors in order', () => {
        expect(tree.getAllParents(7)).toEqual([
            { id: 4, parent: 2, type: 'test' },
            { id: 2, parent: 1, type: 'test' },
            { id: 1, parent: 'root' }
        ]);
        expect(tree.getAllParents(6)).toEqual([
            { id: 2, parent: 1, type: 'test' },
            { id: 1, parent: 'root' }
        ]);
    });
});
