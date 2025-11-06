declare module '@reportportal/agent-js-cucumber' {
    export default class ReportPortalCucumber {
        constructor(config: any);
        setReporterOptions(config: any): void;
        registerListeners(): void;
    }
}

declare module '@reportportal/agent-js-cucumber/dist/listeners' {
    export function registerListeners(config: any): void;
}

declare module '@reportportal/client-javascript' {
    interface RPClientConfig {
        apiKey: string;
        endpoint: string;
        project: string;
        launch: string;
        attributes?: Array<{ key: string; value: string }>;
    }

    interface LogEntry {
        level: 'INFO' | 'ERROR' | 'DEBUG' | 'WARN';
        message: string;
        time: string;
        file?: {
            name: string;
            type: string;
            content: string;
        };
    }

    export default class RPClient {
        constructor(config: RPClientConfig);
        sendLog(testId: string, log: LogEntry): Promise<void>;
    }
} 