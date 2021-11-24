import React from 'react';

interface Props {
    children: HTMLBodyElement
}

const Layout = (props: Props) => {
    return (<div className={"container"}>
        {props.children}
    </div>)
}

export default Layout;
