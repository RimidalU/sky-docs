import path from 'path'

const getFileNameWithoutExt = (filename: string) => {
    return path.parse(filename).name
}

export { getFileNameWithoutExt }
