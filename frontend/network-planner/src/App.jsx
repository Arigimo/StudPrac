import React, { useState, useCallback } from 'react';
import { ReactFlowProvider, applyNodeChanges } from 'reactflow';
import { solveNetworkTask } from './api';
import MapCanvas from './MapCanvas'; 
import WindowBar from './WindowBar';
import 'reactflow/dist/style.css';

function AppContent() {
  const [resultStats, setResultStats] = useState({ cost: 0, coreCount: 0, coreList: [] });
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [mode, setMode] = useState('add'); 
  const [params, setParams] = useState({ C: 5000, K: 3 }); // Начальные значения как на картинке

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );

  const handleSolve = async () => {
  try {
    const payload = nodes.map(n => [n.id, Math.round(n.position.x), Math.round(n.position.y)]);
    const finalData = [...payload, params.C, params.K];

    const result = await solveNetworkTask(finalData);
    
    // 1. Сохраняем статистику для WindowBar
    setResultStats({
      cost: result.total_cost,
      coreCount: result.core_nodes.length,
      coreList: result.core_nodes
    });

    // 2. Красим узлы. result.core_nodes содержит индексы (0, 1, 2...)
    setNodes((nds) => nds.map((node, index) => {
      const isCore = result.core_nodes.includes(index);
      return {
        ...node,
        style: { 
          ...node.style, 
          background: isCore ? '#FF4500' : '#333', // Оранжевый для Core
          border: isCore ? '3px solid #000' : '2px solid #fff',
          width: isCore ? 16 : 12,
          height: isCore ? 16 : 12
        }
      };
    }));

    // 3. Создаем связи. connections: [[точка, центр], ...]
    const newEdges = result.connections
      .filter(([from, to]) => from !== to) // Не рисуем линию из точки в саму себя
      .map(([fromIndex, toIndex], i) => ({
        id: `e-${i}`,
        source: nodes[fromIndex].id,
        target: nodes[toIndex].id,
        animated: true,
        style: { stroke: '#FF4500', strokeWidth: 2 }
      }));

    setEdges(newEdges);

  } catch (err) {
    alert("Ошибка. Проверьте формат ответа бэкенда.");
  }
};

  return (
    <div style={{ display: 'flex', width: '100vw', height: '100vh' }}>
      <WindowBar 
      resultStats={resultStats}
        mode={mode} setMode={setMode} 
        nodes={nodes} params={params} setParams={setParams}
        onSolve={handleSolve} 
        onClear={() => {setNodes([]); setEdges([]);}} 
      />
      <MapCanvas 
        nodes={nodes} edges={edges} onNodesChange={onNodesChange} 
        mode={mode} setNodes={setNodes} 
      />
    </div>
  );
}

export default function App() {
  return <ReactFlowProvider><AppContent /></ReactFlowProvider>;
}
