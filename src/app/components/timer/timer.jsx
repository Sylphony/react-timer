class Timer extends React.Component {
    constructor(state) {
        super(state);

        this.state = {
            minutes: 0,
            seconds: 0
        };
    }

    componentWillUnmount() {
        this.stop();
    }

    render() {
        return (
            <div className="timer">
                <div className="timer__inner">
                    <span className="timer__digit">{ this.addLeadingZeroes(this.state.minutes) }</span>
                    <span className="timer__separator">:</span>
                    <span className="timer__digit">{ this.addLeadingZeroes(this.state.seconds) }</span>
                </div>

                <button className="btn timer__btn timer__btn--start" onClick={ this.start.bind(this) }>Start</button>
                <button className="btn timer__btn timer__btn--stop" onClick={ this.stop.bind(this) }>Stop</button>
            </div>
        );
    }

    start() {
        const secsPerMin = 60;

        let timer = setInterval(() => {
            this.setState({
                seconds: this.state.seconds + 1
            });

            if (this.state.seconds === secsPerMin) {
                this.setState({ 
                    seconds: 0,
                    minutes: this.state.minutes + 1
                });     
            }
        }, 1000);

        this.setState({
            timer: timer
        });
    }

    stop() {
        clearInterval(this.state.timer);
    }

    reset() {
        this.stop();

        this.setState({
            seconds: 0,
            minutes: 0
        });
    }

    addLeadingZeroes(num) {
        let numStr = num.toString();

        if (num >= 0 && num < 10) {
            numStr = "0" + numStr;
        }

        return numStr;
    }
}

export default Timer;
