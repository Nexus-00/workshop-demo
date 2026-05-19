export function buildQueries(ticker: string): string[] {
  return [
    `${ticker} current stock price market cap PE ratio 52 week range`,
    `${ticker} analyst price targets ratings consensus`,
    `${ticker} recent news earnings results product launches`,
    `${ticker} risks bear case competitive position peers`,
  ]
}
