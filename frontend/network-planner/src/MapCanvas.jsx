import React, { useCallback } from 'react';
import ReactFlow, { Background, Controls, useReactFlow } from 'reactflow';

const nodeTypes = {}; 
const edgeTypes = {};

const MapCanvas = ({ nodes, edges, onNodesChange, mode, setNodes, setSelectedNodeId }) => {
  const { screenToFlowPosition } = useReactFlow();

  const onPaneClick = useCallback((event) => {
    if (mode !== 'add') return;

    const position = screenToFlowPosition({ x: event.clientX, y: event.clientY });

    const newNode = {
      id: `n_${Date.now()}`,
      position,
      data: { C: 0, K: 0 }, // Начальные параметры для каждой точки
      style: { 
        background: '#830aa1', 
        width: 12, 
        height: 12, 
        borderRadius: '50%', 
        border: '2px solid #fff' 
      },
    };

    setNodes((nds) => nds.concat(newNode));
  }, [mode, screenToFlowPosition, setNodes]);

  const onNodeClick = useCallback((event, node) => {
    if (mode === 'delete') {
      setNodes((nds) => nds.filter((n) => n.id !== node.id));
      setSelectedNodeId(null);
    } else {
      setSelectedNodeId(node.id); // Выбираем точку для редактирования параметров
    }
  }, [mode, setNodes, setSelectedNodeId]);

  return (
    <div style={{ flexGrow: 1, height: '100%', background: '#fff' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onPaneClick={onPaneClick}
        onNodeClick={onNodeClick}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
      >
        <Background variant="lines" color="#eee" gap={25} />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default MapCanvas;
