import * as Sentry from '@sentry/react'
import { Integrations } from '@sentry/tracing'

function init() {
  Sentry.init({
    dsn: 'https://85cfb2c81a8f45d18fe03d4a1354d79e@o1070890.ingest.sentry.io/6067307',
    integrations: [new Integrations.BrowserTracing()],

    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0
  })
}

function log(error) {
  Sentry.captureException(error)
}

const logger = {
  init,
  log
}
export default logger
