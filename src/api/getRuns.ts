import { requestHandler } from '../utils/requestHandler';
import { Run } from '../types';

/**
 * TODO this casting sucks
 */
export default function getRuns(userId: string): Promise<Run[]> {
    return requestHandler(`/runs/${userId}`).then((runs: any) => {
        return runs.map((run: any) => ({
            date: run.datetime,
            distance: run.length,
            duration: run.duration,
            route: JSON.parse(run.route.points),
        }));
    });
}
