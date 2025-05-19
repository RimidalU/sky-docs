import { getListFilesByUserId } from '../repositories/file.repository.js'

const listFilesService = async (
    userId: number,
    page: number,
    listSize: number
) => {
    try {
        const [files, total] = await getListFilesByUserId(
            userId,
            page,
            listSize
        )

        return {
            total,
            page,
            listSize,
            files,
        }
    } catch (err) {
        throw err
    }
}

export { listFilesService }
