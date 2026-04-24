import React from 'react';

const WindowBar = ({ mode, setMode, params, setParams, nodes, onSolve, onClear }) => {
  return (
    <div style={{ 
      width: '320px', padding: '20px', background: '#f4f4f4', 
      borderRight: '1px solid #8cb5c5', display: 'flex', flexDirection: 'column', gap: '15px' 
    }}>
      <h2 style={{ color: '#0b091f'}}>Управление</h2>
      
      <div style={{ display: 'flex', gap: '5px' }}>
        <button onClick={() => setMode('add')} style={{ flex: 1, padding: '10px', background: mode === 'add' ? '#005e03' : '#fff', color: mode === 'add' ? '#fff' : '#000' }}>Добавить</button>
        <button onClick={() => setMode('delete')} style={{ flex: 1, padding: '10px', background: mode === 'delete' ? '#5e0600' : '#fff', color: mode === 'delete' ? '#fff' : '#000' }}>Удалить</button>
      </div>

      <hr />

      {/* Глобальные параметры C и K */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <label>Параметр C (Стоимость):
          <input 
            type="number" 
            value={params.C} 
            onChange={(e) => setParams({ ...params, C: Number(e.target.value) })} 
            style={{ width: '100%', padding: '8px', marginTop: '5px', background:'#0b091f' }} 
          />
        </label>
        <label>Параметр K (Ёмкость):
          <input 
            type="number" 
            value={params.K} 
            onChange={(e) => setParams({ ...params, K: Number(e.target.value) })} 
            style={{ width: '100%', padding: '8px', marginTop: '5px', background:'#0b091f'}} 
          />
        </label>
      </div>

      <div style={{ flexGrow: 1, overflowY: 'auto', marginTop: '10px' }}>
        <h4>Список точек (id, x, y):</h4>
        <div style={{ fontSize: '12px', background: '#fff', padding: '10px', border: '1px solid #ddd' }}>
          {nodes.length === 0 ? "Точек нет" : nodes.map(n => (
            <div key={n.id} style={{ marginBottom: '5px', borderBottom: '1px solid #eee' }}>
              ID: {n.id.slice(-3)} | <b>({Math.round(n.position.x)}, {Math.round(n.position.y)})</b>
            </div>
          ))}
        </div>
      </div>

      <button onClick={onClear} style={{ padding: '8px', cursor: 'pointer' }}>Очистить карту</button>
      
      <button onClick={onSolve} style={{ 
        padding: '15px', background: '#00447c', color: '#fff', 
        border: 'none', fontWeight: 'bold', borderRadius: '5px', cursor: 'pointer' 
      }}>
        НАЙТИ РЕШЕНИЯ
      </button>
    </div>
  );
};

export default WindowBar;
