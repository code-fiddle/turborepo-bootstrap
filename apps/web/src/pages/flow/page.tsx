import { observer } from 'mobx-react-lite'
import { useMst } from '../../models/root'
import ReactFlow, {
	MiniMap,
	Controls,
	useNodesState,
	useEdgesState,
	applyEdgeChanges,
	applyNodeChanges,
} from 'react-flow-renderer'

const flowKey = 'example-flow'

const getNodeId = () => `randomnode_${+new Date()}`

const initialNodes = [
	{ id: '1', data: { label: 'Node 1' }, position: { x: 100, y: 100 } },
	{ id: '2', data: { label: 'Node 2' }, position: { x: 100, y: 200 } },
]

const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }]

export default observer(() => {
	const {
		root: {
			pages: { flow: page },
		},
	} = useMst()

	// const [nodes, setNodes, onNodesChange] = useNodesState([])
	// const [edges, setEdges, onEdgesChange] = useEdgesState([])

	return (
		<ReactFlow
			nodes={page.getNodes()}
			edges={page.edges}
			style={{ width: '500px', height: '500px' }}
			onNodesChange={(event) => {
				page.onNodesChange(event)
				// applyNodeChanges(event, page.nodes)
			}}
			onEdgesChange={(event: any) => console.log(event)}
			// onConnect={onConnect}
		>
			<MiniMap />
			<Controls />
		</ReactFlow>
	)
})

function Flow(props: {
	nodes: any
	edges: any
	onNodesChange: any
	// onEdgesChange: any
}) {
	return (
		<ReactFlow
			nodes={props.nodes}
			edges={props.edges}
			style={{ width: '500px', height: '500px' }}
			onNodesChange={props.onNodesChange}
			onEdgesChange={(event: any) => console.log(event)}
			// onConnect={onConnect}
		>
			<MiniMap />
			<Controls />
		</ReactFlow>
	)
}
