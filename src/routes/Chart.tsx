import { useQuery } from 'react-query';
import { fetchCoinHistory } from '../api';
//https://apexcharts.com/docs/react-charts/ chart 라이브러리
import ApexCharts from 'react-apexcharts';

interface ChartProps {
  coinId: string;
}

interface IHistorical {
  close: string;
  high: string;
  low: string;
  market_cap: number;
  open: string;
  time_close: number;
  time_open: number;
  volume: string;
}

function Chart({ coinId }: ChartProps) {
  const { isLoading, data } = useQuery<IHistorical[]>(['ohlcv', coinId], () =>
    fetchCoinHistory(coinId)
  );
  return (
    <div>
      {isLoading ? (
        'Loading chart..'
      ) : (
        <ApexCharts
          type="line"
          series={[
            { name: 'price', data: data?.map((price) => +price.close) ?? [] },
          ]}
          options={{
            theme: {
              mode: 'dark',
            },
            chart: {
              height: 300,
              width: 500,
              toolbar: { show: false },
              background: 'transparent',
            },
            grid: {
              show: false,
            },
            yaxis: { show: false },
            xaxis: {
              labels: { show: false },
              axisTicks: { show: false },
              axisBorder: { show: false },
            },
            stroke: {
              curve: 'smooth',
              width: 5,
            },
          }}
        />
      )}
    </div>
  );
}

export default Chart;
