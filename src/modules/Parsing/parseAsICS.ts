import { ParsingOptions } from '../../types/Parsing'

/**
 * Parse ICS file from given path
 * Throw error if can't access file or file format is invalid
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default async function parseAsICS(filePath: string, options?: ParsingOptions): Promise<unknown> {
  return Promise.reject(new Error('Not implemented'))
}
