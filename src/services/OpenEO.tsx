import {OpenEOProcess} from "../interfaces/OpenEOProcess";


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
    'process': {
        'process_graph': {
            'loadcollection1': {
                'process_id': 'load_collection',
                'arguments': {
                    'bands': ['B04', 'B08'],
                    'id': 'TERRASCOPE_S2_TOC_V2',
                    'spatial_extent': {
                        'west': 575080.3763898548,
                        'east': 576080.3763898548,
                        'south': 6663988.690364948,
                        'north': 6664988.690364948,
                        'crs': 'EPSG:3857'
                    },
                    'temporal_extent': null
                }
            },
            'filtertemporal1': {
                'process_id': 'filter_temporal',
                'arguments': {'data': {'from_node': 'loadcollection1'}, 'extent': ['2021-03-31', '2021-03-31']}
            },
            'reducedimension1': {
                'process_id': 'reduce_dimension',
                'arguments': {
                    'data': {'from_node': 'filtertemporal1'},
                    'dimension': 'bands',
                    'reducer': {
                        'process_graph': {
                            'arrayelement1': {
                                'process_id': 'array_element',
                                'arguments': {'data': {'from_parameter': 'data'}, 'index': 1}
                            },
                            'arrayelement2': {
                                'process_id': 'array_element',
                                'arguments': {'data': {'from_parameter': 'data'}, 'index': 0}
                            },
                            'subtract1': {
                                'process_id': 'subtract',
                                'arguments': {'x': {'from_node': 'arrayelement1'}, 'y': {'from_node': 'arrayelement2'}}
                            },
                            'add1': {
                                'process_id': 'add',
                                'arguments': {'x': {'from_node': 'arrayelement1'}, 'y': {'from_node': 'arrayelement2'}}
                            },
                            'divide1': {
                                'process_id': 'divide',
                                'arguments': {'x': {'from_node': 'subtract1'}, 'y': {'from_node': 'add1'}},
                                'result': true
                            }
                        }
                    }
                }
            },
            'saveresult1': {
                'process_id': 'save_result',
                'arguments': {'data': {'from_node': 'reducedimension1'}, 'format': 'gtiff', 'options': {}},
                'result': true
            }
        }
    }
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


export const executeService = (service: OpenEOProcess): Promise<string> => {
    return getToken(OPENEO_USERNAME, OPENEO_PASSWORD)
        .then((token: string) => fetch(`${OPENEO_BASE}jobs`, {
            headers: {
                ...createAuthHeader(token),
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(buildGraph(service))
        }))
        .then((response: Response) => response.headers.get('Location') || '');
}

