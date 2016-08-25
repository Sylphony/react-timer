var classNames = require("classnames");

class TimerCtrlBtn extends React.Component {
    render() {
        const btnType = this.props.type;
        const btnIcon = this.props.icon;
        const btnAction = this.props.action;

        const classPrefix = "timer__btn";

        let btnClass = classNames([
            classPrefix,
            classPrefix + "--" + btnType
        ]);

        let btnIconClass = classNames([
            classPrefix + "-icon",
            "fa",
            "fa-" + btnIcon
        ]);

        return (
            <button className={ btnClass } onClick={ btnAction }>
                <span className={ btnIconClass }></span>
                <span className="timer__btn-text">{ btnType }</span>
            </button>
        );
    }
}

export default TimerCtrlBtn;
