import React, { useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from 'chart.js';
import './finance.css';
import { Link } from 'react-router-dom';

ChartJS.register(ArcElement, Tooltip, Legend, Title);

function FinancePage() {
    const [labelsState, setLabelsState] = useState([]); // Список целей
    const [dataState, setDataState] = useState([]); // Список сумм
    const [selectedIndex, setSelectedIndex] = useState(null); // Индекс выбранного накопления для удаления

    const addData = (e) => {
        e.preventDefault();
        const target = e.target;
        const goal = target.querySelector('.add-goal').value;
        const amount = parseInt(target.querySelector('.add-amount').value, 10); // Преобразование строки в число

        if (!isNaN(amount) && goal.trim() !== '') { // Проверка валидности данных
            setLabelsState((prevState) => [...prevState, goal]);
            setDataState((prevState) => [...prevState, amount]);
        } else {
            alert('Введите корректные данные для цели и суммы'); // Сообщение об ошибке
        }

        target.reset(); // Сброс формы
    };

    const deleteData = () => {
        if (selectedIndex !== null) {
            // Удаляем выбранное накопление
            setLabelsState((prevState) => prevState.filter((_, i) => i !== selectedIndex));
            setDataState((prevState) => prevState.filter((_, i) => i !== selectedIndex));
            setSelectedIndex(null); // Сбрасываем выбор
        }
    };

    const generateColors = (numColors) => {
        const colors = [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#4BC0C0',
            '#9966FF',
            '#FF9933',
            '#FFCC99',
            '#99CCFF',
            '#CCFFCC',
            '#FFFF99'
        ];
        return Array.from({ length: numColors }, (_, i) => colors[i % colors.length]);
    };

    const options = {
        plugins: {
            legend: {
                labels: {
                    font: { size: 18 },
                    color: 'white'
                }
            }
        }
    };

    // Data is generated dynamically based on labelsState and dataState
    const data = {
        labels: labelsState,
        datasets: [{
            data: dataState,
            backgroundColor: generateColors(labelsState.length),
            hoverBackgroundColor: generateColors(labelsState.length)
        }]
    };


    return (
        <div className="finance-page-container">
            <h1 className="finance-page-title"> Затраты</h1>
    
            <div className="finance-page-content">
                <div className="finance-page-chart-container">
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                        <Pie 
                            data={{
                                ...data,
                                datasets: data.datasets.map(dataset => ({
                                    ...dataset,
                                    backgroundColor: ['#FFB6C1', '#ADD8E6', '#FFFFE0', '#D3FFCE', '#FFE4E1'], // Пастельные цвета
                                })),
                                labels: labelsState.map((label, index) => `${label} (${data.datasets[0].data[index]} руб.)`)
                            }}
                            options={{
                                ...options,
                                plugins: {
                                    ...options.plugins,
                                    legend: {
                                        ...options.plugins.legend,
                                        labels: {
                                            ...options.plugins.legend.labels,
                                            font: {
                                                size: 14,
                                                family: 'Arial'
                                            }
                                        }
                                    }
                                }
                            }}
                        />
                    </div>
                </div>
    
                <div className="finance-page-form-container">
                    <form onSubmit={addData}>
                        <input type="text" className="add-goal" placeholder="Цель затрат" required />
                        <input type="number" className="add-amount" placeholder="Сумма" required />
                        <button type="submit">Добавить</button>
                    </form>
                    
                    {labelsState.length > 0 && (
                        <div className="finance-page-delete-container">
                            <p>Выберите запись для удаления:</p>
                            <select
                                value={selectedIndex !== null ? selectedIndex : ''}
                                onChange={(e) => setSelectedIndex(parseInt(e.target.value, 10))}
                                className="finance-page-delete-select"
                            >
                                <option value="" disabled>Выберите запись</option>
                                {labelsState.map((label, index) => (
                                    <option key={index} value={index}>{label}: {dataState[index]} ₽</option>
                                ))}
                            </select>
                            <button
                                onClick={deleteData}
                                className="finance-page-delete-button"
                                disabled={selectedIndex === null}
                            >
                                Удалить
                            </button>
                        </div>
                    )}

                </div>
            </div>
    
            <Link to="/start">
                <button className="finance-page-back-button">Назад</button>
            </Link>
        </div>
    );
    
    
}

export default FinancePage;
