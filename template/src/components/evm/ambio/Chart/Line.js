import React from 'react';
import { processColor } from 'react-native';
import { LineChart } from 'react-native-charts-wrapper';
import PropsType from 'prop-types';
import { Block } from '@breUi';

const LineChartScreen = props => {
  const { backgroundColor, gardientColors, circleColor, markerColor, highlightColor, color, textColor, textSize, borderColor, values, valueFormatter, label, onSelect, valueFormat } = props;
  const handleSelect = event => {
    let entry = event.nativeEvent;
    if (entry && typeof onSelect == 'function') {
      onSelect(entry);
    }
  };

  return (
    <Block flex >
      <LineChart
        chartBackgroundColor={processColor(backgroundColor)}
        style={{ flex: 1 }}
        data={{
          dataSets: [
            {
              values: values,
              label: label,
              config: {
                mode: 'CUBIC_BEZIER',
                drawValues: false,
                lineWidth: 1,
                drawCircles: true,
                circleColor: processColor(circleColor),
                drawCircleHole: false,
                circleRadius: 0,
                highlightColor: processColor(highlightColor),
                color: processColor(color),
                drawFilled: true,
                fillGradient: {
                  colors: gardientColors.map((color) => processColor(color)),
                  positions: [0, 0.5],
                  angle: 90,
                  orientation: 'TOP_BOTTOM',
                },
                fillAlpha: 1000,
                valueTextSize: 15,
                valueFormatter: valueFormat,
              },
            },
          ],
        }}
        chartDescription={{ text: '' }}
        marker={{
          enabled: true,
          digits: 2,
          backgroundTint: processColor('teal'),
          markerColor: processColor(markerColor),
          textColor: processColor('white'),
          textSize: 20,
        }}
        xAxis={{
          granularityEnabled: true,
          granularity: 1,
          position: 'BOTTOM',
          valueFormatter: valueFormatter,
          textColor: processColor(textColor),
          gridColor: processColor('#e3e3e3'),
          axisLineColor: processColor('#e3e3e3'),
          axisLineWidth: 1,
        }}
        yAxis={{
          left: {
            axisMinimum: 0,
            textColor: processColor(textColor),
            gridColor: processColor('#e3e3e3'),
            axisLineColor: processColor('#e3e3e3'),
            axisLineWidth: 1,
          },
          right: {
            axisMinimum: 0,
            textColor: processColor(textColor),
            gridColor: processColor('#e3e3e3'),
            axisLineColor: processColor('#e3e3e3'),
            axisLineWidth: 1,
          },
        }}
        legend={{
          enabled: true,
          textSize: textSize,
          form: 'SQUARE',
          formSize: 14,
          xEntrySpace: 10,
          yEntrySpace: 5,
          formToTextSpace: 5,
          wordWrapEnabled: true,
          maxSizePercent: 0.5,
          textColor: processColor(textColor),
        }}
        drawGridBackground={false}
        borderColor={processColor('#e3e3e3')}
        borderWidth={1}
        drawBorders={true}
        autoScaleMinMaxEnabled={false}
        touchEnabled={true}
        dragEnabled={true}
        scaleXEnabled={true}
        scaleYEnabled={true}
        pinchZoom={true}
        doubleTapToZoomEnabled={true}
        highlightPerTapEnabled={true}
        highlightPerDragEnabled={false}
        dragDecelerationEnabled={true}
        dragDecelerationFrictionCoef={0.99}
        keepPositionOnRotation={false}
        onSelect={handleSelect}
      />
    </Block>
  );
};

LineChartScreen.propTypes = {
  values: PropsType.array,
  valueFormatter: PropsType.array,
  label: PropsType.string,
  onSelect: PropsType.func,
  valueFormat: PropsType.string,
};

LineChartScreen.defaultProps = {
  values: [1, 2, 3, 5],
  valueFormatter: ['1h', '2h', '3h'],
  label: '',
  onSelect: () => { },
  backgroundColor: 'black',
  gardientColors: ['red', 'black'],
  circleColor: 'black',
  highlightColor: 'black',
  color: 'black',
  textColor: 'black',
  textSize: 20,
  borderColor: 'black',
  markerColor: 'black'

};

export default LineChartScreen;
