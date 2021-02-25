import { ParsingOptions } from '../../types/Parsing'

/**
 * Parse JSON file from given path
 * Throw error if can't access file or file format is invalid
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default async function parseAsJSON<T = unknown>(filePath: string, options?: ParsingOptions): Promise<T> {
  return Promise.reject(new Error('Not implemented'))
}
