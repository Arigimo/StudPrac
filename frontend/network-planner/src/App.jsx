import React, { useState, useCallback } from 'react';
import { ReactFlowProvider, applyNodeChanges } from 'reactflow';
import { solveNetworkTask } from './api';
import MapCanvas from './MapCanvas'; 
import WindowBar from './WindowBar';
import 'reactflow/dist/style.css';

function AppContent() {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [mode, setMode] = useState('add'); 
  const [selectedNodeId, setSelectedNodeId] = useState(null);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );

  const updateNodeParams = (id, field, value) => {
    setNodes((nds) => nds.map((node) => {
      if (node.id === id) {
        return { ...node, data: { ...node.data, [field]: Number(value) } };
      }
      return node;
    }));
  };

  const handleSolve = async () => {
    try {
      // Подготовка данных в формате: id, x, y, C, K
      const payload = nodes.map(n => ({
        id: n.id,
        x: Math.round(n.position.x),
        y: Math.round(n.position.y),
        C: n.data.C || 0,
        K: n.data.K || 0
      }));

      const result = await solveNetworkTask(payload);
      
      // Красим магистральные узлы в желтый
      const coreIds = result.coreNodes || [];
      setNodes((nds) => nds.map((node) => ({
        ...node,
        style: { 
          ...node.style, 
          background: coreIds.includes(node.id) ? '#d6be38' : '#000000',
          border: coreIds.includes(node.id) ? '3px solid #e4ae49' : '2px solid #fff'
        }
      })));

      // Рисуем линии связи
      setEdges((result.edges || []).map((e, i) => ({
        id: `e-${i}`, source: e.from, target: e.to, animated: true, style: { stroke: '#2196F3' }
      })));

      alert("Решение получено!");
    } catch (err) {
      alert("Ошибка. Проверьте, запущен ли бэкенд.");
    }
  };

  return (
    <div style={{ display: 'flex', width: '100vw', height: '100vh' }}>
      <WindowBar 
        mode={mode} setMode={setMode} 
        nodes={nodes} selectedNodeId={selectedNodeId}
        updateNodeParams={updateNodeParams}
        onSolve={handleSolve} 
        onClear={() => {setNodes([]); setEdges([]); setSelectedNodeId(null);}} 
      />
      <MapCanvas 
        nodes={nodes} edges={edges} onNodesChange={onNodesChange} 
        mode={mode} setNodes={setNodes} setSelectedNodeId={setSelectedNodeId} 
      />
    </div>
  );
}

export default function App() {
  return (
    <ReactFlowProvider>
      <AppContent />
    </ReactFlowProvider>
  );
}
