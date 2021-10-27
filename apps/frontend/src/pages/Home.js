import React from 'react';
import Button from "../components/Button";
import {notify} from "../components/Notification";


const Home = () => {
  return <div>
    HOME
    <Button onClick={() => notify("test")}>
      success
    </Button>
    <Button onClick={() => notify("test", "info")}>
     info
    </Button>
    <Button onClick={() => notify("test", "danger")}>
     danger
    </Button>
    <Button onClick={() => notify("test", "warning")}>
     warning
    </Button>
    <Button onClick={() => notify("test", "default")}>
     default
    </Button>
  </div>
}

export default Home;
