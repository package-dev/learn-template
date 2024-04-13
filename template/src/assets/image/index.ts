import { SRC_COMMON } from './src_require'
export type ImageName = keyof typeof SRC_COMMON
export const Images = (name: ImageName) => {
  return SRC_COMMON[name]
}
export { default as IconImg } from './IconImg'