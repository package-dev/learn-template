import { View, ViewProps } from 'react-native'
import { chunk } from 'underscore'
import React from 'react'
type ListViewProps = {
  data?: any
  renderItem: ({ item, index }: { item: any, index: number }) => React.ReactElement
  keyExtractor?: (item: any, index: number) => string
  style?: ViewProps['style']
  horizontal?: boolean
  numberColumn?: number
}

export function ListData({ data = [], renderItem, keyExtractor, style }: ListViewProps) {
  if (!Array.isArray(data)) return null
  return (
    <>
      {Array.isArray(data) && data.map((item, index) =>
        <View key={keyExtractor ? keyExtractor(item, index) : index} style={style}>
          {renderItem({ item, index })}
        </View>
      )}
    </>
  )
}
export function ListMap({ data = [], renderItem, keyExtractor, style, horizontal }: ListViewProps) {
  if (!Array.isArray(data)) return null
  return (
    <View style={[{ ...horizontal && { flexDirection: 'row' } }, style]}>
      {Array.isArray(data) && data.map((item, index) =>
        <View key={keyExtractor ? keyExtractor(item, index) : index}>
          {renderItem({ item, index })}
        </View>
      )}
    </View>
  )
}
interface ListColumnProps {
  data?: any
  renderItem: ({ item, index }: { item: any, index: number }) => React.ReactElement
  keyExtractor?: (item: any, index: number) => string
  style?: ViewProps['style']
  numberColumn?: number
  styleRow?: ViewProps['style']
  styleCell?: ViewProps['style']
  styleContainer?: ViewProps['style']
}
export function ListColumn({ data = [], renderItem, keyExtractor, styleRow, styleContainer, styleCell, numberColumn = 1 }: ListColumnProps) {
  if (!Array.isArray(data)) return null
  const ListData = chunk(data, numberColumn)
  return (
    <View style={styleContainer} >
      {ListData.map((rows, rowId) =>
        <View key={rowId} style={[{ flexDirection: 'row' }, styleRow]}>
          {rows.map((item, index) =>
            <View style={styleCell} key={keyExtractor ? keyExtractor(item, index) : index}>
              {renderItem({ item, index })}
            </View>
          )}
        </View>
      )}
    </View>
  )
}