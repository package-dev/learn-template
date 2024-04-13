export const COLORS = {
    primary: '#ff9600',
    black: '#4f5064',
    gray: '#818181',
    green: '#00C981',
    blue: '#1d84c7',
    origin: '#ff9600',
    red: '#ff0621',
    purple: '#9E54CF',
}

export type ColorName = keyof typeof COLORS
export const Colors = (key: ColorName) => {
    return COLORS[key]
}
