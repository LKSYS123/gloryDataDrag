import React, { useRef, useState, useEffect } from 'react';
import { Button, Container, makeStyles, Typography } from '@material-ui/core';
import { Map } from '@material-ui/icons';
import { Routes, Route, Outlet } from 'react-router-dom';
import NewWindow from 'react-new-window';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import GeoJsonCopy from './GeoJsonCopy';

const useStyles = makeStyles((theme) => ({
    container: {
        paddingTop: theme.spacing(2),
    },
    button: {
        // display: "flex",
        size: 'large',
        color: '#555',
        right: 12,
        bottom: 5,
        // alignItems: "center",
        // marginBottom: theme.spacing(2),
    },
}));

const RenderInWindow = (props) => {
    // const [container, setContainer] = useState(null);
    // const newWindow = useRef(null);
    const containerEl = document.createElement('div');
    let newWindow = null;
    // const urlpop = useNavigate('/sample4')
    console.log('**************');
    // useEffect(() => {
    //   // Create container element on client-side
    //   setContainer(document.createElement("div"));
    // }, []);

    // let newWindow = null;

    useEffect(() => {
        // When container is ready
        if (containerEl) {
            // Create window
            // newWindow.current = window.open(
            //   "./Sample1",
            //   "",
            //   "width=600,height=400,left=200,top=200"
            // );

            // newWindow.current = window.open(
            newWindow = window.open('/geojsoncopy', '', '_blank');

            // Append container
            // newWindow.current.document.body.appendChild(container);
            newWindow.document.body.appendChild(containerEl);

            newWindow.addEventListener('beforeunload', () => {
                props.colsePopupWindow();
            });
            // Save reference to window for cleanup
            // const curWindow = newWindow.current;

            // Return cleanup function
            // return () => curWindow.close();
            return function cleanup() {
                // newWindow.current.close();
                // newWindow.current = null;
                // 아래 소스 주석 풀면 다른 화면으로 이동 시 팝업 Close 됨
                // newWindow.close();
                // newWindow = null;
            };
        }
        // }, [container]);
    }, []);

    // return container && createPortal(props.children, container);
    return containerEl && createPortal(props.children, containerEl);
    // return createPortal(props.children, containerEl);
};

const OpenlayerPop = () => {
    const classes = useStyles();

    //   const RenderInWindow = (props) => {
    //     const [container, setContainer] = useState(null);
    //     const newWindow = useRef(null);

    //     useEffect(() => {
    //       // Create container element on client-side
    //       setContainer(document.createElement("div"));
    //     }, []);

    //     useEffect(() => {
    //       // When container is ready
    //       if (container) {
    //         // Create window
    //         newWindow.current = window.open(
    //           "",
    //           "",
    //           "width=600,height=400,left=200,top=200"
    //         );
    //         // Append container
    //         newWindow.current.document.body.appendChild(container);

    //         // Save reference to window for cleanup
    //         const curWindow = newWindow.current;

    //         // Return cleanup function
    //         return () => curWindow.close();
    //       }
    //     }, [container]);

    //     return container && createPortal(props.children, container);
    //   };
    const [open, setOpen] = useState(false);
    const togglePopupWindowWithHooks = () => setOpen(!open);
    // const [close, setClose] = useState(false);
    const colsePopupWindow = () => setOpen(false);
    // Side Effect
    useEffect(() =>
        window.addEventListener('beforeunload', () => {
            // colsePopupWindow()
        })
    );

    return (
        <Container className={classes.container}>
            <>
                <Button
                    variant='outlined'
                    color='primary'
                    className={classes.button}
                    onClick={togglePopupWindowWithHooks}
                >
                    <Map className={classes.icon} />
                    <Typography className={classes.text}>
                        Window Open
                    </Typography>
                </Button>
                {open && (
                    <RenderInWindow
                        colsePopupWindow={colsePopupWindow}
                    ></RenderInWindow>
                )}
            </>
        </Container>
    );
};

export default OpenlayerPop;
