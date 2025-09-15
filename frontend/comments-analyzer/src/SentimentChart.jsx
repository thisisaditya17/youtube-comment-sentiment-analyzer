import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const SentimentChart = ({ positiveCount, negativeCount }) => {
  const data = {
    labels: ['Positive', 'Negative'],
    datasets: [
      {
        data: [positiveCount, negativeCount],
        backgroundColor: ['#4CAF50', '#f44336'],
        borderWidth: 2,
        borderColor: '#fff'
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom'
      }
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <Pie data={data} options={options} />
    </div>
  );
};

export default SentimentChart;
