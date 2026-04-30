import React from 'react';

const WindowBar = ({ mode, setMode, params, setParams, nodes, onSolve, onClear, resultStats }) => {
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

 <div style={{ flexGrow: 1, overflowY: 'auto' }}>
        <h4>Список точек:</h4>
        <div style={{ fontSize: '11px', background: '#fff', padding: '8px', border: '1px solid #ddd' }}>
          {nodes.map((n, i) => (
            <div key={n.id}>[{i}] ID: {n.id.slice(-3)} ({Math.round(n.position.x)}, {Math.round(n.position.y)})</div>
          ))}
        </div>
      </div>

      {/* НОВЫЙ БЛОК: Итоговая информация */}
      <div style={{ background: '#333', color: '#fff', padding: '15px', borderRadius: '8px', fontSize: '13px' }}>
        <h4 style={{ margin: '0 0 10px 0', color: '#FFD700' }}>Результаты расчета:</h4>
        <div style={{ marginBottom: '5px' }}>Общая стоимость: <b>{resultStats.cost}</b></div>
        <div style={{ marginBottom: '5px' }}>Кол-во Core Nodes: <b>{resultStats.coreCount}</b></div>
        <div>Индексы Core: <b>{resultStats.coreList.join(', ')}</b></div>
      </div>

      <button onClick={onClear}>Очистить</button>
      <button onClick={onSolve} style={{ padding: '15px', background: '#2196F3', color: '#fff', fontWeight: 'bold', cursor: 'pointer' }}>
        НАЙТИ РЕШЕНИЯ
      </button>
    </div>
  );
};

export default WindowBar;