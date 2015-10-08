import React from 'react';
import styles from './calc.css';

import CSSModules from 'react-css-modules';

@CSSModules(styles)
export default class Calc extends React.Component{
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
            <div styleName="calc">
                <form styleName='form'>
                    <div styleName="success">
                        <div styleName="success_title">Одобренная сумма</div>
                        <div styleName="success_sum">
                    {this.state.totalSum} <span styleName="success__curency">руб.</span></div>
                    </div>
                    <div styleName="b-form-group">
                        <label htmlFor="calc-type-building">Что хотите приобрести</label>
                        <div styleName="customSelect" htmlFor="calc-type-building">
                            <select
                                ref = "typeBuilding"
                                name = "type-building"
                                id = "calc-type-building"
                                onChange = {this.handleChangeTypeBuilding.bind(this)}
                            >
                                <option value="0.3">Квартиру в новостройке</option>
                                <option value="0.5">Коттедж</option>
                                <option value="0.7">Дом</option>
                            </select>
                        </div>
                    </div>
                    <div styleName="b-form-group">
                        <label htmlFor="calc-cost">Стоимость объекта</label>
                        <input
                            ref = "cost"
                            name = "cost"
                            type = "text"
                            id = "calc-cost"
                            defaultValue = {this.getCostString(this.state.cost)}
                            onBlur = {this.handleChangeCost.bind(this)}
                        />
                    </div>
                    <div styleName="b-form-group">
                        <label htmlFor="calc-time">Срок кредитования</label>
                        <div styleName="b-form-group__cnt">
                            <div styleName="b-form-group__left" htmlFor="calc-time">
                                <div styleName="customSelect">
                                    <select
                                        ref = "time"
                                        id = "calc-time"
                                        name = "timeYear"
                                        onChange={this.handleChangeTime.bind(this)}
                                    >
                                        <option value="10">10 лет</option>
                                        <option value="20">20 лет</option>
                                        <option value="30">30 лет</option>
                                    </select>
                                </div>
                            </div>
                            <div styleName="b-form-group__right">
                                <div styleName="customSelect">
                                    <select name="timeYear" id="calc-time" disabled={true}>
                                        <option value="0">0 мес.</option>
                                        <option value="1">1 мес.</option>
                                        <option value="2">2 мес.</option>
                                        <option value="3">3 мес.</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr styleName="hr"/>
                    <input
                        styleName="btn-submit"
                        type="submit"
                        onClick={this.handlerClickSubmit.bind(this)}
                        value="Рассчитать"/>
                </form>
            </div>
        );
    }
}