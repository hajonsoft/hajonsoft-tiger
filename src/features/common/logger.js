import { datadogLogs } from '@datadog/browser-logs';

datadogLogs.init({
    clientToken: 'pub8f5cd67e84c804d6835f1200fce39421',
    site: 'datadoghq.com',
    forwardErrorsToLogs: true,
    sampleRate: 100
});

export default datadogLogs;