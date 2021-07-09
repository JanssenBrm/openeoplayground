import {OpenEOProcess} from "../interfaces/OpenEOProcess";


const OPENEO_BASE = 'https://openeo.vito.be/openeo/1.0/'
const OPENEO_USERNAME = 'bramjanssen'
const OPENEO_PASSWORD = 'bramjanssen123'

const getToken = (username: string, password: string): Promise<string> =>
    fetch(`${OPENEO_BASE}credentials/basic`, {
        headers: {
            Authorization: `Basic ${Buffer.from(username + ":" + password).toString('base64')}`
        }
    })
        .then((response: Response) => response.json())
        .then((tokens: any) => tokens.access_token)


const createAuthHeader = (token: string): any => ({
    Authorization: `Bearer ${token}`
})
export const getServices = (): Promise<OpenEOProcess[]> => {
    return getToken(OPENEO_USERNAME, OPENEO_PASSWORD)
        .then((token: string) => fetch(`${OPENEO_BASE}processes/vito`, {
            headers: {
                ...createAuthHeader(token)
            }
        }))
        .then((response: Response) => response.json())
        .then((data: any) => data.processes);
    };

