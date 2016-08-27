var classNames = require("classnames");

class TimerCtrlBtn extends React.Component {
    render() {
        const classPrefix = "timer__btn";

        let btnProp = {
            type: this.props.type,
            icon: this.props.icon,
            click: this.props.click,
            className: classNames([
                classPrefix,
                classPrefix + "--" + this.props.type
            ]),
            iconClassName: classNames([
                classPrefix + "-icon",
                "fa",
                "fa-" + this.props.icon
            ]),
            disabled: this.props.disabled || false
        };

        return (
            <button className={ btnProp.className } onClick={ btnProp.click } disabled={ btnProp.disabled }>
                <span className={ btnProp.iconClassName }></span>
                <span className="timer__btn-text">{ btnProp.type }</span>
            </button>
        );
    }
}

export default TimerCtrlBtn;
