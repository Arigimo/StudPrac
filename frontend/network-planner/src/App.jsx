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
  const [params, setParams] = useState({ C: 5000, K: 3 }); // Начальные значения как на картинке

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );

  const handleSolve = async () => {
    try {
      // 1. Создаем список точек в формате [id, x, y]
      const pointsList = nodes.map(n => [
        n.id, 
        Math.round(n.position.x), 
        Math.round(n.position.y)
      ]);

      // 2. Формируем итоговый массив: точки + C + K в конце
      const finalData = [...pointsList, params.C, params.K];

      console.log("Отправляем на бэкенд:", finalData);

      const result = await solveNetworkTask(finalData);
      
      // Визуализация ответа (красим Core Nodes и рисуем линии)
      const coreIds = result.coreNodes || [];
      setNodes((nds) => nds.map((node) => ({
        ...node,
        style: { 
          ...node.style, 
          background: coreIds.includes(node.id) ? '#bda000' : '#080518',
          border: coreIds.includes(node.id) ? '3px solid #aa6f00' : '2px solid #080518'
        }
      })));

      setEdges((result.edges || []).map((e, i) => ({
        id: `e-${i}`, source: e.from, target: e.to, animated: true, style: { stroke: '#2196F3' }
      })));

    } catch (err) {
      alert("Ошибка. Проверьте соединение с бэкендом.");
    }
  };

  return (
    <div style={{ display: 'flex', width: '100vw', height: '100vh' }}>
      <WindowBar 
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
