import { useState, useEffect } from "react";

const TimerX = () => {
  const [running, setrunning] = useState(false);
  const [timeAtClick, settimeAtClick] = useState(false);
  const [hours, setHours] = useState(1);
  const [minutes, setMinutes] = useState(30);
  const [seconds, setSeconds] = useState(0);

  const HandleStartTimer = () => {
    setSeconds(0);
    setMinutes(30);
    setHours(1);
    setrunning(true);
  };
  const HandleStopTimer = () => {
    setrunning(false);
  };


  useEffect(() => {
    let interval;
    if (running) {
      interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds((seconds) => seconds - 1);
        } else if (minutes > 0) {
          setMinutes((minutes) => minutes - 1);
          setSeconds(59);
        } else if (hours > 0) {
          setHours((hours) => hours - 1);
          setMinutes(59);
          setSeconds(59);
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [running, seconds, minutes, hours]); //adding all the dependencies is very important
  return (
    <div>
      <div>
        <span> {hours > 9 ? hours : "0" + hours}hr :</span>
        <span> {minutes > 9 ? minutes : "0" + minutes}min :</span>
        <span> {seconds > 9 ? seconds : "0" + seconds}secs </span>
      </div>
      <div>
        <button
          className="bbtn m-5 bg-blue-400 text-white px-2 py-2"
          onClick={HandleStartTimer}
        >
          start
        </button>
        <button
          className="bbtn m-5 bg-blue-400 text-white px-2 py-2"
          onClick={HandleStopTimer}
        >
          stop
        </button>
        <button
          className="bbtn m-5 bg-blue-400 text-white px-2 py-2"
          onClick={() => settimeAtClick(!timeAtClick)}
        >
          click
        </button>
      </div>
    </div>
  );
};

export default TimerX;
