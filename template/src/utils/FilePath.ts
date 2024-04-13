import { isString } from "underscore"

export class FilePath {
    static getUrlExtension(url: any) {
        if (url) {
            return url.split(/[#?]/)[0].split('.').pop().trim()
        }
    }
    static getUrlName(url: any) {
        if (url)
            return url
                .split(/(\\|\/)/g)
                .pop()
                .split('.')[0]
    }
    static getNameExtension(url: any) {
        if (url) return url.split(/(\\|\/)/g).pop()
    }
    static getTypeFile = (filename: any) => {
        if (isString(filename)) {
            return filename.split('.').pop()
        }
        return ""
    }
}