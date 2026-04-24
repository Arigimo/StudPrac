import React from 'react';

const WindowBar = ({ mode, setMode, nodes, selectedNodeId, updateNodeParams, onSolve, onClear }) => {
  const selectedNode = nodes.find(n => n.id === selectedNodeId);

  return (
    <div style={{ 
      width: '320px', padding: '20px', background: '#f4f4f4', 
      borderRight: '1px solid  color: #0a0716', display: 'flex', flexDirection: 'column', gap: '15px' 
    }}>
      <h2 style={{color: '#0a0716'}} >Управление</h2>
      
      <div style={{ display: 'flex', gap: '5px' }}>
        <button onClick={() => setMode('add')} style={{ flex: 1, padding: '10px', background: mode === 'add' ? '#008104' : '#fff', color: mode === 'add' ? '#fff' : '#000' }}>Добавить</button>
        <button onClick={() => setMode('delete')} style={{ flex: 1, padding: '10px', background: mode === 'delete' ? '#682824' : '#fff', color: mode === 'delete' ? '#fff' : '#000' }}>Удалить</button>
      </div>

      <div style={{ padding: '15px', background: '#fff', borderRadius: '8px', border: '1px solid #ddd' }}>
        <h4 style={{ margin: '0 0 10px 0',  color: '#0a0716' }}>Параметры выбранной точки</h4>
        {selectedNode ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <span style={{ fontSize: '12px', color: '#0a0716' }}>ID: {selectedNode.id}</span>
            <label>Значение C: 
              <input type="number" value={selectedNode.data.C} onChange={(e) => updateNodeParams(selectedNode.id, 'C', e.target.value)} style={{ width: '100%', padding: '5px' }} />
            </label>
            <label>Значение K: 
              <input type="number" value={selectedNode.data.K} onChange={(e) => updateNodeParams(selectedNode.id, 'K', e.target.value)} style={{ width: '100%', padding: '5px' }} />
            </label>
          </div>
        ) : (
          <p style={{ fontSize: '13px', color: '#0a0716' }}>Выберите точку на карте для настройки</p>
        )}
      </div>

      <div style={{ flexGrow: 1, overflowY: 'auto',  color: '#0a0716' }}>
        <h4>Список точек (x, y, C, K):</h4>
        <div style={{ fontSize: '12px', background: '#fff', padding: '10px', border: '1px solid #ddd' }}>
          {nodes.length === 0 ? "Точек нет" : nodes.map(n => (
            <div key={n.id} style={{ marginBottom: '5px', borderBottom: '1px solid #eee' }}>
              ({Math.round(n.position.x)}, {Math.round(n.position.y)}) | <b>C: {n.data.C} K: {n.data.K}</b>
            </div>
          ))}
        </div>
      </div>

      <button onClick={onClear} style={{ padding: '8px', cursor: 'pointer' }}>Очистить карту</button>
      
      <button onClick={onSolve} style={{ 
        padding: '15px', background: '#064b85', color: '#fff', 
        border: 'none', fontWeight: 'bold', borderRadius: '5px', cursor: 'pointer' 
      }}>
        НАЙТИ РЕШЕНИЯ
      </button>
    </div>
  );
};

export default WindowBar;
