import { types, cast } from 'mobx-state-tree'
import { getRootStore } from '../../models/helpers'
import ReactFlow, {
	MiniMap,
	Controls,
	useNodesState,
	useEdgesState,
	applyEdgeChanges,
	applyNodeChanges,
	NodeChange,
	Node,
} from 'react-flow-renderer'

export const FlowPage = types
	.model('CatsPage', {
		data: types.optional(
			types.model({
				test: types.optional(types.string, ''),
			}),
			{},
		),
		nnodes: types.frozen<Node[]>(),
		nodes: types.array(
			types.model({
				id: types.string,
				data: types.model({
					label: types.string,
				}),
				position: types.model({
					x: types.number,
					y: types.number,
				}),
			}),
		),
		edges: types.array(
			types.model({
				id: types.string,
				source: types.string,
				target: types.string,
			}),
		),
	})
	.actions((self) => ({
		// INITIALIZATION
		initialisePage() {
			self.data.test = 'test'
			self.nodes = cast([
				{ id: '1', data: { label: 'Node yay' }, position: { x: 100, y: 100 } },
				{ id: '2', data: { label: 'Node 2' }, position: { x: 100, y: 200 } },
			])
			;(self.nnodes = [
				{ id: '1', data: { label: 'Node yay' }, position: { x: 100, y: 100 } },
				{ id: '2', data: { label: 'Node 2' }, position: { x: 100, y: 200 } },
			]),
				(self.edges = cast([{ id: 'e1-2', source: '1', target: '2' }]))
			// setTimeout(() => {
			// 	this.updateFirstNode()
			// }, 1000)
		},

		updateFirstNode() {
			self.nodes[0].position.x += 50
		},

		onNodesChange: (changes: NodeChange[]) => {
			const updatedNodes = applyNodeChanges(changes, self.nnodes)
			self.nnodes.push(...updatedNodes)
		},

		updateNode(event: any) {
			if (Array.isArray(event)) {
				event.forEach((eventItem) => {
					console.log(eventItem)
					if (eventItem.id && eventItem.position) {
						const foundNode = self.nodes.find(
							(currentNode) => currentNode.id === eventItem.id,
						)
						if (foundNode) {
							foundNode.position = eventItem.position
						}
					}
				})
			}
		},
	}))
	.views((self) => ({
		pageModelFetching() {
			return true
		},

		getNodes() {
			// console.log(JSON.stringify(self.nodes))
			return self.nnodes
		},
	}))
