import { TreeStore, type TreeNodeData } from '../src/Tree';

describe('TreeStore', () => {
    const nodes: TreeNodeData[] = [
        { id: 'b', parent: 1, type: 'null' },
        { id: 2, parent: 'non-existent-parent' },
        { id: 1, parent: 'a', type: 'test' },
        { id: 'a', parent: 'root' },
    ];
    const tree = new TreeStore(nodes);

    describe('getAll()', () => {
        test('returns all nodes', () => {
            expect(tree.getAll()).toEqual(nodes);
        });
    });

    describe('getItem(id)', () => {
        test('returns the correct node when it exists', () => {
            expect(tree.getItem('a')).toEqual({ id: 'a', parent: 'root' });
            expect(tree.getItem(1)).toEqual({ id: 1, parent: 'a', type: 'test' });
        });

        test('returns null for non-existent nodes', () => {
            expect(tree.getItem('non-existent-id')).toBeNull();
        });
    });

    describe('getChildren(id)', () => {
        test('returns the direct children', () => {
            expect(tree.getChildren('a')).toEqual([{ id: 1, parent: 'a', type: 'test' }]);
            expect(tree.getChildren(1)).toEqual([{ id: 'b', parent: 1, type: 'null' }]);
        });

        test('returns an empty array for nodes without children', () => {
            expect(tree.getChildren('b')).toEqual([]);
        });

        test('returns an empty array for non-existent nodes', () => {
            expect(tree.getChildren('non-existent-id')).toEqual([]);
        });
    });

    describe('getAllChildren(id)', () => {
        test('returns all descendants', () => {
            expect(tree.getAllChildren('a')).toEqual([{ id: 1, parent: 'a', type: 'test' }, { id: 'b', parent: 1, type: 'null' }]);
        });

        test('returns an empty array for nodes without descendants', () => {
            expect(tree.getAllChildren('b')).toEqual([]);
        });

        test('returns an empty array for non-existent nodes', () => {
            expect(tree.getAllChildren('non-existent-id')).toEqual([]);
        });
    });

    describe('getAllParents(id)', () => {
        test('returns all ancestors in order', () => {
            expect(tree.getAllParents('b')).toEqual([{ id: 1, parent: 'a', type: 'test' }, { id: 'a', parent: 'root' }]);
        });

        test('returns an empty array for root nodes', () => {
            expect(tree.getAllParents('a')).toEqual([]);
        });

        test('returns an empty array for non-existent nodes', () => {
            expect(tree.getAllParents('non-existent-id')).toEqual([]);
        });

        test('returns an empty array for nodes with non-existent parents', () => {
            expect(tree.getAllParents(2)).toEqual([]);
        });
    });
});
