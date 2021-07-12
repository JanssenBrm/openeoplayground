import React, {useEffect, useState } from 'react';
import { Button, Spinner } from 'react-bootstrap';
import { FaDownload } from 'react-icons/fa';
import {downloadJobResult, getJobs, getLogs } from '../../services/OpenEO';
import { CamelCase } from '../../services/Utils.t';
import styles from './Jobs.module.css';


const _getJobs = (setJobs: Function, setLoading: Function)  => {
    setLoading(true);
    getJobs()
        .then((jobs: any) => {
            setJobs(jobs)
        })
        .finally(() => setLoading(false));
}

const _getLogs = (id: string, setLogs: Function, setLoading: Function)  => {
    setLoading(true);
    getLogs(id)
        .then((logs: string[]) => {
            setLogs(logs);
        })
        .finally(() => setLoading(false));
}

const _dowloadResult = (id: string) => {
    downloadJobResult(id)
        .then((result: any) => {
            console.log(result)
        })
}

const Jobs = () => {
    const [jobs, setJobs] = useState([])
    const [loading, setLoading] = useState(false);
    const [expanded, setExpanded] = useState<string | undefined>(undefined);
    const [logs, setLogs] = useState<string[]>([]);


    useEffect(() => {
        _getJobs(setJobs, setLoading);
    }, []);

    useEffect(() => {
        if (expanded) {
            setLogs([]);
            _getLogs(expanded, setLogs, setLoading);
        }
    }, [expanded])

    return (
        <div className={styles.JobsContainer}>
            <div className={styles.JobsHeader}>
                <h3>Jobs</h3>
                <Button onClick={() => _getJobs(setJobs, setLoading)} disabled={loading}>
                    {
                        loading ? (
                                <Spinner animation="border"/>
                            ) :
                            'Refresh'
                    }
                </Button>
            </div>
            <div className={styles.JobList}>
                {
                    jobs.map((j: any) => (
                        <div className={styles.Job} onClick={() =>  setExpanded(j.id)}>
                            <div className={styles.JobRow}>
                                <div className={styles.JobDate}>
                                    {j.created}
                                </div>
                                <div className={styles.JobInfo}>
                                    <div className={styles.JobTitle}>
                                        {j.title || 'Job'}
                                    </div>
                                    <div className={styles.JobDescription}>
                                        {j.description || ''}
                                    </div>
                                </div>
                                <div className={styles.JobActions}>
                                    {
                                        j.status === 'finished' ? (
                                            <FaDownload onClick={() => _dowloadResult(j.id)}/>
                                        ) : ''
                                    }
                                </div>
                                <div className={styles.JobDuration}>
                                    {j.duration_human_readable || ''}
                                </div>
                                <div className={styles[CamelCase(j.status)]}>
                                    {CamelCase(j.status)}
                                </div>
                            </div>
                            {
                                expanded === j.id ? (
                                    <div className={styles.JobRow}>
                                        <div className={styles.JobLogs}>
                                            {
                                                logs.length > 0 ? logs.map((l: string) => (
                                                    <span>{l}</span>
                                                )) : <span>No logs available</span>
                                            }
                                        </div>
                                    </div>
                                ): ''
                            }

                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Jobs

