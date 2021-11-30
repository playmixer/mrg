import React from 'react';

interface Props {
    children: any
}

const Layout = (props: Props) => {
    return <div className={"container"}>
        {props.children}
    </div>
}

export default Layout;
