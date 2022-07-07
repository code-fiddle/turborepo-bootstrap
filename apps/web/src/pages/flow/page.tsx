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
import { Button } from '@chakra-ui/react'

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

	return (
		<>
			<Button onClick={() => page.addNode()}>Add Node</Button>
			<ReactFlow
				nodes={page.getNodes()}
				edges={page.getEdges()}
				style={{ width: '500px', height: '500px' }}
				onNodesChange={(event) => {
					page.onNodesChange(event)
					// applyNodeChanges(event, page.nodes)
				}}
				onEdgesChange={(event: any) => page.onEdgeChange(event)}
				// onConnect={onConnect}
				onConnect={(event) => page.onConnect(event)}
			>
				<MiniMap />
				<Controls />
			</ReactFlow>
		</>
	)
})
