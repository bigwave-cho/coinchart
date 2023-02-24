import ApexCharts from 'react-apexcharts';
import { useQuery } from 'react-query';
import { fetchCoinHistory } from '../api';
import { ChartProps, IHistorical } from './Chart';

function Price({ coinId }: ChartProps) {
  const { isLoading, data } = useQuery<IHistorical[]>(['ohlcv', coinId], () =>
    fetchCoinHistory(coinId)
  );

  return (
    <>
      {isLoading ? (
        'Loading..'
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
            yaxis: {
              labels: {
                formatter: function (val) {
                  return val.toFixed(2);
                },
              },
              title: {
                text: 'Price',
              },
            },
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
            fill: {
              type: 'gradient',
              gradient: { gradientToColors: ['#0be881'], stops: [0, 100] },
            },
            colors: ['blue'],
            tooltip: {
              y: {
                formatter: (value) => `$${value.toFixed(2)}`,
              },
            },
            stroke: {
              curve: 'smooth',
              width: 5,
            },
          }}
        />
      )}
    </>
  );
}

export default Price;
