import { Toast} from "./toast.model";
import styles from './Toast.module.css';
import {Alert} from 'react-bootstrap';
import { useEffect } from "react";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { removeToast } from "../../stores/ui";

const Toasts = (props: { toasts: Toast[]}) => {

    const scheduled = useRef<string[]>([]);
    const dispatch = useDispatch();

    useEffect(() => {
       props.toasts.forEach((t: Toast) => {
           if (!scheduled.current.includes(t.id) && t.duration) {
               scheduled.current = [...scheduled.current, t.id];
               setTimeout(() => {
                   dispatch(removeToast(t.id))
               }, t.duration);
           }
       })
    }, [props.toasts, dispatch]);


    return (
        <div className={styles.ToastContainer}>
            {
                props.toasts.map((t: Toast) => (
                    <Alert key={t.id} variant={t.type}>
                        {t.text}
                    </Alert>
                ))
            }
        </div>
    );
}





export default Toasts;
