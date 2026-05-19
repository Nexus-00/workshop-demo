import { buildQueries } from './queries.js'
import { searchOne } from './search.js'
import { synthesize } from './synthesize.js'
import type { ResearchEvent } from '../../shared/types.js'

export async function research(
  ticker: string,
  onEvent: (e: ResearchEvent) => void
): Promise<string> {
  const queries = buildQueries(ticker)
  onEvent({ type: 'started', ticker, queries })

  const results = await Promise.all(
    queries.map(async (query, index) => {
      onEvent({ type: 'search:running', index })
      try {
        const result = await searchOne(ticker, query, index)
        onEvent({ type: 'search:done', index, articleCount: result.articles.length })
        return result
      } catch (err) {
        onEvent({ type: 'search:failed', index, error: String(err) })
        throw err
      }
    })
  )

  onEvent({ type: 'synthesizing' })
  const memo = await synthesize(ticker, results)
  onEvent({ type: 'done', memo })
  return memo
}
