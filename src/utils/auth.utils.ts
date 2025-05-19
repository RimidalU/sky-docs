import crypto from 'crypto'
import { Request } from 'express'
import { getHash } from './crypto.utils.js'

const generateFingerprint = (req: Request): string => {
    const headers = req.headers

    const ipRaw = (headers['x-forwarded-for'] as string) || req.ip || ''
    const ip = ipRaw.split(',')[0].trim()
    const ipSubnet = ip.split('.').slice(0, 2).join('.')

    const values = [
        headers['user-agent'],
        ipSubnet,
        headers['accept-language'],
        headers['accept'],
        headers['connection'],
        headers['cache-control'],
        headers['sec-ch-ua'],
        headers['sec-ch-ua-platform'],
    ]
        .map((value) => (typeof value === 'string' ? value : ''))
        .join('|')

    return getHash(values)
}

export { generateFingerprint }
