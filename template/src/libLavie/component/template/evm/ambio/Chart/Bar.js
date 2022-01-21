import React from 'react';
import { processColor, Platform } from 'react-native';
import { BarChart } from 'react-native-charts-wrapper';
import PropsType from 'prop-types';
import { Block } from '@breUi';
import { isArray } from 'underscore';

const BarChartScreen = (props) => {
  const { valueTextColor, valueFormat, valueTextSize, highlightColor, barShadowColor,
    description, color, backgroundColor, textColor, textSize,
    gridBackgroundColor, values, valueFormatter, label, onSelect, } = props

  const handleSelect = event => {
    let entry = event.nativeEvent;
    if (!entry) {
      return;
    }
    if (entry != {} && typeof onSelect == 'function') {
      onSelect(entry);
    }
  };

  return (
    <Block flex>
      <BarChart
        chartBackgroundColor={processColor(backgroundColor)}
        chartDescription={{ text: description }}
        zoom={
          Platform.OS == 'android'
            ? {
              scaleX: 4,
              scaleY: 1,
              xValue: 9999,
              yValue: 1,
              axisDependency: 'RIGHT',
            }
            : {
              scaleX: 2,
              scaleY: 1,
              xValue: -9999,
              yValue: 1,
              axisDependency: 'RIGHT',
            }
        }
        style={{ flex: 1 }}
        data={{
          dataSets: [
            {
              values: values,
              label: label,
              config: {
                color: processColor(color),
                barShadowColor: processColor(barShadowColor),
                highlightAlpha: 90,
                highlightColor: processColor(highlightColor),
                valueTextSize: valueTextSize,
                valueFormatter: valueFormat,
                valueTextColor: processColor(valueTextColor),
              },
            },
          ],

          config: {
            barWidth: 0.7,
          },
        }}
        xAxis={{
          valueFormatter: valueFormatter,
          granularityEnabled: true,
          granularity: 1,
          textColor: processColor(textColor),
          gridColor: processColor('#e3e3e3'),
          axisLineColor: processColor('#e3e3e3'),
          axisLineWidth: 1,
        }}
        yAxis={{
          left: {
            axisMinimum: 0,
            textColor: processColor(textColor),
            // drawAxisLine: false,
            axisLineColor: processColor('#e3e3e3'),
            axisLineWidth: 1,
            gridColor: processColor('#e3e3e3'),
          },
          right: {
            axisMinimum: 0,
            textColor: processColor(textColor),
            // drawAxisLine: false,
            axisLineColor: processColor('#e3e3e3'),
            axisLineWidth: 1,
            gridColor: processColor('#e3e3e3'),
          },
        }}
        animation={{ durationX: 0 }}
        legend={{
          textColor: processColor(textColor),
          enabled: true,
          textSize: textSize,
          form: 'SQUARE',
          formSize: 14,
          xEntrySpace: 10,
          yEntrySpace: 5,
          formToTextSpace: 5,
          wordWrapEnabled: true,
          maxSizePercent: 0.5,
        }}
        gridBackgroundColor={processColor(gridBackgroundColor)}
        visibleRange={{ x: { min: 7, max: 7 } }}
        drawBarShadow={false}
        drawValueAboveBar={true}
        drawHighlightArrow={true}
        onSelect={handleSelect}
        highlights={[{ x: 3 }, { x: 6 }]}
        scaleEnabled={false}
        dragEnabled={isArray(valueFormatter) && valueFormatter.length >= 8}
      />
    </Block>
  );
};

BarChartScreen.propTypes = {
  values: PropsType.arrayOf(PropsType.objectOf(PropsType.number)),
  valueFormatter: PropsType.arrayOf(PropsType.string),
  label: PropsType.string,
  onSelect: PropsType.func,
  valueFormat: PropsType.string,
};

BarChartScreen.defaultProps = {
  values: [{ y: 1 }],
  valueFormatter: ['1'],
  label: '',
  onSelect: () => { },
  valueTextColor: 'black',
  valueFormat: '',
  valueTextSize: 20,
  highlightColor: 'black',
  barShadowColor: 'black',
  description: '',
  color: 'black',
  backgroundColor: 'black',
  textColor: 'black',
  textSize: 20,
  gridBackgroundColor: 'black',

};
export default BarChartScreen;
