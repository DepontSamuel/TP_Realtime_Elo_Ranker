import { AppService } from '../app.service';
export declare class MatchController {
    private appService;
    constructor(appService: AppService);
    publishMatchResults(body: {
        winner: string;
        loser: string;
        draw: boolean;
    }): Promise<{
        winner: import("../app.service").Player;
        loser: import("../app.service").Player;
    }>;
}
