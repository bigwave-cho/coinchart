import { useQuery } from 'react-query';
import { fetchCoinHistory } from '../api';
import ApexCharts from 'react-apexcharts';
import { isDartAtom } from '../atoms';
import { useRecoilValue } from 'recoil';

export interface ChartProps {
  coinId: string;
}

export interface IHistorical {
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
  const isDark = useRecoilValue(isDartAtom);

  const series = [
    {
      data:
        data?.map((item) => {
          return {
            x: new Date(item.time_close * 1000).toISOString(),
            y: [+item.open, +item.high, +item.low, +item.close],
          };
        }) ?? [],
    },
  ];

  return (
    <div>
      {isLoading ? (
        'Loading chart..'
      ) : (
        <ApexCharts
          type="candlestick"
          series={series}
          options={{
            theme: {
              mode: isDark ? 'dark' : 'light',
            },
            chart: {
              type: 'candlestick',
              height: 300,
              width: 500,
              toolbar: { show: false },
              background: 'transparent',
            },
            grid: {
              // show: false,
            },
            yaxis: { show: false },
            xaxis: {
              labels: {
                show: true,
                rotate: -45,
                rotateAlways: true,
                minHeight: 100,
              },
              axisTicks: { show: false },
              axisBorder: { show: false },
              type: 'datetime',
              categories: data?.map((price) =>
                new Date(price.time_close * 1000).toISOString()
              ),
            },
            tooltip: {
              y: {
                formatter: (value) => `$${value.toFixed(2)}`,
              },
            },
            stroke: {
              curve: 'smooth',
              width: 2,
            },
          }}
        />
      )}
    </div>
  );
}

export default Chart;
