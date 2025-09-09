import React from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Text } from 'react-native-paper';

const PriceHistoryChart = ({ data }) => {
  if (!data || data.length === 0) {
    return <Text style={styles.noDataText}>No price history available.</Text>;
  }

  const chartData = {
    labels: data.map(item => item.date),
    datasets: [
      {
        data: data.map(item => item.price),
      },
    ],
  };

  return (
    <View style={styles.container}>
      <Text style={styles.chartTitle}>Price History</Text>
      <LineChart
        data={chartData}
        width={Dimensions.get('window').width - 40} // from react-native
        height={220}
        yAxisLabel="$"
        yAxisSuffix=""
        chartConfig={chartConfig}
        bezier
        style={styles.chart}
      />
    </View>
  );
};

const chartConfig = {
  backgroundColor: '#e26a00',
  backgroundGradientFrom: '#fb8c00',
  backgroundGradientTo: '#ffa726',
  decimalPlaces: 2, // optional, defaults to 2dp
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  style: {
    borderRadius: 16,
  },
  propsForDots: {
    r: '6',
    strokeWidth: '2',
    stroke: '#ffa726',
  },
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    alignItems: 'center',
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  noDataText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: 'gray',
  },
});

export default PriceHistoryChart;