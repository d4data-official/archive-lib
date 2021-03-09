import papa, { ParseError } from 'papaparse'
import fs from 'fs'
import path from 'path'
import { PaginationOptions, ParsingOptions } from '../../types/Parsing'
import Pipeline from '../../classes/Pipeline'

export interface OptionsCSV {
  columns?: Array<string>
}
export type OptionsParseAsCSV = ParsingOptions & PaginationOptions & OptionsCSV

/**
 * Parse given Pipeline result stream as CSV format
 */
export default async function parseAsCSV<T = any>(pipeline: Pipeline, options?: OptionsParseAsCSV): Promise<Array<T>> {
  const stream = pipeline.run()
  const content: Array<T> = [];
  const items = options?.pagination?.items ?? 0
  const offset = options?.pagination?.offset ?? 0
  let index = 0

  return new Promise((resolve) => {
    papa.parse(stream, {
      header: !options?.columns,
      error(error: ParseError) {
        console.error(error)
      },
      step(row: any, parser: any) {
        if (items === 0) {
          // @ts-ignore
          content.push(row.data)
          return;
        }
        if (offset + items === index) {
          parser.abort()
          // @ts-ignore
          stream.destroy()
          return
        }
        if (index >= offset) {
          // @ts-ignore
          content.push(row.data);
        }
        index += 1
      },
      complete() {
        resolve(content)
      },
    });
  })
    .then((data) => {
      if (!options?.columns) {
        return data
      }
      // @ts-ignore
      return data.map((item) => {
        const obj = {}
        for (let i = 0; i < (options?.columns?.length ?? 0); i += 1) {
          const colName = options?.columns![i]
          // @ts-ignore
          obj[colName] = item[i]
        }
        return obj
      })
    })
}
