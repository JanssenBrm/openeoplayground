import {OpenEOProcess, OpenEOProcessParam} from "../interfaces/OpenEOProcess";


const OPENEO_BASE = 'https://openeo.vito.be/openeo/1.0/'
const OPENEO_USERNAME = 'marketplace_user'
const OPENEO_PASSWORD = 'marketplace_user123'

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

const buildGraph = (service: OpenEOProcess): any => ({
    title: `OpenEO Job Execution - ${service.id}`,
    description: `${service.description}`,
    process: {
        process_graph: {
            serviceexecute1: {
                process_id: `${service.id}`,
                namespace: 'vito',
                arguments: {
                    ...service.parameters.reduce((result: any, p: OpenEOProcessParam) => {
                        result[p.name] =  p.value;
                        return result;
                    }, {})
                }
            },
            save: {
                process_id: 'save_result',
                arguments: {
                    data: {
                        from_node: 'serviceexecute1'
                    },
                    format: "GTiff"
                },
                result: true
            }
        }
    }
})

const buildServiceGraph = (service: OpenEOProcess): any => ({
  ...buildGraph(service),
    type: 'wmts',
    enabled: true
})

export const getProcesses = (): Promise<OpenEOProcess[]> => {
    return getToken(OPENEO_USERNAME, OPENEO_PASSWORD)
        .then((token: string) => fetch(`${OPENEO_BASE}processes/vito`, {
            headers: {
                ...createAuthHeader(token)
            }
        }))
        .then((response: Response) => response.json())
        .then((data: any) => data.processes)
        .then((processes: OpenEOProcess[]) => processes.map((p: OpenEOProcess) => ({
            ...p,
            parameters: p.parameters.map((param: OpenEOProcessParam) => ({
                ...param,
                value: param.default
            }))
        })));
};

export const createPreviewService =  async (service: OpenEOProcess): Promise<any> => {
    const token = await getToken(OPENEO_USERNAME, OPENEO_PASSWORD);
    const location = await fetch(`${OPENEO_BASE}services`, {
        headers: {
            ...createAuthHeader(token),
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(buildServiceGraph(service))
    }).then((response: Response) => response.headers.get('Location') || '');

    if (location !== '') {
        return await fetch(`${location}/results`, {
            headers: {
                ...createAuthHeader(token),
            },
            method: 'POST'
        }).then((response: Response) => {
            if (response.status === 400) {
                throw new Error(`Could not get results`);
            }
            return response.json();
        });
    } else {
        throw new Error(`Could not create viewing service`);
    }
}

export const executeProcess = async (service: OpenEOProcess): Promise<string> => {
    const token = await getToken(OPENEO_USERNAME, OPENEO_PASSWORD);
    const location = await fetch(`${OPENEO_BASE}jobs`, {
            headers: {
                ...createAuthHeader(token),
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(buildGraph(service))
        }).then((response: Response) => response.headers.get('Location') || '');

    if (location !== '') {
       return await fetch(`${location}/results`, {
            headers: {
                ...createAuthHeader(token),
            },
            method: 'POST'
        }).then((response: Response) => {
           if (response.status === 400) {
               throw new Error(`Could not get results`);
           }
           return location
       });
    }
    return location;
}

export const getJobs = async () : Promise<any> => {
    const token = await getToken(OPENEO_USERNAME, OPENEO_PASSWORD);

    const jobs = await fetch(`${OPENEO_BASE}jobs`, {
        headers: {
            ...createAuthHeader(token),
        },
    })
        .then((response: Response) => response.json())
        .then((data: any) => data.jobs)
        .then((jobs: any[]) => Promise.all(
            jobs.map((j: any) =>
                fetch(`${OPENEO_BASE}jobs/${j.id}`, {
                    headers: {
                        ...createAuthHeader(token),
                    },
                })
                    .then((response: Response) => response.json())
                    .then((info: any) => ({
                        ...j,
                        ...info
                    }))

            )
        ))
        .then((jobs: any[]) => jobs.sort((j1, j2) => new Date(j1.created) < new Date(j2.created) ? 1 : -1));
    return jobs;
}

export const getServices = async () : Promise<any> => {
    const token = await getToken(OPENEO_USERNAME, OPENEO_PASSWORD);

    const services = await fetch(`${OPENEO_BASE}services`, {
        headers: {
            ...createAuthHeader(token),
        },
    })
        .then((response: Response) => response.json())
        .then((data: any) => data.services)
        .then((services: any[]) => Promise.all(
            services.map((s: any) =>
                fetch(`${OPENEO_BASE}services/${s.id}`, {
                    headers: {
                        ...createAuthHeader(token),
                    },
                })
                    .then((response: Response) => response.json())
                    .then((info: any) => ({
                        ...s,
                        ...info
                    }))

            )
        ))
    console.log(services);
    return services;
}

export const getLogs = async (id: string) : Promise<string[]> => {
    const token = await getToken(OPENEO_USERNAME, OPENEO_PASSWORD);

    const logs = await fetch(`${OPENEO_BASE}jobs/${id}/logs`, {
        headers: {
            ...createAuthHeader(token),
        },
    })
        .then((response: Response) => response.json())
        .then((data: any) => data.logs)
        .then((logs: any) => logs.filter((l: any) => l.message).map((l: any) => `${l.time} - ${l.level.toUpperCase()} - ${l.message}`))

    return logs;
}

export const downloadJobResult = async (id: string) : Promise<any> => {
    const token = await getToken(OPENEO_USERNAME, OPENEO_PASSWORD);

    const results = await fetch(`${OPENEO_BASE}jobs/${id}/results`, {
        mode: 'cors',
        headers: {
            ...createAuthHeader(token),
        },
    })
        .then((response: Response) => response.text())
        .then((data: string) => JSON.parse(data.replace('NaN', `"NaN"`)).assets)
        .then((assets: any) => Object.keys(assets).map((a: string) => ({
            filename: a,
            url: assets[a].href
        })));

    await Promise.all(
        results.map((r: any) => fetch(r.url, {
            headers: {
                ...createAuthHeader(token),
            },
        })
            .then((res: Response) => {
                return res.blob();
            }).then((blob: Blob) => {
                const href = window.URL.createObjectURL(blob);
                window.open(href, '_blank');
            })
        )
    )

    return results;
}
