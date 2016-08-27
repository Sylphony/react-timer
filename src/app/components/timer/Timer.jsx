import TimerCtrlBtn from "./TimerCtrlBtn.jsx";

class Timer extends React.Component {
    constructor(state) {
        super(state);

        this.state = {
            hours: 0,
            minutes: 0,
            seconds: 0
        };
    }

    componentDidMount() {
        this.setState({
            startDisabled: false
        });
    }

    componentWillUnmount() {
        this.stop();
    }

    render() {
        return (
            <div className="timer">
                <div className="timer__wrapper">
                    <span className="timer__digit">{ this.addLeadingZeroes(this.state.hours) }</span>
                    <span className="timer__separator">:</span>
                    <span className="timer__digit">{ this.addLeadingZeroes(this.state.minutes) }</span>
                    <span className="timer__separator">:</span>
                    <span className="timer__digit">{ this.addLeadingZeroes(this.state.seconds) }</span>
                </div>

                <div className="timer__controls">
                    <TimerCtrlBtn type="start" icon="play" click={ this.start.bind(this) } disabled={ this.state.startDisabled } />
                    <TimerCtrlBtn type="stop" icon="stop" click={ this.stop.bind(this) } />
                    <TimerCtrlBtn type="reset" icon="refresh" click={ this.reset.bind(this) } />
                </div>
            </div>
        );
    }

    start() {
        const secsPerMin = 60;
        const minsPerHour = 60;

        let timer = setInterval(() => {
            this.setState({
                seconds: this.state.seconds + 1
            });

            if (this.state.seconds === secsPerMin) {
                this.setState({ 
                    minutes: this.state.minutes + 1,
                    seconds: 0
                });     
            }

            if (this.state.minutes === minsPerHour) {
                this.setState({ 
                    hours: this.state.hours + 1,
                    minutes: 0,
                    seconds: 0
                });  
            }
        }, 1000);

        this.setState({
            timer: timer,
            startDisabled: true
        });
    }

    stop() {
        clearInterval(this.state.timer);

        this.setState({
            startDisabled: false
        });
    }

    reset() {
        this.stop();

        this.setState({
            hours: 0,
            minutes: 0,
            seconds: 0
        });
    }

    addLeadingZeroes(num, numZeroes = 1, numDigits = 2) {
        let numStr = num.toString();

        if (num >= 0) {
            for (let count = 0; count < numZeroes; count++) {
                numStr = "0" + numStr;
            }
        }

        // Format to number of digits wanted
        numStr = numStr.slice(-1 * numDigits);

        return numStr;
    }
}

export default Timer;
