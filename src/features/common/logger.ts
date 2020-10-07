import { datadogLogs } from '@datadog/browser-logs';

datadogLogs.init({
    clientToken: 'pub53593a4ff7c67498d883020ad3e5bf8d',
    site: 'datadoghq.com',
    forwardErrorsToLogs: true,
    sampleRate: 100
});

export default datadogLogs;