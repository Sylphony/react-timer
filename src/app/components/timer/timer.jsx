class Timer extends React.Component {
    constructor(state) {
        super(state);

        this.state = {
            minutes: 0,
            seconds: 0,
        };

        // When using ES6 classes, React does not auto-bind so have to manually do it.
        this.start = this.start.bind(this);
        this.stop = this.stop.bind(this);
    }

    componentWillUnmount() {
        this.stop();
    }

    render() {
        return (
            <div className="timer">
                <div className="timer__inner">
                    <span className="timer__digit">{ this.state.minutes }</span>
                    <span className="timer__separator">:</span>
                    <span className="timer__digit">{ this.state.seconds }</span>
                </div>

                <button className="btn timer__btn timer__btn--start" onClick={ this.start }>Start</button>
                <button className="btn timer__btn timer__btn--stop" onClick={ this.stop }>Stop</button>
            </div>
        );
    }

    start() {       
        let timer = setInterval(() => {
            this.setState({
                seconds: this.state.seconds + 1
            });
        }, 1000);

        this.setState({
            timer: timer
        });
    }

    stop() {
        clearInterval(this.state.timer);
    }
}

export default Timer;
