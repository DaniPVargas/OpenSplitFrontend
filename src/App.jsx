import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function VerticalBar({ value, user }) {
  const isPositive = value >= 0;
  const barHeight = `${Math.abs(value)}%`; // calculate height based on value
  const barColor = isPositive ? 'bg-success' : 'bg-danger'; // green for positive, red for negative

  const containerStyle = {
    height: '300px', // fixed height for the container
    width: '50px', // fixed width to keep things uniform
    marginRight: '40px', // space between bars
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center', // this centers the baseline
    alignItems: 'center'
  };

  const barStyle = {
    height: barHeight,
    width: '100%',
    position: 'absolute',
    bottom: isPositive ? '60%' : 'auto', // start from middle and extend upwards if positive
    top: isPositive ? 'auto' : '55%', // start from middle and extend downwards if negative
    transition: 'height 0.3s ease'
  };

  return (
    <div style={containerStyle}>
      <div style={barStyle} className={barColor}></div>
      <p className="text-center mt-1">{user}</p>
    </div>
  );
}

function App() {
  // Example values; can be any set of numbers
  const values = [20, 50, -30, 80, -10];
  const users = ["Jorge", "Dani", "Sergio", "Antón", "CastilloDel"]

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-center">
        {values.map((value, index) => (
          <VerticalBar key={index} value={value} user={users[index]}/>
        ))}
      </div>
    </div>
  );
}

export default App;
