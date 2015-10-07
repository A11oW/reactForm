import React from 'react';

class Calc extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            typeBuilding: 0.3,
            cost: 25000000,
            time: 10,
            totalSum: 0
        };

        this.state.totalSum = this.calcTotalSum(this.state.cost, this.state.time, this.state.typeBuilding);
    }
    /**
     * Обработчик изменения типа недвижимости
     */
    handleChangeTypeBuilding () {
        this.setState({typeBuilding: React.findDOMNode(this.refs.typeBuilding).value});
    }
    /**
     * Обработчик изменения input "Стоимость объекта"
     */
    handleChangeCost () {
        var value = Math.ceil(React.findDOMNode(this.refs.cost).value.replace(/\D+/g,""));
        React.findDOMNode(this.refs.cost).value = this.getCostString(value);
        this.setState({cost: value});
    }
    /**
     * Приводим стоимость объекта к "правильному" виду
     * @param value
     * @returns {string}
     */
    getCostString (value) {
        return value.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ') + " руб.";
    }
    /**
     * Обработчик изменения селекта "Срок кредитования: годы"
     */
    handleChangeTime () {
        this.setState({time: React.findDOMNode(this.refs.time).value});
    }
    /**
     * Обработчик нажатия на кнопку "Расчитать"
     * @param e {event}
     */
    handlerClickSubmit (e) {
        e.preventDefault();
        this.setTotalSum();
    }
    /**
     * Сохраняем одобренную сумму
     */
    setTotalSum () {
        this.setState({totalSum: this.calcTotalSum(this.state.cost, this.state.time, this.state.typeBuilding)});
    }
    /**
     * Высчитываем итоговую стоимость
     * @param {number} cost - стоимость объекта
     * @param {number} time - срок кредитования
     * @param {number} typeBuilding - множитель формулы
     * @returns {number} - Одобренная сумма
     */
    calcTotalSum (cost = 0, time = 0, typeBuilding = 0) {
        return Math.ceil(cost * time * typeBuilding);
    }
    render() {
        return (
            <form className="b-calc__form">
                <div className="b-calc__success">
                    <div className="b-calc__success_title">Одобренная сумма</div>
                    <div className="b-calc__success_sum">
                    {this.state.totalSum} <span className="b-calc__success__curency">руб.</span></div>
                </div>
                <div className="b-form-group">
                    <label htmlFor="b-calc-type-building">Что хотите приобрести</label>
                    <div className="customSelect" htmlFor="b-calc-type-building">
                        <select
                            ref = "typeBuilding"
                            name = "type-building"
                            id = "b-calc-type-building"
                            onChange = {this.handleChangeTypeBuilding}
                        >
                            <option value="0.3">Квартиру в новостройке</option>
                            <option value="0.5">Коттедж</option>
                            <option value="0.7">Дом</option>
                        </select>
                    </div>
                </div>
                <div className="b-form-group">
                    <label htmlFor="b-calc-cost">Стоимость объекта</label>
                    <input
                        ref = "cost"
                        name = "cost"
                        type = "text"
                        id = "b-calc-cost"
                        defaultValue = {this.getCostString(this.state.cost)}
                        onBlur = {this.handleChangeCost}
                    />
                </div>
                <div className="b-form-group">
                    <label htmlFor="b-calc-time">Срок кредитования</label>
                    <div className="b-form-group__cnt">
                        <div className="b-form-group__left" htmlFor="b-calc-time">
                            <div className="customSelect">
                                <select
                                    ref = "time"
                                    id = "b-calc-time"
                                    name = "timeYear"
                                    onChange={this.handleChangeTime}
                                >
                                    <option value="10">10 лет</option>
                                    <option value="20">20 лет</option>
                                    <option value="30">30 лет</option>
                                </select>
                            </div>
                        </div>
                        <div className="b-form-group__right">
                            <div className="customSelect">
                                <select name="timeYear" id="b-calc-time" disabled={true}>
                                    <option value="0">0 мес.</option>
                                    <option value="1">1 мес.</option>
                                    <option value="2">2 мес.</option>
                                    <option value="3">3 мес.</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <hr className="b-calc__hr"/>
                <input
                    className="b-calc__btn-submit"
                    type="submit"
                    onClick={this.handlerClickSubmit}
                    value="Рассчитать"/>
            </form>
        );
    }
}

export default Calc