import React, {useEffect, useState } from 'react';
import { Button, Spinner } from 'react-bootstrap';
import { getJobs } from '../../services/OpenEO';
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

const Jobs = () => {
    const [jobs, setJobs] = useState([])
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        _getJobs(setJobs, setLoading);
    }, []);

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
                        <div className={styles.Job}>
                            <div className={styles.JobDate}>
                                {j.created}
                            </div>
                            <div className={styles.JobTitle}>
                                {j.process.id || 'Job'}
                            </div>
                            <div className={styles.JobDuration}>
                                {j.duration_human_readable || ''}
                            </div>
                            <div className={styles[CamelCase(j.status)]}>
                                {CamelCase(j.status)}
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Jobs
