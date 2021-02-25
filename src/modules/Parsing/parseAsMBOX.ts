import { PaginationOptions, ParsingOptions } from '../../types/Parsing'

/**
 * Parse MBOX file from given path
 * Throw error if can't access file or file format is invalid
 */
export default async function parseAsMBOX(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  filePath: string,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  options?: ParsingOptions & PaginationOptions,
): Promise<Array<unknown>> {
  return Promise.reject(new Error('Not implemented'))
}
